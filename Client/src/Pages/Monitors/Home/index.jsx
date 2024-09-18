import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUptimeMonitorsByTeamId } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SkeletonLayout from "./skeleton";
import Fallback from "./fallback";
import StatusBox from "./StatusBox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import Greeting from "../../../Utils/greeting";
import MonitorTable from "./MonitorTable";
import Search from "../../../Components/Inputs/Search";

const Monitors = ({ isAdmin }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const monitorState = useSelector((state) => state.uptimeMonitors);
  const authState = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch({});

  useEffect(() => {
    dispatch(getUptimeMonitorsByTeamId(authState.authToken));
  }, [authState.authToken, dispatch]);
  let loading =
    monitorState?.isLoading &&
    monitorState?.monitorsSummary?.monitors?.length === 0;

  return (
    <Stack className="monitors" gap={theme.spacing(8)}>
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
              <Greeting type="uptime" />
              {monitorState?.monitorsSummary?.monitors?.length !== 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/monitors/create");
                  }}
                  sx={{ fontWeight: 500 }}
                >
                  Create monitor
                </Button>
              )}
            </Stack>
          </Box>
          {isAdmin && monitorState?.monitorsSummary?.monitors?.length === 0 && (
            <Fallback isAdmin={isAdmin} />
          )}

          {monitorState?.monitorsSummary?.monitors?.length !== 0 && (
            <>
              <Stack
                gap={theme.spacing(8)}
                direction="row"
                justifyContent="space-between"
              >
                <StatusBox
                  title="up"
                  value={monitorState?.monitorsSummary?.monitorCounts?.up ?? 0}
                />
                <StatusBox
                  title="down"
                  value={
                    monitorState?.monitorsSummary?.monitorCounts?.down ?? 0
                  }
                />
                <StatusBox
                  title="paused"
                  value={
                    monitorState?.monitorsSummary?.monitorCounts?.paused ?? 0
                  }
                />
              </Stack>
              <Box
                flex={1}
                px={theme.spacing(10)}
                py={theme.spacing(8)}
                border={1}
                borderColor={theme.palette.border.light}
                borderRadius={theme.shape.borderRadius}
                backgroundColor={theme.palette.background.main}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  mb={theme.spacing(8)}
                >
                  <Typography
                    component="h2"
                    variant="h2"
                    fontWeight={500}
                    letterSpacing={-0.2}
                  >
                    Actively monitoring
                  </Typography>
                  <Box
                    className="current-monitors-counter"
                    color={theme.palette.text.primary}
                    border={1}
                    borderColor={theme.palette.border.light}
                    backgroundColor={theme.palette.background.accent}
                  >
                    {monitorState?.monitorsSummary?.monitorCounts?.total || 0}
                  </Box>
                  <Box width="25%" minWidth={150} ml="auto">
                    <Search
                      options={monitorState?.monitorsSummary.monitors}
                      value={search}
                      handleChange={setSearch}
                    />
                  </Box>
                </Stack>
                <MonitorTable isAdmin={isAdmin} />
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
