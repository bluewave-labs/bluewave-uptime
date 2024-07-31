import "./index.css";
import React, { useState } from "react";
import RadioButton from "../../../Components/RadioButton";
import Button from "../../../Components/Button";
import { Box, ButtonGroup, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { monitorValidation } from "../../../Validation/validation";
import { createUptimeMonitor } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Checkbox from "../../../Components/Inputs/Checkbox";
import { createToast } from "../../../Utils/toastUtils";

const CreateMonitor = () => {
  const MS_PER_MINUTE = 60000;
  const { user, authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const idMap = {
    "monitor-url": "url",
    "monitor-name": "name",
    "monitor-checks-http": "type",
    "monitor-checks-ping": "type",
    "notify-email-default": "notification-email",
  };

  const [monitor, setMonitor] = useState({
    url: "",
    name: "",
    type: "",
    notifications: [],
    interval: 1,
  });
  const [https, setHttps] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (event, name) => {
    const { value, id } = event.target;
    if (!name) name = idMap[id];

    if (name.includes("notification-")) {
      name = name.replace("notification-", "");
      let hasNotif = monitor.notifications.some(
        (notification) => notification.type === name
      );
      setMonitor((prev) => {
        const notifs = [...prev.notifications];
        if (hasNotif) {
          return {
            ...prev,
            notifications: notifs.filter((notif) => notif.type !== name),
          };
        } else {
          return {
            ...prev,
            notifications: [
              ...notifs,
              name === "email"
                ? { type: name, address: value }
                : // TODO - phone number
                  { type: name, phone: value },
            ],
          };
        }
      });
    } else {
      setMonitor((prev) => ({
        ...prev,
        [name]: value,
      }));

      const { error } = monitorValidation.validate(
        { [name]: value },
        { abortEarly: false }
      );

      setErrors((prev) => {
        const updatedErrors = { ...prev };
        if (error) updatedErrors[name] = error.details[0].message;
        else delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleCreateMonitor = async (event) => {
    event.preventDefault();
    //obj to submit
    let form = {
      url:
        //preprending protocol for url
        monitor.type === "http"
          ? `http${https ? "s" : ""}://` + monitor.url
          : monitor.url,
      name: monitor.name === "" ? monitor.url : monitor.name,
      type: monitor.type,
      interval: monitor.interval * MS_PER_MINUTE,
    };

    const { error } = monitorValidation.validate(form, {
      abortEarly: false,
    });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      createToast({ body: "Error validation data." });
    } else {
      form = {
        ...form,
        description: form.name,
        userId: user._id,
        notifications: monitor.notifications,
      };
      const action = await dispatch(
        createUptimeMonitor({ authToken, monitor: form })
      );
      if (action.meta.requestStatus === "fulfilled") {
        createToast({ body: "Monitor created successfully!" });
        navigate("/monitors");
      } else {
        createToast({ body: "Failed to create monitor." });
      }
    }
  };

  //select values
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
        animate="slideLeft"
        img={<WestRoundedIcon />}
        onClick={() => navigate("/monitors")}
        sx={{
          backgroundColor: "#f4f4f4",
          mb: theme.gap.medium,
          px: theme.gap.ml,
          "& svg.MuiSvgIcon-root": {
            mr: theme.gap.small,
            fill: theme.palette.otherColors.slateGray,
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
              type={monitor.type === "http" ? "url" : "text"}
              id="monitor-url"
              label="URL to monitor"
              https={https}
              placeholder="google.com"
              value={monitor.url}
              onChange={handleChange}
              error={errors["url"]}
            />
            <Field
              type="text"
              id="monitor-name"
              label="Friendly name"
              isOptional={true}
              placeholder="Google"
              value={monitor.name}
              onChange={handleChange}
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
                checked={monitor.type === "http"}
                onChange={(event) => handleChange(event)}
              />
              {monitor.type === "http" ? (
                <ButtonGroup sx={{ ml: "32px" }}>
                  <Button
                    level="secondary"
                    label="HTTPS"
                    onClick={() => setHttps(true)}
                    sx={{
                      backgroundColor:
                        https && theme.palette.otherColors.fillGray,
                    }}
                  />
                  <Button
                    level="secondary"
                    label="HTTP"
                    onClick={() => setHttps(false)}
                    sx={{
                      backgroundColor:
                        !https && theme.palette.otherColors.fillGray,
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
              checked={monitor.type === "ping"}
              onChange={(event) => handleChange(event)}
            />
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
        <Stack className="config-box">
          <Box>
            <Typography component="h2">Incident notifications</Typography>
            <Typography component="p" mt={theme.gap.small}>
              When there is an incident, notify users.
            </Typography>
          </Box>
          <Stack gap={theme.gap.medium}>
            <Typography component="p" mt={theme.gap.small}>
              When there is a new incident,
            </Typography>
            <Checkbox
              id="notify-sms"
              label="Notify via SMS (coming soon)"
              isChecked={false}
              value=""
              onChange={() => console.log("disabled")}
              isDisabled={true}
            />
            <Checkbox
              id="notify-email-default"
              label={`Notify via email (to ${user.email})`}
              isChecked={monitor.notifications.some(
                (notification) => notification.type === "email"
              )}
              value={user?.email}
              onChange={(event) => handleChange(event)}
            />
            <Checkbox
              id="notify-email"
              label="Also notify via email to multiple addresses (coming soon)"
              isChecked={false}
              value=""
              onChange={() => console.log("disabled")}
              isDisabled={true}
            />
            {monitor.notifications.some(
              (notification) => notification.type === "emails"
            ) ? (
              <Box mx={`calc(${theme.gap.ml} * 2)`}>
                <Field
                  id="notify-email-list"
                  type="text"
                  placeholder="name@gmail.com"
                  value=""
                  onChange={() => console.log("disabled")}
                />
                <Typography mt={theme.gap.small}>
                  You can separate multiple emails with a comma
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
        <Stack className="config-box">
          <Box>
            <Typography component="h2">Advanced settings</Typography>
          </Box>
          <Stack gap={theme.gap.large}>
            <Select
              id="monitor-interval"
              label="Check frequency"
              value={monitor.interval || 1}
              onChange={(event) => handleChange(event, "interval")}
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
