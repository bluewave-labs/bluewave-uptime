import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { NormalizeData } from "../ChartUtils";

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "white" }}>
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

const MonitorDetailsAreaChart = ({ checks, filter }) => {
  //   SQUASH ERROR, NOT PERMANENT SOLUTION
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  //   END SQUASH ERROR, NOT PERMANENT SOLUTION

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filterChecks = (checks, filter) => {
    const limits = {
      day: 24 * 60 * 60 * 1000,
      week: 24 * 60 * 60 * 1000 * 7,
      month: 24 * 60 * 60 * 1000 * 30, //TODO better monthly calculations
    };

    const now = new Date().getTime();
    const result = [];
    for (let i = 0; i < checks.length; i++) {
      const checkTime = new Date(checks[i].createdAt).getTime();
      if (now - checkTime < limits[filter]) {
        result.push(checks[i]);
      } else {
        break;
      }
    }
    return result;
  };

  let normalizedChecks = [];
  if (checks && checks.length > 0) {
    const filteredChecks = filterChecks(checks, filter);
    normalizedChecks = NormalizeData(filteredChecks, 33, 100);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={normalizedChecks}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="createdAt"
          tickFormatter={formatDate}
          tick={{ fontSize: "13px" }}
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
  filter: PropTypes.string,
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
