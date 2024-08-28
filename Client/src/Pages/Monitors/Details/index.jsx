import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
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
import Button from "../../../Components/Button";
import SettingsIcon from "../../../assets/icons/settings-bold.svg?react";
import PaginationTable from "./PaginationTable";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";
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
        color={theme.palette.common.main}
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
  }, [authToken, monitorId]);

  const theme = useTheme();
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
          <Stack gap={theme.spacing(12)} mt={theme.spacing(12)}>
            <Stack direction="row" gap={theme.spacing(2)}>
              <PulseDot
                color={
                  monitor?.status
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              />
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
                      color: monitor?.status
                        ? theme.palette.success.main
                        : theme.palette.success.text,
                    }}
                  >
                    Your site is {monitor?.status ? "up" : "down"}.
                  </Typography>{" "}
                  Checking every {formatDurationRounded(monitor?.interval)}.
                </Typography>
              </Box>
              {isAdmin && (
                <Button
                  level="tertiary"
                  label="Configure"
                  animate="rotate90"
                  img={
                    <SettingsIcon
                      style={{
                        minWidth: theme.spacing(10),
                        minHeight: theme.spacing(10),
                      }}
                    />
                  }
                  onClick={() => navigate(`/monitors/configure/${monitorId}`)}
                  sx={{
                    ml: "auto",
                    alignSelf: "flex-end",
                    backgroundColor: theme.palette.background.fill,
                    px: theme.spacing(6),
                    "& svg": {
                      mr: theme.spacing(3),
                    },
                  }}
                />
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
                <ButtonGroup
                  sx={{
                    "& .MuiButtonBase-root": {
                      borderColor: theme.palette.border.light,
                    },
                  }}
                >
                  <Button
                    level="secondary"
                    label="Day"
                    onClick={() => setDateRange("day")}
                    sx={{
                      backgroundColor:
                        dateRange === "day" && theme.palette.background.fill,
                    }}
                  />
                  <Button
                    level="secondary"
                    label="Week"
                    onClick={() => setDateRange("week")}
                    sx={{
                      backgroundColor:
                        dateRange === "week" && theme.palette.background.fill,
                    }}
                  />
                  <Button
                    level="secondary"
                    label="Month"
                    onClick={() => setDateRange("month")}
                    sx={{
                      backgroundColor:
                        dateRange === "month" && theme.palette.background.fill,
                    }}
                  />
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
