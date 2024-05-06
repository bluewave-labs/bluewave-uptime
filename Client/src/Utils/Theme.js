import { createTheme } from "@mui/material";

// Colors for MUI theme
const secondaryMain = "#475467";
const tertiaryMain = "#475467";

// Label Colors
const labelBorderOrange = "#F9DBAF";
const labelBgOrange = "#FEF6EE";
const labelTextOrange = "#B93815";

const labelBorderGray = "#EAECF0";
const labelBgGray = "#F9FAFB";
const labelTextGray = "#344054";

const labelBorderPurple = "#E9D7FE";
const labelBgPurple = "#F9F5FF";
const labelTextPurple = "#6941C6";

const labelBorderGreen = "#AAEFC6";
const labelBgGreen = "#ECFDF3";
const labelTextGreen = "#067647";

const theme = createTheme({
  palette: {
    secondary: {
      main: secondaryMain,
    },
    tertiary: {
      main: tertiaryMain,
    },
    labelOrange: {
      borderColor: labelBorderOrange,
      bgColor: labelBgOrange,
      textColor: labelTextOrange,
    },
    labelGray: {
      borderColor: labelBorderGray,
      bgColor: labelBgGray,
      textColor: labelTextGray,
    },
    labelPurple: {
      borderColor: labelBorderPurple,
      bgColor: labelBgPurple,
      textColor: labelTextPurple,
    },
    labelGreen: {
      borderColor: labelBorderGreen,
      bgColor: labelBgGreen,
      textColor: labelTextGreen,
    },
  },
});

export default theme;
