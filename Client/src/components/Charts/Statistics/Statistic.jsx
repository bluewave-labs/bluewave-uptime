import React from "react";
import "./statistic.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {string} props.title - The title text for the statistic (required)
 * @param {string} props.value - The numerical or textual value for the statistic (required)
 * @returns {JSX.Element} - Renders the statistic component
 */
const Statistic = ({ title, value }) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  return (
    <div className="statistic-tile" style={{ fontFamily: fontFamily }}>
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
