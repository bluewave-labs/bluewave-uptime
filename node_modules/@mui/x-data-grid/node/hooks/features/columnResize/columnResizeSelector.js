"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridResizingColumnFieldSelector = exports.gridColumnResizeSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridColumnResizeSelector = state => state.columnResize;
exports.gridColumnResizeSelector = gridColumnResizeSelector;
const gridResizingColumnFieldSelector = exports.gridResizingColumnFieldSelector = (0, _createSelector.createSelector)(gridColumnResizeSelector, columnResize => columnResize.resizingColumnField);