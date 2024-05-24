import "./backgroundPattern.css";
import React from "react";
import Pattern from "../../assets/Images/background_pattern_decorative.png";

const BackgroundPattern = () => {
  return <img className="background-pattern" src={Pattern} alt="Pattern" />;
};

export default BackgroundPattern;
