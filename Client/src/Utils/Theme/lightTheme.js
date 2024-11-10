import { createTheme } from "@mui/material";
import { baseTheme } from "./globalTheme";
import { colors } from "./constants";

const text = {
	primary: "#1c2130",
	secondary: "#344054",
	tertiary: "#475467",
	accent: "#838c99",
};
const background = {
	main: "#FFFFFF",
	alt: "#FCFCFD",
	fill: "#F4F4F4",
	accent: "#f9fafb",
};

const border = { light: "#eaecf0", dark: "#d0d5dd" };

const {
	primary,
	secondary,
	success,
	error,
	warning,
	gradient: {
		color1: { light: color1 },
		color2: { light: color2 },
		color3: { light: color3 },
		color4: { light: color4 },
		color5: { light: color5 },
	},
} = colors;

const lightTheme = createTheme({
	...baseTheme,
	palette: {
		primary: { main: primary.main.light },
		secondary: {
			main: secondary.main.light,
			dark: secondary.dark.light,
			contrastText: secondary.constrastText.light,
		},
		success: {
			main: success.main.light,
			contrastText: success.contrastText.light,
			light: success.light.light,
			dark: success.dark.light,
		},
		error: {
			main: error.main.light,
			contrastText: error.contrastText.light,
			light: error.light.light,
			dark: error.dark.light,
		},
		warning: {
			main: warning.main.light,
			light: warning.light.light,
			contrastText: warning.contrastText.light,
			dark: warning.dark.light,
		},
		percentage: {
			uptimePoor: "#d32f2f",
			uptimeFair: "#ec8013",
			uptimeGood: "#ffb800",
			uptimeExcellent: "#079455",
		},
		unresolved: { main: "#4e5ba6", light: "#e2eaf7", bg: "#f2f4f7" },
		divider: border.light,
		other: {
			icon: "#667085",
			line: "#d6d9dd",
			fill: "#e3e3e3",
			grid: "#a2a3a3",
			autofill: "#e8f0fe",
		},
		gradient: {
			color1,
			color2,
			color3,
			color4,
			color5,
		},
		text: text,
		background: background,
		border: border,
		info: {
			text: text.primary,
			main: text.tertiary,
			bg: background.main,
			light: background.main,
			border: border.dark,
		},
	},
});

export default lightTheme;
