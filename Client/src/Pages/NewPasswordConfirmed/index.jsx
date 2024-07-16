import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ConfirmIcon from "../../assets/icons/confirm-icon.svg?react";
import Button from "../../Components/Button";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../../Features/Auth/authSlice";
import { clearMonitorState } from "../../Features/Monitors/monitorsSlice";

const NewPasswordConfirmed = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(clearAuthState());
    dispatch(clearMonitorState());
    navigate("/login");
  }

  return (
    <div className="password-confirmed-page">
      <BackgroundPattern />
      <form className="password-confirmed-form">
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
          <Button level="primary" label="Continue" />
          <Button
            level="tertiary"
            label="Back to log in"
            img={<ArrowBackRoundedIcon />}
            sx={{ alignSelf: "center", width: "fit-content" }}
            onClick={handleNavigate}
          />
        </Stack>
      </form>
    </div>
  );
};

export default NewPasswordConfirmed;
