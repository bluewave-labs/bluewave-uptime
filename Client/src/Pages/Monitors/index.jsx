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
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
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
  Skeleton,
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
 * @param {number} params.percentage - The percentage to display.
 * @returns {React.ElementType} Returns a div element with the host details.
 */
const Host = ({ params }) => {
  return (
    <Stack direction="row" alignItems="center" className="host">
      <IconButton
        aria-label="monitor link"
        onClick={(event) => {
          event.stopPropagation();
          window.open(params.url, "_blank", "noreferrer");
        }}
        sx={{
          "&:focus": {
            outline: "none",
          },
          mr: "3px",
        }}
      >
        <OpenInNewPage
          style={{
            marginTop: "-1px",
            marginRight: "-1px",
          }}
        />
      </IconButton>
      <Box>
        {params.title}
        <Typography component="span" sx={{ color: params.percentageColor }}>
          {params.percentage}%
        </Typography>
      </Box>
    </Stack>
  );
};

/**
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Skeleton variant="rounded" width="50%" height={36} />
        <Skeleton variant="rounded" width="15%" height={36} />
      </Stack>
      <Stack
        gap={theme.gap.large}
        direction="row"
        justifyContent="space-between"
      >
        <Skeleton variant="rounded" width="100%" height={100} />
        <Skeleton variant="rounded" width="100%" height={100} />
        <Skeleton variant="rounded" width="100%" height={100} />
      </Stack>
      <Stack gap={theme.gap.large} p={theme.gap.xl} backgroundColor="#f9fafb">
        <Skeleton variant="rounded" width="50%" height={25} />
        <Skeleton variant="rounded" width="100%" height={300} />
        <Skeleton variant="rounded" width="100%" height={100} />
      </Stack>
    </>
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
  };

  const [isOpen, setIsOpen] = useState(false);
  const openRemove = () => {
    closeMenu();
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
  }, [authState.authToken, dispatch]);

  const up = monitorState.monitors.reduce((acc, cur) => {
    return cur.status === true ? acc + 1 : acc;
  }, 0);

  const down = monitorState.monitors.length - up;

  // State variable to handle status of sorting
  // Start with Up status -> Down status
  const [sortOrder, setSortOrder] = useState('ascending');

  // Sort existing monitors with default ascending order
  const sortedMonitors = [...monitorState.monitors].sort(a => {
    const sortDirection = sortOrder === 'ascending' ? 1 : -1;
    return a.status ? -1 * sortDirection : 1 * sortDirection;
  });

  // Function to handle sorting on click of status text
  const handleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const data = {
    cols: [
      { id: 1, name: 'Host' },
      {
        id: 2,
        name: (
          <Box width='max-content' onClick={handleSort} style={{ cursor: 'pointer' }}>
            Status
            <span>{sortOrder === 'ascending' ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon />}</span>
          </Box>
        ),
      },
      { id: 3, name: 'Response Time' },
      { id: 4, name: 'Type' },
      { id: 5, name: 'Actions' },
    ],
    rows: [],
  };

  // Render out sorted monitors by ascending order
  data.rows = sortedMonitors.map((monitor, idx) => {
    const params = {
      url: monitor.url,
      title: monitor.name,
      percentage: 100,
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
            </>
          ),
        },
      ],
    };
  });

  let loading = monitorState.isLoading && monitorState.monitors.length === 0;

  return (
    <Stack className="monitors" pt={theme.gap.xl} gap={theme.gap.large}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component="h1"
              sx={{ lineHeight: 1, alignSelf: "flex-end" }}
            >
              Hello, {authState.user.firstName}
            </Typography>
            {monitorState.monitors?.length !== 0 && (
              <Button
                level="primary"
                label="Create new monitor"
                onClick={() => {
                  navigate("/monitors/create");
                }}
              />
            )}
          </Stack>
          {monitorState.monitors?.length === 0 ? (
            <Stack
              alignItems="center"
              backgroundColor={theme.palette.otherColors.white}
              p={theme.gap.xxl}
              gap={theme.gap.xs}
              border={1}
              borderRadius={`${theme.shape.borderRadius}px`}
              borderColor={theme.palette.otherColors.graishWhite}
            >
              <Typography component="h2">No monitors found</Typography>
              <Typography>
                It looks like you don’t have any monitors set up yet.
              </Typography>
              <Button
                level="primary"
                label="Create your first monitor"
                onClick={() => {
                  navigate("/monitors/create");
                }}
                sx={{ mt: theme.gap.large }}
              />
            </Stack>
          ) : (
            <>
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
                p={theme.gap.lgplus}
                flex={1}
                border={1}
                borderColor={theme.palette.otherColors.graishWhite}
                backgroundColor={theme.palette.otherColors.white}
                sx={{
                  borderRadius: `${theme.shape.borderRadius}px`,
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
              </Stack>{" "}
            </>
          )}
        </>
      )}
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
            Do you really want to delete this monitor?
          </Typography>
          <Typography id="delete-monitor-confirmation">
            Once deleted, this monitor cannot be retrieved.
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
