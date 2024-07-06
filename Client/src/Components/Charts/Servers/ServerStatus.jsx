import React from "react";
import "./serverStatus.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {string} props.title - The title text for the server status (required)
 * @param {number} props.value - The value text to be displayed (required)
 * @param {string} props.state - The state of the server (e.g., "online", "offline", "warning") (required)
 * @returns {JSX.Element} - Renders the server status component
 */
const ServerStatus = ({ title, value, state }) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  return (
    <div className="server-status-tile" style={{ fontFamily: fontFamily }}>
      <div className="server-status-tile-title">{title}</div>
      <div className={`server-status-tile-value ` + " " + state}>{value}</div>
    </div>
  );
};

ServerStatus.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default ServerStatus;
