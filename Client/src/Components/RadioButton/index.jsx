/**
 * RadioButton component.
 *
 * @component
 * @example
 * // Usage:
 * <RadioButton
 *   title="Radio Button Title"
 *   desc="Radio Button Description"
 *   size="small"
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the radio button.
 * @param {string} [props.desc] - The description of the radio button.
 * @param {string} [props.size="small"] - The size of the radio button.
 * @returns {JSX.Element} - The rendered RadioButton component.
 */

import { FormControlLabel, Radio } from "@mui/material";
import React from "react";
import "./index.css";
import PropTypes from "prop-types";

function RadioButton(props) {
  return (
    <div className="custom-radio-button">
      <FormControlLabel
        checked={props.checked}
        value={props.value}
        control={<Radio size={props.size} />}
        onChange={props.onChange}
        label={
          <div>
            <div className="service-check-list-title">{props.title}</div>
            <div className="service-check-list-desc">{props.desc}</div>
          </div>
        }
        labelPlacement="end"
      />
    </div>
  );
}

RadioButton.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  size: PropTypes.string,
};

export default RadioButton;
