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
 * @property {React.ReactNode} [startIcon] - Icon prepended to the label
 * @property {React.ReactNode} [endIcon] - Icon appended to the button label
 * @property {boolean} [disabled] - Whether the button is disabled
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - The click handler of the button
 */

const Button = ({ level, label, disabled, startIcon, endIcon, onClick }) => {
  const { variant, color } = levelConfig[level];
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

Button.propTypes = {
  level: PropTypes.oneOf(["primary", "secondary", "tertiary", "error"]),
  label: PropTypes.string.isRequired,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
