import { GridSortDirection, GridSortModel } from '../../../models/gridSortModel';
import type { GridStateCommunity } from '../../../models/gridStateCommunity';
import type { GridValidRowModel, GridRowEntry } from '../../../models/gridRows';
/**
 * Get the id of the rows after the sorting process.
 * @category Sorting
 */
export declare const gridSortedRowIdsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../../models/gridRows").GridRowId[]>;
/**
 * Get the id and the model of the rows after the sorting process.
 * @category Sorting
 */
export declare const gridSortedRowEntriesSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, GridRowEntry<GridValidRowModel>[]>;
/**
 * Get the current sorting model.
 * @category Sorting
 */
export declare const gridSortModelSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, GridSortModel>;
export type GridSortColumnLookup = Record<string, {
    sortDirection: GridSortDirection;
    sortIndex?: number;
}>;
/**
 * @category Sorting
 * @ignore - do not document.
 */
export declare const gridSortColumnLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, GridSortColumnLookup>;
