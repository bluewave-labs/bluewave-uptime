import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  TablePagination,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import { setRowsPerPage } from "../../../../Features/UI/uiSlice";
import { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router";
import { logger } from "../../../../Utils/Logger";
import Host from "../host";
import { StatusLabel } from "../../../../Components/Label";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { networkService } from "../../../../main";
import { useTheme } from "@emotion/react";
import BarChart from "../../../../Components/Charts/BarChart";
import LeftArrowDouble from "../../../../assets/icons/left-arrow-double.svg?react";
import RightArrowDouble from "../../../../assets/icons/right-arrow-double.svg?react";
import LeftArrow from "../../../../assets/icons/left-arrow.svg?react";
import RightArrow from "../../../../assets/icons/right-arrow.svg?react";
import SelectorVertical from "../../../../assets/icons/selector-vertical.svg?react";
import ActionsMenu from "../actionsMenu";
import useUtils from "../../utils";

/**
 * Component for pagination actions (first, previous, next, last).
 *
 * @component
 * @param {Object} props
 * @param {number} props.count - Total number of items.
 * @param {number} props.page - Current page number.
 * @param {number} props.rowsPerPage - Number of rows per page.
 * @param {function} props.onPageChange - Callback function to handle page change.
 *
 * @returns {JSX.Element} Pagination actions component.
 */
const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: "24px" }}>
      <Button
        variant="group"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <LeftArrowDouble />
      </Button>
      <Button
        variant="group"
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <LeftArrow />
      </Button>
      <Button
        variant="group"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <RightArrow />
      </Button>
      <Button
        variant="group"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <RightArrowDouble />
      </Button>
    </Box>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const MonitorTable = memo(({ isAdmin }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { determineState } = useUtils();

  const { rowsPerPage } = useSelector((state) => state.ui.monitors);
  const [page, setPage] = useState(0);
  const [monitors, setMonitors] = useState([]);
  const [monitorCount, setMonitorCount] = useState(0);
  const authState = useSelector((state) => state.auth);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleActionMenuDelete = () => {
    setUpdateTrigger((prev) => !prev);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      setRowsPerPage({
        value: parseInt(event.target.value, 10),
        table: "monitors",
      })
    );
    setPage(0);
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
          page,
          rowsPerPage
        );
        setMonitors(res?.data?.data?.monitors ?? []);
        setMonitorCount(res?.data?.data?.monitorCount ?? 0);
      } catch (error) {
        logger.error(error);
      }
    };
    fetchPage();
  }, [updateTrigger, authState, page, rowsPerPage]);

  /**
   * Helper function to calculate the range of displayed rows.
   * @returns {string}
   */
  const getRange = () => {
    let start = page * rowsPerPage + 1;
    let end = Math.min(page * rowsPerPage + rowsPerPage, monitorCount);
    return `${start} - ${end}`;
  };

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
                status: determineState(monitor),
              };

              return (
                <TableRow
                  key={monitor._id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: theme.palette.background.accent,
                    },
                  }}
                  onClick={() => {
                    navigate(`/monitors/${monitor._id}`);
                  }}
                >
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
                    <ActionsMenu
                      monitor={monitor}
                      isAdmin={isAdmin}
                      updateCallback={handleActionMenuDelete}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={theme.spacing(4)}
      >
        <Typography px={theme.spacing(2)} variant="body2" sx={{ opacity: 0.7 }}>
          Showing {getRange()} of {monitorCount} monitor(s)
        </Typography>
        <TablePagination
          component="div"
          count={monitorCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          labelRowsPerPage="Rows per page"
          labelDisplayedRows={({ page, count }) =>
            `Page ${page + 1} of ${Math.max(0, Math.ceil(count / rowsPerPage))}`
          }
          slotProps={{
            select: {
              MenuProps: {
                keepMounted: true,
                disableScrollLock: true,
                PaperProps: {
                  className: "pagination-dropdown",
                  sx: {
                    mt: 0,
                    mb: theme.spacing(2),
                  },
                },
                transformOrigin: { vertical: "bottom", horizontal: "left" },
                anchorOrigin: { vertical: "top", horizontal: "left" },
                sx: { mt: theme.spacing(-2) },
              },
              inputProps: { id: "pagination-dropdown" },
              IconComponent: SelectorVertical,
              sx: {
                ml: theme.spacing(4),
                mr: theme.spacing(12),
                minWidth: theme.spacing(20),
                textAlign: "left",
                "&.Mui-focused > div": {
                  backgroundColor: theme.palette.background.main,
                },
              },
            },
          }}
          sx={{
            mt: theme.spacing(6),
            color: theme.palette.text.secondary,
            "& svg path": {
              stroke: theme.palette.text.tertiary,
              strokeWidth: 1.3,
            },
            "& .MuiSelect-select": {
              border: 1,
              borderColor: theme.palette.border.light,
              borderRadius: theme.shape.borderRadius,
            },
          }}
        />
      </Stack>
    </>
  );
});

MonitorTable.propTypes = {
  isAdmin: PropTypes.bool,
};

export default MonitorTable;
