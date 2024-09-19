import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import Select from "../../../Components/Inputs/Select";
import Field from "../../../Components/Inputs/Field";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import "./index.css";
import { ConfigBox } from "./styled";

const repeatConfig = [
  { _id: 0, name: "Don't repeat" },
  { _id: 1, name: "Repeat daily" },
  { _id: 2, name: "Repeat weekly" },
];

const durationConfig = [
  { _id: 0, name: "seconds" },
  { _id: 1, name: "minutes" },
  { _id: 2, name: "hours" },
  { _id: 3, name: "days" },
];

const periodConfig = [
  { _id: 0, name: "AM" },
  { _id: 1, name: "PM" },
];

const CreateMaintenance = () => {
  const theme = useTheme();

  return (
    <Box className="create-maintenance">
      <Breadcrumbs
        list={[
          { name: "mainteanance", path: "/maintenance" },
          { name: "create", path: `/maintenance/create` },
        ]}
      />
      <Stack
        component="form"
        noValidate
        spellCheck="false"
        gap={theme.spacing(12)}
        mt={theme.spacing(6)}
      >
        <Box>
          <Typography component="h1" variant="h1">
            <Typography component="span" fontSize="inherit">
              Create a{" "}
            </Typography>
            <Typography
              component="span"
              variant="h2"
              fontSize="inherit"
              fontWeight="inherit"
            >
              maintenance{" "}
            </Typography>
            <Typography component="span" fontSize="inherit">
              window
            </Typography>
          </Typography>
          <Typography component="h2" variant="body2" fontSize={14}>
            Your pings won't be sent during this time frame
          </Typography>
        </Box>
        <ConfigBox direction="row">
          <Typography component="h2" variant="h2">
            General Settings
          </Typography>
          <Box
            pl={theme.spacing(18)}
            pr={theme.spacing(8)}
            borderLeft={1}
            borderLeftColor={theme.palette.border.light}
          >
            <Select
              id="maintenance-repeat"
              label="Maintenance Repeat"
              value={0}
              items={repeatConfig}
            />
            <Box mt={theme.spacing(16)}>
              <Typography component="h3">Days</Typography>
            </Box>
          </Box>
        </ConfigBox>
        <ConfigBox>
          <Stack direction="row">
            <Box>
              <Typography component="h2" variant="h2">
                Start time
              </Typography>
              <Typography>
                All dates and times are in GMT+0 time zone.
              </Typography>
            </Box>
            <Stack direction="row">
              <Select id="maintenance-period" value={0} items={periodConfig} />
            </Stack>
          </Stack>
          <Stack direction="row">
            <Box>
              <Typography component="h2" variant="h2">
                Duration
              </Typography>
            </Box>
            <Stack direction="row">
              <Select id="maintenance-unit" value={0} items={durationConfig} />
            </Stack>
          </Stack>
        </ConfigBox>
        <Box>
          <Typography
            component="h2"
            variant="h2"
            fontSize={16}
            my={theme.spacing(6)}
          >
            Monitor related settings
          </Typography>
          <ConfigBox>
            <Stack direction="row">
              <Box>
                <Typography component="h2" variant="h2">
                  Friendly name
                </Typography>
              </Box>
              <Box>
                <Field
                  id="maintenance-name"
                  placeholder="Maintanence at __ : __ for ___ minutes"
                  value=""
                />
              </Box>
            </Stack>
            <Stack direction="row">
              <Typography component="h2" variant="h2">
                Add monitors
              </Typography>
            </Stack>
          </ConfigBox>
        </Box>
        <Box ml="auto" display="inline-block">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log("disabled")}
            sx={{ mr: theme.spacing(6) }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("disabled")}
            disabled={false}
          >
            Create window
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateMaintenance;
