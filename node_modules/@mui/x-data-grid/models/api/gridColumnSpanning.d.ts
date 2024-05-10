import { GridStateColDef } from '../colDef/gridColDef';
import { GridColumnIndex, GridCellColSpanInfo } from '../gridColumnSpanning';
import { GridRowId } from '../gridRows';
/**
 * The Column Spanning API interface that is available in the grid `apiRef`.
 */
export interface GridColumnSpanningApi {
    /**
     * Returns cell colSpan info.
     * @param {GridRowId} rowId The row id
     * @param {number} columnIndex The column index (0-based)
     * @returns {GridCellColSpanInfo|undefined} Cell colSpan info
     * @ignore - do not document.
     */
    unstable_getCellColSpanInfo: (rowId: GridRowId, columnIndex: GridColumnIndex) => GridCellColSpanInfo | undefined;
}
export interface GridColumnSpanningPrivateApi {
    /**
     * Calculate column spanning for each cell in the row
     * @param {Object} options The options to apply on the calculation.
     * @param {GridRowId} options.rowId The row id
     * @param {number} options.minFirstColumn First visible column index
     * @param {number} options.maxLastColumn Last visible column index
     * @param {GridStateColDef[]} options.columns List of columns to calculate colSpan for
     */
    calculateColSpan: (options: {
        rowId: GridRowId;
        minFirstColumn: number;
        maxLastColumn: number;
        columns: GridStateColDef[];
    }) => void;
}
