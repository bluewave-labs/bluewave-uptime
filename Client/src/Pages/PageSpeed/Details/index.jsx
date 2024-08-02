import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import SettingsIcon from "../../../assets/icons/settings.svg?react";
import LastCheckedIcon from "../../../assets/icons/calendar-check.svg?react";
import ClockIcon from "../../../assets/icons/maintenance.svg?react";
import IntervalCheckIcon from "../../../assets/icons/interval-check.svg?react";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import GreenCheck from "../../../assets/icons/checkbox-green.svg?react";
import RedCheck from "../../../assets/icons/checkbox-red.svg?react";

import "./index.css";

const StatBox = ({ icon, title, value }) => {
  const theme = useTheme();

  return (
    <Stack
      className="stat-box"
      direction="row"
      gap={theme.gap.small}
      p={theme.gap.ml}
      pb={theme.gap.large}
    >
      {icon}
      <Box>
        <Typography variant="h6" mb={theme.gap.medium}>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Stack>
  );
};

const PageSpeedDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const data = {
    _id: "66ad34001d483d284550e8cb",
    monitorId: "66ad2f5b4dfcd19cdbfc7205",
    status: true,
    accessibility: 100,
    bestPractices: 79,
    seo: 100,
    performance: 100,
    audits: {
      cls: {
        id: "cumulative-layout-shift",
        title: "Cumulative Layout Shift",
        description:
          "Cumulative Layout Shift measures the movement of visible elements within the viewport.",
        score: 1,
        scoreDisplayMode: "numeric",
        displayValue: "0",
        numericValue: 0,
        numericUnit: "unitless",
        _id: "66ad34001d483d284550e8cd",
      },
      si: {
        id: "speed-index",
        title: "Speed Index",
        description:
          "Speed Index shows how quickly the contents of a page are visibly populated.",
        score: 1,
        scoreDisplayMode: "numeric",
        displayValue: "0.6s",
        numericValue: 567.8934352052013,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8ce",
      },
      fcp: {
        id: "first-contentful-paint",
        title: "First Contentful Paint",
        description:
          "First Contentful Paint marks the time at which the first text or image is painted.",
        score: 1,
        scoreDisplayMode: "numeric",
        displayValue: "0.4s",
        numericValue: 419,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8cf",
      },
      lcp: {
        id: "largest-contentful-paint",
        title: "Largest Contentful Paint",
        description:
          "Largest Contentful Paint marks the time at which the largest text or image is painted.",
        score: 1,
        scoreDisplayMode: "numeric",
        displayValue: "0.4s",
        numericValue: 422.5,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8d0",
      },
      tbt: {
        id: "total-blocking-time",
        title: "Total Blocking Time",
        description:
          "Sum of all time periods between FCP and Time to Interactive",
        score: 1,
        scoreDisplayMode: "numeric",
        displayValue: "20ms",
        numericValue: 16,
        numericUnit: "millisecond",
        _id: "66ad34001d483d284550e8d1",
      },
      _id: "66ad34001d483d284550e8cc",
    },
    createdAt: "2024-08-02T19:31:12.732Z",
    updatedAt: "2024-08-02T19:31:12.732Z",
    __v: 0,
  };

  return (
    <Stack className="page-speed-details" gap={theme.gap.large}>
      <Button
        level="tertiary"
        label="Back"
        animate="slideLeft"
        img={<WestRoundedIcon />}
        onClick={() => navigate("/page-speed")}
        sx={{
          width: "fit-content",
          backgroundColor: theme.palette.otherColors.fillGray,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            mr: theme.gap.small,
            fill: theme.palette.otherColors.slateGray,
          },
        }}
      />
      <Stack
        direction="row"
        gap={theme.gap.small}
        justifyContent="space-between"
      >
        <GreenCheck />
        <Box>
          <Typography component="h1" sx={{ lineHeight: 1 }}>
            google.com
          </Typography>
          <Typography
            mt={theme.gap.small}
            sx={{ color: "var(--env-var-color-17)" }}
          >
            Your pagespeed monitor is live.
          </Typography>
        </Box>
        <Button
          level="tertiary"
          label="Configure"
          animate="rotate90"
          img={<SettingsIcon />}
          onClick={() => navigate(`/monitors/configure/${monitorId}`)}
          sx={{
            ml: "auto",
            alignSelf: "flex-end",
            backgroundColor: "#f4f4f4",
            px: theme.gap.medium,
            "& svg": {
              mr: "6px",
            },
          }}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" gap={theme.gap.xl}>
        <StatBox
          icon={<LastCheckedIcon />}
          title="Last checked"
          value="27 July, 7:24 AM (3 minutes ago)"
        />
        <StatBox
          icon={<ClockIcon />}
          title="Checks since"
          value="27 July, 7:24 AM (3 minutes ago)"
        ></StatBox>
        <StatBox
          icon={<IntervalCheckIcon />}
          title="Checks every"
          value="3 minutes"
        ></StatBox>
      </Stack>
      <Typography component="h2">Score history</Typography>
      <Typography component="h2">Performance report</Typography>
    </Stack>
  );
};

export default PageSpeedDetails;
