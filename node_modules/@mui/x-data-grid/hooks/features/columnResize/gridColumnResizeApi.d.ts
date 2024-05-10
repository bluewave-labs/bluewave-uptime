import type { GridColDef } from '../../../models/colDef/gridColDef';
export declare const DEFAULT_GRID_AUTOSIZE_OPTIONS: {
    includeHeaders: boolean;
    includeOutliers: boolean;
    outliersFactor: number;
    expand: boolean;
};
export type GridAutosizeOptions = {
    /**
     * The columns to autosize. By default, applies to all columns.
     */
    columns?: GridColDef['field'][];
    /**
     * If true, include the header widths in the calculation.
     * @default false
     */
    includeHeaders?: boolean;
    /**
     * If true, width outliers will be ignored.
     * @default false
     */
    includeOutliers?: boolean;
    /**
     * The IQR factor range to detect outliers.
     * @default 1.5
     */
    outliersFactor?: number;
    /**
     * If the total width is less than the available width, expand columns to fill it.
     * @default false
     */
    expand?: boolean;
};
/**
 * The Resize API interface that is available in the grid `apiRef`.
 */
export interface GridColumnResizeApi {
    /**
     * Auto-size the columns of the grid based on the cells' content and the space available.
     * @param {GridAutosizeOptions} options The autosizing options
     * @returns {Promise} A promise that resolves when autosizing is completed
     */
    autosizeColumns: (options?: GridAutosizeOptions) => Promise<void>;
}
