import { useTheme } from "@emotion/react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
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
      <text x={x} y={height} dy={-3} textAnchor="start" fontSize={11}>
        {formatDate(new Date(firstDataPoint.time), options)}
      </text>
      <text x={width} y={height} dy={-3} textAnchor="end" fontSize={11}>
        {formatDate(new Date(lastDataPoint.time), options)}
      </text>
    </>
  );
};

export const UpBarChart = ({ data, type, onBarHover }) => {
  const theme = useTheme();

  const [chartHovered, setChartHovered] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const getColorRange = (uptime) => {
    return uptime > 80
      ? { main: theme.palette.success.main, light: theme.palette.success.light }
      : uptime > 50
      ? { main: theme.palette.warning.main, light: theme.palette.warning.light }
      : { main: theme.palette.error.text, light: theme.palette.error.light };
  };

  return (
    <ResponsiveContainer width="100%" height={155}>
      <BarChart
        width="100%"
        height="100%"
        data={data}
        onMouseEnter={() => {
          setChartHovered(true);
          onBarHover({ time: null, totalChecks: 0, uptimePercentage: 0 });
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
          maxBarSize={7}
          background={{ fill: "transparent" }}
        >
          {data.map((entry, index) => {
            let { main, light } = getColorRange(entry.uptimePercentage);
            return (
              <Cell
                key={`cell-${index}`}
                fill={
                  hoveredBarIndex === index ? main : chartHovered ? light : main
                }
                onMouseEnter={() => {
                  setHoveredBarIndex(index);
                  onBarHover(entry);
                }}
                onMouseLeave={() => {
                  setHoveredBarIndex(null);
                  onBarHover({
                    time: null,
                    totalChecks: 0,
                    uptimePercentage: 0,
                  });
                }}
              />
            );
          })}
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
          onBarHover({ time: null, totalIncidents: 0 });
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
          maxBarSize={7}
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
                onBarHover({ time: null, totalIncidents: 0 });
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ResponseGaugeChart = ({ data }) => {
  const theme = useTheme();

  let max = 1000; // max ms
  data = [{ response: max, fill: "transparent", background: false }, ...data];

  let responseTime = Math.floor(data[1].response);
  let responseProps =
    responseTime <= 200
      ? {
          category: "Excellent",
          main: theme.palette.success.main,
          bg: theme.palette.success.bg,
        }
      : responseTime <= 500
      ? {
          category: "Fair",
          main: theme.palette.success.main,
          bg: theme.palette.success.bg,
        }
      : responseTime <= 600
      ? {
          category: "Acceptable",
          main: theme.palette.warning.main,
          bg: theme.palette.warning.bg,
        }
      : {
          category: "Poor",
          main: theme.palette.error.text,
          bg: theme.palette.error.bg,
        };

  return (
    <ResponsiveContainer width="100%" height={155}>
      <RadialBarChart
        width="100%"
        height="100%"
        cy="89%"
        data={data}
        startAngle={180}
        endAngle={0}
        innerRadius={100}
        outerRadius={150}
      >
        <text x={0} y="100%" dx="5%" dy={-2} textAnchor="start" fontSize={11}>
          low
        </text>
        <text x="100%" y="100%" dx="-3%" dy={-2} textAnchor="end" fontSize={11}>
          high
        </text>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={18}
          fontWeight={400}
        >
          {responseProps.category}
        </text>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize={25}
        >
          <tspan fontWeight={600}>{responseTime}</tspan>{" "}
          <tspan opacity={0.8}>ms</tspan>
        </text>
        <RadialBar
          background={{ fill: responseProps.bg }}
          clockWise
          dataKey="response"
          stroke="none"
        >
          <Cell fill="transparent" background={false} barSize={0} />
          <Cell fill={responseProps.main} />
        </RadialBar>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
