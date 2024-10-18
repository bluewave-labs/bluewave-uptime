import { createTheme } from "@mui/material";

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

const fontFamilyDefault =
	'"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow =
	"0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

const lightTheme = createTheme({
	typography: {
		fontFamily: fontFamilyDefault,
		fontSize: 13,
		h1: { fontSize: 22, color: text.primary, fontWeight: 500 },
		h2: { fontSize: 14.5, color: text.secondary, fontWeight: 400 },
		body1: { fontSize: 13, color: text.tertiary, fontWeight: 400 },
		body2: { fontSize: 12, color: text.tertiary, fontWeight: 400 },
	},
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
	spacing: 2,
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage:
						"radial-gradient(circle, #fcfcfd, #fdfcfd, #fdfdfd, #fefdfe, #fefefe, #fefefe, #fefefe, #fefefe, #fefdfe, #fdfdfd, #fdfcfd, #fcfcfd)",
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
								borderColor: theme.palette.border.light,
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
						backgroundColor: background.fill,
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
					backgroundColor: "#f2f4f7",
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

export default lightTheme;
