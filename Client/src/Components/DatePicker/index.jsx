import { Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

/**
 * A custom date picker component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed above the date picker.
 * @returns {JSX.Element} The rendered Datepicker component.
 */
const Datepicker = ({ title }) => {
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
        <DatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{ textField: { size: "small" } }}
          sx={{
            width: 129,
            marginBottom: "16px",
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default Datepicker;
