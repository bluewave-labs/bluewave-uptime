import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Stack, Skeleton, Typography } from "@mui/material";
import Button from "../../Components/Button";
import { networkService } from "../../main";
import { useTheme } from "@emotion/react";
import Select from "../../Components/Inputs/Select";
import IncidentTable from "./IncidentTable";
import "./index.css";

/**
 * Renders a skeleton layout.
 *
 * @returns {JSX.Element}
 */
const SkeletonLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Stack direction="row" alignItems="center" gap={theme.spacing(6)}>
        <Skeleton variant="rounded" width={150} height={34} />
        <Skeleton variant="rounded" width="15%" height={34} />
        <Skeleton
          variant="rounded"
          width="20%"
          height={34}
          sx={{ ml: "auto" }}
        />
      </Stack>
      <Skeleton variant="rounded" width="100%" height={300} />
      <Skeleton variant="rounded" width="100%" height={100} />
    </>
  );
};

const Incidents = () => {
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);

  const [monitors, setMonitors] = useState({});
  const [selectedMonitor, setSelectedMonitor] = useState("0");
  const [loading, setLoading] = useState(false);

  // TODO do something with these filters
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMonitors = async () => {
      setLoading(true);
      const res = await networkService.getMonitorsByTeamId(
        authState.authToken,
        authState.user.teamId,
        1,
        null,
        null,
        null,
        null
      );
      // Reduce to a lookup object for 0(1) lookup
      if (res.data && res.data.data.length > 0) {
        const monitorLookup = res.data.data.reduce((acc, monitor) => {
          acc[monitor._id] = monitor;
          return acc;
        }, {});
        setMonitors(monitorLookup);
      }
      setLoading(false);
    };

    fetchMonitors();
  }, [authState]);

  useEffect(() => {}, []);

  const handleSelect = (event) => {
    setSelectedMonitor(event.target.value);
  };

  return (
    <Stack className="incidents" pt={theme.spacing(20)} gap={theme.spacing(12)}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Stack direction="row" alignItems="center" gap={theme.spacing(6)}>
            <Typography
              display="inline-block"
              component="h1"
              color={theme.palette.text.secondary}
            >
              Incidents for
            </Typography>
            <Select
              id="incidents-select-monitor"
              placeholder="All servers"
              value={selectedMonitor}
              onChange={handleSelect}
              items={Object.values(monitors)}
              sx={{
                backgroundColor: theme.palette.background.main,
              }}
            />
            <ButtonGroup
              sx={{
                ml: "auto",
                "& .MuiButtonBase-root, & .MuiButtonBase-root:hover": {
                  borderColor: theme.palette.border.light,
                },
              }}
            >
              <Button
                level="secondary"
                label="All"
                onClick={() => setFilter("all")}
                sx={{
                  backgroundColor:
                    filter === "all"
                      ? theme.palette.background.fill
                      : theme.palette.background.main,
                }}
              />
              <Button
                level="secondary"
                label="Down"
                onClick={() => setFilter("down")}
                sx={{
                  backgroundColor:
                    filter === "down"
                      ? theme.palette.background.fill
                      : theme.palette.background.main,
                }}
              />
              <Button
                level="secondary"
                label="Cannot Resolve"
                onClick={() => setFilter("resolve")}
                sx={{
                  backgroundColor:
                    filter === "resolve"
                      ? theme.palette.background.fill
                      : theme.palette.background.main,
                }}
              />
            </ButtonGroup>
          </Stack>
          <IncidentTable
            monitors={monitors}
            selectedMonitor={selectedMonitor}
            filter={filter}
          />
        </>
      )}
    </Stack>
  );
};

export default Incidents;
