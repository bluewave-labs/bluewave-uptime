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

const CreateInfrastructureMonitor = () => {
	const CustomAlertStack = ({
		checkboxId,
		checkboxLabel,
		checkboxValue,		
		isChecked,
		onChange,
		fieldId,
		fieldValue,
		alertUnit,
	}) => {
		console.log("fieldValue")
		console.log(fieldValue)
		return (
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
					value={checkboxValue??""}
					isChecked= {isChecked??false}
					onChange={onChange}
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
					value={fieldValue}
				></Field>
				<Typography
					component="p"
					m={theme.spacing(3)}
				>
					{alertUnit}
				</Typography>
			</Stack>
		</Stack>
	);}

	const MS_PER_MINUTE = 60000;
	const { user, authToken } = useSelector((state) => state.auth);
	const monitorState = useSelector((state) => state.infrastructureMonitor);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	const idMap = {
		"monitor-url": "url",
		"monitor-name": "name",
		"monitor-secret": "secret",
		"notify-email-default": "notification-email",
	};

	const [infrastructureMonitor, setInfrastructureMonitor] = useState({
		url: "",
		name: "",
		notifications: [],
		interval: 1,
		threshold: {cpu: "", disk: "", memory: ""}
	});
	const [errors, setErrors] = useState({});

	const handleChange = (event, name) => {
		const { value, id } = event.target;
		if (!name) name = idMap[id];

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

			const { error } = infrastractureMonitorValidation.validate(
				{ [name]: value },
				{ abortEarly: false }
			);
			console.log(error);
			setErrors((prev) => {
				const updatedErrors = { ...prev };
				if (error) updatedErrors[name] = error.details[0].message;
				else delete updatedErrors[name];
				return updatedErrors;
			});
		}
	};

	const handleCreateInfrastructureMonitor = async (event) => {
		event.preventDefault();
		//obj to submit
		let form = {
			url:infrastructureMonitor.url,
			name:
				infrastructureMonitor.name === ""
					? infrastructureMonitor.url
					: infrastructureMonitor.name,
			interval: infrastructureMonitor.interval * MS_PER_MINUTE,
		};

		const { error } =infrastractureMonitorValidation.validate(form, {
			abortEarly: false,
		});

		if (error) {
			const newErrors = {};
			error.details.forEach((err) => {
				newErrors[err.path[0]] = err.message;
			});
			setErrors(newErrors);
			createToast({ body: "Error validation data." });
		} else {
			if (infrastructureMonitor.type === "http") {
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
			}

			form = {
				...form,
				description: form.name,
				teamId: user.teamId,
				userId: user._id,
				notifications: infrastructureMonitor.notifications,
			};
			const action = await dispatch(
				createInfrastructureMonitor({ authToken, monitor: form })
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
		{ _id: 1, name: "15 seconds" },
		{ _id: 2, name: "30 seconds" },
		{ _id: 3, name: "1 minute" },
		{ _id: 4, name: "2 minutes" },
		{ _id: 5, name: "5 minutes" },
		{ _id: 6, name: "10 minutes" },
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
							type={"text"}
							id="monitor-url"
							label="Server URL"
							placeholder="https://"
							value={infrastructureMonitor.url}
							onChange={handleChange}
							error={errors["url"]}
						/>
						<Field
							type="text"
							id="monitor-name"
							label="Friendly name(optional)"
							isOptional={true}
							value={infrastructureMonitor.name}
							onChange={handleChange}
							error={errors["name"]}
						/>
						<Field
							type="text"
							id="monitor-secret"
							label="Authorization secret"
							value={infrastructureMonitor.secret}
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
							onChange={(event) => handleChange(event)}
						/>
						<Checkbox
							id="notify-email"
							label="Also notify via email to multiple addresses (coming soon)"
							isChecked={false}
							value=""
							onChange={() => logger.warn("disabled")}
							isDisabled={true}
						/>
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
							checkboxId="customize-cpu"
							checkboxLabel="CPU"
							checkboxValue={""}
							fieldId={"usage_cpu"}
							fieldValue={infrastructureMonitor.threshold['cpu']??""}
							onChange={(event) => handleChange(event)}
							alertUnit="%"
						/>
						<CustomAlertStack
							checkboxId="customize-memory"
							checkboxLabel="Memory"
							checkboxValue={""}
							fieldId={"usage_memory"}
							fieldValue={infrastructureMonitor.threshold['memory']??""}
							onChange={(event) => handleChange(event)}
							alertUnit="%"
						/>
						<CustomAlertStack
							checkboxId="customize-disk"
							checkboxLabel="Disk"
							checkboxValue={""}
							fieldId={"usage_disk"}
							fieldValue={infrastructureMonitor.threshold['disk']??""}
							onChange={(event) => handleChange(event)}
							alertUnit="%"
						/>
						{/* <CustomAlertStack
							checkboxId="customize-temperature"
							checkboxLabel="Temperature"
							checkboxValue={true}
							onChange={(event) => handleChange(event)}
							alertUnit="°C"
						/>
						<CustomAlertStack
							checkboxId="customize-systemload"
							checkboxLabel="System load"
							checkboxValue={true}
							onChange={(event) => handleChange(event)}
							alertUnit="%"
						/>
						<CustomAlertStack
							checkboxId="customize-swap"
							checkboxLabel="Swap used"
							checkboxValue={""}
							onChange={(event) => handleChange(event)}
							alertUnit="%"
						/> */}
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h2">Logging retention</Typography>
						<Typography component="p">
							Configure how logn logs are stored. After this period, the Uptime Manager
							will start deleting oldest data.
						</Typography>
					</Box>
					{/* <Stack gap={theme.spacing(6)}>
						<CustomAlertStack
							checkboxId="retain-log"
							checkboxLabel="Retain data for"
							checkboxValue={""}
							fieldId={"retries_max"}
							onChange={(event) => handleChange(event)}
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
							id="monitor-interval"
							label="Check frequency"
							value={infrastructureMonitor.interval || 1}
							onChange={(event) => handleChange(event, "interval")}
							items={frequencies}
						/>
						<Field
							type={"text"}
							id="monitor-retries"
							label="Maximum retries before the service is marked as down"
							value={infrastructureMonitor.url}
							onChange={handleChange}
							error={errors["url"]}
						/>						
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
						disabled={Object.keys(errors).length !== 0 && true}
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