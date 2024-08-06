import { Box, Stack, Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import Button from "../../../Components/Button";
import Back from "../../../assets/icons/left-arrow.svg?react";
import Select from "../../../Components/Inputs/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Field from "../../../Components/Inputs/Field";

const directory = {
  title: "Create a maintenance window",
  description: "Your pings won’t be sent in this time frame.",
};

const repeatOptions = [
  { _id: 1, name: "Don't repeat" },
  { _id: 2, name: "Repeat daily" },
  { _id: 3, name: "Repeat weekly" },
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

const timeFrames = [
  { _id: 1, name: "seconds" },
  { _id: 2, name: "minutes" },
  { _id: 3, name: "hours" },
  { _id: 4, name: "days" },
];

const sxButtons = {
  width: 110,
  height: 34,
};

const CreateNewMaintenanceWindow = () => {
  const [values, setValues] = useState({
    repeat: 1,
    date: dayjs(),
    startTime: dayjs(),
    duration: "60",
    unit: "minutes",
    friendlyName: "",
    AddMonitors: "",
  });

  const handleChange = (event, name) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const configOptions = [
    {
      title: "Repeat",
      component: (
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
      component: (
        <LocalizationProvider
          className="date-localization-provider"
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            className="date-picker"
            defaultValue={values.date}
            onChange={(date) =>
              handleChange({ target: { value: date } }, "date")
            }
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Start time",
      description: "Your pings won’t be sent in this time frame.",
      component: (
        <LocalizationProvider
          className="time-localization-provider"
          dateAdapter={AdapterDayjs}
        >
          <MobileTimePicker
            className="time-picker"
            defaultValue={values.startTime}
            onChange={(time) =>
              handleChange({ target: { value: time } }, "startTime")
            }
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Duration",
      component: (
        <Stack className="duration-config" gap={2} direction="row">
          <Field
            id="duration-value"
            placeholder="60"
            onChange={(e) => handleChange(e, "duration")}
            value={values.duration}
          />
          <Select
            onChange={(e) => handleChange(e, "unit")}
            id="duration-unit"
            items={timeFrames}
            value={values.unit}
          />
        </Stack>
      ),
    },
    {
      title: "Friendly name",
      component: (
        <Field
          id="friendly-name"
          placeholder="Maintanence at __ : __ for ___ minutes"
          value={values.friendlyName}
          onChange={(e) => handleChange(e, "friendlyName")}
        />
      ),
    },
    {
      title: "Add monitors",
      component: (
        <Stack
          className="add-monitors-fields"
          sx={{ width: "60%", maxWidth: "380px" }}
          gap={2}
        >
          <Field
            id="add-monitors"
            placeholder="Start typing to search for current monitors"
            value={values.AddMonitors}
            onChange={(e) => handleChange(e, "AddMonitors")}
          />
          <Typography
            sx={{
              width: "fit-content",
              fontSize: "var(--env-var-font-size-small)",
              borderBottom: "1px dashed var(--env-var-color-3)",
              paddingBottom: "4px",
            }}
          >
            Add all monitors to this maintenance window
          </Typography>
        </Stack>
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
          className="maintenance-options"
          gap={5}
          paddingY={4}
          paddingX={8}
          paddingBottom={10}
          sx={{
            border: "1px solid var(--env-var-color-16)",
            borderRadius: "var(--env-var-radius-1)",
          }}
        >
          {configOptions.map((item, index) => (
            <Stack key={index} display="-webkit-inline-box">
              {item.title && configOptionTitle(item.title, item.description)}
              {item.component && item.component}
            </Stack>
          ))}
        </Stack>
        <Stack justifyContent="end" direction="row" marginTop={3}>
          <Button sx={sxButtons} level="tertiary" label="Cancel" />
          <Button sx={sxButtons} level="primary" label="Create" />
        </Stack>
      </Stack>
    </div>
  );
};

export default CreateNewMaintenanceWindow;
