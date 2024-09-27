import { useTheme } from "@emotion/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import Field from "../../Components/Inputs/Field";
import Link from "../../Components/Link";
import Select from "../../Components/Inputs/Select";
import { logger } from "../../Utils/Logger";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import {
  deleteMonitorChecksByTeamId,
  addDemoMonitors,
  deleteAllMonitors,
} from "../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { update } from "../../Features/Auth/authSlice";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import { setTimezone } from "../../Features/UI/uiSlice";
import timezones from "../../Utils/timezones.json";
import { useState } from "react";
import { ConfigBox } from "./styled";
import { networkService } from "../../main";
import { settingsValidation } from "../../Validation/validation";
import { useNavigate } from "react-router";

const SECONDS_PER_DAY = 86400;

const Settings = ({ isAdmin }) => {
  const theme = useTheme();
  const { user, authToken } = useSelector((state) => state.auth);
  const { checkTTL } = user;
  const { isLoading } = useSelector((state) => state.uptimeMonitors);
  const { isLoading: authIsLoading } = useSelector((state) => state.auth);
  const { timezone } = useSelector((state) => state.ui);
  const [checksIsLoading, setChecksIsLoading] = useState(false);
  const [form, setForm] = useState({
    ttl: checkTTL ? (checkTTL / SECONDS_PER_DAY).toString() : 0,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, id } = event.target;
    const { error } = settingsValidation.validate(
      { [id]: value },
      {
        abortEarly: false,
      }
    );
    if (!error || error.details.length === 0) {
      setErrors({});
    } else {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      console.log(newErrors);
      logger.error("Validation errors:", error.details);
    }
    let inputValue = value;
    id === "ttl" && (inputValue = value.replace(/[^0-9]/g, ""));
    setForm((prev) => ({
      ...prev,
      [id]: inputValue,
    }));
  };

  // TODO Handle saving
  const handleSave = async () => {
    try {
      setChecksIsLoading(true);
      await networkService.updateChecksTTL({
        authToken: authToken,
        ttl: form.ttl,
      });
      const updatedUser = { ...user, checkTTL: form.ttl };
      const action = await dispatch(
        update({ authToken, localData: updatedUser })
      );
      if (action.payload.success) {
        createToast({
          body: "Settings saved successfully",
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
    } catch (error) {
      console.log(error);
      createToast({ body: "Failed to save settings" });
    } finally {
      setChecksIsLoading(false);
    }
  };

  const handleClearStats = async () => {
    try {
      const action = await dispatch(
        deleteMonitorChecksByTeamId({ teamId: user.teamId, authToken })
      );

      if (deleteMonitorChecksByTeamId.fulfilled.match(action)) {
        createToast({ body: "Stats cleared successfully" });
      } else {
        createToast({ body: "Failed to clear stats" });
      }
    } catch (error) {
      logger.error(error);
      createToast({ body: "Failed to clear stats" });
    }
  };

  const handleInsertDemoMonitors = async () => {
    try {
      const action = await dispatch(addDemoMonitors({ authToken }));
      if (addDemoMonitors.fulfilled.match(action)) {
        createToast({ body: "Successfully added demo monitors" });
      } else {
        createToast({ body: "Failed to add demo monitors" });
      }
    } catch (error) {
      logger.error(error);
      createToast({ Body: "Failed to add demo monitors" });
    }
  };

  const handleDeleteAllMonitors = async () => {
    try {
      const action = await dispatch(deleteAllMonitors({ authToken }));
      if (deleteAllMonitors.fulfilled.match(action)) {
        createToast({ body: "Successfully deleted all monitors" });
      } else {
        createToast({ body: "Failed to add demo monitors" });
      }
    } catch (error) {
      logger.error(error);
      createToast({ Body: "Failed to delete all monitors" });
    }
  };

  return (
    <Box
      className="settings"
      style={{
        paddingBottom: 0,
      }}
    >
      <Stack
        component="form"
        gap={theme.spacing(12)}
        noValidate
        spellCheck="false"
      >
        <ConfigBox>
          <Box>
            <Typography component="h1">General Settings</Typography>
            <Typography sx={{ mt: theme.spacing(2), mb: theme.spacing(2) }}>
              <Typography component="span">Display timezone</Typography>- The
              timezone of the dashboard you publicly display.
            </Typography>
          </Box>
          <Stack gap={theme.spacing(20)}>
            <Select
              id="display-timezone"
              label="Display timezone"
              value={timezone}
              onChange={(e) => {
                dispatch(setTimezone({ timezone: e.target.value }));
              }}
              items={timezones}
            />
          </Stack>
        </ConfigBox>
        {isAdmin && (
          <ConfigBox>
            <Box>
              <Typography component="h1">History and monitoring</Typography>
              <Typography sx={{ mt: theme.spacing(2) }}>
                Define here for how long you want to keep the data. You can also
                remove all past data.
              </Typography>
            </Box>
            <Stack gap={theme.spacing(20)}>
              <Field
                id="ttl"
                label="The days you want to keep monitoring history."
                optionalLabel="0 for infinite"
                value={form.ttl}
                onChange={handleChange}
                error={errors.ttl}
              />
              <Box>
                <Typography>Clear all stats. This is irreversible.</Typography>
                <LoadingButton
                  variant="contained"
                  color="error"
                  loading={isLoading || authIsLoading || checksIsLoading}
                  onClick={handleClearStats}
                  sx={{ mt: theme.spacing(4) }}
                >
                  Clear all stats
                </LoadingButton>
              </Box>
            </Stack>
          </ConfigBox>
        )}
        {isAdmin && (
          <ConfigBox>
            <Box>
              <Typography component="h1">Demo Monitors</Typography>
              <Typography sx={{ mt: theme.spacing(2) }}>
                Here you can add and remove demo monitors
              </Typography>
            </Box>
            <Stack gap={theme.spacing(20)}>
              <Box>
                <Typography>Add demo monitors</Typography>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  loading={isLoading || authIsLoading || checksIsLoading}
                  onClick={handleInsertDemoMonitors}
                  sx={{ mt: theme.spacing(4) }}
                >
                  Add demo monitors
                </LoadingButton>
              </Box>
              <Box>
                <Typography>Remove all monitors</Typography>
                <LoadingButton
                  variant="contained"
                  color="error"
                  loading={isLoading || authIsLoading || checksIsLoading}
                  onClick={handleDeleteAllMonitors}
                  sx={{ mt: theme.spacing(4) }}
                >
                  Remove all monitors
                </LoadingButton>
              </Box>
            </Stack>
          </ConfigBox>
        )}
        <ConfigBox>
          <Box>
            <Typography component="h1">Advanced Settings</Typography>
            <Typography sx={{ mt: theme.spacing(2) }}>
              Click here to modify advanced settings
            </Typography>
          </Box>
          <Stack gap={theme.spacing(20)}>
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/advanced-settings");
                }}
              >
                Advanced Settings
              </Button>
            </Box>
          </Stack>
        </ConfigBox>
        <ConfigBox>
          <Box>
            <Typography component="h1">About</Typography>
          </Box>
          <Box>
            <Typography component="h2">BlueWave Uptime v1.0.0</Typography>
            <Typography
              sx={{ mt: theme.spacing(2), mb: theme.spacing(6), opacity: 0.6 }}
            >
              Developed by Bluewave Labs.
            </Typography>
            <Link
              level="secondary"
              url="https://github.com/bluewave-labs"
              label="https://github.com/bluewave-labs"
            />
          </Box>
        </ConfigBox>
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            loading={isLoading || authIsLoading || checksIsLoading}
            disabled={Object.keys(errors).length > 0}
            variant="contained"
            color="primary"
            sx={{ px: theme.spacing(12), mt: theme.spacing(20) }}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
};

Settings.propTypes = {
  isAdmin: PropTypes.bool,
};
export default Settings;
