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

const MonitorTable = ({ teamId }) => {
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
        setMonitors([]);
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
          <TableBody></TableBody>
        </Table>
      </TableContainer>
      {paginationComponent}
    </>
  );
};

MonitorTable.propTypes = {
  teamId: PropTypes.string,
};
export default MonitorTable;
