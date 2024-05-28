import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import Logomark from "../../assets/Images/key-password.png";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import Button from "../../Components/Button";
import LeftArrow from "../../assets/Images/arrow-left.png";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-page">
      <BackgroundPattern></BackgroundPattern>
      <div className="forgot-password-form">
        <div className="forgot-password-form-header">
          <img
            className="forgot-password-form-header-logo"
            src={Logomark}
            alt="Logomark"
          />
          <div className="forgot-password-v-gap-medium"></div>
          <div className="forgot-password-form-heading">Forgot password?</div>
          <div className="forgot-password-v-gap-small"></div>
          <div className="forgot-password-form-subheading">
            No worries, we’ll send you reset instructions.
          </div>
        </div>
        <div className="forgot-password-v-gap-large"></div>
        <div className="forgot-password-body">
          <EmailTextField
            error={false}
            placeholder="Enter your email"
            id="forgot-password-email-input"
          />
          <div className="forgot-password-v-gap-medium"></div>
          <Button
            level="primary"
            label="Reset password"
            sx={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "200",
              height: "44px",
            }}
          />
        </div>
        <div className="forgot-password-v-gap-large"></div>
        <div className="forgot-password-back-button">
          <img
            className="forgot-password-back-button-img"
            src={LeftArrow}
            alt="LeftArrow"
          />
          <div className="forgot-password-back-button-text">Back to log in</div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
