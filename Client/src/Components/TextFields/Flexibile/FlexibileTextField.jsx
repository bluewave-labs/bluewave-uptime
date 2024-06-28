import "./flexibileTextField.css";
import React from "react";

const FlexibileTextField = ({
  id,
  title,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flexibile-textfield">
      <div className="flexibile-textfield-title">{title}</div>
      <input
        id={id}
        type={type}
        className="flexibile-textfield-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FlexibileTextField;
