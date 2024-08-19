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
  Typography,
  Box,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../Utils/axiosConfig";
import { StatusLabel } from "../../../Components/Label";
import { logger } from "../../../Utils/Logger";

const IncidentTable = ({ monitors, selectedMonitor, filter }) => {
  const { authToken, user } = useSelector((state) => state.auth);
  const [checks, setChecks] = useState([]);
  const [checksCount, setChecksCount] = useState(0);
  const [paginationController, setPaginationController] = useState({
    page: 0,
    rowsPerPage: 12,
  });

  useEffect(() => {
    setPaginationController({
      ...paginationController,
      page: 0,
    });
  }, [filter, selectedMonitor]);

  useEffect(() => {
    const fetchPage = async () => {
      if (!monitors || Object.keys(monitors).length === 0) {
        return;
      }
      try {
        let url = `/checks/${selectedMonitor}?sortOrder=desc&filter=${filter}&page=${paginationController.page}&rowsPerPage=${paginationController.rowsPerPage}`;

        if (selectedMonitor === "0") {
          url = `/checks/user/${user._id}?sortOrder=desc&filter=${filter}&page=${paginationController.page}&rowsPerPage=${paginationController.rowsPerPage}`;
        }

        const res = await axiosInstance.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setChecks(res.data.data.checks);
        setChecksCount(res.data.data.checksCount);
      } catch (error) {
        logger.error(error);
      }
    };
    fetchPage();
  }, [
    authToken,
    user,
    monitors,
    selectedMonitor,
    filter,
    paginationController.page,
    paginationController.rowsPerPage,
  ]);

  const handlePageChange = (_, newPage) => {
    setPaginationController({
      ...paginationController,
      page: newPage - 1, // 0-indexed
    });
  };

  let paginationComponent = <></>;
  if (checksCount > paginationController.rowsPerPage) {
    paginationComponent = (
      <Pagination
        count={Math.ceil(checksCount / paginationController.rowsPerPage)}
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
            sx={{
              "&:focus": {
                outline: "none",
              },
            }}
          />
        )}
      />
    );
  }

  return (
    <>
      {checks?.length === 0 && selectedMonitor === "0" ? (
        <Box>
          <Typography textAlign="center">No incidents recorded yet.</Typography>
        </Box>
      ) : checks?.length === 0 ? (
        <Box>
          <Typography textAlign="center">
            The monitor you have selected has no recorded incidents yet.
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Monitor Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checks.map((check) => {
                  const status = check.status === true ? "up" : "down";

                  return (
                    <TableRow key={check._id}>
                      <TableCell>{monitors[check.monitorId]?.name}</TableCell>
                      <TableCell>
                        <StatusLabel
                          status={status}
                          text={status}
                          customStyles={{ textTransform: "capitalize" }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(check.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{check.statusCode}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {paginationComponent}
        </>
      )}
    </>
  );
};

IncidentTable.propTypes = {
  monitors: PropTypes.object.isRequired,
  selectedMonitor: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default IncidentTable;
