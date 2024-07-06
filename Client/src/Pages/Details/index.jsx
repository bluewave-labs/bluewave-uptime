import React from 'react';
import CustomizedTables from '../../Components/CustomizedTables';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * Details page component displaying monitor details and related information.
 * @component
 */
const DetailsPage = () => {
  const theme = useTheme();

  // Example monitor data (replace with actual data or fetch from API)
  const monitorData = {
    "_id": "66863aa2437936b46e225d1f",
    "userId": "66863a8f437936b46e225d1a",
    "name": "Google",
    "description": "Google",
    "status": false,
    "type": "http",
    "url": "https://www.google.com/404",
    "isActive": true,
    "interval": 60000,
    "createdAt": "2024-07-04T06:01:06.527Z",
    "updatedAt": "2024-07-04T06:02:00.250Z",
    "__v": 0,
    "checks": [
      {
        "_id": "66863ad8437936b46e225d6d",
        "monitorId": "66863aa2437936b46e225d1f",
        "status": false,
        "responseTime": 144,
        "expiry": "2024-07-04T06:02:00.247Z",
        "statusCode": 404,
        "createdAt": "2024-07-04T06:02:00.248Z",
        "updatedAt": "2024-07-04T06:02:00.248Z",
        "__v": 0
      },
      {
        "_id": "66863b14437936b46e225d79",
        "monitorId": "66863aa2437936b46e225d1f",
        "status": false,
        "responseTime": 140,
        "expiry": "2024-07-04T06:03:00.167Z",
        "statusCode": 404,
        "createdAt": "2024-07-04T06:03:00.168Z",
        "updatedAt": "2024-07-04T06:03:00.168Z",
        "__v": 0
      }
    ]
  };

  /**
   * Function to calculate uptime duration based on the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {string} Uptime duration in hours, minutes, and seconds.
   */
  const calculateUptimeDuration = (checks) => {
    if (!checks || checks.length === 0) {
      return 'N/A'; 
    }

    // Sort checks by createdAt descending to get the most recent check first
    checks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const mostRecentCheck = checks[0];
    const currentTime = new Date();
    const lastCheckedTime = new Date(mostRecentCheck.createdAt);
    let uptimeDuration = currentTime - lastCheckedTime;

    // Calculate hours, minutes, and seconds from uptime duration
    let uptimeHours = Math.floor(uptimeDuration / (1000 * 60 * 60));
    uptimeDuration %= (1000 * 60 * 60);
    let uptimeMinutes = Math.floor(uptimeDuration / (1000 * 60));
    uptimeDuration %= (1000 * 60);
    let uptimeSeconds = Math.floor(uptimeDuration / 1000);

    return `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;
  };

  /**
   * Helper function to get timestamp of the most recent check.
   * @param {Array} checks Array of check objects.
   * @returns {string} Timestamp of the most recent check.
   */
  const getLastCheckedTimestamp = (checks) => {
    if (!checks || checks.length === 0) {
      return 'N/A'; // Handle case when no checks are available
    }

    // Sort checks by createdAt descending to get the most recent check first
    checks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const mostRecentCheck = checks[0];
    return new Date(mostRecentCheck.createdAt).toLocaleString();
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

    // Count checks with status === false
    const incidentCount = checks.filter(check => !check.status).length;
    return incidentCount;
  };

  return (
    <Box>
      {/* Customized Tables Component */}
      <CustomizedTables monitor={monitorData} />

      {/* Uptime duration */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 600,
          fontSize: '13px',
          lineHeight: '20px',
          color: '#344054',
          marginTop: theme.spacing(2),
        }}
      >
        Up for: {calculateUptimeDuration(monitorData.checks)}
      </Typography>

      {/* Last checked */}
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#1570EF',
          marginBottom: theme.spacing(1),
        }}
      >
        Last checked: {getLastCheckedTimestamp(monitorData.checks)}
      </Typography>

      {/* Incidents */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 600,
          fontSize: '13px',
          lineHeight: '20px',
          color: '#344054',
        }}
      >
        Incidents: {countIncidents(monitorData.checks)}
      </Typography>
    </Box>
  );
};

export default DetailsPage;
