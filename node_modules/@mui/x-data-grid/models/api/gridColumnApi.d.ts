import { GridColDef, GridStateColDef } from '../colDef/gridColDef';
import type { GridColumnVisibilityModel } from '../../hooks/features/columns/gridColumnsInterfaces';
/**
 * The column API interface that is available in the grid [[apiRef]].
 * TODO: Differentiate interfaces based on the plan
 */
export interface GridColumnApi {
    /**
     * Returns the [[GridColDef]] for the given `field`.
     * @param {string} field The column field.
     * @returns {{GridStateColDef}} The [[GridStateColDef]].
     */
    getColumn: (field: string) => GridStateColDef;
    /**
     * Returns an array of [[GridColDef]] containing all the column definitions.
     * @returns {GridStateColDef[]} An array of [[GridStateColDef]].
     */
    getAllColumns: () => GridStateColDef[];
    /**
     * Returns the currently visible columns.
     * @returns {GridStateColDef[]} An array of [[GridStateColDef]].
     */
    getVisibleColumns: () => GridStateColDef[];
    /**
     * Returns the index position of a column. By default, only the visible columns are considered.
     * Pass `false` to `useVisibleColumns` to consider all columns.
     * @param {string} field The column field.
     * @param {boolean} useVisibleColumns Determines if all columns or the visible ones should be considered. Default is `true`.
     * @returns {number} The index position.
     */
    getColumnIndex: (field: string, useVisibleColumns?: boolean) => number;
    /**
     * Returns the left-position of a column relative to the inner border of the grid.
     * @param {string} field The column field.
     * @returns {number} The position in pixels.
     */
    getColumnPosition: (field: string) => number;
    /**
     * Updates the definition of multiple columns at the same time.
     * @param {GridColDef[]} cols The new column [[GridColDef]] objects.
     */
    updateColumns: (cols: GridColDef[]) => void;
    /**
     * Sets the column visibility model to the one given by `model`.
     * @param {GridColumnVisibilityModel} model The new visible columns model.
     */
    setColumnVisibilityModel: (model: GridColumnVisibilityModel) => void;
    /**
     * Changes the visibility of the column referred by `field`.
     * @param {string} field The column to change visibility.
     * @param {boolean} isVisible Pass `true` to show the column, or `false` to hide it. Default is `false`
     */
    setColumnVisibility: (field: string, isVisible: boolean) => void;
    /**
     * Updates the width of a column.
     * @param {string} field The column field.
     * @param {number} width The new width.
     */
    setColumnWidth: (field: string, width: number) => void;
    /**
     * Gets the index of a column relative to the columns that are reachable by scroll.
     * @param {string} field The column field.
     * @returns {number} The index of the column.
     */
    getColumnIndexRelativeToVisibleColumns: (field: string) => number;
}
export interface GridColumnReorderApi {
    /**
     * Moves a column from its original position to the position given by `targetIndexPosition`.
     * @param {string} field The field name
     * @param {number} targetIndexPosition The new position (0-based).
     */
    setColumnIndex: (field: string, targetIndexPosition: number) => void;
}
