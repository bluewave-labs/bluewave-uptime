import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "../../Components/Button";
import Field from "../../Components/Inputs/Field";
import Link from "../../Components/Link";
import Select from "../../Components/Inputs/Select";

import "./index.css";

const Settings = () => {
  const theme = useTheme();

  return (
    <Box
      className="settings"
      style={{
        paddingBottom: 0,
      }}
    >
      <form className="settings-form" noValidate spellCheck="false">
        <Stack
          className="config-box"
          direction="row"
          justifyContent="space-between"
          gap={theme.gap.xxl}
        >
          <Box>
            <Typography component="h1">General Settings</Typography>
            <Typography sx={{ mt: theme.gap.small, mb: theme.gap.xs }}>
              <Typography component="span">Display timezone</Typography>- The
              timezone of the dashboard you publicly display.
            </Typography>
            <Typography>
              <Typography component="span">Server timezone</Typography>- The
              timezone of your server.
            </Typography>
          </Box>
          <Stack gap={theme.gap.xl}>
            <Select
              id="display-timezone"
              label="Display timezone"
              value="est"
              onChange={() => console.log("disabled")}
              items={[{ _id: "est", name: "America / Toronto" }]}
            />
            <Select
              id="server-timezone"
              label="Server timezone"
              value="est"
              onChange={() => console.log("disabled")}
              items={[{ _id: "est", name: "America / Toronto" }]}
            />
          </Stack>
        </Stack>
        <Stack
          className="config-box"
          direction="row"
          justifyContent="space-between"
          gap={theme.gap.xxl}
        >
          <Box>
            <Typography component="h1">History and monitoring</Typography>
            <Typography sx={{ mt: theme.gap.small }}>
              Define here for how long you want to keep the data. You can also
              remove all past data.
            </Typography>
          </Box>
          <Stack gap={theme.gap.xl}>
            <Field
              type="text"
              id="history-monitoring"
              label="The days you want to keep monitoring history."
              isOptional={true}
              optionalLabel="0 for infinite"
              placeholder="90"
              value=""
              onChange={() => console.log("Disabled")}
            />
            <Box>
              <Typography>Clear all stats. This is irreversible.</Typography>
              <Button
                level="error"
                label="Clear all stats"
                sx={{ mt: theme.gap.small }}
              />
            </Box>
          </Stack>
        </Stack>
        <Stack
          className="config-box"
          direction="row"
          justifyContent="space-between"
          gap={theme.gap.xxl}
        >
          <Box>
            <Typography component="h1">About</Typography>
          </Box>
          <Box>
            <Typography component="h2">BlueWave Uptime v1.0.0</Typography>
            <Typography
              sx={{ mt: theme.gap.xs, mb: theme.gap.medium, opacity: 0.6 }}
            >
              Developed by Bluewave Labs.
            </Typography>
            <Link
              level="secondary"
              url="https://github.com/bluewave-labs"
              label="https://github.com/bluewave-labs"
            />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button level="primary" label="Save" sx={{ px: theme.gap.large }} />
        </Stack>
      </form>
    </Box>
  );
};

export default Settings;
