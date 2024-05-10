import "./complexAlert.css";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ComplexAlert({ theme }) {
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
}

export default ComplexAlert;
