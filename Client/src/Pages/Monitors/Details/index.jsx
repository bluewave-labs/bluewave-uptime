import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Popover,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { networkService } from "../../../main";
import { logger } from "../../../Utils/Logger";
import {
  formatDate,
  formatDuration,
  formatDurationRounded,
} from "../../../Utils/timeUtils";
import MonitorDetailsAreaChart from "../../../Components/Charts/MonitorDetailsAreaChart";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsIcon from "../../../assets/icons/settings-bold.svg?react";
import CertificateIcon from "../../../assets/icons/certificate.svg?react";
import UptimeIcon from "../../../assets/icons/uptime-icon.svg?react";
import ResponseTimeIcon from "../../../assets/icons/response-time-icon.svg?react";
import AverageResponseIcon from "../../../assets/icons/average-response-icon.svg?react";
import IncidentsIcon from "../../../assets/icons/incidents.svg?react";
import PaginationTable from "./PaginationTable";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";
import "./index.css";
import { ChartBox, IconBox } from "./styled";

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
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Skeleton variant="rounded" width="20%" height={34} />
      <Stack gap={theme.spacing(20)} mt={theme.spacing(6)}>
        <Stack direction="row" gap={theme.spacing(4)} mt={theme.spacing(4)}>
          <Skeleton
            variant="circular"
            style={{ minWidth: 24, minHeight: 24 }}
          />
          <Box width="80%">
            <Skeleton variant="rounded" width="50%" height={24} />
            <Skeleton
              variant="rounded"
              width="50%"
              height={18}
              sx={{ mt: theme.spacing(4) }}
            />
          </Box>
          <Skeleton
            variant="rounded"
            width="20%"
            height={34}
            sx={{ alignSelf: "flex-end" }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={theme.spacing(12)}
        >
          <Skeleton variant="rounded" width="100%" height={80} />
          <Skeleton variant="rounded" width="100%" height={80} />
          <Skeleton variant="rounded" width="100%" height={80} />
        </Stack>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            mb={theme.spacing(8)}
          >
            <Skeleton
              variant="rounded"
              width="20%"
              height={24}
              sx={{ alignSelf: "flex-end" }}
            />
            <Skeleton variant="rounded" width="20%" height={34} />
          </Stack>
          <Box sx={{ height: "200px" }}>
            <Skeleton variant="rounded" width="100%" height="100%" />
          </Box>
        </Box>
        <Stack gap={theme.spacing(8)}>
          <Skeleton variant="rounded" width="20%" height={24} />
          <Skeleton variant="rounded" width="100%" height={200} />
          <Skeleton variant="rounded" width="100%" height={50} />
        </Stack>
      </Stack>
    </>
  );
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openCertificate = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeCertificate = () => {
    setAnchorEl(null);
  };

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

        let [month, day, year] = res?.data?.data?.certificateDate.split("/");
        const date = new Date(year, month - 1, day);

        setCertificateExpiry(
          formatDate(date, {
            hour: undefined,
            minute: undefined,
          }) ?? "N/A"
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchCertificate();
  }, [authToken, monitorId, monitor]);

  let loading = Object.keys(monitor).length === 0;
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
          <Stack gap={theme.spacing(16)} mt={theme.spacing(10)}>
            <Stack direction="row" gap={theme.spacing(2)}>
              <Box>
                <Typography
                  component="h1"
                  fontSize={22}
                  fontWeight={500}
                  color={theme.palette.text.primary}
                >
                  {monitor.name}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  gap={theme.spacing(2)}
                >
                  <Tooltip
                    title={`Your site is ${monitor?.status ? "up" : "down"}.`}
                    disableInteractive
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -8],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <Box>
                      <PulseDot
                        color={
                          monitor?.status
                            ? theme.palette.success.main
                            : theme.palette.error.main
                        }
                      />
                    </Box>
                  </Tooltip>
                  <Typography
                    component="h2"
                    color={theme.palette.text.secondary}
                  >
                    {monitor.url?.replace(/^https?:\/\//, "") || "..."}
                  </Typography>
                  <Typography
                    ml={theme.spacing(6)}
                    lineHeight="20px"
                    position="relative"
                    color={theme.palette.text.tertiary}
                    sx={{
                      "&:before": {
                        position: "absolute",
                        content: `""`,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.text.tertiary,
                        opacity: 0.8,
                        left: -9,
                        top: "42%",
                      },
                    }}
                  >
                    Checking every {formatDurationRounded(monitor?.interval)}.
                  </Typography>
                </Stack>
              </Box>
              <Stack
                direction="row"
                height={34}
                sx={{
                  ml: "auto",
                  alignSelf: "flex-end",
                }}
              >
                <IconBox
                  mr={theme.spacing(4)}
                  onClick={openCertificate}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <CertificateIcon />
                </IconBox>
                <Popover
                  id="certificate-dropdown"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeCertificate}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        py: 4,
                        px: 6,
                        width: 140,
                        backgroundColor: theme.palette.background.accent,
                      },
                    },
                  }}
                >
                  <Typography fontSize={12} color={theme.palette.text.tertiary}>
                    Certificate Expiry
                  </Typography>
                  <Typography
                    component="span"
                    fontSize={13}
                    color={theme.palette.text.primary}
                  >
                    {certificateExpiry}
                  </Typography>
                </Popover>
                {isAdmin && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/monitors/configure/${monitorId}`)}
                    sx={{
                      px: theme.spacing(5),
                      "& svg": {
                        mr: theme.spacing(3),
                        "& path": {
                          stroke: theme.palette.text.tertiary,
                        },
                      },
                    }}
                  >
                    <SettingsIcon /> Configure
                  </Button>
                )}
              </Stack>
            </Stack>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                gap={theme.spacing(4)}
                mb={theme.spacing(10)}
              >
                <ButtonGroup sx={{ height: 30 }}>
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
                <Typography color={theme.palette.text.tertiary}>
                  Showing statistics for past{" "}
                  {dateRange === "day"
                    ? "24 hours"
                    : dateRange === "week"
                    ? "7 days"
                    : "30 days"}
                  .
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" gap={theme.spacing(8)}>
                <ChartBox>
                  <Stack>
                    <IconBox>
                      <UptimeIcon />
                    </IconBox>
                    <Typography component="h2">Uptime</Typography>
                  </Stack>
                  <Stack justifyContent="space-between" mt={theme.spacing(8)}>
                    <Box>
                      <Typography>Total Checks</Typography>
                      <Typography component="span">87</Typography>
                    </Box>
                    <Box>
                      <Typography>Uptime Percentage</Typography>
                      <Typography component="span">
                        98.3<Typography component="span">%</Typography>
                      </Typography>
                    </Box>
                  </Stack>
                </ChartBox>
                <ChartBox>
                  <Stack>
                    <IconBox>
                      <IncidentsIcon />
                    </IconBox>
                    <Typography component="h2">Incidents</Typography>
                  </Stack>
                  <Box>
                    <Typography>Total Incidents</Typography>
                    <Typography component="span">0</Typography>
                  </Box>
                </ChartBox>
                <ChartBox>
                  <Stack>
                    <IconBox>
                      <AverageResponseIcon />
                    </IconBox>
                    <Typography component="h2">
                      Average response time
                    </Typography>
                  </Stack>
                </ChartBox>
                <ChartBox>
                  <Stack>
                    <IconBox>
                      <ResponseTimeIcon />
                    </IconBox>
                    <Typography component="h2">Response Times</Typography>
                  </Stack>
                </ChartBox>
              </Stack>
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={theme.spacing(6)}
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
                {/* <MonitorDetailsAreaChart
                  checks={[...monitor.checks].reverse()}
                /> */}
              </Box>
            </Box>
            <Stack gap={theme.spacing(8)}>
              <Typography component="h2" color={theme.palette.text.secondary}>
                History
              </Typography>
              {/* <PaginationTable monitorId={monitorId} dateRange={dateRange} /> */}
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
