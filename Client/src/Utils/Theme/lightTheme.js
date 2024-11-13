import { createTheme } from "@mui/material";
import { baseTheme } from "./globalTheme";
import { colors } from "./constants";

/* 
Next step: check if all here are being used.

Check for Hex in code base

Check for px in codebase
*/

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
	background,
	text,
	border,
	unresolved,
	other,
} = colors;

const palette = {
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
	/* From this part on, try to create semantic structure, not feature based structure */
	percentage: {
		uptimePoor: error.main.light,
		uptimeFair: warning.contrastText.light,
		uptimeGood: warning.main.light /* Change for a success color? */,
		uptimeExcellent: success.contrastText.light,
	},
	unresolved: {
		main: unresolved.main.light,
		light: unresolved.light.light,
		bg: unresolved.bg.light,
	},
	divider: border.light.light,
	other: {
		icon: other.icon.light,
		line: other.line.light,
		fill: secondary.dark.light,
		grid: other.grid.light,
		autofill: other.autofill.light,
	},
	gradient: {
		color1,
		color2,
		color3,
		color4,
		color5,
	},
	text: {
		primary: text.primary.light,
		secondary: text.secondary.light,
		tertiary: text.tertiary.light,
		accent: text.accent.light,
	},
	background: {
		main: background.main.light,
		alt: background.alt.light,
		fill: background.fill.light,
		accent: background.accent.light,
	},
	border: {
		light: border.light.light,
		dark: border.dark.light,
	},
	info: {
		text: text.primary.light,
		main: text.tertiary.light,
		bg: background.main.light,
		light: background.main.light,
		border: border.dark.light,
	},
};

const lightTheme = createTheme({
	palette,
	...baseTheme(palette),
});

export default lightTheme;
