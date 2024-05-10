import { createSelector, createSelectorMemoized } from '../../../utils/createSelector';
import { gridRowsLookupSelector } from '../rows/gridRowsSelector';
export const gridRowSelectionStateSelector = state => state.rowSelection;
export const selectedGridRowsCountSelector = createSelector(gridRowSelectionStateSelector, selection => selection.length);
export const selectedGridRowsSelector = createSelectorMemoized(gridRowSelectionStateSelector, gridRowsLookupSelector, (selectedRows, rowsLookup) => new Map(selectedRows.map(id => [id, rowsLookup[id]])));
export const selectedIdsLookupSelector = createSelectorMemoized(gridRowSelectionStateSelector, selection => selection.reduce((lookup, rowId) => {
  lookup[rowId] = rowId;
  return lookup;
}, {}));