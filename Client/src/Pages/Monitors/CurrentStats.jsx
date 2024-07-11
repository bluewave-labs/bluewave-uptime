import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import CurrentMonitors from "../../Components/CurrentMonitors";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * CurrentStats displays the current status of monitor
 *
 * @component
 * @param {Array<Monitor>} monitors - An array of monitor objects to be displayed.
 */

const CurrentStats = ({ monitors }) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  if (monitors.length === 0) {
    navigate("/monitors/create");
  }
  const up = monitors.reduce((acc, cur) => {
    if (cur.checks.length > 0) {
      return cur.checks[cur.checks.length - 1].status === true ? acc + 1 : acc;
    }
    return 0;
  }, 0);

  const down = monitors.reduce((acc, cur) => {
    if (cur.checks.length > 0) {
      return cur.checks[cur.checks.length - 1].status === false ? acc + 1 : acc;
    }
    return 0;
  }, 0);

  return (
    <div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
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
          sx={{ padding: "10px 20px", fontSize: "13px" }}
        />
      </div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-stats">
        <ServerStatus title="Up" value={up} state="up" />
        <ServerStatus title="Down" value={down} state="down" />
        <ServerStatus title="Paused" value={0} state="pause" />
      </div>
      <div className="monitors-gaps-medium"></div>
      <CurrentMonitors monitors={monitors} />
    </div>
  );
};

CurrentStats.propTypes = {
  monitors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CurrentStats;
