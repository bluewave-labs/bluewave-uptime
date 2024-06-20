import React from "react";
import "./barChart.css";

const BarChart = ({ checks }) => {
  return (
    <div className="bar-chart">
      {checks.map((value, index) => (
        <div
          key={index}
          className={`bar ${value.status ? "green" : "red"}`}
          style={{ height: `${value.responseTime / 3}%` }}
        />
      ))}
    </div>
  );
};

export default BarChart;
