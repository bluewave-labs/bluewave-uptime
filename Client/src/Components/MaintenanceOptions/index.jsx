import { Box, Stack, Typography } from "@mui/material";
import "./index.css";
import React, { useState } from "react";
import Close from "../../assets/icons/close.svg?react";
import Select from "../Inputs/Select";

const directory = {
  title: "Create a maintenance window",
  description: "Your pings won’t be sent in this time frame.",
};

const repeatOptions = [
  { name: "Don't repeat", _id: 1 },
  { name: "Repeat daily", _id: 2 },
  { name: "Repeat weekly", _id: 3 },
];

const MaintenanceOptions = () => {
  const [values, setValues] = useState({
    repeat: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };

  return (
    <div style={{ width: 420 }} className="maintenance-options">
      <Box display="grid" gap={3} paddingY={3} paddingX={4}>
        <Stack position="relative">
          <Close alt="Close Icon" />
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
        </Stack>
        <Stack className="maintenance-options-repeats">
          <Select
            onChange={(e) => handleChange(e)}
            label="Repeat"
            id="repeat-mode"
            items={repeatOptions}
            value={values.repeat}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default MaintenanceOptions;
