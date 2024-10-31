import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Field from "../../../../Components/Inputs/Field";

StepOne.propTypes = {
	form: PropTypes.object,
	errors: PropTypes.object,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	onBack: PropTypes.func,
};

/**
 * Renders the first step of the sign up process.
 *
 * @param {Object} props
 * @param {Object} props.form - Form state object.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @param {Function} props.onChange - Callback function to handle form input changes.
 * @param {Function} props.onBack - Callback function to handle "Back" button click.
 * @returns {JSX.Element}
 */

function StepOne({ form, errors, onSubmit, onChange, onBack }) {
	const theme = useTheme();
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<>
			<Stack
				gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
				textAlign="center"
			>
				<Box>
					<Typography component="h1">Sign Up</Typography>
					<Typography>Enter your personal details</Typography>
				</Box>
				<Box textAlign="left">
					<Box
						component="form"
						noValidate
						spellCheck={false}
						onSubmit={onSubmit}
						mb={theme.spacing(10)}
					>
						<Field
							id="register-firstname-input"
							label="Name"
							isRequired={true}
							placeholder="Jordan"
							autoComplete="given-name"
							value={form.firstName}
							onChange={onChange}
							error={errors.firstName}
							ref={inputRef}
						/>
					</Box>
					<Box
						component="form"
						noValidate
						spellCheck={false}
						onSubmit={onSubmit}
						mb={theme.spacing(5)}
					>
						<Field
							id="register-lastname-input"
							label="Surname"
							isRequired={true}
							placeholder="Ellis"
							autoComplete="family-name"
							value={form.lastName}
							onChange={onChange}
							error={errors.lastName}
						/>
					</Box>
				</Box>
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
						}}
						props={{ tabIndex: -1 }}
					>
						<ArrowBackRoundedIcon />
						Back
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={onSubmit}
						disabled={(errors.firstName || errors.lastName) && true}
						sx={{ width: "30%" }}
					>
						Continue
					</Button>
				</Stack>
			</Stack>
		</>
	);
}

export { StepOne };
