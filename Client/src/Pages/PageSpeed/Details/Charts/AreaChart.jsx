import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";

const config = {
  accessibility: {
    id: "accessibility",
    color: "primary",
  },
  bestPractices: {
    id: "bestPractices",
    color: "warning",
  },
  performance: {
    id: "performance",
    color: "success",
  },
  seo: {
    id: "seo",
    color: "unresolved",
  },
};

const PagespeedDetailsAreaChart = ({ data }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const memoizedData = useMemo(() => data, [data[0]]);

  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" minWidth={25} height={220}>
      <AreaChart
        width="100%"
        height="100%"
        data={memoizedData}
        margin={{ top: 10 }}
      >
        <CartesianGrid
          stroke={theme.palette.border.light}
          strokeWidth={1}
          strokeOpacity={1}
          fill="transparent"
          vertical={false}
        />
        <XAxis
          stroke={theme.palette.border.dark}
          dataKey="createdAt"
          tickFormatter={formatDate}
          tick={{
            fontSize: 12,
            fontWeight: 100,
            opacity: 0.8,
            stroke: theme.palette.text.tertiary,
          }}
          tickLine={false}
          height={18}
        />
        <Tooltip />
        <defs>
          {Object.values(config).map(({ id, color }) => {
            const startColor = theme.palette[color].main;
            const endColor = theme.palette[color].light;

            return (
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1" key={id}>
                <stop offset="0%" stopColor={startColor} stopOpacity={0.8} />
                <stop offset="100%" stopColor={endColor} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        {Object.keys(config).map((key) => {
          const { color } = config[key];
          const strokeColor = theme.palette[color].main;
          const activeDotColor = theme.palette[color].bg;

          return (
            <Area
              key={key}
              dataKey={key}
              stackId={1}
              stroke={strokeColor}
              strokeWidth={1.5}
              fill={`url(#${config[key].id})`}
              activeDot={{ stroke: activeDotColor, r: 5 }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PagespeedDetailsAreaChart;
