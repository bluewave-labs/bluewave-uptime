import PropTypes from "prop-types";
import { useTheme } from "@mui/material";
import { BaseLabel } from "../Label";

/**
 * @component
 * @param {Object} props
 * @param { number } props.status - The http status for the label
 * @returns {JSX.Element}
 * @example
 * // Render an 400 http status code label
 * <HttpStatusLabel status=400 />
 */

const getColors = (theme) => ({
	500: {
      textColor: theme.palette.error.text,
      bgColor: theme.palette.error.bg,
      borderColor: theme.palette.error.light,
	},
	400: {
      textColor: theme.palette.warning.text,
      bgColor: theme.palette.warning.bg,
      borderColor: theme.palette.warning.light,
	},
    unresolved: {
      textColor: theme.palette.unresolved.text,
      bgColor: theme.palette.unresolved.bg,
      borderColor: theme.palette.unresolved.light,
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
	const { textColor, bgColor, borderColor } =
		colors[genericStatus] || colors.unresolved;

	return (
      <BaseLabel
          label={status}
          styles={{
            color: textColor,
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
      />
	);
};

HttpStatusLabel.propTypes = {
	status: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export { HttpStatusLabel };
