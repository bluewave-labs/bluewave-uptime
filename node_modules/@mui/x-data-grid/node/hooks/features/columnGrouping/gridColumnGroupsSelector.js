"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridColumnGroupsUnwrappedModelSelector = exports.gridColumnGroupsLookupSelector = exports.gridColumnGroupsHeaderStructureSelector = exports.gridColumnGroupsHeaderMaxDepthSelector = exports.gridColumnGroupingSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
/**
 * @category ColumnGrouping
 * @ignore - do not document.
 */
const gridColumnGroupingSelector = state => state.columnGrouping;
exports.gridColumnGroupingSelector = gridColumnGroupingSelector;
const gridColumnGroupsUnwrappedModelSelector = exports.gridColumnGroupsUnwrappedModelSelector = (0, _createSelector.createSelectorMemoized)(gridColumnGroupingSelector, columnGrouping => columnGrouping?.unwrappedGroupingModel ?? {});
const gridColumnGroupsLookupSelector = exports.gridColumnGroupsLookupSelector = (0, _createSelector.createSelectorMemoized)(gridColumnGroupingSelector, columnGrouping => columnGrouping?.lookup ?? {});
const gridColumnGroupsHeaderStructureSelector = exports.gridColumnGroupsHeaderStructureSelector = (0, _createSelector.createSelectorMemoized)(gridColumnGroupingSelector, columnGrouping => columnGrouping?.headerStructure ?? []);
const gridColumnGroupsHeaderMaxDepthSelector = exports.gridColumnGroupsHeaderMaxDepthSelector = (0, _createSelector.createSelector)(gridColumnGroupingSelector, columnGrouping => columnGrouping?.maxDepth ?? 0);