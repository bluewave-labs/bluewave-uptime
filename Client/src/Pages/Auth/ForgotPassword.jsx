import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { createToast } from "../../Utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Features/Auth/authSlice";
import { useState } from "react";
import { credentials } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";
import ButtonSpinner from "../../Components/ButtonSpinner";
import Button from "../../Components/Button";
import Logo from "../../assets/icons/bwu-icon.svg?react";
import Key from "../../assets/icons/key.svg?react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import background from "../../assets/Images/background_pattern_decorative.png";
import "./index.css";

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
          body: `Instructions sent to ${form.email}.`,
        });
      } else {
        if (action.payload) {
          // dispatch errors
          createToast({
            body: action.payload.msg,
          });
        } else {
          // unknown errors
          createToast({
            body: "Unknown error.",
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
    <Stack className="forgot-password-page auth" overflow="hidden">
      <img
        className="background-pattern-svg"
        src={background}
        alt="background pattern"
      />
      <Stack
        direction="row"
        alignItems="center"
        px={theme.gap.large}
        gap={theme.gap.small}
      >
        <Logo style={{ borderRadius: theme.shape.borderRadius }} />
        <Typography sx={{ userSelect: "none" }}>BlueWave Uptime</Typography>
      </Stack>
      <Stack
        width="100%"
        maxWidth={600}
        flex={1}
        justifyContent="center"
        p={theme.gap.xl}
        pb={theme.gap.triplexl}
        mx="auto"
        sx={{
          "& > .MuiStack-root": {
            border: 1,
            borderRadius: theme.shape.borderRadius,
            borderColor: theme.palette.otherColors.graishWhite,
            backgroundColor: theme.palette.otherColors.white,
            padding: {
              xs: theme.gap.large,
              sm: theme.gap.xl,
            },
          },
        }}
      ></Stack>
      {/* <form className="forgot-password-form" onSubmit={handleSubmit}>
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
      </form> */}
    </Stack>
  );
};

export default ForgotPassword;
