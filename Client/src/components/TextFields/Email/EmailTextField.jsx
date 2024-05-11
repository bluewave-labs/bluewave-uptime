import React, { useState } from "react";
import "./emailTextField.css";
import { InputAdornment, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const EmailTextField = ({
  id,
  label,
  variant,
  placeholder,
  icon,
  helperText,
  error,
}) => {
  const [showIcon, setShowIcon] = useState(false);

  const handleMouseEnter = () => setShowIcon(true);
  const handleMouseLeave = () => setShowIcon(false);

  return (
    <>
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
    </>
  );
};

export default EmailTextField;
