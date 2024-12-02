import { useState, useRef } from "react";
import { Button, Box, Stack, Typography } from "@mui/material";
import { ConfigBox } from "../../../Pages/Settings/styled";
import Checkbox from "../../Inputs/Checkbox";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import TabPanel from "@mui/lab/TabPanel";
import Field from "../../Inputs/Field";
import ImageField from "../../Inputs/Image";
import { setMode, setTimezone } from "../../../Features/UI/uiSlice";
import timezones from "../../../Utils/timezones.json";
import Select from "../../Inputs/Select"
import { logoImageValidation, publicPageGeneralSettingsValidation } from "../../../Validation/validation"
import { buildErrors } from "../../../Validation/error";
import { formatBytes } from "../../../Utils/fileUtils";
import ProgressUpload from "../../ProgressBars";
import ImageIcon from "@mui/icons-material/Image";

const GeneralSettingsPanel = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [logo, setLogo] = useState();
	const [progress, setProgress] = useState({ value: 0, isLoading: false });
	const intervalRef = useRef(null);
	// Local state for form data, errors, and file handling
	const [localData, setLocalData] = useState({
		companyName: "",
		url: "",
		timezone: "America/Toronto",
		color: "#4169E1",
		theme: "light",
		//which fields matching below?
		publish: false,
		logo: null,
	});

	// Clears specific error from errors state
	const clearError = (err) => {
		setErrors((prev) => {
			const updatedErrors = { ...prev };
			if (updatedErrors[err]) delete updatedErrors[err];
			return updatedErrors;
		});
	};	
	const removeLogo = () => {
		errors["logo"] && clearError("logo");
		setLogo({});
		// interrupt interval if image upload is canceled prior to completing the process
		clearInterval(intervalRef.current); 
		setProgress({ value: 0, isLoading: false });
	};

	// Updates profile image displayed on UI
	const handleUpdateLogo = () => {
		setProgress({ value: 0, isLoading: false });
		setLocalData((prev) => ({
			...prev,
			logo: logo.src,
		}));
	};

	const handleChange = (event) => {
		event.preventDefault();
		const { value, id } = event.target;
		setLocalData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = () => {};

	const handleBlur = (event) => {
		event.preventDefault();
		const { value, id } = event.target;
		const { error } = publicPageGeneralSettingsValidation.validate(
			{ [id]: value },
			{
				abortEarly: false,
			}
		);

		setErrors((prev) => {
			return buildErrors(prev, id, error);
		});
	};

	const validateField = (toValidate, schema, name = "logo") => {
		const { error } = schema.validate(toValidate, { abortEarly: false });
		setErrors((prev) => {
			let prevErrors = { ...prev };
			if (error) prevErrors[name] = error?.details[0].message;
			else delete prevErrors[name];
			return prevErrors;
		});
		if (error) return true;		
	};

	const handleLogo = (event) => {
		const pic = event.target.files[0];
		let error = validateField({ type: pic?.type, size: pic?.size }, logoImageValidation);
		if (error) return;

		setProgress((prev) => ({ ...prev, isLoading: true }));
		setLogo({
			src: URL.createObjectURL(pic),
			name: pic.name,
			size: formatBytes(pic.size),
		});

		intervalRef.current = setInterval(() => {
			const buffer = 12;
			setProgress((prev) => {
				if (prev.value + buffer >= 100) {
					clearInterval(intervalRef.current);
					return { value: 100, isLoading: false };
				}
				return { ...prev, value: prev.value + buffer };
			});
		}, 120);
	};

	return (
		<TabPanel
			value="general settings"
			sx={{
				"& h1, & p, & input": {
					color: theme.palette.text.tertiary,
				},
			}}
		>
			<Stack
				component="form"
				className="status-general-settings-form"
				onSubmit={handleSubmit}
				noValidate
				spellCheck="false"
				gap={theme.spacing(12)}
				mt={theme.spacing(6)}
			>
				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Access</Typography>
							<Typography component="p">
								If your status page is ready, you can mark it as published.
							</Typography>
						</Stack>
					</Box>
					<Stack gap={theme.spacing(6)}>
						<Checkbox
							id="published-to-public"
							label={`Published and visible to the public`}
							isChecked={localData.publish}
							value={"localData.publish"}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Stack>
				</ConfigBox>

				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Basic Information</Typography>
							<Typography component="p">
								Define company name and the subdomain that your status page points to.
							</Typography>
						</Stack>
					</Box>
					<Stack gap={theme.spacing(6)}>
						<Field
							id="companyName"
							type="text"
							label="Company name"
							value={localData.companyName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors["companyName"]}
						/>
						<Field
							id="url"
							type="url"
							label="SubURL"
							placeholder={""}
							value={localData.url}
							prefix={"http://uptimegenie.com/"}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors["url"]}
						/>
					</Stack>
				</ConfigBox>

				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Appearance</Typography>
							<Typography component="p">
								Define the default look and feel of your public status page.
							</Typography>
						</Stack>
					</Box>
					<Stack gap={theme.spacing(6)}>
						<Select
							id="display-timezone"
							label="Display timezone"
							value={localData.timezone}
							onChange={handleChange}
							onBlur={handleBlur}
							items={timezones}
							error={errors["display-timezone"]}
						/>

						<ImageField
							id="logo"
							src={localData.logo?.src??logo?.src}
							loading={progress.isLoading && progress.value !== 100}
							onChange={handleLogo}
						/>
						{progress.isLoading || progress.value !== 0 || errors["logo"] ? (
							<ProgressUpload
								icon={<ImageIcon />}
								label={logo?.name}
								size={logo?.size}
								progress={progress.value}
								onClick={removeLogo}
								error={errors["logo"]}
							/>
						) : (
							""
						)}
						<Stack
							direction="row"
							mt={theme.spacing(10)}
							gap={theme.spacing(5)}
							justifyContent="flex-end"
						>
							<Button
								variant="text"
								color="info"
								onClick={removeLogo}
							>
								Remove
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleUpdateLogo}
								disabled={
									(Object.keys(errors).length !== 0 && errors?.logo) ||
									progress.value !== 100
										? true
										: false
								}
							>
								Update
							</Button>
						</Stack>
						<Field
							id="color"
							label="Color"
							value={localData.color}
							error={errors["color"]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Select
							id="theme"
							label="Theme"
							value={localData.theme}
							onChange={handleChange}
							onBlur={handleBlur}
							items={[
								{ _id: "light", name: "Light" },
								{ _id: "dark", name: "Dark" },
							]}
						/>
					</Stack>
				</ConfigBox>
			</Stack>
		</TabPanel>
	);
};

export default GeneralSettingsPanel;
