import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { ConfigBox } from "./styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import dayjs from "dayjs";

import Select from "../../../Components/Inputs/Select";
import Field from "../../../Components/Inputs/Field";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import CalendarIcon from "../../../assets/icons/calendar.svg?react";
import "./index.css";
import Search from "../../../Components/Inputs/Search";
import { networkService } from "../../../main";

const repeatConfig = [
  { _id: 0, name: "Don't repeat", value: "none" },
  { _id: 1, name: "Repeat daily", value: "daily" },
  { _id: 2, name: "Repeat weekly", value: "weekly" },
];

const durationConfig = [
  { _id: 0, name: "seconds" },
  { _id: 1, name: "minutes" },
  { _id: 2, name: "hours" },
  { _id: 3, name: "days" },
];

const getValueById = (config, id) => {
  const item = config.find((config) => config._id === id);
  return item ? (item.value ? item.value : item.name) : null;
};

const getIdByValue = (config, name) => {
  const item = config.find((config) => {
    if (config.value) return config.value === name;
    else return config.name === name;
  });
  return item ? item._id : null;
};

const CreateMaintenance = () => {
  const theme = useTheme();
  const { user, authToken } = useSelector((state) => state.auth);
  const [monitors, setMonitors] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    repeat: "none",
    startDate: dayjs().toISOString(),
    startTime: dayjs().toISOString(),
    duration: "",
    durationUnit: "seconds",
    name: "",
    monitors: [],
  });

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

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleSelectMonitors = (monitors) => {
    setForm({ ...form, monitors });
  };

  const handleFormChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleTimeChange = (key, newTime) => {
    setForm({ ...form, [key]: newTime });
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
              id="maintenance-repeat"
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
                  disablePast
                  disableHighlightToday
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
                    handleTimeChange("startDate", newDate.toISOString());
                  }}
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
                  id="maintenance-start-time"
                  value={dayjs(form.startTime)}
                  onChange={(newTime) => {
                    handleTimeChange("startTime", newTime.toISOString());
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
                id="maintenance-duration"
                value={form.duration}
                onChange={(event) => {
                  handleFormChange("duration", event.target.value);
                }}
              />
              <Select
                id="maintenance-unit"
                value={getIdByValue(durationConfig, form.durationUnit)}
                items={durationConfig}
                onChange={(event) => {
                  handleFormChange(
                    "durationUnit",
                    getValueById(durationConfig, event.target.value)
                  );
                }}
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
                  id="maintenance-name"
                  placeholder="Maintenance at __ : __ for ___ minutes"
                  value={form.name}
                  onChange={(event) => {
                    handleFormChange("name", event.target.value);
                  }}
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
                  multiple={true}
                  isAdorned={false}
                  options={monitors ? monitors : []}
                  filteredBy="name"
                  secondaryLabel={"type"}
                  value={search}
                  handleInputChange={handleSearch}
                  handleChange={handleSelectMonitors}
                />
              </Box>
            </Stack>
          </ConfigBox>
        </Box>
        <Box ml="auto" display="inline-block">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log("disabled")}
            sx={{ mr: theme.spacing(6) }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log(form)}
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
