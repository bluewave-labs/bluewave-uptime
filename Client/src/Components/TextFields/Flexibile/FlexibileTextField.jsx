import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import "./flexibileTextField.css";
import { useTheme } from "@emotion/react";

/**
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the input field.
 * @param {string} props.title - The title or label for the input field.
 * @param {string} props.type - The type of the input field (e.g., 'text', 'password').
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The function to call when the input field value changes.
 * @param {string} [props.error] - Optional. Error message to display if there's an error with the input.
 * @returns {JSX.Element} JSX Element representing the flexible text input field.
 */

const FlexibileTextField = ({
  id,
  title,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const theme = useTheme();
  return (
    <Stack className="flexible-textfield" gap={theme.gap.small}>
      <Typography component="h2">{title}</Typography>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? (
        <Typography component="p" className="input-error">
          {error}
        </Typography>
      ) : (
        ""
      )}
    </Stack>
  );
};

FlexibileTextField.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FlexibileTextField;
