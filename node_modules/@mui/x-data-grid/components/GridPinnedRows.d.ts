import type { VirtualScroller } from '../hooks/features/virtualization/useGridVirtualScroller';
export interface GridPinnedRowsProps {
    position: 'top' | 'bottom';
    virtualScroller: VirtualScroller;
}
export declare function GridPinnedRows(_: GridPinnedRowsProps): null;
