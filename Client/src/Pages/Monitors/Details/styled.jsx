import { Box, styled } from "@mui/material";

export const ChartBox = styled(Box)(({ theme }) => ({
  flex: "1 30%",
  height: 300,
  minWidth: 250,
  padding: theme.spacing(8),
  border: 1,
  borderStyle: "solid",
  borderColor: theme.palette.border.light,
  borderRadius: 4,
  backgroundColor: theme.palette.background.main,
  "& h2": {
    color: theme.palette.text.secondary,
    fontSize: 15,
  },
  "& p": {
    color: theme.palette.text.tertiary,
    fontSize: 13,
  },
  "& span": {
    color: theme.palette.text.primary,
    fontSize: 20,
    "& span": {
      opacity: 0.8,
      marginLeft: 2,
      fontSize: 15,
    },
  },
  "& .MuiStack-root": {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(6),
  },
  "& > .MuiBox-root:not(:first-of-type)": {
    marginTop: theme.spacing(8),
  },
}));

export const IconBox = styled(Box)(({ theme }) => ({
  height: 34,
  minWidth: 34,
  width: 34,
  position: "relative",
  border: 1,
  borderStyle: "solid",
  borderColor: theme.palette.border.dark,
  borderRadius: 4,
  backgroundColor: theme.palette.background.accent,
  "& svg": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 20,
    height: 20,
    "& path": {
      stroke: theme.palette.text.tertiary,
    },
  },
}));
