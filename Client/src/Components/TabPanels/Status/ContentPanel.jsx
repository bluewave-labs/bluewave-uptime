import { useState } from "react";
import { Button, Box, Stack, Typography } from "@mui/material";
import { ConfigBox } from "../../../Pages/Settings/styled";
import { useTheme } from "@emotion/react";
import TabPanel from "@mui/lab/TabPanel";
import {	
	publicPageGeneralSettingsValidation,
} from "../../../Validation/validation";
import { buildErrors } from "../../../Validation/error";
import { hasValidationErrors } from "../../../Validation/error";
import Server from "./Server"
const ContentPanel = () => {
	const theme = useTheme();
	const [errors, setErrors] = useState({});
	// Local state for form data, errors, and file handling
	const [localData, setLocalData] = useState({
        monitors: []
	});
	// Clears specific error from errors state
	const clearError = (err) => {
		setErrors((prev) => {
			const updatedErrors = { ...prev };
			if (updatedErrors[err]) delete updatedErrors[err];
			return updatedErrors;
		});
	};

	const handleChange = (event) => {
		event.preventDefault();
		const { value, id } = event.target;
		setLocalData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = () => {
		if (hasValidationErrors(localData, publicPageGeneralSettingsValidation, setErrors)) {
			return;
		}
	};

	const handleAddNew = () => {
		let arr = localData.monitors;
		arr.push({ id: "" + Math.random() });
		setLocalData({ ...localData, monitors: arr });
	}

	const removeItem = (id) =>{
		const currentMonitors = localData.monitors.filter(m => m.id !=id)
		setLocalData({...localData, monitors: currentMonitors})
	}

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

	return (
		<TabPanel
			value="Contents"
			sx={{
				"& h1, & p, & input": {
					color: theme.palette.text.tertiary,
				},
			}}
		>
			<Stack
				component="form"
				className="status-contents-form"
				noValidate
				spellCheck="false"
				gap={theme.spacing(12)}
				mt={theme.spacing(6)}
			>
				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Status page servers</Typography>
							<Typography component="p">
								You can add any number of servers that you monitor to your status page.
								You can also reorder them for the best viewing experience.
							</Typography>
						</Stack>
					</Box>
					<Box
						className="status-contents-server-list"
						sx={{
							height: "fit-content",
							border: "solid",
							borderRadius: theme.shape.borderRadius,
							borderColor: theme.palette.border.light,
							borderWidth: "2px",
							transition: "0.2s",
							"&:hover": {
								borderColor: theme.palette.primary.main,
								backgroundColor: "hsl(215, 87%, 51%, 0.05)",
							},
						}}
					>
						<Box>
							<Stack
								direction="row"
								justifyContent="space-around"
							>
								<Typography
									component="p"
									alignSelf={"center"}
								>
									{" "}
									Servers list{" "}
								</Typography>
								<Button onClick={handleAddNew}>Add New</Button>
							</Stack>
							{localData.monitors.length > 0 && (
								<Stack
									direction="column"
									alignItems="center"
									gap={theme.spacing(6)}
									sx={{ml: theme.spacing(4),
										mr: theme.spacing(8),
										mb: theme.spacing(8)
									}}
								>
									{localData.monitors.map((m, idx) => (
										<Server
											key={idx}
											id={m.id ?? "" + Math.random()}
											removeItem={removeItem}
											value={m.url}
										/>
									))}
								</Stack>
							)}
						</Box>
					</Box>
				</ConfigBox>

				<Stack
					direction="row"
					justifyContent="flex-end"
				>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Save
					</Button>
				</Stack>
			</Stack>
		</TabPanel>
	);
};

export default ContentPanel;
