"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnsToExport = exports.defaultGetRowsToExport = void 0;
var _columns = require("../columns");
var _filter = require("../filter");
var _gridRowsSelector = require("../rows/gridRowsSelector");
const getColumnsToExport = ({
  apiRef,
  options
}) => {
  const columns = (0, _columns.gridColumnDefinitionsSelector)(apiRef);
  if (options.fields) {
    return options.fields.reduce((currentColumns, field) => {
      const column = columns.find(col => col.field === field);
      if (column) {
        currentColumns.push(column);
      }
      return currentColumns;
    }, []);
  }
  const validColumns = options.allColumns ? columns : (0, _columns.gridVisibleColumnDefinitionsSelector)(apiRef);
  return validColumns.filter(column => !column.disableExport);
};
exports.getColumnsToExport = getColumnsToExport;
const defaultGetRowsToExport = ({
  apiRef
}) => {
  const filteredSortedRowIds = (0, _filter.gridFilteredSortedRowIdsSelector)(apiRef);
  const rowTree = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef);
  const selectedRows = apiRef.current.getSelectedRows();
  const bodyRows = filteredSortedRowIds.filter(id => rowTree[id].type !== 'footer');
  const pinnedRows = (0, _gridRowsSelector.gridPinnedRowsSelector)(apiRef);
  const topPinnedRowsIds = pinnedRows?.top?.map(row => row.id) || [];
  const bottomPinnedRowsIds = pinnedRows?.bottom?.map(row => row.id) || [];
  bodyRows.unshift(...topPinnedRowsIds);
  bodyRows.push(...bottomPinnedRowsIds);
  if (selectedRows.size > 0) {
    return bodyRows.filter(id => selectedRows.has(id));
  }
  return bodyRows;
};
exports.defaultGetRowsToExport = defaultGetRowsToExport;