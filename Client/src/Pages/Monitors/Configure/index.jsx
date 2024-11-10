import { useNavigate, useParams } from "react-router";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { monitorValidation } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { logger } from "../../../Utils/Logger";
import { ConfigBox } from "../styled";
import {
	updateUptimeMonitor,
	pauseUptimeMonitor,
	getUptimeMonitorById,
	getUptimeMonitorsByTeamId,
	deleteUptimeMonitor,
} from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import Field from "../../../Components/Inputs/Field";
import PauseIcon from "../../../assets/icons/pause-icon.svg?react";
import ResumeIcon from "../../../assets/icons/resume-icon.svg?react";
import Select from "../../../Components/Inputs/Select";
import Checkbox from "../../../Components/Inputs/Checkbox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";
import SkeletonLayout from "./skeleton";
import LoadingButton from "@mui/lab/LoadingButton";
import "./index.css";
import Dialog from "../../../Components/Dialog";
import axios from "axios";

/**
 * Parses a URL string and returns a URL object.
 *
 * @param {string} url - The URL string to parse.
 * @returns {URL} - The parsed URL object if valid, otherwise an empty string.
 */
const parseUrl = (url) => {
	try {
		return new URL(url);
	} catch (error) {
		return null;
	}
};

/**
 * Configure page displays monitor configurations and allows for editing actions.
 * @component
 */
const Configure = () => {
	const MS_PER_MINUTE = 60000;
	const navigate = useNavigate();
	const theme = useTheme();
	const dispatch = useDispatch();
	const { user, authToken } = useSelector((state) => state.auth);
	const { isLoading } = useSelector((state) => state.uptimeMonitors);
	const [monitor, setMonitor] = useState({});
	const [errors, setErrors] = useState({});
	const [ntfyLoading, setntfyLoading] = useState(false)
	const [showNtfySettings, setShowNtfySettings] = useState(false)
	const [ntfySettings, setNtfySettings] = useState({});
	const { monitorId } = useParams();
	const idMap = {
		"monitor-url": "url",
		"monitor-name": "name",
		"monitor-checks-http": "type",
		"monitor-checks-ping": "type",
		"notify-email-default": "notification-email",
	};

	const authOptions = [
		{ _id: 'no-auth', name: 'No auth' },
		{ _id: 'user-pass', name: 'Username and Password' },
		{ _id: 'accessToken', name: 'Access Token' }
	];

	useEffect(() => {
		const fetchMonitor = async () => {
			try {
				const action = await dispatch(getUptimeMonitorById({ authToken, monitorId }));

				if (getUptimeMonitorById.fulfilled.match(action)) {
					const monitor = action.payload.data;
					setMonitor(monitor);
				} else if (getUptimeMonitorById.rejected.match(action)) {
					throw new Error(action.error.message);
				}
			} catch (error) {
				logger.error("Error fetching monitor of id: " + monitorId);
				navigate("/not-found", { replace: true });
			}
		};
		fetchMonitor();
	}, [monitorId, authToken, navigate]);

	useEffect(() => {
		if (monitor?.notifications?.some(notification => notification.type === "ntfy")) {
			setShowNtfySettings(true);
			// Optionally set ntfy settings from existing config
			const ntfyNotification = monitor.notifications.find(n => n.type === "ntfy");
			if (ntfyNotification?.ntfyConfig) {
				setNtfySettings(ntfyNotification.ntfyConfig);
			}
		}
	}, [monitor]);

	const handleChange = (event, name) => {
		let { value, id } = event.target;
		if (!name) name = idMap[id];

		if (name.includes("notification-")) {
			name = name.replace("notification-", "");
			let hasNotif = monitor.notifications.some(
				(notification) => notification.type === name
			);
			setMonitor((prev) => {
				const notifs = [...prev.notifications];
				if (hasNotif) {
					return {
						...prev,
						notifications: notifs.filter((notif) => notif.type !== name),
					};
				} else {
					return {
						...prev,
						notifications: [
							...notifs,
							name === "email"
								? { type: name, address: value }
								: // TODO - phone number
								{ type: name, phone: value },
						],
					};
				}
			});
		} else {
			if (name === "interval") {
				value = value * MS_PER_MINUTE;
			}
			setMonitor((prev) => ({
				...prev,
				[name]: value,
			}));

			const validation = monitorValidation.validate(
				{ [name]: value },
				{ abortEarly: false }
			);

			setErrors((prev) => {
				const updatedErrors = { ...prev };

				if (validation.error) updatedErrors[name] = validation.error.details[0].message;
				else delete updatedErrors[name];
				return updatedErrors;
			});
		}
	};

	//Handles changes for ntfy settings
	const handleChangeNtfy = (field, value) => {
		setNtfySettings(prev => ({
			...prev,
			[field]: value
		}));
	};

	// Handler for adding Ntfy notification to monitor
	const handleChangeForNtfy = () => {
		setntfyLoading(true);
		setMonitor((prev) => {
			const notifs = [...prev.notifications];

			return {
				...prev,
				notifications: [
					...notifs,
					{ type: "ntfy", ntfyConfig: ntfySettings }
				],
			};
		});
		createToast({ body: "Ntfy notification added successfully" });
		setntfyLoading(false);
	}

	// Handler for Testing Ntfy notification
	const testNotification = async () => {
		try {
			// Set up authorization headers based on authMode
			let headers = {
				Title: ntfySettings.friendlyName || `Monitor Alert`,
				Priority: ntfySettings.priority,
				Tags: "warning",
				"Content-Type": "text/plain",
			};

			if (
				ntfySettings.authMode === "user-pass" &&
				ntfySettings.username &&
				ntfySettings.password
			) {
				headers.Authorization =
					"Basic " +
					Buffer.from(`${ntfySettings.username}:${ntfySettings.password}`).toString(
						"base64"
					);
			} else if (ntfySettings.authMode === "accessToken" && ntfySettings.accessToken) {
				headers.Authorization = "Bearer " + ntfySettings.accessToken;
			}

			// Ensure the server URL does not have a trailing slash
			const serverUrl = ntfySettings.serverUrl.endsWith("/")
				? ntfySettings.serverUrl.slice(0, -1)
				: ntfySettings.serverUrl;

			// Plain text body message
			const ntfyBody = "This is a test message from your Ntfy setup.";

			// Send the Ntfy notification
			const response = await axios.post(`${serverUrl}/${ntfySettings.topic}`, ntfyBody, {
				headers,
			});

			if (response.status === 200) {
				createToast({
					body: "Notification sent successfully",
				});
			}
		} catch (error) {
			createToast({
				body: `Failed to send notification with ${error}`,
			});
		}
	};

	const handlePause = async () => {
		try {
			const action = await dispatch(pauseUptimeMonitor({ authToken, monitorId }));
			if (pauseUptimeMonitor.fulfilled.match(action)) {
				const monitor = action.payload.data;
				setMonitor(monitor);
			} else if (pauseUptimeMonitor.rejected.match(action)) {
				throw new Error(action.error.message);
			}
		} catch (error) {
			logger.error("Error pausing monitor: " + monitorId);
			createToast({ body: "Failed to pause monitor" });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const action = await dispatch(updateUptimeMonitor({ authToken, monitor: monitor }));
		if (action.meta.requestStatus === "fulfilled") {
			createToast({ body: "Monitor updated successfully!" });
			dispatch(getUptimeMonitorsByTeamId(authToken));
		} else {
			createToast({ body: "Failed to update monitor." });
		}
	};

	const [isOpen, setIsOpen] = useState(false);
	const handleRemove = async (event) => {
		event.preventDefault();
		const action = await dispatch(deleteUptimeMonitor({ authToken, monitor }));
		if (action.meta.requestStatus === "fulfilled") {
			navigate("/monitors");
		} else {
			createToast({ body: "Failed to delete monitor." });
		}
	};

	const frequencies = [
		{ _id: 1, name: "1 minute" },
		{ _id: 2, name: "2 minutes" },
		{ _id: 3, name: "3 minutes" },
		{ _id: 4, name: "4 minutes" },
		{ _id: 5, name: "5 minutes" },
	];

	// Parse the URL
	const parsedUrl = parseUrl(monitor?.url);
	const protocol = parsedUrl?.protocol?.replace(":", "") || "";

	const statusColor = {
		true: theme.palette.success.main,
		false: theme.palette.error.main,
		undefined: theme.palette.warning.main,
	};

	const statusMsg = {
		true: "Your site is up.",
		false: "Your site is down.",
		undefined: "Pending...",
	};

	return (
		<Stack
			className="configure-monitor"
			gap={theme.spacing(10)}
		>
			{Object.keys(monitor).length === 0 ? (
				<SkeletonLayout />
			) : (
				<>
					<Breadcrumbs
						list={[
							{ name: "monitors", path: "/monitors" },
							{ name: "details", path: `/monitors/${monitorId}` },
							{ name: "configure", path: `/monitors/configure/${monitorId}` },
						]}
					/>
					<Stack
						component="form"
						noValidate
						spellCheck="false"
						gap={theme.spacing(12)}
						flex={1}
					>
						<Stack
							direction="row"
							gap={theme.spacing(2)}
						>
							<Box>
								<Typography
									component="h1"
									variant="h1"
								>
									{monitor.name}
								</Typography>
								<Stack
									direction="row"
									alignItems="center"
									height="fit-content"
									gap={theme.spacing(2)}
								>
									<Tooltip
										title={statusMsg[monitor?.status ?? undefined]}
										disableInteractive
										slotProps={{
											popper: {
												modifiers: [
													{
														name: "offset",
														options: {
															offset: [0, -8],
														},
													},
												],
											},
										}}
									>
										<Box>
											<PulseDot color={statusColor[monitor?.status ?? undefined]} />
										</Box>
									</Tooltip>
									<Typography
										component="h2"
										variant="h2"
									>
										{monitor.url?.replace(/^https?:\/\//, "") || "..."}
									</Typography>
									<Typography
										position="relative"
										variant="body2"
										ml={theme.spacing(6)}
										mt={theme.spacing(1)}
										sx={{
											"&:before": {
												position: "absolute",
												content: `""`,
												width: 4,
												height: 4,
												borderRadius: "50%",
												backgroundColor: theme.palette.text.tertiary,
												opacity: 0.8,
												left: -10,
												top: "50%",
												transform: "translateY(-50%)",
											},
										}}
									>
										Editting...
									</Typography>
								</Stack>
							</Box>
							<Box
								sx={{
									alignSelf: "flex-end",
									ml: "auto",
								}}
							>
								<LoadingButton
									variant="contained"
									color="secondary"
									loading={isLoading}
									sx={{
										pl: theme.spacing(4),
										pr: theme.spacing(6),
										mr: theme.spacing(6),
										"& svg": {
											mr: theme.spacing(2),
											width: 22,
											height: 22,
											"& path": {
												stroke: theme.palette.text.tertiary,
												strokeWidth: 1.7,
											},
										},
									}}
									onClick={handlePause}
								>
									{monitor?.isActive ? (
										<>
											<PauseIcon />
											Pause
										</>
									) : (
										<>
											<ResumeIcon />
											Resume
										</>
									)}
								</LoadingButton>
								<LoadingButton
									loading={isLoading}
									variant="contained"
									color="error"
									sx={{ px: theme.spacing(8) }}
									onClick={() => setIsOpen(true)}
								>
									Remove
								</LoadingButton>
							</Box>
						</Stack>
						<ConfigBox>
							<Box>
								<Typography component="h2">General settings</Typography>
								<Typography component="p">
									Here you can select the URL of the host, together with the type of
									monitor.
								</Typography>
							</Box>
							<Stack gap={theme.spacing(20)}>
								<Field
									type={monitor?.type === "http" ? "url" : "text"}
									https={protocol === "https"}
									id="monitor-url"
									label="URL to monitor"
									placeholder="google.com"
									value={parsedUrl?.host || monitor?.url || ""}
									disabled={true}
									error={errors["url"]}
								/>
								<Field
									type="text"
									id="monitor-name"
									label="Display name"
									isOptional={true}
									placeholder="Google"
									value={monitor?.name || ""}
									onChange={handleChange}
									error={errors["name"]}
								/>
							</Stack>
						</ConfigBox>
						<ConfigBox>
							<Box>
								<Typography component="h2">Incident notifications</Typography>
								<Typography component="p">
									When there is an incident, notify users.
								</Typography>
							</Box>
							<Stack gap={theme.spacing(6)}>
								<Typography component="p">When there is a new incident,</Typography>
								<Checkbox
									id="notify-sms"
									label="Notify via SMS (coming soon)"
									isChecked={false}
									value=""
									onChange={() => logger.warn("disabled")}
									isDisabled={true}
								/>
								<Checkbox
									id="notify-email-default"
									label={`Notify via email (to ${user.email})`}
									isChecked={
										monitor?.notifications?.some(
											(notification) => notification.type === "email"
										) || false
									}
									value={user?.email}
									onChange={(event) => handleChange(event)}
								/>
								<Checkbox
									id="notify-via-ntfy"
									label="Notify via ntfy.sh"
									isChecked={showNtfySettings}
									onChange={() => setShowNtfySettings(prev => !prev)}
									value=""
								/>
								{/* Ntfy-specific fields: Render when ntfy is selected */}
								{showNtfySettings === true && (
									<Box sx={{ mt: 2 }}>
										<Stack spacing={3}>
											<Field
												id="ntfy-friendly-name"
												type="text"
												label="Friendly name"
												placeholder="Enter a friendly name"
												value={ntfySettings.friendlyName}
												onChange={(e) => handleChangeNtfy('friendlyName', e.target.value)}
											/>
											<Field
												id="ntfy-topic"
												type="text"
												label="Topic"
												placeholder="Enter ntfy topic"
												value={ntfySettings.topic}
												onChange={(e) => handleChangeNtfy('topic', e.target.value)}
											/>
											<Field
												id="ntfy-server-url"
												type="text"
												label="Server URL"
												placeholder="https://ntfy.sh"
												value={ntfySettings.serverUrl}
												onChange={(e) => handleChangeNtfy('serverUrl', e.target.value)}
											/>
											<Field
												id="ntfy-priority"
												type="number"
												label="Priority"
												min="1"
												max="5"
												placeholder="1-5"
												value={ntfySettings.priority}
												onChange={(e) => handleChangeNtfy('priority', e.target.value)}
											/>
											<Select
												id="auth-select"
												label="Authentication Method"
												value={ntfySettings.authMode}
												onChange={(e) => handleChangeNtfy('authMode', e.target.value)}
												items={authOptions}
											/>
											{ntfySettings.authMode === "user-pass" && (
												<>
													<Field
														id="ntfy-username"
														type="text"
														label="Username"
														placeholder="Enter username"
														value={ntfySettings.username}
														onChange={(e) => handleChangeNtfy('username', e.target.value)}
													/>
													<Field
														id="ntfy-password"
														type="password"
														label="Password"
														placeholder="Enter password"
														value={ntfySettings.password}
														onChange={(e) => handleChangeNtfy('password', e.target.value)}
													/>
												</>
											)}
											{ntfySettings.authMode === "accessToken" && (
												<Field
													id="ntfy-access-token"
													type="text"
													label="Access Token"
													placeholder="Enter access token"
													value={ntfySettings.accessToken}
													onChange={(e) => handleChangeNtfy('accessToken', e.target.value)}
												/>
											)}
											<Stack
												direction="row"
												spacing={2}
											>
												<LoadingButton
													variant="contained"
													color="primary"
													onClick={testNotification}
													disabled={Object.keys(errors).length !== 0}
													loading={ntfyLoading}
												>
													Test
												</LoadingButton>
												<LoadingButton
													variant="contained"
													color="primary"
													onClick={handleChangeForNtfy}
													disabled={Object.keys(errors).length !== 0}
													loading={isLoading}
												>
													Save
												</LoadingButton>
											</Stack>
										</Stack>
									</Box>
								)}
								<Checkbox
									id="notify-email"
									label="Also notify via email to multiple addresses (coming soon)"
									isChecked={false}
									value=""
									onChange={() => logger.warn("disabled")}
									isDisabled={true}
								/>
								{monitor?.notifications?.some(
									(notification) => notification.type === "emails"
								) ? (
									<Box mx={theme.spacing(16)}>
										<Field
											id="notify-email-list"
											type="text"
											placeholder="name@gmail.com"
											value=""
											onChange={() => logger.warn("disabled")}
										/>
										<Typography mt={theme.spacing(4)}>
											You can separate multiple emails with a comma
										</Typography>
									</Box>
								) : (
									""
								)}
							</Stack>
						</ConfigBox>
						<ConfigBox>
							<Box>
								<Typography component="h2">Advanced settings</Typography>
							</Box>
							<Stack gap={theme.spacing(20)}>
								<Select
									id="monitor-interval-configure"
									label="Check frequency"
									value={monitor?.interval / MS_PER_MINUTE || 1}
									onChange={(event) => handleChange(event, "interval")}
									items={frequencies}
								/>
							</Stack>
						</ConfigBox>
						<Stack
							direction="row"
							justifyContent="flex-end"
							mt="auto"
						>
							<LoadingButton
								variant="contained"
								color="primary"
								loading={isLoading}
								sx={{ px: theme.spacing(12) }}
								onClick={handleSubmit}
							>
								Save
							</LoadingButton>
						</Stack>
					</Stack>
				</>
			)}

			<Dialog
				open={isOpen}
				theme={theme}
				title="Do you really want to delete this monitor?"
				description="Once deleted, this monitor cannot be retrieved."
				onCancel={() => setIsOpen(false)}
				confirmationButtonLabel="Delete"
				onConfirm={handleRemove}
				isLoading={isLoading}
			/>
		</Stack>
	);
};

export default Configure;
