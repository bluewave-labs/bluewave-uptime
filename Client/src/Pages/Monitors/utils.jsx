import { useTheme } from "@mui/material";

const useUtils = () => {
  const theme = useTheme();
  const determineState = (monitor) => {
    if (monitor.isActive === false) return "paused";
    if (monitor?.status === undefined) return "pending";
    return monitor?.status == true ? "up" : "down";
  };

  const statusColor = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
    paused: theme.palette.warning.main,
    pending: theme.palette.warning.main,
  };

  const statusMsg = {
    up: "Your site is up.",
    down: "Your site is down.",
    paused: "Pending...",
  };

  const pagespeedStatusMsg = {
    up: "Live (collecting data)",
    down: "Inactive",
    paused: "Paused",
  };
  const statusStyles = {
    up: {
      backgroundColor: theme.palette.success.bg,
      borderColor: theme.palette.success.light,
      "& h2": { color: theme.palette.success.main },
    },
    down: {
      backgroundColor: theme.palette.error.bg,
      borderColor: theme.palette.error.light,
      "& h2": { color: theme.palette.error.main },
    },
    paused: {
      backgroundColor: theme.palette.warning.light,
      borderColor: theme.palette.warning.border,
      "& h2": { color: theme.palette.warning.main },
    },
    pending: {
      backgroundColor: theme.palette.warning.light,
      borderColor: theme.palette.warning.border,
      "& h2": { color: theme.palette.warning.main },
    },
  };

  return {
    determineState,
    statusColor,
    statusMsg,
    pagespeedStatusMsg,
    statusStyles,
  };
};

export default useUtils;
