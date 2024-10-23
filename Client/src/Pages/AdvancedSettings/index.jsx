import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import Field from "../../Components/Inputs/Field";
import Link from "../../Components/Link";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import { ConfigBox } from "../Settings/styled";
import { useNavigate } from "react-router";
import { getAppSettings, updateAppSettings } from "../../Features/Settings/settingsSlice";
import { useState, useEffect } from "react";
import Select from "../../Components/Inputs/Select";
import { advancedSettingsValidation } from "../../Validation/validation";
import { buildErrors, hasValidationErrors } from "../../Validation/error";

const AdvancedSettings = ({ isAdmin }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAdmin) {
			navigate("/");
		}
	}, [navigate, isAdmin]);
	const [errors, setErrors] = useState({});
	const theme = useTheme();
	const { authToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const [localSettings, setLocalSettings] = useState({
		apiBaseUrl: "",
		logLevel: "debug",
		systemEmailHost: "",
		systemEmailPort: "",
		systemEmailAddress: "",
		systemEmailPassword: "",
		jwtTTL: "",
		dbType: "",
		redisHost: "",
		redisPort: "",
		pagespeedApiKey: "",
	});

	useEffect(() => {
		const getSettings = async () => {
			const action = await dispatch(getAppSettings({ authToken }));
			if (action.payload.success) {
				setLocalSettings(action.payload.data);
			} else {
				createToast({ body: "Failed to get settings" });
			}
		};
		getSettings();
	}, [authToken, dispatch]);

	const logItems = [
		{ _id: 1, name: "none" },
		{ _id: 2, name: "debug" },
		{ _id: 3, name: "error" },
		{ _id: 4, name: "warn" },
	];

	const logItemLookup = {
		none: 1,
		debug: 2,
		error: 3,
		warn: 4,
	};

	const handleLogLevel = (e) => {
		const id = e.target.value;
		const newLogLevel = logItems.find((item) => item._id === id).name;
		setLocalSettings({ ...localSettings, logLevel: newLogLevel });
	};

	const handleBlur = (event) => {
		const { value, id } = event.target;
		const { error } = advancedSettingsValidation.validate(
			{ [id]: value },
			{
				abortEarly: false,
			}
		);
		if (error) {
			setErrors((prev) => {
				return buildErrors(prev, id, error);
			});
		}
	};
	const handleChange = (event) => {
		const { value, id } = event.target;
		setLocalSettings({ ...localSettings, [id]: value });		
	};

	const handleSave = async () => {
		if (hasValidationErrors(localSettings, advancedSettingsValidation, setErrors))
			return;
		const action = await dispatch(
			updateAppSettings({ settings: localSettings, authToken })
		);
		let body = "";
		if (action.payload.success) {
			console.log(action.payload.data);
			setLocalSettings(action.payload.data);
			body = "Settings saved successfully";
		} else {
			body = "Failed to save settings";
		}
		createToast({ body });
	};

	return (
		<Box
			className="settings"
			style={{
				paddingBottom: 0,
			}}
		>
			<Stack
				component="form"
				gap={theme.spacing(12)}
				noValidate
				spellCheck="false"
			>
				<ConfigBox>
					<Box>
						<Typography component="h1">Client settings</Typography>
						<Typography sx={{ mt: theme.spacing(2) }}>
							Modify client settings here.
						</Typography>
					</Box>
					<Stack gap={theme.spacing(20)}>
						<Field
							id="apiBaseUrl"
							label="API URL Host"
							value={localSettings.apiBaseUrl}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.apiBaseUrl}
						/>
						<Select
							id="logLevel"
							label="Log level"
							name="logLevel"
							items={logItems}
							value={logItemLookup[localSettings.logLevel]}
							onChange={handleLogLevel}
							onBlur={handleBlur}
							error={errors.logLevel}
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h1">Email settings</Typography>
						<Typography sx={{ mt: theme.spacing(2) }}>
							Set your host email settings here. These settings are used for sending
							system emails.
						</Typography>
					</Box>
					<Stack gap={theme.spacing(20)}>
						<Field
							type="text"
							id="systemEmailHost"
							label="Email host"
							name="systemEmailHost"
							value={localSettings.systemEmailHost}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.systemEmailHost}
						/>
						<Field
							type="number"
							id="systemEmailPort"
							label="System email address"
							name="systemEmailPort"
							value={localSettings.systemEmailPort.toString()}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.systemEmailPort}
						/>
						<Field
							type="email"
							id="systemEmailAddress"
							label="System email address"
							name="systemEmailAddress"
							value={localSettings.systemEmailAddress}
							onChange={handleChange}
							error={errors.systemEmailAddress}
						/>
						<Field
							type="text"
							id="systemEmailPassword"
							label="System email password"
							name="systemEmailPassword"
							value={localSettings.systemEmailPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.systemEmailPassword}
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h1">Server settings</Typography>
						<Typography sx={{ mt: theme.spacing(2) }}>
							Modify server settings here.
						</Typography>
					</Box>
					<Stack gap={theme.spacing(20)}>
						<Field
							type="text"
							id="jwtTTL"
							label="JWT time to live"
							name="jwtTTL"
							value={localSettings.jwtTTL}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.jwtTTL}
						/>
						<Field
							type="text"
							id="dbType"
							label="Database type"
							name="dbType"
							value={localSettings.dbType}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.dbType}
						/>
						<Field
							type="text"
							id="redisHost"
							label="Redis host"
							name="redisHost"
							value={localSettings.redisHost}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.redisHost}
						/>
						<Field
							type="number"
							id="redisPort"
							label="Redis port"
							name="redisPort"
							value={localSettings.redisPort.toString()}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.redisPort}
						/>
						<Field
							type="text"
							id="pagespeedApiKey"
							label="PageSpeed API key"
							name="pagespeedApiKey"
							value={localSettings.pagespeedApiKey}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.pagespeedApiKey}
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Typography component="h1">About</Typography>
					</Box>
					<Box>
						<Typography component="h2">BlueWave Uptime v1.0.0</Typography>
						<Typography sx={{ mt: theme.spacing(2), mb: theme.spacing(6), opacity: 0.6 }}>
							Developed by Bluewave Labs.
						</Typography>
						<Link
							level="secondary"
							url="https://github.com/bluewave-labs"
							label="https://github.com/bluewave-labs"
						/>
					</Box>
				</ConfigBox>
				<Stack
					direction="row"
					justifyContent="flex-end"
				>
					<LoadingButton
						loading={settings.isLoading || settings.authIsLoading}
						variant="contained"
						color="primary"
						sx={{ px: theme.spacing(12), mt: theme.spacing(20) }}
						onClick={handleSave}
					>
						Save
					</LoadingButton>
				</Stack>
			</Stack>
		</Box>
	);
};

AdvancedSettings.propTypes = {
	isAdmin: PropTypes.bool,
};
export default AdvancedSettings;
