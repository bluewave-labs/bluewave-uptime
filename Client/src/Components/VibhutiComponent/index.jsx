import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function VibhutiComponent() {
  return (
    <Alert severity="info" onClose={() => {}}>
      <AlertTitle>We've just released a new feature</AlertTitle>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      <Stack spacing={0} direction="row">
        <Button color="secondary" variant="text">
          Dismiss
        </Button>
        <Button color="primary" variant="text">
          View Changes
        </Button>
      </Stack>
    </Alert>
  );
}
export default VibhutiComponent;
