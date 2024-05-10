import type { ElementSize } from '../../../models/elementSize';
export interface GridDimensions {
    /**
     * Indicates that the dimensions have been initialized.
     */
    isReady: boolean;
    /**
     * The root container size.
     */
    root: ElementSize;
    /**
     * The viewport size including scrollbars.
     */
    viewportOuterSize: ElementSize;
    /**
     * The viewport size not including scrollbars.
     */
    viewportInnerSize: ElementSize;
    /**
     * The size of the main content (unpinned rows & columns).
     */
    contentSize: ElementSize;
    /**
     * The minimum size to display the grid, including all pinned sections and headers.
     */
    minimumSize: ElementSize;
    /**
     * Indicates if a scroll is currently needed to go from the beginning of the first column to the end of the last column.
     */
    hasScrollX: boolean;
    /**
     * Indicates if a scroll is currently needed to go from the beginning of the first row to the end of the last row.
     */
    hasScrollY: boolean;
    /**
     * Size of the scrollbar used to scroll the rows in pixel.
     * It is defined even when the scrollbar is currently not needed.
     */
    scrollbarSize: number;
    /**
     * Width of a row.
     */
    rowWidth: number;
    /**
     * Height of a row.
     */
    rowHeight: number;
    /**
     * Size of all the visible columns.
     */
    columnsTotalWidth: number;
    /**
     * Size of left pinned columns.
     */
    leftPinnedWidth: number;
    /**
     * Size of right pinned columns.
     */
    rightPinnedWidth: number;
    /**
     * Height of one column header.
     */
    headerHeight: number;
    /**
     * Height of header filters.
     */
    headerFilterHeight: number;
    /**
     * Height of all the column headers.
     */
    headersTotalHeight: number;
    /**
     * Size of the top container.
     */
    topContainerHeight: number;
    /**
     * Size of the bottom container.
     */
    bottomContainerHeight: number;
}
export interface GridDimensionsApi {
    /**
     * Triggers a resize of the component and recalculation of width and height.
     */
    resize: () => void;
    /**
     * Returns the dimensions of the grid
     * @returns {GridDimensions} The dimension information of the grid. If `null`, the grid is not ready yet.
     */
    getRootDimensions: () => GridDimensions;
}
export interface GridDimensionsPrivateApi {
    /**
     * Recalculates the grid layout. This should be called when an operation has changed the size
     * of the content of the grid.
     */
    updateDimensions: () => void;
    /**
     * Returns the amount of rows that are currently visible in the viewport
     * @returns {number} The amount of rows visible in the viewport
     */
    getViewportPageSize: () => number;
}
