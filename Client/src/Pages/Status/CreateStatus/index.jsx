import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, Tab, useTheme, Stack, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import GeneralSettingsPanel from "../../../Components/TabPanels/Status/GeneralSettingsPanel";
import {
	capitalizeFirstLetter,
} from "../../../Utils/stringUtils";
import ContentPanel from "../../../Components/TabPanels/Status/ContentPanel";
import {
	publicPageGeneralSettingsValidation,
} from "../../../Validation/validation";
import { hasValidationErrors } from "../../../Validation/error";
import { StatusFormProvider } from "../TabContext"

/**
 * CreateStatus page renders a page with tabs for general settings and contents.
 * @param {string} [props.open] - Specifies the initially open tab: 'general settings' or 'content'.
 * @returns {JSX.Element}
 */

const CreateStatus = ({ open = "general-settings" }) => {
	const theme = useTheme();
	let tabList = ["General Settings", "Contents"];
	const [errors, setErrors] = useState({});
	const tab = open
		.split("-")
		.map((a) => capitalizeFirstLetter(a))
		.join(" ");
	
	const [tabIdx, setTabIdx] = useState(tabList.indexOf(tab));

	const handleTabChange = (event, newTab) => {
		setTabIdx(tabList.indexOf(newTab));
	};

	const [form, setForm] = useState({
		companyName: "",
		url: "",
		timezone: "America/Toronto",
		color: "#4169E1",
		//which fields matching below?
		publish: false,
		logo: null,
		monitors: [],
		showUptimePercentage: false,
		showBarcode: false		
	});

	const handleSubmit = () => {
		//validate rest of the form
		delete form.logo;
		if (hasValidationErrors(form, publicPageGeneralSettingsValidation, setErrors)) {						
			return;
		}
		// //validate image field, double check if it is required
		// let error = validateField(
		// 	{ type: logo?.type ?? null, size: logo?.size ?? null },
		// 	logoImageValidation
		// );
		if (error) return;
		form.logo = { ...logo, size: formatBytes(logo?.size) };
	};	

	useEffect(() => {
		setTabIdx(tabList.indexOf(tab));
	}, [tab]);

	return (
		<Box
			className="status"
			px={theme.spacing(20)}
			py={theme.spacing(12)}
			border={1}
			borderColor={theme.palette.border.light}
			borderRadius={theme.shape.borderRadius}
			backgroundColor={theme.palette.background.main}
		>
			<TabContext value={tabList[tabIdx]}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: theme.palette.border.light,
						"& .MuiTabs-root": { height: "fit-content", minHeight: "0" },
					}}
				>
					<TabList
						onChange={handleTabChange}
						aria-label="status tabs"
					>
						{tabList.map((label, index) => (
							<Tab
								label={label}
								key={index}
								value={label}
								sx={{
									fontSize: 13,
									color: theme.palette.text.tertiary,
									textTransform: "none",
									minWidth: "fit-content",
									minHeight: 0,
									paddingLeft: 0,
									paddingY: theme.spacing(4),
									fontWeight: 400,
									marginRight: theme.spacing(8),
									"&:focus": {
										outline: "none",
									},
								}}
							/>
						))}
					</TabList>
				</Box>
				<StatusFormProvider>
					{tabIdx == 0 ? (
						<GeneralSettingsPanel
						errors={errors}
						setErrors={setErrors}/>
					) : (
						<ContentPanel
ss							errors={errors}
							setErrors={setErrors}
						/>
					)}
				</StatusFormProvider>
			</TabContext>
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
		</Box>
	);
};

CreateStatus.propTypes = {
	open: PropTypes.oneOf(["general-settings", "contents"]),
};

export default CreateStatus;
