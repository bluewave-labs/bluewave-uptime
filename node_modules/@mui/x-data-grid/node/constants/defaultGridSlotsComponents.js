"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_GRID_DEFAULT_SLOTS_COMPONENTS = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _components = require("../components");
var _GridCell = require("../components/cell/GridCell");
var _GridColumnHeaders = require("../components/GridColumnHeaders");
var _GridColumnMenu = require("../components/menu/columnMenu/GridColumnMenu");
var _GridDetailPanels = require("../components/GridDetailPanels");
var _GridPinnedRows = require("../components/GridPinnedRows");
var _GridNoResultsOverlay = require("../components/GridNoResultsOverlay");
var _material = _interopRequireDefault(require("../material"));
// TODO: camelCase these key. It's a private helper now.
// Remove then need to call `uncapitalizeObjectKeys`.
const DATA_GRID_DEFAULT_SLOTS_COMPONENTS = exports.DATA_GRID_DEFAULT_SLOTS_COMPONENTS = (0, _extends2.default)({}, _material.default, {
  cell: _GridCell.GridCell,
  skeletonCell: _components.GridSkeletonCell,
  columnHeaderFilterIconButton: _components.GridColumnHeaderFilterIconButton,
  columnMenu: _GridColumnMenu.GridColumnMenu,
  columnHeaders: _GridColumnHeaders.GridColumnHeaders,
  detailPanels: _GridDetailPanels.GridDetailPanels,
  footer: _components.GridFooter,
  footerRowCount: _components.GridRowCount,
  toolbar: null,
  pinnedRows: _GridPinnedRows.GridPinnedRows,
  loadingOverlay: _components.GridLoadingOverlay,
  noResultsOverlay: _GridNoResultsOverlay.GridNoResultsOverlay,
  noRowsOverlay: _components.GridNoRowsOverlay,
  pagination: _components.GridPagination,
  filterPanel: _components.GridFilterPanel,
  columnsPanel: _components.GridColumnsPanel,
  columnsManagement: _components.GridColumnsManagement,
  panel: _components.GridPanel,
  row: _components.GridRow
});