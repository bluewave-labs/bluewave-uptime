import { createTheme } from "@mui/material";

// Colors for MUI theme
const secondaryMain = "#475467";
const tertiaryMain = "#475467";
const tertiaryLinkHover = "#eff8ff";

const theme = createTheme({
  palette: {
    secondary: {
      main: secondaryMain,
    },
    tertiary: {
      main: tertiaryMain,
      linkHover: tertiaryLinkHover,
    },
  },
});

export default theme;
