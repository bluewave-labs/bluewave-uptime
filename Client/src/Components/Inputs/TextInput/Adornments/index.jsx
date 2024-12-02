import { Stack, Typography, InputAdornment, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import PropTypes from "prop-types";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
export const HttpAdornment = ({ https }) => {
	const theme = useTheme();
	return (
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
				paddingRight={"var(--env-var-spacing-1-minus)"}
				color={theme.palette.text.secondary}
				sx={{ lineHeight: 1, opacity: 0.8 }}
			>
				{https ? "https" : "http"}://
			</Typography>
		</Stack>
	);
};

HttpAdornment.propTypes = {
	https: PropTypes.bool.isRequired,
};

export const PasswordEndAdornment = ({ fieldType, setFieldType }) => {
	const theme = useTheme();
	return (
		<InputAdornment position="end">
			<IconButton
				aria-label="toggle password visibility"
				onClick={() => setFieldType(fieldType === "password" ? "text" : "password")}
				sx={{
					color: theme.palette.border.dark,
					padding: theme.spacing(1),
					"&:focus-visible": {
						outline: `2px solid ${theme.palette.primary.main}`,
						outlineOffset: `2px`,
					},
					"& .MuiTouchRipple-root": {
						pointerEvents: "none",
						display: "none",
					},
				}}
			>
				{fieldType === "password" ? <VisibilityOff /> : <Visibility />}
			</IconButton>
		</InputAdornment>
	);
};

PasswordEndAdornment.propTypes = {
	fieldType: PropTypes.string,
	setFieldType: PropTypes.func,
};
