import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

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
 *       @param {functio} props.data.rows.data.handleClick - Function to call when the row is clicked.
 * @param {boolean} [props.paginated=false] - Flag to enable pagination.
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

const BasicTable = ({ data, paginated }) => {
  // Add headers to props validation

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page after changing rows per page
  };

  let paginatedData = [];
  if (paginated) {
    paginatedData = data.rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }

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
            {paginated === false &&
              data.rows.map((row) => {
                return (
                  <TableRow
                    sx={{ cursor: row.handleClick ? "pointer" : "default" }}
                    key={row.id}
                    onClick={row.handleClick ? row.handleClick : null}
                  >
                    {row.data.map((cell) => {
                      return <TableCell key={cell.id}>{cell.data}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            {paginated === true &&
              paginatedData.map((row) => {
                return (
                  <TableRow
                    sx={{ cursor: row.handleClick ? "pointer" : "default" }}
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
      {paginated === true && (
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 25]}
          component="div"
          count={data.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

BasicTable.propTypes = {
  data: PropTypes.object.isRequired,
  paginated: PropTypes.bool,
};

export default BasicTable;
