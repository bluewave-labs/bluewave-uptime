import React, { useState } from "react";
import "./index.css";
import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import Logomark from "../../assets/Images/Logomark.png";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import PasswordTextField from "../../Components/TextFields/Password/PasswordTextField";
import StringTextField from "../../Components/TextFields/Text/TextField";
import Check from "../../Components/Check/Check";
import Button from "../../Components/Button";
import Google from "../../assets/Images/Google.png";

const Register = () => {
  const idMap = {
    "register-firstname-input": "firstname",
    "register-lastname-input": "lastname",
    "register-email-input": "email",
    "register-password-input": "password",
  };

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const fieldName = idMap[e.target.id];
    setForm({
      ...form,
      [idMap[e.target.id]]: e.target.value,
    });
  };

  return (
    <div className="register-page">
      <BackgroundPattern></BackgroundPattern>
      <div className="register-form">
        <div className="register-form-header">
          <img
            className="register-form-header-logo"
            src={Logomark}
            alt="Logomark"
          />
          <div className="register-form-v-spacing-large" />
          <div className="register-form-heading">Create an account</div>
          <div className="register-form-v-spacing-large"></div>
        </div>
        <div className="register-form-v-spacing-40px" />
        <div className="register-form-inputs">
          <StringTextField
            onChange={handleInput}
            error={false}
            label="First name*"
            placeholder="Enter your first name"
            id="register-firstname-input"
          />
          <div className="login-form-v2-spacing" />
          <StringTextField
            onChange={handleInput}
            error={false}
            label="Last name*"
            placeholder="Enter your last name"
            id="register-lastname-input"
          />
          <div className="login-form-v2-spacing" />
          <EmailTextField
            onChange={handleInput}
            label="Email*"
            error={false}
            placeholder="Enter your email"
            id="register-email-input"
          />
          <div className="login-form-v2-spacing" />
          <PasswordTextField
            onChange={handleInput}
            label="Password*"
            error={false}
            placeholder="Create a password"
            id="register-password-input"
          />
        </div>
        <div className="login-form-v2-spacing" />
        <div className="register-form-checks">
          <Check text="Must be at least 8 characters" />
          <div className="register-form-v-spacing-small"></div>
          <Check text="Must contain one special character" />
        </div>
        <div className="login-form-v2-spacing" />
        <div className="register-form-actions">
          <Button level="primary" label="Get started" sx={{ width: "100%" }} />
          <div className="login-form-v-spacing" />
          <Button
            disabled={true}
            level="secondary"
            label="Sign up with Google"
            sx={{ width: "100%", color: "#344054", fontWeight: "700" }}
            img={<img className="google-enter" src={Google} alt="Google" />}
          />
        </div>
      </div>
      <div className="register-bottom-spacing"></div>
    </div>
  );
};

export default Register;
