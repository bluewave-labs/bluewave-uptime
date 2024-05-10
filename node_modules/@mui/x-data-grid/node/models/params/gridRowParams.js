"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowEditStopReasons = exports.GridRowEditStartReasons = void 0;
/**
 * Object passed as parameter in the row callbacks.
 * @demos
 *   - [Master detail](/x/react-data-grid/master-detail/)
 */
/**
 * Object passed as parameter in the row `getRowClassName` callback prop.
 * @demos
 *   - [Styling rows](/x/react-data-grid/style/#styling-rows)
 */
/**
 * Object passed as parameter in the row `getRowHeight` callback prop.
 */
/**
 * The getRowHeight return value.
 */
var GridRowEditStartReasons = exports.GridRowEditStartReasons = /*#__PURE__*/function (GridRowEditStartReasons) {
  GridRowEditStartReasons["enterKeyDown"] = "enterKeyDown";
  GridRowEditStartReasons["cellDoubleClick"] = "cellDoubleClick";
  GridRowEditStartReasons["printableKeyDown"] = "printableKeyDown";
  GridRowEditStartReasons["deleteKeyDown"] = "deleteKeyDown";
  return GridRowEditStartReasons;
}(GridRowEditStartReasons || {});
/**
 * Params passed to the `rowEditStart` event.
 */
var GridRowEditStopReasons = exports.GridRowEditStopReasons = /*#__PURE__*/function (GridRowEditStopReasons) {
  GridRowEditStopReasons["rowFocusOut"] = "rowFocusOut";
  GridRowEditStopReasons["escapeKeyDown"] = "escapeKeyDown";
  GridRowEditStopReasons["enterKeyDown"] = "enterKeyDown";
  GridRowEditStopReasons["tabKeyDown"] = "tabKeyDown";
  GridRowEditStopReasons["shiftTabKeyDown"] = "shiftTabKeyDown";
  return GridRowEditStopReasons;
}(GridRowEditStopReasons || {});
/**
 * Object passed as parameter in the row `getRowSpacing` callback prop.
 * @demos
 *   - [Row spacing](/x/react-data-grid/row-height/#row-spacing)
 */
/**
 * The getRowSpacing return value.
 */
// https://github.com/mui/mui-x/pull/3738#discussion_r798504277