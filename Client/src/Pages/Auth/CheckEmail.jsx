import "./index.css";
import background from "../../assets/Images/background_pattern_decorative.png";
import React, { useEffect, useState } from "react";
import EmailIcon from "../../assets/icons/email.svg?react";
import Button from "../../Components/Button";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createToast } from "../../Utils/toastUtils";
import { forgotPassword } from "../../Features/Auth/authSlice";

const CheckEmail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
  }, []);

  // TODO - fix
  const openMail = () => {
    window.location.href = "mailto:";
  };

  const toastFail = [
    {
      variant: "info",
      body: "Email not found.",
      hasIcon: false,
    },
    {
      variant: "info",
      body: "Redirecting in 3...",
      hasIcon: false,
    },
    {
      variant: "info",
      body: "Redirecting in 2...",
      hasIcon: false,
    },
    {
      variant: "info",
      body: "Redirecting in 1...",
      hasIcon: false,
    },
  ];

  const resendToken = async () => {
    setDisabled(true); // prevent resent button from being spammed
    if (!email) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < toastFail.length) {
          createToast(toastFail[index]);
          index++;
        } else {
          clearInterval(interval);
          navigate("/forgot-password");
        }
      }, 1000);
    } else {
      const form = { email: email };
      const action = await dispatch(forgotPassword(form));
      if (action.payload.success) {
        createToast({
          variant: "info",
          body: `Instructions sent to ${form.email}.`,
          hasIcon: false,
        });
        setDisabled(false);
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

  return (
    <div className="check-email-page">
      <img
        className="background-pattern-svg"
        src={background}
        alt="background pattern"
      />
      <form className="check-email-form">
        <Stack direction="column" alignItems="center" gap={theme.gap.small}>
          <EmailIcon alt="EmailIcon" style={{ fill: "white" }} />
          <Typography component="h1" sx={{ mt: theme.gap.ml }}>
            Check your email
          </Typography>
          <Typography sx={{ width: "max-content" }}>
            We sent a password reset link to{" "}
            <Typography component="span">
              {email || "username@email.com"}
            </Typography>
          </Typography>
        </Stack>
        <Stack gap={theme.gap.ml} sx={{ mt: `calc(${theme.gap.ml}*2)` }}>
          <Button level="primary" label="Open email app" onClick={openMail} />
          <Typography sx={{ alignSelf: "center", mb: theme.gap.medium }}>
            Didn't receive the email?{" "}
            <Typography
              component="span"
              onClick={resendToken}
              sx={{
                color: theme.palette.primary.main,
                letterSpacing: "-0.1px",
                userSelect: "none",
                pointerEvents: disabled ? "none" : "auto",
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              Click to resend
            </Typography>
          </Typography>

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

export default CheckEmail;
