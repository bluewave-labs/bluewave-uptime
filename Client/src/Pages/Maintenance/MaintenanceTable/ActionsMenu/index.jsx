import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { logger } from "../../../../Utils/Logger";
import Settings from "../../../../assets/icons/settings-bold.svg?react";
import PropTypes from "prop-types";
import { networkService } from "../../../../main";
import { createToast } from "../../../../Utils/toastUtils";

const ActionsMenu = ({ isAdmin, maintenanceWindow, updateCallback }) => {
  const { authToken } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const handleRemove = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setIsLoading(true);
      await networkService.deleteMaintenanceWindow({
        authToken,
        maintenanceWindowId: maintenanceWindow._id,
      });
      updateCallback();
      createToast({ body: "Maintenance window deleted successfully." });
    } catch (error) {
      createToast({ body: "Failed to delete maintenance window." });
      logger.error("Failed to delete maintenance window", error);
    } finally {
      setIsLoading(false);
    }
    setIsOpen(false);
  };

  const handleEdit = () => {
    navigate(`/maintenance/create/${maintenanceWindow._id}`);
  };

  const openMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const openRemove = (e) => {
    closeMenu(e);
    setIsOpen(true);
  };

  const closeMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <IconButton
        aria-label="monitor actions"
        onClick={(event) => {
          event.stopPropagation();
          openMenu(event);
        }}
        sx={{
          "&:focus": {
            outline: "none",
          },
          "& svg path": {
            stroke: theme.palette.other.icon,
          },
        }}
      >
        <Settings />
      </IconButton>

      <Menu
        className="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(e) => closeMenu(e)}
        disableScrollLock
        slotProps={{
          paper: {
            sx: {
              "& ul": { p: theme.spacing(2.5) },
              "& li": { m: 0 },
              "& li:last-of-type": {
                color: theme.palette.error.text,
              },
            },
          },
        }}
      >
        <MenuItem
          onClick={(e) => {
            closeMenu(e);
            e.stopPropagation();
            handleEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            closeMenu(e);
            e.stopPropagation();
            console.log("Pause");
          }}
        >
          Pause
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            openRemove(e);
          }}
        >
          Remove
        </MenuItem>
      </Menu>
      <Modal
        aria-labelledby="modal-delete-monitor"
        aria-describedby="delete-monitor-confirmation"
        open={isOpen}
        onClose={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <Stack
          gap={theme.spacing(2)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.background.main,
            border: 1,
            borderColor: theme.palette.border.light,
            borderRadius: theme.shape.borderRadius,
            boxShadow: 24,
            p: theme.spacing(15),
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-delete-maintenance" component="h2" variant="h2">
            Do you really want to remove this maintenance window?
          </Typography>
          <Stack
            direction="row"
            gap={theme.spacing(4)}
            mt={theme.spacing(12)}
            justifyContent="flex-end"
          >
            <Button
              variant="text"
              color="info"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              color="error"
              onClick={(e) => {
                e.stopPropagation(e);
                handleRemove(e);
              }}
            >
              Delete
            </LoadingButton>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

ActionsMenu.propTypes = {
  maintenanceWindow: PropTypes.object,
  isAdmin: PropTypes.bool,
  updateCallback: PropTypes.func,
};

export default ActionsMenu;
