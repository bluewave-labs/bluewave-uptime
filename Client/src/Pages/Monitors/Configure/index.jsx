import { useNavigate, useParams } from "react-router";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../../Utils/axiosConfig";
import Button from "../../../Components/Button";
import Field from "../../../Components/Inputs/Field";
import RadioButton from "../../../Components/RadioButton";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import GreenCheck from "../../../assets/icons/checkbox-green.svg?react";
import RedCheck from "../../../assets/icons/checkbox-red.svg?react";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./index.css";

const formatDurationRounded = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let time = "";
  if (days > 0) {
    time += `${days} day${days !== 1 ? "s" : ""}`;
    return time;
  }
  if (hours > 0) {
    time += `${hours} hour${hours !== 1 ? "s" : ""}`;
    return time;
  }
  if (minutes > 0) {
    time += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    return time;
  }
  if (seconds > 0) {
    time += `${seconds} second${seconds !== 1 ? "s" : ""}`;
    return time;
  }

  return time;
};

/**
 * Helper function to get duration since last check
 * @param {Array} checks Array of check objects.
 * @returns {number} Timestamp of the most recent check.
 */
const getLastChecked = (checks) => {
  if (!checks || checks.length === 0) {
    return 0; // Handle case when no checks are available
  }
  return new Date() - new Date(checks[0].createdAt);
};

/**
 * Configure page displays monitor configurations and allows for editing actions.
 * @component
 */
const Configure = () => {
  const MS_PER_MINUTE = 60000;
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { monitorId } = useParams();

  const [monitor, setMonitor] = useState();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchMonitor = async () => {
      const res = await axiosInstance.get(`/monitors/${monitorId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      let data = res.data.data;
      setMonitor({
        name: data.name,
        url: data.url.replace(/^https?:\/\//, ""),
        type: data.type,
        interval: data.interval / MS_PER_MINUTE,
        status: data.status,
      });
    };
    fetchMonitor();
  }, [monitorId, authToken]);

  const frequencies = [1, 2, 3, 4, 5];

  return (
    <div
      className="configure-monitor"
      style={{
        maxWidth: "1200px",
        padding: `${theme.content.pY} ${theme.content.pX}`,
      }}
    >
      <Button
        level="tertiary"
        label="Back"
        img={<WestRoundedIcon />}
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: "#f4f4f4",
          mb: theme.gap.medium,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            pr: theme.gap.small,
          },
        }}
      />
      <form className="configure-monitor-form" noValidate spellCheck="false">
        <Stack gap={theme.gap.xl}>
          <Stack direction="row" gap={theme.gap.small} mt={theme.gap.small}>
            {monitor?.status ? <GreenCheck /> : <RedCheck />}
            <Box>
              <Typography component="h1" sx={{ lineHeight: 1 }}>
                {monitor?.url.replace(/^https?:\/\//, "") || "..."}
              </Typography>
              <Typography mt={theme.gap.small}>
                <Typography
                  component="span"
                  sx={{
                    color: monitor?.status
                      ? "var(--env-var-color-17)"
                      : "var(--env-var-color-24)",
                  }}
                >
                  Your site is {monitor?.status ? "up" : "down"}.
                </Typography>{" "}
                Checking every {formatDurationRounded(monitor?.interval)}. Last
                time checked{" "}
                {formatDurationRounded(getLastChecked(monitor?.checks))} ago.
              </Typography>
            </Box>
            <Stack
              direction="row"
              gap={theme.gap.medium}
              sx={{
                ml: "auto",
                alignSelf: "flex-end",
              }}
            >
              <Button
                level="tertiary"
                label="Pause"
                img={<PauseCircleOutlineIcon />}
                sx={{
                  backgroundColor: "#f4f4f4",
                  pl: theme.gap.small,
                  pr: theme.gap.medium,
                  "& svg": {
                    pr: theme.gap.xs,
                  },
                }}
              />
              <Button
                level="error"
                label="Remove"
                sx={{
                  boxShadow: "none",
                  px: theme.gap.ml,
                }}
              />
            </Stack>
          </Stack>
          <Stack
            className="config-box"
            direction="row"
            justifyContent="space-between"
            gap={theme.gap.xxl}
          >
            <Box>
              <Typography component="h2">General settings</Typography>
              <Typography component="p" sx={{ mt: theme.gap.small }}>
                Here you can select the URL of the host, together with the type
                of monitor.
              </Typography>
            </Box>
            <Stack gap={theme.gap.xl}>
              <Field
                type="url"
                id="monitor-url"
                label="URL to monitor"
                placeholder="google.com"
                value={monitor?.url}
              />
              <Field
                type="text"
                id="monitor-name"
                label="Friendly name"
                isOptional={true}
                placeholder="Google"
                value={monitor?.name}
              />
            </Stack>
          </Stack>
          <Stack
            className="config-box"
            direction="row"
            justifyContent="space-between"
            gap={theme.gap.xxl}
          >
            <Box>
              <Typography component="h2">Checks to perform</Typography>
              <Typography component="p" sx={{ mt: theme.gap.small }}>
                You can always add or remove checks after adding your site.
              </Typography>
            </Box>
            <Stack gap={theme.gap.xl}>
              <RadioButton
                id="monitor-checks-http"
                title="HTTP/website monitoring"
                desc="Use HTTP(s) to monitor your website or API endpoint."
                size="small"
                value="http"
                checked={monitor?.type === "http"}
              />
              <RadioButton
                id="monitor-checks-ping"
                title="Ping monitoring"
                desc="Check whether your server is available or not."
                size="small"
                value="ping"
                checked={monitor?.type === "ping"}
              />
              <Box className="error-container">
                {errors["type"] ? (
                  <Typography component="p" className="input-error">
                    {errors["type"]}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
            </Stack>
          </Stack>
          <Stack
            className="config-box"
            direction="row"
            justifyContent="space-between"
            gap={theme.gap.xxl}
          >
            <Box>
              <Typography component="h2">Advanced settings</Typography>
            </Box>
            <Stack gap={theme.gap.xl}>
              <Select
                id="monitor-interval"
                value={monitor?.interval || 1}
                MenuProps={{
                  PaperProps: {
                    style: {
                      marginTop: "10px",
                    },
                  },
                }}
                IconComponent={KeyboardArrowDownIcon}
              >
                {frequencies.map((freq) => (
                  <MenuItem
                    key={`port-${freq}`}
                    value={freq}
                    disableRipple
                    sx={{
                      fontSize: "13px",
                      borderRadius: `${theme.shape.borderRadius}px`,
                      margin: theme.gap.xs,
                    }}
                  >
                    {freq} {freq === 1 ? "minute" : "minutes"}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={theme.gap.xl}>
          <Button level="primary" label="Save" sx={{ px: theme.gap.ml }} />
        </Stack>
      </form>
    </div>
  );
};

export default Configure;
