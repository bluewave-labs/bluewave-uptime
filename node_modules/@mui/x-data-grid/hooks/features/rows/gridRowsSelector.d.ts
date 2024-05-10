import { GridStateCommunity } from '../../../models/gridStateCommunity';
export declare const gridRowCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
export declare const gridRowsLoadingSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean | undefined>;
export declare const gridTopLevelRowCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
export declare const gridRowsLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("./gridRowsInterfaces").GridRowIdToModelLookup<import("../../..").GridValidRowModel>>;
export declare const gridRowsDataRowIdToIdLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("./gridRowsInterfaces").GridRowIdToIdLookup>;
export declare const gridRowTreeSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowTreeConfig>;
export declare const gridRowGroupingNameSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, string>;
export declare const gridRowTreeDepthsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("./gridRowsInterfaces").GridTreeDepths>;
export declare const gridRowMaximumTreeDepthSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
export declare const gridDataRowIdsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowId[]>;
/**
 * @ignore - do not document.
 */
export declare const gridAdditionalRowGroupsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, {
    pinnedRows?: import("./gridRowsInterfaces").GridPinnedRowsState | undefined;
} | undefined>;
/**
 * @ignore - do not document.
 */
export declare const gridPinnedRowsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, {
    bottom: {
        id: import("../../..").GridRowId;
        model: import("../../..").GridValidRowModel;
    }[];
    top: {
        id: import("../../..").GridRowId;
        model: import("../../..").GridValidRowModel;
    }[];
}>;
/**
 * @ignore - do not document.
 */
export declare const gridPinnedRowsCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
