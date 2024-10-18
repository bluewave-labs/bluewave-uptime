import { createTheme } from "@mui/material";

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

const fontFamilyDefault =
	'"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow =
	"0px 4px 24px -4px rgba(255, 255, 255, 0.03), 0px 3px 3px -3px rgba(255, 255, 255, 0.01)";

const darkTheme = createTheme({
	typography: {
		fontFamily: fontFamilyDefault,
		fontSize: 13,
		h1: { fontSize: 22, color: text.primary, fontWeight: 500 },
		h2: { fontSize: 14.5, color: text.secondary, fontWeight: 400 },
		body1: { fontSize: 13, color: text.tertiary, fontWeight: 400 },
		body2: { fontSize: 12, color: text.tertiary, fontWeight: 400 },
	},
	palette: {
		mode: "dark",
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
	spacing: 2,
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage:
						"radial-gradient(circle, #09090b, #0c0c0e, #0f0f11, #111113, #131315, #131315, #131315, #131315, #111113, #0f0f11, #0c0c0e, #09090b)",
					lineHeight: "inherit",
					paddingLeft: "calc(100vw - 100%)",
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: ({ theme }) => ({
					variants: [
						{
							props: (props) => props.variant === "group",
							style: {
								color: theme.palette.secondary.contrastText,
								backgroundColor: theme.palette.background.main,
								border: 1,
								borderStyle: "solid",
								borderColor: theme.palette.border.light,
							},
						},
						{
							props: (props) => props.variant === "group" && props.filled === "true",
							style: {
								backgroundColor: theme.palette.secondary.main,
							},
						},
						{
							props: (props) =>
								props.variant === "contained" && props.color === "secondary",
							style: {
								border: 1,
								borderStyle: "solid",
								borderColor: theme.palette.border.dark,
							},
						},
					],
					fontWeight: 400,
					borderRadius: 4,
					boxShadow: "none",
					textTransform: "none",
					"&:focus": {
						outline: "none",
					},
					"&:hover": {
						boxShadow: "none",
					},
				}),
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: 4,
					transition: "none",
					"&:hover": {
						backgroundColor: border.light,
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					marginTop: 4,
					padding: 0,
					border: 1,
					borderStyle: "solid",
					borderColor: border.light,
					borderRadius: 4,
					boxShadow: shadow,
					backgroundColor: background.main,
					backgroundImage: "none",
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					transition: "none",
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					backgroundColor: "inherit",
					padding: "4px 6px",
					color: text.secondary,
					fontSize: 13,
					margin: 2,
					minWidth: 100,
					"&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible":
						{
							backgroundColor: background.fill,
						},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottomColor: border.light,
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: background.accent,
				},
			},
		},
		MuiPagination: {
			styleOverrides: {
				root: {
					backgroundColor: background.main,
					border: 1,
					borderStyle: "solid",
					borderColor: border.light,
					"& button": {
						color: text.tertiary,
						borderRadius: 4,
					},
					"& li:first-of-type button, & li:last-of-type button": {
						border: 1,
						borderStyle: "solid",
						borderColor: border.light,
					},
				},
			},
		},
		MuiPaginationItem: {
			styleOverrides: {
				root: {
					"&:not(.MuiPaginationItem-ellipsis):hover, &.Mui-selected": {
						backgroundColor: background.fill,
					},
				},
			},
		},
		MuiSkeleton: {
			styleOverrides: {
				root: {
					backgroundColor: "#151518",
				},
			},
		},
	},
	shape: {
		borderRadius: 2,
		borderThick: 2,
		boxShadow: shadow,
	},
});

export default darkTheme;
