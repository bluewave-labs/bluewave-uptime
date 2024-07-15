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
 * @param {Array} props.headers - Array of header titles for the table.
 * @param {Array} props.rowItems - Array of row data objects for the table.
 * @param {boolean} props.paginated - Flag to enable pagination.
 *
 * @example
 *
 * Headers is an array of objets that have a unique ID and a name
 * Rows is an array of objects that have a unique ID and some data to display
 * Row data can be any valid React node
 * Rows are split into groups according to the number of headers, so if you have 3 headers then
 * Rows will go under the index % 3 column.
 * ie:  Row 0 -> col 0 % 3 = 0
 * ie:  Row 1 -> col 1 % 3 = 1
 * ie:  Row 2 -> col 2 % 3 = 2
 * ie:  Row 3 -> col 3 % 3 = 0
 *
 * Thus items are put in their correct columns
 *
 *
 * const headers = [
 *   { id: 1, name: "ID" },
 *   { id: 2, name: "Name" },
 *   { id: 3, name: "Age" },
 * ];
 * const rows = [
 *   { id: 1, data: <span>999</span> },
 *   { id: 2, data: <div>Alex Holliday</div> },
 *   { id: 3, data: <div>5</div> },
 *   // More rows...
 * ];
 * <BasicTable headers={headers} rows={rows} paginated={true} />
 */

const BasicTable = ({ headers, rowItems, paginated }) => {
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

  const numOfCols = headers.length;

  const groupedRowItems = rowItems.reduce((acc, item, idx) => {
    const rowIndex = Math.floor((item.id - 1) / numOfCols);
    if (!acc[rowIndex]) acc[rowIndex] = { items: [], idx };
    acc[rowIndex].items.push({ item });
    return acc;
  }, {});

  const paginatedRowsKeys = Object.keys(groupedRowItems).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                return <TableCell key={header.id}>{header.name}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated === false &&
              Object.keys(groupedRowItems).map((key) => {
                return (
                  <TableRow key={groupedRowItems[key].idx}>
                    {groupedRowItems[key].items.map(({ item }) => {
                      return <TableCell key={item.id}>{item.data}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            {paginated === true &&
              paginatedRowsKeys.map((key) => (
                <TableRow key={groupedRowItems[key].idx}>
                  {groupedRowItems[key].items.map(({ item }) => (
                    <TableCell key={item.id}>{item.data}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginated === true && (
        <TablePagination
          component="div"
          count={Object.keys(groupedRowItems).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 5, 10]}
        />
      )}
    </>
  );
};

BasicTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  rowItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      data: PropTypes.node,
    })
  ).isRequired,
  paginated: PropTypes.bool,
};

export default BasicTable;
