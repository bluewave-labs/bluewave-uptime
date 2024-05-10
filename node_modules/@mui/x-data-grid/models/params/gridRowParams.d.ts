import { GridValidRowModel, GridRowEntry, GridRowId } from '../gridRows';
import type { GridColDef } from '../colDef/gridColDef';
/**
 * Object passed as parameter in the row callbacks.
 * @demos
 *   - [Master detail](/x/react-data-grid/master-detail/)
 */
export interface GridRowParams<R extends GridValidRowModel = any> {
    /**
     * The grid row id.
     */
    id: GridRowId;
    /**
     * The row model of the row that the current cell belongs to.
     */
    row: R;
    /**
     * All grid columns.
     */
    columns: GridColDef[];
}
interface GridRowVisibilityParams {
    /**
     * Whether this row is the first visible or not.
     */
    isFirstVisible: boolean;
    /**
     * Whether this row is the last visible or not.
     */
    isLastVisible: boolean;
    /**
     * Index of the row in the current page.
     * If the pagination is disabled, it will be the index relative to all filtered rows.
     */
    indexRelativeToCurrentPage: number;
}
/**
 * Object passed as parameter in the row `getRowClassName` callback prop.
 * @demos
 *   - [Styling rows](/x/react-data-grid/style/#styling-rows)
 */
export interface GridRowClassNameParams<R extends GridValidRowModel = any> extends GridRowParams<R>, GridRowVisibilityParams {
}
/**
 * Object passed as parameter in the row `getRowHeight` callback prop.
 */
export interface GridRowHeightParams extends GridRowEntry {
    /**
     * The grid current density factor.
     */
    densityFactor: number;
}
/**
 * The getRowHeight return value.
 */
export type GridRowHeightReturnValue = number | null | undefined | 'auto';
declare enum GridRowEditStartReasons {
    enterKeyDown = "enterKeyDown",
    cellDoubleClick = "cellDoubleClick",
    printableKeyDown = "printableKeyDown",
    deleteKeyDown = "deleteKeyDown"
}
/**
 * Params passed to the `rowEditStart` event.
 */
export interface GridRowEditStartParams<R extends GridValidRowModel = any> extends GridRowParams<R> {
    /**
     * Which field triggered this event.
     */
    field?: string;
    /**
     * The reason for this event to be triggered.
     */
    reason?: GridRowEditStartReasons;
    /**
     * If the reason is related to a keyboard event, it contains which key was pressed.
     * @deprecated No longer needed.
     */
    key?: string;
}
declare enum GridRowEditStopReasons {
    rowFocusOut = "rowFocusOut",
    escapeKeyDown = "escapeKeyDown",
    enterKeyDown = "enterKeyDown",
    tabKeyDown = "tabKeyDown",
    shiftTabKeyDown = "shiftTabKeyDown"
}
export interface GridRowEditStopParams<R extends GridValidRowModel = any> extends GridRowParams<R> {
    /**
     * Which field triggered this event.
     */
    field?: string;
    /**
     * The reason for this event to be triggered.
     */
    reason?: GridRowEditStopReasons;
}
/**
 * Object passed as parameter in the row `getRowSpacing` callback prop.
 * @demos
 *   - [Row spacing](/x/react-data-grid/row-height/#row-spacing)
 */
export interface GridRowSpacingParams extends GridRowEntry, GridRowVisibilityParams {
}
/**
 * The getRowSpacing return value.
 */
export interface GridRowSpacing {
    top?: number;
    bottom?: number;
}
export { GridRowEditStartReasons, GridRowEditStopReasons };
