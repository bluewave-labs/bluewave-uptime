import { GridRowId, GridValidRowModel } from '../gridRows';
import { GridCellParams } from './gridCellParams';
/**
 * Params passed to `apiRef.current.setEditCellValue`.
 */
export interface GridEditCellValueParams {
    /**
     * The row id.
     */
    id: GridRowId;
    /**
     * The field.
     */
    field: string;
    /**
     * The new value for the cell.
     */
    value: any;
    /**
     * The debounce time in milliseconds.
     */
    debounceMs?: number;
    /**
     * TBD
     */
    unstable_skipValueParser?: boolean;
}
declare enum GridCellEditStartReasons {
    enterKeyDown = "enterKeyDown",
    cellDoubleClick = "cellDoubleClick",
    printableKeyDown = "printableKeyDown",
    deleteKeyDown = "deleteKeyDown",
    pasteKeyDown = "pasteKeyDown"
}
/**
 * Params passed to the `cellEditStart` event.
 */
export interface GridCellEditStartParams<R extends GridValidRowModel = any, V = any, F = V> extends GridCellParams<R, V, F> {
    /**
     * The reason for this event to be triggered.
     */
    reason?: GridCellEditStartReasons;
    /**
     * If the reason is related to a keyboard event, it contains which key was pressed.
     * @deprecated No longer needed.
     */
    key?: string;
}
declare enum GridCellEditStopReasons {
    cellFocusOut = "cellFocusOut",
    escapeKeyDown = "escapeKeyDown",
    enterKeyDown = "enterKeyDown",
    tabKeyDown = "tabKeyDown",
    shiftTabKeyDown = "shiftTabKeyDown"
}
/**
 * Params passed to the `cellEditStop event.
 */
export interface GridCellEditStopParams<R extends GridValidRowModel = any, V = any, F = V> extends GridCellParams<R, V, F> {
    /**
     * The reason for this event to be triggered.
     */
    reason?: GridCellEditStopReasons;
}
export { GridCellEditStartReasons, GridCellEditStopReasons };
