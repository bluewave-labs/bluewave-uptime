import * as React from 'react';
import { GridCellMode } from '../gridCell';
import { GridRowId, GridRowModel, GridTreeNode, GridTreeNodeWithRender, GridValidRowModel } from '../gridRows';
import type { GridStateColDef } from '../colDef/gridColDef';
import { GridEditCellProps } from '../gridEditRowModel';
import { GridApiCommunity } from '../api/gridApiCommunity';
/**
 * Object passed as parameter in the column [[GridColDef]] cell renderer.
 */
export interface GridCellParams<R extends GridValidRowModel = any, V = unknown, F = V, N extends GridTreeNode = GridTreeNode> {
    /**
     * The grid row id.
     */
    id: GridRowId;
    /**
     * The column field of the cell that triggered the event.
     */
    field: string;
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value?: V | undefined;
    /**
     * The cell value formatted with the column valueFormatter.
     */
    formattedValue?: F | undefined;
    /**
     * The row model of the row that the current cell belongs to.
     */
    row: GridRowModel<R>;
    /**
     * The node of the row that the current cell belongs to.
     */
    rowNode: N;
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: GridStateColDef;
    /**
     * If true, the cell is editable.
     */
    isEditable?: boolean;
    /**
     * The mode of the cell.
     */
    cellMode: GridCellMode;
    /**
     * If true, the cell is the active element.
     */
    hasFocus: boolean;
    /**
     * the tabIndex value.
     */
    tabIndex: 0 | -1;
}
export interface FocusElement {
    focus(): void;
}
/**
 * GridCellParams containing api.
 */
export interface GridRenderCellParams<R extends GridValidRowModel = any, V = any, F = V, N extends GridTreeNodeWithRender = GridTreeNodeWithRender> extends GridCellParams<R, V, F, N> {
    /**
     * GridApi that let you manipulate the grid.
     */
    api: GridApiCommunity;
    /**
     * A ref allowing to set imperative focus.
     * It can be passed to the element that should receive focus.
     * @ignore - do not document.
     */
    focusElementRef?: React.Ref<FocusElement>;
}
/**
 * GridEditCellProps containing api.
 */
export interface GridRenderEditCellParams<R extends GridValidRowModel = any, V = any, F = V, N extends GridTreeNodeWithRender = GridTreeNodeWithRender> extends GridCellParams<R, V, F, N>, GridEditCellProps<V> {
    /**
     * GridApi that let you manipulate the grid.
     */
    api: GridApiCommunity;
}
/**
 * Object passed as parameter in the column [[GridColDef]] edit cell props change callback.
 */
export interface GridPreProcessEditCellProps<V = any, R extends GridValidRowModel = any> {
    /**
     * The grid row id.
     */
    id: GridRowId;
    /**
     * The row that is being edited.
     */
    row: GridRowModel<R>;
    /**
     * The edit cell props.
     */
    props: GridEditCellProps<V>;
    /**
     * Whether the new value is different from the stored value or not.
     */
    hasChanged?: boolean;
    /**
     * Object containing the props of the other fields.
     * Only available for row editing and when using the new editing API.
     */
    otherFieldsProps?: Record<string, GridEditCellProps<V>>;
}
