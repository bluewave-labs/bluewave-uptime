"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridDateTimeFormatter = exports.gridDateFormatter = exports.GRID_DATE_COL_DEF = exports.GRID_DATETIME_COL_DEF = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _gridSortingUtils = require("../hooks/features/sorting/gridSortingUtils");
var _gridDateOperators = require("./gridDateOperators");
var _gridStringColDef = require("./gridStringColDef");
var _GridEditDateCell = require("../components/cell/GridEditDateCell");
function throwIfNotDateObject({
  value,
  columnType,
  rowId,
  field
}) {
  if (!(value instanceof Date)) {
    throw new Error([`MUI X: \`${columnType}\` column type only accepts \`Date\` objects as values.`, 'Use `valueGetter` to transform the value into a `Date` object.', `Row ID: ${rowId}, field: "${field}".`].join('\n'));
  }
}
const gridDateFormatter = (value, row, column, apiRef) => {
  if (!value) {
    return '';
  }
  const rowId = apiRef.current.getRowId(row);
  throwIfNotDateObject({
    value,
    columnType: 'date',
    rowId,
    field: column.field
  });
  return value.toLocaleDateString();
};
exports.gridDateFormatter = gridDateFormatter;
const gridDateTimeFormatter = (value, row, column, apiRef) => {
  if (!value) {
    return '';
  }
  const rowId = apiRef.current.getRowId(row);
  throwIfNotDateObject({
    value,
    columnType: 'dateTime',
    rowId,
    field: column.field
  });
  return value.toLocaleString();
};
exports.gridDateTimeFormatter = gridDateTimeFormatter;
const GRID_DATE_COL_DEF = exports.GRID_DATE_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'date',
  sortComparator: _gridSortingUtils.gridDateComparator,
  valueFormatter: gridDateFormatter,
  filterOperators: (0, _gridDateOperators.getGridDateOperators)(),
  renderEditCell: _GridEditDateCell.renderEditDateCell,
  // @ts-ignore
  pastedValueParser: value => new Date(value)
});
const GRID_DATETIME_COL_DEF = exports.GRID_DATETIME_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'dateTime',
  sortComparator: _gridSortingUtils.gridDateComparator,
  valueFormatter: gridDateTimeFormatter,
  filterOperators: (0, _gridDateOperators.getGridDateOperators)(true),
  renderEditCell: _GridEditDateCell.renderEditDateCell,
  // @ts-ignore
  pastedValueParser: value => new Date(value)
});