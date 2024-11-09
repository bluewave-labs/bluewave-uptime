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

const { gradient } = colors;
/* const gradient = {
	color1: "#fcfcfd",
	color2: "#fdfcfd",
	color3: "#fdfdfd",
	color4: "#fefdfe",
	color5: "#fefefe",
}; */

const border = { light: "#eaecf0", dark: "#d0d5dd" };

const lightTheme = createTheme({
	...baseTheme,
	palette: {
		primary: { main: "#1570EF" },
		secondary: { main: "#F4F4F4", dark: "#e3e3e3", contrastText: "#475467" },
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
		gradient,
		success: {
			text: "#079455",
			main: "#17b26a",
			light: "#d4f4e1",
			bg: "#ecfdf3",
		},
		error: {
			text: "#f04438",
			main: "#d32f2f",
			light: "#fbd1d1",
			bg: "#f9eced",
			border: "#f04438",
		},
		warning: {
			text: "#DC6803",
			main: "#fdb022",
			light: "#ffecbc",
			bg: "#fef8ea",
			border: "#fec84b",
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
	},
});

export default lightTheme;
