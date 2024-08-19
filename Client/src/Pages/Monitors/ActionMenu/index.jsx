import { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Settings from "../../../assets/icons/settings-bold.svg?react";
import { useNavigate } from "react-router-dom";

const ActionsMenu = ({ monitor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [actions, setActions] = useState({});
  const openMenu = (event, id, url) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setActions({ id: id, url: url });
  };

  const openRemove = () => {
    closeMenu();
    setIsOpen(true);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  return (
    <>
      <IconButton
        aria-label="monitor actions"
        onClick={(event) => {
          event.stopPropagation();
          openMenu(
            event,
            monitor._id,
            monitor.type === "ping" ? null : monitor.url
          );
        }}
        sx={{
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Settings />
      </IconButton>

      <Menu
        className="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {actions.url !== null ? (
          <MenuItem
            onClick={() => {
              window.open(actions.url, "_blank", "noreferrer");
            }}
          >
            Open site
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/monitors/${actions.id}`);
          }}
        >
          Details
        </MenuItem>
        {/* TODO - pass monitor id to Incidents page */}
        <MenuItem disabled>Incidents</MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();

            navigate(`/monitors/configure/${actions.id}`);
          }}
        >
          Configure
        </MenuItem>
        <MenuItem onClick={openRemove}>Remove</MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
