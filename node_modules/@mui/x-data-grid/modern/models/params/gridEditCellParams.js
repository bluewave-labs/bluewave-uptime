/**
 * Params passed to `apiRef.current.setEditCellValue`.
 */
var GridCellEditStartReasons = /*#__PURE__*/function (GridCellEditStartReasons) {
  GridCellEditStartReasons["enterKeyDown"] = "enterKeyDown";
  GridCellEditStartReasons["cellDoubleClick"] = "cellDoubleClick";
  GridCellEditStartReasons["printableKeyDown"] = "printableKeyDown";
  GridCellEditStartReasons["deleteKeyDown"] = "deleteKeyDown";
  GridCellEditStartReasons["pasteKeyDown"] = "pasteKeyDown";
  return GridCellEditStartReasons;
}(GridCellEditStartReasons || {});
/**
 * Params passed to the `cellEditStart` event.
 */
var GridCellEditStopReasons = /*#__PURE__*/function (GridCellEditStopReasons) {
  GridCellEditStopReasons["cellFocusOut"] = "cellFocusOut";
  GridCellEditStopReasons["escapeKeyDown"] = "escapeKeyDown";
  GridCellEditStopReasons["enterKeyDown"] = "enterKeyDown";
  GridCellEditStopReasons["tabKeyDown"] = "tabKeyDown";
  GridCellEditStopReasons["shiftTabKeyDown"] = "shiftTabKeyDown";
  return GridCellEditStopReasons;
}(GridCellEditStopReasons || {});
/**
 * Params passed to the `cellEditStop event.
 */
// https://github.com/mui/mui-x/pull/3738#discussion_r798504277
export { GridCellEditStartReasons, GridCellEditStopReasons };