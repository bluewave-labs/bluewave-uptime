import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { infrastractureMonitorValidation } from "../../../Validation/validation";
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

const CreateInfrastructureMonitor = () => {
	const [infrastructureMonitor, setInfrastructureMonitor] = useState({
		url: "",
		name: "",
		notifications: [],
		interval: 15,
		cpu: false,
		usage_cpu: "",
		memory: false,
		usage_memory: "",		
		disk: false,
		usage_disk: "",				
		secret: "",
	});

	const MS_PER_MINUTE = 60000;
	const THRESHOLD_FIELD_PREFIX = "usage_"
	const { user, authToken } = useSelector((state) => state.auth);
	const monitorState = useSelector((state) => state.infrastructureMonitor);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	const idMap = {
		"notify-email-default": "notification-email",
	};

	const [errors, setErrors] = useState({});

	const CustomAlertStack = ({
		checkboxId,
		checkboxLabel,
		fieldId,
		alertUnit,
		onChange,
		onBlur,
	}) => (
		<Stack
			direction={"row"}
			sx={{
				width: "50%",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<Checkbox
					id={checkboxId}
					label={checkboxLabel}
					isChecked={infrastructureMonitor[checkboxId]}
					onChange={handleCustomAlertCheckChange}
				/>
			</Box>
			<Stack
				direction={"row"}
				sx={{
					justifyContent: "flex-end",
				}}
			>
				<Field
					type="number"
					className="field-infrastructure-alert"
					id={fieldId}
					value={infrastructureMonitor[fieldId]}
					onBlur={onBlur}
					onChange={onChange}
					error={errors[`${fieldId}`]}
					disabled={!infrastructureMonitor[checkboxId]}
				></Field>
				<Typography
					component="p"
					m={theme.spacing(3)}
				>
					{alertUnit}
				</Typography>
			</Stack>
		</Stack>
	);

	const handleCustomAlertCheckChange = (event) => {
		const { value, id } = event.target;
		setInfrastructureMonitor((prev) => {
			const newState = {
				[id]: prev[id] == undefined && value == "on" ? true : !prev[id],
			};
			return {
				...prev,
				...newState,
				[`${THRESHOLD_FIELD_PREFIX}${id}`]: newState[id]
					? prev[`${THRESHOLD_FIELD_PREFIX}${id}`]
					: "",
			};
		});
		// Remove the error if unchecked
		setErrors((prev) => {
			return buildErrors(prev, [`${THRESHOLD_FIELD_PREFIX}${id}`]);
		});
	};

	const handleBlur = (event, appenedID) => {
		event.preventDefault();
		const { value, id } = event.target;
		if (id?.startsWith("notify-email-")) return;
		const { error } = infrastractureMonitorValidation.validate(
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
			.filter((k) => k.startsWith(`${THRESHOLD_FIELD_PREFIX}`))
			.map((k) => {
				if (form[k]) thresholds[k] = form[k];
				delete form[k];
				delete form[k.substring(`${THRESHOLD_FIELD_PREFIX}`.length)];
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
			interval: infrastructureMonitor.interval * MS_PER_MINUTE,
		};
		delete form.notifications;
		if (hasValidationErrors(form, infrastractureMonitorValidation, setErrors)) {
			return;
		} else {
			const checkEndpointAction = dispatch(
				checkInfrastructureEndpointResolution({ authToken, monitorURL: form.url })
			);
			if (checkEndpointAction.meta.requestStatus === "rejected") {
				createToast({
					body: "The endpoint you entered doesn't resolve. Check the URL again.",
				});
				setErrors({ url: "The entered URL is not reachable." });
				return;
			}
			const action = dispatch(
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
							label="Also notify via email to multiple addresses (coming soon)"
							isChecked={false}
							value=""
							onChange={() => logger.warn("disabled")}
							onBlur={handleBlur}
							isDisabled={true}
						/>
						<Box mx={theme.spacing(16)}>
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
						<CustomAlertStack
							checkboxId="cpu"
							checkboxLabel="CPU"
							checkboxValue={""}
							fieldId={`${THRESHOLD_FIELD_PREFIX}cpu`}
							fieldValue={infrastructureMonitor[`${THRESHOLD_FIELD_PREFIX}cpu`] ?? ""}
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="%"
						/>
						<CustomAlertStack
							checkboxId="memory"
							checkboxLabel="Memory"
							checkboxValue={""}
							fieldId={`${THRESHOLD_FIELD_PREFIX}memory`}
							fieldValue={infrastructureMonitor[`${THRESHOLD_FIELD_PREFIX}memory`] ?? ""}
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="%"
						/>
						<CustomAlertStack
							checkboxId="disk"
							checkboxLabel="Disk"
							checkboxValue={""}
							fieldId={`${THRESHOLD_FIELD_PREFIX}disk`}
							fieldValue={infrastructureMonitor[`${THRESHOLD_FIELD_PREFIX}disk`]??""}
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="%"
						/>
						{/* <CustomAlertStack
							checkboxId="customize-temperature"
							checkboxLabel="Temperature"
							checkboxValue={true}
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="°C"
						/>
						<CustomAlertStack
							checkboxId="customize-systemload"
							checkboxLabel="System load"
							checkboxValue={true}
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="%"
						/>
						<CustomAlertStack
							checkboxId="customize-swap"
							checkboxLabel="Swap used"
							checkboxValue={""}							
							onChange={handleChange}
							onBlur={handleBlur}
							alertUnit="%"
						/> */}
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h2">Logging retention</Typography>
						<Typography component="p">
							Configure how logs are stored. After this period, the Uptime Manager
							will start deleting oldest data.
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
