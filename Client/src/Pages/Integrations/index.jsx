import PropTypes from "prop-types";
import { Stack, Box, Typography, Grid } from "@mui/material";
import Button from "../../Components/Button";
import { useTheme } from "@emotion/react";

import "./index.css";

/**
 * Integrations component
 * @param {Object} props - Props for the IntegrationsComponent.
 * @param {string} props.url - The URL for the integration image.
 * @param {string} props.header - The header for the integration.
 * @param {string} props.info - Information about the integration.
 * @param {Function} props.onClick - The onClick handler for the integration button.
 * @returns {JSX.Element} The JSX representation of the IntegrationsComponent.
 */
const IntegrationsComponent = ({ url, header, info, onClick }) => {
  const theme = useTheme();

  return (
    <Grid item lg={6} flexGrow={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={theme.gap.large}
        p={theme.gap.ml}
      >
        <Box
          component="img"
          src={url}
          alt="Integration"
          width={80}
          height={80}
        />
        <Stack gap={theme.gap.xs} flex={1}>
          <Typography component="h1">{header}</Typography>
          <Typography
            sx={{
              maxWidth: "300px",
              wordWrap: "break-word",
            }}
          >
            {info}
          </Typography>
        </Stack>
        <Button
          label="Add"
          level="primary"
          onClick={onClick}
          sx={{ alignSelf: "center" }}
        />
      </Stack>
    </Grid>
  );
};

// PropTypes for IntegrationsComponent
IntegrationsComponent.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * Integrations Page Component
 * @returns {JSX.Element} The JSX representation of the Integrations page.
 */

const Integrations = () => {
  const theme = useTheme();

  const integrations = [
    {
      url: "https://via.placeholder.com/80",
      header: "Slack",
      info: "Connect with Slack and see incidents in a channel",
      onClick: () => {},
    },
    {
      url: "https://via.placeholder.com/80",
      header: "Discord",
      info: "Connect with Discord and view incidents directly in a channel",
      onClick: () => {},
    },
    {
      url: "https://via.placeholder.com/80",
      header: "Zapier",
      info: "Send all incidents to Zapier, and then see them everywhere",
      onClick: () => {},
    },
    // Add more integrations as needed
  ];

  return (
    <Stack className="integrations" gap={theme.gap.xs}>
      <Typography component="h1">Integrations</Typography>
      <Typography mb={theme.gap.large}>
        Connect Uptime Genie to your favorite service
      </Typography>
      <Grid container spacing={theme.gap.large}>
        {integrations.map((integration, index) => (
          <IntegrationsComponent
            key={index}
            url={integration.url}
            header={integration.header}
            info={integration.info}
            onClick={integration.onClick}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default Integrations;
