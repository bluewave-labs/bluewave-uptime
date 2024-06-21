import SearchTextField from "../TextFields/Search/SearchTextField";
import "./index.css";
import React from "react";
import HostsTable from "../HostsTable";
import Pagination from "../Pagination";

const CurrentMonitors = ({ monitors }) => {
  return (
    <div className="current-monitors">
      <div className="current-monitors-bar">
        <div className="current-monitors-title-holder">
          <div className="current-monitors-title">Current monitors</div>
          <div className="current-monitors-counter">5</div>
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

export default CurrentMonitors;
