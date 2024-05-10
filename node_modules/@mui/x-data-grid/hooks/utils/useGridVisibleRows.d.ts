import * as React from 'react';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import type { GridApiCommon, GridRowEntry } from '../../models';
export declare const getVisibleRows: <Api extends GridApiCommon<any, any>>(apiRef: React.MutableRefObject<Api>, props: Pick<DataGridProcessedProps, 'pagination' | 'paginationMode'>) => {
    rows: GridRowEntry<import("../../models").GridValidRowModel>[];
    range: {
        firstRowIndex: number;
        lastRowIndex: number;
    } | null;
};
/**
 * Computes the list of rows that are reachable by scroll.
 * Depending on whether pagination is enabled, it will return the rows in the current page.
 * - If the pagination is disabled or in server mode, it equals all the visible rows.
 * - If the row tree has several layers, it contains up to `state.pageSize` top level rows and all their descendants.
 * - If the row tree is flat, it only contains up to `state.pageSize` rows.
 */
export declare const useGridVisibleRows: <Api extends GridApiCommon<any, any>>(apiRef: React.MutableRefObject<Api>, props: Pick<DataGridProcessedProps, 'pagination' | 'paginationMode'>) => {
    rows: GridRowEntry<import("../../models").GridValidRowModel>[];
    range: {
        firstRowIndex: number;
        lastRowIndex: number;
    } | null;
};
