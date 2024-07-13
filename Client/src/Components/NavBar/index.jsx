import "./index.css";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "../Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import ChevronDown from "../../assets/Images/Icon-chevron-down.png";
import { clearAuthState } from "../../Features/Auth/authSlice";
import { clearMonitorState } from "../../Features/Monitors/monitorsSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockSvg from "../../assets/icons/lock.svg?react";
import UserSvg from "../../assets/icons/user.svg?react";
import TeamSvg from "../../assets/icons/user-two.svg?react";
import LogoutSvg from "../../assets/icons/logout.svg?react";

import BWULogo from "../../assets/Images/bwl-logo.svg?react";

const settings = ["Profile", "Password", "Team", "Logout"];
const icons = {
  Profile: <UserSvg />,
  Team: <TeamSvg />,
  Password: <LockSvg />,
  Logout: <LogoutSvg />,
};

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
    dispatch(clearMonitorState());
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
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "var(--env-var-shadow-1)",
      }}
    >
      <Container maxWidth="xxl" sx={{ width: "100%" }}>
        <Toolbar disableGutters>
          <BWULogo id="bw-uptime-logo-dashboard" alt="BlueWave Uptime Logo" />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: theme.typography.fontWeightBold,
              letterSpacing: theme.spacing(0.3),
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UPTIME GENIE
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                id="icon-button"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <div className="icon-button-toggle">
                  <Avatar small={true} sx={{ mr: "8px" }} />
                  <div className="icon-button-toggle-title">
                    {authState.user.firstname} {authState.user.lastname}
                  </div>
                  <img
                    className="icon-button-toggle-pic"
                    src={ChevronDown}
                    alt="ChevronDown"
                  />
                </div>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
