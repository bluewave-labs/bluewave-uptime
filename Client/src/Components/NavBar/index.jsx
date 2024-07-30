import "./index.css";
import { cloneElement, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "../Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { clearAuthState } from "../../Features/Auth/authSlice";
import { clearUptimeMonitorState } from "../../Features/UptimeMonitors/uptimeMonitorsSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockSvg from "../../assets/icons/lock.svg?react";
import UserSvg from "../../assets/icons/user.svg?react";
import TeamSvg from "../../assets/icons/user-two.svg?react";
import LogoutSvg from "../../assets/icons/logout.svg?react";
import { Stack, useScrollTrigger } from "@mui/material";

const icons = {
  Profile: <UserSvg />,
  Team: <TeamSvg />,
  Password: <LockSvg />,
  Logout: <LogoutSvg />,
};

function AddBorderOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      className={trigger ? "scrolled" : ""}
      position="sticky"
      sx={{
        boxShadow: "none",
        transition: "all 0.3s ease",
        borderBottom: "1px solid transparent",
        "&.scrolled": {
          borderBottom: "1px solid #eaecf0",
          backgroundColor: "white",
        },
      }}
    >
      {children}
    </AppBar>
  );
}

/**
 * NavBar component
 *
 * A responsive navigation bar component with a user menu.
 *
 * @component
 * @example
 * return (
 *   <NavBar />
 * )
 */
function NavBar() {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const logout = () => {
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
    <AddBorderOnScroll>
      <Toolbar disableGutters sx={{ alignSelf: "flex-end", paddingX: "25px" }}>
        <Tooltip title="Open settings">
          <IconButton
            id="icon-button"
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
          >
            <Stack direction="row" alignItems="center" gap="8px">
              <Avatar small={true} />
              <Box
                className="icon-button-toggle-title"
                sx={{ mr: "3px", lineHeight: 2 }}
              >
                {authState.user?.firstName} {authState.user?.lastName}
              </Box>
              <KeyboardArrowDownIcon sx={{ mt: "2px" }} />
            </Stack>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: theme.spacing(5.5) }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              id="menu-item"
              key={setting}
              onClick={() => handleCloseUserMenu(setting)}
              sx={{ width: "150px" }}
            >
              {icons[setting]}
              <Typography
                fontSize="var(--env-var-font-size-medium)"
                textAlign="center"
                marginLeft="8px"
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AddBorderOnScroll>
  );
}

export default NavBar;
