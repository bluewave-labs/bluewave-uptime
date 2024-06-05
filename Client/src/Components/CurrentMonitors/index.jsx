import "./index.css";
import React from "react";

const CurrentMonitors = () => {
  return (
    <div className="current-monitors">
      <div className="current-monitors-bar">
        <div className="current-monitors-title-holder">
          <div className="current-monitors-title">Current monitors</div>
          <div className="current-monitors-counter">5</div>
        </div>
        <div className="current-monitors-search-bar"></div>
      </div>
    </div>
  );
};

export default CurrentMonitors;
