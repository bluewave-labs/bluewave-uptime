"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_BOOLEAN_COL_DEF = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _gridStringColDef = require("./gridStringColDef");
var _GridBooleanCell = require("../components/cell/GridBooleanCell");
var _GridEditBooleanCell = require("../components/cell/GridEditBooleanCell");
var _gridSortingUtils = require("../hooks/features/sorting/gridSortingUtils");
var _gridBooleanOperators = require("./gridBooleanOperators");
const gridBooleanFormatter = (value, row, column, apiRef) => {
  return value ? apiRef.current.getLocaleText('booleanCellTrueLabel') : apiRef.current.getLocaleText('booleanCellFalseLabel');
};
const stringToBoolean = value => {
  switch (value.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case 'null':
    case 'undefined':
      return false;
    default:
      return undefined;
  }
};
const GRID_BOOLEAN_COL_DEF = exports.GRID_BOOLEAN_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'boolean',
  display: 'flex',
  align: 'center',
  headerAlign: 'center',
  renderCell: _GridBooleanCell.renderBooleanCell,
  renderEditCell: _GridEditBooleanCell.renderEditBooleanCell,
  sortComparator: _gridSortingUtils.gridNumberComparator,
  valueFormatter: gridBooleanFormatter,
  filterOperators: (0, _gridBooleanOperators.getGridBooleanOperators)(),
  getApplyQuickFilterFn: undefined,
  // @ts-ignore
  aggregable: false,
  // @ts-ignore
  pastedValueParser: value => stringToBoolean(value)
});