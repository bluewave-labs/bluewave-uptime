import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Select, MenuItem, Typography, ButtonGroup } from "@mui/material";

import Button from "../../Components/Button";
import axiosInstance from "../../Utils/axiosConfig";
import BasicTable from "../../Components/BasicTable";
import { StatusLabel } from "../../Components/Label";

const Incidents = () => {
  const authState = useSelector((state) => state.auth);
  const [monitors, setMonitors] = useState({});
  const [selectedMonitor, setSelectedMonitor] = useState("0");

  // TODO do something with these filters
  const [filter, setFilter] = useState("all");

  let data = {
    cols: [
      { id: 1, name: "Status" },
      { id: 2, name: "Timestamp" },
      { id: 3, name: "Monitor" },
      { id: 4, name: "Message" },
    ],
    rows: [],
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      const res = await axiosInstance.get(
        `/monitors/incidents/user/${authState.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${authState.authToken}`,
          },
        }
      );

      // Reduce to a lookup object for 0(1) lookup
      if (res.data && res.data.data.length > 0) {
        const monitorLookup = res.data.data.reduce((acc, monitor) => {
          acc[monitor._id] = monitor;
          return acc;
        }, {});
        setMonitors(monitorLookup);
      }
    };

    fetchIncidents();
  }, [authState]);

  const handleSelect = (event) => {
    setSelectedMonitor(event.target.value);
  };
  let incidents = [];
  if (selectedMonitor === "0") {
    Object.values(monitors).forEach((monitor) => {
      incidents = incidents.concat(monitor.checks);
    });
  } else {
    const monitor = monitors[selectedMonitor];
    incidents = monitor.checks;
  }
  incidents = incidents
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .map((incident, idx) => {
      const params = {
        status: "Down",
        backgroundColor: "var(--env-var-color-21)",
        statusDotColor: "var(--env-var-color-19)",
      };

      return {
        id: idx,
        data: [
          {
            id: idx + 0,
            data: (
              <StatusLabel
                status={params.status}
                dot={params.statusDotColor}
                customStyles={{ backgroundColor: params.backgroundColor }}
              />
            ),
          },
          { id: idx + 1, data: new Date(incident.createdAt).toLocaleString() },
          { id: idx + 2, data: incident.statusCode },
          { id: idx + 3, data: monitors[incident.monitorId].name },
        ],
      };
    });
  data.rows = incidents;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <Typography>Incident history for: </Typography>
          <Select value={selectedMonitor} onChange={handleSelect}>
            <MenuItem value={"0"}>All servers</MenuItem>
            {Object.values(monitors).map((monitor) => {
              return (
                <MenuItem key={monitor._id} value={monitor._id}>
                  {monitor.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <ButtonGroup>
          <Button
            level="secondary"
            label="All"
            onClick={() => setFilter("all")}
          />
          <Button
            level="secondary"
            label="Down"
            onClick={() => setFilter("down")}
          />
          <Button
            level="secondary"
            label="Cannot Resolve"
            onClick={() => setFilter("resolve")}
          />
        </ButtonGroup>
      </div>
      <BasicTable data={data} paginated={true} />
    </div>
  );
};

export default Incidents;
