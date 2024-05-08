import React from "react";
import "./playGround.css";
import Statistic from "../../components/Charts/Statistics/Statistic";
import ServerStatus from "../../components/Charts/Servers/ServerStatus";

function PlayGroundCharts() {
  return (
    <>
      <div className="play-ground-charts">
        <Statistic title="Currently up for" value="4h 30m 2s" />
        <Statistic title="Last checked" value="15 seconds ago" />
        <Statistic title="Incidents" value="2" />
        <Statistic title="Certificate expiry" value="284 days" />
      </div>
      <div className="play-ground-charts-spacing" />
      <div className="play-ground-charts">
        <ServerStatus title="Up" value="4" state="up" />
        <ServerStatus title="Down" value="0" state="down" />
        <ServerStatus title="Paused" value="0" state="pause" />
      </div>
    </>
  );
}

export default PlayGroundCharts;
