import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState } from "../../Features/Auth/authSlice";
import { clearUptimeMonitorState } from "../../Features/UptimeMonitors/uptimeMonitorsSlice";
import Avatar from "../Avatar";
import LockSvg from "../../assets/icons/lock.svg?react";
import UserSvg from "../../assets/icons/user.svg?react";
import TeamSvg from "../../assets/icons/user-two.svg?react";
import LogoutSvg from "../../assets/icons/logout.svg?react";
import BWULogo from "../../assets/Images/bwl-logo.svg?react";
import Support from "../../assets/icons/support.svg?react";
import StatusPages from "../../assets/icons/status-pages.svg?react";
import Maintenance from "../../assets/icons/maintenance.svg?react";
import Monitors from "../../assets/icons/monitors.svg?react";
import Incidents from "../../assets/icons/incidents.svg?react";
import Integrations from "../../assets/icons/integrations.svg?react";
import PageSpeed from "../../assets/icons/page-speed.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import Arrow from "../../assets/icons/down-arrow.svg?react";

import "./index.css";

const menu = [
  { name: "Monitors", path: "monitors", icon: <Monitors /> },
  { name: "Incidents", path: "incidents", icon: <Incidents /> },
  { name: "Status pages", path: "status", icon: <StatusPages /> },
  { name: "Maintenance", path: "maintenance", icon: <Maintenance /> },
  { name: "Page speed", path: "pagespeed", icon: <PageSpeed /> },
  { name: "Integrations", path: "integrations", icon: <Integrations /> },
];

const other = [
  { name: "Support", path: "support", icon: <Support /> },
  { name: "Settings", path: "settings", icon: <Settings /> },
];

const icons = {
  Profile: <UserSvg />,
  Team: <TeamSvg />,
  Password: <LockSvg />,
  Logout: <LogoutSvg />,
};

/**
 * @component
 * Sidebar component serves as a sidebar containing a menu.
 *
 * @returns {JSX.Element} The JSX element representing the Sidebar component.
 */

function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const authState = useSelector((state) => state.auth);

  // Initialize settings and update based on user role
  let settings = ["Profile", "Password", "Team", "Logout"];
  if (authState.user?.role && !authState.user.role.includes("admin")) {
    settings = ["Profile", "Password", "Logout"];
  }

  /**
   * Handles opening the user menu.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The event triggered by clicking the user menu button.
   */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Handles logging out the user
   *
   */
  const logout = async () => {
    // Clear auth state
    dispatch(clearAuthState());
    dispatch(clearUptimeMonitorState());
    navigate("/login");
  };

  /**
   * Handles closing the user menu.
   */
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    switch (setting) {
      case "Profile":
        navigate("/account/profile");
        break;
      case "Team":
        navigate("/account/team");
        break;
      case "Password":
        navigate("/account/password");
        break;
      case "Logout":
        logout();
        break;
      default:
        break;
    }
  };

  return (
    <Stack component="aside" gap={theme.gap.large}>
      <Box pt={theme.gap.large} pl={theme.gap.ml} pb={theme.gap.xs}>
        <BWULogo alt="BlueWave Uptime Logo" />
      </Box>
      {/* menu */}
      <List
        component="nav"
        aria-labelledby="nested-menu-subheader"
        subheader={
          <ListSubheader component="div" id="nested-menu-subheader">
            Menu
          </ListSubheader>
        }
        sx={{ width: "100%" }}
      >
        {menu.map((item) => (
          <ListItemButton
            className={
              location.pathname.includes(item.path) ? "selected-path" : ""
            }
            key={item.path}
            onClick={() => navigate(`/${item.path}`)}
            sx={{
              gap: theme.gap.medium,
              borderRadius: `${theme.shape.borderRadius}px`,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      {/* other */}
      <List
        component="nav"
        aria-labelledby="nested-other-subheader"
        subheader={
          <ListSubheader component="div" id="nested-other-subheader">
            Other
          </ListSubheader>
        }
        sx={{ width: "100%" }}
      >
        {other.map((item) => (
          <ListItemButton
            className={
              location.pathname.includes(item.path) ? "selected-path" : ""
            }
            key={item.path}
            onClick={() =>
              item.path === "support"
                ? window.open(
                    "https://github.com/bluewave-labs/bluewave-uptime",
                    "_blank",
                    "noreferrer"
                  )
                : navigate(`/${item.path}`)
            }
            sx={{
              gap: theme.gap.medium,
              borderRadius: `${theme.shape.borderRadius}px`,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Tooltip
        title="Open settings"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          py={theme.gap.small}
          px={theme.gap.medium}
          gap={theme.gap.xs}
          borderRadius={`${theme.shape.borderRadius}px`}
          onClick={handleOpenUserMenu}
        >
          <Avatar small={true} />
          <Typography component="span" ml={theme.gap.xs}>
            {authState.user?.firstName} {authState.user?.lastName}
          </Typography>
          <Arrow style={{ marginTop: "2px", marginLeft: "auto" }} />
        </Stack>
      </Tooltip>
      <Menu
        className="sidebar-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        autoFocus={false}
        sx={{
          ml: theme.gap.xxl,
        }}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            {icons[setting]}
            <Typography component="span" ml={theme.gap.small}>
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      {/* {menu.map((item) => (
        <Stack
          className={
            location.pathname.includes(item.path) ? "selected-path" : ""
          }
          key={item.path}
          direction="row"
          alignItems="center"
          py={theme.gap.small}
          px={theme.gap.medium}
          gap={theme.gap.small}
          borderRadius={`${theme.shape.borderRadius}px`}
          onClick={() =>
            item.path === "support"
              ? window.open(
                  "https://github.com/bluewave-labs/bluewave-uptime",
                  "_blank",
                  "noreferrer"
                )
              : navigate(`/${item.path}`)
          }
        >
          {item.icon}
          <Typography component="span">{item.name}</Typography>
        </Stack>
      ))}
       */}
    </Stack>
  );
}

export default Sidebar;
