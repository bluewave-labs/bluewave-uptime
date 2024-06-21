import React, { useEffect, useState } from "react";
import Host from "../../Components/Host";
import HostStatus from "../../Components/HostStatus";
import HostActions from "../../Components/HostActions";
import BarChart from "../../Components/Charts/BarChart/BarChart";
import Button from "../../Components/Button";
import ServerStatus from "../../Components/Charts/Servers/ServerStatus";
import CurrentMonitors from "../../Components/CurrentMonitors";
import MockData from "../../Mock/sample_data.json";

const CurrentStats = (mockdata = true) => {
  // The hardcoded part is passed as default value for the purpose of demonstration.
  // Pass an empty array, [], before fetching the data
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    if (mockdata) {
      console.log(MockData.data);
      setMonitors(
        MockData.data.map((item) => ({
          host: Host(item.name, 100, "var(--env-var-color-17)", item.url),
          status: HostStatus(
            item.isActive
              ? "var(--env-var-color-20)"
              : "var(--env-var-color-21)",
            item.isActive ? "Up" : "Down",
            item.isActive
              ? "var(--env-var-color-17)"
              : "var(--env-var-color-19)"
          ),
          team: <BarChart checks={item.checks} />,
          actions: HostActions(),
        }))
      );
    }
  }, [mockdata]);

  // useEffect(() => {
  //   fetch("API_URL")
  //     .then((response) => response.json())
  //     .then((data) => setMonitors(data))
  //     .catch((error) => console.error(error));
  // }, []);

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
