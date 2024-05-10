import { GridRowId } from '../gridRows';
/**
 * The Row Meta API interface that is available in the grid `apiRef`.
 */
export interface GridRowsMetaApi {
    /**
     * Gets base row height without considering additional height a row may take.
     * @param {GridRowId} id The id of the row.
     * @returns {number} The target row height.
     * @ignore - do not document.
     */
    unstable_getRowHeight: (id: GridRowId) => number;
    /**
     * Gets all sizes that compose the total height that the given row takes.
     * @param {GridRowId} id The id of the row.
     * @returns {Record<string, number>} The object containing the sizes.
     * @ignore - do not document.
     */
    unstable_getRowInternalSizes: (id: GridRowId) => Record<string, number> | undefined;
    /**
     * Updates the base height of a row.
     * @param {GridRowId} id The id of the row.
     * @param {number} height The new height.
     * @ignore - do not document.
     */
    unstable_setRowHeight: (id: GridRowId, height: number) => void;
    /**
     * Stores the row height measurement and triggers an hydration, if needed.
     * @param {GridRowId} id The id of the row.
     * @param {number} height The new height.
     * @param {string} position The position to it the row belongs to.
     * @ignore - do not document.
     */
    unstable_storeRowHeightMeasurement: (id: GridRowId, height: number) => void;
    /**
     * Updates the index of the last row measured.
     * @param {number} index The row index.
     * @ignore - do not document.
     */
    unstable_setLastMeasuredRowIndex: (index: number) => void;
    /**
     * Forces the recalculation of the heights of all rows.
     */
    resetRowHeights: () => void;
}
export interface GridRowsMetaPrivateApi {
    /**
     * Determines if the height of a row is "auto".
     * @param {GridRowId} id The id of the row.
     * @returns {boolean} True if the row height is "auto", false otherwise.
     */
    rowHasAutoHeight: (id: GridRowId) => boolean;
    /**
     * Returns the index of the last row measured.
     * The value considers only the rows reachable by scroll, for example first row has index=0 in all pages.
     * @returns {number} The index of the last measured row.
     */
    getLastMeasuredRowIndex: () => number;
}
