import React from "react";
import "./statistic.css";

function Statistic({ title, value }) {
  return (
    <div className="statistic-tile">
      <div className="statistic-tile-title">{title}</div>
      <div className="statistic-tile-value">{value}</div>
    </div>
  );
}

export default Statistic;
