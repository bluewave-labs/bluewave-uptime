import React from "react";
import "./Checkbox.css";
import PropsTypes from "prop-types";

const CustomizableCheckbox = (props) => {
  return (
    <div className="checkbox-holder">
      <input
        checked={props.isChecked}
        onChange={props.handleChange}
        className="custom-checkbox"
        type="checkbox"
        id="checkbox"
      />
      <label className="custom-checkbox-label">{props.title}</label>
    </div>
  );
};

CustomizableCheckbox.propsTypes = {
  title: PropsTypes.string.isRequired,
};

export default CustomizableCheckbox;
