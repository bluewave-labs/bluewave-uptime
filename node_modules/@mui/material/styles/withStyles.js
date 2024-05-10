import _formatMuiErrorMessage from "@mui/utils/formatMuiErrorMessage";
export default function withStyles() {
  throw new Error(process.env.NODE_ENV !== "production" ? `MUI: withStyles is no longer exported from @mui/material/styles.
You have to import it from @mui/styles.
See https://mui.com/r/migration-v4/#mui-material-styles for more details.` : _formatMuiErrorMessage(15));
}