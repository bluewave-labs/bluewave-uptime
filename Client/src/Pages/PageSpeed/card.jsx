import PageSpeedIcon from "../../assets/icons/page-speed.svg?react";
import { StatusLabel } from "../../Components/Label";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { IconBox } from "./Details/styled";
import useUtils from "../Monitors/utils";
import PropTypes from "prop-types";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";

const processData = (data) => {
  if (data.length === 0) return [];
  let formattedData = [];

  const calculateScore = (entry) => {
    return (
      (entry.accessibility +
        entry.bestPractices +
        entry.performance +
        entry.seo) /
      4
    );
  };

  data.forEach((entry) => {
    entry = { ...entry, score: calculateScore(entry) };
    formattedData.push(entry);
  });

  return formattedData;
};

const PagespeedAreaChart = ({ data, status }) => {
  const theme = useTheme();
  const { pagespeedStyles } = useUtils();

  const formattedData = processData(data);

  return (
    <ResponsiveContainer width="100%" minWidth={25} height={100}>
      <AreaChart
        width="100%"
        height="100%"
        data={formattedData}
        margin={{ top: 10, bottom: -5 }}
        style={{ cursor: "pointer" }}
      >
        <CartesianGrid
          stroke={theme.palette.border.light}
          strokeWidth={1}
          strokeOpacity={1}
          fill="transparent"
          vertical={false}
        />
        {/* <Tooltip
          cursor={{ stroke: theme.palette.border.light }}
          content={<CustomToolTip config={filteredConfig} />}
        /> */}
        <defs>
          <linearGradient
            id={`pagespeed-chart-${status}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={pagespeedStyles[status].stroke}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={pagespeedStyles[status].light}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="score"
          stroke={pagespeedStyles[status].stroke}
          strokeWidth={1.5}
          fill={`url(#pagespeed-chart-${status})`}
          activeDot={{
            stroke: pagespeedStyles[status].stroke,
            fill: pagespeedStyles[status].stroke,
            r: 4.5,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const Card = ({ monitor }) => {
  const { determineState, pagespeedStatusMsg } = useUtils();
  const theme = useTheme();
  const navigate = useNavigate();
  const monitorState = determineState(monitor);

  return (
    <Grid item lg={6} flexGrow={1}>
      <Box
        p={theme.spacing(8)}
        onClick={() => navigate(`/pagespeed/${monitor._id}`)}
        border={1}
        borderColor={theme.palette.border.light}
        borderRadius={theme.shape.borderRadius}
        backgroundColor={theme.palette.background.main}
        sx={{
          display: "grid",
          gridTemplateColumns: "34px 2fr 1fr",
          columnGap: theme.spacing(5),
          gridTemplateRows: "34px 1fr 3fr",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.background.accent,
          },
        }}
      >
        <IconBox>
          <PageSpeedIcon />
        </IconBox>
        <Typography component="h2" variant="h2" alignSelf="center">
          {monitor.name}
        </Typography>
        <StatusLabel
          status={monitorState}
          text={pagespeedStatusMsg[monitorState] || "Pending..."}
          customStyles={{
            width: "max-content",
            textTransform: "capitalize",
            alignSelf: "flex-start",
            justifySelf: "flex-end",
          }}
        />
        <Typography
          variant="body2"
          mt={theme.spacing(-1)}
          sx={{ gridColumnStart: 2 }}
        >
          {monitor.url}
        </Typography>
        <Box
          mx={theme.spacing(-8)}
          mt={theme.spacing(4)}
          mb={theme.spacing(-8)}
          sx={{ gridColumnStart: 1, gridColumnEnd: 4 }}
        >
          <PagespeedAreaChart data={monitor.checks} status={monitorState} />
        </Box>
      </Box>
    </Grid>
  );
};

Card.propTypes = {
  monitor: PropTypes.object.isRequired,
};

export default Card;
