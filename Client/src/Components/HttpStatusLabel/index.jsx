import PropTypes from "prop-types";
import { useTheme } from "@mui/material";
import { BaseLabel } from "../Label";

/**
 * @component
 * @param {Object} props
 * @param {number | 'N/A'} props.status - The http status for the label
 * @param {Styles} props.customStyles - CSS Styles passed from parent component
 * @returns {JSX.Element}
 * @example
 * // Render a http status label
 * <HttpStatusLabel status="404" />
 */

const getRoundedStatusCode = (status) => {
	if (typeof status === "number" && status >= 100 && status < 600) {
		return Math.floor(status / 100) * 100;
	}
	return status;
};

const HttpStatusLabel = ({ status, customStyles }) => {
	const theme = useTheme();
	const colors = {
		400: {
			dotColor: theme.palette.warning.main,
			bgColor: theme.palette.warning.bg,
			borderColor: theme.palette.warning.light,
		},
		500: {
			dotColor: theme.palette.error.main,
			bgColor: theme.palette.error.bg,
			borderColor: theme.palette.error.light,
		},
		"N/A": {
			dotColor: theme.palette.unresolved.main,
			bgColor: theme.palette.unresolved.bg,
			borderColor: theme.palette.unresolved.light,
		},
	};

	const { borderColor, bgColor, dotColor } =
		colors[getRoundedStatusCode(status)] || colors["N/A"];

	return (
		<BaseLabel
			label={String(status)}
			styles={{
				color: dotColor,
				backgroundColor: bgColor,
				borderColor: borderColor,
				...customStyles,
			}}
		/>
	);
};

// TODO: Restrict status type to accept only numeric values after "N/A" status in IncidentTable is resolved
HttpStatusLabel.propTypes = {
	status: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["N/A"])]).isRequired,
	customStyles: PropTypes.object,
};

export { HttpStatusLabel };
