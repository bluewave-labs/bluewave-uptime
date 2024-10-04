import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { ConfigBox } from "./styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { maintenanceWindowValidation } from "../../../Validation/validation";
import dayjs from "dayjs";
import Select from "../../../Components/Inputs/Select";
import Field from "../../../Components/Inputs/Field";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import CalendarIcon from "../../../assets/icons/calendar.svg?react";
import "./index.css";
import Search from "../../../Components/Inputs/Search";
import { networkService } from "../../../main";
import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
} from "../../../Utils/timeUtils";
import { createToast } from "../../../Utils/toastUtils";
import { useNavigate } from "react-router-dom";

const MS_LOOKUP = {
  seconds: MS_PER_SECOND,
  minutes: MS_PER_MINUTE,
  hours: MS_PER_HOUR,
  days: MS_PER_DAY,
};

const REPEAT_LOOKUP = {
  none: 0,
  daily: MS_PER_DAY,
  weekly: MS_PER_DAY * 7,
};

const repeatConfig = [
  { _id: 0, name: "Don't repeat", value: "none" },
  {
    _id: 1,
    name: "Repeat daily",
    value: "daily",
  },
  { _id: 2, name: "Repeat weekly", value: "weekly" },
];

const durationConfig = [
  { _id: 0, name: "seconds" },
  { _id: 1, name: "minutes" },
  { _id: 2, name: "hours" },
  {
    _id: 3,
    name: "days",
  },
];

const getValueById = (config, id) => {
  const item = config.find((config) => config._id === id);
  return item ? (item.value ? item.value : item.name) : null;
};

const getIdByValue = (config, name) => {
  const item = config.find((config) => {
    if (config.value) {
      return config.value === name;
    } else {
      return config.name === name;
    }
  });
  return item ? item._id : null;
};

const CreateMaintenance = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, authToken } = useSelector((state) => state.auth);
  const [monitors, setMonitors] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    repeat: "none",
    startDate: dayjs(),
    startTime: dayjs(),
    duration: "",
    durationUnit: "seconds",
    name: "",
    monitors: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchMonitors = async () => {
      const response = await networkService.getMonitorsByTeamId({
        authToken: authToken,
        teamId: user.teamId,
        limit: -1,
        types: ["http", "ping", "pagespeed"],
      });
      setMonitors(response.data.data.monitors);
    };
    fetchMonitors();
  }, [authToken, user]);

  const buildErrors = (prev, id, error) => {
    const updatedErrors = { ...prev };
    if (error) {
      updatedErrors[id] = error.details[0].message;
    } else {
      delete updatedErrors[id];
    }
    return updatedErrors;
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleSelectMonitors = (monitors) => {
    setForm({ ...form, monitors });
    const { error } = maintenanceWindowValidation.validate(
      { monitors },
      { abortEarly: false }
    );
    setErrors((prev) => {
      return buildErrors(prev, "monitors", error);
    });
  };

  const handleFormChange = (key, value) => {
    setForm({ ...form, [key]: value });
    const { error } = maintenanceWindowValidation.validate(
      { [key]: value },
      { abortEarly: false }
    );
    setErrors((prev) => {
      return buildErrors(prev, key, error);
    });
  };

  const handleTimeChange = (key, newTime) => {
    setForm({ ...form, [key]: newTime });
    const { error } = maintenanceWindowValidation.validate(
      { [key]: newTime },
      { abortEarly: false }
    );
    setErrors((prev) => {
      return buildErrors(prev, key, error);
    });
  };

  const handleSubmit = async () => {
    const { error } = maintenanceWindowValidation.validate(form, {
      abortEarly: false,
    });

    // If errors, return early
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      console.log(error);
      return;
    }
    // Build timestamp for maintenance window from startDate and startTime
    const start = dayjs(form.startDate);
    start
      .set("hour", form.startTime.hour())
      .set("minute", form.startTime.minute())
      .set("second", form.startTime.second())
      .set("millisecond", form.startTime.millisecond());

    // Build end timestamp for maintenance window
    const MS_MULTIPLIER = MS_LOOKUP[form.durationUnit];
    const durationInMs = form.duration * MS_MULTIPLIER;
    const end = start.add(durationInMs);

    // Get repeat value in milliseconds
    const repeat = REPEAT_LOOKUP[form.repeat];

    const submit = {
      monitors: form.monitors.map((monitor) => monitor._id),
      name: form.name,
      start: start.toISOString(),
      end: end.toISOString(),
      repeat,
    };

    if (repeat === 0) {
      submit.expiry = end;
    }

    try {
      await networkService.createMaintenanceWindow({
        authToken: authToken,
        maintenanceWindow: submit,
      });

      createToast({
        body: "Successfully created maintenance window",
      });
      navigate("/maintenance");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="create-maintenance">
      <Breadcrumbs
        list={[
          { name: "maintenance", path: "/maintenance" },
          { name: "create", path: `/maintenance/create` },
        ]}
      />
      <Stack
        component="form"
        noValidate
        spellCheck="false"
        gap={theme.spacing(12)}
        mt={theme.spacing(6)}
      >
        <Box>
          <Typography component="h1" variant="h1">
            <Typography component="span" fontSize="inherit">
              Create a{" "}
            </Typography>
            <Typography
              component="span"
              variant="h2"
              fontSize="inherit"
              fontWeight="inherit"
            >
              maintenance{" "}
            </Typography>
            <Typography component="span" fontSize="inherit">
              window
            </Typography>
          </Typography>
          <Typography component="h2" variant="body2" fontSize={14}>
            Your pings won&apos;t be sent during this time frame
          </Typography>
        </Box>
        <ConfigBox direction="row">
          <Typography component="h2" variant="h2">
            General Settings
          </Typography>
          <Box
            px={theme.spacing(14)}
            borderLeft={1}
            borderLeftColor={theme.palette.border.light}
          >
            <Select
              id="repeat"
              name="maintenance-repeat"
              label="Maintenance Repeat"
              value={getIdByValue(repeatConfig, form.repeat)}
              onChange={(event) => {
                handleFormChange(
                  "repeat",
                  getValueById(repeatConfig, event.target.value)
                );
              }}
              items={repeatConfig}
            />
            <Stack gap={theme.spacing(2)} mt={theme.spacing(16)}>
              <Typography component="h3">Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="startDate"
                  disablePast
                  disableHighlightToday
                  value={form.startDate}
                  slots={{ openPickerIcon: CalendarIcon }}
                  slotProps={{
                    switchViewButton: { sx: { display: "none" } },
                    nextIconButton: { sx: { ml: theme.spacing(2) } },
                    field: {
                      sx: {
                        width: "fit-content",
                        "& > .MuiOutlinedInput-root": {
                          flexDirection: "row-reverse",
                        },
                        "& input": {
                          height: 34,
                          p: 0,
                          pr: theme.spacing(5),
                        },
                        "& fieldset": {
                          borderColor: theme.palette.border.dark,
                          borderRadius: theme.shape.borderRadius,
                        },
                        "&:not(:has(.Mui-disabled)):not(:has(.Mui-error)) .MuiOutlinedInput-root:not(:has(input:focus)):hover fieldset":
                          {
                            borderColor: theme.palette.border.dark,
                          },
                      },
                    },
                    inputAdornment: { sx: { ml: 0, px: 3 } },
                    openPickerButton: {
                      sx: {
                        py: 0,
                        mr: 0,
                        "& path": {
                          stroke: theme.palette.other.icon,
                          strokeWidth: 1.1,
                        },
                        "&:hover": { backgroundColor: "transparent" },
                      },
                    },
                  }}
                  sx={{}}
                  onChange={(newDate) => {
                    handleTimeChange("startDate", newDate);
                  }}
                  error={errors["startDate"]}
                />
              </LocalizationProvider>
            </Stack>
          </Box>
        </ConfigBox>
        <ConfigBox>
          <Stack direction="row">
            <Box>
              <Typography component="h2" variant="h2">
                Start time
              </Typography>
              <Typography>
                All dates and times are in GMT+0 time zone.
              </Typography>
            </Box>
            <Stack direction="row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  id="startTime"
                  value={form.startTime}
                  onChange={(newTime) => {
                    handleTimeChange("startTime", newTime);
                  }}
                  slotProps={{
                    nextIconButton: { sx: { ml: theme.spacing(2) } },
                    field: {
                      sx: {
                        width: "fit-content",
                        "& > .MuiOutlinedInput-root": {
                          flexDirection: "row-reverse",
                        },
                        "& input": {
                          height: 34,
                          p: 0,
                          pl: theme.spacing(5),
                        },
                        "& fieldset": {
                          borderColor: theme.palette.border.dark,
                          borderRadius: theme.shape.borderRadius,
                        },
                        "&:not(:has(.Mui-disabled)):not(:has(.Mui-error)) .MuiOutlinedInput-root:not(:has(input:focus)):hover fieldset":
                          {
                            borderColor: theme.palette.border.dark,
                          },
                      },
                    },
                  }}
                  error={errors["startTime"]}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Box>
              <Typography component="h2" variant="h2">
                Duration
              </Typography>
            </Box>
            <Stack direction="row" spacing={theme.spacing(8)}>
              <Field
                type="number"
                id="duration"
                value={form.duration}
                onChange={(event) => {
                  handleFormChange("duration", event.target.value);
                }}
                error={errors["duration"]}
              />
              <Select
                id="durationUnit"
                value={getIdByValue(durationConfig, form.durationUnit)}
                items={durationConfig}
                onChange={(event) => {
                  handleFormChange(
                    "durationUnit",
                    getValueById(durationConfig, event.target.value)
                  );
                }}
                error={errors["durationUnit"]}
              />
            </Stack>
          </Stack>
        </ConfigBox>
        <Box>
          <Typography
            component="h2"
            variant="h2"
            fontSize={16}
            my={theme.spacing(6)}
          >
            Monitor related settings
          </Typography>
          <ConfigBox>
            <Stack direction="row">
              <Box>
                <Typography component="h2" variant="h2">
                  Friendly name
                </Typography>
              </Box>
              <Box>
                <Field
                  id="name"
                  placeholder="Maintenance at __ : __ for ___ minutes"
                  value={form.name}
                  onChange={(event) => {
                    handleFormChange("name", event.target.value);
                  }}
                  error={errors["name"]}
                />
              </Box>
            </Stack>
            <Stack direction="row">
              <Box>
                <Typography component="h2" variant="h2">
                  Add monitors
                </Typography>
              </Box>
              <Box>
                <Search
                  id={"monitors"}
                  multiple={true}
                  isAdorned={false}
                  options={monitors ? monitors : []}
                  filteredBy="name"
                  secondaryLabel={"type"}
                  value={search}
                  handleInputChange={handleSearch}
                  handleChange={handleSelectMonitors}
                  error={errors["monitors"]}
                />
              </Box>
            </Stack>
          </ConfigBox>
        </Box>
        <Box ml="auto" display="inline-block">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/maintenance")}
            sx={{ mr: theme.spacing(6) }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={false}
          >
            Create maintenance
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateMaintenance;
