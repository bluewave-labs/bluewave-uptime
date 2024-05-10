"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowModes = exports.GridEditModes = exports.GridCellModes = void 0;
var GridEditModes = exports.GridEditModes = /*#__PURE__*/function (GridEditModes) {
  GridEditModes["Cell"] = "cell";
  GridEditModes["Row"] = "row";
  return GridEditModes;
}(GridEditModes || {});
var GridCellModes = exports.GridCellModes = /*#__PURE__*/function (GridCellModes) {
  GridCellModes["Edit"] = "edit";
  GridCellModes["View"] = "view";
  return GridCellModes;
}(GridCellModes || {});
var GridRowModes = exports.GridRowModes = /*#__PURE__*/function (GridRowModes) {
  GridRowModes["Edit"] = "edit";
  GridRowModes["View"] = "view";
  return GridRowModes;
}(GridRowModes || {});