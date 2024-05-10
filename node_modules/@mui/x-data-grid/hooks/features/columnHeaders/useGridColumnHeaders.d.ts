import * as React from 'react';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import type { GridColumnsRenderContext } from '../../../models/params/gridScrollParams';
import { GridStateColDef } from '../../../models/colDef/gridColDef';
import { GridSortColumnLookup } from '../sorting';
import { GridFilterActiveItemsLookup } from '../filter';
import { GridColumnGroupIdentifier, GridColumnIdentifier } from '../focus';
import { GridColumnMenuState } from '../columnMenu';
import { GridPinnedColumnPosition, GridColumnVisibilityModel } from '../columns';
import { GridGroupingStructure } from '../columnGrouping/gridColumnGroupsInterfaces';
export interface UseGridColumnHeadersProps {
    visibleColumns: GridStateColDef[];
    sortColumnLookup: GridSortColumnLookup;
    filterColumnLookup: GridFilterActiveItemsLookup;
    columnHeaderTabIndexState: GridColumnIdentifier | null;
    columnGroupHeaderTabIndexState: GridColumnGroupIdentifier | null;
    columnHeaderFocus: GridColumnIdentifier | null;
    columnGroupHeaderFocus: GridColumnGroupIdentifier | null;
    headerGroupingMaxDepth: number;
    columnMenuState: GridColumnMenuState;
    columnVisibility: GridColumnVisibilityModel;
    columnGroupsHeaderStructure: GridGroupingStructure[][];
    hasOtherElementInTabSequence: boolean;
}
export interface GetHeadersParams {
    position?: GridPinnedColumnPosition;
    renderContext?: GridColumnsRenderContext;
    minFirstColumn?: number;
    maxLastColumn?: number;
}
type OwnerState = DataGridProcessedProps;
export declare const GridColumnHeaderRow: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme> & {
    ownerState: OwnerState;
}, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
export declare const useGridColumnHeaders: (props: UseGridColumnHeadersProps) => {
    renderContext: GridColumnsRenderContext;
    leftRenderContext: {
        firstColumnIndex: number;
        lastColumnIndex: number;
    } | null;
    rightRenderContext: {
        firstColumnIndex: number;
        lastColumnIndex: number;
    } | null;
    pinnedColumns: {
        left: GridStateColDef[];
        right: GridStateColDef[];
    };
    visibleColumns: GridStateColDef[];
    getCellOffsetStyle: ({ pinnedPosition, columnIndex, computedWidth, }: {
        pinnedPosition?: GridPinnedColumnPosition;
        columnIndex: number;
        computedWidth: number;
    }) => React.CSSProperties | undefined;
    getFillers: (params: GetHeadersParams | undefined, children: React.ReactNode, leftOverflow: number, borderTop?: boolean) => React.JSX.Element;
    getColumnHeadersRow: () => React.JSX.Element;
    getColumnsToRender: (params?: GetHeadersParams) => {
        renderedColumns: GridStateColDef[];
        firstColumnToRender: number;
        lastColumnToRender: number;
    };
    getColumnGroupHeadersRows: () => React.JSX.Element[] | null;
    isDragging: boolean;
    getInnerProps: () => {
        role: string;
    };
};
export {};
