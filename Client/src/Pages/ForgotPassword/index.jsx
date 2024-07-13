import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import Logomark from "../../assets/Images/key-password.png";
import Button from "../../Components/Button";
import LeftArrow from "../../assets/Images/arrow-left.png";
import { useState, useEffect } from "react";
import { recoveryValidation } from "../../Validation/validation";
import axiosInstance from "../../Utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Used to disable the button while loading so user doesn't submit multiple times
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
  });

  const idMap = {
    "forgot-password-email-input": "email",
  };

  useEffect(() => {
    const { error } = recoveryValidation.validate(form);
    if (error === undefined) {
      setErrors({});
    } else {
      const validationErrors = error.details.reduce((acc, err) => {
        return { ...acc, [err.path[0]]: err.message };
      }, {});
      setErrors(validationErrors);
    }
  }, [form]);

  const handleInput = (e) => {
    const fieldName = idMap[e.target.id];
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async () => {
    //TODO show loading spinner
    setIsLoading(true);
    try {
      const { error } = recoveryValidation.validate(form);
      if (error !== undefined) {
        throw error;
      }
      await axiosInstance.post(`/auth/recovery/request`, form);
      navigate("/check-email");
    } catch (error) {
      //TODO display error (Toast?)
      alert(error);
    } finally {
      setIsLoading(false);
    }
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
            onChange={handleInput}
            error={errors.email}
          />
          <div className="forgot-password-v-gap-medium"></div>
          <Button
            disabled={errors.email !== undefined || isLoading === true}
            onClick={handleSubmit}
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
