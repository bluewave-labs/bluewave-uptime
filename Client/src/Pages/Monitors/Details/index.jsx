import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { networkService } from "../../../main";
import { logger } from "../../../Utils/Logger";
import {
  formatDuration,
  formatDurationRounded,
} from "../../../Utils/timeUtils";
import MonitorDetailsAreaChart from "../../../Components/Charts/MonitorDetailsAreaChart";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsIcon from "../../../assets/icons/settings-bold.svg?react";
import PaginationTable from "./PaginationTable";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";
import SkeletonLayout from "./skeleton";
import "./index.css";

const StatBox = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Box
      className="stat-box"
      flex="20%"
      minWidth="100px"
      px={theme.spacing(8)}
      py={theme.spacing(4)}
      border={1}
      borderColor={theme.palette.border.light}
      borderRadius={theme.shape.borderRadius}
      backgroundColor={theme.palette.background.main}
    >
      <Typography
        variant="h6"
        mb={theme.spacing(2)}
        fontSize={14}
        fontWeight={500}
        color={theme.palette.primary.main}
        sx={{
          "& span": {
            color: theme.palette.text.accent,
            fontSize: 13,
            fontStyle: "italic",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        fontWeight={500}
        fontSize={13}
        color={theme.palette.text.secondary}
      >
        {value}
      </Typography>
    </Box>
  );
};

StatBox.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/**
 * Details page component displaying monitor details and related information.
 * @component
 */
const DetailsPage = ({ isAdmin }) => {
  const theme = useTheme();
  const [monitor, setMonitor] = useState({});
  const { monitorId } = useParams();
  const { authToken } = useSelector((state) => state.auth);
  const [dateRange, setDateRange] = useState("day");
  const [certificateExpiry, setCertificateExpiry] = useState("N/A");
  const navigate = useNavigate();

  const fetchMonitor = useCallback(async () => {
    try {
      const res = await networkService.getStatsByMonitorId(
        authToken,
        monitorId,
        null,
        null,
        dateRange,
        50,
        true
      );
      console.log(res.data.data);
      setMonitor(res?.data?.data ?? {});
    } catch (error) {
      logger.error(error);
      navigate("/not-found", { replace: true });
    }
  }, [authToken, monitorId, navigate, dateRange]);

  useEffect(() => {
    fetchMonitor();
  }, [fetchMonitor]);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (monitor?.type !== "http") {
        return;
      }
      try {
        const res = await networkService.getCertificateExpiry(
          authToken,
          monitorId
        );
        setCertificateExpiry(res?.data?.data?.certificateDate ?? "N/A");
      } catch (error) {
        console.error(error);
      }
    };
    fetchCertificate();
  }, [authToken, monitorId, monitor]);

  let loading = Object.keys(monitor).length === 0;

  const statusColor = {
    true: theme.palette.success.main,
    false: theme.palette.error.main,
    undefined: theme.palette.warning.main,
  };

  const statusMsg = {
    true: "Your site is up.",
    false: "Your site is down.",
    undefined: "Pending...",
  };

  return (
    <Box className="monitor-details">
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Breadcrumbs
            list={[
              { name: "monitors", path: "/monitors" },
              { name: "details", path: `/monitors/${monitorId}` },
            ]}
          />
          <Stack gap={theme.spacing(12)} mt={theme.spacing(12)}>
            <Stack direction="row" gap={theme.spacing(2)}>
              <PulseDot color={statusColor[monitor?.status ?? undefined]} />
              <Box>
                <Typography
                  component="h1"
                  color={theme.palette.text.primary}
                  lineHeight={1}
                >
                  {monitor.url?.replace(/^https?:\/\//, "") || "..."}
                </Typography>
                <Typography
                  mt={theme.spacing(4)}
                  color={theme.palette.text.tertiary}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: statusColor[monitor?.status ?? undefined],
                    }}
                  >
                    {statusMsg[monitor?.status ?? undefined]}
                  </Typography>{" "}
                  Checking every {formatDurationRounded(monitor?.interval)}.
                </Typography>
              </Box>
              {isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/monitors/configure/${monitorId}`)}
                  sx={{
                    ml: "auto",
                    alignSelf: "flex-end",
                    px: theme.spacing(5),
                    "& svg": {
                      mr: theme.spacing(3),
                      "& path": {
                        stroke: theme.palette.other.icon,
                      },
                    },
                  }}
                >
                  <SettingsIcon /> Configure
                </Button>
              )}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={theme.spacing(12)}
              flexWrap="wrap"
            >
              <StatBox
                title="Currently up for"
                value={formatDuration(monitor?.uptimeDuration)}
              />
              <StatBox
                title="Last check"
                value={`${formatDurationRounded(monitor?.lastChecked)} ago`}
              />
              <StatBox title="Incidents" value={monitor?.incidents} />
              <StatBox title="Certificate Expiry" value={certificateExpiry} />
              <StatBox
                title="Latest response time"
                value={monitor?.latestResponseTime}
              />
              <StatBox
                title={
                  <>
                    Avg. Response Time{" "}
                    <Typography component="span">(24-hr)</Typography>
                  </>
                }
                value={parseFloat(monitor?.avgResponseTime24hours)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}
              />
              <StatBox
                title={
                  <>
                    Uptime <Typography component="span">(24-hr)</Typography>
                  </>
                }
                value={`${parseFloat(monitor?.uptime24Hours)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}%`}
              />
              <StatBox
                title={
                  <>
                    Uptime <Typography component="span">(30-day)</Typography>
                  </>
                }
                value={`${parseFloat(monitor?.uptime30Days)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}%`}
              />
            </Stack>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={theme.spacing(8)}
              >
                <Typography
                  component="h2"
                  alignSelf="flex-end"
                  color={theme.palette.text.secondary}
                >
                  Response Times
                </Typography>
                <ButtonGroup>
                  <Button
                    variant="group"
                    filled={(dateRange === "day").toString()}
                    onClick={() => setDateRange("day")}
                  >
                    Day
                  </Button>
                  <Button
                    variant="group"
                    filled={(dateRange === "week").toString()}
                    onClick={() => setDateRange("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant="group"
                    filled={(dateRange === "month").toString()}
                    onClick={() => setDateRange("month")}
                  >
                    Month
                  </Button>
                </ButtonGroup>
              </Stack>
              <Box
                p={theme.spacing(10)}
                pb={theme.spacing(2)}
                backgroundColor={theme.palette.background.main}
                border={1}
                borderColor={theme.palette.border.light}
                borderRadius={theme.shape.borderRadius}
                sx={{ height: "250px" }}
              >
                <MonitorDetailsAreaChart
                  checks={[...monitor.checks].reverse()}
                />
              </Box>
            </Box>
            <Stack gap={theme.spacing(8)}>
              <Typography component="h2" color={theme.palette.text.secondary}>
                History
              </Typography>
              <PaginationTable monitorId={monitorId} dateRange={dateRange} />
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

DetailsPage.propTypes = {
  isAdmin: PropTypes.bool,
};
export default DetailsPage;
