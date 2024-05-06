import { createTheme } from "@mui/material";

// Colors for MUI theme
const secondaryMain = "#475467";
const tertiaryMain = "#475467";

const theme = createTheme({
  palette: {
    secondary: {
      main: secondaryMain,
    },
    tertiary: {
      main: tertiaryMain,
    },
  },
});

export default theme;
