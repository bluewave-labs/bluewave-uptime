import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../../Features/Auth/authSlice";
import { clearUptimeMonitorState } from "../../Features/UptimeMonitors/uptimeMonitorsSlice";
import Button from "../../Components/Button";
import background from "../../assets/Images/background_pattern_decorative.png";
import ConfirmIcon from "../../assets/icons/confirm-icon.svg?react";
import Logo from "../../assets/icons/bwu-icon.svg?react";
import "./index.css";

const NewPasswordConfirmed = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(clearAuthState());
    dispatch(clearUptimeMonitorState());
    navigate("/login");
  };

  return (
    <Stack
      className="password-confirmed-page auth"
      overflow="hidden"
      sx={{
        "& h1": {
          color: theme.palette.primary.main,
          fontWeight: 600,
          fontSize: 22,
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
        <Stack
          gap={{ xs: theme.spacing(8), sm: theme.spacing(12) }}
          alignItems="center"
          textAlign="center"
        >
          <Box>
            <ConfirmIcon alt="password confirm icon" />
            <Typography component="h1">Password reset</Typography>
            <Typography mt={theme.spacing(2)}>
              Your password has been successfully reset. Click below to log in
              magically.
            </Typography>
          </Box>
          <Button
            level="primary"
            label="Continue"
            onClick={() => navigate("/monitors")}
            sx={{
              width: "100%",
              maxWidth: 400,
            }}
          />
        </Stack>
      </Stack>
      <Box textAlign="center" p={theme.spacing(12)}>
        <Typography display="inline-block">Go back to —</Typography>
        <Typography
          component="span"
          color={theme.palette.primary.main}
          ml={theme.spacing(2)}
          onClick={handleNavigate}
          sx={{ userSelect: "none" }}
        >
          Log In
        </Typography>
      </Box>
    </Stack>
  );
};

export default NewPasswordConfirmed;
