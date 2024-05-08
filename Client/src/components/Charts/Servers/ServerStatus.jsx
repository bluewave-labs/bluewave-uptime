import React from "react";
import "./serverStatus.css";

function ServerStatus({ title, value, state }) {
  return (
    <div className="server-status-tile">
      <div className="server-status-tile-title">{title}</div>
      <div className={`server-status-tile-value ` + " " + state}>{value}</div>
    </div>
  );
}

export default ServerStatus;
