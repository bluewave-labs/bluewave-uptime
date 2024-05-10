import { GridPinnedColumnPosition, gridColumnPositionsSelector } from '../../hooks/features/columns';
import type { GridDimensions } from '../../hooks/features/dimensions';
export declare const getPinnedCellOffset: (pinnedPosition: GridPinnedColumnPosition | undefined, computedWidth: number, columnIndex: number, columnPositions: ReturnType<typeof gridColumnPositionsSelector>, dimensions: GridDimensions) => number;
