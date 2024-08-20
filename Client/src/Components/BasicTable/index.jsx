import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import LeftArrowDouble from "../../assets/icons/left-arrow-double.svg?react";
import RightArrowDouble from "../../assets/icons/right-arrow-double.svg?react";
import LeftArrow from "../../assets/icons/left-arrow.svg?react";
import RightArrow from "../../assets/icons/right-arrow.svg?react";
import SelectorVertical from "../../assets/icons/selector-vertical.svg?react";
import Button from "../Button";
import "./index.css";
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
        level="secondary"
        label=""
        img={<LeftArrowDouble />}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      />
      <Button
        level="secondary"
        label=""
        img={<LeftArrow />}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      />
      <Button
        level="secondary"
        label=""
        img={<RightArrow />}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      />
      <Button
        level="secondary"
        label=""
        img={<RightArrowDouble />}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      />
    </Box>
  );
};

/**
 * BasicTable Component
 * Renders a table with optional pagination.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.data - Data for the table including columns and rows.
 *   @param {Array} props.data.cols - Array of objects for column headers.
 *     @param {number} props.data.cols[].id - Unique identifier for the column.
 *     @param {string} props.data.cols[].name - Name of the column to display as header.
 *   @param {Array} props.data.rows - Array of row objects.
 *     @param {number} props.data.rows[].id - Unique identifier for the row.
 *     @param {Array} props.data.rows[].data - Array of cell data objects for the row.
 *       @param {number} props.data.rows[].data[].id - Unique identifier for the cell.
 *       @param {JSX.Element} props.data.rows[].data[].data - The content to display in the cell.
 *       @param {function} props.data.rows.data.handleClick - Function to call when the row is clicked.
 * @param {boolean} [props.paginated=false] - Flag to enable pagination.
 * @param {boolean} [props.reversed=false] - Flag to enable reverse order.
 * @param {number} props.rowsPerPage- Number of rows per page (table).
 *
 * @example
 * const data = {
 *   cols: [
 *     { id: 1, name: "First Col" },
 *     { id: 2, name: "Second Col" },
 *     { id: 3, name: "Third Col" },
 *     { id: 4, name: "Fourth Col" },
 *   ],
 *   rows: [
 *     {
 *       id: 1,
 *       data: [
 *         { id: 1, data: <div>Data for Row 1 Col 1</div> },
 *         { id: 2, data: <div>Data for Row 1 Col 2</div> },
 *         { id: 3, data: <div>Data for Row 1 Col 3</div> },
 *         { id: 4, data: <div>Data for Row 1 Col 4</div> },
 *       ],
 *     },
 *     {
 *       id: 2,
 *       data: [
 *         { id: 5, data: <div>Data for Row 2 Col 1</div> },
 *         { id: 6, data: <div>Data for Row 2 Col 2</div> },
 *         { id: 7, data: <div>Data for Row 2 Col 3</div> },
 *         { id: 8, data: <div>Data for Row 2 Col 4</div> },
 *       ],
 *     },
 *   ],
 * };
 *
 * <BasicTable data={data} rows={rows} paginated={true} />
 */

const BasicTable = ({ data, paginated, reversed, rows = 5 }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let displayData = [];

  if (data && data.rows) {
    let rows = reversed ? [...data.rows].reverse() : data.rows;
    displayData = paginated
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;
  }

  if (!data || !data.cols || !data.rows) {
    return <div>No data</div>;
  }

  /**
   * Helper function to calculate the range of displayed rows.
   * @returns {string}
   */
  const getRange = () => {
    let start = page * rowsPerPage + 1;
    let end = Math.min(page * rowsPerPage + rowsPerPage, data.rows.length);
    return `${start} - ${end}`;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {data.cols.map((col) => (
                <TableCell key={col.id}>{col.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row) => {
              return (
                <TableRow
                  sx={{
                    cursor: row.handleClick ? "pointer" : "default",
                  }}
                  key={row.id}
                  onClick={row.handleClick ? row.handleClick : null}
                >
                  {row.data.map((cell) => {
                    return <TableCell key={cell.id}>{cell.data}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ opacity: 0.7 }}>
          Showing {getRange()} of {data.rows.length} monitor(s)
        </Typography>
        <TablePagination
          component="div"
          count={data.rows.length}
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
                PaperProps: {
                  className: "pagination-dropdown",
                },
                transformOrigin: { vertical: "bottom", horizontal: "left" },
                anchorOrigin: { vertical: "top", horizontal: "left" },
                sx: { mt: "-4px" },
              },
              inputProps: { id: "pagination-dropdown" },
              IconComponent: SelectorVertical,
              sx: {
                ml: theme.gap.small,
                mr: theme.gap.large,
                minWidth: theme.gap.xl,
                textAlign: "left",
                "&.Mui-focused > div": {
                  backgroundColor: theme.palette.otherColors.white,
                },
              },
            },
          }}
          sx={{ mt: theme.gap.medium }}
        />
      </Stack>
    </>
  );
};

BasicTable.propTypes = {
  data: PropTypes.object.isRequired,
  paginated: PropTypes.bool,
  reversed: PropTypes.bool,
  rowPerPage: PropTypes.number,
};

export default BasicTable;
