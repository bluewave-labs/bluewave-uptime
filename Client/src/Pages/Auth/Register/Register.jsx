import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { credentials } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { register } from "../../../Features/Auth/authSlice";
import { useParams } from "react-router-dom";
import background from "../../../assets/Images/background_pattern_decorative.png";
import Logo from "../../../assets/icons/bwu-icon.svg?react";
import Mail from "../../../assets/icons/mail.svg?react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Check from "../../../Components/Check/Check";
import Button from "../../../Components/Button";
import Field from "../../../Components/Inputs/Field";
import { networkService } from "../../../main";
import "../index.css";
import { logger } from "../../../Utils/Logger";

/**
 * Displays the initial landing page.
 *
 * @param {Object} props
 * @param {boolean} props.isAdmin - Whether the user is creating and admin account
 * @param {Function} props.onContinue - Callback function to handle "Continue with Email" button click.
 * @returns {JSX.Element}
 */
const LandingPage = ({ isAdmin, onSignup }) => {
  const theme = useTheme();

  return (
    <>
      <Stack
        gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
        alignItems="center"
        textAlign="center"
      >
        <Box>
          <Typography component="h1">Sign Up</Typography>
          <Typography>
            Create your {isAdmin ? "admin " : ""}account to get started.
          </Typography>
        </Box>
        <Box width="100%">
          <Button
            level="secondary"
            label="Sign up with Email"
            img={<Mail />}
            onClick={onSignup}
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
            By signing up, you agree to our{" "}
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
  isAdmin: PropTypes.bool,
  onSignup: PropTypes.func,
};

/**
 * Renders the first step of the sign up process.
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
          <Typography component="h1">Sign Up</Typography>
          <Typography>Enter your personal details</Typography>
        </Box>
        <Box textAlign="left">
          <Box
            component="form"
            noValidate
            spellCheck={false}
            onSubmit={onSubmit}
            mb={theme.spacing(10)}
          >
            <Field
              id="register-firstname-input"
              label="Name"
              isRequired={true}
              placeholder="Jordan"
              autoComplete="given-name"
              value={form.firstName}
              onChange={onChange}
              error={errors.firstName}
              ref={inputRef}
            />
          </Box>
          <Box
            component="form"
            noValidate
            spellCheck={false}
            onSubmit={onSubmit}
            mb={theme.spacing(5)}
          >
            <Field
              id="register-lastname-input"
              label="Surname"
              isRequired={true}
              placeholder="Ellis"
              autoComplete="family-name"
              value={form.lastName}
              onChange={onChange}
              error={errors.lastName}
            />
          </Box>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
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
            disabled={(errors.firstName || errors.lastName) && true}
            sx={{ width: "30%" }}
          />
        </Stack>
      </Stack>
    </>
  );
};

StepOne.propTypes = {
  form: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onBack: PropTypes.func,
};

/**
 * Renders the second step of the sign up process.
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
          <Typography component="h1">Sign Up</Typography>
          <Typography>Enter your email address</Typography>
        </Box>
        <Box textAlign="left">
          <Box
            component="form"
            noValidate
            spellCheck={false}
            onSubmit={onSubmit}
            mb={theme.spacing(5)}
          >
            <Field
              type="email"
              id="register-email-input"
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
          </Box>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
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

StepTwo.propTypes = {
  form: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onBack: PropTypes.func,
};

/**
 * Renders the third step of the sign up process.
 *
 * @param {Object} props
 * @param {Object} props.form - Form state object.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @param {Function} props.onChange - Callback function to handle form input changes.
 * @param {Function} props.onBack - Callback function to handle "Back" button click.
 * @returns {JSX.Element}
 */
const StepThree = ({ form, errors, onSubmit, onChange, onBack }) => {
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
          <Typography component="h1">Sign Up</Typography>
          <Typography>Create your password</Typography>
        </Box>
        <Box
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
            onSubmit={onSubmit}
          >
            <Field
              type="password"
              id="register-password-input"
              label="Password"
              isRequired={true}
              placeholder="Create a password"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              ref={inputRef}
            />
          </Box>
          <Box
            component="form"
            noValidate
            spellCheck={false}
            onSubmit={onSubmit}
          >
            <Field
              type="password"
              id="register-confirm-input"
              label="Confirm password"
              isRequired={true}
              placeholder="Confirm your password"
              autoComplete="current-password"
              value={form.confirm}
              onChange={onChange}
              error={errors.confirm}
            />
          </Box>
          <Stack
            gap={theme.gap.small}
            mb={{ xs: theme.spacing(6), sm: theme.spacing(8) }}
          >
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
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
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

StepThree.propTypes = {
  form: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onBack: PropTypes.func,
};

const Register = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const theme = useTheme();
  // TODO If possible, change the IDs of these fields to match the backend
  const idMap = {
    "register-firstname-input": "firstName",
    "register-lastname-input": "lastName",
    "register-email-input": "email",
    "register-password-input": "password",
    "register-confirm-input": "confirm",
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    role: [],
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchInvite = async () => {
      if (token !== undefined) {
        try {
          const res = await networkService.verifyInvitationToken(token);
          const { role, email } = res.data.data;
          setForm({ ...form, email, role });
        } catch (error) {
          logger.error(error);
        }
      }
    };
    fetchInvite();
  }, [token, form]);

  /**
   * Validates the form data against the validation schema.
   *
   * @param {Object} data - The form data to validate.
   * @param {Object} [options] - Optional settings for validation.
   * @returns {Object | undefined} - Returns the validation error object if there are validation errors; otherwise, `undefined`.
   */
  const validateForm = (data, options = {}) => {
    const { error } = credentials.validate(data, {
      abortEarly: false,
      ...options,
    });
    return error;
  };

  /**
   * Handles validation errors by setting the state with error messages and displaying a toast notification.
   *
   * @param {Object} error - The validation error object returned from the validation schema.
   */
  const handleError = (error) => {
    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path[0]] = err.message;
    });
    setErrors(newErrors);
    createToast({ body: error.details[0].message || "Error validating data." });
  };

  const handleStepOne = async (e) => {
    e.preventDefault();

    let error = validateForm({
      firstName: form.firstName,
      lastName: form.lastName,
    });

    if (error) {
      handleError(error);
      return;
    }

    setStep(2);
  };

  const handleStepTwo = async (e) => {
    e.preventDefault();

    let error;
    error = validateForm({ email: form.email });
    if (error) {
      handleError(error);
      return;
    }

    setStep(3);
  };

  // Final step
  // Attempts account registration
  const handleStepThree = async (e) => {
    e.preventDefault();

    let registerForm = { ...form, role: isAdmin ? ["admin"] : form.role };
    let error = validateForm(registerForm, {
      context: { password: form.password },
    });
    if (error) {
      handleError(error);
      return;
    }

    delete registerForm.confirm;
    const action = await dispatch(register(registerForm));
    if (action.payload.success) {
      const token = action.payload.data;
      localStorage.setItem("token", token);
      navigate("/");
      createToast({
        body: "Welcome! Your account was created successfully.",
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
      className="register-page auth"
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
          <LandingPage isAdmin={isAdmin} onSignup={() => setStep(1)} />
        ) : step === 1 ? (
          <StepOne
            form={form}
            errors={errors}
            onSubmit={handleStepOne}
            onChange={handleChange}
            onBack={() => setStep(0)}
          />
        ) : step === 2 ? (
          <StepTwo
            form={form}
            errors={errors}
            onSubmit={handleStepTwo}
            onChange={handleChange}
            onBack={() => setStep(1)}
          />
        ) : step === 3 ? (
          <StepThree
            form={form}
            errors={errors}
            onSubmit={handleStepThree}
            onChange={handleChange}
            onBack={() => setStep(2)}
          />
        ) : (
          ""
        )}
      </Stack>
      <Box textAlign="center" p={theme.spacing(12)}>
        <Typography display="inline-block">
          Already have an account? —
        </Typography>
        <Typography
          component="span"
          ml={theme.spacing(2)}
          onClick={() => {
            navigate("/login");
          }}
          sx={{ userSelect: "none", color: theme.palette.common.main }}
        >
          Log In
        </Typography>
      </Box>
    </Stack>
  );
};
Register.propTypes = {
  isAdmin: PropTypes.bool,
};
export default Register;
