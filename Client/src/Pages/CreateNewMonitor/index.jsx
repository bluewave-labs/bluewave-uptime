import "./index.css";
import ConfigBox from "../../Components/ConfigBox";
import React, { useState } from "react";
import RadioButton from "../../Components/RadioButton";
import CustomizableCheckBox from "../../Components/Checkbox/CustomizableCheckbox";
import Button from "../../Components/Button";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createMonitorValidation } from "../../Validation/validation";
import { createMonitor } from "../../Features/Monitors/monitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import Field from "../../Components/Inputs/Field";

const CreateNewMonitor = () => {
  const MS_PER_MINUTE = 60000;
  const { user, authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [errors, setErrors] = useState({});

  //General Settings Form
  const [generalSettings, setGeneralSettings] = useState({ url: "", name: "" });
  //Checks Form
  const [checks, setChecks] = useState({
    type: "",
    //  port: ""
  });
  //Incidents Form
  // const [notifications, setNotifications] = useState({
  //   viaSms: false,
  //   viaEmail: false,
  //   viaOther: false,
  //   email: "",
  // });
  //Advanced Settings Form
  const [advancedSettings, setAdvancedSettings] = useState({
    frequency: 1,
    // retries: "",
    // codes: "",
    // redirects: "",
  });
  //Proxy Settings Form
  // const [proxy, setProxy] = useState({
  //   enabled: false,
  //   protocol: "",
  //   address: "",
  //   proxy_port: "",
  // });

  const handleChange = (event, id, setState, checkbox) => {
    const { value } = event.target;
    setState((prev) => ({
      ...prev,
      [id]: checkbox ? true : value,
    }));

    const validation = createMonitorValidation.validate(
      { [id]: value },
      { abortEarly: false }
    );

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (validation.error) {
        updatedErrors[id] = validation.error.details[0].message;
      } else {
        delete updatedErrors[id];
      }
      return updatedErrors;
    });
  };
  // const handleCheck = (id, setState) => {
  //   setState((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  const handleCreateNewMonitor = async (event) => {
    event.preventDefault();
    //obj to submit
    let monitor = {
      ...generalSettings,
      url: "https://" + generalSettings.url,
      ...checks,
    };

    const { error } = createMonitorValidation.validate(monitor, {
      abortEarly: false,
    });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      monitor = {
        ...monitor,
        description: monitor.name,
        userId: user._id,
        // ...advancedSettings, // TODO frequency should be interval, then we can use spread
        interval: advancedSettings.frequency * MS_PER_MINUTE,
      };
      try {
        const action = await dispatch(createMonitor({ authToken, monitor }));
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/monitors");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  //select values
  // const ports = ["Port 1", "Port 2", "Port 3"];
  const frequencies = [1, 2, 3, 4, 5];

  return (
    <form
      className="create-monitor-form"
      onSubmit={handleCreateNewMonitor}
      noValidate
      spellCheck="false"
      style={{
        maxWidth: "1200px",
        flex: 1,
        padding: `${theme.content.pY} ${theme.content.pX}`,
      }}
    >
      <Button
        level="tertiary"
        label="Back"
        img={<WestRoundedIcon />}
        onClick={() => navigate("/monitors")}
        sx={{
          backgroundColor: "#f4f4f4",
          mb: theme.gap.medium,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            pr: theme.gap.small,
          },
        }}
      />
      <Typography component="h1">Create new monitor</Typography>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <Stack gap={theme.gap.small}>
            <Typography component="h2">General settings</Typography>
            <Typography component="p">
              Here you can select the URL of the host, together with the type of
              monitor.
            </Typography>
          </Stack>
        }
        rightLayout={
          <Stack gap={theme.gap.xl}>
            <Field
              type="url"
              id="monitor-url"
              label="URL to monitor"
              placeholder="google.com"
              value={generalSettings.url}
              onChange={(event) =>
                handleChange(event, "url", setGeneralSettings)
              }
              error={errors["url"]}
            />
            <Field
              type="text"
              id="monitor-name"
              label="Friendly name"
              isOptional={true}
              placeholder="Google"
              value={generalSettings.name}
              onChange={(event) =>
                handleChange(event, "name", setGeneralSettings)
              }
              error={errors["name"]}
            />
          </Stack>
        }
      />
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <Stack gap={theme.gap.small}>
            <Typography component="h2">Checks to perform</Typography>
            <Typography component="p">
              You can always add or remove checks after adding your site.
            </Typography>
          </Stack>
        }
        rightLayout={
          <Stack gap={theme.gap.large}>
            <RadioButton
              id="monitor-checks-http"
              title="HTTP/website monitoring"
              desc="Use HTTP(s) to monitor your website or API endpoint."
              size="small"
              value="http"
              checked={checks.type === "http"}
              onChange={(event) => handleChange(event, "type", setChecks)}
            />
            <RadioButton
              id="monitor-checks-ping"
              title="Ping monitoring"
              desc="Check whether your server is available or not."
              size="small"
              value="ping"
              checked={checks.type === "ping"}
              onChange={(event) => handleChange(event, "type", setChecks)}
            />
            {/* TODO */}
            {/* <RadioButton
              id="monitor-checks-port"
              title="Port monitoring"
              desc="Monitor a specific service on your server."
              value="port"
              checked={checks.type === "port"}
              onChange={(event) => handleChange(event, "type", setChecks)}
            />
            <div className="monitors-gaps-small-plus"></div>
            <div className="monitors-dropdown-holder">
              <Select
                id="monitor-ports"
                value={checks.port || "placeholder"}
                inputProps={{ id: "monitor-ports-select" }}
                onChange={(event) => handleChange(event, "port", setChecks)}
              >
                <MenuItem id="port-placeholder" value="placeholder">
                  Select a port to check
                </MenuItem>
                {ports.map((port, index) => (
                  <MenuItem key={`port-${index}`} value={port}>
                    {port}
                  </MenuItem>
                ))}
              </Select>
            </div> */}
            <Box className="error-container">
              {errors["type"] ? (
                <Typography component="p" className="input-error">
                  {errors["type"]}
                </Typography>
              ) : (
                ""
              )}
            </Box>
          </Stack>
        }
      />
      {/* TODO */}
      {/* <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">Incident notifications</div>
            <div className="config-box-desc-text">
              When there is an incident, notify users.
            </div>
          </div>
        }
        rightLayout={
          <div className="incident-notif-config">
            <div className="incident-notif-config-title">
              When there is a new incident,
            </div>
            <div className="monitors-gaps-medium"></div>
            <div className="incident-notif-config-checks">
              <CustomizableCheckBox
                id="monitor-notify-sms"
                title="Notify via SMS (to be implemented)"
                isChecked={notifications.viaSms}
                handleChange={() => handleCheck("viaSms", setNotifications)}
              />
              <div className="monitors-gaps-medium"></div>
              <CustomizableCheckBox
                id="monitor-notify-email"
                title="Notify via email (to current email address)"
                isChecked={notifications.viaEmail}
                handleChange={() => handleCheck("viaEmail", setNotifications)}
              />
              <div className="monitors-gaps-medium"></div>
              <CustomizableCheckBox
                id="monitor-notify-other"
                title="Notify via email (to another email address below)"
                isChecked={notifications.viaOther}
                handleChange={() => handleCheck("viaOther", setNotifications)}
              />
              <div className="monitors-gaps-small-plus"></div>
              <div className="monitors-dropdown-holder">
                <FlexibileTextField
                  id="monitor-notify-other-email"
                  placeholder="notifications@gmail.com"
                  type="email"
                  value={notifications.email}
                  onChange={(event) =>
                    handleChange(event, "email", setNotifications)
                  }
                />
              </div>
            </div>
          </div>
        }
      /> */}
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <Stack gap={theme.gap.small}>
            <Typography component="h2">Advanced settings</Typography>
          </Stack>
        }
        rightLayout={
          <Stack gap={theme.gap.large}>
            {/* TODO - refactor select component */}
            <Box>
              <Typography component="p" mb={theme.gap.small}>
                Check frequency
              </Typography>
              <Select
                id="monitor-frequencies"
                value={advancedSettings.frequency || 1}
                inputProps={{ id: "monitor-frequencies-select" }}
                onChange={(event) =>
                  handleChange(event, "frequency", setAdvancedSettings)
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      marginTop: "10px",
                    },
                  },
                }}
              >
                {frequencies.map((freq) => (
                  <MenuItem
                    key={`port-${freq}`}
                    value={freq}
                    sx={{
                      fontSize: "13px",
                      borderRadius: `${theme.shape.borderRadius}px`,
                      margin: "5px",
                    }}
                  >
                    {freq} {freq === 1 ? "minute" : "minutes"}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {/* TODO */}
            {/* <FlexibileTextField
              id="monitor-settings-retries"
              title="Maximum retries before the service is marked as down"
              type="number"
              value={advancedSettings.retries}
              onChange={(event) =>
                handleChange(event, "retries", setAdvancedSettings)
              }
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-settings-codes"
              title="Accepted status codes"
              type="number"
              value={advancedSettings.codes}
              onChange={(event) =>
                handleChange(event, "codes", setAdvancedSettings)
              }
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-settings-redirects"
              title="Maximum redirects"
              type="number"
              value={advancedSettings.redirects}
              onChange={(event) =>
                handleChange(event, "redirects", setAdvancedSettings)
              }
            /> */}
          </Stack>
        }
      />
      {/* TODO */}
      {/* <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">Proxy settings</div>
          </div>
        }
        rightLayout={
          <div className="proxy-setting-config">
            <CustomizableCheckBox
              id="monitor-proxy-enable"
              title="Enable proxy"
              isChecked={proxy.enabled}
              handleChange={() => handleCheck("enabled", setProxy)}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-proxy-protocol"
              title="Proxy protocol"
              value={proxy.protocol}
              onChange={(event) => handleChange(event, "protocol", setProxy)}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-proxy-address"
              title="Proxy address"
              value={proxy.address}
              onChange={(event) => handleChange(event, "address", setProxy)}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-proxy-port"
              title="Proxy port"
              value={proxy.proxy_port}
              onChange={(event) => handleChange(event, "proxy_port", setProxy)}
            />
          </div>
        }
      /> */}
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-small"></div>
      <div className="monitors-create-button-holder">
        <Button
          id="create-new-monitor-btn"
          level="primary"
          label="Create new monitor"
          sx={{ width: "210px", fontSize: "var(--env-var-font-size-medium)" }}
          onClick={handleCreateNewMonitor}
          disabled={Object.keys(errors).length !== 0 && true}
        />
      </div>
    </form>
  );
};

export default CreateNewMonitor;
