import "./index.css";
import React, { useState } from "react";
import RadioButton from "../../../Components/RadioButton";
import Button from "../../../Components/Button";
import { Box, ButtonGroup, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { monitorValidation } from "../../../Validation/validation";
import { createMonitor } from "../../../Features/Monitors/monitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";

const CreateMonitor = () => {
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
    interval: 1,
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

    const validation = monitorValidation.validate(
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

  const handleCreateMonitor = async (event) => {
    event.preventDefault();
    //obj to submit
    let monitor = {
      url:
        //preprending protocol for url
        checks.type === "http" || checks.type === "https"
          ? `${checks.type}://` + generalSettings.url
          : generalSettings.url,
      name:
        generalSettings.name === ""
          ? generalSettings.url
          : generalSettings.name,
      //there is no separate monitor type for https since the operations for the two protocols are identical
      //however the URL does need the correct prepend hence https is still being tracked but overwritten when prepping the monitor obj
      type: checks.type === "https" ? "http" : checks.type,
    };

    const { error } = monitorValidation.validate(monitor, {
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
        // ...advancedSettings
        interval: advancedSettings.interval * MS_PER_MINUTE,
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
  const frequencies = [
    { _id: 1, name: "1 minute" },
    { _id: 2, name: "2 minutes" },
    { _id: 3, name: "3 minutes" },
    { _id: 4, name: "4 minutes" },
    { _id: 5, name: "5 minutes" },
  ];

  return (
    <Box className="create-monitor">
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
      <form
        className="create-monitor-form"
        onSubmit={handleCreateMonitor}
        noValidate
        spellCheck="false"
      >
        <Typography component="h1">Create new monitor</Typography>
        <Stack className="config-box">
          <Box>
            <Typography component="h2">General settings</Typography>
            <Typography component="p" mt={theme.gap.small}>
              Here you can select the URL of the host, together with the type of
              monitor.
            </Typography>
          </Box>
          <Stack gap={theme.gap.xl}>
            <Field
              type={
                checks.type === "http" || checks.type === "https"
                  ? "url"
                  : "text"
              }
              id="monitor-url"
              label="URL to monitor"
              https={checks.type === "https"}
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
        </Stack>
        <Stack className="config-box">
          <Box>
            <Typography component="h2">Checks to perform</Typography>
            <Typography component="p" mt={theme.gap.small}>
              You can always add or remove checks after adding your site.
            </Typography>
          </Box>
          <Stack gap={theme.gap.large}>
            <Stack gap={theme.gap.medium}>
              <RadioButton
                id="monitor-checks-http"
                title="Website monitoring"
                desc="Use HTTP(s) to monitor your website or API endpoint."
                size="small"
                value="http"
                checked={checks.type === "http" || checks.type === "https"}
                onChange={(event) => handleChange(event, "type", setChecks)}
              />
              {checks.type === "http" || checks.type === "https" ? (
                <ButtonGroup sx={{ ml: "32px" }}>
                  <Button
                    level="secondary"
                    label="HTTP"
                    onClick={() =>
                      setChecks((prev) => ({ ...prev, type: "http" }))
                    }
                    sx={{
                      backgroundColor:
                        checks.type === "http" &&
                        theme.palette.otherColors.fillGray,
                    }}
                  />
                  <Button
                    level="secondary"
                    label="HTTPS"
                    onClick={() =>
                      setChecks((prev) => ({ ...prev, type: "https" }))
                    }
                    sx={{
                      backgroundColor:
                        checks.type === "https" &&
                        theme.palette.otherColors.fillGray,
                    }}
                  />
                </ButtonGroup>
              ) : (
                ""
              )}
            </Stack>
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
        </Stack>
        {/* TODO */}
        {/* 
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
            <div className="incident-notif-config-checks">
              <CustomizableCheckBox
                id="monitor-notify-sms"
                title="Notify via SMS (to be implemented)"
                isChecked={notifications.viaSms}
                handleChange={() => handleCheck("viaSms", setNotifications)}
              />
              <CustomizableCheckBox
                id="monitor-notify-email"
                title="Notify via email (to current email address)"
                isChecked={notifications.viaEmail}
                handleChange={() => handleCheck("viaEmail", setNotifications)}
              />
              <CustomizableCheckBox
                id="monitor-notify-other"
                title="Notify via email (to another email address below)"
                isChecked={notifications.viaOther}
                handleChange={() => handleCheck("viaOther", setNotifications)}
              />
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
        <Stack className="config-box">
          <Box>
            <Typography component="h2">Advanced settings</Typography>
          </Box>
          <Stack gap={theme.gap.large}>
            <Select
              id="monitor-interval"
              label="Check frequency"
              value={advancedSettings.interval || 1}
              onChange={(event) =>
                handleChange(event, "interval", setAdvancedSettings)
              }
              items={frequencies}
            />
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
            <FlexibileTextField
              id="monitor-settings-codes"
              title="Accepted status codes"
              type="number"
              value={advancedSettings.codes}
              onChange={(event) =>
                handleChange(event, "codes", setAdvancedSettings)
              }
            />
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
        </Stack>
        {/* TODO */}
        {/*
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
            <FlexibileTextField
              id="monitor-proxy-protocol"
              title="Proxy protocol"
              value={proxy.protocol}
              onChange={(event) => handleChange(event, "protocol", setProxy)}
            />
            <FlexibileTextField
              id="monitor-proxy-address"
              title="Proxy address"
              value={proxy.address}
              onChange={(event) => handleChange(event, "address", setProxy)}
            />
            <FlexibileTextField
              id="monitor-proxy-port"
              title="Proxy port"
              value={proxy.proxy_port}
              onChange={(event) => handleChange(event, "proxy_port", setProxy)}
            />
          </div>
        }
      /> */}
        <Stack direction="row" justifyContent="flex-end">
          <Button
            id="create-new-monitor-btn"
            level="primary"
            label="Create new monitor"
            onClick={handleCreateMonitor}
            disabled={Object.keys(errors).length !== 0 && true}
          />
        </Stack>
      </form>
    </Box>
  );
};

export default CreateMonitor;
