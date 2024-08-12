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
      ></Stack>
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
      {/* <form className="password-confirmed-form">
        <Stack direction="column" alignItems="center" gap={theme.gap.small}>
          <ConfirmIcon alt="confirm icon" style={{ fill: "white" }} />
          <Typography component="h1" sx={{ mt: theme.gap.ml }}>
            Password reset
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Your password has been successfully reset. Click below to log in
            magically.
          </Typography>
        </Stack>
        <Stack gap={theme.gap.large} sx={{ mt: `calc(${theme.gap.ml}*2)` }}>
          <Button
            level="primary"
            label="Continue"
            onClick={() => navigate("/monitors")}
          />
          <Button
            level="tertiary"
            label="Back to log in"
            img={<ArrowBackRoundedIcon />}
            sx={{ alignSelf: "center", width: "fit-content" }}
            onClick={handleNavigate}
          />
        </Stack>
      </form> */}
    </Stack>
  );
};

export default NewPasswordConfirmed;
