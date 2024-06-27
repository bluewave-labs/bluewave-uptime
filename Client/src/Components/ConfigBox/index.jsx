import "./index.css";
import React from "react";

const ConfigBox = ({ leftLayout, rightLayout }) => {
  return (
    <form className="config-box" noValidate spellCheck="false">
      {leftLayout}
      {rightLayout}
    </form>
  );
};

export default ConfigBox;
