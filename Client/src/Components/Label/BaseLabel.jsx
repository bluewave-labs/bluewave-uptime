import PropTypes from "prop-types";
import "./BaseLabel.css";
import { useTheme } from "@mui/material";

/**
 * @typedef {Object} Styles
 * @param {string} [color] - The text color
 * @param {string} [backgroundColor] - The background color
 * @param {string} [borderColor] - The border color
 */

/**
 * @component
 * @param {Object} props
 * @param {string} props.label - The label of the label
 * @param {Styles} props.styles - CSS Styles passed from parent component
 * @param {React.ReactNode} children - CSS Styles passed from parent component
 * @returns {JSX.Element}
 */

const BaseLabel = ({ label, styles, children }) => {
  const theme = useTheme();
  // Grab the default borderRadius from the theme to match button style
  const { borderRadius } = theme.shape;
  // Calculate padding for the label to mimic button.  Appears to scale correctly, not 100% sure though.
  const padding = theme.spacing(1 * 0.75, 2);

  return (
    <div
      className="label"
      style={{
        borderRadius: borderRadius,
        borderColor: theme.palette.tertiary.main,
        color: theme.palette.tertiary.main,
        padding: padding,
        ...styles,
      }}
    >
      {children}
      {label}
    </div>
  );
};

BaseLabel.propTypes = {
  label: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default BaseLabel;
