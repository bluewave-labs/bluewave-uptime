import React from "react";

const HostsTable = ({ monitors }) => {
  return (
    <div className="current-monitors-table-holder">
      <table className="current-monitors-table">
        <thead>
          <tr className="theader-row">
            <td className="theader-row-cell">Host</td>
            <td className="theader-row-cell">Status</td>
            <td className="theader-row-cell">Team</td>
            <td className="theader-row-cell">Actions</td>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor, index) => {
            console.log(monitor);
            return (
              <tr className="tbody-row" key={index}>
                <td className="tbody-row-cell">{monitor.url}</td>
                <td className="tbody-row-cell">
                  {monitor.isActive ? "Active" : "Down"}
                </td>
                <td className="tbody-row-cell">{monitor.team}</td>
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

export default HostsTable;
