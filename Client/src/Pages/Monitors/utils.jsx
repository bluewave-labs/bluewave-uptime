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
			background: `linear-gradient(340deg, ${theme.palette.success.light} -60%, ${theme.palette.success.bg} 35%)`,
			borderColor: theme.palette.success.light,
			"& h2": { color: theme.palette.success.main },
		},
		down: {
			backgroundColor: theme.palette.error.bg,
			background: `linear-gradient(340deg, ${theme.palette.error.light} -60%, ${theme.palette.error.bg} 35%)`,
			borderColor: theme.palette.error.light,
			"& h2": { color: theme.palette.error.main },
		},
		paused: {
			backgroundColor: theme.palette.warning.bg,
			background: `linear-gradient(340deg, ${theme.palette.warning.light} -60%, ${theme.palette.warning.bg} 35%)`,
			borderColor: theme.palette.warning.light,
			"& h2": { color: theme.palette.warning.main },
		},
		pending: {
			backgroundColor: theme.palette.warning.light,
			background: `linear-gradient(340deg, ${theme.palette.warning.dark} -60%, ${theme.palette.warning.light} 35%)`,
			borderColor: theme.palette.warning.dark,
			"& h2": { color: theme.palette.warning.main },
		},
	};
	const pagespeedStyles = {
		up: {
			bg: theme.palette.success.bg,
			light: theme.palette.success.light,
			stroke: theme.palette.success.main,
		},
		down: {
			bg: theme.palette.error.bg,
			light: theme.palette.error.light,
			stroke: theme.palette.error.main,
		},
		paused: {
			bg: theme.palette.warning.bg,
			light: theme.palette.warning.light,
			stroke: theme.palette.warning.main,
		},
		pending: {
			bg: theme.palette.warning.bg,
			light: theme.palette.warning.light,
			stroke: theme.palette.warning.main,
		},
	};

	return {
		determineState,
		statusColor,
		statusMsg,
		pagespeedStatusMsg,
		pagespeedStyles,
		statusStyles,
	};
};

export default useUtils;
