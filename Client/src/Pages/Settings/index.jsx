import { useTheme } from "@emotion/react";
import { Box, Stack, styled, Typography } from "@mui/material";
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
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
const Settings = ({ isAdmin }) => {
  const theme = useTheme();
  const { user, authToken } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.uptimeMonitors);

  const dispatch = useDispatch();

  // TODO Handle saving

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

  const ConfigBox = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing(20),
    paddingTop: theme.spacing(12),
    paddingInline: theme.spacing(15),
    paddingBottom: theme.spacing(25),
    backgroundColor: theme.palette.background.main,
    border: 1,
    borderStyle: "solid",
    borderColor: theme.palette.border.light,
    borderRadius: theme.spacing(2),
    "& > div:first-of-type": {
      flex: 0.7,
    },
    "& > div:last-of-type": {
      flex: 1,
    },
    "& h1, & h2": {
      color: theme.palette.text.secondary,
    },
    "& p": {
      color: theme.palette.text.tertiary,
    },
  });

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
            <Typography>
              <Typography component="span">Server timezone</Typography>- The
              timezone of your server.
            </Typography>
          </Box>
          <Stack gap={theme.spacing(20)}>
            <Select
              id="display-timezone"
              label="Display timezone"
              value="est"
              onChange={() => logger.warn("disabled")}
              items={[{ _id: "est", name: "America / Toronto" }]}
            />
            <Select
              id="server-timezone"
              label="Server timezone"
              value="est"
              onChange={() => logger.warn("disabled")}
              items={[{ _id: "est", name: "America / Toronto" }]}
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
                type="text"
                id="history-monitoring"
                label="The days you want to keep monitoring history."
                isOptional={true}
                optionalLabel="0 for infinite"
                placeholder="90"
                value=""
                onChange={() => logger.warn("Disabled")}
              />
              <Box>
                <Typography>Clear all stats. This is irreversible.</Typography>
                <LoadingButton
                  variant="contained"
                  color="error"
                  loading={isLoading}
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
                  loading={isLoading}
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
                  loading={isLoading}
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
            loading={false}
            variant="contained"
            color="primary"
            sx={{ px: theme.spacing(12), mt: theme.spacing(20) }}
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
