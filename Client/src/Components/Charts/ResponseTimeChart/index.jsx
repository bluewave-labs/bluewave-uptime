import "./index.css";
import PropTypes from "prop-types";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

const ResponseTimeChart = ({ checks = [] }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={150}
          height={40}
          data={checks}
          style={{ cursor: "pointer" }}
        >
          <Bar maxBarSize={10} dataKey="responseTime">
            {checks.map((check, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  check.status === true
                    ? "var(--env-var-color-23)"
                    : "var(--env-var-color-24)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ResponseTimeChart.propTypes = {
  checks: PropTypes.array,
};
export default ResponseTimeChart;
