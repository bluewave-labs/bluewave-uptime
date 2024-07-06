import React from "react";
import "./descriptionTextField.css";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {function} props.onChange - The function to call when the text field changes (optional)
 * @param {string} props.hintText - The hint text displayed within the text field (required)
 * @param {boolean} props.hasError - A flag indicating if the text field has an error (required)
 * @returns {JSX.Element} - Renders the description text field component
 */
const DescriptionTextField = ({ onChange, hintText, hasError }) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  return (
    <div
      className="description-field-holder"
      style={{ fontFamily: fontFamily }}
    >
      <div className="text-field-title">Description</div>
      <TextField
        onChange={onChange}
        id="description-field-area"
        error={hasError}
        className="description-field-area"
        multiline
        rows={4}
        placeholder="Enter a description..."
        helperText={hintText}
      />
    </div>
  );
};

DescriptionTextField.propTypes = {
  hintText: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default DescriptionTextField;
