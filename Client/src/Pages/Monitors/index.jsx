import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import CurrentMonitors from "../../Components/CurrentMonitors";
import "./index.css";
import React from "react";

const Monitors = () => {
  return (
    <div className="monitors">
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-bar">
        <div className="monitors-bar-title">Hello, Jackie</div>
        <Button
          level="primary"
          label="Create new monitor"
          sx={{ padding: "10px 20px", fontSize: "13px" }}
        />
      </div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-stats">
        <ServerStatus title="Up" value="4" state="up" />
        <ServerStatus title="Down" value="0" state="down" />
        <ServerStatus title="Paused" value="0" state="pause" />
      </div>
      <div className="monitors-gaps-medium"></div>
      <CurrentMonitors />
    </div>
  );
};

export default Monitors;
