import PropTypes from "prop-types";
import { Stack, Typography, Grid } from "@mui/material";
import Button from "../../Components/Button";
import { useTheme } from "@emotion/react";
import Discord from "../../assets/icons/discord-icon.svg?react";
import Slack from "../../assets/icons/slack-icon.svg?react";
import Zapier from "../../assets/icons/zapier-icon.svg?react";

import "./index.css";

/**
 * Integrations component
 * @param {Object} props - Props for the IntegrationsComponent.
 * @param {string} props.icon - The icon for the integration image.
 * @param {string} props.header - The header for the integration.
 * @param {string} props.info - Information about the integration.
 * @param {Function} props.onClick - The onClick handler for the integration button.
 * @returns {JSX.Element} The JSX representation of the IntegrationsComponent.
 */
const IntegrationsComponent = ({ icon, header, info, onClick }) => {
  const theme = useTheme();

  return (
    <Grid item lg={6} flexGrow={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={theme.gap.large}
        p={theme.gap.ml}
        pl={theme.gap.large}
        height="100%"
      >
        {icon}
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
          disabled={true}
        />
      </Stack>
    </Grid>
  );
};

// PropTypes for IntegrationsComponent
IntegrationsComponent.propTypes = {
  icon: PropTypes.object.isRequired,
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
      icon: (
        <Slack
          alt="slack integration"
          style={{ width: "45px", height: "45px", alignSelf: "center" }}
        />
      ),
      header: "Slack",
      info: "Connect with Slack and see incidents in a channel",
      onClick: () => {},
    },
    {
      icon: (
        <Discord
          alt="discord integration"
          style={{ width: "42px", height: "42px", alignSelf: "center" }}
        />
      ),
      header: "Discord",
      info: "Connect with Discord and view incidents directly in a channel",
      onClick: () => {},
    },
    {
      icon: (
        <Zapier
          alt="zapier integration"
          style={{ width: "42px", height: "42px", alignSelf: "center" }}
        />
      ),
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
        Connect BlueWave Uptime to your favorite service.
      </Typography>
      <Grid container spacing={theme.gap.large}>
        {integrations.map((integration, index) => (
          <IntegrationsComponent
            key={index}
            icon={integration.icon}
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
