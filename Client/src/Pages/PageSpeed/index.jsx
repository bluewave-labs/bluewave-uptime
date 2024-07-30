import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { formatDate, formatDurationRounded } from "../../Utils/timeUtils";
import { StatusLabel } from "../../Components/Label";
import { useDispatch, useSelector } from "react-redux";
import { getPageSpeedByUserId } from "../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import PageSpeedIcon from "../../assets/icons/page-speed.svg?react";
import Fallback from "../../Components/Fallback";
import "./index.css";

const Card = ({ data }) => {
  const theme = useTheme();

  /**
   * Helper function to get duration since last check or the last date checked
   * @param {Array} checks Array of check objects.
   * @param {boolean} duration Whether the function should return the duration since last checked or the date itself
   * @returns {number} Timestamp of the most recent check.
   */
  const getLastChecked = (checks, duration = true) => {
    if (!checks || checks.length === 0) {
      return 0; // Handle case when no checks are available
    }

    // Data is sorted newest -> oldest, so newest check is the most recent
    if (!duration) {
      return new Date(checks[0].createdAt);
    }
    return new Date() - new Date(checks[0].createdAt);
  };

  return (
    <Grid item lg={6} flexGrow={1}>
      <Stack direction="row" gap={theme.gap.medium} p={theme.gap.ml}>
        <PageSpeedIcon style={{ width: theme.gap.ml, height: theme.gap.ml }} />
        <Box flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography component="h2" mb={theme.gap.xs}>
              {data.name}
            </Typography>
            <StatusLabel
              status={data.status ? "up" : "cannot resolve"}
              text={data.status ? "Live (collecting data)" : "Inactive"}
            />
          </Stack>
          <Typography>{data.url.replace(/^https?:\/\//, "")}</Typography>
          <Typography mt={theme.gap.large}>
            <Typography component="span" fontWeight={600}>
              Last checked:{" "}
            </Typography>
            {formatDate(getLastChecked(data.checks, false))}{" "}
            <Typography component="span" fontStyle="italic">
              ({formatDurationRounded(getLastChecked(data.checks))} ago)
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
};

const PageSpeed = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state.auth);
  const { monitors } = useSelector((state) => state.pageSpeedMonitors);
  useEffect(() => {
    dispatch(getPageSpeedByUserId(authToken));
  }, []);

  return (
    <Box className="page-speed">
      {monitors ? (
        <Stack gap={theme.gap.xs}>
          <Typography component="h1">All page speed monitors</Typography>
          <Typography mb={theme.gap.large}>
            Click on one of the monitors to get more site speed information.
          </Typography>
          <Grid container spacing={theme.gap.large}>
            {monitors?.map((monitor) => (
              <Card data={monitor} key={`monitor-${monitor._id}`} />
            ))}
          </Grid>
        </Stack>
      ) : (
        <Fallback
          title="page speed"
          checks={[
            "Report on the user experience of a page",
            "Help analyze webpage speed",
            "Give suggestions on how the page can be improved",
          ]}
          link="/page-speed/create"
        />
      )}
    </Box>
  );
};

export default PageSpeed;
