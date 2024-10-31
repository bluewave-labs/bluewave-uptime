import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Field from "../../../../Components/Inputs/Field";
import Check from "../../../../Components/Check/Check";
import { useValidatePassword } from "../../hooks/useValidatePassword";

StepThree.propTypes = {
	form: PropTypes.object,
	errors: PropTypes.object,
	onSubmit: PropTypes.func,
	/* onChange: PropTypes.func, */
	onBack: PropTypes.func,
};

/**
 * Renders the third step of the sign up process.
 *
 * @param {Object} props
 * @param {Object} props.form - Form state object.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @param {Function} props.onChange - Callback function to handle form input changes.
 * @param {Function} props.onBack - Callback function to handle "Back" button click.
 * @returns {JSX.Element}
 */
function StepThree({ onSubmit, onBack }) {
	const theme = useTheme();
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const { handleChange, feedbacks, form, errors } = useValidatePassword();

	return (
		<>
			<Stack
				gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
				textAlign="center"
			>
				<Box>
					<Typography component="h1">Sign Up</Typography>
					<Typography>Create your password</Typography>
				</Box>
				<Box
					component="form"
					noValidate
					spellCheck={false}
					onSubmit={onSubmit}
					textAlign="left"
					sx={{
						display: "grid",
						gap: theme.spacing(8),
						"& .input-error": {
							display: "none",
						},
					}}
				>
					<Field
						type="password"
						id="register-password-input"
						name="password"
						label="Password"
						isRequired={true}
						placeholder="Create a password"
						autoComplete="current-password"
						value={form.password}
						onChange={handleChange}
						error={errors.password}
						ref={inputRef}
					/>
					<Field
						type="password"
						id="register-confirm-input"
						name="confirm"
						label="Confirm password"
						isRequired={true}
						placeholder="Confirm your password"
						autoComplete="current-password"
						value={form.confirm}
						onChange={handleChange}
						error={errors.confirm}
					/>
					<Stack
						gap={theme.spacing(4)}
						mb={{ xs: theme.spacing(6), sm: theme.spacing(8) }}
					>
						<Check
							noHighlightText={"Must be at least"}
							text={"8 characters long"}
							variant={feedbacks.length}
						/>
						<Check
							noHighlightText={"Must contain at least"}
							text={"one special character"}
							variant={feedbacks.special}
						/>
						<Check
							noHighlightText={"Must contain at least"}
							text={"one number"}
							variant={feedbacks.number}
						/>
						<Check
							noHighlightText={"Must contain at least"}
							text={"one upper character"}
							variant={feedbacks.uppercase}
						/>
						<Check
							noHighlightText={"Must contain at least"}
							text={"one lower character"}
							variant={feedbacks.lowercase}
						/>
						<Check
							noHighlightText={"Confirm password and password"}
							text={"must match"}
							variant={feedbacks.confirm}
						/>
					</Stack>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Button
							variant="outlined"
							color="info"
							onClick={onBack}
							sx={{
								px: theme.spacing(5),
								"& svg.MuiSvgIcon-root": {
									mr: theme.spacing(3),
								},
								":focus-visible": {
									outline: `2px solid ${theme.palette.primary.dark}`,
									outlineOffset: "4px",
								},
							}}
							props={{ tabIndex: -1 }}
						>
							<ArrowBackRoundedIcon />
							Back
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={
								form.password.length === 0 ||
								form.confirm.length === 0 ||
								Object.keys(errors).length !== 0
							}
							sx={{ width: "30%" }}
						>
							Continue
						</Button>
					</Stack>
				</Box>
			</Stack>
		</>
	);
}

export { StepThree };
