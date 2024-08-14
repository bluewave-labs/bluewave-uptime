import "./check.css";
import PropTypes from "prop-types";
import CheckGrey from "../../assets/icons/check.svg?react";
import CheckOutlined from "../../assets/icons/check-outlined.svg?react";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

/**
 * `Check` is a functional React component that displays a check icon and a label.
 *
 * @component
 * @param {Object} props - The properties that define the `Check` component.
 * @param {string} props.text - The text to be displayed as the label next to the check icon.
 * @param {'info' | 'error' | 'success'} [props.variant='info'] - The variant of the check component, affecting its styling.
 * @param {boolean} [props.outlined] - Whether the check icon should be outlined or not.
 *
 * @example
 * // To use this component, import it and use it in your JSX like this:
 * <Check text="Your Text Here" />
 *
 * @returns {React.Element} The `Check` component with a check icon and a label, defined by the `text` prop.
 */
const Check = ({ text, variant = "info", outlined = false }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      gap={outlined ? theme.gap.medium : theme.gap.small}
      className={`check${
        variant === "error"
          ? " check-error"
          : variant === "success"
          ? " check-success"
          : " check-info"
      }`}
      alignItems="center"
    >
      {outlined ? (
        <CheckOutlined alt="check" />
      ) : (
        <CheckGrey alt="form checks" />
      )}
      <Typography component="span">{text}</Typography>
    </Stack>
  );
};

Check.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  variant: PropTypes.oneOf(["info", "error", "success"]),
  outlined: PropTypes.bool,
};

export default Check;
