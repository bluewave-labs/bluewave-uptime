import React, { useEffect, useState } from "react";
import Host from "../../Components/Host";
import HostStatus from "../../Components/HostStatus";
import HostActions from "../../Components/HostActions";
import BarChart from "../../Components/Charts/BarChart/BarChart";
import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import CurrentMonitors from "../../Components/CurrentMonitors";

const hardCodedMonitors = [
  {
    host: Host("Discord", 100, "var(--env-var-color-17)"),
    status: HostStatus(
      "var(--env-var-color-20)",
      "Up",
      "var(--env-var-color-17)"
    ),
    team: <BarChart />,
    actions: HostActions(),
  },
  {
    host: Host("Google", 99.9, "var(--env-var-color-17)"),
    status: HostStatus(
      "var(--env-var-color-20)",
      "Up",
      "var(--env-var-color-17)"
    ),
    team: <BarChart />,
    actions: HostActions(),
  },
  {
    host: Host("NBC", 98.1, "var(--env-var-color-18)"),
    status: HostStatus(
      "var(--env-var-color-20)",
      "Up",
      "var(--env-var-color-17)"
    ),
    team: <BarChart />,
    actions: HostActions(),
  },
  {
    host: Host("Google", 95.1, "var(--env-var-color-19)"),
    status: HostStatus(
      "var(--env-var-color-21)",
      "Down",
      "var(--env-var-color-19)"
    ),
    team: <BarChart />,
    actions: HostActions(),
  },
  {
    host: Host("NBC", 99.9, "var(--env-var-color-17)"),
    status: HostStatus(
      "var(--env-var-color-15)",
      "Cannot resolve",
      "var(--env-var-color-22)"
    ),
    team: <BarChart />,
    actions: HostActions(),
  },
];

const CurrentStats = () => {
  // The hardcoded part is passed as default value for the purpose of demonstration.
  // Pass an empty array, [], before fetching the data
  const [monitors, setMonitors] = useState(hardCodedMonitors);

  useEffect(() => {
    fetch("API_URL")
      .then((response) => response.json())
      .then((data) => setMonitors(data))
      .catch((error) => console.error(error));
  }, []);

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
        <ServerStatus title="Up" value="4" state="up" />
        <ServerStatus title="Down" value="0" state="down" />
        <ServerStatus title="Paused" value="0" state="pause" />
      </div>
      <div className="monitors-gaps-medium"></div>
      <CurrentMonitors monitors={monitors} />
    </div>
  );
};

export default CurrentStats;
