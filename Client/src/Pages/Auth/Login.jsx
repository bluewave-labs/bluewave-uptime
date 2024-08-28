import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { credentials } from "../../Validation/validation";
import { login } from "../../Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import Button from "../../Components/Button";
import { networkService } from "../../main";
import Field from "../../Components/Inputs/Field";
import background from "../../assets/Images/background_pattern_decorative.png";
import Logo from "../../assets/icons/bwu-icon.svg?react";
import Mail from "../../assets/icons/mail.svg?react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PropTypes from "prop-types";
import { logger } from "../../Utils/Logger";
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
        gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
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
                mr: theme.spacing(4),
              },
            }}
          />
        </Box>
        <Box maxWidth={400}>
          <Typography className="tos-p">
            By continuing, you agree to our{" "}
            <Typography
              component="span"
              onClick={() => {
                window.open(
                  "https://bluewavelabs.ca/terms-of-service-open-source",
                  "_blank",
                  "noreferrer"
                );
              }}
              sx={{
                "&:hover": {
                  color: theme.palette.text.tertiary,
                },
              }}
            >
              Terms of Service
            </Typography>{" "}
            and{" "}
            <Typography
              component="span"
              onClick={() => {
                window.open(
                  "https://bluewavelabs.ca/privacy-policy-open-source",
                  "_blank",
                  "noreferrer"
                );
              }}
              sx={{
                "&:hover": {
                  color: theme.palette.text.tertiary,
                },
              }}
            >
              Privacy Policy.
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

LandingPage.propTypes = {
  onContinue: PropTypes.func.isRequired,
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
      <Stack
        gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
        textAlign="center"
      >
        <Box>
          <Typography component="h1">Log In</Typography>
          <Typography>Enter your email address</Typography>
        </Box>
        <Box textAlign="left" mb={theme.spacing(5)}>
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Field
              type="email"
              id="login-email-input"
              label="Email"
              isRequired={true}
              placeholder="jordan.ellis@domain.com"
              autoComplete="email"
              value={form.email}
              onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
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
              mb: theme.spacing(6),
              px: theme.spacing(8),
              "& svg.MuiSvgIcon-root": {
                mr: theme.spacing(2),
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

StepOne.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
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
      <Stack
        gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
        textAlign="center"
      >
        <Box>
          <Typography component="h1">Log In</Typography>
          <Typography>Enter your password</Typography>
        </Box>
        <Box textAlign="left" mb={theme.spacing(5)}>
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
              mb: theme.spacing(6),
              px: theme.spacing(8),
              "& svg.MuiSvgIcon-root": {
                mr: theme.spacing(2),
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
          <Typography
            className="forgot-p"
            display="inline-block"
            color={theme.palette.common.main}
          >
            Forgot password?
          </Typography>
          <Typography
            component="span"
            color={theme.palette.common.main}
            ml={theme.spacing(2)}
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

StepTwo.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const authState = useSelector((state) => state.auth);
  const { authToken } = authState;

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
    if (authToken) {
      navigate("/monitors");
      return;
    }
    networkService
      .doesSuperAdminExist()
      .then((response) => {
        if (response.data.data === false) {
          navigate("/register");
        }
      })
      .catch((error) => {
        logger.error(error);
      });
  }, [authToken, navigate]);

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
          if (action.payload) {
            if (action.payload.msg === "Incorrect password")
              setErrors({
                password:
                  "The password you provided does not match our records",
              });
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
    <Stack
      className="login-page auth"
      overflow="hidden"
      sx={{
        "& h1": {
          color: theme.palette.common.main,
          fontWeight: 600,
          fontSize: 30,
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
        pb={theme.spacing(20)}
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
      <Box textAlign="center" p={theme.spacing(12)}>
        <Typography display="inline-block">
          Don&apos;t have an account? —
        </Typography>
        <Typography
          component="span"
          color={theme.palette.common.main}
          ml={theme.spacing(2)}
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
