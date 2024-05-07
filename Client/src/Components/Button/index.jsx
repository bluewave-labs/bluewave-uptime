import { Button as MuiButton } from "@mui/material";
import PropTypes from "prop-types";

const levelConfig = {
  primary: {
    variant: "contained",
    color: "primary",
  },
  secondary: {
    variant: "outlined",
    color: "secondary",
  },
  tertiary: {
    variant: "text",
    color: "tertiary",
  },
  error: {
    variant: "contained",
    color: "error",
  },
};

/**
 * @param {Object} Props
 * @param {'primary' | 'secondary' | 'tertiary' | 'error'} level - The level of the button
 * @param {string} label - The label of the button
 * @param {boolean} [disabled] - Whether the button is disabled
 */

const Button = ({ level, label, disabled }) => {
  const { variant, color } = levelConfig[level];
  return (
    <MuiButton variant={variant} color={color} disabled={disabled}>
      {label}
    </MuiButton>
  );
};

Button.propTypes = {
  level: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
