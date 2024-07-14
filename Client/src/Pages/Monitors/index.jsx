import "./index.css";
import "./monitors.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMonitorsByUserId } from "../../Features/Monitors/monitorsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import SearchTextField from "../../Components/Inputs/Search/SearchTextField";
import MonitorTable from "../../Components/MonitorTable";
import { useTheme } from "@emotion/react";

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
  return (
    <div
      className="monitors"
      style={{
        padding: `${theme.content.pY} ${theme.content.pX}`,
      }}
    >
      <div className="monitors-bar">
        <div className="monitors-bar-title">
          Hello, {authState.user.firstname}
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
            <SearchTextField />
          </div>
        </div>
        <div className="monitors-v-gaping" />
        <MonitorTable monitors={monitorState.monitors} />
      </div>
    </div>
  );
};

export default Monitors;
