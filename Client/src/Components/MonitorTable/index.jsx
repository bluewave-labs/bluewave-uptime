import "./index.css";
import { useState } from "react";
import PropTypes from "prop-types";
import OpenIt from "../../assets/Images/Icon-open-in-tab-gray.png";
import ResponseTimeChart from "../Charts/ResponseTimeChart";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
} from "@mui/material";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import OpenInNewPage from "../../assets/icons/open-in-new-page.svg?react"

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const mappedRows = monitors
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((monitor) => {
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

      return (
        <TableRow key={monitor._id}>
          <TableCell>
            <Host params={params} />
          </TableCell>
          <TableCell>
            <Status params={params} />
          </TableCell>
          <TableCell>
            <ResponseTimeChart checks={monitor.checks} />
          </TableCell>
          <TableCell>TODO Add Actions</TableCell>
        </TableRow>
      );
    });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Host</TableCell>
            <TableCell>
              Status
              <span>
                <SouthRoundedIcon />
              </span>
            </TableCell>
            <TableCell>Response Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mappedRows}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={monitors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

MonitorTable.propTypes = {
  monitors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Status.propTypes = { params: PropTypes.object.isRequired };
Host.propTypes = { params: PropTypes.object.isRequired };

export default MonitorTable;
