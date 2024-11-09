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
	gray850: "#131315",
	gray860: "#111113",
	gray870: "#0F0F11",
	gray880: "#0C0C0E",
	gray890: "#09090B",
	black: "#000000",
};

/* TODO Export this as colors */
/*  primary: {
    main: {
      light:,
      dark:
    },
    light:{
      light:,
      dark:
    },
    dark:{
      light:,
      dark:
    },
    contrastText: {
      light:,
      dark:
    },
  } */
const semanticColors = {
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
