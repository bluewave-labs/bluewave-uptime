"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridTopLevelRowCountSelector = exports.gridRowsLookupSelector = exports.gridRowsLoadingSelector = exports.gridRowsDataRowIdToIdLookupSelector = exports.gridRowTreeSelector = exports.gridRowTreeDepthsSelector = exports.gridRowMaximumTreeDepthSelector = exports.gridRowGroupingNameSelector = exports.gridRowCountSelector = exports.gridPinnedRowsSelector = exports.gridPinnedRowsCountSelector = exports.gridDataRowIdsSelector = exports.gridAdditionalRowGroupsSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridRowsStateSelector = state => state.rows;
const gridRowCountSelector = exports.gridRowCountSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.totalRowCount);
const gridRowsLoadingSelector = exports.gridRowsLoadingSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.loading);
const gridTopLevelRowCountSelector = exports.gridTopLevelRowCountSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.totalTopLevelRowCount);

// TODO rows v6: Rename
const gridRowsLookupSelector = exports.gridRowsLookupSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.dataRowIdToModelLookup);
const gridRowsDataRowIdToIdLookupSelector = exports.gridRowsDataRowIdToIdLookupSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.dataRowIdToIdLookup);
const gridRowTreeSelector = exports.gridRowTreeSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.tree);
const gridRowGroupingNameSelector = exports.gridRowGroupingNameSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.groupingName);
const gridRowTreeDepthsSelector = exports.gridRowTreeDepthsSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.treeDepths);
const gridRowMaximumTreeDepthSelector = exports.gridRowMaximumTreeDepthSelector = (0, _createSelector.createSelectorMemoized)(gridRowsStateSelector, rows => {
  const entries = Object.entries(rows.treeDepths);
  if (entries.length === 0) {
    return 1;
  }
  return entries.filter(([, nodeCount]) => nodeCount > 0).map(([depth]) => Number(depth)).sort((a, b) => b - a)[0] + 1;
});
const gridDataRowIdsSelector = exports.gridDataRowIdsSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows.dataRowIds);

/**
 * @ignore - do not document.
 */
const gridAdditionalRowGroupsSelector = exports.gridAdditionalRowGroupsSelector = (0, _createSelector.createSelector)(gridRowsStateSelector, rows => rows?.additionalRowGroups);

/**
 * @ignore - do not document.
 */
const gridPinnedRowsSelector = exports.gridPinnedRowsSelector = (0, _createSelector.createSelectorMemoized)(gridAdditionalRowGroupsSelector, additionalRowGroups => {
  const rawPinnedRows = additionalRowGroups?.pinnedRows;
  return {
    bottom: rawPinnedRows?.bottom?.map(rowEntry => ({
      id: rowEntry.id,
      model: rowEntry.model ?? {}
    })) ?? [],
    top: rawPinnedRows?.top?.map(rowEntry => ({
      id: rowEntry.id,
      model: rowEntry.model ?? {}
    })) ?? []
  };
});

/**
 * @ignore - do not document.
 */
const gridPinnedRowsCountSelector = exports.gridPinnedRowsCountSelector = (0, _createSelector.createSelector)(gridPinnedRowsSelector, pinnedRows => {
  return (pinnedRows?.top?.length || 0) + (pinnedRows?.bottom?.length || 0);
});