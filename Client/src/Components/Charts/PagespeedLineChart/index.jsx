import { LineChart } from "@mui/x-charts/LineChart";

import data from "./dummy_data";

const PageSpeedLineChart = ({ pageSpeedChecks = [] }) => {
  //   //   SQUASH ERROR, NOT PERMANENT SOLUTION
  //   const error = console.error;
  //   console.error = (...args) => {
  //     if (/defaultProps/.test(args[0])) return;
  //     error(...args);
  //   };

  //   //   END SQUASH ERROR, NOT PERMANENT SOLUTION
  //   return (
  //     <div style={{ width: "100vw", height: "80vw" }}>
  //       <ResponsiveContainer width="100%" height="100%">
  //         <LineChart width={500} height={300} data={data} margin={{}}>
  //           <CartesianGrid strokeDasharray="3 3" />
  //           <XAxis dataKey="name" />
  //           <YAxis />
  //           <Tooltip />
  //           <Legend />
  //           <Line type="monotone" dataKey="performance" stroke="#2aa02b" />
  //           <Line type="monotone" dataKey="seo" stroke="#9467bd" />
  //           <Line type="monotone" dataKey="bestPractices" stroke="#ff7f0e" />
  //           <Line type="monotone" dataKey="accessibility" stroke="#1f76b3" />
  //         </LineChart>
  //       </ResponsiveContainer>
  //     </div>
  //   );

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
    // legend: { hidden: true },
    // margin: { top: 5 },
    // // stackingOrder: "descending",
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <LineChart
        series={Object.keys(keyToLabel).map((key) => ({
          dataKey: key,
          label: keyToLabel[key],
          color: colors[key],
          showMark: false,
        }))}
        dataset={data}
        {...customize}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};

export default PageSpeedLineChart;
