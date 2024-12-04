import { useTheme } from "@emotion/react";
import { useRef, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Avatar from "../../Avatar";
import TextInput from "../../Inputs/TextInput";
import ImageField from "../../Inputs/Image";
import { credentials, imageValidation } from "../../../Validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, deleteUser, update } from "../../../Features/Auth/authSlice";
import ImageIcon from "@mui/icons-material/Image";
import ProgressUpload from "../../ProgressBars";
import { formatBytes } from "../../../Utils/fileUtils";
import { clearUptimeMonitorState } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { createToast } from "../../../Utils/toastUtils";
import { logger } from "../../../Utils/Logger";
import LoadingButton from "@mui/lab/LoadingButton";
import { GenericDialog } from "../../Dialog/genericDialog";
import Dialog from "../../Dialog";

const ProfilePanel = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

	// Define the constant for consistent gap
	const SPACING_GAP = theme.spacing(13);
	// Redux state
	const { user, authToken, isLoading } = useSelector((state) => state.auth);

	const idToName = {
		"edit-first-name": "firstName",
		"edit-last-name": "lastName",
	};

	const [localData, setLocalData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
	});
	const [errors, setErrors] = useState({});
	const [file, setFile] = useState();
	const intervalRef = useRef(null);
	const [progress, setProgress] = useState({ value: 0, isLoading: false });

	// Handles input field changes and performs validation
	const handleChange = (event) => {
		errors["unchanged"] && clearError("unchanged");
		const { value, id } = event.target;
		const name = idToName[id];
		setLocalData((prev) => ({
			...prev,
			[name]: value,
		}));

		validateField({ [name]: value }, credentials, name);
	};

	// Handles image file
	const handlePicture = (event) => {
		const pic = event.target.files[0];
		let error = validateField({ type: pic.type, size: pic.size }, imageValidation);
		if (error) return;

		setProgress((prev) => ({ ...prev, isLoading: true }));
		setFile({
			src: URL.createObjectURL(pic),
			name: pic.name,
			size: formatBytes(pic.size),
			delete: false,
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

	const validateField = (toValidate, schema, name = "picture") => {
		const { error } = schema.validate(toValidate, { abortEarly: false });
		setErrors((prev) => {
			const prevErrors = { ...prev };
			if (error) prevErrors[name] = error.details[0].message;
			else delete prevErrors[name];
			return prevErrors;
		});
		if (error) return true;
	};

	const clearError = (err) => {
		setErrors((prev) => {
			const updatedErrors = { ...prev };
			if (updatedErrors[err]) delete updatedErrors[err];
			return updatedErrors;
		});
	};

	const handleSaveProfile = async (event) => {
		event.preventDefault();
		if (
			localData.firstName === user.firstName &&
			localData.lastName === user.lastName &&
			localData.deleteProfileImage === undefined &&
			localData.file === undefined
		) {
			createToast({
				body: "Unable to update profile — no changes detected.",
			});
			setErrors({ unchanged: "unable to update profile" });
			return;
		}

		const action = await dispatch(update({ authToken, localData }));
		if (action.payload.success) {
			createToast({
				body: "Your profile data was changed successfully.",
			});
		} else {
			createToast({
				body: "There was an error updating your profile data.",
			});
		}
	};

	const handleDeletePicture = () => {
		setLocalData((prev) => ({
			...prev,
			deleteProfileImage: true,
		}));
		errors["unchanged"] && clearError("unchanged");
	};

	const [isOpen, setIsOpen] = useState("");
	const isModalOpen = (name) => isOpen === name;

	return (
		<TabPanel
			value="profile"
			sx={{
				"& h1, & p, & input": {
					color: theme.palette.text.tertiary,
				},
			}}
		>
			<Stack
				component="form"
				className="edit-profile-form"
				noValidate
				spellCheck="false"
				gap={SPACING_GAP} //  Applied SPACING_GAP for consistent spacing
			>
				<Stack direction="row">
					<Box flex={0.9}>
						<Typography component="h1">First name</Typography>
					</Box>
					<TextInput
						id="edit-first-name"
						value={localData.firstName}
						placeholder="Enter your first name"
						autoComplete="given-name"
						onChange={handleChange}
						error={errors[idToName["edit-first-name"]] ? true : false}
						helperText={errors[idToName["edit-first-name"]]}
						flex={1}
					/>
				</Stack>
				<Stack direction="row">
					<Box flex={0.9}>
						<Typography component="h1">Last name</Typography>
					</Box>
					<TextInput
						id="edit-last-name"
						placeholder="Enter your last name"
						autoComplete="family-name"
						value={localData.lastName}
						onChange={handleChange}
						error={errors[idToName["edit-last-name"]] ? true : false}
						helperText={errors[idToName["edit-last-name"]]}
						flex={1}
					/>
				</Stack>
				<Stack direction="row">
					<Stack flex={0.9}>
						<Typography component="h1">Email</Typography>
						<Typography
							component="p"
							sx={{ opacity: 0.6 }}
						>
							This is your current email address — it cannot be changed.
						</Typography>
					</Stack>
					<TextInput
						id="edit-email"
						value={user.email}
						placeholder="Enter your email"
						autoComplete="email"
						onChange={() => logger.warn("disabled")}
						disabled={true}
						flex={1}
					/>
				</Stack>
			</Stack>
		</TabPanel>
	);
};

ProfilePanel.propTypes = {
	// No props are being passed to this component, hence no specific PropTypes are defined.
};

export default ProfilePanel;
