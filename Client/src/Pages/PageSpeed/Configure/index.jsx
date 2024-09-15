import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  deletePageSpeed,
  getPagespeedMonitorById,
  getPageSpeedByTeamId,
  updatePageSpeed,
  pausePageSpeed,
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
import LoadingButton from "@mui/lab/LoadingButton";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import SkeletonLayout from "./skeleton";
import "./index.css";
import useUtils from "../../Monitors/utils";

const PageSpeedConfigure = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MS_PER_MINUTE = 60000;
  const { authToken } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.pageSpeedMonitors);
  const { monitorId } = useParams();
  const [monitor, setMonitor] = useState({});
  const [errors, setErrors] = useState({});
  const { determineState, statusColor } = useUtils();

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
    const fetchMonitor = async () => {
      try {
        const action = await dispatch(
          getPagespeedMonitorById({ authToken, monitorId })
        );

        if (getPagespeedMonitorById.fulfilled.match(action)) {
          const monitor = action.payload.data;
          setMonitor(monitor);
        } else if (getPagespeedMonitorById.rejected.match(action)) {
          throw new Error(action.error.message);
        }
      } catch (error) {
        logger.error("Error fetching monitor of id: " + monitorId);
        navigate("/not-found", { replace: true });
      }
    };
    fetchMonitor();
  }, [dispatch, authToken, monitorId, navigate]);

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

  const handlePause = async () => {
    try {
      const action = await dispatch(pausePageSpeed({ authToken, monitorId }));
      if (pausePageSpeed.fulfilled.match(action)) {
        const monitor = action.payload.data;
        setMonitor(monitor);
      } else if (pausePageSpeed.rejected.match(action)) {
        throw new Error(action.error.message);
      }
    } catch (error) {
      logger.error("Error pausing monitor: " + monitorId);
      createToast({ body: "Failed to pause monitor" });
    }
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

  return (
    <Stack className="configure-pagespeed" gap={theme.spacing(12)}>
      {Object.keys(monitor).length === 0 ? (
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
              <PulseDot color={statusColor[determineState(monitor)]} />
              <Box>
                <Typography component="h1" variant="h1" mb={theme.spacing(2)}>
                  {monitor?.url}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: statusColor[determineState(monitor)],
                  }}
                >
                  Your pagespeed monitor is {determineState(monitor)}.
                </Typography>
              </Box>
              <Box alignSelf="flex-end" ml="auto">
                <LoadingButton
                  onClick={handlePause}
                  loading={isLoading}
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
                  {monitor?.isActive ? (
                    <>
                      <PauseCircleOutlineIcon />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayCircleOutlineRoundedIcon />
                      Resume
                    </>
                  )}
                </LoadingButton>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  color="error"
                  onClick={() => setIsOpen(true)}
                  sx={{
                    ml: theme.spacing(6),
                  }}
                >
                  Remove
                </LoadingButton>
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
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ px: theme.spacing(12) }}
              >
                Save
              </LoadingButton>
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
            variant="h2"
          >
            Do you really want to delete this monitor?
          </Typography>
          <Typography
            id="delete-pagespeed-monitor-confirmation"
            variant="body1"
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
