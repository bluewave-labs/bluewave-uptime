const typographyBase = 14;
const typographyLevels = {
	base: typographyBase,
	xs: `${(typographyBase - 4) / 16}rem`,
	s: `${(typographyBase - 2) / 16}rem`,
	m: `${typographyBase / 16}rem`,
	l: `${(typographyBase + 2) / 16}rem`,
	xl: `${(typographyBase + 10) / 16}rem`,
};

/* This should not be here. INcorporate into color structure */
const paletteLight = {
	text: {
		primary: "#1c2130",
		secondary: "#344054",
		tertiary: "#475467",
		accent: "#838c99",
	},
};

/* TODO Expand this */

const paletteColors = {
	white: "#FFFFFF",
	gray50: "#FEFEFE",
	gray60: "#FEFDFE",
	gray70: "#FDFDFD",
	gray80: "#FDFCFD",
	gray90: "#FCFCFD",
	gray100: "#F4F4F4",
	gray200: "#E3E3E3",
	gray800: "#2D2D33",
	gray830: "#262115",
	gray850: "#131315",
	gray860: "#111113",
	gray870: "#0F0F11",
	gray880: "#0C0C0E",
	gray890: "#09090B",
	black: "#000000",
	blueBlueWave: "#1570EF",
	blue700: "#475467",
	green20: "#ECFDF3",
	green50: "#D4F4E1",
	green150: "#45BB7A",
	green200: "#17B26A",
	green400: "#079455",
	green800: "#1C4428",
	green900: "#12261E",
	red50: "#F9ECED",
	red100: "#FBD1D1",
	red200: "#F04438",
	red300: "#D32F2F",
	red700: "#542426",
	red800: "#301A1F",
	orange50: "#FEF8EA",
	orange100: "#FFECBC",
	orange200: "#FEC84B",
	orange300: "#FDB022",
	orange400: "#FF9F00",
	orange500: "#E88C30",
	orange600: "#DC6803",
	orange800: "#624711",
};

const semanticColors = {
	primary: {
		main: {
			light: paletteColors.blueBlueWave,
			dark: paletteColors.blueBlueWave,
		},
		// TODO we dont have primary light, dark or contrast text
	},
	secondary: {
		main: {
			light: paletteColors.gray100,
			dark: paletteColors.gray800,
		},
		// TODO we dont have secondary light
		dark: {
			light: paletteColors.gray200,
			//TODO we dont have secondary dark for dark mode
		},
		constrastText: {
			light: paletteColors.blue700,
			//TODO we dont have secondary contrastText for dark mode
		},
	},
	success: {
		main: {
			light: paletteColors.green200,
			dark: paletteColors.green150,
		},
		contrastText: {
			//TODO values are equal (confirm)
			//TODO contrasttext semantically should be something that contrasts with the main
			light: paletteColors.green400,
			dark: paletteColors.green400,
		},
		light: {
			light: paletteColors.green50,
			//TODO dark mode light success is darker than the main success
			dark: paletteColors.green800,
		},
		dark: {
			light: paletteColors.green20,
			dark: paletteColors.green900,
		},
	},
	error: {
		main: {
			light: paletteColors.red300,
			dark: paletteColors.red300,
		},
		contrastText: {
			//TODO contrasttext semantically should be something that contrasts with the main
			light: paletteColors.red200,
			dark: paletteColors.red200,
		},
		light: {
			light: paletteColors.red100,
			dark: paletteColors.red700,
		},
		dark: {
			light: paletteColors.red50,
			dark: paletteColors.red800,
		},
	},
	warning: {
		main: {
			light: paletteColors.orange300,
			dark: paletteColors.orange400,
		},
		text: {
			light: paletteColors.orange600,
			dark: paletteColors.orange500,
		},
		light: {
			light: paletteColors.orange100,
			dark: paletteColors.orange800,
		},
		bg: {
			light: paletteColors.orange50,
			dark: paletteColors.gray830,
		},
		border: {
			light: paletteColors.orange200,
			dark: paletteColors.orange500,
		},
	},

	gradient: {
		color1: {
			light: paletteColors.gray90,
			dark: paletteColors.gray890,
		},
		color2: {
			light: paletteColors.gray80,
			dark: paletteColors.gray880,
		},
		color3: {
			light: paletteColors.gray70,
			dark: paletteColors.gray870,
		},
		color4: {
			light: paletteColors.gray60,
			dark: paletteColors.gray860,
		},
		color5: {
			light: paletteColors.gray50,
			dark: paletteColors.gray850,
		},
	},
};
export { typographyLevels, paletteLight, semanticColors as colors };
