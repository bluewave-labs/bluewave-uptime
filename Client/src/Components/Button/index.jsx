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
 * @typedef {Object} Props
 * @property {'primary' | 'secondary' | 'tertiary' | 'error'} level - The level of the button
 * @property {string} label - The label of the button
 * @property {boolean} [disabled] - Whether the button is disabled
 */

const Button = ({ level, value, disabled }) => {
  const { variant, color } = levelConfig[level];
  return (
    <MuiButton variant={variant} color={color} disabled={disabled}>
      {value}
    </MuiButton>
  );
};

Button.propTypes = {
  level: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
