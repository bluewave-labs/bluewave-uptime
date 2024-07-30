import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, ButtonGroup, Stack } from "@mui/material";

import Button from "../../Components/Button";
import axiosInstance from "../../Utils/axiosConfig";
import BasicTable from "../../Components/BasicTable";
import { StatusLabel } from "../../Components/Label";
import { useTheme } from "@emotion/react";

import "./index.css";
import Select from "../../Components/Inputs/Select";

const Incidents = () => {
  const theme = useTheme();
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
        `/monitors/user/${authState.user._id}?status=false`,
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
    .filter((incident) => {
      if (filter === "all") return true;
      else if (filter === "resolve") return incident.statusCode === 5000;
      else if (filter === "down") return incident.status === false;
    })
    .map((incident, idx) => {
      return {
        id: idx,
        data: [
          {
            id: idx + 0,
            data: <StatusLabel status="down" text="Down" />,
          },
          { id: idx + 1, data: new Date(incident.createdAt).toLocaleString() },
          { id: idx + 2, data: incident.statusCode },
          { id: idx + 3, data: monitors[incident.monitorId].name },
        ],
      };
    });
  data.rows = incidents;

  return (
    <Stack className="incidents" gap={theme.gap.large}>
      <Stack direction="row" alignItems="center" gap={theme.gap.medium}>
        <Typography component="h1">Incident history for: </Typography>
        <Select
          id="incidents-select-monitor"
          placeholder="All servers"
          value={selectedMonitor}
          onChange={handleSelect}
          items={Object.values(monitors)}
        />
        <ButtonGroup sx={{ ml: "auto" }}>
          <Button
            level="secondary"
            label="All"
            onClick={() => setFilter("all")}
            sx={{
              backgroundColor:
                filter === "all" && theme.palette.otherColors.fillGray,
            }}
          />
          <Button
            level="secondary"
            label="Down"
            onClick={() => setFilter("down")}
            sx={{
              backgroundColor:
                filter === "down" && theme.palette.otherColors.fillGray,
            }}
          />
          <Button
            level="secondary"
            label="Cannot Resolve"
            onClick={() => setFilter("resolve")}
            sx={{
              backgroundColor:
                filter === "resolve" && theme.palette.otherColors.fillGray,
            }}
          />
        </ButtonGroup>
      </Stack>
      <BasicTable data={data} paginated={true} rowsPerPage={12} />
    </Stack>
  );
};

export default Incidents;
