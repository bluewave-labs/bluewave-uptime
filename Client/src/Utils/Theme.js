import { createTheme } from "@mui/material";

//box shadow
const shadow =
  "0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

// Global Font Family
const fontFamilyDefault =
  '"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  typography: { fontFamily: fontFamilyDefault, fontSize: 13 },
  palette: {
    common: { main: "#1570ef" },
    text: {
      primary: "#1c2130",
      secondary: "#344054",
      tertiary: "#475467",
      accent: "#838c99",
    },
    background: {
      main: "#FFFFFF",
      alt: "#FCFCFD",
      fill: "#F4F4F4",
      accent: "#f9fafb",
    },
    border: { light: "#eaecf0", dark: "#d0d5dd" },
    info: {
      text: "#475467",
      main: "#475467",
      bg: "#ffffff",
      light: "#ffffff",
      border: "#D0D5DD",
    },
    success: {
      text: "#079455",
      main: "#17b26a",
      light: "#d4f4e1",
      bg: "#ecfdf3",
    },
    error: {
      text: "#f04438",
      main: "#d32f2f",
      light: "#fbd1d1",
      bg: "#f9eced",
      border: "#f04438",
    },
    warning: {
      text: "#DC6803",
      main: "#fdb022",
      light: "#fffcf5",
      bg: "#ffecbc",
      border: "#fec84b",
    },
    unresolved: { main: "#4e5ba6", light: "#e2eaf7", bg: "#f2f4f7" },
    other: {
      icon: "#667085",
      line: "#d6d9dd"
    },
    primary: {
      main: "#1570EF",
    },
    secondary: {
      main: "#475467",
    },
    tertiary: {
      main: "#475467",
    },
  },
  spacing: 2,
  components: {},
  shape: {
    borderRadius: 2,
    borderThick: 2,
    boxShadow: shadow,
  },
});

export const darkTheme = createTheme({
  typography: { fontFamily: fontFamilyDefault, fontSize: 13 },
  palette: {
    common: { main: "#1570ef" },
    text: {
      primary: "#fafafa",
      secondary: "#e6e6e6",
      tertiary: "#a1a1aa",
      accent: "#e6e6e6",
    },
    background: {
      main: "#151518",
      alt: "#09090b",
      fill: "#2e2e2e",
      accent: "#18181a",
    },
    border: { light: "#27272a", dark: "#2c2c2c" },
    info: {
      text: "#475467",
      main: "#475467",
      bg: "#ffffff",
      light: "#ffffff",
      border: "#D0D5DD",
    },
    success: {
      text: "#079455",
      main: "#45bb7a",
      light: "#93d5aa",
      bg: "#27272a",
    },
    error: {
      text: "#f04438",
      main: "#d32f2f",
      light: "#f04438",
      bg: "#27272a",
      border: "#f04438",
    },
    warning: {
      text: "#DC6803",
      main: "#e88c30",
      light: "#fffcf5",
      bg: "#ffecbc",
      border: "#fec84b",
    },
    unresolved: { main: "#4e5ba6", light: "#e2eaf7", bg: "#f2f4f7" },
    other: {
      icon: "#e6e6e6",
      line: "#27272a"
    },
    primary: {
      main: "#1570ef",
    },
    secondary: {
      main: "#e6e6e6",
    },
    tertiary: {
      main: "#e6e6e6",
    },
  },
  spacing: 2,
  components: {},
  shape: {
    borderRadius: 2,
    borderThick: 2,
    boxShadow: shadow,
  },
});

export default theme;
