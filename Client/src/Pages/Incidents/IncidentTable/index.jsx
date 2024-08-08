import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../Utils/axiosConfig";
import { StatusLabel } from "../../../Components/Label";

const IncidentTable = ({ monitorId, filter }) => {
  const { authToken } = useSelector((state) => state.auth);
  const [checks, setChecks] = useState([]);
  const [checksCount, setChecksCount] = useState(0);
  const [paginationController, setPaginationController] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  useEffect(() => {
    const fetchPage = async () => {
      try {
        if (monitorId === "0") {
          return;
        }
        const res = await axiosInstance.get(
          `/checks/${monitorId}?sortOrder=desc&filter=${filter}&page=${paginationController.page}&rowsPerPage=${paginationController.rowsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setChecks(res.data.data.checks);
        setChecksCount(res.data.data.checksCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPage();
  }, [
    authToken,
    monitorId,
    filter,
    paginationController.page,
    paginationController.rowsPerPage,
  ]);

  const handlePageChange = (_, newPage) => {
    setPaginationController({
      ...paginationController,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationController({
      ...paginationController,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <TableContainer>
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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              onPageChange={handlePageChange}
              page={paginationController.page}
              count={checksCount}
              rowsPerPage={paginationController.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

IncidentTable.propTypes = {
  monitorId: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default IncidentTable;
