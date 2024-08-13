import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";

import PropTypes from "prop-types";

const MonitorDetails60MinChart = ({ data }) => {
  const labelStyle = {
    fontSize: "8px",
    fill: "black",
  };

  const color = {
    true: "var(--env-var-color-23)",
    false: "var(--env-var-color-24)",
    undefined: "var(--env-var-color-33)",
  };
  return (
    <ResponsiveContainer width="100%" height={35}>
      <BarChart
        height={20}
        data={data}
        margin={{ top: 15, left: 15, right: 15, bottom: 0 }}
      >
        <XAxis hide={true} />
        <YAxis hide={true} domain={[0, 100]} />
        <Bar dataKey="value" barSize={15}>
          {data.map((check, index) => (
            <Cell key={`cell-${index}`} fill={color[check.status]} />
          ))}
        </Bar>
        <ReferenceLine x={0} stroke="black" strokeDasharray="3 3">
          <Label value="60 mins" position="top" style={labelStyle} />
        </ReferenceLine>
        <ReferenceLine
          x={Math.floor(data.length * (2 / 3))}
          stroke="black"
          strokeDasharray="3 3"
        >
          <Label value="20 mins" position="top" style={labelStyle} />
        </ReferenceLine>
        <ReferenceLine x={data.length - 1} stroke="black" strokeDasharray="3 3">
          <Label value="Now" position="top" style={labelStyle} />
        </ReferenceLine>
      </BarChart>
    </ResponsiveContainer>
  );
};

MonitorDetails60MinChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MonitorDetails60MinChart;
