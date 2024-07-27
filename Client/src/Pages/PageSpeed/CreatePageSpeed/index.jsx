import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import "./index.css";
import { useNavigate } from "react-router";
import Field from "../../../Components/Inputs/Field";
import Select from "../../../Components/Inputs/Select";
import Button from "../../../Components/Button";
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h1">Create a page speed monitor</Typography>
          <IconButton
            aria-label="close modal"
            onClick={() => navigate("/page-speed")}
            sx={{
              p: "2px",
              mr: "-2px",
              "&:focus": { outline: "none" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Stack gap={theme.gap.large}>
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
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          gap={theme.gap.small}
          mb={theme.gap.large}
        >
          <Button level="tertiary" label="Cancel" />
          <Button level="primary" label="Create" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreatePageSpeed;
