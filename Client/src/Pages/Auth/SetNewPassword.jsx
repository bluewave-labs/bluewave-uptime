import "./index.css";
import background from "../../assets/Images/background_pattern_decorative.png";
import LockIcon from "../../assets/icons/lock-button-icon.svg?react";
import Check from "../../Components/Check/Check";
import ButtonSpinner from "../../Components/ButtonSpinner";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { credentials } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../Features/Auth/authSlice";
import { createToast } from "../../Utils/toastUtils";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Button from "../../Components/Button";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });

  const idMap = {
    "register-password-input": "password",
    "confirm-password-input": "confirm",
  };

  const { isLoading } = useSelector((state) => state.auth);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordForm = { ...form };
    const { error } = credentials.validate(passwordForm, {
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
      delete passwordForm.confirm;
      const action = await dispatch(
        setNewPassword({ token: token, form: passwordForm })
      );
      if (action.payload.success) {
        navigate("/new-password-confirmed");
        createToast({
          variant: "info",
          body: "Your password was reset successfully.",
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
    <div className="set-new-password-page">
      <img
        className="background-pattern-svg"
        src={background}
        alt="background pattern"
      />
      <form className="set-new-password-form" onSubmit={handleSubmit}>
        <Stack direction="column" alignItems="center" gap={theme.gap.small}>
          <LockIcon alt="lock icon" style={{ fill: "white" }} />
          <Typography component="h1" sx={{ mt: theme.gap.ml }}>
            Set new password
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Your new password must be different to previously used passwords.
          </Typography>
        </Stack>
        <Stack gap={theme.gap.large} sx={{ mt: `calc(${theme.gap.ml}*2)` }}>
          <Field
            type="password"
            id="register-password-input"
            label="Password"
            isRequired={true}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Field
            type="password"
            id="confirm-password-input"
            label="Confirm password"
            isRequired={true}
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />
          <Stack gap={theme.gap.small}>
            <Check
              text="Must be at least 8 characters long"
              variant={
                errors?.password === "Password is required"
                  ? "error"
                  : form.password === ""
                  ? "info"
                  : form.password.length < 8
                  ? "error"
                  : "success"
              }
            />
            <Check
              text="Must contain one special character and a number"
              variant={
                errors?.password === "Password is required"
                  ? "error"
                  : form.password === ""
                  ? "info"
                  : !/^(?=.*[!@#$%^&*(),.?":{}|])(?=.*\d).+$/.test(
                      form.password
                    )
                  ? "error"
                  : "success"
              }
            />
            <Check
              text="Must contain at least one upper and lower character"
              variant={
                errors?.password === "Password is required"
                  ? "error"
                  : form.password === ""
                  ? "info"
                  : !/^(?=.*[A-Z])(?=.*[a-z]).+$/.test(form.password)
                  ? "error"
                  : "success"
              }
            />
          </Stack>
          <ButtonSpinner
            disabled={Object.keys(errors).length !== 0}
            isLoading={isLoading}
            onClick={handleSubmit}
            level="primary"
            label="Reset password"
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

export default SetNewPassword;
