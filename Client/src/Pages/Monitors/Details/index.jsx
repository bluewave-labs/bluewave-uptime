import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../Utils/axiosConfig";
import BasicTable from "../../../Components/BasicTable";
import MonitorDetailsAreaChart from "../../../Components/Charts/MonitorDetailsAreaChart";
import { StatusLabel } from "../../../Components/Label";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "../../../Components/Button";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import GreenCheck from "../../../assets/icons/checkbox-green.svg?react";
import RedCheck from "../../../assets/icons/checkbox-red.svg?react";
import SettingsIcon from "../../../assets/icons/settings.svg?react";
import "./index.css";

const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let dateStr = "";

  days && (dateStr += `${days}d `);
  hours && (dateStr += `${hours % 24}h `);
  minutes && (dateStr += `${minutes % 60}m `);
  seconds && (dateStr += `${seconds % 60}s `);

  dateStr === "" && (dateStr = "0s");

  return dateStr;
};

const StatBox = ({ title, value }) => {
  return (
    <Box className="stat-box">
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Box>
  );
};

/**
 * Details page component displaying monitor details and related information.
 * @component
 */
const DetailsPage = () => {
  const [monitor, setMonitor] = useState({});
  const [data, setData] = useState({});
  const { monitorId } = useParams();
  const { authToken } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("day");

  useEffect(() => {
    const fetchMonitor = async () => {
      const res = await axiosInstance.get(`/monitors/${monitorId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMonitor(res.data.data);
      const data = {
        cols: [
          { id: 1, name: "Status" },
          { id: 2, name: "Date & Time" },
          { id: 3, name: "Message" },
        ],
        rows: res.data.data.checks.map((check, idx) => {
          const params = {
            status: check.status === true ? "Up" : "Down",
            backgroundColor:
              check.status === true
                ? "var(--env-var-color-20)"
                : "var(--env-var-color-21)",
            statusDotColor:
              check.status === true
                ? "var(--env-var-color-17)"
                : "var(--env-var-color-19)",
          };

          return {
            id: check._id,
            data: [
              {
                id: idx,
                data: (
                  <StatusLabel
                    status={params.status}
                    dot={params.statusDotColor}
                    customStyles={{
                      backgroundColor: params.backgroundColor,
                    }}
                  />
                ),
              },
              { id: idx + 1, data: new Date(check.createdAt).toLocaleString() },
              { id: idx + 2, data: check.statusCode },
            ],
          };
        }),
      };

      setData(data);
    };
    fetchMonitor();
  }, [monitorId, authToken]);

  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Function to calculate uptime duration based on the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {number} Uptime duration in ms.
   */

  // TODO:  This can be done more efficiently by iteratting backwards
  //      and breaking when the first down check is found, calculate current time - downtime
  const calculateUptimeDuration = (checks) => {
    if (!checks || checks.length === 0) {
      return 0;
    }
    const latestCheck = new Date(checks[0].createdAt);
    let latestDownCheck = 0;
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].status === false) {
        latestDownCheck = new Date(checks[i].createdAt);
        break;
      }
    }
    if (latestDownCheck === 0) {
      return Date.now() - new Date(checks[checks.length - 1].createdAt);
    }
    return latestCheck - latestDownCheck;
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
   * Helper function to count incidents (checks with status === false).
   * @param {Array} checks Array of check objects.
   * @returns {number} Number of incidents.
   */
  const countIncidents = (checks) => {
    if (!checks || checks.length === 0) {
      return 0; // Handle case when no checks are available
    }
    return checks.reduce((acc, check) => {
      return check.status === false ? (acc += 1) : acc;
    }, 0);
  };

  return (
    <div
      className="monitor-details"
      style={{
        padding: `${theme.content.pY} ${theme.content.pX}`,
      }}
    >
      <Button
        level="tertiary"
        label="Back to Monitors"
        img={<WestRoundedIcon />}
        onClick={() => navigate("/monitors")}
        sx={{
          backgroundColor: "#f4f4f4",
          mb: theme.gap.medium,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            pr: theme.gap.small,
          },
        }}
      />
      <Stack gap={theme.gap.xl}>
        <Stack direction="row" gap={theme.gap.small} mt={theme.gap.small}>
          <GreenCheck />
          <Box>
            <Typography component="h1" sx={{ lineHeight: 1 }}>
              {monitor.url?.replace(/^https?:\/\//, "") || "..."}
            </Typography>
            <Typography mt={theme.gap.small}>
              <Typography component="span">Your site is up.</Typography>{" "}
              Checking every 5 minutes. Last time checked 2 minutes ago.
            </Typography>
          </Box>
          <Button
            level="tertiary"
            label="Configure"
            img={<SettingsIcon />}
            sx={{
              ml: "auto",
              alignSelf: "flex-end",
              backgroundColor: "#f4f4f4",
              px: theme.gap.ml,
              "& svg": {
                pr: theme.gap.xs,
              },
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <StatBox
            title="Currently up for"
            value={formatDuration(calculateUptimeDuration(monitor.checks))}
          />
          <StatBox
            title="Last checked"
            value={`${formatDuration(getLastChecked(monitor.checks))} ago`}
          />
          <StatBox title="Incidents" value={countIncidents(monitor.checks)} />
        </Stack>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            mb={theme.gap.ml}
          >
            <Typography component="h2" mb={theme.gap.small}>
              Response Times
            </Typography>
            <ButtonGroup>
              <Button
                level="secondary"
                label="Day"
                onClick={() => setFilter("day")}
                sx={{ backgroundColor: filter === "day" && "#f4f4f4" }}
              />
              <Button
                level="secondary"
                label="Week"
                onClick={() => setFilter("week")}
                sx={{ backgroundColor: filter === "week" && "#f4f4f4" }}
              />
              <Button
                level="secondary"
                label="Month"
                onClick={() => setFilter("month")}
                sx={{ backgroundColor: filter === "month" && "#f4f4f4" }}
              />
            </ButtonGroup>
          </Stack>
          <Box sx={{ height: "200px" }}>
            <MonitorDetailsAreaChart checks={monitor.checks} filter={filter} />
          </Box>
        </Box>
        <Box>
          <Typography component="h2" mb={theme.gap.ml}>
            History
          </Typography>
          <BasicTable data={data} paginated={true} />
        </Box>
      </Stack>
    </div>
  );
};

StatBox.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default DetailsPage;
