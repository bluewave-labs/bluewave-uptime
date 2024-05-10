"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridVisibleRowsLookupSelector = exports.gridQuickFilterValuesSelector = exports.gridFilteredTopLevelRowCountSelector = exports.gridFilteredSortedTopLevelRowEntriesSelector = exports.gridFilteredSortedRowIdsSelector = exports.gridFilteredSortedRowEntriesSelector = exports.gridFilteredRowsLookupSelector = exports.gridFilteredDescendantCountLookupSelector = exports.gridFilterModelSelector = exports.gridFilterActiveItemsSelector = exports.gridFilterActiveItemsLookupSelector = exports.gridExpandedSortedRowIdsSelector = exports.gridExpandedSortedRowEntriesSelector = exports.gridExpandedRowCountSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
var _gridSortingSelector = require("../sorting/gridSortingSelector");
var _gridColumnsSelector = require("../columns/gridColumnsSelector");
var _gridRowsSelector = require("../rows/gridRowsSelector");
/**
 * @category Filtering
 */
const gridFilterStateSelector = state => state.filter;

/**
 * Get the current filter model.
 * @category Filtering
 */
const gridFilterModelSelector = exports.gridFilterModelSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.filterModel);

/**
 * Get the current quick filter values.
 * @category Filtering
 */
const gridQuickFilterValuesSelector = exports.gridQuickFilterValuesSelector = (0, _createSelector.createSelector)(gridFilterModelSelector, filterModel => filterModel.quickFilterValues);

/**
 * @category Visible rows
 * @ignore - do not document.
 */
const gridVisibleRowsLookupSelector = state => state.visibleRowsLookup;

/**
 * @category Filtering
 * @ignore - do not document.
 */
exports.gridVisibleRowsLookupSelector = gridVisibleRowsLookupSelector;
const gridFilteredRowsLookupSelector = exports.gridFilteredRowsLookupSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.filteredRowsLookup);

/**
 * @category Filtering
 * @ignore - do not document.
 */
const gridFilteredDescendantCountLookupSelector = exports.gridFilteredDescendantCountLookupSelector = (0, _createSelector.createSelector)(gridFilterStateSelector, filterState => filterState.filteredDescendantCountLookup);

/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */
const gridExpandedSortedRowEntriesSelector = exports.gridExpandedSortedRowEntriesSelector = (0, _createSelector.createSelectorMemoized)(gridVisibleRowsLookupSelector, _gridSortingSelector.gridSortedRowEntriesSelector, (visibleRowsLookup, sortedRows) => sortedRows.filter(row => visibleRowsLookup[row.id] !== false));

/**
 * Get the id of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */
const gridExpandedSortedRowIdsSelector = exports.gridExpandedSortedRowIdsSelector = (0, _createSelector.createSelectorMemoized)(gridExpandedSortedRowEntriesSelector, visibleSortedRowEntries => visibleSortedRowEntries.map(row => row.id));

/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */
const gridFilteredSortedRowEntriesSelector = exports.gridFilteredSortedRowEntriesSelector = (0, _createSelector.createSelectorMemoized)(gridFilteredRowsLookupSelector, _gridSortingSelector.gridSortedRowEntriesSelector, (filteredRowsLookup, sortedRows) => sortedRows.filter(row => filteredRowsLookup[row.id] !== false));

/**
 * Get the id of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */
const gridFilteredSortedRowIdsSelector = exports.gridFilteredSortedRowIdsSelector = (0, _createSelector.createSelectorMemoized)(gridFilteredSortedRowEntriesSelector, filteredSortedRowEntries => filteredSortedRowEntries.map(row => row.id));

/**
 * Get the id and the model of the top level rows accessible after the filtering process.
 * @category Filtering
 */
const gridFilteredSortedTopLevelRowEntriesSelector = exports.gridFilteredSortedTopLevelRowEntriesSelector = (0, _createSelector.createSelectorMemoized)(gridExpandedSortedRowEntriesSelector, _gridRowsSelector.gridRowTreeSelector, _gridRowsSelector.gridRowMaximumTreeDepthSelector, (visibleSortedRows, rowTree, rowTreeDepth) => {
  if (rowTreeDepth < 2) {
    return visibleSortedRows;
  }
  return visibleSortedRows.filter(row => rowTree[row.id]?.depth === 0);
});

/**
 * Get the amount of rows accessible after the filtering process.
 * @category Filtering
 */
const gridExpandedRowCountSelector = exports.gridExpandedRowCountSelector = (0, _createSelector.createSelector)(gridExpandedSortedRowEntriesSelector, visibleSortedRows => visibleSortedRows.length);

/**
 * Get the amount of top level rows accessible after the filtering process.
 * @category Filtering
 */
const gridFilteredTopLevelRowCountSelector = exports.gridFilteredTopLevelRowCountSelector = (0, _createSelector.createSelector)(gridFilteredSortedTopLevelRowEntriesSelector, visibleSortedTopLevelRows => visibleSortedTopLevelRows.length);

/**
 * @category Filtering
 * @ignore - do not document.
 */
const gridFilterActiveItemsSelector = exports.gridFilterActiveItemsSelector = (0, _createSelector.createSelectorMemoized)(gridFilterModelSelector, _gridColumnsSelector.gridColumnLookupSelector, (filterModel, columnLookup) => filterModel.items?.filter(item => {
  if (!item.field) {
    return false;
  }
  const column = columnLookup[item.field];
  if (!column?.filterOperators || column?.filterOperators?.length === 0) {
    return false;
  }
  const filterOperator = column.filterOperators.find(operator => operator.value === item.operator);
  if (!filterOperator) {
    return false;
  }
  return !filterOperator.InputComponent || item.value != null && item.value?.toString() !== '';
}));
/**
 * @category Filtering
 * @ignore - do not document.
 */
const gridFilterActiveItemsLookupSelector = exports.gridFilterActiveItemsLookupSelector = (0, _createSelector.createSelectorMemoized)(gridFilterActiveItemsSelector, activeFilters => {
  const result = activeFilters.reduce((res, filterItem) => {
    if (!res[filterItem.field]) {
      res[filterItem.field] = [filterItem];
    } else {
      res[filterItem.field].push(filterItem);
    }
    return res;
  }, {});
  return result;
});