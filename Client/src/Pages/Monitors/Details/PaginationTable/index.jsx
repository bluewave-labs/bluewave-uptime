import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  PaginationItem,
  Pagination,
  Paper,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { networkService } from "../../../../main";
import { StatusLabel } from "../../../../Components/Label";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const PaginationTable = ({ monitorId, dateRange }) => {
  const { authToken } = useSelector((state) => state.auth);
  const [checks, setChecks] = useState([]);
  const [checksCount, setChecksCount] = useState(0);
  const [paginationController, setPaginationController] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  useEffect(() => {
    setPaginationController({
      ...paginationController,
      page: 0,
    });
  }, [dateRange]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await networkService.getChecksByMonitor(
          authToken,
          monitorId,
          "desc",
          null,
          dateRange,
          null,
          paginationController.page,
          paginationController.rowsPerPage
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
    dateRange,
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
              "& .MuiTouchRipple-root": {
                pointerEvents: "none",
                display: "none",
              },
            }}
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
        </Table>
      </TableContainer>
      {paginationComponent}
    </>
  );
};

PaginationTable.propTypes = {
  monitorId: PropTypes.string.isRequired,
  dateRange: PropTypes.string.isRequired,
};

export default PaginationTable;
