import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate, formatDurationRounded } from "../../../Utils/timeUtils";
import { getLastChecked } from "../../../Utils/monitorUtils";
import axiosInstance from "../../../Utils/axiosConfig";
import Button from "../../../Components/Button";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import SettingsIcon from "../../../assets/icons/settings-bold.svg?react";
import LastCheckedIcon from "../../../assets/icons/calendar-check.svg?react";
import ClockIcon from "../../../assets/icons/maintenance.svg?react";
import IntervalCheckIcon from "../../../assets/icons/interval-check.svg?react";
import GreenCheck from "../../../assets/icons/checkbox-green.svg?react";
import RedCheck from "../../../assets/icons/checkbox-red.svg?react";

import "./index.css";

/**
 * Displays a box with an icon, title, and value.
 *
 * @param {Object} props
 * @param {ReactNode} props.icon - The icon to display in the box.
 * @param {string} props.title - The title text to display above the value.
 * @param {string | number} props.value - The value text to display in the box.
 * @returns {JSX.Element}
 */
const StatBox = ({ icon, title, value }) => {
  const theme = useTheme();

  return (
    <Stack
      className="stat-box"
      direction="row"
      gap={theme.gap.small}
      p={theme.gap.ml}
      pb={theme.gap.mlplus}
    >
      {icon}
      <Box>
        <Typography variant="h6" mb={theme.gap.medium}>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Stack>
  );
};

/**
 * Renders a centered label within a pie chart.
 *
 * @param {Object} props
 * @param {string | number} props.value - The value to display in the label.
 * @param {string} props.color - The color of the text.
 * @returns {JSX.Element}
 */
const PieCenterLabel = ({ value, color }) => {
  const { width, height } = useDrawingArea();
  return (
    <text
      className="pie-label"
      x={width / 2}
      y={height / 2}
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
  );
};

const PageSpeedDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [monitor, setMonitor] = useState({});
  const { monitorId } = useParams();
  const { authToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMonitor = async () => {
      const res = await axiosInstance.get(
        `/monitors/${monitorId}?sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMonitor(res.data.data);
    };

    fetchMonitor();
  }, []);

  const data = {
    _id: "66ad34001d483d284550e8cb",
    monitorId: "66ad2f5b4dfcd19cdbfc7205",
    status: true,
    accessibility: 100,
    bestPractices: 79,
    seo: 100,
    performance: 100,
    audits: {
      cls: {
        id: "cumulative-layout-shift",
        title: "Cumulative Layout Shift",
        description:
          "Cumulative Layout Shift measures the movement of visible elements within the viewport.",
        score: 0.1,
        scoreDisplayMode: "numeric",
        displayValue: "0",
        numericValue: 0,
        numericUnit: "unitless",
        _id: "66ad34001d483d284550e8cd",
      },
      si: {
        id: "speed-index",
        title: "Speed Index",
        description:
          "Speed Index shows how quickly the contents of a page are visibly populated.",
        score: 0.9,
        scoreDisplayMode: "numeric",
        displayValue: "0.6s",
        numericValue: 567.8934352052013,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8ce",
      },
      fcp: {
        id: "first-contentful-paint",
        title: "First Contentful Paint",
        description:
          "First Contentful Paint marks the time at which the first text or image is painted.",
        score: 0.8,
        scoreDisplayMode: "numeric",
        displayValue: "0.4s",
        numericValue: 419,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8cf",
      },
      lcp: {
        id: "largest-contentful-paint",
        title: "Largest Contentful Paint",
        description:
          "Largest Contentful Paint marks the time at which the largest text or image is painted.",
        score: 0.6,
        scoreDisplayMode: "numeric",
        displayValue: "0.4s",
        numericValue: 422.5,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8d0",
      },
      tbt: {
        id: "total-blocking-time",
        title: "Total Blocking Time",
        description:
          "Sum of all time periods between FCP and Time to Interactive",
        score: 0.9,
        scoreDisplayMode: "numeric",
        displayValue: "20ms",
        numericValue: 16,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8d1",
      },
      _id: "66ad34001d483d284550e8cc",
    },
    createdAt: "2024-08-02T19:31:12.732Z",
    updatedAt: "2024-08-02T19:31:12.732Z",
    __v: 0,
  };

  /**
   * Weight constants for different performance metrics.
   * @type {Object}
   */
  const weights = {
    fcp: 10,
    si: 10,
    lcp: 25,
    tbt: 30,
    cls: 25,
  };

  /**
   * Retrieves color properties based on the performance value.
   *
   * @param {number} value - The performance score used to determine the color properties.
   * @returns {{stroke: string, text: string, bg: string}} The color properties for the given performance value.
   */
  const getColors = (value) => {
    if (value >= 90 && value <= 100) return theme.pie.green;
    else if (value >= 50 && value < 90) return theme.pie.yellow;
    else if (value >= 0 && value < 50) return theme.pie.red;
    return theme.pie.default;
  };

  let performance = 0;
  const getPieData = (audits) => {
    let props = [];
    let startAngle = 0;
    const padding = 3; // padding between arcs
    const max = 360 - padding * (Object.keys(audits).length - 1); // _id is a child of audits

    Object.keys(audits).forEach((key) => {
      if (audits[key].score) {
        let value = audits[key].score * weights[key];
        let endAngle = startAngle + (weights[key] * max) / 100;

        let theme = getColors(audits[key].score * 100);
        props.push({
          id: key,
          data: [
            {
              value: value,
              color: theme.stroke,
              label: key.toUpperCase(),
            },
            {
              value: weights[key] - value,
              color: theme.strokeBg,
              label: "",
            },
          ],
          arcLabel: (item) => `${item.label}`,
          arcLabelRadius: 95,
          startAngle: startAngle,
          endAngle: endAngle,
          innerRadius: 70,
          outerRadius: 80,
          cornerRadius: 3,
          highlightScope: { faded: "global", highlighted: "series" },
          faded: {
            innerRadius: 60,
            outerRadius: 70,
            additionalRadius: -20,
            arcLabelRadius: 5,
          },
          cx: pieSize.width / 2,
        });

        performance += Math.round(value);
        startAngle = endAngle + padding;
      }
    });

    return props;
  };

  const pieSize = { width: 300, height: 205 };
  const pieData = getPieData(data.audits);
  const colorMap = getColors(performance);

  const [highlightedItem, setHighLightedItem] = useState(null);

  return (
    <Stack className="page-speed-details" gap={theme.gap.large}>
      <Button
        level="tertiary"
        label="Back"
        animate="slideLeft"
        img={<WestRoundedIcon />}
        onClick={() => navigate("/pagespeed")}
        sx={{
          width: "fit-content",
          backgroundColor: theme.palette.otherColors.fillGray,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            mr: theme.gap.small,
            fill: theme.palette.otherColors.slateGray,
          },
        }}
      />
      <Stack
        direction="row"
        gap={theme.gap.small}
        justifyContent="space-between"
      >
        <GreenCheck />
        <Box>
          <Typography component="h1" sx={{ lineHeight: 1 }}>
            google.com
          </Typography>
          <Typography
            mt={theme.gap.small}
            sx={{ color: "var(--env-var-color-17)" }}
          >
            Your pagespeed monitor is live.
          </Typography>
        </Box>
        <Button
          level="tertiary"
          label="Configure"
          animate="rotate90"
          img={
            <SettingsIcon
              style={{ width: theme.gap.mlplus, height: theme.gap.mlplus }}
            />
          }
          onClick={() => navigate(`/monitors/configure/${monitorId}`)}
          sx={{
            ml: "auto",
            alignSelf: "flex-end",
            backgroundColor: theme.palette.otherColors.fillGray,
            px: theme.gap.medium,
            "& svg": {
              mr: "6px",
            },
          }}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={theme.gap.xl}
        flexWrap="wrap"
      >
        <StatBox
          icon={<LastCheckedIcon />}
          title="Last checked"
          value={
            <>
              {formatDate(getLastChecked(monitor?.checks, false))}{" "}
              <Typography
                component="span"
                fontStyle="italic"
                sx={{ opacity: 0.8 }}
              >
                ({formatDurationRounded(getLastChecked(monitor?.checks))} ago)
              </Typography>
            </>
          }
        />
        <StatBox
          icon={<ClockIcon />}
          title="Checks since"
          value={
            <>
              {formatDate(new Date(monitor?.createdAt))}{" "}
              <Typography
                component="span"
                fontStyle="italic"
                sx={{ opacity: 0.8 }}
              >
                (
                {formatDurationRounded(
                  new Date() - new Date(monitor?.createdAt)
                )}{" "}
                ago)
              </Typography>
            </>
          }
        ></StatBox>
        <StatBox
          icon={<IntervalCheckIcon />}
          title="Checks every"
          value={formatDurationRounded(monitor?.interval)}
        ></StatBox>
      </Stack>
      <Typography component="h2">Score history</Typography>
      <Typography component="h2">Performance report</Typography>
      <Box p={theme.gap.ml}>
        <Stack mx="auto" width="fit-content" alignItems="center">
          <PieChart
            series={[
              {
                data: [
                  {
                    value: 100,
                    color: colorMap.bg,
                  },
                ],
                outerRadius: 65,
                cx: pieSize.width / 2,
              },
              {
                data: [
                  {
                    value: performance,
                    color: colorMap.stroke,
                  },
                ],
                innerRadius: 60,
                outerRadius: 70,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 0,
                endAngle: (performance / 100) * 360,
                cx: pieSize.width / 2,
              },
            ]}
            width={pieSize.width}
            height={pieSize.height}
            margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
            tooltip={{ trigger: "none" }}
          >
            <PieCenterLabel value={performance} color={colorMap.text} />
          </PieChart>
          <PieChart
            series={[
              {
                data: [
                  {
                    value: 100,
                    color: colorMap.bg,
                  },
                ],
                outerRadius: 65,
                cx: pieSize.width / 2,
              },
              ...pieData,
            ]}
            width={pieSize.width}
            height={pieSize.height}
            margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
            highlightedItem={highlightedItem}
            onHighlightChange={setHighLightedItem}
            slotProps={{
              legend: { hidden: true },
            }}
            tooltip={{ trigger: "none" }}
            sx={{
              "&:has(.MuiPieArcLabel-faded) .pie-label": {
                fill: "rgba(0,0,0,0) !important",
              },
            }}
          >
            <PieCenterLabel value={performance} color={colorMap.text} />
          </PieChart>
          <Typography component="h2" mt={theme.gap.xs}>
            Performance
          </Typography>
          <Typography>Values are estimated and may vary.</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default PageSpeedDetails;
