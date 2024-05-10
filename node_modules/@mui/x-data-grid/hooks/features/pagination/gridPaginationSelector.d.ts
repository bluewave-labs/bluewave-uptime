import { GridStateCommunity } from '../../../models/gridStateCommunity';
/**
 * @category Pagination
 * @ignore - do not document.
 */
export declare const gridPaginationSelector: (state: GridStateCommunity) => import("./gridPaginationInterfaces").GridPaginationState;
/**
 * Get the pagination model
 * @category Pagination
 */
export declare const gridPaginationModelSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridPaginationModel>;
/**
 * Get the row count
 * @category Pagination
 */
export declare const gridPaginationRowCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
/**
 * Get the pagination meta
 * @category Pagination
 */
export declare const gridPaginationMetaSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridPaginationMeta>;
/**
 * Get the index of the page to render if the pagination is enabled
 * @category Pagination
 */
export declare const gridPageSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
/**
 * Get the maximum amount of rows to display on a single page if the pagination is enabled
 * @category Pagination
 */
export declare const gridPageSizeSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
/**
 * Get the amount of pages needed to display all the rows if the pagination is enabled
 * @category Pagination
 */
export declare const gridPageCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
/**
 * Get the index of the first and the last row to include in the current page if the pagination is enabled.
 * @category Pagination
 */
export declare const gridPaginationRowRangeSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, {
    firstRowIndex: number;
    lastRowIndex: number;
} | null>;
/**
 * Get the id and the model of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */
export declare const gridPaginatedVisibleSortedGridRowEntriesSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowEntry<import("../../..").GridValidRowModel>[]>;
/**
 * Get the id of each row to include in the current page if the pagination is enabled.
 * @category Pagination
 */
export declare const gridPaginatedVisibleSortedGridRowIdsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowId[]>;
