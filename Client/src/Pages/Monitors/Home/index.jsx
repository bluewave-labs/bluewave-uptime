import "./index.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUptimeMonitorsByTeamId } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import { useTheme } from "@emotion/react";
import BasicTable from "../../../Components/BasicTable";
import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SkeletonLayout from "./skeleton";
import Fallback from "./fallback";
import StatusBox from "./StatusBox";
import { buildData } from "./monitorData";
import Breadcrumbs from "../../../Components/Breadcrumbs";

const Monitors = ({ isAdmin }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const monitorState = useSelector((state) => state.uptimeMonitors);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch({});

  useEffect(() => {
    dispatch(getUptimeMonitorsByTeamId(authState.authToken));
  }, [authState.authToken, dispatch]);

  const up = monitorState.monitors.reduce((acc, cur) => {
    return cur.status === true ? acc + 1 : acc;
  }, 0);

  const down = monitorState.monitors.length - up;
  const data = buildData(monitorState.monitors, isAdmin, navigate);

  let loading = monitorState.isLoading && monitorState.monitors.length === 0;

  const now = new Date();
  const hour = now.getHours();

  let greeting = "";
  let emoji = "";
  if (hour < 12) {
    greeting = "morning";
    emoji = "🌅";
  } else if (hour < 18) {
    greeting = "afternoon";
    emoji = "🌞";
  } else {
    greeting = "evening";
    emoji = "🌙";
  }

  return (
    <Stack className="monitors" gap={theme.spacing(12)}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Box>
            <Breadcrumbs list={[{ name: `monitors`, path: "/monitors" }]} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={theme.spacing(5)}
            >
              <Box>
                <Typography
                  component="h1"
                  lineHeight={1}
                  color={theme.palette.text.primary}
                >
                  <Typography
                    component="span"
                    fontSize="inherit"
                    color={theme.palette.text.secondary}
                  >
                    Good {greeting},{" "}
                  </Typography>
                  <Typography
                    component="span"
                    fontSize="inherit"
                    fontWeight="inherit"
                  >
                    {authState.user.firstName} {emoji}
                  </Typography>
                </Typography>
                <Typography
                  sx={{ opacity: 0.8 }}
                  lineHeight={1}
                  fontWeight={300}
                  color={theme.palette.text.secondary}
                >
                  Here’s an overview of your uptime monitors.
                </Typography>
              </Box>
              {monitorState.monitors?.length !== 0 && (
                <Button
                  level="primary"
                  label="Create monitor"
                  onClick={() => {
                    navigate("/monitors/create");
                  }}
                  sx={{ fontWeight: 500 }}
                />
              )}
            </Stack>
          </Box>
          {isAdmin && monitorState.monitors?.length === 0 && (
            <Fallback isAdmin={isAdmin} />
          )}

          {monitorState.monitors?.length !== 0 && (
            <>
              <Stack
                gap={theme.spacing(12)}
                direction="row"
                justifyContent="space-between"
              >
                <StatusBox title="up" value={up} />
                <StatusBox title="down" value={down} />
                <StatusBox title="paused" value={0} />
              </Stack>
              <Box
                flex={1}
                p={theme.spacing(16)}
                border={1}
                borderColor={theme.palette.border.light}
                borderRadius={theme.shape.borderRadius}
                backgroundColor={theme.palette.background.main}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  mb={theme.spacing(12)}
                >
                  <Typography
                    component="h2"
                    color={theme.palette.text.secondary}
                  >
                    Current monitors
                  </Typography>
                  <Box
                    className="current-monitors-counter"
                    color={theme.palette.text.primary}
                    border={1}
                    borderColor={theme.palette.border.light}
                    backgroundColor={theme.palette.background.accent}
                  >
                    {monitorState.monitors.length}
                  </Box>
                  {/* TODO - add search bar */}
                </Stack>
                <BasicTable data={data} paginated={true} table={"monitors"} />
              </Box>
            </>
          )}
        </>
      )}
    </Stack>
  );
};

Monitors.propTypes = {
  isAdmin: PropTypes.bool,
};
export default Monitors;
