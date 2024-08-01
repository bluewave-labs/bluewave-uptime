import { Box, Stack, Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import Button from "../Button";
import Back from "../../assets/icons/left-arrow.svg?react";
import Select from "../Inputs/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const directory = {
  title: "Create a maintenance window",
  description: "Your pings won’t be sent in this time frame.",
};

const repeatOptions = [
  { name: "Don't repeat", _id: 1 },
  { name: "Repeat daily", _id: 2 },
  { name: "Repeat weekly", _id: 3 },
];

const configOptionTitle = (title, description) => {
  return (
    <Stack width="40%" gap={1}>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "var(--env-var-font-size-medium)",
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          style={{
            fontSize: "var(--env-var-font-size-small)",
          }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
};

const CreateNewMaintenanceWindow = () => {
  const [values, setValues] = useState({
    repeat: 1,
  });

  const handleChange = (event, name) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(values);
  };

  const configOptions = [
    {
      title: "Repeat",
      comopnent: (
        <Select
          onChange={(e) => handleChange(e, "repeat")}
          id="repeat-mode"
          items={repeatOptions}
          value={values.repeat}
        />
      ),
    },
    {
      title: "Date",
      comopnent: (
        <LocalizationProvider
          className="date-localization-provider"
          dateAdapter={AdapterDayjs}
        >
          <DatePicker className="date-picker" defaultValue={dayjs()} />
        </LocalizationProvider>
      ),
    },
    {
      title: "Start time",
      description: "Your pings won’t be sent in this time frame.",
      comopnent: (
        <LocalizationProvider
          className="time-localization-provider"
          dateAdapter={AdapterDayjs}
        >
          <MobileTimePicker className="time-picker" defaultValue={dayjs()} />
        </LocalizationProvider>
      ),
    },
  ];

  return (
    <div className="create-maintenance-window">
      <Stack gap={3}>
        <Button
          id="btn-back"
          sx={{
            width: "100px",
            height: "30px",
            gap: "10px",
            backgroundColor: "var(--env-var-color-32)",
            color: "var(--env-var-color-5)",
          }}
          label="Back"
          level="tertiary"
          img={<Back />}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "var(--env-var-font-size-large)",
              fontWeight: "600",
              color: "var(--env-var-color-5)",
            }}
          >
            {directory.title}
          </Typography>

          <Typography sx={{ fontSize: "var(--env-var-font-size-medium)" }}>
            {directory.description}
          </Typography>
        </Box>
        <Stack
          gap={8}
          paddingY={6}
          paddingX={8}
          sx={{
            border: "1px solid var(--env-var-color-16)",
            borderRadius: "var(--env-var-radius-1)",
          }}
          className="maintenance-options"
        >
          {configOptions.map((item, index) => (
            <Stack
              key={index}
              display="-webkit-inline-box"
              className="maintenance-option-item"
            >
              {configOptionTitle(item.title, item.description)}
              {item.comopnent && item.comopnent}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default CreateNewMaintenanceWindow;
