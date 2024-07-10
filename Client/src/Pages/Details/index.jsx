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

  // Example monitor data (replace with actual data or fetch from API)
  /**
   * Function to calculate uptime duration based on the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {string} Uptime duration in hours, minutes, and seconds.
   * TODO - NEED TO REVISIT THIS FOR PROPER LOGIC.
   */
  const calculateUptimeDuration = (checks) => {
    if (!checks || checks.length === 0) {
      return "N/A";
    }

    const mostRecentCheck = checks[0];
    const currentTime = new Date();
    const lastCheckedTime = new Date(mostRecentCheck.createdAt);
    let uptimeDuration = currentTime - lastCheckedTime;

    // Calculate hours, minutes, and seconds from uptime duration
    // TODO - NEED TO REVISIT THIS FOR PROPER LOGIC.
    let uptimeHours = Math.floor(uptimeDuration / (1000 * 60 * 60));
    uptimeDuration %= 1000 * 60 * 60;
    let uptimeMinutes = Math.floor(uptimeDuration / (1000 * 60));
    uptimeDuration %= 1000 * 60;
    let uptimeSeconds = Math.floor(uptimeDuration / 1000);

    return `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;
  };

  /**
   * Helper function to get timestamp of the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {string} Timestamp of the most recent check.
   * TODO - NEED TO REVISIT THIS FOR PROPER LOGIC.
   */
  const getLastCheckedTimestamp = (checks) => {
    if (!checks || checks.length === 0) {
      return "N/A"; // Handle case when no checks are available
    }

    const mostRecentCheck = checks[0];
    return new Date(mostRecentCheck.createdAt).toLocaleString();
  };

  /**
   * Helper function to count incidents (checks with status === false).
   * @param {Array} checks Array of check objects.
   * @returns {number} Number of incidents.
   * TODO - NEED TO REVISIT THIS FOR PROPER LOGIC.
   */
  const countIncidents = (checks) => {
    if (!checks || checks.length === 0) {
      return 0; // Handle case when no checks are available
    }

    // Count checks with status === false
    // TODO - NEED TO REVISIT THIS FOR PROPER LOGIC.
    const incidentCount = checks.filter((check) => !check.status).length;
    return incidentCount;
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
