import "./check.css";
import React from "react";
import CheckGrey from "../../assets/Images/Check-icon-grey.png";

/**
 * `Check` is a functional React component that displays a check icon and a label.
 *
 * @component
 * @param {Object} props - The properties that define the `Check` component.
 * @param {string} props.text - The text to be displayed as the label next to the check icon.
 *
 * @example
 * // To use this component, import it and use it in your JSX like this:
 * <Check text="Your Text Here" />
 *
 * @returns {React.Element} The `Check` component with a check icon and a label, defined by the `text` prop.
 */
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
