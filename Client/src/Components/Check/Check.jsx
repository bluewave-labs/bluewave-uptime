import "./check.css";
import React from "react";
import CheckGrey from "../../assets/Images/Check-icon-grey.png";

const Check = ({ text }) => {
  return (
    <div className="check">
      <img className="check-icon" src={CheckGrey} alt="un-checked" />
      <div className="check-h-spacing" />
      <label className="check-label">{text}</label>
    </div>
  );
};

export default Check;
