import React from "react";

function HostStatus(backgroundColor, status, dotColor) {
  return (
    <div
      className="host-status-box"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className="host-status-box-circle"
        style={{ backgroundColor: dotColor }}
      ></div>
      <div className="host-status-box-text">{status}</div>
    </div>
  );
}

export default HostStatus;
