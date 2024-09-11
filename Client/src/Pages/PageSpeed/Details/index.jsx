import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDrawingArea } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  formatDurationRounded,
  formatDurationSplit,
} from "../../../Utils/timeUtils";
import { ChartBox, IconBox, StatBox } from "./styled";
import { logger } from "../../../Utils/Logger";
import { networkService } from "../../../main";
import SkeletonLayout from "./skeleton";
import SettingsIcon from "../../../assets/icons/settings-bold.svg?react";
import MetricsIcon from "../../../assets/icons/ruler-icon.svg?react";
import ScoreIcon from "../../../assets/icons/monitor-graph-line.svg?react";
import PerformanceIcon from "../../../assets/icons/performance-report.svg?react";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";
import PagespeedDetailsAreaChart from "./Charts/AreaChart";
import "./index.css";
import Checkbox from "../../../Components/Inputs/Checkbox";
import PieChart from "./Charts/PieChart";

/**
 * Renders a centered label within a pie chart.
 *
 * @param {Object} props
 * @param {string | number} props.value - The value to display in the label.
 * @param {string} props.color - The color of the text.
 * @returns {JSX.Element}
 */
const PieCenterLabel = ({ value, color, setExpand }) => {
  const { width, height } = useDrawingArea();
  return (
    <g
      transform={`translate(${width / 2}, ${height / 2})`}
      onMouseEnter={() => setExpand(true)}
    >
      <circle cx={0} cy={0} r={width / 3} fill="transparent" />
      <text
        className="pie-label"
        style={{
          fill: color,
          fontSize: "45px",
          textAnchor: "middle",
          dominantBaseline: "central",
          userSelect: "none",
        }}
      >
        {value}
      </text>
    </g>
  );
};

PieCenterLabel.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  setExpand: PropTypes.func,
};

/**
 * A component that renders a label on a pie chart slice.
 * The label is positioned relative to the center of the pie chart and is optionally highlighted.
 *
 * @param {Object} props
 * @param {number} props.value - The value to display inside the pie slice.
 * @param {number} props.startAngle - The starting angle of the pie slice in degrees.
 * @param {number} props.endAngle - The ending angle of the pie slice in degrees.
 * @param {string} props.color - The color of the label text when highlighted.
 * @param {boolean} props.highlighted - Determines if the label should be highlighted or not.
 * @returns {JSX.Element}
 */
const PieValueLabel = ({ value, startAngle, endAngle, color, highlighted }) => {
  const { width, height } = useDrawingArea();

  // Compute the midpoint angle in radians
  const angle = (((startAngle + endAngle) / 2) * Math.PI) / 180;
  const radius = height / 3.5; // length from center of the circle to where the text is positioned

  // Calculate x and y positions
  const x = Math.sin(angle) * radius;
  const y = -Math.cos(angle) * radius;

  return (
    <g transform={`translate(${width / 2}, ${height / 2})`}>
      <text
        className="pie-value-label"
        x={x}
        y={y}
        style={{
          fill: highlighted ? color : "rgba(0,0,0,0)",
          fontSize: "12px",
          textAnchor: "middle",
          dominantBaseline: "central",
          userSelect: "none",
        }}
      >
        +{value}
      </text>
    </g>
  );
};

PieValueLabel.propTypes = {
  value: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  color: PropTypes.string,
  highlighted: PropTypes.bool,
};

const PageSpeedDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [monitor, setMonitor] = useState({});
  const [audits, setAudits] = useState({});
  const { monitorId } = useParams();
  const { authToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMonitor = async () => {
      try {
        const res = await networkService.getStatsByMonitorId(
          authToken,
          monitorId,
          "desc",
          50,
          "day",
          null,
          null
        );
        setMonitor(res?.data?.data ?? {});
        setAudits(res?.data?.data?.checks?.[0]?.audits ?? []);
      } catch (error) {
        logger.error(logger);
        navigate("/not-found", { replace: true });
      }
    };

    fetchMonitor();
  }, [monitorId, authToken, navigate]);

  let loading = Object.keys(monitor).length === 0;
  const data = monitor?.checks ? [...monitor.checks].reverse() : [];

  const splitDuration = (duration) => {
    const { time, format } = formatDurationSplit(duration);
    return (
      <>
        {time}
        <Typography component="span">{format}</Typography>
      </>
    );
  };

  const [metrics, setMetrics] = useState({
    accessibility: true,
    bestPractices: true,
    performance: true,
    seo: true,
  });
  const handleMetrics = (id) => {
    setMetrics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /**
   * Retrieves color properties based on the performance value.
   *
   * @param {number} value - The performance score used to determine the color properties.
   * @returns {{stroke: string, text: string, shape: string}} The color properties for the given performance value.
   */
  const getColors = (value) => {
    if (value >= 90 && value <= 100)
      return {
        stroke: theme.palette.success.main,
        text: theme.palette.success.text,
        shape: "circle",
      };
    else if (value >= 50 && value < 90)
      return {
        stroke: theme.palette.warning.main,
        text: theme.palette.warning.text,
        shape: "square",
      };
    else if (value >= 0 && value < 50)
      return {
        stroke: theme.palette.error.text,
        text: theme.palette.error.text,
        shape: "circle",
      };
    return {
      stroke: theme.palette.unresolved.main,
      text: theme.palette.unresolved.main,
      shape: "",
    };
  };

  return (
    <Stack className="page-speed-details" gap={theme.spacing(10)}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Breadcrumbs
            list={[
              { name: "pagespeed", path: "/pagespeed" },
              { name: "details", path: `/pagespeed/${monitorId}` },
            ]}
          />
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
                alignItems="center"
                height="fit-content"
                gap={theme.spacing(2)}
              >
                <Tooltip
                  title={
                    monitor?.status
                      ? "Your pagespeed monitor is live."
                      : "Your pagespeed monitor is down."
                  }
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
                  fontSize={14.5}
                  color={theme.palette.text.secondary}
                >
                  {monitor?.url}
                </Typography>
                <Typography
                  mt={theme.spacing(1)}
                  ml={theme.spacing(6)}
                  fontSize={12}
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
                      top: "50%",
                      transform: "translateY(-50%)",
                    },
                  }}
                >
                  Checking every {formatDurationRounded(monitor?.interval)}.
                </Typography>
              </Stack>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/pagespeed/configure/${monitorId}`)}
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
              <SettingsIcon />
              Configure
            </Button>
          </Stack>
          <Stack direction="row" gap={theme.spacing(8)}>
            <StatBox>
              <Typography component="h2">checks since</Typography>
              <Typography>
                {splitDuration(monitor?.uptimeDuration)}
                <Typography component="span">ago</Typography>
              </Typography>
            </StatBox>
            <StatBox>
              <Typography component="h2">last check</Typography>
              <Typography>
                {splitDuration(monitor?.lastChecked)}
                <Typography component="span">ago</Typography>
              </Typography>
            </StatBox>
          </Stack>
          <Box>
            <Typography
              fontSize={12}
              color={theme.palette.text.tertiary}
              my={theme.spacing(8)}
            >
              Showing statistics for past 24 hours.
            </Typography>
            <ChartBox sx={{ gridTemplateColumns: "75% 25%" }}>
              <Stack direction="row" alignItems="center" gap={theme.spacing(6)}>
                <IconBox>
                  <ScoreIcon />
                </IconBox>
                <Typography component="h2">Score history</Typography>
              </Stack>
              <Box>
                <PagespeedDetailsAreaChart
                  data={data}
                  interval={monitor?.interval}
                  metrics={metrics}
                />
              </Box>
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={theme.spacing(6)}
                >
                  <IconBox>
                    <MetricsIcon />
                  </IconBox>
                  <Typography component="h2">Metrics</Typography>
                </Stack>
                <Stack
                  gap={theme.spacing(4)}
                  mt={theme.spacing(16)}
                  sx={{
                    "& label": { pl: theme.spacing(6) },
                  }}
                >
                  <Box>
                    <Typography fontSize={11} fontWeight={500}>
                      Shown
                    </Typography>
                    <Divider sx={{ mt: theme.spacing(2) }} />
                  </Box>
                  <Checkbox
                    id="accessibility-toggle"
                    label="Accessibility"
                    isChecked={metrics.accessibility}
                    onChange={() => handleMetrics("accessibility")}
                  />
                  <Divider />
                  <Checkbox
                    id="best-practices-toggle"
                    label="Best Practices"
                    isChecked={metrics.bestPractices}
                    onChange={() => handleMetrics("bestPractices")}
                  />
                  <Divider />
                  <Checkbox
                    id="performance-toggle"
                    label="Performance"
                    isChecked={metrics.performance}
                    onChange={() => handleMetrics("performance")}
                  />
                  <Divider />
                  <Checkbox
                    id="seo-toggle"
                    label="Search Engine Optimization"
                    isChecked={metrics.seo}
                    onChange={() => handleMetrics("seo")}
                  />
                  <Divider />
                </Stack>
              </Box>
            </ChartBox>
          </Box>
          <ChartBox
            flex={1}
            mt={theme.spacing(2)}
            sx={{ gridTemplateColumns: "35% 65%", gridTemplateRows: "15% 85%" }}
          >
            <Stack direction="row" alignItems="center" gap={theme.spacing(6)}>
              <IconBox>
                <PerformanceIcon />
              </IconBox>
              <Typography component="h2">Performance report</Typography>
            </Stack>
            <Stack
              alignItems="center"
              textAlign="center"
              minWidth="300px"
              flex={1}
              p={theme.spacing(12)}
            >
              <PieChart audits={audits} />
              <Typography fontSize={13} mt="auto">
                Values are estimated and may vary.{" "}
                <Typography
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  See calculator
                </Typography>
              </Typography>
            </Stack>
            <Box px={theme.spacing(20)} py={theme.spacing(8)} height="100%">
              <Typography
                mb={theme.spacing(6)}
                pb={theme.spacing(8)}
                color={theme.palette.text.secondary}
                textAlign="center"
                sx={{
                  borderBottom: 1,
                  borderBottomColor: theme.palette.border.light,
                  borderBottomStyle: "dashed",
                }}
              >
                The{" "}
                <Typography
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  performance score is calculated
                </Typography>{" "}
                directly from these{" "}
                <Typography component="span" fontWeight={600}>
                  metrics
                </Typography>
                .
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                pt={theme.spacing(8)}
                gap={theme.spacing(8)}
              >
                {Object.keys(audits).map((key) => {
                  if (key === "_id") return;

                  let audit = audits[key];
                  let metricParams = getColors(audit.score * 100);

                  let shape = (
                    <Box
                      sx={{
                        width: theme.spacing(6),
                        height: theme.spacing(6),
                        borderRadius: "50%",
                        backgroundColor: metricParams.stroke,
                      }}
                    ></Box>
                  );
                  if (metricParams.shape === "square")
                    shape = (
                      <Box
                        sx={{
                          width: theme.spacing(6),
                          height: theme.spacing(6),
                          backgroundColor: metricParams.stroke,
                        }}
                      ></Box>
                    );
                  else if (metricParams.shape === "triangle")
                    shape = (
                      <Box
                        sx={{
                          width: 0,
                          height: 0,
                          ml: `calc((${theme.spacing(6)} - ${theme.spacing(
                            4
                          )}) / -2)`,
                          borderLeft: `${theme.spacing(4)} solid transparent`,
                          borderRight: `${theme.spacing(4)} solid transparent`,
                          borderBottom: `${theme.spacing(6)} solid ${
                            metricParams.stroke
                          }`,
                        }}
                      ></Box>
                    );

                  // Find the position where the number ends and the unit begins
                  const match = audit.displayValue.match(
                    /(\d+\.?\d*)\s*([a-zA-Z]+)/
                  );
                  let value;
                  let unit;
                  if (match) {
                    value = match[1];
                    unit = match[2];
                  } else {
                    value = audit.displayValue;
                  }

                  return (
                    <Stack
                      className="metric"
                      key={`${key}-box`}
                      direction="row"
                      gap={theme.spacing(4)}
                    >
                      {shape}
                      <Box>
                        <Typography sx={{ lineHeight: 1 }}>
                          {audit.title}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            color: metricParams.text,
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          {value}
                          <Typography
                            component="span"
                            ml="2px"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: 13,
                            }}
                          >
                            {unit}
                          </Typography>
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </ChartBox>
        </>
      )}
    </Stack>
  );
};

PageSpeedDetails.propTypes = {
  push: PropTypes.func,
};

export default PageSpeedDetails;
