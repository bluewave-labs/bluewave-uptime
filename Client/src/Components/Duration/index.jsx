import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./index.css";
import React, { useState } from "react";

const timeFrames = ["minutes", "seconds", "hours"];

/**
 * A component that allows the user to select a duration.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the duration component.
 * @param {string[]} [props.options=timeFrames] - The options for the duration.
 * @returns {JSX.Element} The duration component.
 */
const Duration = ({ title, options = timeFrames }) => {
  const [timeFrame, setTimeFrame] = useState("minutes");

  const handleChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <>
      <Typography
        style={{
          color: "var(--env-var-color-31)",
          fontSize: "var(--env-var-font-size-medium)",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        {title}
      </Typography>
      <div className="duration-controls">
        <TextField
          variant="outlined"
          size="small"
          style={{ width: 69, fontSize: "var(--env-var-font-size-medium)" }}
          onChange={() => console.log("Duration")}
        />
        <FormControl
          variant="outlined"
          size="small"
          style={{ width: 110, fontSize: "var(--env-var-font-size-medium)" }}
        >
          <Select value={timeFrame} onChange={handleChange}>
            {options.map((value, index) => (
              <MenuItem
                style={{
                  fontSize: "var(--env-var-font-size-medium)",
                  fontWeight: 400,
                  margin: "2px 6px",
                  borderRadius: "6px",
                }}
                key={index}
                value={value}
              >
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Duration;
