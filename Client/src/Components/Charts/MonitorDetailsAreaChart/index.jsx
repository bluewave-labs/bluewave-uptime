import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";
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
          py: theme.spacing(6),
          px: theme.spacing(8),
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.main,
            fontSize: 13,
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
        <Typography
          mt={theme.spacing(2.5)}
          sx={{
            color: theme.palette.text.secondary,
            fontSize: 13,
          }}
        >
          Response Time (ms): {payload[0].payload.originalResponseTime}
        </Typography>{" "}
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={checks}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="createdAt"
          tickFormatter={formatDate}
          tick={{ fontSize: "13px" }}
          tickLine={false}
        />
        <Tooltip content={<CustomToolTip />} />
        <Area
          type="monotone"
          dataKey="responseTime"
          stroke="#29afee"
          fill="#eaf2fd"
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
