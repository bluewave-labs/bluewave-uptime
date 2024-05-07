import { createTheme } from "@mui/material";

// Colors for MUI theme
const primaryMain = "#1570EF";
const secondaryMain = "#475467";
const tertiaryMain = "#475467";

// Label Colors
const labelTextOrange = "#B93815";
const labelTextGray = "#475467";
const labelTextPurple = "#6941C6";
const labelTextGreen = "#067647";

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
    },
    labelOrange: {
      textColor: labelTextOrange,
    },
    labelGray: {
      textColor: labelTextGray,
    },
    labelPurple: {
      textColor: labelTextPurple,
    },
    labelGreen: {
      textColor: labelTextGreen,
    },
  },
});

export default theme;
