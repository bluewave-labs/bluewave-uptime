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

/**
 * ProfilePanel component displays a form for editing user profile information
 * and allows for actions like updating profile picture, credentials,
 * and deleting account.
 *
 * @returns {JSX.Element}
 */

const ProfilePanel = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

	//redux state
	const { user, authToken, isLoading } = useSelector((state) => state.auth);

	const idToName = {
		"edit-first-name": "firstName",
		"edit-last-name": "lastName",
		// Disabled for now, will revisit in the future
		// "edit-email": "email",
	};

	// Local state for form data, errors, and file handling
	const [localData, setLocalData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		// email: user.email, // Disabled for now
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

		//TODO - potentitally remove, will revisit in the future
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

	// Validates input against provided schema and updates error state
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

	// Clears specific error from errors state
	const clearError = (err) => {
		setErrors((prev) => {
			const updatedErrors = { ...prev };
			if (updatedErrors[err]) delete updatedErrors[err];
			return updatedErrors;
		});
	};

	// Resets picture-related states and clears interval
	const removePicture = () => {
		errors["picture"] && clearError("picture");
		setFile({ delete: true });
		clearInterval(intervalRef.current); // interrupt interval if image upload is canceled prior to completing the process
		setProgress({ value: 0, isLoading: false });
	};

	// Opens the picture update modal
	const openPictureModal = () => {
		setIsOpen("picture");
		setFile({ delete: localData.deleteProfileImage });
	};

	// Closes the picture update modal and resets related states
	const closePictureModal = () => {
		errors["picture"] && clearError("picture");
		setFile(); //reset file
		clearInterval(intervalRef.current); // interrupt interval if image upload is canceled prior to completing the process
		setProgress({ value: 0, isLoading: false });
		setIsOpen("");
	};

	// Updates profile image displayed on UI
	const handleUpdatePicture = () => {
		setProgress({ value: 0, isLoading: false });
		setLocalData((prev) => ({
			...prev,
			file: file.src,
			deleteProfileImage: false,
		}));
		setIsOpen("");
		errors["unchanged"] && clearError("unchanged");
	};

	// Handles form submission to update user profile
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

	// Removes current profile image from UI
	const handleDeletePicture = () => {
		setLocalData((prev) => ({
			...prev,
			deleteProfileImage: true,
		}));
		errors["unchanged"] && clearError("unchanged");
	};

	// Initiates the account deletion process
	const handleDeleteAccount = async () => {
		const action = await dispatch(deleteUser(authToken));
		if (action.payload.success) {
			dispatch(clearAuthState());
			dispatch(clearUptimeMonitorState());
		} else {
			if (action.payload) {
				// dispatch errors
				createToast({
					body: action.payload.msg,
				});
			} else {
				// unknown errors
				createToast({
					body: "Unknown error.",
				});
			}
		}
	};

	// Modal state and control functions
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
				gap={theme.spacing(20)}
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
				<Stack direction="row">
					<Stack flex={0.9}>
						<Typography component="h1">Your photo</Typography>
						<Typography
							component="p"
							sx={{ opacity: 0.6 }}
						>
							This photo will be displayed in your profile page.
						</Typography>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						flex={1}
					>
						<Avatar
							src={
								localData?.deleteProfileImage
									? "/static/images/avatar/2.jpg"
									: localData?.file
										? localData.file
										: ""
							}
							sx={{ mr: "8px" }}
						/>
						<Button
							variant="text"
							color="info"
							onClick={handleDeletePicture}
						>
							Delete
						</Button>
						<Button
							variant="text"
							color="primary"
							onClick={openPictureModal}
						>
							Update
						</Button>
					</Stack>
				</Stack>
				<Divider
					aria-hidden="true"
					width="0"
					sx={{
						marginY: theme.spacing(1),
					}}
				/>
				<Stack
					direction="row"
					justifyContent="flex-end"
				>
					<Box width="fit-content">
						<LoadingButton
							variant="contained"
							color="primary"
							onClick={handleSaveProfile}
							loading={isLoading}
							loadingIndicator="Saving..."
							disabled={Object.keys(errors).length !== 0 && !errors?.picture && true}
							sx={{ px: theme.spacing(12) }}
						>
							Save
						</LoadingButton>
					</Box>
				</Stack>
			</Stack>
			<Divider
				aria-hidden="true"
				sx={{
					marginY: theme.spacing(20),
					borderColor: theme.palette.border.light,
				}}
			/>
			{!user.role.includes("demo") && (
				<Box
					component="form"
					noValidate
					spellCheck="false"
				>
					<Box mb={theme.spacing(6)}>
						<Typography component="h1">Delete account</Typography>
						<Typography
							component="p"
							sx={{ opacity: 0.6 }}
						>
							Note that deleting your account will remove all data from our system. This
							is permanent and non-recoverable.
						</Typography>
					</Box>
					<Button
						variant="contained"
						color="error"
						onClick={() => setIsOpen("delete")}
					>
						Delete account
					</Button>
				</Box>
			)}
			<Dialog
				open={isModalOpen("delete")}
				theme={theme}
				title={"Really delete this account?"}
				description={
					"If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable action."
				}
				onCancel={() => setIsOpen("")}
				confirmationButtonLabel={"Delete account"}
				onConfirm={handleDeleteAccount}
				isLoading={isLoading}
			/>

			<GenericDialog
				title={"Upload Image"}
				open={isModalOpen("picture")}
				onClose={closePictureModal}
				theme={theme}
			>
				<ImageField
					id="update-profile-picture"
					src={
						file?.delete
							? ""
							: file?.src
								? file.src
								: localData?.file
									? localData.file
									: user?.avatarImage
										? `data:image/png;base64,${user.avatarImage}`
										: ""
					}
					loading={progress.isLoading && progress.value !== 100}
					onChange={handlePicture}
				/>
				{progress.isLoading || progress.value !== 0 || errors["picture"] ? (
					<ProgressUpload
						icon={<ImageIcon />}
						label={file?.name}
						size={file?.size}
						progress={progress.value}
						onClick={removePicture}
						error={errors["picture"]}
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
						onClick={removePicture}
					>
						Remove
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleUpdatePicture}
						disabled={
							(Object.keys(errors).length !== 0 && errors?.picture) ||
							progress.value !== 100
								? true
								: false
						}
					>
						Update
					</Button>
				</Stack>
			</GenericDialog>
		</TabPanel>
	);
};

ProfilePanel.propTypes = {
	// No props are being passed to this component, hence no specific PropTypes are defined.
};

export default ProfilePanel;
