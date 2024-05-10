import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { GridPinnedRowsPosition } from '../rows/gridRowsInterfaces';
import type { GridRenderContext, GridColumnsRenderContext, GridRowEntry, GridRowId } from '../../../models';
export type VirtualScroller = ReturnType<typeof useGridVirtualScroller>;
export declare const EMPTY_DETAIL_PANELS: Readonly<Map<GridRowId, React.ReactNode>>;
export declare const useGridVirtualScroller: () => {
    renderContext: GridRenderContext;
    setPanels: React.Dispatch<React.SetStateAction<Readonly<Map<GridRowId, React.ReactNode>>>>;
    getRows: (params?: {
        rows?: GridRowEntry[];
        position?: GridPinnedRowsPosition;
        renderContext?: GridRenderContext;
    }) => React.ReactNode[];
    getContainerProps: () => {
        ref: React.RefObject<HTMLDivElement>;
    };
    getScrollerProps: () => {
        ref: React.RefObject<HTMLDivElement>;
        tabIndex: number;
        onScroll: (event: React.UIEvent) => void;
        onWheel: (event: React.WheelEvent) => void;
        onTouchMove: (event: React.TouchEvent) => void;
        style: React.CSSProperties;
        role: string;
    };
    getContentProps: () => {
        style: React.CSSProperties;
        role: string;
    };
    getRenderZoneProps: () => {
        role: string;
    };
    getScrollbarVerticalProps: () => {
        ref: React.RefObject<HTMLDivElement>;
        role: string;
    };
    getScrollbarHorizontalProps: () => {
        ref: React.RefObject<HTMLDivElement>;
        role: string;
    };
};
export declare function areRenderContextsEqual(context1: GridRenderContext, context2: GridRenderContext): boolean;
export declare function computeOffsetLeft(columnPositions: number[], renderContext: GridColumnsRenderContext, direction: Theme['direction'], pinnedLeftLength: number): number;
