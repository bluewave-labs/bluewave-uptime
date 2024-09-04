import { useTheme } from "@emotion/react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatDate } from "../../../../Utils/timeUtils";
import { useState } from "react";

const CustomLabels = ({
  x,
  width,
  height,
  firstDataPoint,
  lastDataPoint,
  type,
}) => {
  let options = {
    month: "short",
    year: undefined,
    hour: undefined,
    minute: undefined,
  };
  if (type === "day") delete options.hour;

  return (
    <>
      <text x={x} y={height} dy={-3} textAnchor="start">
        {formatDate(new Date(firstDataPoint.time), options)}
      </text>
      <text x={width} y={height} dy={-3} textAnchor="end">
        {formatDate(new Date(lastDataPoint.time), options)}
      </text>
    </>
  );
};

export const UpBarChart = ({ data, type, onBarHover }) => {
  const theme = useTheme();

  const [chartHovered, setChartHovered] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  return (
    <ResponsiveContainer width="100%" height={155}>
      <BarChart
        width="100%"
        height="100%"
        data={data}
        onMouseEnter={() => {
          setChartHovered(true);
          onBarHover({ time: null, totalChecks: null });
        }}
        onMouseLeave={() => {
          setChartHovered(false);
          setHoveredBarIndex(null);
          onBarHover(null);
        }}
      >
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
              type={type}
            />
          }
        />
        <Bar
          dataKey="totalChecks"
          barSize={5}
          background={{ fill: "transparent" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                hoveredBarIndex === index
                  ? theme.palette.success.main
                  : chartHovered
                  ? theme.palette.success.light
                  : theme.palette.success.main
              }
              onMouseEnter={() => {
                setHoveredBarIndex(index);
                onBarHover(entry);
              }}
              onMouseLeave={() => {
                setHoveredBarIndex(null);
                onBarHover({ time: null, totalChecks: null });
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const DownBarChart = ({ data, type, onBarHover }) => {
  const theme = useTheme();

  const [chartHovered, setChartHovered] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  return (
    <ResponsiveContainer width="100%" height={155}>
      <BarChart
        width="100%"
        height="100%"
        data={data}
        onMouseEnter={() => {
          setChartHovered(true);
          onBarHover({ time: null, totalIncidents: null });
        }}
        onMouseLeave={() => {
          setChartHovered(false);
          setHoveredBarIndex(null);
          onBarHover(null);
        }}
      >
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
              type={type}
            />
          }
        />
        <Bar
          dataKey="totalIncidents"
          barSize={5}
          background={{ fill: "transparent" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                hoveredBarIndex === index
                  ? theme.palette.error.text
                  : chartHovered
                  ? theme.palette.error.light
                  : theme.palette.error.text
              }
              onMouseEnter={() => {
                setHoveredBarIndex(index);
                onBarHover(entry);
              }}
              onMouseLeave={() => {
                setHoveredBarIndex(null);
                onBarHover({ time: null, totalIncidents: null });
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
