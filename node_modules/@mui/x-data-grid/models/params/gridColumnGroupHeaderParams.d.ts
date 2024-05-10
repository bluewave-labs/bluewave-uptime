import { GridColumnGroup } from '../gridColumnGrouping';
/**
 * Object passed as parameter in the column group header renderer.
 */
export interface GridColumnGroupHeaderParams extends Pick<GridColumnGroup, 'headerName' | 'description'> {
    /**
     * A unique string identifying the group.
     */
    groupId: GridColumnGroup['groupId'] | null;
    /**
     * The number parent the group have.
     */
    depth: number;
    /**
     * The maximal depth among visible columns.
     */
    maxDepth: number;
    /**
     * The column fields included in the group (including nested ones).
     */
    fields: string[];
    /**
     * The column index (0 based).
     */
    colIndex: number;
    /**
     * Indicate if the group is the last one for the given depth.
     */
    isLastColumn: boolean;
}
