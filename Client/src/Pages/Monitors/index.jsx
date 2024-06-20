// import CreateNewMonitor from "./CreateNewMonitor";
import CurrentStats from "./CurrentStats";
import "./index.css";
import React from "react";

const Monitors = () => {
  return (
    <div className="monitors">
      <CurrentStats />
      {/* <CreateNewMonitor /> */}
    </div>
  );
};

export default Monitors;
