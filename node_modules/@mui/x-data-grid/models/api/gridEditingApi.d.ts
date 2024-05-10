import { GridCellMode, GridRowMode } from '../gridCell';
import { GridCellModes, GridRowModes } from '../gridEditRowModel';
import { GridRowId, GridRowModel } from '../gridRows';
import { GridCellParams } from '../params/gridCellParams';
import { GridEditCellValueParams } from '../params/gridEditCellParams';
import { MuiBaseEvent } from '../muiEvent';
export type GridCellModesModelProps = ({
    mode: GridCellModes.View;
} & Omit<GridStopCellEditModeParams, 'id' | 'field'>) | ({
    mode: GridCellModes.Edit;
} & Omit<GridStartCellEditModeParams, 'id' | 'field'>);
export type GridCellModesModel = Record<GridRowId, Record<string, GridCellModesModelProps>>;
export type GridRowModesModelProps = ({
    mode: GridRowModes.View;
} & Omit<GridStopRowEditModeParams, 'id' | 'field'>) | ({
    mode: GridRowModes.Edit;
} & Omit<GridStartRowEditModeParams, 'id' | 'field'>);
export type GridRowModesModel = Record<GridRowId, GridRowModesModelProps>;
export interface GridEditCellMeta {
    changeReason?: 'debouncedSetEditCellValue' | 'setEditCellValue';
}
export interface GridEditingSharedApi {
    /**
     * Controls if a cell is editable.
     * @param {GridCellParams} params The cell params.
     * @returns {boolean} A boolean value determining if the cell is editable.
     */
    isCellEditable: (params: GridCellParams) => boolean;
    /**
     * Sets the value of the edit cell.
     * Commonly used inside the edit cell component.
     * @param {GridEditCellValueParams} params Contains the id, field and value to set.
     * @param {React.SyntheticEvent} event The event to pass forward.
     * @returns {Promise<boolean> | void} A promise with the validation status.
     */
    setEditCellValue: (params: GridEditCellValueParams, event?: MuiBaseEvent) => Promise<boolean> | void;
    /**
     * Returns the row with the values that were set by editing the cells.
     * In row editing, `field` is ignored and all fields are considered.
     * @param {GridRowId} id The row id being edited.
     * @param {string} field The field being edited.
     * @returns {GridRowModel} The row with edited values.
     */
    getRowWithUpdatedValues: (id: GridRowId, field: string) => GridRowModel;
    /**
     * Gets the meta information for the edit cell.
     * @param {GridRowId} id The row id being edited.
     * @param {string} field The field being edited.
     * @ignore - do not document.
     */
    unstable_getEditCellMeta: (id: GridRowId, field: string) => GridEditCellMeta | null;
}
export interface GridEditingSharedPrivateApi {
    /**
     * Immediately updates the value of the cell, without waiting for the debounce.
     * @param {GridRowId} id The row id.
     * @param {string} field The field to update. If not passed, updates all fields in the given row id.
     */
    runPendingEditCellValueMutation: (id: GridRowId, field?: string) => void;
}
/**
 * Params passed to `apiRef.current.startCellEditMode`.
 */
export interface GridStartCellEditModeParams {
    /**
     * The row id.
     */
    id: GridRowId;
    /**
     * The field.
     */
    field: string;
    /**
     * If `true`, the value will be deleted before entering the edit mode.
     */
    deleteValue?: boolean;
    /**
     * The initial value for the field.
     * If `deleteValue` is also true, this value is not used.
     * @deprecated No longer needed.
     */
    initialValue?: any;
}
/**
 * Params passed to `apiRef.current.stopCellEditMode`.
 */
export interface GridStopCellEditModeParams {
    /**
     * The row id.
     */
    id: GridRowId;
    /**
     * The field.
     */
    field: string;
    /**
     * Whether or not to ignore the modifications made on this cell.
     * @default false
     */
    ignoreModifications?: boolean;
    /**
     * To which cell to move focus after finishing editing.
     * @default "none"
     */
    cellToFocusAfter?: 'none' | 'below' | 'right' | 'left';
}
/**
 * Params passed to `apiRef.current.startRowEditMode`.
 */
export interface GridStartRowEditModeParams {
    /**
     * The row id.
     */
    id: GridRowId;
    /**
     * The field to put focus.
     */
    fieldToFocus?: string;
    /**
     * If `true`, the value in `fieldToFocus` will be deleted before entering the edit mode.
     */
    deleteValue?: boolean;
    /**
     * The initial value for the given `fieldToFocus`.
     * If `deleteValue` is also true, this value is not used.
     * @deprecated No longer needed.
     */
    initialValue?: string;
}
/**
 * Params passed to `apiRef.current.stopRowEditMode`.
 */
export interface GridStopRowEditModeParams {
    /**
     * The row id.
     */
    id: GridRowId;
    /**
     * Whether or not to ignore the modifications made on this cell.
     * @default false
     */
    ignoreModifications?: boolean;
    /**
     * The field that has focus when the editing is stopped.
     * Used to calculate which cell to move the focus to after finishing editing.
     */
    field?: string;
    /**
     * To which cell to move focus after finishing editing.
     * Only works if the field is also specified, otherwise focus stay in the same cell.
     * @default "none"
     */
    cellToFocusAfter?: 'none' | 'below' | 'right' | 'left';
}
/**
 * The cell editing API interface.
 */
export interface GridCellEditingApi extends GridEditingSharedApi {
    /**
     * Gets the mode of a cell.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The field to get the mode.
     * @returns {GridCellMode} Returns `"edit"` or `"view"`.
     */
    getCellMode: (id: GridRowId, field: string) => GridCellMode;
    /**
     * Puts the cell corresponding to the given row id and field into edit mode.
     * @param {GridStartCellEditModeParams} params The row id and field of the cell to edit.
     */
    startCellEditMode(params: GridStartCellEditModeParams): void;
    /**
     * Puts the cell corresponding to the given row id and field into view mode and updates the original row with the new value stored.
     * If `params.ignoreModifications` is `true` it will discard the modifications made.
     * @param {GridStopCellEditModeParams} params The row id and field of the cell to stop editing.
     */
    stopCellEditMode(params: GridStopCellEditModeParams): void;
}
export interface GridCellEditingPrivateApi extends GridEditingSharedPrivateApi {
    /**
     * Updates the value of a cell being edited.
     * Don't call this method directly, prefer `setEditCellValue`.
     * @param {GridCommitCellChangeParams} params Object with the new value and id and field to update.
     * @returns {Promise<boolean>} Resolves with `true` when the new value is valid.
     */
    setCellEditingEditCellValue: (params: GridEditCellValueParams) => Promise<boolean>;
    /**
     * Returns the row with the new value that was set by editing the cell.
     * @param {GridRowId} id The row id being edited.
     * @param {string} field The field being edited.
     * @returns {GridRowModel} The data model of the row.
     */
    getRowWithUpdatedValuesFromCellEditing: (id: GridRowId, field: string) => GridRowModel;
}
/**
 * The row editing API interface.
 */
export interface GridRowEditingApi extends GridEditingSharedApi {
    /**
     * Gets the mode of a row.
     * @param {GridRowId} id The id of the row.
     * @returns {GridRowMode} Returns `"edit"` or `"view"`.
     */
    getRowMode: (id: GridRowId) => GridRowMode;
    /**
     * Puts the row corresponding to the given id into edit mode.
     * @param {GridStartCellEditModeParams} params The row id edit.
     */
    startRowEditMode(params: GridStartRowEditModeParams): void;
    /**
     * Puts the row corresponding to the given id and into view mode and updates the original row with the new values stored.
     * If `params.ignoreModifications` is `true` it will discard the modifications made.
     * @param {GridStopCellEditModeParams} params The row id and field of the cell to stop editing.
     */
    stopRowEditMode(params: GridStopRowEditModeParams): void;
}
export interface GridRowEditingPrivateApi extends GridEditingSharedPrivateApi {
    /**
     * Updates the value of a cell being edited.
     * Don't call this method directly, prefer `setEditCellValue`.
     * @param {GridCommitCellChangeParams} params Object with the new value and id and field to update.
     * @returns {Promise<boolean>} Resolves with `true` when all values in the row are valid.
     */
    setRowEditingEditCellValue: (params: GridEditCellValueParams) => Promise<boolean>;
    /**
     * Returns the row with the values that were set by editing all cells.
     * @param {GridRowId} id The row id being edited.
     * @returns {GridRowModel} The data model of the row.
     */
    getRowWithUpdatedValuesFromRowEditing: (id: GridRowId) => GridRowModel;
}
/**
 * The editing API interface that is available in the grid `apiRef`.
 */
export interface GridEditingApi extends GridCellEditingApi, GridRowEditingApi {
}
/**
 * The private editing API interface that is available in the grid `privateApiRef`.
 */
export interface GridEditingPrivateApi extends GridCellEditingPrivateApi, GridRowEditingPrivateApi {
}
