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

  useEffect(() => {
    if (monitorState.monitors.length === 0) {
      navigate("/monitors/create");
    }
  }, [monitorState.monitors, navigate]);

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
      status: monitor.status === true ? "Up" : "Down",
      backgroundColor:
        monitor.status === true
          ? "var(--env-var-color-20)"
          : "var(--env-var-color-21)",
      statusDotColor:
        monitor.status === true
          ? "var(--env-var-color-17)"
          : "var(--env-var-color-19)",
    };

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
              dot={params.statusDotColor}
              customStyles={{
                backgroundColor: params.backgroundColor,
              }}
            />
          ),
        },
        { id: idx + 2, data: <ResponseTimeChart checks={monitor.checks} /> },
        { id: idx + 3, data: monitor.type },
        { id: idx + 4, data: "TODO" },
      ],
    };
  });

  return (
    <div
      className="monitors"
      style={{
        padding: `${theme.content.pY} ${theme.content.pX}`,
        backgroundColor: "var(--env-var-color-30)",
      }}
    >
      <div className="monitors-bar">
        <div className="monitors-bar-title">
          Hello, {authState.user.firstName}
        </div>
        <Button
          level="primary"
          label="Create new monitor"
          onClick={() => {
            navigate("/monitors/create");
          }}
          sx={{ padding: "6px 25px", fontSize: "13px" }}
        />
      </div>

      <div className="monitors-stats">
        <ServerStatus title="Up" value={up} state="up" />
        <ServerStatus title="Down" value={down} state="down" />
        <ServerStatus title="Paused" value={0} state="pause" />
      </div>

      <div className="current-monitors">
        <div className="current-monitors-bar">
          <div className="current-monitors-title-holder">
            <div className="current-monitors-title">Current monitors</div>
            <div className="current-monitors-counter">
              {monitorState.monitors.length}
            </div>
          </div>
          <div className="current-monitors-search-bar">
            {/* TODO - add search bar */}
          </div>
        </div>
        <div className="monitors-v-gaping" />
        <BasicTable data={data} paginated={true} />
      </div>
    </div>
  );
};

export default Monitors;
