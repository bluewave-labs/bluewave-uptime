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
import { logger } from "../../../../Utils/Logger";
import { useTheme } from "@emotion/react";

const PaginationTable = ({ monitorId, dateRange }) => {
  const theme = useTheme();
  const { authToken } = useSelector((state) => state.auth);
  const [checks, setChecks] = useState([]);
  const [checksCount, setChecksCount] = useState(0);
  const [paginationController, setPaginationController] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  useEffect(() => {
    setPaginationController((prevPaginationController) => ({
      ...prevPaginationController,
      page: 0,
    }));
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
        logger.error(error);
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
        sx={{
          backgroundColor: theme.palette.background.main,
          border: 1,
          borderColor: theme.palette.border.light,
          "& button": {
            color: theme.palette.text.tertiary,
            borderRadius: theme.shape.borderRadius,
          },
          "& li:first-of-type button, & li:last-of-type button": {
            border: 1,
            borderColor: theme.palette.border.light,
          },
        }}
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
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: theme.palette.background.fill,
              },
            }}
          />
        )}
      />
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          border: `solid 1px ${theme.palette.border.light}`,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: theme.palette.background.accent,
            }}
          >
            <TableRow>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Status
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Date & Time
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Message
              </TableCell>
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
