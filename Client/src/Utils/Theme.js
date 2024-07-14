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
const otherColorsSlateGray = "#667085";

//box shadow
const shadow =
  "0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

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
      slateGray: otherColorsSlateGray,
    },
  },
  font: {
    default: {
      font: fontFamilyDefault,
    },
  },
  shape: {
    borderRadius: 4,
    borderThick: 2,
    boxShadow: shadow,
  },
  content: {
    pX: "80px",
    pY: "40px",
  },
  gap: {
    xs: "4px",
    small: "8px",
    medium: "12px",
    ml: "16px",
    large: "24px",
    xl: "40px",
  },
  alert: {
    info: {
      color: secondaryMain,
      bg: otherColorsWhite,
      border: sectionBorder,
    },
    error: {
      color: "#d92d20",
      bg: "hsla(0, 100%, 52%, 0.03)",
      border: "#f04438",
    },
    warning: {
      color: "#DC6803",
      bg: "#fffcf5",
      border: "#fec84b",
    },
  },
});

export default theme;
