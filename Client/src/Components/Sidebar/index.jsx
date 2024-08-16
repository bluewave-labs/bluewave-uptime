import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
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
import Dashboard from "../../assets/icons/dashboard.svg?react";
import Account from "../../assets/icons/user-edit.svg?react";
import StatusPages from "../../assets/icons/status-pages.svg?react";
import Maintenance from "../../assets/icons/maintenance.svg?react";
import Monitors from "../../assets/icons/monitors.svg?react";
import Incidents from "../../assets/icons/incidents.svg?react";
import Integrations from "../../assets/icons/integrations.svg?react";
import PageSpeed from "../../assets/icons/page-speed.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import ArrowDown from "../../assets/icons/down-arrow.svg?react";
import ArrowUp from "../../assets/icons/up-arrow.svg?react";

import "./index.css";

const menu = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    nested: [
      { name: "Monitors", path: "monitors", icon: <Monitors /> },
      { name: "Pagespeed", path: "pagespeed", icon: <PageSpeed /> },
    ],
  },
  { name: "Incidents", path: "incidents", icon: <Incidents /> },
  { name: "Status pages", path: "status", icon: <StatusPages /> },
  { name: "Maintenance", path: "maintenance", icon: <Maintenance /> },
  { name: "Integrations", path: "integrations", icon: <Integrations /> },
  {
    name: "Account",
    icon: <Account />,
    nested: [
      { name: "Profile", path: "account/profile", icon: <UserSvg /> },
      { name: "Password", path: "account/password", icon: <LockSvg /> },
      { name: "Team", path: "account/team", icon: <TeamSvg /> },
    ],
  },
];

const other = [
  { name: "Support", path: "support", icon: <Support /> },
  { name: "Settings", path: "settings", icon: <Settings /> },
];

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
  const authState = useSelector((state) => state.auth);
  const [open, setOpen] = useState({ Dashboard: false, Account: false });

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
      >
        {menu.map((item) =>
          item.path ? (
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
          ) : (
            <React.Fragment key={item.name}>
              <ListItemButton
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    [`${item.name}`]: !prev[`${item.name}`],
                  }))
                }
                sx={{
                  gap: theme.gap.medium,
                  borderRadius: `${theme.shape.borderRadius}px`,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
                {open[`${item.name}`] ? <ArrowUp /> : <ArrowDown />}
              </ListItemButton>
              <Collapse in={open[`${item.name}`]} timeout="auto">
                <List
                  component="div"
                  disablePadding
                  sx={{ pl: theme.gap.large }}
                >
                  {item.nested.map((child) => {
                    if (
                      child.name === "Team" &&
                      authState.user?.role &&
                      !authState.user.role.includes("admin")
                    ) {
                      return null;
                    }

                    return (
                      <ListItemButton
                        className={
                          location.pathname.includes(child.path)
                            ? "selected-path"
                            : ""
                        }
                        key={child.path}
                        onClick={() => navigate(`/${child.path}`)}
                        sx={{
                          gap: theme.gap.medium,
                          borderRadius: `${theme.shape.borderRadius}px`,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText>{child.name}</ListItemText>
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          )
        )}
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

      <Stack
        direction="row"
        alignItems="center"
        py={theme.gap.small}
        px={theme.gap.medium}
        pr={0}
        gap={theme.gap.xs}
        borderRadius={`${theme.shape.borderRadius}px`}
      >
        <Avatar small={true} />
        <Box ml={theme.gap.xs}>
          <Typography component="span" fontWeight={500}>
            {authState.user?.firstName} {authState.user?.lastName}
          </Typography>
          <Typography sx={{ textTransform: "capitalize" }}>
            {authState.user?.role}
          </Typography>
        </Box>
        <Tooltip title="Log Out">
          <IconButton sx={{ ml: "auto" }}>
            <LogoutSvg />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default Sidebar;
