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

const { gradient } = colors;
/* const gradient = {
	color1: "#09090b",
	color2: "#0c0c0e",
	color3: "#0f0f11",
	color4: "#111113",
	color5: "#131315",
}; */

const darkTheme = createTheme({
	...baseTheme,
	palette: {
		primary: { main: "#1570ef" },
		secondary: { main: "#2D2D33" },
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
		gradient,
		success: {
			text: "#079455",
			main: "#45bb7a",
			light: "#1c4428",
			bg: "#12261e",
		},
		error: {
			text: "#f04438",
			main: "#d32f2f",
			light: "#542426",
			bg: "#301a1f",
			dark: "#932020",
			border: "#f04438",
		},
		warning: {
			text: "#e88c30",
			main: "#FF9F00",
			light: "#624711",
			bg: "#262115",
			border: "#e88c30",
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
	},
});

export default darkTheme;
