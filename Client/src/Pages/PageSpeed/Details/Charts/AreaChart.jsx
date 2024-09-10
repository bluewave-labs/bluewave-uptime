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
import { Box, Stack, Typography } from "@mui/material";
import { formatDate } from "../../../../Utils/timeUtils";

const config = {
  accessibility: {
    id: "accessibility",
    text: "accessibility",
    color: "primary",
  },
  bestPractices: {
    id: "bestPractices",
    text: "best practices",
    color: "warning",
  },
  performance: {
    id: "performance",
    text: "performance",
    color: "success",
  },
  seo: {
    id: "seo",
    text: "SEO",
    color: "unresolved",
  },
};

const CustomToolTip = ({ active, payload, label }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.main,
          border: 1,
          borderColor: theme.palette.border.dark,
          borderRadius: theme.shape.borderRadius,
          py: theme.spacing(2),
          px: theme.spacing(4),
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.tertiary,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {formatDate(new Date(label))}
        </Typography>
        {Object.keys(config).map((key) => {
          const { color } = config[key];
          const dotColor = theme.palette[color].main;

          return (
            <Stack
              key={`${key}-tooltip`}
              direction="row"
              alignItems="center"
              gap={theme.spacing(3)}
              mt={theme.spacing(1)}
              sx={{
                "& span": {
                  color: theme.palette.text.tertiary,
                  fontSize: 11,
                  fontWeight: 500,
                },
              }}
            >
              <Box
                width={theme.spacing(4)}
                height={theme.spacing(4)}
                backgroundColor={dotColor}
                sx={{ borderRadius: "50%" }}
              />
              <Typography
                component="span"
                textTransform="capitalize"
                sx={{ opacity: 0.8 }}
              >
                {config[key].text}
              </Typography>{" "}
              <Typography component="span">
                {payload[0].payload[key]}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    );
  }
  return null;
};

const processDataWithGaps = (data, interval) => {
  if (data.length === 0) return [];
  let formattedData = [];
  let last = new Date(data[0].createdAt).getTime();

  // Helper function to add a null entry
  const addNullEntry = (timestamp) => {
    formattedData.push({
      accessibility: "N/A",
      bestPractices: "N/A",
      performance: "N/A",
      seo: "N/A",
      createdAt: timestamp,
    });
  };

  data.forEach((entry) => {
    const current = new Date(entry.createdAt).getTime();

    if (current - last > interval * 2) {
      // Insert null entries for each interval
      let temp = last + interval;
      while (temp < current) {
        addNullEntry(new Date(temp).toISOString());
        temp += interval;
      }
    }

    formattedData.push(entry);
    last = current;
  });

  return formattedData;
};

const PagespeedDetailsAreaChart = ({ data, interval }) => {
  const theme = useTheme();
  const memoizedData = useMemo(
    () => processDataWithGaps(data, interval),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" minWidth={25} height={215}>
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
          tickFormatter={(timestamp) =>
            formatDate(new Date(timestamp), {
              year: undefined,
              month: undefined,
              day: undefined,
            })
          }
          tick={{
            fontSize: 11,
            fontWeight: 100,
            opacity: 0.8,
            stroke: theme.palette.text.tertiary,
          }}
          tickLine={false}
          minTickGap={20}
          height={18}
          interval="preserveEnd"
        />
        <Tooltip
          cursor={{ stroke: theme.palette.border.light }}
          content={<CustomToolTip />}
        />
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
          const bgColor = theme.palette.background.main;

          return (
            <Area
              connectNulls
              key={key}
              dataKey={key}
              stackId={1}
              stroke={strokeColor}
              strokeWidth={1.5}
              fill={`url(#${config[key].id})`}
              activeDot={{ stroke: bgColor, fill: strokeColor, r: 4.5 }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PagespeedDetailsAreaChart;
