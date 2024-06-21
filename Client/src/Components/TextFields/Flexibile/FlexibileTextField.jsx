import "./flexibileTextField.css";
import React from "react";

const FlexibileTextField = ({ title, type, placeholder }) => {
  return (
    <div className="flexibile-textfield">
      <div className="flexibile-textfield-title">{title}</div>
      <input
        type={type}
        className="flexibile-textfield-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FlexibileTextField;
