import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import LockIcon from "../../assets/Images/lock-icon.png";
import PasswordTextField from "../../Components/TextFields/Password/PasswordTextField";
import Check from "../../Components/Check/Check";
import Button from "../../Components/Button";
import LeftArrow from "../../assets/Images/arrow-left.png";

const SetNewPassword = () => {
  return (
    <div className="set-new-password-page">
      <BackgroundPattern />
      <div className="set-new-password-form">
        <div className="set-new-password-form-header">
          <img
            className="set-new-password-form-header-logo"
            src={LockIcon}
            alt="LockIcon"
          />
          <div className="set-new-password-form-gap-medium" />
          <div className="set-new-password-form-heading">Set new password</div>
          <div className="set-new-password-form-gap-small" />
          <div className="set-new-password-form-subheading">
            Your new password must be different to previously used passwords.
          </div>
        </div>
        <div className="set-new-password-form-gap-large"></div>
        <div className="set-new-password-form-content">
          <PasswordTextField
            label="Password"
            error={false}
            placeholder="••••••••"
            id="register-password-input"
          />
          <div className="set-new-password-form-gap-medium"></div>
          <PasswordTextField
            label="Confirm password"
            error={false}
            placeholder="••••••••"
            id="register-password-input"
          />
          <div className="set-new-password-form-gap-medium"></div>
          <div className="set-new-password-form-checks">
            <Check text="Must be at least 8 characters" />
            <div className="set-new-password-form-gap-small"></div>
            <Check text="Must contain one special character" />
          </div>
          <div className="set-new-password-form-gap-medium"></div>
          <Button
            level="primary"
            label="Reset passwprd"
            sx={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "200",
              height: "35px",
            }}
          />
        </div>
        <div className="set-new-password-form-gap-medium"></div>
        <div className="set-new-password-back-button">
          <img
            className="set-new-password-back-button-img"
            src={LeftArrow}
            alt="LeftArrow"
          />
          <div className="set-new-password-back-button-text">
            Back to log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
