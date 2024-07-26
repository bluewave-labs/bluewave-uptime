import { Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/**
 * A custom time picker component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed above the time picker.
 * @returns {JSX.Element} - The rendered component.
 */
const Timepicker = ({ title }) => {
  const [value, setValue] = useState(dayjs());

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          defaultValue={dayjs()}
          slotProps={{ textField: { size: "small" } }}
          sx={{
            width: 100,
            marginBottom: "16px",
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default Timepicker;
