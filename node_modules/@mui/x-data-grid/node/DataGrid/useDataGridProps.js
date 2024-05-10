"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataGridProps = exports.DATA_GRID_PROPS_DEFAULT_VALUES = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _constants = require("../constants");
var _defaultGridSlotsComponents = require("../constants/defaultGridSlotsComponents");
var _models = require("../models");
var _utils = require("../internals/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DATA_GRID_FORCED_PROPS = {
  disableMultipleColumnsFiltering: true,
  disableMultipleColumnsSorting: true,
  throttleRowsMs: undefined,
  hideFooterRowCount: false,
  pagination: true,
  checkboxSelectionVisibleOnly: false,
  disableColumnReorder: true,
  keepColumnPositionIfDraggedOutside: false,
  signature: 'DataGrid'
};

/**
 * The default values of `DataGridPropsWithDefaultValues` to inject in the props of DataGrid.
 */
const DATA_GRID_PROPS_DEFAULT_VALUES = exports.DATA_GRID_PROPS_DEFAULT_VALUES = {
  autoHeight: false,
  autoPageSize: false,
  checkboxSelection: false,
  checkboxSelectionVisibleOnly: false,
  columnBufferPx: 150,
  rowBufferPx: 150,
  rows: [],
  rowSelection: true,
  disableColumnFilter: false,
  disableColumnMenu: false,
  disableColumnSelector: false,
  disableDensitySelector: false,
  disableEval: false,
  disableMultipleColumnsFiltering: false,
  disableMultipleRowSelection: false,
  disableColumnSorting: false,
  disableMultipleColumnsSorting: false,
  disableRowSelectionOnClick: false,
  disableVirtualization: false,
  editMode: _models.GridEditModes.Cell,
  filterMode: 'client',
  filterDebounceMs: 150,
  columnHeaderHeight: 56,
  hideFooter: false,
  hideFooterPagination: false,
  hideFooterRowCount: false,
  hideFooterSelectedRowCount: false,
  ignoreDiacritics: false,
  logger: console,
  logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  pagination: false,
  paginationMode: 'client',
  rowHeight: 52,
  resizeThrottleMs: 60,
  pageSizeOptions: [25, 50, 100],
  rowSpacingType: 'margin',
  showCellVerticalBorder: false,
  showColumnVerticalBorder: false,
  sortingOrder: ['asc', 'desc', null],
  sortingMode: 'client',
  throttleRowsMs: 0,
  disableColumnReorder: false,
  disableColumnResize: false,
  keepNonExistentRowsSelected: false,
  keepColumnPositionIfDraggedOutside: false,
  ignoreValueFormatterDuringExport: false,
  clipboardCopyCellDelimiter: '\t',
  rowPositionsDebounceMs: 166,
  autosizeOnMount: false,
  disableAutosize: false
};
const defaultSlots = _defaultGridSlotsComponents.DATA_GRID_DEFAULT_SLOTS_COMPONENTS;
const useDataGridProps = inProps => {
  const themedProps = (0, _utils.useProps)(
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDataGrid'
  }));
  const localeText = React.useMemo(() => (0, _extends2.default)({}, _constants.GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText), [themedProps.localeText]);
  const slots = React.useMemo(() => (0, _utils.computeSlots)({
    defaultSlots,
    slots: themedProps.slots
  }), [themedProps.slots]);
  return React.useMemo(() => (0, _extends2.default)({}, DATA_GRID_PROPS_DEFAULT_VALUES, themedProps, {
    localeText,
    slots
  }, DATA_GRID_FORCED_PROPS), [themedProps, localeText, slots]);
};
exports.useDataGridProps = useDataGridProps;