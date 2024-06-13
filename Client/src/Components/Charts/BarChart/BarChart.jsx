import React from "react";
import "./barChart.css";

const BarChart = () => {
  const data = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 100)
  );

  return (
    <div className="bar-chart">
      {data.map((value, index) => (
        <div
          key={index}
          className={`bar ${index < 6 ? "green" : "red"}`}
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  );
};

export default BarChart;
