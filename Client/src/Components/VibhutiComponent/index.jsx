import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
/**
 * @component
 * @param {'success' | 'info' | 'warning' | 'error'} props.severity - epresenting different states with corresponding icon and color combinations for each
 * @param {string} props.title - Title of the announcement
 * @param {string} props.message - message in your announcement
 */
function FirstComponent({ severity, title, message }) {
  return (
    <Alert
      severity={severity}
      onClose={() => {
        console.log("Close the dialog");
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
      <Stack spacing={0} direction="row">
        <Button
          color="secondary"
          variant="text"
          onClick={() => {
            console.log("Dismiss");
          }}
        >
          Dismiss
        </Button>
        <Button
          color="primary"
          variant="text"
          onClick={() => {
            console.log("view changes");
          }}
        >
          View Changes
        </Button>
      </Stack>
    </Alert>
  );
}
FirstComponent.propTypes = {
  severity: PropTypes.oneOf(["success", "info", "warning", "error"]).isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};
export default FirstComponent;
