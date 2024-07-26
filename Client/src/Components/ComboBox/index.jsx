import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

const ComboOptions = ["Don't repeat", "Repeat daily", "Repeat weekly"];

/**
 * ComboBox component for selecting options from a dropdown menu.
 *
 * @component
 * @example
 * // Usage:
 * // <ComboBox subject="Select an option" comboOptions={["Option 1", "Option 2", "Option 3"]} />
 *
 * @param {Object} props - The component props.
 * @param {string} props.subject - The subject of the ComboBox.
 * @param {Array} [props.comboOptions] - The options to be displayed in the ComboBox dropdown menu.
 * @returns {JSX.Element} The rendered ComboBox component.
 */
const ComboBox = ({ subject, comboOptions = ComboOptions }) => {
  const [value, setValue] = useState("Don't repeat");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {subject && (
        <Typography
          style={{
            color: "var(--env-var-color-31)",
            fontSize: "var(--env-var-font-size-medium)",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {subject}
        </Typography>
      )}

      <FormControl size="small" sx={{ width: 320, marginBottom: "16px" }}>
        <Select
          value={value}
          onChange={handleChange}
          style={{
            fontSize: "var(--env-var-font-size-medium)",
            fontWeight: 400,
          }}
        >
          {comboOptions.map((value, index) => (
            <MenuItem
              style={{
                fontSize: "var(--env-var-font-size-medium)",
                fontWeight: 400,
                margin: "2px 6px",
                borderRadius: "6px",
              }}
              value={value}
              key={index}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

ComboBox.propTypes = {
  subject: PropTypes.string,
  comboOptions: PropTypes.array,
};

export default ComboBox;
