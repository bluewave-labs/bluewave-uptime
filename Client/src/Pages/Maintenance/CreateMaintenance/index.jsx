import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import Select from "../../../Components/Inputs/Select";
import Field from "../../../Components/Inputs/Field";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import "./index.css";

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
        <Box
          width="100%"
          p={theme.spacing(15)}
          border={1}
          borderColor={theme.palette.border.light}
          borderRadius={theme.shape.borderRadius}
          backgroundColor={theme.palette.background.main}
        ></Box>
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
