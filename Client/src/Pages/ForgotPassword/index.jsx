import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import Logomark from "../../assets/Images/key-password.png";
import LeftArrow from "../../assets/Images/arrow-left.png";
import { useState } from "react";
import { credentials } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";
import { createToast } from "../../Utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Features/Auth/authSlice";
import ButtonSpinner from "../../Components/ButtonSpinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
  });

  const idMap = {
    "forgot-password-email-input": "email",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = credentials.validate(form, { abortEarly: false });

    if (error) {
      // validation errors
      const err =
        error.details && error.details.length > 0
          ? error.details[0].message
          : "Error validating data.";
      setErrors(err);
      createToast({
        variant: "info",
        body: err,
        hasIcon: false,
      });
    } else {
      const action = await dispatch(forgotPassword(form));
      if (action.payload.success) {
        navigate("/check-email");
        createToast({
          variant: "info",
          body: `Instructions sent to ${form.email}.`,
          hasIcon: false,
        });
      } else {
        if (action.payload) {
          // dispatch errors
          createToast({
            variant: "info",
            body: action.payload.msg,
            hasIcon: false,
          });
        } else {
          // unknown errors
          createToast({
            variant: "info",
            body: "Unknown error.",
            hasIcon: false,
          });
        }
      }
    }
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idMap[id];
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { error } = credentials.validate(
      { [name]: value },
      { abortEarly: false }
    );

    setErrors((prev) => {
      const prevErrors = { ...prev };
      if (error) prevErrors[name] = error.details[0].message;
      else delete prevErrors[name];
      return prevErrors;
    });
  };

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
          <Field
            type="email"
            id="forgot-password-email-input"
            label="Email"
            isRequired={true}
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="forgot-password-v-gap-medium"></div>
          <ButtonSpinner
            disabled={errors.email !== undefined}
            onClick={handleSubmit}
            isLoading={isLoading}
            level="primary"
            label="Reset password"
            sx={{
              width: "100%",
              fontSize: "13px",
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
