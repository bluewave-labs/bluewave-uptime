import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import SuccessIcon from "../../assets/Images/success-icon.png";
import Button from "../../Components/Button";
import LeftArrow from "../../assets/Images/arrow-left.png";

const NewPasswordConfirmed = () => {
  return (
    <div className="password-confirmed-page">
      <BackgroundPattern />
      <div className="password-confirmed-form">
        <div className="password-confirmed-form-header">
          <img
            className="password-confirmed-form-header-logo"
            src={SuccessIcon}
            alt="SuccessIcon"
          />
          <div className="password-confirmed-v-gap-medium"></div>
          <div className="password-confirmed-form-heading">Password reset</div>
          <div className="password-confirmed-v-gap-small"></div>
          <div className="password-confirmed-form-subheading">
            Your password has been successfully reset. Click below to log in
            magically.
          </div>
        </div>
        <div className="password-confirmed-v-gap-large"></div>
        <div className="password-confirmed-body">
          <Button
            level="primary"
            label="Continue"
            sx={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "200",
              height: "44px",
            }}
          />
        </div>
        <div className="password-confirmed-v-gap-large"></div>
        <div className="password-confirmed-back-button">
          <img
            className="password-confirmed-back-button-img"
            src={LeftArrow}
            alt="LeftArrow"
          />
          <div className="password-confirmed-back-button-text">
            Back to log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordConfirmed;
