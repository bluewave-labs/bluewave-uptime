import { GridStateCommunity } from '../../../models/gridStateCommunity';
/**
 * @category ColumnGrouping
 * @ignore - do not document.
 */
export declare const gridColumnGroupingSelector: (state: GridStateCommunity) => import("./gridColumnGroupsInterfaces").GridColumnsGroupingState;
export declare const gridColumnGroupsUnwrappedModelSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, {
    [columnField: string]: string[];
}>;
export declare const gridColumnGroupsLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("./gridColumnGroupsInterfaces").GridColumnGroupLookup>;
export declare const gridColumnGroupsHeaderStructureSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("./gridColumnGroupsInterfaces").GridGroupingStructure[][]>;
export declare const gridColumnGroupsHeaderMaxDepthSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
