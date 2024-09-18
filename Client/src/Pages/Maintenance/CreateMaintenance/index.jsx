import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { maintenanceWindowValidation } from "../../../Validation/validation";
import { logger } from "../../../Utils/Logger";
import { createToast } from "../../../Utils/toastUtils";
import Select from "../../../Components/Inputs/Select";
import dayjs from "dayjs";
import Field from "../../../Components/Inputs/Field";
import "./index.css";

const CreateMaintenance = () => {
  const theme = useTheme();

  return <Box className="create-maintenance"></Box>;
};

export default CreateMaintenance;
