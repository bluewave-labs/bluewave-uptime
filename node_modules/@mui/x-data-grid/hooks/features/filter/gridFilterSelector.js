import { createSelector, createSelectorMemoized } from '../../../utils/createSelector';
import { gridSortedRowEntriesSelector } from '../sorting/gridSortingSelector';
import { gridColumnLookupSelector } from '../columns/gridColumnsSelector';
import { gridRowMaximumTreeDepthSelector, gridRowTreeSelector } from '../rows/gridRowsSelector';

/**
 * @category Filtering
 */
const gridFilterStateSelector = state => state.filter;

/**
 * Get the current filter model.
 * @category Filtering
 */
export const gridFilterModelSelector = createSelector(gridFilterStateSelector, filterState => filterState.filterModel);

/**
 * Get the current quick filter values.
 * @category Filtering
 */
export const gridQuickFilterValuesSelector = createSelector(gridFilterModelSelector, filterModel => filterModel.quickFilterValues);

/**
 * @category Visible rows
 * @ignore - do not document.
 */
export const gridVisibleRowsLookupSelector = state => state.visibleRowsLookup;

/**
 * @category Filtering
 * @ignore - do not document.
 */
export const gridFilteredRowsLookupSelector = createSelector(gridFilterStateSelector, filterState => filterState.filteredRowsLookup);

/**
 * @category Filtering
 * @ignore - do not document.
 */
export const gridFilteredDescendantCountLookupSelector = createSelector(gridFilterStateSelector, filterState => filterState.filteredDescendantCountLookup);

/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */
export const gridExpandedSortedRowEntriesSelector = createSelectorMemoized(gridVisibleRowsLookupSelector, gridSortedRowEntriesSelector, (visibleRowsLookup, sortedRows) => sortedRows.filter(row => visibleRowsLookup[row.id] !== false));

/**
 * Get the id of the rows accessible after the filtering process.
 * Does not contain the collapsed children.
 * @category Filtering
 */
export const gridExpandedSortedRowIdsSelector = createSelectorMemoized(gridExpandedSortedRowEntriesSelector, visibleSortedRowEntries => visibleSortedRowEntries.map(row => row.id));

/**
 * Get the id and the model of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */
export const gridFilteredSortedRowEntriesSelector = createSelectorMemoized(gridFilteredRowsLookupSelector, gridSortedRowEntriesSelector, (filteredRowsLookup, sortedRows) => sortedRows.filter(row => filteredRowsLookup[row.id] !== false));

/**
 * Get the id of the rows accessible after the filtering process.
 * Contains the collapsed children.
 * @category Filtering
 */
export const gridFilteredSortedRowIdsSelector = createSelectorMemoized(gridFilteredSortedRowEntriesSelector, filteredSortedRowEntries => filteredSortedRowEntries.map(row => row.id));

/**
 * Get the id and the model of the top level rows accessible after the filtering process.
 * @category Filtering
 */
export const gridFilteredSortedTopLevelRowEntriesSelector = createSelectorMemoized(gridExpandedSortedRowEntriesSelector, gridRowTreeSelector, gridRowMaximumTreeDepthSelector, (visibleSortedRows, rowTree, rowTreeDepth) => {
  if (rowTreeDepth < 2) {
    return visibleSortedRows;
  }
  return visibleSortedRows.filter(row => rowTree[row.id]?.depth === 0);
});

/**
 * Get the amount of rows accessible after the filtering process.
 * @category Filtering
 */
export const gridExpandedRowCountSelector = createSelector(gridExpandedSortedRowEntriesSelector, visibleSortedRows => visibleSortedRows.length);

/**
 * Get the amount of top level rows accessible after the filtering process.
 * @category Filtering
 */
export const gridFilteredTopLevelRowCountSelector = createSelector(gridFilteredSortedTopLevelRowEntriesSelector, visibleSortedTopLevelRows => visibleSortedTopLevelRows.length);

/**
 * @category Filtering
 * @ignore - do not document.
 */
export const gridFilterActiveItemsSelector = createSelectorMemoized(gridFilterModelSelector, gridColumnLookupSelector, (filterModel, columnLookup) => filterModel.items?.filter(item => {
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
export const gridFilterActiveItemsLookupSelector = createSelectorMemoized(gridFilterActiveItemsSelector, activeFilters => {
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