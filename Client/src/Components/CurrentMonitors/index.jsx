import "./index.css";
import PropTypes from "prop-types";

const CurrentMonitors = ({ monitors }) => {
  return (
    <div className="current-monitors">
      <div className="current-monitors-bar">
        <div className="current-monitors-title-holder">
          <div className="current-monitors-title">Current monitors</div>
          <div className="current-monitors-counter">
            {monitors ? monitors.length : 0}
          </div>
        </div>
        <div className="current-monitors-search-bar"></div>
      </div>
    </div>
  );
};

CurrentMonitors.propTypes = {
  monitors: PropTypes.array,
};

export default CurrentMonitors;
