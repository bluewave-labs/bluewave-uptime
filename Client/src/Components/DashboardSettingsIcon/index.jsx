import "./index.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

const settings = [
  "Open Site",
  "Detailed View",
  "Incidents",
  "Configure",
  "Remove",
];

/**
 * DashboardSettings component
 *
 * A component that provides a settings menu accessible from an icon.
 *
 * @component
 * @example
 * return (
 *   <DashboardSettings />
 * )
 */
function DashboardSettings() {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);

  /**
   * Handles opening the user menu.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The event triggered by clicking the user menu button.
   */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Handles closing the user menu.
   */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <SvgIcon component={SettingsIcon} />
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
            className="dashboard-setting-menu-item"
            key={setting}
            onClick={handleCloseUserMenu}
          >
            <Typography
              style={{ fontSize: "var(--env-var-font-size-medium)" }}
              textAlign="center"
            >
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default DashboardSettings;
