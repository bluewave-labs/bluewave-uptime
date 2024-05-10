"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_STRING_COL_DEF = void 0;
var _GridEditInputCell = require("../components/cell/GridEditInputCell");
var _gridSortingUtils = require("../hooks/features/sorting/gridSortingUtils");
var _gridStringOperators = require("./gridStringOperators");
/**
 * TODO: Move pro and premium properties outside of this Community file
 */
const GRID_STRING_COL_DEF = exports.GRID_STRING_COL_DEF = {
  width: 100,
  minWidth: 50,
  maxWidth: Infinity,
  hideable: true,
  sortable: true,
  resizable: true,
  filterable: true,
  groupable: true,
  pinnable: true,
  // @ts-ignore
  aggregable: true,
  editable: false,
  sortComparator: _gridSortingUtils.gridStringOrNumberComparator,
  type: 'string',
  align: 'left',
  filterOperators: (0, _gridStringOperators.getGridStringOperators)(),
  renderEditCell: _GridEditInputCell.renderEditInputCell,
  getApplyQuickFilterFn: _gridStringOperators.getGridStringQuickFilterFn
};