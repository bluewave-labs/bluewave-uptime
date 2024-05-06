import PropTypes from "prop-types";
import "./index.css";
import { useTheme } from "@mui/material";

/**
 * @typedef {Object} Props
 * @property {string} label - The label of the button
 */

const Label = ({ label, color }) => {
  const theme = useTheme();

  const config = {
    orange: {
      borderColor: theme.palette.labelOrange.borderColor,
      bgColor: theme.palette.labelOrange.bgColor,
      textColor: theme.palette.labelOrange.textColor,
    },
    gray: {
      borderColor: theme.palette.labelGray.borderColor,
      bgColor: theme.palette.labelGray.bgColor,
      textColor: theme.palette.labelGray.textColor,
    },
    purple: {
      borderColor: theme.palette.labelPurple.borderColor,
      bgColor: theme.palette.labelPurple.bgColor,
      textColor: theme.palette.labelPurple.textColor,
    },
    green: {
      borderColor: theme.palette.labelGreen.borderColor,
      bgColor: theme.palette.labelGreen.bgColor,
      textColor: theme.palette.labelGreen.textColor,
    },
  };

  const { borderColor, bgColor, textColor } = config[color];
  const { borderRadius } = theme.shape;
  return (
    <div
      className="label"
      style={{
        borderRadius: borderRadius,
        borderColor: borderColor,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {label}
    </div>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Label;
