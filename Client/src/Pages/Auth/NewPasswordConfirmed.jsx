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
    <Stack className="password-confirmed-page auth" overflow="hidden">
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
            <ConfirmIcon alt="password confirm icon" />
            <Typography component="h1">Password reset</Typography>
            <Typography mt={theme.gap.xs}>
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
      <Box textAlign="center" p={theme.gap.large}>
        <Typography display="inline-block">Go back to —</Typography>
        <Typography
          component="span"
          ml={theme.gap.xs}
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
