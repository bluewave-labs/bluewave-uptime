import type { GridColDef } from './colDef';
import { GridRowId } from './gridRows';
/**
 * The mode of the cell.
 */
export type GridCellMode = 'edit' | 'view';
/**
 * The mode of the row.
 */
export type GridRowMode = 'edit' | 'view';
/**
 * The coordinates of cell represented by their row and column indexes.
 */
export interface GridCellIndexCoordinates {
    colIndex: number;
    rowIndex: number;
}
/**
 * The coordinates of a cell represented by their row ID and column field.
 */
export interface GridCellCoordinates {
    id: GridRowId;
    field: GridColDef['field'];
}
/**
 * The coordinates of column header represented by their row and column indexes.
 */
export interface GridColumnHeaderIndexCoordinates {
    colIndex: number;
}
