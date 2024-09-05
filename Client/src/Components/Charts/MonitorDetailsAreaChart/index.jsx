import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./index.css";

const CustomToolTip = ({ active, payload, label }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        className="area-tooltip"
        sx={{
          backgroundColor: theme.palette.background.main,
          border: 1,
          borderColor: theme.palette.border.dark,
          borderRadius: theme.shape.borderRadius,
          py: theme.spacing(2),
          px: theme.spacing(4),
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.tertiary,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {new Date(label).toLocaleDateString("en-US", {
            weekday: "short", // Mon
            month: "long", // July
            day: "numeric", // 17
          }) +
            ", " +
            new Date(label).toLocaleTimeString("en-US", {
              hour: "numeric", // 12
              minute: "2-digit", // 15
              hour12: true, // AM/PM format
            })}
        </Typography>
        <Box mt={theme.spacing(1)}>
          <Box
            display="inline-block"
            width={theme.spacing(4)}
            height={theme.spacing(4)}
            backgroundColor={theme.palette.primary.main}
            sx={{ borderRadius: "50%" }}
          />
          <Stack
            display="inline-flex"
            direction="row"
            justifyContent="space-between"
            ml={theme.spacing(3)}
            sx={{
              "& span": {
                color: theme.palette.text.tertiary,
                fontSize: 11,
                fontWeight: 500,
              },
            }}
          >
            <Typography component="span" sx={{ opacity: 0.8 }}>
              Response Time
            </Typography>{" "}
            <Typography component="span">
              {payload[0].payload.originalResponseTime}
              <Typography component="span" sx={{ opacity: 0.8 }}>
                {" "}
                ms
              </Typography>
            </Typography>
          </Stack>
        </Box>
        {/* Display original value */}
      </Box>
    );
  }
  return null;
};

const MonitorDetailsAreaChart = ({ checks }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        width="100%"
        height="100%"
        data={checks}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          stroke={theme.palette.border.light}
          strokeWidth={1}
          strokeOpacity={1}
          fill="transparent"
          vertical={false}
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={theme.palette.primary.light}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          stroke={theme.palette.border.dark}
          dataKey="createdAt"
          tickFormatter={formatDate}
          tick={{ fontSize: "13px" }}
          tickLine={false}
          height={18}
        />
        <Tooltip content={<CustomToolTip />} />
        <Area
          type="monotone"
          dataKey="responseTime"
          stroke={theme.palette.primary.main}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

MonitorDetailsAreaChart.propTypes = {
  checks: PropTypes.array,
};

CustomToolTip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        originalResponseTime: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default MonitorDetailsAreaChart;
