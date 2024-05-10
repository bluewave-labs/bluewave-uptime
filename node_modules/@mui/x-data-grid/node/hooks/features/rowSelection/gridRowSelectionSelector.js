"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedIdsLookupSelector = exports.selectedGridRowsSelector = exports.selectedGridRowsCountSelector = exports.gridRowSelectionStateSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
var _gridRowsSelector = require("../rows/gridRowsSelector");
const gridRowSelectionStateSelector = state => state.rowSelection;
exports.gridRowSelectionStateSelector = gridRowSelectionStateSelector;
const selectedGridRowsCountSelector = exports.selectedGridRowsCountSelector = (0, _createSelector.createSelector)(gridRowSelectionStateSelector, selection => selection.length);
const selectedGridRowsSelector = exports.selectedGridRowsSelector = (0, _createSelector.createSelectorMemoized)(gridRowSelectionStateSelector, _gridRowsSelector.gridRowsLookupSelector, (selectedRows, rowsLookup) => new Map(selectedRows.map(id => [id, rowsLookup[id]])));
const selectedIdsLookupSelector = exports.selectedIdsLookupSelector = (0, _createSelector.createSelectorMemoized)(gridRowSelectionStateSelector, selection => selection.reduce((lookup, rowId) => {
  lookup[rowId] = rowId;
  return lookup;
}, {}));