import "./index.css";
import PropTypes from "prop-types";
import ResponseTimeChart from "../Charts/ResponseTimeChart";
import BasicTable from "../BasicTable";
import OpenInNewPage from "../../assets/icons/open-in-new-page.svg?react";

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
      <a href={params.url} target="_blank">
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

/**
 * Status component.
 * This subcomponent receives a params object and displays the status details of a monitor.
 *
 * @component
 * @param {Object} params - An object containing the following properties:
 * @param {string} params.backgroundColor - The background color of the status box.
 * @param {string} params.statusDotColor - The color of the status dot.
 * @param {string} params.status - The status text to display.
 * @returns {React.ElementType} Returns a div element with the host status.
 */
const Status = ({ params }) => {
  return (
    <div className="host-status">
      <div
        className="host-status-details"
        style={{ backgroundColor: params.backgroundColor }}
      >
        <div
          className="host-status-dot"
          style={{ backgroundColor: params.statusDotColor }}
        />
        <span
          className="host-status-text"
          style={{ textTransform: "capitalize" }}
        >
          {params.status}
        </span>
      </div>
    </div>
  );
};

/**
 * MonitorTable component.
 * Takes an array of monitor objects and displays them in a table.
 * Each row in the table represents a monitor and includes the host, status, response time, and action.
 *
 * @component
 * @param {Object[]} monitors - An array of monitor objects. Each object should have the following properties:
 * @param {string} monitors[].url - The URL of the monitor.
 * @param {string} monitors[].name - The name of the monitor.
 * @param {boolean} monitors[].status - The status of the monitor. True if the monitor is up, false otherwise.
 * @param {Object[]} monitors[].checks - An array of check objects for the response time chart.
 * @returns {React.Component} Returns a table with the monitor data.
 */
const MonitorTable = ({ monitors = [] }) => {
  const headers = [
    { id: 1, name: "Host" },
    { id: 2, name: "Status" },
    { id: 3, name: "Response Time" },
    { id: 4, name: "Actions" },
  ];
  const data = [];
  monitors.forEach((monitor) => {
    const params = {
      url: monitor.url,
      title: monitor.name,
      precentage: 100,
      percentageColor:
        monitor.status === true
          ? "var(--env-var-color-17)"
          : "var(--env-var-color-19)",
      status: monitor.status === true ? "up" : "down",
      backgroundColor:
        monitor.status === true
          ? "var(--env-var-color-20)"
          : "var(--env-var-color-21)",
      statusDotColor:
        monitor.status === true
          ? "var(--env-var-color-17)"
          : "var(--env-var-color-19)",
    };
    data.push({ id: data.length + 1, data: <Host params={params} /> });
    data.push({ id: data.length + 1, data: <Status params={params} /> });
    data.push({
      id: data.length + 1,
      data: <ResponseTimeChart checks={monitor.checks} />,
    });
    data.push({ id: data.length + 1, data: "TODO" });
  });

  return <BasicTable headers={headers} rowItems={data} paginated={true} />;
};

MonitorTable.propTypes = {
  monitors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Status.propTypes = { params: PropTypes.object.isRequired };
Host.propTypes = { params: PropTypes.object.isRequired };

export default MonitorTable;
