import type { GridEditCellMeta } from './api/gridEditingApi';
export interface GridEditCellProps<V = any> {
    value?: V | undefined;
    isValidating?: boolean;
    isProcessingProps?: boolean;
    changeReason?: GridEditCellMeta['changeReason'];
    [prop: string]: any;
}
export type GridEditRowProps = {
    [field: string]: GridEditCellProps;
};
export type GridEditingState = {
    [rowId: string]: GridEditRowProps;
};
export type GridEditMode = 'cell' | 'row';
declare enum GridEditModes {
    Cell = "cell",
    Row = "row"
}
declare enum GridCellModes {
    Edit = "edit",
    View = "view"
}
declare enum GridRowModes {
    Edit = "edit",
    View = "view"
}
export { GridEditModes, GridCellModes, GridRowModes };
