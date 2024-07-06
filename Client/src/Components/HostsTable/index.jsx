import PropTypes from "prop-types";
import Host from "../Host/";
import HostStatus from "../HostStatus";
import ResponseTimeChart from "../Charts/ResponseTimeChart";
/**
 * HostsTable displays the current status of monitor
 *
 * @component
 * @param {Array<Monitor>} monitors - An array of monitor objects to be displayed.
 */

const getLastCheckStatus = (monitor) => {
  if (monitor.checks.length === 0) {
    // Default values for when there are no checks
    return {
      color: "var(--env-var-color-21)",
      statusText: "No Data",
      dotColor: "var(--env-var-color-19)",
    };
  }

  const lastCheck = monitor.checks[monitor.checks.length - 1];
  const isUp = lastCheck.status === true;
  return {
    color: isUp ? "var(--env-var-color-20)" : "var(--env-var-color-21)",
    statusText: isUp ? "Up" : "Down",
    dotColor: isUp ? "var(--env-var-color-17)" : "var(--env-var-color-19)",
  };
};

const HostsTable = ({ monitors }) => {
  return (
    <div className="current-monitors-table-holder">
      <table className="current-monitors-table">
        <thead>
          <tr className="theader-row">
            <td className="theader-row-cell">Host</td>
            <td className="theader-row-cell">Status</td>
            <td className="theader-row-cell">Response</td>
            <td className="theader-row-cell">Actions</td>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor) => {
            const host = Host(
              monitor.name,
              100,
              "var(--env-var-color-17)",
              monitor.url
            );

            const { color, currentStatus, dotColor } =
              getLastCheckStatus(monitor);

            const status = HostStatus(color, currentStatus, dotColor);

            return (
              <tr className="tbody-row" key={monitor._id}>
                <td className="tbody-row-cell">{host}</td>
                <td className="tbody-row-cell">{status}</td>
                <td className="tbody-row-cell">
                  <ResponseTimeChart checks={monitor.checks} />
                </td>
                <td className="tbody-row-cell actions-cell">
                  {monitor.actions}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

HostsTable.propTypes = {
  monitors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HostsTable;
