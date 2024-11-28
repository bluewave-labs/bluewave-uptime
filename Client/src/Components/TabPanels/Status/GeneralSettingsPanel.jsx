import { useState, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
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

const GeneralSettingsPanel = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [error, setError] = useState("");
	// Local state for form data, errors, and file handling
	const [localData, setLocalData] = useState({});
	const [errors, setErrors] = useState({});
	const [file, setFile] = useState();
	const { timezone } = useSelector((state) => state.ui);
	const { mode } = useSelector((state) => state.ui);

	const handleChange = (event, appendedId) => {
		event.preventDefault();
		const { value, id } = event.target;
		let name = appendedId ?? idMap[id] ?? id;
		setLocalData((prev) => ({
				...prev,
				[name]: value,
			}));
		}


	const handleSubmit = () => {};

	const handleBlur = () => {};

	const handlePicture = (event) => {
		const pic = event.target.files[0];
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
							isChecked={false}
							value={"dd"}
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
							id="company-name"
							type="text"
							label="Company name"
							value={localData.name}
						/>
						<Field
							id="suburl"
							type="url"
							label="suburl"
							placeholder={""}
							value={localData.url}
							prefix={"http://uptimegenie.com/"}
							onChange={handleChange}
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
							onChange={(e) => {
								dispatch(setTimezone({ timezone: e.target.value }));
							}}
							items={timezones}
						/>
						<ImageField
							id="update-logo-picture"
							src={localData.src}
							loading={true}
							onChange={handlePicture}
						/>
						<Field
							id="color"
							label="Color"
							value={localData.color}
						/>
						<Select
							id="theme"
							label="Theme"
							value={localData.mode}
							onChange={(e) => {
								dispatch(setMode(e.target.value));
							}}
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
