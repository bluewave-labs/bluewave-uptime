"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridPaginationSelector = exports.gridPaginationRowRangeSelector = exports.gridPaginationRowCountSelector = exports.gridPaginationModelSelector = exports.gridPaginationMetaSelector = exports.gridPaginatedVisibleSortedGridRowIdsSelector = exports.gridPaginatedVisibleSortedGridRowEntriesSelector = exports.gridPageSizeSelector = exports.gridPageSelector = exports.gridPageCountSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
var _gridFilterSelector = require("../filter/gridFilterSelector");
var _gridRowsSelector = require("../rows/gridRowsSelector");
var _gridPaginationUtils = require("./gridPaginationUtils");
/**
 * @category Pagination
 * @ignore - do not document.
 */
const gridPaginationSelector = state => state.pagination;

/**
 * Get the pagination model
 * @category Pagination
 */
exports.gridPaginationSelector = gridPaginationSelector;
const gridPaginationModelSelector = exports.gridPaginationModelSelector = (0, _createSelector.createSelector)(gridPaginationSelector, pagination => pagination.paginationModel);

/**
 * Get the row count
 * @category Pagination
 */
const gridPaginationRowCountSelector = exports.gridPaginationRowCountSelector = (0, _createSelector.createSelector)(gridPaginationSelector, pagination => pagination.rowCount);

/**
 * Get the pagination meta
 * @category Pagination
 */
const gridPaginationMetaSelector = exports.gridPaginationMetaSelector = (0, _createSelector.createSelector)(gridPaginationSelector, pagination => pagination.meta);

/**
 * Get the index of the page to render if the pagination is enabled
 * @category Pagination
 */
const gridPageSelector = exports.gridPageSelector = (0, _createSelector.createSelector)(gridPaginationModelSelector, paginationModel => paginationModel.page);

/**
 * Get the maximum amount of rows to display on a single page if the pagination is enabled
 * @category Pagination
 */
const gridPageSizeSelector = exports.gridPageSizeSelector = (0, _createSelector.createSelector)(gridPaginationModelSelector, paginationModel => paginationModel.pageSize);

/**
 * Get the amount of pages needed to display all the rows if the pagination is enabled
 * @category Pagination
 */
const gridPageCountSelector = exports.gridPageCountSelector = (0, _createSelector.createSelector)(gridPaginationModelSelector, gridPaginationRowCountSelector, (paginationModel, rowCount) => (0, _gridPaginationUtils.getPageCount)(rowCount, paginationModel.pageSize, paginationModel.page));

/**
 * Get the index of the first and the last row to include in the current page if the pagination is enabled.
 * @category Pagination
 */
const gridPaginationRowRangeSelector = exports.gridPaginationRowRangeSelector = (0, _createSelector.createSelectorMemoized)(gridPaginationModelSelector, _gridRowsSelector.gridRowTreeSelector, _gridRowsSelector.gridRowMaximumTreeDepthSelector, _gridFilterSelector.gridExpandedSortedRowEntriesSelector, _gridFilterSelector.gridFilteredSortedTopLevelRowEntriesSelector, (paginationModel, rowTree, rowTreeDepth, visibleSortedRowEntries, visibleSortedTopLevelRowEntries) => {
  const visibleTopLevelRowCount = visibleSortedTopLevelRowEntries.length;
  const topLevelFirstRowIndex = Math.min(paginationModel.pageSize * paginationModel.page, visibleTopLevelRowCount - 1);
  const topLevelLastRowIndex = Math.min(topLevelFirstRowIndex + paginationModel.pageSize - 1, visibleTopLevelRowCount - 1);

  // The range contains no element
  if (topLevelFirstRowIndex === -1 || topLevelLastRowIndex === -1) {
    return null;
  }

  // The tree is flat, there is no need to look for children
  if (rowTreeDepth < 2) {
    return {
      firstRowIndex: topLevelFirstRowIndex,
      lastRowIndex: topLevelLastRowIndex
    };
  }
  const topLevelFirstRow = visibleSortedTopLevelRowEntries[topLevelFirstRowIndex];
  const topLevelRowsInCurrentPageCount = topLevelLastRowIndex - topLevelFirstRowIndex + 1;
  const firstRowIndex = visibleSortedRowEntries.findIndex(row => row.id === topLevelFirstRow.id);
  let lastRowIndex = firstRowIndex;
  let topLevelRowAdded = 0;
  while (lastRowIndex < visibleSortedRowEntries.length && topLevelRowAdded <= topLevelRowsInCurrentPageCount) {
    const row = visibleSortedRowEntries[lastRowIndex];
    const depth = rowTree[row.id]?.depth;
    if (depth === undefined) {
      lastRowIndex += 1;
    } else {
      if (topLevelRowAdded < topLevelRowsInCurrentPageCount || depth > 0) {
        lastRowIndex += 1;
      }
      if (depth === 0) {
        topLevelRowAdded += 1;
      }
    }
  }
  return {
    firstRowIndex,
    lastRowIndex: lastRowIndex - 1
  };
});

/**
 * Get the id and the model of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */
const gridPaginatedVisibleSortedGridRowEntriesSelector = exports.gridPaginatedVisibleSortedGridRowEntriesSelector = (0, _createSelector.createSelectorMemoized)(_gridFilterSelector.gridExpandedSortedRowEntriesSelector, gridPaginationRowRangeSelector, (visibleSortedRowEntries, paginationRange) => {
  if (!paginationRange) {
    return [];
  }
  return visibleSortedRowEntries.slice(paginationRange.firstRowIndex, paginationRange.lastRowIndex + 1);
});

/**
 * Get the id of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */
const gridPaginatedVisibleSortedGridRowIdsSelector = exports.gridPaginatedVisibleSortedGridRowIdsSelector = (0, _createSelector.createSelectorMemoized)(_gridFilterSelector.gridExpandedSortedRowIdsSelector, gridPaginationRowRangeSelector, (visibleSortedRowIds, paginationRange) => {
  if (!paginationRange) {
    return [];
  }
  return visibleSortedRowIds.slice(paginationRange.firstRowIndex, paginationRange.lastRowIndex + 1);
});