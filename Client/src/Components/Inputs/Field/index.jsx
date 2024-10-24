import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import "./index.css";

/**
 * @param {Object} props
 * @param {string} [props.type] - Type of input field (e.g., 'text', 'password').
 * @param {string} props.id - ID of the input field.
 * @param {string} props.name - Name of the input field.
 * @param {string} [props.label] - Label for the input field.
 * @param {boolean} [props.https] - Indicates if it should display http or https.
 * @param {boolean} [props.isRequired] - Indicates if the field is required, will display a red asterisk.
 * @param {boolean} [props.isOptional] - Indicates if the field is optional, will display optional text.
 * @param {string} [props.optionalLabel] - Optional label for the input field.
 * @param {string} [props.autoComplete] - Autocomplete value for the input field.
 * @param {string} [props.placeholder] - Placeholder text for the input field.
 * @param {string} props.value - Value of the input field.
 * @param {function} props.onChange - Function called on input change.
 * @param {string} [props.error] - Error message to display for the input field.
 * @param {boolean} [props.disabled] - Indicates if the input field is disabled.
 * @param {boolean} [props.hidden] - Indicates if the input field is hidden.
 * @param {React.Ref} [ref] - Ref forwarded to the underlying `TextField` component. Allows for direct interactions such as focusing.
 */

const Field = forwardRef(
	(
		{
			type = "text",
			id,
			name,
			label,
			https,
			isRequired,
			isOptional,
			optionalLabel,
			autoComplete,
			placeholder,
			value,
			onChange,
			onBlur,
			onInput,
			error,
			disabled,
			hidden,
		},
		ref
	) => {
		const theme = useTheme();

		const [isVisible, setVisible] = useState(false);

		return (
			<Stack
				gap={theme.spacing(2)}
				className={`field field-${type}`}
				sx={{
					"& fieldset": {
						borderColor: theme.palette.border.dark,
						borderRadius: theme.shape.borderRadius,
					},
					"&:not(:has(.Mui-disabled)):not(:has(.input-error)) .MuiOutlinedInput-root:hover:not(:has(input:focus)):not(:has(textarea:focus)) fieldset":
						{
							borderColor: theme.palette.border.dark,
						},
					"&:has(.input-error) .MuiOutlinedInput-root fieldset": {
						borderColor: theme.palette.error.text,
					},
					display: hidden ? "none" : "",
				}}
			>
				{label && (
					<Typography
						component="h3"
						color={theme.palette.text.secondary}
						fontWeight={500}
					>
						{label}
						{isRequired ? (
							<Typography
								component="span"
								ml={theme.spacing(1)}
								color={theme.palette.error.text}
							>
								*
							</Typography>
						) : (
							""
						)}
						{isOptional ? (
							<Typography
								component="span"
								fontSize="inherit"
								fontWeight={400}
								ml={theme.spacing(2)}
								sx={{ opacity: 0.6 }}
							>
								{optionalLabel || "(optional)"}
							</Typography>
						) : (
							""
						)}
					</Typography>
				)}
				<TextField
					type={type === "password" ? (isVisible ? "text" : type) : type}
					name={name}
					id={id}
					autoComplete={autoComplete}
					placeholder={placeholder}
					multiline={type === "description"}
					rows={type === "description" ? 4 : 1}
					value={value}
					onInput={onInput}
					onChange={onChange}
					onBlur={onBlur}
					disabled={disabled}
					inputRef={ref}
					inputProps={{
						sx: {
							color: theme.palette.text.secondary,
							"&:-webkit-autofill": {
								WebkitBoxShadow: `0 0 0 100px ${theme.palette.other.autofill} inset`,
								WebkitTextFillColor: theme.palette.text.secondary,
								borderRadius: "0 5px 5px 0",
							},
						},
					}}
					sx={
						type === "url"
							? {
									"& .MuiInputBase-root": { padding: 0 },
									"& .MuiStack-root": {
										borderTopLeftRadius: theme.shape.borderRadius,
										borderBottomLeftRadius: theme.shape.borderRadius,
									},
								}
							: {}
					}
					InputProps={{
						startAdornment: type === "url" && (
							<Stack
								direction="row"
								alignItems="center"
								height="100%"
								sx={{
									borderRight: `solid 1px ${theme.palette.border.dark}`,
									backgroundColor: theme.palette.background.accent,
									pl: theme.spacing(6),
								}}
							>
								<Typography
									component="h5"
									color={theme.palette.text.secondary}
									sx={{ lineHeight: 1 }}
								>
									{https ? "https" : "http"}://
								</Typography>
							</Stack>
						),
						endAdornment: type === "password" && (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setVisible((show) => !show)}
									tabIndex={-1}
									sx={{
										color: theme.palette.border.dark,
										padding: theme.spacing(1),
										"&:focus": {
											outline: "none",
										},
										"& .MuiTouchRipple-root": {
											pointerEvents: "none",
											display: "none",
										},
									}}
								>
									{!isVisible ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{error && (
					<Typography
						component="span"
						className="input-error"
						color={theme.palette.error.text}
						mt={theme.spacing(2)}
						sx={{
							opacity: 0.8,
						}}
					>
						{error}
					</Typography>
				)}
			</Stack>
		);
	}
);

Field.displayName = "Field";

Field.propTypes = {
	type: PropTypes.oneOf(["text", "password", "url", "email", "description", "number"]),
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	label: PropTypes.string,
	https: PropTypes.bool,
	isRequired: PropTypes.bool,
	isOptional: PropTypes.bool,
	optionalLabel: PropTypes.string,
	autoComplete: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onInput: PropTypes.func,
	error: PropTypes.string,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
};

export default Field;
