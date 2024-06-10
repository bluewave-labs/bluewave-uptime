import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import Logomark from "../../assets/Images/Logomark.png";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import CheckBox from "../../Components/Checkbox/Checkbox";
import Button from "../../Components/Button";
import Google from "../../assets/Images/Google.png";
import PasswordTextField from "../../Components/TextFields/Password/PasswordTextField";

import { loginValidation } from "../../Validation/validation";
import { login } from "../../Features/Auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idMap = {
    "login-email-input": "email",
    "login-password-input": "password",
  };

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const { error } = loginValidation.validate(form, {
      abortEarly: false,
    });

    if (error) {
      // Creates an error object in the format { field: message }
      const validationErrors = error.details.reduce((acc, err) => {
        return { ...acc, [err.path[0]]: err.message };
      }, {});
      setErrors(validationErrors);
    } else {
      setErrors({});
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await loginValidation.validateAsync(form, { abortEarly: false });
      const action = await dispatch(login(form));
      if (action.meta.requestStatus === "fulfilled") {
        const token = action.payload.data;
        localStorage.setItem("token", token);
        navigate("/");
      }
      if (action.meta.requestStatus === "rejected") {
        const error = new Error("Request rejected");
        error.response = action.payload;
        throw error;
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        // TODO Handle validation errors
        console.log(error.details);
        alert("Invalid input");
      } else if (error.response) {
        // TODO handle dispatch errors
        alert(error.response.msg);
      } else {
        // TODO handle unknown errors
        console.log(error);
        alert("Unknown error");
      }
    }
  };

  const handleInput = (e) => {
    const fieldName = idMap[e.target.id];
    // Extract and validate individual fields as input changes
    const fieldSchema = loginValidation.extract(fieldName);
    const { error } = fieldSchema.validate(e.target.value);
    let errMsg = "";
    if (error) {
      errMsg = error.message;
    }
    setErrors({ ...errors, [fieldName]: errMsg });
    const newForm = { ...form, [idMap[e.target.id]]: e.target.value };
    setForm(newForm);
  };

  return (
    <div className="login-page">
      <BackgroundPattern></BackgroundPattern>
      <div className="login-form">
        <div className="login-form-header">
          <img
            className="login-form-header-logo"
            src={Logomark}
            alt="Logomark"
          />
          <div className="login-form-v-spacing" />
          <div className="login-form-heading">Log in to your account</div>
        </div>
        <div className="login-form-v3-spacing" />
        <div className="login-form-inputs">
          <EmailTextField
            onChange={handleInput}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email : ""}
            placeholder="Enter your email"
            id="login-email-input"
          />
          <div className="login-form-v2-spacing" />
          <PasswordTextField
            onChange={handleInput}
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password : ""}
            placeholder="Password"
            id="login-password-input"
          />
        </div>
        <div className="login-form-v3-spacing" />
        <div className="login-form-password-options">
          <CheckBox />
          <div className="login-form-forgot-password">Forgot password</div>
        </div>
        <div className="login-form-v3-spacing" />
        <div className="login-form-actions">
          <Button
            level="primary"
            label="Sign in"
            sx={{ width: "100%" }}
            onClick={handleSubmit}
          />
          <div className="login-form-v-spacing" />
          <Button
            level="secondary"
            label="Sign in with Google"
            sx={{ width: "100%", color: "#344054", fontWeight: "700" }}
            img={<img className="google-enter" src={Google} alt="Google" />}
          />
        </div>
        <div className="login-form-v3-spacing" />
        <div className="new-account-option">
          Don’t have an account?
          <span className="new-account-option-span">Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
