"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPinnedCellOffset = void 0;
var _columns = require("../../hooks/features/columns");
const getPinnedCellOffset = (pinnedPosition, computedWidth, columnIndex, columnPositions, dimensions) => {
  const scrollbarWidth = dimensions.hasScrollY ? dimensions.scrollbarSize : 0;
  let pinnedOffset;
  switch (pinnedPosition) {
    case _columns.GridPinnedColumnPosition.LEFT:
      pinnedOffset = columnPositions[columnIndex];
      break;
    case _columns.GridPinnedColumnPosition.RIGHT:
      pinnedOffset = dimensions.columnsTotalWidth - columnPositions[columnIndex] - computedWidth + scrollbarWidth;
      break;
    default:
      pinnedOffset = 0;
      break;
  }
  return pinnedOffset;
};
exports.getPinnedCellOffset = getPinnedCellOffset;