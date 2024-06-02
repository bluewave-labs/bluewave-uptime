import { createTheme } from "@mui/material";

// Colors for MUI theme
const primaryMain = "#1570EF";
const secondaryMain = "#475467";
const tertiaryMain = "#475467";
const tertiaryLinkHover = "#eff8ff";

// Label Colors
const labelOrange = "#F79009";
const labelGray = "#475467";
const labelPurple = "#6941C6";
const labelGreen = "#067647";
const labelRed = "#F04438";

// Section colors
const sectionBorder = "#D0D5DD";
const sectionBg = "#F8F9F8";

// Other Colors
const otherColorsBlackish = "#101828";
const otherColorsBluishGray = "#344054";
const otherColorsGraishWhite = "#eaecf0";
const otherColorsPurple = "#7f56d9";
const otherColorsWhite = "#fff";
const otherColorsGraishWhiteLight = "#f2f2f2";
const otherColorsStrongBlue = "#f2f2f2";


// Global Font Family
const fontFamilyDefault = '"Roboto", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
    tertiary: {
      main: tertiaryMain,
      linkHover: tertiaryLinkHover,
    },
    labelOrange: {
      color: labelOrange,
    },
    labelGray: {
      color: labelGray,
    },
    labelPurple: {
      color: labelPurple,
    },
    labelGreen: {
      color: labelGreen,
    },
    labelRed: {
      color: labelRed,
    },
    section: {
      borderColor: sectionBorder,
      bgColor: sectionBg,
    },
    otherColors: {
      blackish: otherColorsBlackish,
      bluishGray: otherColorsBluishGray,
      graishWhite: otherColorsGraishWhite,
      purple: otherColorsPurple,
      white: otherColorsWhite,
      graishWhiteLight: otherColorsGraishWhiteLight,
      strongBlue: otherColorsStrongBlue,
    },
  },
  font :{
    default: {
      font: fontFamilyDefault,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
