import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { NormalizeData } from "../ChartUtils";

const MonitorDetailsAreaChart = ({ checks }) => {
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

  let normalizedChecks = [];
  if (checks && checks.length > 0) {
    normalizedChecks = NormalizeData(checks);
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
        <Tooltip />
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
export default MonitorDetailsAreaChart;
