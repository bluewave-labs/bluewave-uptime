import { Box, Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import Close from "../../assets/icons/close.svg?react";
import ComboBox from "../ComboBox";
import Datepicker from "../DatePicker";
import Timepicker from "../TimePicker";
import Duration from "../Duration";
import Field from "../Inputs/Field";
import Button from "../Button";

export const MaintenanceOptions = () => {
  const [repeat, setRepeat] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [friendlyName, setFriendlyName] = useState("");
  const [addMonitor, setAddMonitor] = useState("");

  const handleRepeat = (value) => {
    setRepeat(value);
  };

  const handleDate = (value) => {
    setDate(value);
  };

  const handleStartTime = (value) => {
    setStartTime(value);
  };

  const handleDuration = (value) => {
    setDuration(value);
  };

  const handleFriendlyName = (value) => {
    setFriendlyName(value);
  };

  const handleAddMonitor = (value) => {
    setAddMonitor(value);
  };

  return (
    <Box
      width={347}
      paddingY={3}
      paddingX={4}
      boxShadow="0 8px 8px -4px #10182830;"
      borderRadius="4px"
    >
      <div className="box-header">
        <div className="box-header-text">
          <Typography
            style={{
              fontSize: "var(--env-var-font-size-large)",
              fontWeight: "600",
              color: "var(--env-var-color-5)",
            }}
          >
            Create a maintenance window
          </Typography>
          <Typography style={{ fontSize: "var(--env-var-font-size-medium)" }}>
            Your pings won’t be sent in this time frame.
          </Typography>
        </div>
        <Close id="box-close-icon" alt="Close Icon" />
      </div>
      <ComboBox subject="Repeat" />
      <Datepicker title="Date" />
      <Timepicker title="Start time" />
      <Duration title="Duration" />
      <Field
        id="friendly-name"
        value={friendlyName}
        label="Friendly name"
        placeholder="Maintanence at __ : __ for ___ minutes"
        onChange={(e) => handleFriendlyName(e.target.value)}
      />
      <Field
        id="add-monitor"
        className="add-monitor"
        value={addMonitor}
        label="Add monitors"
        placeholder="Start typing to search for current monitors"
        onChange={(e) => handleAddMonitor(e.target.value)}
      />
      <div className="box-actions">
        <Button
          level="tertiary"
          label="Cancel"
          sx={{ width: "108px", height: "34px" }}
          onClick={() => console.log("Cancel")}
        />
        <Button
          level="primary"
          label="Create"
          sx={{ width: "108px", height: "34px" }}
          onClick={() => console.log("Create")}
        />
      </div>
    </Box>
  );
};
