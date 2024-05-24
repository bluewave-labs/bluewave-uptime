import React, { useState } from "react";
import "./emailTextField.css";
import { InputAdornment, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTheme } from "@mui/material";

/**
 * `EmailTextField` is a functional React component that renders a text field for email input.
 *
 * @component
 * @param {Object} props - The properties that define the `EmailTextField` component.
 * @param {string} props.id - The id of the text field.
 * @param {string} [props.label="Email"] - The label of the text field.
 * @param {string} props.variant - The variant of the text field.
 * @param {string} props.placeholder - The placeholder of the text field.
 * @param {React.Element} props.icon - The icon to be displayed in the text field.
 * @param {string} props.helperText - The helper text to be displayed below the text field.
 * @param {boolean} props.error - If true, the text field will indicate an error state.
 *
 * @example
 * // To use this component, import it and use it in your JSX like this:
 * <EmailTextField id="email" variant="outlined" placeholder="Enter your email" />
 *
 * @returns {React.Element} The `EmailTextField` component with a text field for email input.
 */

const EmailTextField = ({
  id,
  label = "Email",
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
          error={error}
          className="email-text-field-input"
          id={id}
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
