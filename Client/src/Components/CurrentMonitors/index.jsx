import SearchTextField from "../TextFields/Search/SearchTextField";
import "./index.css";
import HostsTable from "../HostsTable";
import Pagination from "../Pagination";
import PropTypes from "prop-types";

/**
 * CurrentMonitors displays the current status of monitor
 *
 * @component
 * @param {Array<Monitor>} monitors - An array of monitor objects to be displayed.
 */

const CurrentMonitors = ({ monitors }) => {
  return (
    <div className="current-monitors">
      <div className="current-monitors-bar">
        <div className="current-monitors-title-holder">
          <div className="current-monitors-title">Current monitors</div>
          <div className="current-monitors-counter">{monitors.length}</div>
        </div>
        <div className="current-monitors-search-bar">
          <SearchTextField />
        </div>
      </div>
      <div className="monitors-v-gaping"></div>
      <HostsTable monitors={monitors} />
      <div className="monitors-v-gaping"></div>
      <Pagination />
    </div>
  );
};

CurrentMonitors.propTypes = {
  monitors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CurrentMonitors;
