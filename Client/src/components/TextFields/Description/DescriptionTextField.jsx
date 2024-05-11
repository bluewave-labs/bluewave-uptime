import React from "react";
import "./descriptionTextField.css";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const DescriptionTextField = ({ hintText, hasError }) => {
  return (
    <div className="description-field-holder">
      <div className="text-field-title">Description</div>
      <TextField
        id="description-field-area"
        error={hasError}
        className="description-field-area"
        multiline
        rows={4}
        placeholder="Enter a description..."
        helperText={hintText}
      />
    </div>
  );
};

DescriptionTextField.propTypes = {
  hintText: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default DescriptionTextField;
