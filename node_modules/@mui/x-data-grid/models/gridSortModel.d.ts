import { GridRowId, GridTreeNode } from './gridRows';
export type GridSortDirection = 'asc' | 'desc' | null | undefined;
export interface GridSortCellParams<V = any> {
    id: GridRowId;
    field: string;
    value: V;
    rowNode: GridTreeNode;
    api: any;
}
/**
 * The type of the sort comparison function.
 */
export type GridComparatorFn<V = any> = (v1: V, v2: V, cellParams1: GridSortCellParams<V>, cellParams2: GridSortCellParams<V>) => number;
/**
 * Object that represents the column sorted data, part of the [[GridSortModel]].
 */
export interface GridSortItem {
    /**
     * The column field identifier.
     */
    field: string;
    /**
     * The direction of the column that the grid should sort.
     */
    sort: GridSortDirection;
}
/**
 * The model used for sorting the grid.
 */
export type GridSortModel = GridSortItem[];
