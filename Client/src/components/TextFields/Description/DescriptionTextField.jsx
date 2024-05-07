import React from "react";
import "./descriptionTextField.css";
import { TextField } from "@mui/material";

function DescriptionTextField({ hintText, hasError }) {
  return (
    <div className="description-field-holder">
      <div className="text-field-title">Website</div>
      <TextField
        error={hasError}
        className="description-field-area"
        multiline
        rows={4}
        placeholder="Enter a description..."
        helperText={hintText}
      />
    </div>
  );
}

export default DescriptionTextField;
