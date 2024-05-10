"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  DATA_GRID_PROPS_DEFAULT_VALUES: true
};
Object.defineProperty(exports, "DATA_GRID_PROPS_DEFAULT_VALUES", {
  enumerable: true,
  get: function () {
    return _useDataGridProps.DATA_GRID_PROPS_DEFAULT_VALUES;
  }
});
var _DataGrid = require("./DataGrid");
Object.keys(_DataGrid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DataGrid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DataGrid[key];
    }
  });
});
var _useDataGridProps = require("./useDataGridProps");