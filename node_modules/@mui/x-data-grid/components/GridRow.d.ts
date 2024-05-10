import * as React from 'react';
import { GridRowId, GridRowModel } from '../models/gridRows';
import { GridPinnedColumns } from '../hooks/features/columns';
import type { GridStateColDef } from '../models/colDef/gridColDef';
import type { GridRenderContext } from '../models/params/gridScrollParams';
import type { GridDimensions } from '../hooks/features/dimensions';
export interface GridRowProps extends React.HTMLAttributes<HTMLDivElement> {
    row: GridRowModel;
    rowId: GridRowId;
    selected: boolean;
    /**
     * Index of the row in the whole sorted and filtered dataset.
     * If some rows above have expanded children, this index also take those children into account.
     */
    index: number;
    rowHeight: number | 'auto';
    offsetTop: number | undefined;
    offsetLeft: number;
    dimensions: GridDimensions;
    renderContext: GridRenderContext;
    visibleColumns: GridStateColDef[];
    pinnedColumns: GridPinnedColumns;
    /**
     * Determines which cell has focus.
     * If `null`, no cell in this row has focus.
     */
    focusedColumnIndex: number | undefined;
    /**
     * Determines which cell should be tabbable by having tabIndex=0.
     * If `null`, no cell in this row is in the tab sequence.
     */
    tabbableCell: string | null;
    isFirstVisible: boolean;
    isLastVisible: boolean;
    isNotVisible: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    [x: string]: any;
}
declare const MemoizedGridRow: React.ForwardRefExoticComponent<Omit<GridRowProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { MemoizedGridRow as GridRow };
