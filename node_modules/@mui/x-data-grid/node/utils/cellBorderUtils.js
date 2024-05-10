"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldCellShowRightBorder = exports.shouldCellShowLeftBorder = void 0;
var _gridColumnsInterfaces = require("../hooks/features/columns/gridColumnsInterfaces");
const shouldCellShowRightBorder = (pinnedPosition, indexInSection, sectionLength, showCellVerticalBorderRootProp, gridHasFiller) => {
  const isSectionLastCell = indexInSection === sectionLength - 1;
  if (pinnedPosition === _gridColumnsInterfaces.GridPinnedColumnPosition.LEFT && isSectionLastCell) {
    return true;
  }
  if (showCellVerticalBorderRootProp) {
    if (pinnedPosition === _gridColumnsInterfaces.GridPinnedColumnPosition.LEFT) {
      return true;
    }
    if (pinnedPosition === _gridColumnsInterfaces.GridPinnedColumnPosition.RIGHT) {
      return !isSectionLastCell;
    }
    // pinnedPosition === undefined, middle section
    return !isSectionLastCell || gridHasFiller;
  }
  return false;
};
exports.shouldCellShowRightBorder = shouldCellShowRightBorder;
const shouldCellShowLeftBorder = (pinnedPosition, indexInSection) => {
  return pinnedPosition === _gridColumnsInterfaces.GridPinnedColumnPosition.RIGHT && indexInSection === 0;
};
exports.shouldCellShowLeftBorder = shouldCellShowLeftBorder;