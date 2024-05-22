import React from "react";
import "./Checkbox.css";

const CheckBox = () => {
  return (
    <div className="checkbox-holder">
      <input className="checkbox" type="checkbox" id="checkbox" />
      <label className="checkbox-label">Remember for 30 days</label>
    </div>
  );
};

export default CheckBox;
