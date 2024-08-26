import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
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
import { toggleSidebar } from "../../Features/UI/uiSlice";
import { clearUptimeMonitorState } from "../../Features/UptimeMonitors/uptimeMonitorsSlice";
import Avatar from "../Avatar";
import LockSvg from "../../assets/icons/lock.svg?react";
import UserSvg from "../../assets/icons/user.svg?react";
import TeamSvg from "../../assets/icons/user-two.svg?react";
import LogoutSvg from "../../assets/icons/logout.svg?react";
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
import ArrowRight from "../../assets/icons/right-arrow.svg?react";
import ArrowLeft from "../../assets/icons/left-arrow.svg?react";

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
  // { name: "Status pages", path: "status", icon: <StatusPages /> },
  { name: "Maintenance", path: "maintenance", icon: <Maintenance /> },
  // { name: "Integrations", path: "integrations", icon: <Integrations /> },
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
  const { sidebar } = useSelector((state) => state.ui);
  let collapsed = sidebar.collapsed;
  const [open, setOpen] = useState({ Dashboard: false, Account: false });
  const [anchorEl, setAnchorEl] = useState(null);
  const [popup, setPopup] = useState();

  const openPopup = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPopup(id);
  };
  const closePopup = () => {
    setAnchorEl(null);
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

  useEffect(() => {
    if (
      location.pathname.includes("monitors") ||
      location.pathname.includes("pagespeed")
    )
      setOpen((prev) => ({ ...prev, Dashboard: true }));
    else if (location.pathname.includes("/account"))
      setOpen((prev) => ({ ...prev, Account: true }));
  }, []);

  return (
    <Stack
      component="aside"
      className={collapsed ? "collapsed" : "expanded"}
      gap={theme.gap.medium}
    >
      <Stack pt={theme.gap.medium} pb={theme.gap.large} pl={theme.gap.ml}>
        <Stack direction="row" alignItems="center" gap={theme.gap.small}>
          <Stack
            justifyContent="center"
            alignItems="center"
            minWidth={theme.gap.lgplus}
            minHeight={theme.gap.lgplus}
            fontSize="18px"
            color="white"
            sx={{
              position: "relative",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "4px",
              userSelect: "none",
            }}
          >
            BU
          </Stack>
          <Typography
            component="span"
            mt={theme.gap.xs}
            sx={{ opacity: 0.8, fontWeight: 500 }}
          >
            BlueWave Uptime
          </Typography>
        </Stack>
        <IconButton
          sx={{
            position: "absolute",
            top: 60,
            right: 0,
            transform: `translate(50%, 0)`,
            backgroundColor: theme.palette.otherColors.fillGray,
            border: `solid 1px ${theme.palette.otherColors.graishWhite}`,
            p: "5px",
            "& svg": {
              width: theme.gap.ml,
              height: theme.gap.ml,
              "& path": {
                stroke: theme.palette.otherColors.bluishGray,
              },
            },
            "&:focus": { outline: "none" },
            "&:hover": {
              backgroundColor: "#e3e3e3",
              borderColor: theme.palette.otherColors.graishWhite,
            },
          }}
          onClick={() => {
            setOpen({ Dashboard: false, Account: false });
            dispatch(toggleSidebar());
          }}
        >
          {collapsed ? <ArrowRight /> : <ArrowLeft />}
        </IconButton>
      </Stack>
      {/* menu */}
      <List
        component="nav"
        aria-labelledby="nested-menu-subheader"
        disablePadding
        subheader={
          <ListSubheader
            component="div"
            id="nested-menu-subheader"
            sx={{
              pt: theme.gap.small,
              px: collapsed ? theme.gap.xs : theme.gap.small,
              backgroundColor: "transparent"
            }}
          >
            Menu
          </ListSubheader>
        }
        sx={{ px: theme.gap.medium }}
      >
        {menu.map((item) =>
          item.path ? (
            <Tooltip
              key={item.path}
              placement="right"
              title={collapsed ? item.name : ""}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -16],
                      },
                    },
                  ],
                },
              }}
              disableInteractive
            >
              <ListItemButton
                className={
                  location.pathname.includes(item.path) ? "selected-path" : ""
                }
                onClick={() => navigate(`/${item.path}`)}
                sx={{
                  height: "37px",
                  gap: theme.gap.small,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: theme.gap.small,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </Tooltip>
          ) : collapsed ? (
            <React.Fragment key={item.name}>
              <Tooltip
                placement="right"
                title={collapsed ? item.name : ""}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -16],
                        },
                      },
                    ],
                  },
                }}
                disableInteractive
              >
                <ListItemButton
                  className={
                    Boolean(anchorEl) && popup === item.name
                      ? "selected-path"
                      : ""
                  }
                  onClick={(event) => openPopup(event, item.name)}
                  sx={{
                    position: "relative",
                    gap: theme.gap.small,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    px: theme.gap.small,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              </Tooltip>
              <Menu
                className="sidebar-popup"
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && popup === item.name}
                onClose={closePopup}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ ml: theme.gap.ml }}
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
                    <MenuItem
                      className={
                        location.pathname.includes(child.path)
                          ? "selected-path"
                          : ""
                      }
                      key={child.path}
                      onClick={() => {
                        navigate(`/${child.path}`);
                        closePopup();
                      }}
                      sx={{
                        gap: theme.gap.small,
                        borderRadius: `${theme.shape.borderRadius}px`,
                        pl: theme.gap.small,
                        mb: "1px",
                      }}
                    >
                      {child.icon}
                      {child.name}
                    </MenuItem>
                  );
                })}
              </Menu>
            </React.Fragment>
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
                  gap: theme.gap.small,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: theme.gap.small,
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
                          gap: theme.gap.small,
                          borderRadius: `${theme.shape.borderRadius}px`,
                          pl: theme.gap.small,
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
      <Divider sx={{ my: theme.gap.small }} />
      {/* other */}
      <List
        component="nav"
        aria-labelledby="nested-other-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-other-subheader"
            sx={{
              pt: theme.gap.small,
              px: collapsed ? 0 : theme.gap.small,
              backgroundColor: "transparent"
            }}
          >
            Other
          </ListSubheader>
        }
        sx={{ px: theme.gap.medium }}
      >
        {other.map((item) => (
          <Tooltip
            key={item.path}
            placement="right"
            title={collapsed ? item.name : ""}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -16],
                    },
                  },
                ],
              },
            }}
            disableInteractive
          >
            <ListItemButton
              className={
                location.pathname.includes(item.path) ? "selected-path" : ""
              }
              onClick={() =>
                item.path === "support"
                  ? window.open(
                      "https://github.com/bluewave-labs/bluewave-uptime/issues",
                      "_blank",
                      "noreferrer"
                    )
                  : navigate(`/${item.path}`)
              }
              sx={{
                gap: theme.gap.small,
                borderRadius: `${theme.shape.borderRadius}px`,
                px: theme.gap.small,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Divider sx={{ mt: "auto" }} />

      <Stack
        direction="row"
        height="50px"
        alignItems="center"
        py={theme.gap.small}
        px={theme.gap.ml}
        gap={theme.gap.xs}
        borderRadius={`${theme.shape.borderRadius}px`}
      >
        {collapsed ? (
          <>
            <Tooltip
              title="Options"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -10],
                      },
                    },
                  ],
                },
              }}
              disableInteractive
            >
              <IconButton
                onClick={(event) => openPopup(event, "logout")}
                sx={{ p: 0, "&:focus": { outline: "none" } }}
              >
                <Avatar small={true} />
              </IconButton>
            </Tooltip>
            <Menu
              className="sidebar-popup"
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && popup === "logout"}
              onClose={closePopup}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ ml: theme.gap.ml }}
            >
              <MenuItem sx={{ cursor: "default", minWidth: "150px" }}>
                <Box>
                  <Typography component="span" fontWeight={500} fontSize="13px">
                    {authState.user?.firstName} {authState.user?.lastName}
                  </Typography>
                  <Typography
                    sx={{ textTransform: "capitalize", fontSize: "12px" }}
                  >
                    {authState.user?.role}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={logout}
                sx={{
                  gap: theme.gap.small,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  pl: theme.gap.small,
                }}
              >
                <LogoutSvg />
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
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
              <IconButton
                sx={{ ml: "auto", "&:focus": { outline: "none" } }}
                onClick={logout}
              >
                <LogoutSvg style={{ width: "20px", height: "20px" }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default Sidebar;
