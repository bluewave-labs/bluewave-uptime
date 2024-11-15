import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { infrastructureMonitorValidation } from "../../../Validation/validation";
import {
	createInfrastructureMonitor,
	checkInfrastructureEndpointResolution,
} from "../../../Features/InfrastructureMonitors/infrastructureMonitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { createToast } from "../../../Utils/toastUtils";
import { logger } from "../../../Utils/Logger";
import { ConfigBox } from "../../Monitors/styled";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Checkbox from "../../../Components/Inputs/Checkbox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import { buildErrors, hasValidationErrors } from "../../../Validation/error";
import { capitalizeFirstLetter } from "../../../Utils/stringUtils";
import { CustomThreshold } from "../CreateMonitor/CustomThreshold";

const CreateInfrastructureMonitor = () => {
	const [infrastructureMonitor, setInfrastructureMonitor] = useState({
		url: "",
		name: "",
		notifications: [],
		interval: 15,
		cpu: false,
		usage_cpu: 0,
		memory: false,
		usage_memory: 0,
		disk: false,
		usage_disk: 0,
		secret: "",
	});

	const MS_PER_SECOND = 1000;
	const THRESHOLD_FIELD_PREFIX = "usage_";
	const HARDWARE_MONITOR_TYPES = ["cpu", "memory", "disk"];
	const { user, authToken } = useSelector((state) => state.auth);
	const monitorState = useSelector((state) => state.infrastructureMonitor);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	const idMap = {
		"notify-email-default": "notification-email",
	};

	const [errors, setErrors] = useState({});

	const alertErrKeyLen = Object.keys(errors).filter((k) =>
		k.startsWith(THRESHOLD_FIELD_PREFIX)
	).length;

	const handleCustomAlertCheckChange = (event) => {
		const { value, id } = event.target;
		setInfrastructureMonitor((prev) => {
			const newState = {
				[id]: prev[id] == undefined && value == "on" ? true : !prev[id],
			};
			return {
				...prev,
				...newState,
				[THRESHOLD_FIELD_PREFIX + id]: newState[id]
					? prev[THRESHOLD_FIELD_PREFIX + id]
					: "",
			};
		});
		// Remove the error if unchecked
		setErrors((prev) => {
			return buildErrors(prev, [THRESHOLD_FIELD_PREFIX + id]);
		});
	};

	const handleBlur = (event, appenedID) => {
		event.preventDefault();
		const { value, id } = event.target;
		if (id?.startsWith("notify-email-")) return;
		const { error } = infrastructureMonitorValidation.validate(
			{ [id ?? appenedID]: value },
			{
				abortEarly: false,
			}
		);
		setErrors((prev) => {
			return buildErrors(prev, id ?? appenedID, error);
		});
	};

	const handleChange = (event, appendedId) => {
		event.preventDefault();
		const { value, id } = event.target;
		let name = appendedId ?? idMap[id] ?? id;

		if (name.includes("notification-")) {
			name = name.replace("notification-", "");
			let hasNotif = infrastructureMonitor.notifications.some(
				(notification) => notification.type === name
			);
			setInfrastructureMonitor((prev) => {
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
			setInfrastructureMonitor((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const generatePayload = (form) => {
		let thresholds = {};
		Object.keys(form)
			.filter((k) => k.startsWith(THRESHOLD_FIELD_PREFIX))
			.map((k) => {
				if (form[k]) thresholds[k] = form[k];
				delete form[k];
				delete form[k.substring(THRESHOLD_FIELD_PREFIX.length)];
			});

		form = {
			...form,
			description: form.name,
			teamId: user.teamId,
			userId: user._id,
			type: "hardware",
			notifications: infrastructureMonitor.notifications,
			thresholds,
		};
		return form;
	};
	const handleCreateInfrastructureMonitor = async (event) => {
		event.preventDefault();
		let form = {
			...infrastructureMonitor,
			name:
				infrastructureMonitor.name === ""
					? infrastructureMonitor.url
					: infrastructureMonitor.name,
			interval: infrastructureMonitor.interval * MS_PER_SECOND,
		};
		delete form.notifications;
		if (hasValidationErrors(form, infrastructureMonitorValidation, setErrors)) {
			return;
		} else {
			const checkEndpointAction = await dispatch(
				checkInfrastructureEndpointResolution({ authToken, monitorURL: form.url })
			);
			if (checkEndpointAction.meta.requestStatus === "rejected") {
				createToast({
					body: "The endpoint you entered doesn't resolve. Check the URL again.",
				});
				setErrors({ url: "The entered URL is not reachable." });
				return;
			}
			const action = await dispatch(
				createInfrastructureMonitor({ authToken, monitor: generatePayload(form) })
			);
			if (action.meta.requestStatus === "fulfilled") {
				createToast({ body: "Infrastructure monitor created successfully!" });
				navigate("/infrastructure-monitors/create");
			} else {
				createToast({ body: "Failed to create monitor." });
			}
		}
	};

	//select values
	const frequencies = [
		{ _id: 15, name: "15 seconds" },
		{ _id: 30, name: "30 seconds" },
		{ _id: 60, name: "1 minute" },
		{ _id: 120, name: "2 minutes" },
		{ _id: 300, name: "5 minutes" },
		{ _id: 600, name: "10 minutes" },
	];

	const NOTIFY_MULTIPLE_EMAIL_LABEL = (
		<Box>
			<Typography mb={theme.spacing(4)}>
				Also notify via email to multiple addresses (coming soon)
			</Typography>
			<Field
				id="notify-email-list"
				type="text"
				placeholder="name@gmail.com"
				value=""
				onChange={() => logger.warn("disabled")}
				onBlur={handleBlur}
			/>
			<Typography mt={theme.spacing(4)}>
				You can separate multiple emails with a comma
			</Typography>
		</Box>
	);

	return (
		<Box className="create-infrastructure-monitor">
			<Breadcrumbs
				list={[
					{ name: "Infrastructure monitors", path: "/infrastructure-monitors/create" },
					{ name: "create", path: `/infrastructure-monitors/create` },
				]}
			/>
			<Stack
				component="form"
				className="create-infrastructure-monitor-form"
				onSubmit={handleCreateInfrastructureMonitor}
				noValidate
				spellCheck="false"
				gap={theme.spacing(12)}
				mt={theme.spacing(6)}
			>
				<Typography
					component="h1"
					variant="h1"
				>
					<Typography
						component="span"
						fontSize="inherit"
					>
						Create your{" "}
					</Typography>
					<Typography
						component="span"
						variant="h2"
						fontSize="inherit"
						fontWeight="inherit"
					>
						infrastructure monitor
					</Typography>
				</Typography>
				<ConfigBox>
					<Box>
						<Typography component="h2">General settings</Typography>
						<Typography component="p">
							Here you can select the URL of the host, together with the type of monitor.
						</Typography>
					</Box>
					<Stack gap={theme.spacing(15)}>
						<Field
							type="text"
							id="url"
							label="Server URL"
							placeholder="https://"
							value={infrastructureMonitor.url}
							onBlur={handleBlur}
							onChange={handleChange}
							error={errors["url"]}
						/>
						<Field
							type="text"
							id="name"
							label="Friendly name(optional)"
							isOptional={true}
							value={infrastructureMonitor.name}
							onBlur={handleBlur}
							onChange={handleChange}
							error={errors["name"]}
						/>
						<Field
							type="text"
							id="secret"
							label="Authorization secret"
							value={infrastructureMonitor.secret}
							onBlur={handleBlur}
							onChange={handleChange}
							error={errors["secret"]}
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
							id="notify-email-default"
							label={`Notify via email (to ${user.email})`}
							isChecked={infrastructureMonitor.notifications.some(
								(notification) => notification.type === "email"
							)}
							value={user?.email}
							onChange={(e) => handleChange(e)}
							onBlur={handleBlur}
						/>
						<Checkbox
							id="notify-email"
							label={NOTIFY_MULTIPLE_EMAIL_LABEL}
							isChecked={false}
							value=""
							onChange={() => logger.warn("disabled")}
							onBlur={handleBlur}
							isDisabled={true}
						/>
					</Stack>
				</ConfigBox>

				<ConfigBox>
					<Box>
						<Typography component="h2">Customize alerts</Typography>
						<Typography component="p">
							Send a notification to user(s) When the theresholds exceed a certain number
							or percentage.
						</Typography>
					</Box>
					<Stack gap={theme.spacing(6)}>
						{HARDWARE_MONITOR_TYPES.map((type, idx) => (
							<CustomThreshold
								key={idx}
								checkboxId={type}
								checkboxLabel={
									type !== "cpu" ? capitalizeFirstLetter(type) : type.toUpperCase()
								}
								onCheckboxChange={handleCustomAlertCheckChange}
								fieldId={THRESHOLD_FIELD_PREFIX + type}
								fieldValue={infrastructureMonitor[THRESHOLD_FIELD_PREFIX + type] ?? ""}
								onFieldChange={handleChange}
								onFieldBlur={handleBlur}
								alertUnit="%"
								infrastructureMonitor={infrastructureMonitor}
								errors={errors}
							/>
						))}
						{alertErrKeyLen > 0 && (
							<Typography
								component="span"
								className="input-error"
								color={theme.palette.error.text}
								mt={theme.spacing(2)}
								sx={{
									opacity: 0.8,
								}}
							>
								{
									errors[
										THRESHOLD_FIELD_PREFIX +
											HARDWARE_MONITOR_TYPES.filter(
												(type) => errors[THRESHOLD_FIELD_PREFIX + type]
											)[0]
									]
								}
							</Typography>
						)}
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h2">Logging retention</Typography>
						<Typography component="p">
							Configure how logs are stored. After this period, the Uptime Manager will
							start deleting oldest data.
						</Typography>
					</Box>
					{/* <Stack gap={theme.spacing(6)}>
						<CustomAlertStack
							checkboxId="retain-log"
							checkboxLabel="Retain data for"
							checkboxValue={""}
							fieldId={"retries_max"}
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="days"
						/>
					</Stack> */}
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h2">Advanced settings</Typography>
					</Box>
					<Stack gap={theme.spacing(12)}>
						<Select
							id="interval"
							label="Check frequency"
							value={infrastructureMonitor.interval || 15}
							onChange={(e) => handleChange(e, "interval")}
							onBlur={(e) => handleBlur(e, "interval")}
							items={frequencies}
						/>
						{/* <Field
							type={"number"}
							id="monitor-retries"
							label="Maximum retries before the service is marked as down"
							value={infrastructureMonitor.url}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors["url"]}
						/>						 */}
					</Stack>
				</ConfigBox>
				<Stack
					direction="row"
					justifyContent="flex-end"
				>
					<LoadingButton
						variant="contained"
						color="primary"
						onClick={handleCreateInfrastructureMonitor}
						loading={monitorState?.isLoading}
					>
						Create infrastructure monitor
					</LoadingButton>
				</Stack>
			</Stack>
		</Box>
	);
};

export default CreateInfrastructureMonitor;
