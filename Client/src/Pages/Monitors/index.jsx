import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUptimeMonitor,
  getUptimeMonitorsByUserId,
} from "../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import { useTheme } from "@emotion/react";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import OpenInNewPage from "../../assets/icons/open-in-new-page.svg?react";
import Settings from "../../assets/icons/settings-bold.svg?react";
import BasicTable from "../../Components/BasicTable";
import { StatusLabel } from "../../Components/Label";
import { createToast } from "../../Utils/toastUtils";
import ResponseTimeChart from "../../Components/Charts/ResponseTimeChart";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

/**
 * Host component.
 * This subcomponent receives a params object and displays the host details.
 *
 * @component
 * @param {Object} params - An object containing the following properties:
 * @param {string} params.url - The URL of the host.
 * @param {string} params.title - The name of the host.
 * @param {string} params.percentageColor - The color of the percentage text.
 * @param {number} params.precentage - The percentage to display.
 * @returns {React.ElementType} Returns a div element with the host details.
 */
const Host = ({ params }) => {
  return (
    <Stack direction="row" alignItems="center" className="host">
      <a
        href={params.url}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <OpenInNewPage />
      </a>
      <Box>
        {params.title}
        <Typography component="span" sx={{ color: params.percentageColor }}>
          {params.precentage}%
        </Typography>
      </Box>
    </Stack>
  );
};

const Monitors = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const monitorState = useSelector((state) => state.uptimeMonitors);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [actions, setActions] = useState({});
  const openMenu = (event, id, url) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setActions({ id: id, url: url });
  };
  const closeMenu = () => {
    setAnchorEl(null);
    setActions({});
  };

  const [isOpen, setIsOpen] = useState(false);
  const openRemove = () => {
    setAnchorEl(null);
    setIsOpen(true);
  };
  const handleRemove = async (event) => {
    event.preventDefault();
    let monitor = { _id: actions.id };
    const action = await dispatch(
      deleteUptimeMonitor({ authToken: authState.authToken, monitor })
    );
    if (action.meta.requestStatus === "fulfilled") {
      setIsOpen(false); // close modal
      dispatch(getUptimeMonitorsByUserId(authState.authToken));
      createToast({ body: "Monitor deleted successfully." });
    } else {
      createToast({ body: "Failed to delete monitor." });
    }
  };

  useEffect(() => {
    dispatch(getUptimeMonitorsByUserId(authState.authToken));
  }, []);

  const up = monitorState.monitors.reduce((acc, cur) => {
    return cur.status === true ? acc + 1 : acc;
  }, 0);

  const down = monitorState.monitors.length - up;

  const data = {
    cols: [
      { id: 1, name: "Host" },
      {
        id: 2,
        name: (
          <Box width="max-content">
            Status
            <span>
              <ArrowDownwardRoundedIcon />
            </span>
          </Box>
        ),
      },
      { id: 3, name: "Response Time" },
      { id: 4, name: "Type" },
      { id: 5, name: "Actions" },
    ],
    rows: [],
  };

  data.rows = monitorState.monitors.map((monitor, idx) => {
    const params = {
      url: monitor.url,
      title: monitor.name,
      precentage: 100,
      percentageColor:
        monitor.status === true
          ? "var(--env-var-color-17)"
          : "var(--env-var-color-19)",
      status: monitor.status === true ? "up" : "down",
    };

    // Reverse checks so latest check is on the right
    const reversedChecks = monitor.checks.slice().reverse();

    return {
      id: monitor._id,
      // disabled for now
      handleClick: () => navigate(`/monitors/${monitor._id}`),
      data: [
        { id: idx, data: <Host params={params} /> },
        {
          id: idx + 1,
          data: (
            <StatusLabel
              status={params.status}
              text={params.status}
              customStyles={{ textTransform: "capitalize" }}
            />
          ),
        },
        { id: idx + 2, data: <ResponseTimeChart checks={reversedChecks} /> },
        {
          id: idx + 3,
          data: (
            <span style={{ textTransform: "uppercase" }}>{monitor.type}</span>
          ),
        },
        {
          id: idx + 4,
          data: (
            <>
              <IconButton
                aria-label="monitor actions"
                onClick={(event) => {
                  event.stopPropagation();
                  openMenu(event, monitor._id, monitor.url);
                }}
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <Settings />
              </IconButton>
            </>
          ),
        },
      ],
    };
  });

  return (
    <Stack className="monitors" gap={theme.gap.large}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h1">
          Hello, {authState.user.firstName}
        </Typography>
        <Button
          level="primary"
          label="Create new monitor"
          onClick={() => {
            navigate("/monitors/create");
          }}
        />
      </Stack>
      <Stack
        gap={theme.gap.large}
        direction="row"
        justifyContent="space-between"
      >
        <ServerStatus title="Up" value={up} state="up" />
        <ServerStatus title="Down" value={down} state="down" />
        <ServerStatus title="Paused" value={0} state="pause" />
      </Stack>
      <Stack
        gap={theme.gap.large}
        p={theme.gap.xl}
        sx={{
          border: `solid 1px ${theme.palette.otherColors.graishWhite}`,
          borderRadius: `${theme.shape.borderRadius}px`,
          backgroundColor: theme.palette.otherColors.white,
        }}
      >
        <Stack direction="row" alignItems="center">
          <Typography component="h2">Current monitors</Typography>
          <Box className="current-monitors-counter">
            {monitorState.monitors.length}
          </Box>
          {/* TODO - add search bar */}
        </Stack>
        <BasicTable data={data} paginated={true} />
      </Stack>
      <Menu
        className="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() => {
            window.open(actions.url, "_blank", "noreferrer");
          }}
        >
          Open site
        </MenuItem>
        <MenuItem onClick={() => navigate(`/monitors/${actions.id}`)}>
          Details
        </MenuItem>
        {/* TODO - pass monitor id to Incidents page */}
        <MenuItem disabled>Incidents</MenuItem>
        <MenuItem onClick={() => navigate(`/monitors/configure/${actions.id}`)}>
          Configure
        </MenuItem>
        <MenuItem onClick={openRemove}>Remove</MenuItem>
      </Menu>
      <Modal
        aria-labelledby="modal-delete-monitor"
        aria-describedby="delete-monitor-confirmation"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disablePortal
      >
        <Stack
          gap={theme.gap.xs}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "solid 1px #f2f2f2",
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: 24,
            p: "30px",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="modal-delete-monitor" component="h2">
            Really delete this monitor?
          </Typography>
          <Typography id="delete-monitor-confirmation">
            Once deleted, this monitor cannot be retrieved back.
          </Typography>
          <Stack
            direction="row"
            gap={theme.gap.small}
            mt={theme.gap.large}
            justifyContent="flex-end"
          >
            <Button
              level="tertiary"
              label="Cancel"
              onClick={() => setIsOpen(false)}
            />
            <Button level="error" label="Delete" onClick={handleRemove} />
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default Monitors;
