import { createTheme } from "@mui/material";

const text = {
  primary: "#1c2130",
  secondary: "#344054",
  tertiary: "#475467",
  accent: "#838c99",
};
const background = {
  main: "#FFFFFF",
  alt: "#FCFCFD",
  fill: "#F4F4F4",
  accent: "#f9fafb",
};
const border = { light: "#eaecf0", dark: "#d0d5dd" };

const fontFamilyDefault =
  '"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow =
  "0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

const lightTheme = createTheme({
  typography: { fontFamily: fontFamilyDefault, fontSize: 13 },
  palette: {
    common: { main: "#1570ef" },
    text: text,
    background: background,
    border: border,
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
    divider: border.light,
    other: {
      icon: "#667085",
      line: "#d6d9dd",
      fill: "#e3e3e3",
    },
    // TO BE REMOVED //
    primary: {
      main: "#1570EF",
    },
    secondary: {
      main: "#475467",
    },
    tertiary: {
      main: "#475467",
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
          marginBottom: 0,
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

export default lightTheme;
