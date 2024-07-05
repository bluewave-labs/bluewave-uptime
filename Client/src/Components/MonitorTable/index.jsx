import "./index.css";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import OpenIt from "../../assets/Images/Icon-open-in-tab-gray.png";
import ResponseTimeChart from "../Charts/ResponseTimeChart";
import { useState, useEffect } from "react";
const Host = ({ params }) => {
  return (
    <div className="host-row">
      <a href={params.value.url} target="_blank">
        <img className="host-open-icon" src={OpenIt} alt="OpenIt" />
      </a>
      <div className="host-name">{params.value.title}</div>
      <div
        className="host-percentage"
        style={{ color: params.value.percentageColor }}
      >
        {params.value.precentage}%
      </div>
    </div>
  );
};

const Status = ({ params }) => {
  return (
    <div className="host-status">
      <div
        className="host-status-details"
        style={{ backgroundColor: params.value.backgroundColor }}
      >
        <div
          className="host-status-dot"
          style={{ backgroundColor: params.value.statusDotColor }}
        />
        <span className="host-status-text">{params.value.status}</span>
      </div>
    </div>
  );
};

const cols = [
  {
    field: "host",
    headerName: "Host",
    renderCell: (params) => {
      return <Host params={params} />;
    },
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      return <Status params={params} />;
    },
  },
  {
    field: "response",
    headerName: "Response",
    renderCell: (params) => {
      return <ResponseTimeChart checks={params.value.checks} />;
    },
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
  },
];

const MonitorTable = ({ monitors = [] }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const mappedRows = monitors.map((monitor) => {
      return {
        id: monitor._id,
        host: {
          title: monitor.name,
          url: monitor.url,
          precentage: 100,
          percentageColor:
            monitor.status === true
              ? "var(--env-var-color-17)"
              : "var(--env-var-color-19)",
        },
        status: {
          status: monitor.status === true ? "Up" : "Down",
          backgroundColor:
            monitor.status === true
              ? "var(--env-var-color-20)"
              : "var(--env-var-color-21)",
          statusDotColor:
            monitor.status === true
              ? "var(--env-var-color-17)"
              : "var(--env-var-color-19)",
        },
        response: {
          checks: monitor.checks,
        },
      };
    });
    setRows(mappedRows);
  }, [monitors]);

  return (
    <DataGrid
      autoHeight
      columns={cols}
      rows={rows}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
};

MonitorTable.propTypes = {
  monitors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Status.propTypes = { params: PropTypes.object.isRequired };
Host.propTypes = { params: PropTypes.object.isRequired };

export default MonitorTable;
