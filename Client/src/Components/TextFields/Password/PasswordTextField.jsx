import "./passwordTextField.css";
import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTheme } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

/**
 * @component
 * @param {Object} props
 * @param {function} props.onChange - The function to call when the text field changes (optional)
 * @param {string} props.id - Unique ID for the text field (optional)
 * @param {string} props.label - The label text displayed above the text field (optional)
 * @param {"standard" | "outlined" | "filled"} props.variant - The variant of the text field (e.g., "outlined") (optional)
 * @param {string} props.placeholder - The placeholder text displayed within the text field (optional)
 * @param {"error" | "help"} [props.icon] - The type of icon to display (error or help) (optional)
 * @param {string} props.helperText - The helper text displayed below the text field (optional)
 * @param {boolean} props.error - A flag indicating if the text field has an error (required)
 * @param {boolean} props.visibility - A flag indicating if the password visibility is toggled (optional)
 * @param {function} props.setVisibility - Function to toggle password visibility (optional)
 * @returns {JSX.Element} - Renders the password text field component with dynamic icon display
 */
const PasswordTextField = ({
  onChange,
  id,
  label = "Password",
  autoComplete,
  variant,
  placeholder,
  icon,
  helperText,
  error,
  visibility,
  setVisibility,
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
      <div className="password-text-field-title">{label}</div>
      <div className="password-text-field">
        <TextField
          onChange={onChange}
          type={visibility ? "text" : "password"}
          autoComplete={autoComplete}
          error={error}
          className="password-text-field-input"
          id={id}
          variant={variant}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {visibility !== undefined ? (
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setVisibility((show) => !show)}
                  tabIndex={-1}
                  sx={{
                    width: "30px",
                    height: "30px",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {!visibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                ) : (
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
                )}
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

export default PasswordTextField;
