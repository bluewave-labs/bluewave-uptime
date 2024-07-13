import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import Logomark from "../../assets/Images/Logomark.png";
import Check from "../../Components/Check/Check";
import Button from "../../Components/Button";
import Google from "../../assets/Images/Google.png";
import { registerValidation } from "../../Validation/validation";
import axiosInstance from "../../Utils/axiosConfig";
import { useDispatch } from "react-redux";
import { register } from "../../Features/Auth/authSlice";
import { createToast } from "../../Utils/toastUtils";
import Field from "../../Components/Inputs/Field";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO If possible, change the IDs of these fields to match the backend
  const idMap = {
    "register-firstname-input": "firstname",
    "register-lastname-input": "lastname",
    "register-email-input": "email",
    "register-password-input": "password",
  };

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axiosInstance
      .get("/auth/users/admin")
      .then((response) => {
        if (response.data.data === true) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [form, navigate]);

  useEffect(() => {
    const { error } = registerValidation.validate(form, {
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
  }, [form]);

  const handleInput = (e) => {
    const newForm = { ...form, [idMap[e.target.id]]: e.target.value };
    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminForm = { ...form, role: "admin" };
      await registerValidation.validateAsync(adminForm, { abortEarly: false });
      const action = await dispatch(register(adminForm));

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
        // validation errors
        createToast({
          variant: "info",
          body:
            error && error.details && error.details.length > 0
              ? error.details[0].message
              : "Error validating data.",
          hasIcon: false,
        });
      } else if (error.response) {
        // dispatch errors
        createToast({
          variant: "info",
          body: error.response.msg,
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
  };


  return (
    <div className="register-page">
      <BackgroundPattern></BackgroundPattern>
      <form className="register-form" onSubmit={handleSubmit}>
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
            onChange={handleInput}
            error={errors.firstname}
          />
          <div className="login-form-v2-spacing" />
          <Field
            id="register-lastname-input"
            label="Surname"
            isRequired={true}
            placeholder="Bolat"
            autoComplete="family-name"
            onChange={handleInput}
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
            onChange={handleInput}
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
            error={errors.password}
            onChange={handleInput}
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
            error={errors.confirm}
            onChange={handleInput}
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
