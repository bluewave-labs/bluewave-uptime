import "./index.css";
import PropTypes from "prop-types";
import { NormalizeData } from "../ChartUtils";
import { BarChart } from "@mui/x-charts/BarChart";

const ResponseTimeChart = ({ checks = [] }) => {
  const normalizedChecks = NormalizeData(checks, 1, 100);

  const responseTimes = normalizedChecks.map((check) => check.responseTime);
  const ids = normalizedChecks.map((check) => check.createdAt);
  const colors = normalizedChecks.map((check) => {
    return check.status === true ? "#17b26a" : "#d92d20";
  });

  return (
    <div className="chart-container">
      <BarChart
        leftAxis={null}
        bottomAxis={null}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        series={[{ data: responseTimes }]}
        xAxis={[
          {
            scaleType: "band",
            data: ids,
            colorMap: {
              type: "ordinal",
              values: ids,
              colors: colors,
            },
          },
        ]}
      />
    </div>
  );
};

ResponseTimeChart.propTypes = {
  checks: PropTypes.array,
};
export default ResponseTimeChart;
