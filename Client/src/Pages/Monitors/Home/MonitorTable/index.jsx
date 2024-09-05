import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  PaginationItem,
  Paper,
  Box,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import { useState, useEffect } from "react";
import { logger } from "../../../../Utils/Logger";
import Host from "../host";
import { StatusLabel } from "../../../../Components/Label";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { networkService } from "../../../../main";
import { useTheme } from "@emotion/react";
import BarChart from "../../../../Components/Charts/BarChart";
import ActionsMenu from "../actionsMenu";

const MonitorTable = ({ isAdmin }) => {
  const theme = useTheme();

  const [paginationController, setPaginationController] = useState({
    page: 0,
    rowsPerPage: 14,
  });
  const [monitors, setMonitors] = useState([]);
  const [monitorCount, setMonitorCount] = useState(0);
  const authState = useSelector((state) => state.auth);

  const handlePageChange = (_, newPage) => {
    setPaginationController({
      ...paginationController,
      page: newPage - 1, // 0-indexed
    });
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { authToken } = authState;
        const user = jwtDecode(authToken);
        const res = await networkService.getMonitorsByTeamId(
          authToken,
          user.teamId,
          25,
          ["http", "ping"],
          null,
          "desc",
          true,
          paginationController.page,
          paginationController.rowsPerPage
        );
        console.log(res.data.data);
        setMonitors(res?.data?.data ?? []);
        setMonitorCount(0);
      } catch (error) {
        logger.error(error);
      }
    };
    fetchPage();
  }, []);

  let paginationComponent = <></>;
  if (monitorCount > paginationController.rowsPerPage) {
    paginationComponent = (
      <Pagination
        count={Math.ceil(monitorCount / paginationController.rowsPerPage)}
        page={paginationController.page + 1} //0-indexed
        onChange={handlePageChange}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: ArrowBackRoundedIcon,
              next: ArrowForwardRoundedIcon,
            }}
            {...item}
          />
        )}
      />
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Host</TableCell>
              <TableCell>
                {" "}
                <Box width="max-content">
                  Status
                  <span>
                    <ArrowDownwardRoundedIcon />
                  </span>
                </Box>
              </TableCell>
              <TableCell>Response Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monitors.map((monitor) => {
              let uptimePercentage = "";
              let percentageColor = theme.palette.percentage.uptimeExcellent;

              // Determine uptime percentage and color based on the monitor's uptimePercentage value
              if (monitor.uptimePercentage !== undefined) {
                uptimePercentage =
                  monitor.uptimePercentage === 0
                    ? "0"
                    : (monitor.uptimePercentage * 100).toFixed(2);

                percentageColor =
                  monitor.uptimePercentage < 0.25
                    ? theme.palette.percentage.uptimePoor
                    : monitor.uptimePercentage < 0.5
                    ? theme.palette.percentage.uptimeFair
                    : monitor.uptimePercentage < 0.75
                    ? theme.palette.percentage.uptimeGood
                    : theme.palette.percentage.uptimeExcellent;
              }

              const params = {
                url: monitor.url,
                title: monitor.name,
                percentage: uptimePercentage,
                percentageColor,
                status:
                  monitor.status === undefined
                    ? "pending"
                    : monitor.status === true
                    ? "up"
                    : "down",
              };

              return (
                <TableRow key={monitor._id}>
                  <TableCell>
                    <Host key={monitor._id} params={params} />
                  </TableCell>
                  <TableCell>
                    <StatusLabel
                      status={params.status}
                      text={params.status}
                      customStyles={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell>
                    <BarChart checks={monitor.checks.slice().reverse()} />
                  </TableCell>
                  <TableCell>
                    <span style={{ textTransform: "uppercase" }}>
                      {monitor.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <ActionsMenu monitor={monitor} isAdmin={isAdmin} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {paginationComponent}
    </>
  );
};

export default MonitorTable;
