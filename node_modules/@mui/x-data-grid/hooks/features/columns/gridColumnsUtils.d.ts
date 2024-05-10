import * as React from 'react';
import { GridColumnsState, GridColumnsRawState, GridColumnVisibilityModel, GridColumnsInitialState } from './gridColumnsInterfaces';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridColDef } from '../../../models/colDef/gridColDef';
import { GridApiCommon } from '../../../models/api/gridApiCommon';
import { GridRowEntry } from '../../../models/gridRows';
import type { GridDimensions } from '../dimensions/gridDimensionsApi';
export declare const COLUMNS_DIMENSION_PROPERTIES: readonly ["maxWidth", "minWidth", "width", "flex"];
export type GridColumnDimensionProperties = (typeof COLUMNS_DIMENSION_PROPERTIES)[number];
/**
 * Computes width for flex columns.
 * Based on CSS Flexbox specification:
 * https://drafts.csswg.org/css-flexbox-1/#resolve-flexible-lengths
 */
export declare function computeFlexColumnsWidth({ initialFreeSpace, totalFlexUnits, flexColumns, }: {
    initialFreeSpace: number;
    totalFlexUnits: number;
    flexColumns: {
        field: GridColDef['field'];
        flex?: number | null;
        minWidth?: number;
        maxWidth?: number;
    }[];
}): Record<string, {
    flex: number;
    computedWidth: number;
    frozen: boolean;
}>;
/**
 * Compute the `computedWidth` (ie: the width the column should have during rendering) based on the `width` / `flex` / `minWidth` / `maxWidth` properties of `GridColDef`.
 * The columns already have been merged with there `type` default values for `minWidth`, `maxWidth` and `width`, thus the `!` for those properties below.
 * TODO: Unit test this function in depth and only keep basic cases for the whole grid testing.
 * TODO: Improve the `GridColDef` typing to reflect the fact that `minWidth` / `maxWidth` and `width` can't be null after the merge with the `type` default values.
 */
export declare const hydrateColumnsWidth: (rawState: GridColumnsRawState, dimensions: GridDimensions | undefined) => GridColumnsState;
/**
 * Apply the order and the dimensions of the initial state.
 * The columns not registered in `orderedFields` will be placed after the imported columns.
 */
export declare const applyInitialState: (columnsState: GridColumnsRawState, initialState: GridColumnsInitialState | undefined) => GridColumnsRawState;
export declare const createColumnsState: ({ apiRef, columnsToUpsert, initialState, columnVisibilityModel, keepOnlyColumnsToUpsert, }: {
    columnsToUpsert: readonly GridColDef[];
    initialState: GridColumnsInitialState | undefined;
    columnVisibilityModel?: GridColumnVisibilityModel;
    keepOnlyColumnsToUpsert: boolean;
    apiRef: React.MutableRefObject<GridApiCommunity>;
}) => GridColumnsState;
export declare function getFirstNonSpannedColumnToRender({ firstColumnToRender, apiRef, firstRowToRender, lastRowToRender, visibleRows, }: {
    firstColumnToRender: number;
    apiRef: React.MutableRefObject<GridApiCommon>;
    firstRowToRender: number;
    lastRowToRender: number;
    visibleRows: GridRowEntry[];
}): number;
export declare function getTotalHeaderHeight(apiRef: React.MutableRefObject<GridApiCommunity>, props: Pick<DataGridProcessedProps, 'columnHeaderHeight' | 'headerFilterHeight'>): number;
