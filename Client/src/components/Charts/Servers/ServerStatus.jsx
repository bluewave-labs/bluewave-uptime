import React from "react";
import "./serverStatus.css";
import PropTypes from "prop-types";

const ServerStatus = ({ title, value, state }) => {
  return (
    <div className="server-status-tile">
      <div className="server-status-tile-title">{title}</div>
      <div className={`server-status-tile-value ` + " " + state}>{value}</div>
    </div>
  );
};

ServerStatus.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default ServerStatus;
