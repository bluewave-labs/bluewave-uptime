import { LineChart } from "@mui/x-charts/LineChart";
import PropTypes from "prop-types";

const PageSpeedLineChart = ({ pageSpeedChecks = [] }) => {
  const keyToLabel = {
    performance: "Performance",
    seo: "SEO",
    bestPractices: "Best practices",
    accessibility: "Accessibility",
  };

  const colors = {
    performance: "#2aa02b",
    seo: "#9467bd",
    bestPractices: "#ff7f0e",
    accessibility: "#1f76b3",
  };

  const customize = {
    legend: { position: { vertical: "bottom", horizontal: "middle" } },
    margin: { bottom: 75 },
  };

  const xLabels = pageSpeedChecks.map((check) => {
    return check.createdAt;
  });

  return (
    <LineChart
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        showMark: false,
      }))}
      yAxis={[{ min: 0, max: 100 }]}
      xAxis={[
        {
          scaleType: "point",
          data: xLabels,
          valueFormatter: (val) => new Date(val).toLocaleDateString(),
        },
      ]}
      dataset={pageSpeedChecks}
      {...customize}
      grid={{ vertical: true, horizontal: true }}
      tooltip={{ trigger: "none" }}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: 2,
          itemMarkWidth: 8,
          itemMarkHeight: 8,
          markGap: 5,
          itemGap: 15,
          labelStyle: {
            fontSize: 13,
            color: "#344054"
          }
        },
      }}
    />
  );
};

PageSpeedLineChart.propTypes = {
  pageSpeedChecks: PropTypes.array,
};

export default PageSpeedLineChart;
