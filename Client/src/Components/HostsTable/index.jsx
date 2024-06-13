import React from "react";
import HostStatus from "../HostStatus";
import Host from "../Host";
import BarChart from "../Charts/BarChart/BarChart";
import HostActions from "../HostActions";

function HostsTable() {
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
          <tr className="tbody-row">
            <td className="tbody-row-cell">
              {Host("Discord", 100, "var(--env-var-color-17)")}
            </td>
            <td className="tbody-row-cell">
              {HostStatus(
                "var(--env-var-color-20)",
                "Up",
                "var(--env-var-color-17)"
              )}
            </td>
            <td className="tbody-row-cell">
              <BarChart />
            </td>
            <td className="tbody-row-cell actions-cell">{HostActions()}</td>
          </tr>
          <tr className="tbody-row">
            <td className="tbody-row-cell">
              {Host("Google", 99.9, "var(--env-var-color-17)")}
            </td>
            <td className="tbody-row-cell">
              {HostStatus(
                "var(--env-var-color-20)",
                "Up",
                "var(--env-var-color-17)"
              )}
            </td>
            <td className="tbody-row-cell">
              <BarChart />
            </td>
            <td className="tbody-row-cell actions-cell">{HostActions()}</td>
          </tr>
          <tr className="tbody-row">
            <td className="tbody-row-cell">
              {Host("NBC", 98.1, "var(--env-var-color-18)")}
            </td>
            <td className="tbody-row-cell">
              {HostStatus(
                "var(--env-var-color-20)",
                "Up",
                "var(--env-var-color-17)"
              )}
            </td>
            <td className="tbody-row-cell">
              <BarChart />
            </td>
            <td className="tbody-row-cell actions-cell">{HostActions()}</td>
          </tr>
          <tr className="tbody-row">
            <td className="tbody-row-cell">
              {Host("Google", 95.1, "var(--env-var-color-19)")}
            </td>
            <td className="tbody-row-cell">
              {HostStatus(
                "var(--env-var-color-21)",
                "Down",
                "var(--env-var-color-19)"
              )}
            </td>
            <td className="tbody-row-cell">
              <BarChart />
            </td>
            <td className="tbody-row-cell actions-cell">{HostActions()}</td>
          </tr>
          <tr className="tbody-row">
            <td className="tbody-row-cell">
              {Host("NBC", 99.9, "var(--env-var-color-17)")}
            </td>
            <td className="tbody-row-cell">
              {HostStatus(
                "var(--env-var-color-15)",
                "Cannot resolve",
                "var(--env-var-color-22)"
              )}
            </td>
            <td className="tbody-row-cell">
              <BarChart />
            </td>
            <td className="tbody-row-cell actions-cell">{HostActions()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HostsTable;
