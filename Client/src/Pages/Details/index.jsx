import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosConfig";
import BasicTable from "../../Components/BasicTable";

/**
 * Details page component displaying monitor details and related information.
 * @component
 */
const DetailsPage = () => {
  const [monitor, setMonitor] = useState({});
  const [data, setData] = useState({});
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
      const data = {
        cols: [
          { id: 1, name: "Status" },
          { id: 2, name: "Date & Time" },
          { id: 3, name: "Message" },
        ],
        rows: res.data.data.checks.map((check, idx) => {
          return {
            id: check._id,
            data: [
              { id: idx, data: check.status ? "Up" : "Down" },
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
    <div
      className="monitor-details"
      style={{
        padding: `${theme.content.pY} ${theme.content.pX}`,
      }}
    >
      <Typography component="h1" mb={theme.gap.small}>
        History
      </Typography>
      <BasicTable data={data} paginated={true} />
    </div>
  );
};

export default DetailsPage;
