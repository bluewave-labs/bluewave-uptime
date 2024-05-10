import { GridPinnedColumnPosition } from '../../hooks/features/columns';
export const getPinnedCellOffset = (pinnedPosition, computedWidth, columnIndex, columnPositions, dimensions) => {
  const scrollbarWidth = dimensions.hasScrollY ? dimensions.scrollbarSize : 0;
  let pinnedOffset;
  switch (pinnedPosition) {
    case GridPinnedColumnPosition.LEFT:
      pinnedOffset = columnPositions[columnIndex];
      break;
    case GridPinnedColumnPosition.RIGHT:
      pinnedOffset = dimensions.columnsTotalWidth - columnPositions[columnIndex] - computedWidth + scrollbarWidth;
      break;
    default:
      pinnedOffset = 0;
      break;
  }
  return pinnedOffset;
};