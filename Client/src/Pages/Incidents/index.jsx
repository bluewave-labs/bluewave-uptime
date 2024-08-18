import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Stack, Skeleton, Typography } from "@mui/material";
import Button from "../../Components/Button";
import axiosInstance from "../../Utils/NetworkService";
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
      <Stack direction="row" alignItems="center" gap={theme.gap.medium}>
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
      const res = await axiosInstance.get(
        `/monitors/user/${authState.user._id}?status=false&limit=1`,
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
      setLoading(false);
    };

    fetchMonitors();
  }, [authState]);

  useEffect(() => {}, []);

  const handleSelect = (event) => {
    setSelectedMonitor(event.target.value);
  };

  return (
    <Stack className="incidents" pt={theme.gap.xl} gap={theme.gap.large}>
      {loading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Stack direction="row" alignItems="center" gap={theme.gap.medium}>
            <Typography display="inline-block" component="h1">
              Incidents for
            </Typography>
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
