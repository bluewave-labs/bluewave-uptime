import { createTheme } from "@mui/material";
import { baseTheme } from "./globalTheme";
import { colors } from "./constants";

const text = {
	primary: "#fafafa",
	secondary: "#e6e6e6",
	tertiary: "#a1a1aa",
	accent: "#8e8e8f",
	disabled: "rgba(172, 172, 172, 0.3)",
};
const background = {
	main: "#151518",
	alt: "#09090b",
	fill: "#2D2D33",
	accent: "#18181a",
};
const border = { light: "#27272a", dark: "#36363e" };

const {
	primary,
	secondary,
	success,
	error,
	warning,
	gradient: {
		color1: { dark: color1 },
		color2: { dark: color2 },
		color3: { dark: color3 },
		color4: { dark: color4 },
		color5: { dark: color5 },
	},
} = colors;

const darkTheme = createTheme({
	...baseTheme,
	palette: {
		primary: { main: primary.main.dark },
		secondary: { main: secondary.main.dark },
		success: {
			main: success.main.dark,
			contrastText: success.contrastText.dark,
			light: success.light.dark,
			dark: success.dark.dark,
		},
		error: {
			main: error.main.dark,
			contrastText: error.contrastText.dark,
			light: error.light.dark,
			dark: error.dark.dark,
		},
		warning: {
			main: warning.main.dark,
			light: warning.light.dark,
			contrastText: warning.contrastText.dark,
			dark: warning.dark.dark,
		},
		percentage: {
			uptimePoor: "#d32f2f",
			uptimeFair: "#e88c30",
			uptimeGood: "#ffd600",
			uptimeExcellent: "#079455",
		},
		unresolved: { main: "#664eff", light: "#3a1bff", bg: "#f2f4f7" },
		divider: border.light,
		other: {
			icon: "#e6e6e6",
			line: "#27272a",
			fill: "#18181a",
			grid: "#454546",
			autofill: "#2d2d33",
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
			main: text.secondary,
			bg: background.main,
			light: background.main,
			border: border.light,
		},
	},
});

export default darkTheme;
