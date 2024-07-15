import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import Logomark from "../../assets/Images/Logomark.png";
import Check from "../../Components/Check/Check";
import Button from "../../Components/Button";
import Google from "../../assets/Images/Google.png";
import { credentials } from "../../Validation/validation";
import axiosInstance from "../../Utils/axiosConfig";
import { useDispatch } from "react-redux";
import { register } from "../../Features/Auth/authSlice";
import { createToast } from "../../Utils/toastUtils";
import Field from "../../Components/Inputs/Field";
import { useTheme } from "@emotion/react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // TODO If possible, change the IDs of these fields to match the backend
  const idMap = {
    "register-firstname-input": "firstname",
    "register-lastname-input": "lastname",
    "register-email-input": "email",
    "register-password-input": "password",
    "register-confirm-input": "confirm",
  };

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   axiosInstance
  //     .get("/auth/users/admin")
  //     .then((response) => {
  //       if (response.data.data === true) {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [form, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminForm = { ...form, role: "admin" };
    const { error } = credentials.validate(adminForm, {
      abortEarly: false,
      context: { password: form.password },
    });

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
      delete adminForm.confirm;
      const action = await dispatch(register(adminForm));
      if (action.payload.success) {
        const token = action.payload.data;
        localStorage.setItem("token", token);
        navigate("/");
        createToast({
          variant: "info",
          body: "Welcome! Your account was created successfully.",
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
      { abortEarly: false, context: { password: form.password } }
    );

    setErrors((prev) => {
      const prevErrors = { ...prev };
      if (error) prevErrors[name] = error.details[0].message;
      else delete prevErrors[name];
      return prevErrors;
    });
  };

  return (
    <div className="register-page">
      <BackgroundPattern></BackgroundPattern>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="register-form-header">
          <img
            className="register-form-header-logo"
            src={Logomark}
            alt="Logomark"
          />
          <div className="register-form-v-spacing-large" />
          <div className="register-form-heading">
            Create Uptime Manager admin account
          </div>
          <div className="register-form-v-spacing-large"></div>
        </div>
        <div className="register-form-v-spacing-40px" />
        <div className="register-form-inputs">
          <Field
            id="register-firstname-input"
            label="Name"
            isRequired={true}
            placeholder="Talha"
            autoComplete="given-name"
            value={form.firstname}
            onChange={handleChange}
            error={errors.firstname}
          />
          <div className="login-form-v2-spacing" />
          <Field
            id="register-lastname-input"
            label="Surname"
            isRequired={true}
            placeholder="Bolat"
            autoComplete="family-name"
            value={form.lastname}
            onChange={handleChange}
            error={errors.lastname}
          />
          <div className="login-form-v2-spacing" />
          <Field
            type="email"
            id="register-email-input"
            label="Email"
            isRequired={true}
            placeholder="name.surname@companyname.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="login-form-v2-spacing" />
          <Field
            type="password"
            id="register-password-input"
            label="Password"
            isRequired={true}
            placeholder="Create a password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="login-form-v2-spacing" />
          {/* TODO - hook up to form state and run checks */}
          <Field
            type="password"
            id="register-confirm-input"
            label="Confirm password"
            isRequired={true}
            placeholder="Confirm your password"
            autoComplete="current-password"
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
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
          <Button
            type="submit"
            level="primary"
            label="Get started"
            sx={{ width: "100%" }}
          />
          <div className="login-form-v-spacing" />
          <Button
            disabled={true}
            level="secondary"
            label="Sign up with Google"
            sx={{ width: "100%", color: "#344054", fontWeight: "700" }}
            img={<img className="google-enter" src={Google} alt="Google" />}
          />
        </div>
      </form>
      <div className="register-bottom-spacing"></div>
    </div>
  );
};

export default Register;
