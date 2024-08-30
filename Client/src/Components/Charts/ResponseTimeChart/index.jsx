import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import "./index.css";

const ResponseTimeChart = ({ checks = [] }) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-around"
      alignItems="flex-end"
      height="50px"
      width="300px"
    >
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
                    ? "var(--success-color)"
                    : "var(--error-color)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
};

ResponseTimeChart.propTypes = {
  checks: PropTypes.array,
};
export default ResponseTimeChart;
