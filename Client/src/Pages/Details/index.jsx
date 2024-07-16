import React, { useEffect, useState } from "react";
import CustomizedTables from "../../Components/CustomizedTables";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosConfig";

/**
 * Details page component displaying monitor details and related information.
 * @component
 */
const DetailsPage = () => {
  const [monitor, setMonitor] = useState({});
  const { monitorId } = useParams();
  const { authToken } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchMonitor = async () => {
      const res = await axiosInstance.get(`/monitors/${monitorId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMonitor(res.data.data);
    };
    fetchMonitor();
  }, [monitorId, authToken]);

  const theme = useTheme();

  /**
   * Function to calculate uptime duration based on the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {number} Uptime duration in ms.
   */
  const calculateUptimeDuration = (checks) => {
    if (!checks || checks.length === 0) {
      return 0;
    }

    let longestDuration = 0;
    let lastDownTimestamp = null;
    let currentDuration = longestDuration;

    // Loop over the checks to find the most recent uptime duration
    checks.forEach((check) => {
      if (check.status === false) {
        lastDownTimestamp = check.createdAt;
      } else if (check.status === true && lastDownTimestamp) {
        currentDuration = check.createdAt - lastDownTimestamp;
        if (currentDuration > longestDuration) {
          longestDuration = currentDuration;
        }
        lastDownTimestamp = null;
      }
    });
    lastDownTimestamp = null;
    return longestDuration;
  };

  /**
   * Helper function to get timestamp of the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {number} Timestamp of the most recent check.
   */
  const getLastCheckedTimestamp = (checks) => {
    if (!checks || checks.length === 0) {
      return 0; // Handle case when no checks are available
    }

    const mostRecentCheck = checks[0];
    return mostRecentCheck.createdAt;
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
      check.status === false ? (acc += 1) : acc;
    }, 0);
  };

  return (
    <Box>
      {/* Customized Tables Component */}
      <CustomizedTables monitor={monitor} />

      {/* Uptime duration */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "20px",
          color: "#344054",
          marginTop: theme.spacing(2),
        }}
      >
        Up for: {calculateUptimeDuration(monitor.checks)}
      </Typography>

      {/* Last checked */}
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Roboto",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          color: "#1570EF",
          marginBottom: theme.spacing(1),
        }}
      >
        Last checked: {getLastCheckedTimestamp(monitor.checks)}
      </Typography>

      {/* Incidents */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "20px",
          color: "#344054",
        }}
      >
        Incidents: {countIncidents(monitor.checks)}
      </Typography>
    </Box>
  );
};

export default DetailsPage;
