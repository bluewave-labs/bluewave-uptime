import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createToast } from "../../Utils/toastUtils";
import { forgotPassword } from "../../Features/Auth/authSlice";
import Button from "../../Components/Button";
import background from "../../assets/Images/background_pattern_decorative.png";
import EmailIcon from "../../assets/icons/email.svg?react";
import Logo from "../../assets/icons/bwu-icon.svg?react";
import "./index.css";

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
      body: "Email not found.",
    },
    {
      body: "Redirecting in 3...",
    },
    {
      body: "Redirecting in 2...",
    },
    {
      body: "Redirecting in 1...",
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
          body: `Instructions sent to ${form.email}.`,
        });
        setDisabled(false);
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

  return (
    <Stack className="check-email-page auth" overflow="hidden">
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
      >
        <Stack gap={theme.gap.large} alignItems="center" textAlign="center">
          <Box>
            <EmailIcon alt="email icon" />
            <Typography component="h1">Check your email</Typography>
            <Typography mt={theme.gap.xs} sx={{ width: "max-content" }}>
              We sent a password reset link to{" "}
              <Typography className="email-sent-to" component="span">
                {email || "username@email.com"}
              </Typography>
            </Typography>
          </Box>
          <Button
            level="primary"
            label="Open email app"
            onClick={openMail}
            sx={{
              width: "100%",
              maxWidth: 400,
            }}
          />
          <Typography sx={{ alignSelf: "center", mb: theme.gap.medium }}>
            Didn't receive the email?{" "}
            <Typography
              component="span"
              onClick={resendToken}
              sx={{
                color: theme.palette.primary.main,
                userSelect: "none",
                pointerEvents: disabled ? "none" : "auto",
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              Click to resend
            </Typography>
          </Typography>
        </Stack>
      </Stack>
      <Box textAlign="center" p={theme.gap.large}>
        <Typography display="inline-block">Go back to —</Typography>
        <Typography
          component="span"
          ml={theme.gap.xs}
          onClick={() => {
            navigate("/login");
          }}
          sx={{ userSelect: "none" }}
        >
          Log In
        </Typography>
      </Box>
    </Stack>
  );
};

export default CheckEmail;
