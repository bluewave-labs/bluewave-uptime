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

const getColors = (theme) => ({
	500: {
		textColor: theme.palette.error.main,
	},
	400: {
		textColor: theme.palette.warning.text,
	},
    unresolved: {
        textColor: theme.palette.info.text,
    },
});

const getGenericStatus = (status) => {
    if (typeof status === 'number' && status >= 100 && status < 600) {
        return Math.floor(status / 100) * 100;
    }
    return "unresolved";
};

const HttpStatusLabel = ({ status }) => {
	const theme = useTheme();
	const colors = getColors(theme);
	// Get the generic status code
	const genericStatus = getGenericStatus(status);
	// Look up the color for the status
	const { textColor } =
		colors[genericStatus] || colors.unresolved;

	return (
		<ColoredLabel
			label={status}
			color={textColor}
		/>
	);
};

HttpStatusLabel.propTypes = {
	status: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export { HttpStatusLabel };
