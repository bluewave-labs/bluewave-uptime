import "./index.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMonitorsByUserId } from "../../Features/Monitors/monitorsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import { useTheme } from "@emotion/react";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import OpenInNewPage from "../../assets/icons/open-in-new-page.svg?react";
import BasicTable from "../../Components/BasicTable";
import { StatusLabel } from "../../Components/Label";
import ResponseTimeChart from "../../Components/Charts/ResponseTimeChart";
import { Box, Stack, Typography } from "@mui/material";

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
    <div className="host-row">
      <a href={params.url} target="_blank" rel="noreferrer">
        <OpenInNewPage />
      </a>
      <div className="host-name">{params.title}</div>
      <div
        className="host-percentage"
        style={{ color: params.percentageColor }}
      >
        {params.precentage}%
      </div>
    </div>
  );
};

const Monitors = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const monitorState = useSelector((state) => state.monitors);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonitorsByUserId(authState.authToken));
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
          <>
            Status
            <span>
              <ArrowDownwardRoundedIcon />
            </span>
          </>
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
        { id: idx + 3, data: monitor.type },
        { id: idx + 4, data: "TODO" },
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
    </Stack>
  );
};

export default Monitors;
