import { GridPinnedColumnPosition } from '../hooks/features/columns/gridColumnsInterfaces';
export const shouldCellShowRightBorder = (pinnedPosition, indexInSection, sectionLength, showCellVerticalBorderRootProp, gridHasFiller) => {
  const isSectionLastCell = indexInSection === sectionLength - 1;
  if (pinnedPosition === GridPinnedColumnPosition.LEFT && isSectionLastCell) {
    return true;
  }
  if (showCellVerticalBorderRootProp) {
    if (pinnedPosition === GridPinnedColumnPosition.LEFT) {
      return true;
    }
    if (pinnedPosition === GridPinnedColumnPosition.RIGHT) {
      return !isSectionLastCell;
    }
    // pinnedPosition === undefined, middle section
    return !isSectionLastCell || gridHasFiller;
  }
  return false;
};
export const shouldCellShowLeftBorder = (pinnedPosition, indexInSection) => {
  return pinnedPosition === GridPinnedColumnPosition.RIGHT && indexInSection === 0;
};