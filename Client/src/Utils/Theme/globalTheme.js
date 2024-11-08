import { paletteLight, typographyLevels } from "./constants";

const fontFamilyPrimary = '"Inter" , sans-serif';
// const fontFamilySecondary = '"Avenir", sans-serif';

const baseTheme = {
	typography: {
		fontFamily: fontFamilyPrimary,
		fontSize: typographyLevels.m,
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
};

export { baseTheme };
