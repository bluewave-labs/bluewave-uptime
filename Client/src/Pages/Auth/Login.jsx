import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { credentials } from "../../Validation/validation";
import { login } from "../../Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import Button from "../../Components/Button";
import axiosInstance from "../../Utils/axiosConfig";
import Field from "../../Components/Inputs/Field";
import background from "../../assets/Images/background_pattern_decorative.png";
import Logo from "../../assets/icons/bwu-icon.svg?react";
import Mail from "../../assets/icons/mail.svg?react";

import "./index.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

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
        body:
          error.details && error.details.length > 0
            ? error.details[0].message
            : "Error validating data.",
      });
    } else {
      const action = await dispatch(login(form));
      if (action.payload.success) {
        navigate("/monitors");
        createToast({
          body: "Welcome back! You're successfully logged in.",
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

  const [step, setStep] = useState(0);
  const LandingPage = () => {
    return (
      <>
        <Stack gap={theme.gap.large} alignItems="center" textAlign="center">
          <Box>
            <Typography component="h1">Log In</Typography>
            <Typography>We are pleased to see you again!</Typography>
          </Box>
          <Box width="100%">
            <Button
              level="secondary"
              label="Continue with Email"
              img={<Mail />}
              onClick={() => setStep(1)}
              sx={{
                width: "100%",
                "& svg": {
                  mr: theme.gap.small,
                },
              }}
            />
            {/* <Divider sx={{ marginY: theme.spacing(1) }}>or</Divider>
            <Button
              level="secondary"
              label="Continue with Google"
              onClick={() => setStep(1)}
              sx={{ width: "100%" }}
            /> */}
          </Box>
          <Box maxWidth={400}>
            <Typography className="tos-p">
              By continuing, you agree to our{" "}
              <Typography component="span">Terms of Service</Typography> and{" "}
              <Typography component="span">Privacy Policy.</Typography>
            </Typography>
          </Box>
        </Stack>
      </>
    );
  };

  return (
    <Stack className="login-page" overflow="hidden">
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
        <Typography>BlueWave Uptime</Typography>
      </Stack>
      <Stack
        width="fit-content"
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
              lg: theme.gap.xxl,
            },
          },
        }}
      >
        <LandingPage />
      </Stack>
      <Box textAlign="center" p={theme.gap.large}>
        <Typography display="inline-block">Don't have an account? -</Typography>
        <Typography
          component="span"
          ml={theme.gap.xs}
          onClick={() => {
            navigate("/register");
          }}
          sx={{ userSelect: "none" }}
        >
          Sign Up
        </Typography>
      </Box>
      {/* <form className="login-form" onSubmit={handleSubmit}>
        <Stack gap={theme.gap.small} alignItems="center">
          <Typography component="h1" sx={{ mt: theme.gap.xl }}>
            Log In
          </Typography>
          <Typography>We are pleased to see you again!</Typography>
        </Stack>
        <Stack gap={theme.gap.large} sx={{ mt: `calc(${theme.gap.ml}*2)` }}>
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
          <Field
            type="password"
            id="login-password-input"
            label="Password"
            isRequired={true}
            placeholder="••••••••••"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Stack direction="row" justifyContent="space-between">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    padding: 0,
                    "& .MuiTouchRipple-root": {
                      pointerEvents: "none",
                      display: "none",
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <Typography
              component="span"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={theme.gap.ml} mt={theme.gap.large}>
          <Button
            type="submit"
            level="primary"
            label="Continue"
            disabled={Object.keys(errors).length !== 0 && true}
          />
          <Stack
            direction="row"
            justifyContent="center"
            gap="5px"
            mt={theme.gap.ml}
          >
            <Typography sx={{ alignSelf: "center" }}>
              Don't have an account?
            </Typography>
            <Typography
              component="span"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </Typography>
          </Stack>
        </Stack>
      </form> */}
    </Stack>
  );
};

export default Login;
