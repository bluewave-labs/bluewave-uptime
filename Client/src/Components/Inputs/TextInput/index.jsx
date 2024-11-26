import { Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { forwardRef, useState, cloneElement } from "react";
import PropTypes from "prop-types";

const getSx = (theme, type, maxWidth) => {
	const sx = {
		maxWidth: maxWidth,
	};

	if (type === "url") {
		return {
			...sx,
			"& .MuiInputBase-root": { padding: 0 },
			"& .MuiStack-root": {
				borderTopLeftRadius: theme.shape.borderRadius,
				borderBottomLeftRadius: theme.shape.borderRadius,
			},
		};
	}
	return sx;
};

const Required = () => {
	const theme = useTheme();
	return (
		<Typography
			component="span"
			ml={theme.spacing(1)}
			color={theme.palette.error.main}
		>
			*
		</Typography>
	);
};

const Optional = ({ optionalLabel }) => {
	const theme = useTheme();
	return (
		<Typography
			component="span"
			fontSize="inherit"
			fontWeight={400}
			ml={theme.spacing(2)}
			sx={{ opacity: 0.6 }}
		>
			{optionalLabel || "(optional)"}
		</Typography>
	);
};

Optional.propTypes = {
	optionalLabel: PropTypes.string,
};

const TextInput = forwardRef(
	(
		{
			type,
			value,
			placeholder,
			isRequired,
			isOptional,
			optionalLabel,
			onChange,
			error = false,
			helperText = null,
			startAdornment = null,
			endAdornment = null,
			label = null,
			maxWidth = "100%",
		},
		ref
	) => {
		const [fieldType, setFieldType] = useState(type);
		const theme = useTheme();
		return (
			<Stack>
				<Typography
					component="h3"
					fontSize={"var(--env-var-font-size-medium)"}
					color={theme.palette.text.secondary}
					fontWeight={500}
				>
					{label}
					{isRequired && <Required />}
					{isOptional && <Optional optionalLabel={optionalLabel} />}
				</Typography>
				<TextField
					type={fieldType}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					error={error}
					helperText={helperText}
					inputRef={ref}
					sx={getSx(theme, type, maxWidth)}
					slotProps={{
						input: {
							startAdornment: startAdornment,
							endAdornment: endAdornment
								? cloneElement(endAdornment, { fieldType, setFieldType })
								: null,
						},
					}}
				/>
			</Stack>
		);
	}
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool,
	isOptional: PropTypes.bool,
	optionalLabel: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	startAdornment: PropTypes.node,
	endAdornment: PropTypes.node,
	label: PropTypes.string,
	maxWidth: PropTypes.string,
};

export default TextInput;
