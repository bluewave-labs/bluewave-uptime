import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import Fallback from "../../Components/Fallback";
import { useState, useEffect } from "react";
import "./index.css";
import MaintenanceTable from "./MaintenanceTable";
import { useSelector } from "react-redux";

const Maintenance = ({ isAdmin }) => {
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);

  const [maintenanceWindows, setMaintenanceWindows] = useState([]);
  const [maintenanceWindowCount, setMaintenanceWindowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState({});

  useEffect(() => {});

  return (
    <Box
      className="maintenance"
      sx={{
        ':has(> [class*="fallback__"])': {
          position: "relative",
          border: 1,
          borderColor: theme.palette.border.light,
          borderRadius: theme.shape.borderRadius,
          borderStyle: "dashed",
          backgroundColor: theme.palette.background.main,
          overflow: "hidden",
        },
      }}
    >
      {maintenanceWindows.length > 0 && (
        <MaintenanceTable
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          sort={sort}
          setSort={setSort}
          maintenanceWindows={maintenanceWindows}
          maintenanceWindowCount={maintenanceWindowCount}
        />
      )}
      {isAdmin && maintenanceWindows.length === 0 && (
        <Fallback
          title="maintenance window"
          checks={[
            "Mark your maintenance periods",
            "Eliminate any misunderstandings",
            "Stop sending alerts in maintenance windows",
          ]}
          link="/maintenance/create"
          isAdmin={isAdmin}
        />
      )}
    </Box>
  );
};

export default Maintenance;
