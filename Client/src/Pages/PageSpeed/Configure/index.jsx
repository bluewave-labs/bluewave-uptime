import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Modal, Skeleton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  deletePageSpeed,
  getPageSpeedByTeamId,
  updatePageSpeed,
} from "../../../Features/PageSpeedMonitor/pageSpeedMonitorSlice";
import { monitorValidation } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { logger } from "../../../Utils/Logger";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Checkbox from "../../../Components/Inputs/Checkbox";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";

import "./index.css";

/**
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Skeleton variant="rounded" width="15%" height={34} />
      <Stack gap={theme.spacing(20)} mt={theme.spacing(6)} maxWidth="1000px">
        <Stack direction="row" gap={theme.spacing(4)} mt={theme.spacing(4)}>
          <Skeleton
            variant="circular"
            style={{ minWidth: 24, minHeight: 24 }}
          />
          <Box width="80%">
            <Skeleton
              variant="rounded"
              width="50%"
              height={24}
              sx={{ mb: theme.spacing(4) }}
            />
            <Skeleton variant="rounded" width="50%" height={18} />
          </Box>
          <Stack
            direction="row"
            gap={theme.spacing(6)}
            sx={{
              ml: "auto",
              alignSelf: "flex-end",
            }}
          >
            <Skeleton variant="rounded" width={100} height={34} />
            <Skeleton variant="rounded" width={100} height={34} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" width="100%" height={500} />
        <Stack direction="row" justifyContent="flex-end">
          <Skeleton variant="rounded" width="15%" height={34} />
        </Stack>
      </Stack>
    </>
  );
};

const PageSpeedConfigure = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MS_PER_MINUTE = 60000;
  const { authToken } = useSelector((state) => state.auth);
  const { monitors } = useSelector((state) => state.pageSpeedMonitors);
  const { monitorId } = useParams();
  const [monitor, setMonitor] = useState({});
  const [errors, setErrors] = useState({});

  const frequencies = [
    { _id: 3, name: "3 minutes" },
    { _id: 5, name: "5 minutes" },
    { _id: 10, name: "10 minutes" },
    { _id: 20, name: "20 minutes" },
    { _id: 60, name: "1 hour" },
    { _id: 1440, name: "1 day" },
    { _id: 10080, name: "1 week" },
  ];

  useEffect(() => {
    const data = monitors.find((monitor) => monitor._id === monitorId);
    if (!data) {
      logger.error("Error fetching pagespeed monitor of id: " + monitorId);
      navigate("/not-found", { replace: true });
    }
    setMonitor({
      ...data,
    });
  }, [monitorId, monitors, navigate]);

  const handleChange = (event, id) => {
    let { value } = event.target;
    if (id === "interval") {
      value = value * MS_PER_MINUTE;
    }
    setMonitor((prev) => ({ ...prev, [id]: value }));

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

  const handleSave = async (event) => {
    event.preventDefault();
    const action = await dispatch(
      updatePageSpeed({ authToken, monitor: monitor })
    );
    if (action.meta.requestStatus === "fulfilled") {
      createToast({ body: "Monitor updated successfully!" });
      dispatch(getPageSpeedByTeamId(authToken));
    } else {
      createToast({ body: "Failed to update monitor." });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleRemove = async (event) => {
    event.preventDefault();
    const action = await dispatch(deletePageSpeed({ authToken, monitor }));
    if (action.meta.requestStatus === "fulfilled") {
      navigate("/pagespeed");
    } else {
      createToast({ body: "Failed to delete monitor." });
    }
  };

  let loading = Object.keys(monitor).length === 0;

  return (
    <Stack className="configure-pagespeed" gap={theme.spacing(12)}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Breadcrumbs
            list={[
              { name: "pagespeed", path: "/pagespeed" },
              { name: "details", path: `/pagespeed/${monitorId}` },
              { name: "configure", path: `/pagespeed/configure/${monitorId}` },
            ]}
          />
          <Stack
            component="form"
            noValidate
            spellCheck="false"
            onSubmit={handleSave}
            flex={1}
            gap={theme.spacing(12)}
          >
            <Stack direction="row" gap={theme.spacing(2)}>
              <PulseDot
                color={
                  monitor?.status
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              />
              <Box>
                <Typography
                  component="h1"
                  mb={theme.spacing(2)}
                  sx={{ lineHeight: 1 }}
                  color={theme.palette.text.primary}
                >
                  {monitor?.url}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: monitor?.status
                      ? theme.palette.success.main
                      : theme.palette.error.text,
                  }}
                >
                  Your pagespeed monitor is {monitor?.status ? "live" : "down"}.
                </Typography>
              </Box>
              <Box alignSelf="flex-end" ml="auto">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    pl: theme.spacing(4),
                    pr: theme.spacing(6),
                    "& svg": {
                      mr: theme.spacing(2),
                      "& path": {
                        stroke: theme.palette.other.icon,
                        strokeWidth: 0.1,
                      },
                    },
                  }}
                >
                  <PauseCircleOutlineIcon />
                  Pause
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsOpen(true)}
                  sx={{
                    ml: theme.spacing(6),
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Stack>
            <Stack
              border={1}
              borderColor={theme.palette.border.light}
              borderRadius={theme.shape.borderRadius}
              backgroundColor={theme.palette.background.main}
              p={theme.spacing(20)}
              pl={theme.spacing(15)}
              gap={theme.spacing(20)}
              sx={{
                "& h3, & p": {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <Stack direction="row">
                <Typography component="h3">Monitor display name</Typography>
                <Field
                  type="text"
                  id="monitor-name"
                  placeholder="Example monitor"
                  value={monitor?.name || ""}
                  onChange={(event) => handleChange(event, "name")}
                  error={errors.name}
                />
              </Stack>
              <Stack
                direction="row"
                sx={{
                  ".MuiInputBase-root:has(> .Mui-disabled)": {
                    backgroundColor: theme.palette.background.accent,
                  },
                }}
              >
                <Typography component="h3">URL</Typography>
                <Field
                  type="url"
                  id="monitor-url"
                  placeholder="random.website.com"
                  value={monitor?.url?.replace("http://", "") || ""}
                  onChange={(event) => handleChange(event, "url")}
                  error={errors.url}
                  disabled={true}
                />
              </Stack>
              <Stack direction="row">
                <Typography component="h3">Check frequency</Typography>
                <Select
                  id="monitor-frequency"
                  items={frequencies}
                  value={monitor?.interval / MS_PER_MINUTE || 3}
                  onChange={(event) => handleChange(event, "interval")}
                />
              </Stack>
              <Stack direction="row">
                <Typography component="h3">
                  Incidents notifications{" "}
                  <Typography component="span">(coming soon)</Typography>
                </Typography>
                <Stack
                  className="section-disabled"
                  backgroundColor={theme.palette.background.fill}
                >
                  <Typography mb={theme.spacing(4)}>
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
                  <Box mx={theme.spacing(16)}>
                    <Field
                      id="notify-emails-list"
                      placeholder="notifications@gmail.com"
                      value=""
                      onChange={() => logger.warn("disabled")}
                      error=""
                    />
                    <Typography mt={theme.spacing(4)}>
                      You can separate multiple emails with a comma
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" mt="auto">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ px: theme.spacing(12) }}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </>
      )}
      <Modal
        aria-labelledby="modal-delete-pagespeed-monitor"
        aria-describedby="delete-pagespeed-monitor-confirmation"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disablePortal
      >
        <Stack
          gap={theme.spacing(2)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.background.main,
            border: 1,
            borderColor: theme.palette.border.light,
            borderRadius: theme.shape.borderRadius,
            boxShadow: 24,
            p: theme.spacing(15),
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography
            id="modal-delete-pagespeed-monitor"
            component="h2"
            color={theme.palette.text.secondary}
          >
            Do you really want to delete this monitor?
          </Typography>
          <Typography
            id="delete-pagespeed-monitor-confirmation"
            color={theme.palette.text.tertiary}
          >
            Once deleted, this monitor cannot be retrieved.
          </Typography>
          <Stack
            direction="row"
            gap={theme.spacing(4)}
            mt={theme.spacing(12)}
            justifyContent="flex-end"
          >
            <Button
              variant="text"
              color="info"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleRemove}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default PageSpeedConfigure;
