import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import CurrentMonitors from "../../Components/CurrentMonitors";
import PropTypes from "prop-types";

/**
 * CurrentStats displays the current status of monitor
 *
 * @component
 * @param {Array<Monitor>} monitors - An array of monitor objects to be displayed.
 */

const CurrentStats = ({ monitors }) => {
  const up = monitors.reduce((acc, cur) => {
    if (cur.checks) {
      return cur.checks[cur.checks.length - 1].status === true ? acc + 1 : acc;
    }
  }, 0);

  const down = monitors.reduce((acc, cur) => {
    if (cur.checks) {
      return cur.checks[cur.checks.length - 1].status === false ? acc + 1 : acc;
    }
  }, 0);

  return (
    <div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-bar">
        <div className="monitors-bar-title">Hello, Jackie</div>
        <Button
          level="primary"
          label="Create new monitor"
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
