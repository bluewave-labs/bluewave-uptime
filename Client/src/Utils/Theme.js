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

//Section colros
const sectionBorder = "#D0D5DD";
const sectionBg = "#F8F9F8";
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
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
