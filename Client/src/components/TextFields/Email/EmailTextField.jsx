import React, { useState } from "react";
import "./emailTextField.css";
import { InputAdornment, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function EmailTextField({
  id,
  label,
  variant,
  placeholder,
  icon,
  helperText,
  error,
}) {
  const [showIcon, setShowIcon] = useState(false);

  // State to control mouse hover effect
  const handleMouseEnter = () => setShowIcon(true);
  const handleMouseLeave = () => setShowIcon(false);

  return (
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
              {error && showIcon && (
                <ErrorOutlineIcon style={{ fill: "red" }} />
              )}
              {error && !showIcon && (
                <ErrorOutlineIcon style={{ fill: "red" }} />
              )}
              {!error && showIcon && <HelpOutlineIcon />}
            </InputAdornment>
          ),
        }}
        helperText={helperText}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default EmailTextField;
