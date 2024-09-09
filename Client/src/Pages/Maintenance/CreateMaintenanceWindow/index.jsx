import { Box, Button, Stack, Typography } from "@mui/material";
import "./index.css";
import { useEffect, useState } from "react";
import Back from "../../../assets/icons/left-arrow-long.svg?react";
import Select from "../../../Components/Inputs/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Field from "../../../Components/Inputs/Field";
import { maintenanceWindowValidation } from "../../../Validation/validation";
import { logger } from "../../../Utils/Logger";
import { createToast } from "../../../Utils/toastUtils";
import { useTheme } from "@emotion/react";
import AutoCompleteField from "../../../Components/Inputs/Autocomplete";
import { useSelector } from "react-redux";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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
          fontSize: 13,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          style={{
            fontSize: 11,
          }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
};

const durationOptions = [
  { _id: "minutes", name: "minutes" },
  { _id: "hours", name: "hours" },
  { _id: "days", name: "days" },
];

const CreateNewMaintenanceWindow = () => {
  const theme = useTheme();
  const monitorState = useSelector((state) => state.uptimeMonitors);
  const [monitorOptions, setMonitorOptions] = useState([]);

  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const [autoCompleteInputValue, setAutoCompleteInputValue] = useState("");

  useEffect(() => {
    setMonitorOptions(monitorState.monitors);
    console.log("monitorState.monitors -->", monitorState.monitors);
  }, []);

  const [values, setValues] = useState({
    repeat: 1,
    date: dayjs(),
    startTime: dayjs(),
    duration: "60",
    unit: "minutes",
    displayName: "",
    AddMonitors: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event, name) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      repeat: values.repeat,
      date: values.date.utc().format("YYYY-MM-DD"),
      startTime: values.startTime.utc().format("HH:mm"),
      duration: values.duration,
      unit: values.unit,
      displayName: values.displayName,
      addMonitors: autoCompleteValue.name,
      monitorId: autoCompleteValue._id,
    };

    const { error } = maintenanceWindowValidation.validate(data, {
      abortEarly: false,
    });

    if (error && error.details.length > 0) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      createToast({
        body: error.details[0].message,
      });
      logger.error("Validation errors:", error.details);
    } else {
      setErrors({});
      logger.log("Submitting data: ", data);
      // Add your data submission logic here
    }
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
        <Stack
          className="duration-config"
          gap={theme.spacing(5)}
          direction="row"
        >
          <Field
            id="duration-value"
            placeholder="60"
            onChange={(e) => handleChange(e, "duration")}
            value={values.duration}
            error={errors.duration}
            type="number"
          />
          <Select
            onChange={(e) => handleChange(e, "unit")}
            id="duration-unit"
            items={durationOptions}
            value={values.unit}
          />
        </Stack>
      ),
    },
    {
      title: "Display name",
      component: (
        <Field
          id="display-name"
          placeholder="Maintanence at __ : __ for ___ minutes"
          value={values.displayName}
          onChange={(e) => handleChange(e, "displayName")}
          error={errors.displayName}
        />
      ),
    },
    {
      title: "Add monitors",
      component: (
        <Stack
          className="add-monitors-fields"
          sx={{ width: "60%", maxWidth: 380 }}
          gap={theme.spacing(5)}
        >
          <AutoCompleteField
            sx={{ marginLeft: "auto" }}
            options={monitorOptions}
            width={380}
            autoCompleteValue={autoCompleteValue}
            setAutoCompleteValue={setAutoCompleteValue}
            autoCompleteInputValue={autoCompleteInputValue}
            setAutoCompleteInputValue={setAutoCompleteInputValue}
            error={errors.addMonitors}
          />
          <Typography
            sx={{
              width: "fit-content",
              fontSize: 11,
              borderBottom: `1px dashed ${theme.palette.primary.main}`,
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
      <Stack gap={theme.spacing(10)}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: 100,
            height: 30,
            gap: "10px",
          }}
        >
          <Back />
          Back
        </Button>
        <Box>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: theme.palette.text.secondary,
            }}
          >
            {directory.title}
          </Typography>

          <Typography sx={{ fontSize: 13 }}>{directory.description}</Typography>
        </Box>
        <Stack
          className="maintenance-options"
          gap={theme.spacing(20)}
          paddingY={theme.spacing(15)}
          paddingX={theme.spacing(20)}
          sx={{
            border: 1,
            borderColor: theme.palette.border.light,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.main,
            color: theme.palette.info.text,
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
          <Button
            variant="text"
            color="info"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default CreateNewMaintenanceWindow;
