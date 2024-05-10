import { GridColumnGroup } from '../../../models/gridColumnGrouping';
export type GridColumnGroupLookup = {
    [groupId: string]: Omit<GridColumnGroup, 'children'>;
};
export type GridGroupingStructure = {
    groupId: null | string;
    columnFields: string[];
};
export interface GridColumnsGroupingState {
    lookup: GridColumnGroupLookup;
    headerStructure: GridGroupingStructure[][];
    unwrappedGroupingModel: {
        [columnField: string]: GridColumnGroup['groupId'][];
    };
    maxDepth: number;
}
