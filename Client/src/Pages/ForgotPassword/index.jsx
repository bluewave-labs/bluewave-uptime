import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import React from "react";
import Logomark from "../../assets/icons/key.svg?react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useState } from "react";
import { credentials } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";
import { createToast } from "../../Utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Features/Auth/authSlice";
import ButtonSpinner from "../../Components/ButtonSpinner";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Button from "../../Components/Button";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

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
        sessionStorage.setItem("email", form.email);
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
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <Stack direction="column" alignItems="center" gap={theme.gap.small}>
          <Logomark alt="Logomark" style={{ fill: "white" }} />
          <Typography component="h1" sx={{ mt: theme.gap.ml }}>
            Forgot password?
          </Typography>
          <Typography>
            No worries, we'll send you reset instructions.
          </Typography>
        </Stack>
        <Stack gap={theme.gap.ml} sx={{ mt: `calc(${theme.gap.ml}*2)` }}>
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
          <ButtonSpinner
            disabled={errors.email !== undefined}
            onClick={handleSubmit}
            isLoading={isLoading}
            level="primary"
            label="Reset password"
            sx={{ mb: theme.gap.medium }}
          />
          <Button
            level="tertiary"
            label="Back to log in"
            img={<ArrowBackRoundedIcon />}
            sx={{ alignSelf: "center", width: "fit-content" }}
            onClick={() => navigate("/login")}
          />
        </Stack>
      </form>
    </div>
  );
};

export default ForgotPassword;
