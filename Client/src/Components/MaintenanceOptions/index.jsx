import { Box, Typography } from "@mui/material";
import "./index.css";
import React from "react";
import Close from "../../assets/icons/close.svg?react";
import ComboBox from "../ComboBox";
import Datepicker from "../DatePicker";
import Timepicker from "../TimePicker";
import Duration from "../Duration";
import Field from "../Inputs/Field";
import Button from "../Button";

export const MaintenanceOptions = () => {
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
        value=""
        onChange={() => console.log("Friendly name")}
        label="Friendly name"
        placeholder="Maintanence at __ : __ for ___ minutes"
      />
      <Field
        id="add-monitor"
        value=""
        onChange={() => console.log("Add monitors")}
        label="Add monitors"
        placeholder="Start typing to search for current monitors"
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
