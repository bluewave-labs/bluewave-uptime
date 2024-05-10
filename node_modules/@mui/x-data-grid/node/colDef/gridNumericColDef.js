"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_NUMERIC_COL_DEF = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _gridSortingUtils = require("../hooks/features/sorting/gridSortingUtils");
var _utils = require("../utils/utils");
var _gridNumericOperators = require("./gridNumericOperators");
var _gridStringColDef = require("./gridStringColDef");
const GRID_NUMERIC_COL_DEF = exports.GRID_NUMERIC_COL_DEF = (0, _extends2.default)({}, _gridStringColDef.GRID_STRING_COL_DEF, {
  type: 'number',
  align: 'right',
  headerAlign: 'right',
  sortComparator: _gridSortingUtils.gridNumberComparator,
  valueParser: value => value === '' ? null : Number(value),
  valueFormatter: value => (0, _utils.isNumber)(value) ? value.toLocaleString() : value || '',
  filterOperators: (0, _gridNumericOperators.getGridNumericOperators)(),
  getApplyQuickFilterFn: _gridNumericOperators.getGridNumericQuickFilterFn
});