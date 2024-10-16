import PropTypes from "prop-types";
import { useTheme } from "@mui/material";
import { ColoredLabel } from "../Label";

/**
 * @component
 * @param {Object} props
 * @param { 400 | 500 | 5000 } props.status - The http status for the label
 * @returns {JSX.Element}
 * @example
 * // Render an 400 http status code label
 * <HttpStatusLabel status=400 />
 */

const HttpStatusLabel = ({ status }) => {
	const theme = useTheme();
	const colors = {
		500: {
			textColor: theme.palette.error.main,
		},
		400: {
			textColor: theme.palette.warning.main,
		},
		unresolved: {
			textColor: theme.palette.unresolved.main,
		},
	};

	// Get the generic status code
	const genericStatus = String(status)[0] * 100;
	// Look up the color for the status
	const { textColor } =
		colors[genericStatus] || colors["unresolved"];

	return (
		<ColoredLabel
			label={String(status)}
			color={textColor}
		/>
	);
};

HttpStatusLabel.propTypes = {
	status: PropTypes.oneOf([400, 500, 5000, "unresolved"]),
};

export { HttpStatusLabel };
