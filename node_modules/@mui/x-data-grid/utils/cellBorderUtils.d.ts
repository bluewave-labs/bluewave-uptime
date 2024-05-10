import { GridPinnedColumnPosition } from '../hooks/features/columns/gridColumnsInterfaces';
export declare const shouldCellShowRightBorder: (pinnedPosition: GridPinnedColumnPosition | undefined, indexInSection: number, sectionLength: number, showCellVerticalBorderRootProp: boolean, gridHasFiller: boolean) => boolean;
export declare const shouldCellShowLeftBorder: (pinnedPosition: GridPinnedColumnPosition | undefined, indexInSection: number) => boolean;
