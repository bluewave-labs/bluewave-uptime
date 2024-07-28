import { Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "@emotion/react";

import BWULogo from "../../assets/Images/bwl-logo.svg?react";
import Support from "../../assets/icons/support.svg?react";
import StatusPages from "../../assets/icons/status-pages.svg?react";
import Maintenance from "../../assets/icons/maintenance.svg?react";
import Monitors from "../../assets/icons/monitors.svg?react";
import Incidents from "../../assets/icons/incidents.svg?react";
import Integrations from "../../assets/icons/integrations.svg?react";
import PageSpeed from "../../assets/icons/page-speed.svg?react";
import Settings from "../../assets/icons/settings.svg?react";

import "./index.css";

/**
 * @component
 * Sidebar component serves as a sidebar containing a menu.
 *
 * @returns {JSX.Element} The JSX element representing the Sidebar component.
 */

const menu = [
  { name: "Monitors", path: "monitors", icon: <Monitors /> },
  { name: "Incidents", path: "incidents", icon: <Incidents /> },
  { name: "Status pages", path: "status", icon: <StatusPages /> },
  { name: "Maintenance", path: "maintenance", icon: <Maintenance /> },
  { name: "Page speed", path: "page-speed", icon: <PageSpeed /> },
  { name: "Integrations", path: "integrations", icon: <Integrations /> },
  { name: "Support", path: "support", icon: <Support /> },
  { name: "Settings", path: "settings", icon: <Settings /> },
];

function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack component="aside" gap={theme.gap.xs}>
      <BWULogo alt="BlueWave Uptime Logo" />
      {menu.map((item) => (
        <Stack
          className={
            location.pathname.includes(item.path) ? "selected-path" : ""
          }
          key={item.path}
          direction="row"
          alignItems="center"
          gap={theme.gap.small}
          borderRadius={`${theme.shape.borderRadius}px`}
          onClick={() => navigate(`/${item.path}`)}
          sx={{ p: `${theme.gap.small} ${theme.gap.medium}` }}
        >
          {item.icon}
          <Typography component="span">{item.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default Sidebar;
