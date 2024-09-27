import { useTheme } from "@emotion/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import Field from "../../Components/Inputs/Field";
import Link from "../../Components/Link";
import { logger } from "../../Utils/Logger";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import { ConfigBox } from "../Settings/styled";
import { useNavigate } from "react-router";
import { getAppSettings } from "../../Features/Settings/settingsSlice";
import { useEffect, useState } from "react";
import Select from "../../Components/Inputs/Select";
const AdvancedSettings = ({ isAdmin }) => {
  const theme = useTheme();
  const { user, authToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const settings = useSelector((state) => state.settings);
  const [localSettings, setLocalSettings] = useState(settings);

  const logItems = [
    { _id: 1, name: "none" },
    { _id: 2, name: "debug" },
    { _id: 3, name: "error" },
    { _id: 4, name: "warn" },
  ];

  const logItemLookup = {
    none: 1,
    debug: 2,
    error: 3,
    warn: 4,
  };

  const handleLogLevel = (e) => {
    const id = e.target.value;
    const newLogLevel = logItems.find((item) => item._id === id).name;
    setLocalSettings({ ...localSettings, logLevel: newLogLevel });
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    setLocalSettings({ ...localSettings, [id]: value });
  };

  return (
    <Box
      className="settings"
      style={{
        paddingBottom: 0,
      }}
    >
      <Stack
        component="form"
        gap={theme.spacing(12)}
        noValidate
        spellCheck="false"
      >
        \{" "}
        <ConfigBox>
          <Box>
            <Typography component="h1">Client Settings</Typography>
            <Typography sx={{ mt: theme.spacing(2) }}>
              Modify client settings here
            </Typography>
          </Box>
          <Stack gap={theme.spacing(20)}>
            <Field
              id="clientHost"
              label="Client Host"
              value={localSettings.clientHost}
              onChange={handleChange}
            />
            <Select
              id="logLevel"
              label="logLevel"
              name="logLevel"
              items={logItems}
              value={logItemLookup[localSettings.logLevel]}
              onChange={handleLogLevel}
            />
          </Stack>
        </ConfigBox>
        <ConfigBox>
          <Box>
            <Typography component="h1">Email Settings</Typography>
            <Typography sx={{ mt: theme.spacing(2) }}>
              Set your host email settings here. These settings are used for
              sending system emails
            </Typography>
          </Box>
          <Stack gap={theme.spacing(20)}>
            <Field
              type="text"
              id="systemEmailHost"
              label="Email Host"
              name="systemEmailHost"
              value={localSettings.systemEmailHost}
              onChange={handleChange}
            />
            <Field
              type="number"
              id="systemEmailPort"
              label="System Email Address"
              name="systemEmailPort"
              value={localSettings.systemEmailPort.toString()}
              onChange={handleChange}
            />
            <Field
              type="email"
              id="systemEmailAddress"
              label="System Email Address"
              name="systemEmailAddress"
              value={localSettings.systemEmailAddress}
              onChange={handleChange}
            />
            <Field
              type="text"
              id="systemEmailPassword"
              label="System Email Password"
              name="systemEmailPassword"
              value={localSettings.systemEmailPassword}
              onChange={handleChange}
            />
          </Stack>
        </ConfigBox>
        <ConfigBox>
          <Box>
            <Typography component="h1">About</Typography>
          </Box>
          <Box>
            <Typography component="h2">BlueWave Uptime v1.0.0</Typography>
            <Typography
              sx={{ mt: theme.spacing(2), mb: theme.spacing(6), opacity: 0.6 }}
            >
              Developed by Bluewave Labs.
            </Typography>
            <Link
              level="secondary"
              url="https://github.com/bluewave-labs"
              label="https://github.com/bluewave-labs"
            />
          </Box>
        </ConfigBox>
      </Stack>
    </Box>
  );
};

AdvancedSettings.propTypes = {
  isAdmin: PropTypes.bool,
};
export default AdvancedSettings;
