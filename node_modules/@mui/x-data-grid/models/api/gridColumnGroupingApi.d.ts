import { GridColumnGroupLookup } from '../../hooks/features/columnGrouping/gridColumnGroupsInterfaces';
import { GridColumnGroup } from '../gridColumnGrouping';
/**
 * The column grouping API interface that is available in the grid [[apiRef]].
 */
export interface GridColumnGroupingApi {
    /**
     * Returns the id of the groups leading to the requested column.
     * The array is ordered by increasing depth (the last element is the direct parent of the column).
     * @param {string} field The field of of the column requested.
     * @returns {string[]} The id of the groups leading to the requested column.
     */
    getColumnGroupPath: (field: string) => GridColumnGroup['groupId'][];
    /**
     * Returns the column group lookup.
     * @returns {GridColumnGroupLookup} The column group lookup.
     */
    getAllGroupDetails: () => GridColumnGroupLookup;
}
