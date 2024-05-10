"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridTabIndexStateSelector = exports.gridTabIndexColumnHeaderSelector = exports.gridTabIndexColumnHeaderFilterSelector = exports.gridTabIndexColumnGroupHeaderSelector = exports.gridTabIndexCellSelector = exports.gridFocusStateSelector = exports.gridFocusColumnHeaderSelector = exports.gridFocusColumnHeaderFilterSelector = exports.gridFocusColumnGroupHeaderSelector = exports.gridFocusCellSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridFocusStateSelector = state => state.focus;
exports.gridFocusStateSelector = gridFocusStateSelector;
const gridFocusCellSelector = exports.gridFocusCellSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.cell);
const gridFocusColumnHeaderSelector = exports.gridFocusColumnHeaderSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnHeader);
const gridFocusColumnHeaderFilterSelector = exports.gridFocusColumnHeaderFilterSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnHeaderFilter);
const gridFocusColumnGroupHeaderSelector = exports.gridFocusColumnGroupHeaderSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnGroupHeader);
const gridTabIndexStateSelector = state => state.tabIndex;
exports.gridTabIndexStateSelector = gridTabIndexStateSelector;
const gridTabIndexCellSelector = exports.gridTabIndexCellSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.cell);
const gridTabIndexColumnHeaderSelector = exports.gridTabIndexColumnHeaderSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnHeader);
const gridTabIndexColumnHeaderFilterSelector = exports.gridTabIndexColumnHeaderFilterSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnHeaderFilter);
const gridTabIndexColumnGroupHeaderSelector = exports.gridTabIndexColumnGroupHeaderSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnGroupHeader);