import { GridColumnGroupingModel, GridColumnGroup } from '../../../models/gridColumnGrouping';
import { GridColDef } from '../../../models/colDef';
import { GridGroupingStructure } from './gridColumnGroupsInterfaces';
type UnwrappedGroupingModel = {
    [key: GridColDef['field']]: GridColumnGroup['groupId'][];
};
/**
 * This is a function that provide for each column the array of its parents.
 * Parents are ordered from the root to the leaf.
 * @param columnGroupingModel The model such as provided in DataGrid props
 * @returns An object `{[field]: groupIds}` where `groupIds` is the parents of the column `field`
 */
export declare const unwrapGroupingColumnModel: (columnGroupingModel?: GridColumnGroupingModel) => UnwrappedGroupingModel;
export declare const getColumnGroupsHeaderStructure: (orderedColumns: string[], unwrappedGroupingModel: UnwrappedGroupingModel, pinnedFields: {
    right?: string[];
    left?: string[];
}) => GridGroupingStructure[][];
export {};
