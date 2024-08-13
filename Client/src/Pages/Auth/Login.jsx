import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
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
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import "./index.css";

/**
 * Displays the initial landing page.
 *
 * @param {Object} props
 * @param {Function} props.onContinue - Callback function to handle "Continue with Email" button click.
 * @returns {JSX.Element}
 */
const LandingPage = ({ onContinue }) => {
  const theme = useTheme();

  return (
    <>
      <Stack
        gap={{ xs: theme.gap.ml, sm: theme.gap.large }}
        alignItems="center"
        textAlign="center"
      >
        <Box>
          <Typography component="h1">Log In</Typography>
          <Typography>We are pleased to see you again!</Typography>
        </Box>
        <Box width="100%">
          <Button
            level="secondary"
            label="Continue with Email"
            img={<Mail />}
            onClick={onContinue}
            sx={{
              width: "100%",
              "& svg": {
                mr: theme.gap.small,
              },
            }}
          />
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

/**
 * Renders the first step of the login process.
 *
 * @param {Object} props
 * @param {Object} props.form - Form state object.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @param {Function} props.onChange - Callback function to handle form input changes.
 * @param {Function} props.onBack - Callback function to handle "Back" button click.
 * @returns {JSX.Element}
 */
const StepOne = ({ form, errors, onSubmit, onChange, onBack }) => {
  const theme = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Stack gap={{ xs: theme.gap.ml, sm: theme.gap.large }} textAlign="center">
        <Box>
          <Typography component="h1">Log In</Typography>
          <Typography>Enter your email address</Typography>
        </Box>
        <Box textAlign="left">
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Field
              type="email"
              id="login-email-input"
              label="Email"
              isRequired={true}
              placeholder="jordan.ellis@domain.com"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              error={errors.email}
              ref={inputRef}
            />
          </form>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              mb: theme.gap.medium,
              px: theme.gap.ml,
              "& svg.MuiSvgIcon-root": {
                mr: theme.gap.xs,
              },
            }}
            props={{ tabIndex: -1 }}
          />
          <Button
            level="primary"
            label="Continue"
            onClick={onSubmit}
            disabled={errors.email && true}
            sx={{ width: "30%" }}
          />
        </Stack>
      </Stack>
    </>
  );
};

/**
 * Renders the second step of the login process, including a password input field.
 *
 * @param {Object} props
 * @param {Object} props.form - Form state object.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @param {Function} props.onChange - Callback function to handle form input changes.
 * @param {Function} props.onBack - Callback function to handle "Back" button click.
 * @returns {JSX.Element}
 */
const StepTwo = ({ form, errors, onSubmit, onChange, onBack }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleNavigate = () => {
    if (form.email !== "" && !errors.email) {
      sessionStorage.setItem("email", form.email);
    }
    navigate("/forgot-password");
  };

  return (
    <>
      <Stack gap={{ xs: theme.gap.ml, sm: theme.gap.large }} textAlign="center">
        <Box>
          <Typography component="h1">Log In</Typography>
          <Typography>Enter your password</Typography>
        </Box>
        <Box textAlign="left">
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Field
              type="password"
              id="login-password-input"
              label="Password"
              isRequired={true}
              placeholder="••••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              ref={inputRef}
            />
          </form>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              mb: theme.gap.medium,
              px: theme.gap.ml,
              "& svg.MuiSvgIcon-root": {
                mr: theme.gap.xs,
              },
            }}
            props={{ tabIndex: -1 }}
          />
          <Button
            level="primary"
            label="Continue"
            onClick={onSubmit}
            disabled={errors.password && true}
            sx={{ width: "30%" }}
          />
        </Stack>
        <Box textAlign="center">
          <Typography className="forgot-p" display="inline-block">
            Forgot password?
          </Typography>
          <Typography
            component="span"
            ml={theme.gap.xs}
            sx={{ userSelect: "none" }}
            onClick={handleNavigate}
          >
            Reset password
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

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
  const [step, setStep] = useState(0);

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

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idMap[id];
    const processedValue = name === 'email' ? value.toLowerCase() : value;
    setForm((prev) => ({
      ...prev,
      [name]: processedValue,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      const { error } = credentials.validate(
        { email: form.email },
        { abortEarly: false }
      );
      if (error) {
        setErrors((prev) => ({ ...prev, email: error.details[0].message }));
        createToast({ body: error.details[0].message });
      } else {
        setStep(2);
      }
    } else if (step === 2) {
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
          setErrors({
            password: "The password you provided does not match our records",
          });
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
    }
  };

  return (
    <Stack className="login-page auth" overflow="hidden">
      <Box
        className="background-pattern-svg"
        sx={{ backgroundImage: `url(${background})` }}
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
        px={{ xs: theme.gap.large, lg: theme.gap.xl }}
        pb={theme.gap.xl}
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
      >
        {step === 0 ? (
          <LandingPage onContinue={() => setStep(1)} />
        ) : step === 1 ? (
          <StepOne
            form={form}
            errors={errors}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBack={() => setStep(0)}
          />
        ) : (
          step === 2 && (
            <StepTwo
              form={form}
              errors={errors}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onBack={() => setStep(1)}
            />
          )
        )}
      </Stack>
      <Box textAlign="center" p={theme.gap.large}>
        <Typography display="inline-block">Don't have an account? —</Typography>
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
    </Stack>
  );
};

export default Login;
