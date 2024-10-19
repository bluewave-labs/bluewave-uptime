import { useState } from "react";
import { Box, ButtonGroup, Stack, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector, useDispatch } from "react-redux";
import { monitorValidation } from "../../../Validation/validation";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { createPageSpeed, checkEndpointResolution } from "../../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import { createToast } from "../../../Utils/toastUtils";
import { ConfigBox } from "../../Monitors/styled";
import Radio from "../../../Components/Inputs/Radio";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Checkbox from "../../../Components/Inputs/Checkbox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import "./index.css";

const CreatePageSpeed = () => {
  const MS_PER_MINUTE = 60000;
  const { user, authToken } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.pageSpeedMonitors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [monitor, setMonitor] = useState({
    url: "",
    name: "",
    type: "pagespeed",
    notifications: [],
    interval: 3,
  });
  const [https, setHttps] = useState(true);
  const [errors, setErrors] = useState({});

  const idMap = {
    "monitor-url": "url",
    "monitor-name": "name",
    "notify-email-default": "email",
  };

  const handleChange = (event, name) => {
    const { value, id } = event.target;
    if (!name) name = idMap[id];
    
    setMonitor((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { error } = monitorValidation.validate({ [name]: value }, { abortEarly: false });
    setErrors((prev) => (error ? { ...prev, [name]: error.details[0].message } : { ...prev, [name]: undefined }));
  };

  const handleNotificationChange = (name, value) => {
    setMonitor((prev) => {
      const notifications = [...prev.notifications];
      const existingNotification = notifications.find((notif) => notif.type === name);
      if (existingNotification) {
        return { ...prev, notifications: notifications.filter((notif) => notif.type !== name) };
      } else {
        return { ...prev, notifications: [...notifications, { type: name, address: value }] };
      }
    });
  };

  const handleCreateMonitor = async (event) => {
    event.preventDefault();
    const form = {
      url: `http${https ? "s" : ""}://${monitor.url}`,
      name: monitor.name || monitor.url,
      type: monitor.type,
      interval: monitor.interval * MS_PER_MINUTE,
    };

    const { error } = monitorValidation.validate(form, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => (newErrors[err.path[0]] = err.message));
      setErrors(newErrors);
      createToast({ body: "Error validating data." });
      return;
    }

    const endpointCheck = await dispatch(checkEndpointResolution({ authToken, monitorURL: form.url }));
    if (endpointCheck.meta.requestStatus === "rejected") {
      setErrors({ url: "The entered URL is not reachable." });
      createToast({ body: "The endpoint you entered doesn't resolve. Check the URL again." });
      return;
    }

    const monitorData = {
      ...form,
      description: form.name,
      teamId: user.teamId,
      userId: user._id,
      notifications: monitor.notifications,
    };

    const action = await dispatch(createPageSpeed({ authToken, monitor: monitorData }));
    if (action.meta.requestStatus === "fulfilled") {
      createToast({ body: "Monitor created successfully!" });
      navigate("/pagespeed");
    } else {
      createToast({ body: "Failed to create monitor." });
    }
  };

  const frequencies = [
    { _id: 3, name: "3 minutes" },
    { _id: 5, name: "5 minutes" },
    { _id: 10, name: "10 minutes" },
    { _id: 20, name: "20 minutes" },
    { _id: 60, name: "1 hour" },
    { _id: 1440, name: "1 day" },
    { _id: 10080, name: "1 week" },
  ];

  return (
    <Box className="create-monitor" sx={{ "& h1": { color: theme.palette.text.primary } }}>
      <Breadcrumbs list={[{ name: "pagespeed", path: "/pagespeed" }, { name: "create", path: `/pagespeed/create` }]} />
      <Stack component="form" onSubmit={handleCreateMonitor} noValidate spellCheck="false" gap={theme.spacing(12)} mt={theme.spacing(6)}>
        <Typography component="h1" variant="h1">
          Create your{" "}
          <Typography component="span" fontWeight="inherit" color={theme.palette.text.secondary}>
            pagespeed monitor
          </Typography>
        </Typography>
        <ConfigBox>
          <Typography component="h2">General settings</Typography>
          <Stack gap={theme.spacing(15)}>
            <Field
              type="url"
              id="monitor-url"
              label="URL to monitor"
              https={https}
              placeholder="google.com"
              value={monitor.url}
              onChange={handleChange}
              error={errors.url}
            />
            <Field
              type="text"
              id="monitor-name"
              label="Display name"
              isOptional={true}
              placeholder="Google"
              value={monitor.name}
              onChange={handleChange}
              error={errors.name}
            />
          </Stack>
        </ConfigBox>

        <ConfigBox>
          <Typography component="h2">Checks to perform</Typography>
          <Radio
            id="monitor-checks-http"
            title="Website monitoring"
            desc="Use HTTP(s) to monitor your website or API endpoint."
            value="http"
            checked={monitor.type === "pagespeed"}
            onChange={(event) => handleChange(event)}
          />
          <ButtonGroup>
            <Button variant="group" onClick={() => setHttps(true)} filled={https.toString()}>HTTPS</Button>
            <Button variant="group" onClick={() => setHttps(false)} filled={(!https).toString()}>HTTP</Button>
          </ButtonGroup>
        </ConfigBox>

        <ConfigBox>
          <Typography component="h2">Incident notifications</Typography>
          <Checkbox
            id="notify-email-default"
            label={`Notify via email (to ${user.email})`}
            isChecked={monitor.notifications.some((notif) => notif.type === "email")}
            onChange={(event) => handleNotificationChange("email", user.email)}
          />
        </ConfigBox>

        <ConfigBox>
          <Typography component="h2">Advanced settings</Typography>
          <Select
            id="monitor-interval"
            label="Check frequency"
            value={monitor.interval}
            onChange={(event) => handleChange(event, "interval")}
            items={frequencies}
          />
        </ConfigBox>

        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0} loading={isLoading}>
            Create monitor
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreatePageSpeed;
