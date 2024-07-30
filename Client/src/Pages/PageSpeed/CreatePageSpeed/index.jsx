import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Button from "../../../Components/Button";
import Checkbox from "../../../Components/Inputs/Checkbox";
import { monitorValidation } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { createPageSpeed } from "../../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import "./index.css";

const CreatePageSpeed = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const MS_PER_MINUTE = 60000;
  const { user, authToken } = useSelector((state) => state.auth);

  const frequencies = [
    { _id: 1, name: "1 minute" },
    { _id: 2, name: "2 minutes" },
    { _id: 3, name: "3 minutes" },
    { _id: 4, name: "4 minutes" },
    { _id: 5, name: "5 minutes" },
  ];

  const [form, setForm] = useState({
    name: "",
    url: "",
    interval: 1,
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
    } else {
      monitor = {
        ...monitor,
        description: monitor.name,
        userId: user._id,
        interval: form.interval * MS_PER_MINUTE,
        type: "pagespeed",
      };
      try {
        const action = await dispatch(createPageSpeed({ authToken, monitor }));
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/page-speed");
        }
      } catch (error) {
        createToast({
          body:
            error.details && error.details.length > 0
              ? error.details[0].message
              : "Unknown error.",
        });
      }
    }
  };

  return (
    <Box className="create-page-speed">
      <form
        noValidate
        spellCheck="false"
        onSubmit={handleCreate}
        style={{ display: "flex", flexDirection: "column", gap: theme.gap.xl }}
      >
        <IconButton
          aria-label="close modal"
          onClick={() => navigate("/page-speed")}
          sx={{
            p: "5px",
            opacity: 0.6,
            "&:focus": { outline: "none" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Stack gap={theme.gap.large}>
          <Typography component="h1">Create a page speed monitor</Typography>
          <Field
            type="text"
            id="monitor-name"
            label="Monitor friendly name"
            placeholder="Example monitor"
            isOptional={true}
            value={form.name}
            onChange={(event) => handleChange(event, "name")}
            error={errors.name}
          />
          <Field
            type="url"
            id="monitor-url"
            label="URL"
            placeholder="random.website.com"
            value={form.url}
            onChange={(event) => handleChange(event, "url")}
            error={errors.url}
          />
          <Select
            id="monitor-frequency"
            label="Check frequency"
            items={frequencies}
            value={form.interval}
            onChange={(event) => handleChange(event, "interval")}
          />
        </Stack>
        <Stack gap={theme.gap.small}>
          <Typography component="h2">
            Incidents notifications{" "}
            <Typography component="span">(coming soon)</Typography>
          </Typography>
          <Box className="section-disabled">
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
                onChange={() => console.log("disabled")}
                error=""
              />
              <Typography mt={theme.gap.small}>
                You can separate multiple emails with a comma
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap={theme.gap.small}>
          <Button
            level="tertiary"
            label="Cancel"
            onClick={() => navigate("/page-speed")}
          />
          <Button
            type="submit"
            level="primary"
            label="Create"
            onClick={handleCreate}
          />
        </Stack>
      </form>
    </Box>
  );
};

export default CreatePageSpeed;
