import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="area-tooltip">
        <p>
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
        </p>
        <p>Response Time (ms): {payload[0].payload.originalResponseTime}</p>{" "}
        {/* Display original value */}
      </div>
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
