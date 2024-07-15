import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import Logomark from "../../assets/Images/bwl-logo-2.svg?react";
import CheckBox from "../../Components/Checkbox/Checkbox";
import Button from "../../Components/Button";
import Google from "../../assets/Images/Google.png";
import axiosInstance from "../../Utils/axiosConfig";
import { loginValidation, credentials } from "../../Validation/validation";
import { login } from "../../Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import Field from "../../Components/Inputs/Field";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idMap = {
    "login-email-input": "email",
    "login-password-input": "password",
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/auth/users/admin")
      .then((response) => {
        if (response.data.data === false) {
          navigate("/register");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = credentials.validate(form, { abortEarly: false });

    if (error) {
      // validation errors
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      createToast({
        variant: "info",
        body:
          error.details && error.details.length > 0
            ? error.details[0].message
            : "Error validating data.",
        hasIcon: false,
      });
    } else {
      const action = await dispatch(login(form));
      if (action.payload.success) {
        navigate("/monitors");
        createToast({
          variant: "info",
          body: "Welcome back! You're successfully logged in.",
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
    <div className="login-page">
      <BackgroundPattern></BackgroundPattern>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-header">
          <Logomark id="login-form-header-logo" alt="Logomark" />
          <div className="login-form-v-spacing" />
          <div className="login-form-heading">Log in to your account</div>
        </div>
        <div className="login-form-v3-spacing" />

        <div className="login-form-inputs">
          <Field
            type="email"
            id="login-email-input"
            label="Email"
            isRequired={true}
            placeholder="Enter your email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="login-form-v2-spacing" />
          <Field
            type="password"
            id="login-password-input"
            label="Password"
            isRequired={true}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
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
            type="submit"
            level="primary"
            label="Sign in"
            sx={{ width: "100%" }}
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
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="new-account-option-span"
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
