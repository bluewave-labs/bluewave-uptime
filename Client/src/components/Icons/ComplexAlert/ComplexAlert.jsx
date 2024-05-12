import "./complexAlert.css";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PropTypes from "prop-types";

/**
 * @component
 * @param {Object} props
 * @param {"red" | "green"} props.theme - The color theme for the alert (required) - must be either "red" or "green"
 * @returns {JSX.Element} - Renders the complex alert component with dynamic color theme
 */
const ComplexAlert = ({ theme }) => {
  if (theme === "red") {
    return (
      <div className="icon-holder-outer-red">
        <div className="icon-holder-inner-red">
          <ErrorOutlineIcon className="icon-core" style={{ fill: "#D92D20" }} />
        </div>
      </div>
    );
  } else if (theme === "green") {
    return (
      <div className="icon-holder-outer-green">
        <div className="icon-holder-inner-green">
          <ErrorOutlineIcon className="icon-core" style={{ fill: "#079455" }} />
        </div>
      </div>
    );
  }
};

ComplexAlert.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default ComplexAlert;
