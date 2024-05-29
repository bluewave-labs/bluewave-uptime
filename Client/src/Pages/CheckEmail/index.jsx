import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import EmailIcon from "../../assets/Images/email.png";
import Button from "../../Components/Button";
import LeftArrow from "../../assets/Images/arrow-left.png";

const CheckEmail = () => {
  return (
    <div className="check-email-page">
      <BackgroundPattern />
      <div className="check-email-form">
        <div className="check-email-form-header">
          <img
            className="check-email-form-header-logo"
            src={EmailIcon}
            alt="EmailIcon"
          />
          <div className="check-email-v-gap-medium"></div>
          <div className="check-email-form-heading">Check your email</div>
          <div className="check-email-v-gap-small"></div>
          <div className="check-email-form-subheading">
            We sent a password reset link to <span>username@email.com</span>
          </div>
        </div>
        <div className="check-email-v-gap-large"></div>
        <div className="check-email-body">
          <Button
            level="primary"
            label="Open email app"
            sx={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "200",
              height: "44px",
            }}
          />
        </div>
        <div className="check-email-v-gap-large"></div>
        <div className="check-email-resend">
          Didn’t receive the email?
          <span> Click to resend</span>
        </div>
        <div className="check-email-v-gap-large"></div>
        <div className="check-email-back-button">
          <img
            className="check-email-back-button-img"
            src={LeftArrow}
            alt="LeftArrow"
          />
          <div className="check-email-back-button-text">Back to log in</div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
