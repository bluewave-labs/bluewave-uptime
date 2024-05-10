import * as React from 'react';
import { GridRowId, GridEditCellProps } from '../../models';
import { GridColDef, GridAlignment } from '../../models/colDef/gridColDef';
import { GridPinnedColumnPosition } from '../../hooks/features/columns/gridColumnsInterfaces';
export declare enum PinnedPosition {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
    VIRTUAL = 3
}
export declare const gridPinnedColumnPositionLookup: {
    1: GridPinnedColumnPosition;
    2: GridPinnedColumnPosition;
    0: undefined;
    3: undefined;
};
export type GridCellProps = {
    align: GridAlignment;
    className?: string;
    colIndex: number;
    column: GridColDef;
    rowId: GridRowId;
    width: number;
    colSpan?: number;
    disableDragEvents?: boolean;
    isNotVisible: boolean;
    editCellState: GridEditCellProps<any> | null;
    pinnedOffset: number;
    pinnedPosition: PinnedPosition;
    sectionIndex: number;
    sectionLength: number;
    gridHasFiller: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onDragEnter?: React.DragEventHandler<HTMLDivElement>;
    onDragOver?: React.DragEventHandler<HTMLDivElement>;
    [x: string]: any;
};
declare const MemoizedGridCell: React.ForwardRefExoticComponent<Omit<GridCellProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { MemoizedGridCell as GridCell };
