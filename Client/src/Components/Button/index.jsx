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
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'tertiary' | 'error'} props.level - The level of the button
 * @param {string} props.label - The label of the button
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @returns {JSX.Element}
 * @example
 * // Render an error button
 * <Button level="error" label="Error" disabled />
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
