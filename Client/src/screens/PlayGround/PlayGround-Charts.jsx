import React from "react";
import "./playGround.css";
import Statistic from "../../components/Charts/Statistics/Statistic";

function PlayGroundCharts() {
  return (
    <>
      <div className="play-ground-charts">
        <Statistic title="Currently up for" value="4h 30m 2s" />
        <Statistic title="Last checked" value="15 seconds ago" />
        <Statistic title="Incidents" value="2" />
        <Statistic title="Certificate expiry" value="284 days" />
      </div>
    </>
  );
}

export default PlayGroundCharts;
