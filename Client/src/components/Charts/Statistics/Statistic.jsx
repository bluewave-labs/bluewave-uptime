import React from "react";
import "./statistic.css";
import PropTypes from "prop-types";

const Statistic = ({ title, value }) => {
  return (
    <div className="statistic-tile">
      <div className="statistic-tile-title">{title}</div>
      <div className="statistic-tile-value">{value}</div>
    </div>
  );
};

Statistic.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Statistic;
