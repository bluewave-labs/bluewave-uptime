import { useTheme } from "@emotion/react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../../../../Utils/timeUtils";

const CustomLabels = ({ x, width, height, firstDataPoint, lastDataPoint }) => {
  let options = {
    month: "short",
    year: undefined,
    hour: undefined,
    minute: undefined,
  };

  return (
    <>
      <text x={x} y={height} dy={-5} textAnchor="start" fill="#666">
        {formatDate(new Date(firstDataPoint.day), options)}
      </text>
      <text x={width} y={height} dy={-5} textAnchor="end" fill="#666">
        {formatDate(new Date(lastDataPoint.day), options)}
      </text>
    </>
  );
};

export const UpBarChart = ({ data, dateRange }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart width="100%" height="100%" data={data}>
        <XAxis
          stroke={theme.palette.border.dark}
          height={15}
          tick={false}
          label={
            <CustomLabels
              x={0}
              y={0}
              width="100%"
              height="100%"
              firstDataPoint={data[0]}
              lastDataPoint={data[data.length - 1]}
              dateRange={dateRange}
            />
          }
        />
        <Bar
          dataKey="totalChecks"
          fill={theme.palette.success.main}
          barSize={5}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const DownBarChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart width="100%" height="100%" data={data}>
        <XAxis
          stroke={theme.palette.border.dark}
          height={15}
          tick={false}
          label={
            <CustomLabels
              x={0}
              y={0}
              width="100%"
              height="100%"
              firstDataPoint={data[0]}
              lastDataPoint={data[data.length - 1]}
            />
          }
        />
        <Bar
          dataKey="totalIncidents"
          fill={theme.palette.error.text}
          barSize={5}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
