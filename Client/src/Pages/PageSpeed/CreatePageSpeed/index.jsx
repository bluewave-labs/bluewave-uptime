import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Button from "../../../Components/Button";
import Checkbox from "../../../Components/Inputs/Checkbox";
import "./index.css";

const CreatePageSpeed = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const frequencies = [
    { _id: 1, name: "1 minute" },
    { _id: 2, name: "2 minutes" },
    { _id: 3, name: "3 minutes" },
    { _id: 4, name: "4 minutes" },
    { _id: 5, name: "5 minutes" },
  ];

  return (
    <Box className="create-page-speed">
      <Stack gap={theme.gap.xl}>
        <IconButton
          aria-label="close modal"
          onClick={() => navigate("/page-speed")}
          sx={{
            p: "5px",
            opacity: 0.6,
            "&:focus": { outline: "none" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Stack gap={theme.gap.large}>
          <Typography component="h1">Create a page speed monitor</Typography>
          <Field
            type="text"
            id="monitor-name"
            label="Monitor friendly name"
            placeholder="Example monitor"
            value=""
            onChange={() => console.log("disabled")}
            error=""
          />
          <Field
            type="url"
            id="monitor-url"
            label="URL"
            placeholder="random.website.com"
            value=""
            onChange={() => console.log("disabled")}
            error=""
          />
          <Select
            id="monitor-frequency"
            label="Check frequency"
            items={frequencies}
            value={1}
            onChange={() => console.log("disabled")}
          />
        </Stack>
        <Stack gap={theme.gap.small}>
          <Typography component="h2">Incidents notifications</Typography>
          <Typography>When there is a new incident,</Typography>
          <Checkbox
            id="notify-sms"
            label="Notify via SMS (coming soon)"
            isChecked={false}
            isDisabled={true}
          />
          <Checkbox
            id="notify-email"
            label="Notify via email (to gorkem.cetin@bluewavelabs.ca)"
            isChecked={true}
          />
          <Checkbox
            id="notify-emails"
            label="Notify via email to following emails"
            isChecked={true}
          />
          <Box mx={`calc(${theme.gap.ml} * 2)`}>
            <Field
              id="notify-emails-list"
              placeholder="notifications@gmail.com"
              value=""
              onChange={() => console.log("disabled")}
              error=""
            />
            <Typography mt={theme.gap.small}>
              You can separate multiple emails with a comma
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap={theme.gap.small}>
          <Button level="tertiary" label="Cancel" />
          <Button level="primary" label="Create" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreatePageSpeed;
