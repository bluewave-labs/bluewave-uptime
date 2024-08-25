import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Button from "../../../Components/Button";
import ButtonSpinner from "../../../Components/ButtonSpinner";
import Checkbox from "../../../Components/Inputs/Checkbox";
import { monitorValidation } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { createPageSpeed } from "../../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import "./index.css";
import { logger } from "../../../Utils/Logger";
import { networkService } from "../../../main";

const CreatePageSpeed = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const MS_PER_MINUTE = 60000;
  const { user, authToken } = useSelector((state) => state.auth);

  const frequencies = [
    { _id: 3, name: "3 minutes" },
    { _id: 5, name: "5 minutes" },
    { _id: 10, name: "10 minutes" },
    { _id: 20, name: "20 minutes" },
    { _id: 60, name: "1 hour" },
    { _id: 1440, name: "1 day" },
    { _id: 10080, name: "1 week" },
  ];

  const [form, setForm] = useState({
    name: "",
    url: "",
    interval: 3,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event, id) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    const { error } = monitorValidation.validate(
      { [id]: value },
      { abortEarly: false }
    );

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[id] = error.details[0].message;
      else delete newErrors[id];
      return newErrors;
    });
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    let monitor = {
      url: "http://" + form.url,
      name: form.name === "" ? form.url : form.name,
    };

    const { error } = monitorValidation.validate(form, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      createToast({ body: "Error validating data." });
      return;
    }

    monitor = {
      ...monitor,
      description: monitor.name,
      userId: user._id,
      interval: form.interval * MS_PER_MINUTE,
      type: "pagespeed",
    };

    try {
      setIsLoading(true);
      try {
        await networkService.verifyUrl(authToken, monitor.type, monitor.url);
      } catch (error) {
        const newErrors = { ...errors };
        newErrors["url"] = "URL doesn't resolve";
        setErrors(newErrors);
        throw error;
      }
      const action = await dispatch(createPageSpeed({ authToken, monitor }));
      if (action.meta.requestStatus === "fulfilled") {
        navigate("/pagespeed");
      }
    } catch (error) {
      if (error.details && error.details.length > 0) {
        createToast({
          body: error.details[0].message,
        });
      } else if (error.response?.data?.msg) {
        createToast({ body: error.response.data.msg });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack className="create-page-speed" gap={theme.gap.mlplus}>
      <Breadcrumbs
        list={[
          { name: "pagespeed", path: "/pagespeed" },
          { name: "create", path: `/pagespeed/create` },
        ]}
      />
      <Stack
        component="form"
        noValidate
        spellCheck="false"
        onSubmit={handleCreate}
        gap={theme.gap.large}
        flex={1}
      >
        <Typography component="h1">Create pagespeed monitor</Typography>
        <Stack gap={theme.gap.xl}>
          <Stack direction="row">
            <Typography component="h3">Monitor friendly name</Typography>
            <Field
              type="text"
              id="monitor-name"
              placeholder="Example monitor"
              value={form.name}
              onChange={(event) => handleChange(event, "name")}
              error={errors.name}
            />
          </Stack>
          <Stack direction="row">
            <Typography component="h3">URL</Typography>
            <Field
              type="url"
              id="monitor-url"
              placeholder="random.website.com"
              value={form.url}
              onChange={(event) => handleChange(event, "url")}
              error={errors.url}
            />
          </Stack>
          <Stack direction="row">
            <Typography component="h3">Check frequency</Typography>
            <Select
              id="monitor-frequency"
              items={frequencies}
              value={form.interval}
              onChange={(event) => handleChange(event, "interval")}
            />
          </Stack>
          <Stack direction="row">
            <Typography component="h3">
              Incidents notifications{" "}
              <Typography component="span">(coming soon)</Typography>
            </Typography>
            <Stack className="section-disabled">
              <Typography mb={theme.gap.small}>
                When there is a new incident,
              </Typography>
              <Checkbox
                id="notify-sms"
                label="Notify via SMS (coming soon)"
                isChecked={false}
                isDisabled={true}
              />
              <Checkbox
                id="notify-email"
                label="Notify via email (to gorkem.cetin@bluewavelabs.ca)"
                isChecked={false}
              />
              <Checkbox
                id="notify-emails"
                label="Notify via email to following emails"
                isChecked={false}
              />
              <Box mx={`calc(${theme.gap.ml} * 2)`}>
                <Field
                  id="notify-emails-list"
                  placeholder="notifications@gmail.com"
                  value=""
                  onChange={() => logger.warn("disabled")}
                  error=""
                />
                <Typography mt={theme.gap.small}>
                  You can separate multiple emails with a comma
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt="auto">
          <ButtonSpinner
            type="submit"
            level="primary"
            label="Create"
            isLoading={isLoading}
            onClick={handleCreate}
            sx={{ px: theme.gap.large, mt: theme.gap.large }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreatePageSpeed;
