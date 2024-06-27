import "./index.css";
import React from "react";

const ConfigBox = ({ leftLayout, rightLayout }) => {
  return (
    <div className="config-box">
      {leftLayout}
      {rightLayout}
    </div>
  );
};

export default ConfigBox;
