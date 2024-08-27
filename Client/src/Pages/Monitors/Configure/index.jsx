import { useNavigate, useParams } from "react-router";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Modal, Skeleton, Stack, Typography } from "@mui/material";
import { monitorValidation } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { logger } from "../../../Utils/Logger";
import {
  updateUptimeMonitor,
  getUptimeMonitorsByTeamId,
  deleteUptimeMonitor,
} from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import Button from "../../../Components/Button";
import Field from "../../../Components/Inputs/Field";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Select from "../../../Components/Inputs/Select";
import Checkbox from "../../../Components/Inputs/Checkbox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import PulseDot from "../../../Components/Animated/PulseDot";
import "./index.css";

/**
 * Parses a URL string and returns a URL object.
 *
 * @param {string} url - The URL string to parse.
 * @returns {URL} - The parsed URL object if valid, otherwise an empty string.
 */
const parseUrl = (url) => {
  try {
    return new URL(url);
  } catch (error) {
    return null;
  }
};

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
      <Stack gap={theme.gap.xl} mt={theme.gap.medium}>
        <Stack direction="row" gap={theme.gap.small} mt={theme.gap.small}>
          <Skeleton
            variant="circular"
            style={{ minWidth: 24, minHeight: 24 }}
          />
          <Box width="80%">
            <Skeleton
              variant="rounded"
              width="50%"
              height={24}
              sx={{ mb: theme.gap.small }}
            />
            <Skeleton variant="rounded" width="50%" height={18} />
          </Box>
          <Stack
            direction="row"
            gap={theme.gap.medium}
            sx={{
              ml: "auto",
              alignSelf: "flex-end",
            }}
          >
            <Skeleton variant="rounded" width={150} height={34} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" width="100%" height={200} />
        <Skeleton variant="rounded" width="100%" height={200} />
        <Skeleton variant="rounded" width="100%" height={200} />
        <Stack direction="row" justifyContent="flex-end">
          <Skeleton variant="rounded" width="15%" height={34} />
        </Stack>
      </Stack>
    </>
  );
};

/**
 * Configure page displays monitor configurations and allows for editing actions.
 * @component
 */
const Configure = () => {
  const MS_PER_MINUTE = 60000;
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  const { monitors } = useSelector((state) => state.uptimeMonitors);
  const [monitor, setMonitor] = useState({});
  const [errors, setErrors] = useState({});
  const { monitorId } = useParams();

  const idMap = {
    "monitor-url": "url",
    "monitor-name": "name",
    "monitor-checks-http": "type",
    "monitor-checks-ping": "type",
    "notify-email-default": "notification-email",
  };

  useEffect(() => {
    const data = monitors.find((monitor) => monitor._id === monitorId);
    if (!data) {
      logger.error("Error fetching monitor of id: " + monitorId);
      navigate("/not-found", { replace: true });
    }
    setMonitor({
      ...data,
    });
  }, [monitorId, authToken, monitors, navigate]);

  const handleChange = (event, name) => {
    let { value, id } = event.target;
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
      if (name === "interval") {
        value = value * MS_PER_MINUTE;
      }
      setMonitor((prev) => ({
        ...prev,
        [name]: value,
      }));

      const validation = monitorValidation.validate(
        { [name]: value },
        { abortEarly: false }
      );

      setErrors((prev) => {
        const updatedErrors = { ...prev };

        if (validation.error)
          updatedErrors[name] = validation.error.details[0].message;
        else delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const action = await dispatch(
      updateUptimeMonitor({ authToken, monitor: monitor })
    );
    if (action.meta.requestStatus === "fulfilled") {
      createToast({ body: "Monitor updated successfully!" });
      dispatch(getUptimeMonitorsByTeamId(authToken));
    } else {
      createToast({ body: "Failed to update monitor." });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleRemove = async (event) => {
    event.preventDefault();
    const action = await dispatch(deleteUptimeMonitor({ authToken, monitor }));
    if (action.meta.requestStatus === "fulfilled") {
      navigate("/monitors");
    } else {
      createToast({ body: "Failed to delete monitor." });
    }
  };

  const frequencies = [
    { _id: 1, name: "1 minute" },
    { _id: 2, name: "2 minutes" },
    { _id: 3, name: "3 minutes" },
    { _id: 4, name: "4 minutes" },
    { _id: 5, name: "5 minutes" },
  ];

  // Parse the URL
  const parsedUrl = parseUrl(monitor?.url);
  const protocol = parsedUrl?.protocol?.replace(":", "") || "";

  let loading = Object.keys(monitor).length === 0;

  return (
    <Stack className="configure-monitor" gap={theme.gap.large}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Breadcrumbs
            list={[
              { name: "monitors", path: "/monitors" },
              { name: "details", path: `/monitors/${monitorId}` },
              { name: "configure", path: `/monitors/configure/${monitorId}` },
            ]}
          />
          <Stack
            component="form"
            noValidate
            spellCheck="false"
            gap={theme.gap.large}
            flex={1}
          >
            <Stack direction="row" gap={theme.gap.xs}>
              <PulseDot
                color={
                  monitor?.status
                    ? theme.label.up.dotColor
                    : theme.label.down.dotColor
                }
              />
              <Box>
                {parsedUrl?.host ? (
                  <Typography component="h1" mb={theme.gap.xs} lineHeight={1}>
                    {parsedUrl.host || "..."}
                  </Typography>
                ) : (
                  ""
                )}
                <Typography
                  component="span"
                  lineHeight={theme.gap.large}
                  sx={{
                    color: monitor?.status
                      ? "var(--env-var-color-17)"
                      : "var(--env-var-color-24)",
                  }}
                >
                  Your site is {monitor?.status ? "up" : "down"}.
                </Typography>
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-end",
                  ml: "auto",
                }}
              >
                <Button
                  level="tertiary"
                  label="Pause"
                  animate="rotate180"
                  img={<PauseCircleOutlineIcon />}
                  sx={{
                    backgroundColor: theme.palette.otherColors.fillGray,
                    pl: theme.gap.small,
                    pr: theme.gap.medium,
                    mr: theme.gap.medium,
                    "& svg": {
                      mr: theme.gap.xs,
                    },
                  }}
                />
                <Button
                  level="error"
                  label="Remove"
                  sx={{
                    boxShadow: "none",
                    px: theme.gap.ml,
                  }}
                  onClick={() => setIsOpen(true)}
                />
              </Box>
            </Stack>
            <Stack
              className="config-box"
              direction="row"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="h2">General settings</Typography>
                <Typography component="p" sx={{ mt: theme.gap.xs }}>
                  Here you can select the URL of the host, together with the
                  type of monitor.
                </Typography>
              </Box>
              <Stack gap={theme.gap.xl}>
                <Field
                  type={monitor?.type === "http" ? "url" : "text"}
                  https={protocol === "https"}
                  id="monitor-url"
                  label="URL to monitor"
                  placeholder="google.com"
                  value={parsedUrl?.host || monitor?.url || ""}
                  disabled={true}
                  error={errors["url"]}
                />
                <Field
                  type="text"
                  id="monitor-name"
                  label="Friendly name"
                  isOptional={true}
                  placeholder="Google"
                  value={monitor?.name || ""}
                  onChange={handleChange}
                  error={errors["name"]}
                />
              </Stack>
            </Stack>
            <Stack
              className="config-box"
              direction="row"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="h2">Incident notifications</Typography>
                <Typography component="p" mt={theme.gap.xs}>
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
                  onChange={() => logger.warn("disabled")}
                  isDisabled={true}
                />
                <Checkbox
                  id="notify-email-default"
                  label={`Notify via email (to ${user.email})`}
                  isChecked={
                    monitor?.notifications?.some(
                      (notification) => notification.type === "email"
                    ) || false
                  }
                  value={user?.email}
                  onChange={(event) => handleChange(event)}
                />
                <Checkbox
                  id="notify-email"
                  label="Also notify via email to multiple addresses (coming soon)"
                  isChecked={false}
                  value=""
                  onChange={() => logger.warn("disabled")}
                  isDisabled={true}
                />
                {monitor?.notifications?.some(
                  (notification) => notification.type === "emails"
                ) ? (
                  <Box mx={`calc(${theme.gap.ml} * 2)`}>
                    <Field
                      id="notify-email-list"
                      type="text"
                      placeholder="name@gmail.com"
                      value=""
                      onChange={() => logger.warn("disabled")}
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
            <Stack
              className="config-box"
              direction="row"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="h2">Advanced settings</Typography>
              </Box>
              <Stack gap={theme.gap.xl}>
                <Select
                  id="monitor-interval-configure"
                  label="Check frequency"
                  value={monitor?.interval / MS_PER_MINUTE || 1}
                  onChange={(event) => handleChange(event, "interval")}
                  items={frequencies}
                />
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" mt="auto">
              <Button
                level="primary"
                label="Save"
                sx={{ px: theme.gap.large }}
                onClick={handleSubmit}
              />
            </Stack>
          </Stack>
        </>
      )}
      <Modal
        aria-labelledby="modal-delete-monitor"
        aria-describedby="delete-monitor-confirmation"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disablePortal
      >
        <Stack
          gap={theme.gap.xs}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "solid 1px #f2f2f2",
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-delete-monitor" component="h2">
            Do you really want to delete this monitor?
          </Typography>
          <Typography id="delete-monitor-confirmation">
            Once deleted, this monitor cannot be retrieved.
          </Typography>
          <Stack
            direction="row"
            gap={theme.gap.small}
            mt={theme.gap.large}
            justifyContent="flex-end"
          >
            <Button
              level="tertiary"
              label="Cancel"
              onClick={() => setIsOpen(false)}
            />
            <Button level="error" label="Delete" onClick={handleRemove} />
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default Configure;
