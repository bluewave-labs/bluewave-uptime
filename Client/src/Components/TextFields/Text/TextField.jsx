import "./textField.css";
import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTheme } from "@mui/material";

/**
 * @param {Object} props - The component props.
 * @param {function} props.onChange - The function to call when the text field changes.
 * @param {string} props.id - The ID of the text field.
 * @param {string} props.label - The label text for the text field.
 * @param {string} props.value - The value of the text field.
 * @param {string} props.variant - The variant of the text field.
 * @param {string} props.placeholder - The placeholder text for the text field.
 * @param {ReactNode} props.icon - The icon to display in the text field.
 * @param {string} props.helperText - The helper text for the text field.
 * @param {boolean} props.error - Whether the text field has an error.
 * @returns {JSX.Element} The rendered component.
 */
const StringTextField = ({
  onChange,
  autoComplete,
  id,
  label,
  value = undefined,
  variant,
  placeholder,
  icon,
  helperText,
  error,
}) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  const [showIcon, setShowIcon] = useState(false);

  const handleMouseEnter = () => setShowIcon(true);
  const handleMouseLeave = () => setShowIcon(false);

  return (
    <div style={{ fontFamily: fontFamily }}>
      <div className="email-text-field-title">{label}</div>
      <div className="email-text-field">
        <TextField
          onChange={onChange}
          error={error}
          className="email-text-field-input"
          id={id}
          variant={variant}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div className="icon-holder">
                  {error && showIcon && (
                    <ErrorOutlineIcon
                      className="text-field-icon"
                      style={{ fill: "red", width: "16px", height: "16px" }}
                    />
                  )}
                  {error && !showIcon && (
                    <ErrorOutlineIcon
                      className="text-field-icon"
                      style={{ fill: "red", width: "16px", height: "16px" }}
                    />
                  )}
                  {!error && showIcon && (
                    <HelpOutlineIcon
                      className="text-field-icon"
                      style={{ width: "16px", height: "16px" }}
                    />
                  )}
                </div>
              </InputAdornment>
            ),
          }}
          helperText={helperText}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default StringTextField;
