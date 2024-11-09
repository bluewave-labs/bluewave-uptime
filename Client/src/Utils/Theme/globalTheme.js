import { paletteLight, typographyLevels } from "./constants";

const fontFamilyPrimary = '"Inter" , sans-serif';
// const fontFamilySecondary = '"Avenir", sans-serif';

const shadow =
	"0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

const background = {
	main: "#FFFFFF",
	alt: "#FCFCFD",
	fill: "#F4F4F4",
	accent: "#f9fafb",
};

const border = { light: "#eaecf0", dark: "#d0d5dd" };

const text = {
	primary: "#1c2130",
	secondary: "#344054",
	tertiary: "#475467",
	accent: "#838c99",
};

const baseTheme = {
	/* TODO colors should not live here */
	typography: {
		fontFamily: fontFamilyPrimary,
		fontSize: 14,
		h1: {
			fontSize: typographyLevels.xl,
			color: paletteLight.text.primary,
			fontWeight: 500,
		},
		h2: {
			fontSize: typographyLevels.l,
			color: paletteLight.text.secondary,
			fontWeight: 400,
		},
		body1: {
			fontSize: typographyLevels.m,
			color: paletteLight.text.tertiary,
			fontWeight: 400,
		},
		body2: {
			fontSize: typographyLevels.s,
			color: paletteLight.text.tertiary,
			fontWeight: 400,
		},
	},
	/* TODO take chart from here, it should live inside of the gauge, and get info from the theme */
	chart: {
		header: {
			fontWeight: 400,
			fill: paletteLight.text.tertiary,
			fontSize: typographyLevels.m,
		},
		subheader: {
			fontWeight: 400,
			fill: paletteLight.text.tertiary,
			fontSize: typographyLevels.xs,
		},
	},
	spacing: 2,
	components: {
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
				root: ({ theme }) => ({
					backgroundColor: theme.palette.unresolved.bg,
				}),
			},
		},
	},
	shape: {
		borderRadius: 2,
		borderThick: 2,
		boxShadow: shadow,
	},
};

export { baseTheme };
