import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Field from "../../Inputs/Field";
import { credentials } from "../../../Validation/validation";
import Alert from "../../Alert";
import { update } from "../../../Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../../Utils/toastUtils";

/**
 * PasswordPanel component manages the form for editing password.
 *
 * @returns {JSX.Element}
 */

const PasswordPanel = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

	//redux state
	const { authToken, isLoading } = useSelector((state) => state.auth);

	const idToName = {
		"edit-current-password": "password",
		"edit-new-password": "newPassword",
		"edit-confirm-password": "confirm",
	};

	const [localData, setLocalData] = useState({
		password: "",
		newPassword: "",
		confirm: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		const { value, id } = event.target;
		const name = idToName[id];
		setLocalData((prev) => ({
			...prev,
			[name]: value,
		}));

		const validation = credentials.validate(
			{ [name]: value },
			{ abortEarly: false, context: { password: localData.newPassword } }
		);

		setErrors((prev) => {
			const updatedErrors = { ...prev };

			if (validation.error) {
				updatedErrors[name] = validation.error.details[0].message;
			} else {
				delete updatedErrors[name];
			}
			return updatedErrors;
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error } = credentials.validate(localData, {
			abortEarly: false,
			context: { password: localData.newPassword },
		});

		if (error) {
			const newErrors = {};
			error.details.forEach((err) => {
				newErrors[err.path[0]] = err.message;
			});
			setErrors(newErrors);
		} else {
			const action = await dispatch(update({ authToken, localData }));
			if (action.payload.success) {
				createToast({
					body: "Your password was changed successfully.",
				});
				setLocalData({
					password: "",
					newPassword: "",
					confirm: "",
				});
			} else {
				// TODO: Check for other errors?
				createToast({
					body: "Your password input was incorrect.",
				});
				setErrors({ password: "*" + action.payload.msg + "." });
			}
		}
	};

	return (
		<TabPanel
			value="password"
			sx={{
				"& h1, & input": {
					color: theme.palette.text.tertiary,
				},
			}}
		>
			<Stack
				component="form"
				onSubmit={handleSubmit}
				noValidate
				spellCheck="false"
				gap={theme.spacing(20)}
			>
				<Stack direction="row">
					<Box flex={0.9}>
						<Typography component="h1">Current password</Typography>
					</Box>
					<Field
						type="text"
						id="hidden-username"
						name="username"
						autoComplete="username"
						hidden={true}
						value=""
					/>
					<Field
						type="password"
						id="edit-current-password"
						placeholder="Enter your current password"
						autoComplete="current-password"
						value={localData.password}
						onChange={handleChange}
						error={errors[idToName["edit-current-password"]]}
					/>
				</Stack>
				<Stack direction="row">
					<Box flex={0.9}>
						<Typography component="h1">New password</Typography>
					</Box>
					<Field
						type="password"
						id="edit-new-password"
						placeholder="Enter your new password"
						autoComplete="new-password"
						value={localData.newPassword}
						onChange={handleChange}
						error={errors[idToName["edit-new-password"]]}
					/>
				</Stack>
				<Stack direction="row">
					<Box flex={0.9}>
						<Typography component="h1">Confirm new password</Typography>
					</Box>
					<Field
						type="password"
						id="edit-confirm-password"
						placeholder="Reenter your new password"
						autoComplete="new-password"
						value={localData.confirm}
						onChange={handleChange}
						error={errors[idToName["edit-confirm-password"]]}
					/>
				</Stack>
				<Stack direction="row">
					<Box flex={0.9}></Box>
					<Box sx={{ flex: 1 }}>
						<Alert
							variant="warning"
							body="New password must contain at least 8 characters and must have at least one uppercase letter, one number and one symbol."
						/>
					</Box>
				</Stack>
				<Stack
					direction="row"
					justifyContent="flex-end"
				>
					<LoadingButton
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						loading={isLoading}
						loadingIndicator="Saving..."
						disabled={Object.keys(errors).length !== 0 && true}
						sx={{
							px: theme.spacing(12),
							mt: theme.spacing(20),
						}}
					>
						Save
					</LoadingButton>
				</Stack>
			</Stack>
		</TabPanel>
	);
};

PasswordPanel.propTypes = {
	// No props are being passed to this component, hence no specific PropTypes are defined.
};

export default PasswordPanel;
