import { createTheme } from "@mui/material";

const text = {
  primary: "#fafafa",
  secondary: "#e6e6e6",
  tertiary: "#a1a1aa",
  accent: "#e6e6e6",
  disabled: "rgba(172, 172, 172, 0.3)",
};
const background = {
  main: "#151518",
  alt: "#09090b",
  fill: "#2e2e2e",
  accent: "#18181a",
};
const border = { light: "#27272a", dark: "#2c2c2c" };

const fontFamilyDefault =
  '"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow =
  "0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

const darkTheme = createTheme({
  typography: { fontFamily: fontFamilyDefault, fontSize: 13 },
  palette: {
    mode: "dark",
    common: { main: "#1570ef" },
    text: text,
    background: background,
    border: border,
    info: {
      text: text.primary,
      main: text.primary,
      bg: background.main,
      light: background.main,
      border: border.light,
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
    divider: border.light,
    other: {
      icon: "#e6e6e6",
      line: "#27272a",
      fill: "#18181a",
      grid: "#454546",
    },
    // TO BE REMOVED //
    primary: {
      main: "#1570ef",
    },
    secondary: {
      main: "#e6e6e6",
    },
    tertiary: {
      main: "#e6e6e6",
    },
    // ----------------- //
  },
  spacing: 2,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 4,
          "&:hover": {
            backgroundColor: background.fill,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          marginTop: 4,
          padding: 0,
          border: 1,
          borderStyle: "solid",
          borderColor: border.light,
          borderRadius: 4,
          boxShadow: shadow,
          backgroundColor: background.main,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: "inherit",
          padding: "4px 6px",
          color: text.secondary,
          fontSize: 13,
          margin: 2,
          minWidth: 100,
          "&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible":
            {
              backgroundColor: background.fill,
            },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: border.light,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: background.accent,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          backgroundColor: background.main,
          border: 1,
          borderStyle: "solid",
          borderColor: border.light,
          "& button": {
            color: text.tertiary,
            borderRadius: 4,
          },
          "& li:first-of-type button, & li:last-of-type button": {
            border: 1,
            borderStyle: "solid",
            borderColor: border.light,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&:not(.MuiPaginationItem-ellipsis):hover, &.Mui-selected": {
            backgroundColor: background.fill,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 2,
    borderThick: 2,
    boxShadow: shadow,
  },
});

export default darkTheme;
