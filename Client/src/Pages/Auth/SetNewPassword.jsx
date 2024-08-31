import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../Features/Auth/authSlice";
import { createToast } from "../../Utils/toastUtils";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { credentials } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import Check from "../../Components/Check/Check";
import ButtonSpinner from "../../Components/ButtonSpinner";
import Field from "../../Components/Inputs/Field";
import LockIcon from "../../assets/icons/lock-button-icon.svg?react";
import background from "../../assets/Images/background_pattern_decorative.png";
import Logo from "../../assets/icons/bwu-icon.svg?react";
import "./index.css";

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
        body:
          error.details && error.details.length > 0
            ? error.details[0].message
            : "Error validating data.",
      });
    } else {
      delete passwordForm.confirm;
      const action = await dispatch(
        setNewPassword({ token: token, form: passwordForm })
      );
      if (action.payload.success) {
        navigate("/new-password-confirmed");
        createToast({
          body: "Your password was reset successfully.",
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
    <Stack
      className="set-new-password-page auth"
      overflow="hidden"
      sx={{
        "& h1": {
          color: theme.palette.primary.main,
          fontWeight: 600,
          fontSize: 24,
        },
        "& p": {
          fontSize: 14,
          color: theme.palette.text.accent,
        },
      }}
    >
      <Box
        className="background-pattern-svg"
        sx={{ backgroundImage: `url(${background})` }}
      />
      <Stack
        direction="row"
        alignItems="center"
        px={theme.spacing(12)}
        gap={theme.spacing(4)}
      >
        <Logo style={{ borderRadius: theme.shape.borderRadius }} />
        <Typography sx={{ userSelect: "none" }}>BlueWave Uptime</Typography>
      </Stack>
      <Stack
        width="100%"
        maxWidth={600}
        flex={1}
        justifyContent="center"
        px={{ xs: theme.spacing(12), lg: theme.spacing(20) }}
        pb={theme.spacing(12)}
        mx="auto"
        sx={{
          "& > .MuiStack-root": {
            border: 1,
            borderRadius: theme.spacing(5),
            borderColor: theme.palette.border.light,
            backgroundColor: theme.palette.background.main,
            padding: {
              xs: theme.spacing(12),
              sm: theme.spacing(20),
            },
          },
        }}
      >
        <Stack
          gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
          alignItems="center"
          textAlign="center"
        >
          <Box>
            <LockIcon alt="lock icon" />
            <Typography component="h1">Set new password</Typography>
            <Typography>
              Your new password must be different to previously used passwords.
            </Typography>
          </Box>
          <Box
            width="100%"
            textAlign="left"
            sx={{
              "& .input-error": {
                display: "none",
              },
            }}
          >
            <Box
              component="form"
              noValidate
              spellCheck={false}
              onSubmit={handleSubmit}
            >
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
            </Box>
            <Box
              component="form"
              noValidate
              spellCheck={false}
              onSubmit={handleSubmit}
            >
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
            </Box>
            <Stack gap={theme.spacing(4)} mb={theme.spacing(12)}>
              <Check
                text={
                  <>
                    <Typography component="span">Must be at least</Typography> 8
                    characters long
                  </>
                }
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
                text={
                  <>
                    <Typography component="span">Must contain</Typography> one
                    special character and a number
                  </>
                }
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
                text={
                  <>
                    <Typography component="span">
                      Must contain at least
                    </Typography>{" "}
                    one upper and lower character
                  </>
                }
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
          </Box>
          <ButtonSpinner
            disabled={Object.keys(errors).length !== 0}
            isLoading={isLoading}
            onClick={handleSubmit}
            level="primary"
            label="Reset password"
            sx={{ width: "100%", maxWidth: 400 }}
          />
        </Stack>
      </Stack>
      <Box textAlign="center" p={theme.spacing(12)}>
        <Typography display="inline-block">Go back to —</Typography>
        <Typography
          component="span"
          color={theme.palette.primary.main}
          ml={theme.spacing(2)}
          onClick={() => navigate("/login")}
          sx={{ userSelect: "none" }}
        >
          Log In
        </Typography>
      </Box>
    </Stack>
  );
};

export default SetNewPassword;
