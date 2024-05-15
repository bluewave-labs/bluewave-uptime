import React, { useState } from "react";
import "./emailTextField.css";
import { InputAdornment, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {string} props.id - Unique ID for the text field (optional)
 * @param {string} props.label - The label text displayed above the text field (optional)
 * @param {"standard" | "outlined" | "filled"} props.variant - The variant of the text field (e.g., "outlined") (optional)
 * @param {string} props.placeholder - The placeholder text displayed within the text field (optional)
 * @param {"error" | "help"} [props.icon] - The type of icon to display (error or help) (optional)
 * @param {string} props.helperText - The helper text displayed below the text field (optional)
 * @param {boolean} props.error - A flag indicating if the text field has an error (required)
 * @returns {JSX.Element} - Renders the email text field component with dynamic icon display
 */
const EmailTextField = ({
  id,
  label,
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
      <div className="email-text-field-title">Email</div>
      <div className="email-text-field">
        <TextField
          error={error}
          className="email-text-field-input"
          id={id}
          label={label}
          variant={variant}
          placeholder={placeholder}
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

export default EmailTextField;
