"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_CHECKBOX_SELECTION_FIELD = exports.GRID_CHECKBOX_SELECTION_COL_DEF = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _GridCellCheckboxRenderer = require("../components/columnSelection/GridCellCheckboxRenderer");
var _GridHeaderCheckbox = require("../components/columnSelection/GridHeaderCheckbox");
var _gridRowSelectionSelector = require("../hooks/features/rowSelection/gridRowSelectionSelector");
var _gridBooleanColDef = require("./gridBooleanColDef");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GRID_CHECKBOX_SELECTION_FIELD = exports.GRID_CHECKBOX_SELECTION_FIELD = '__check__';
const GRID_CHECKBOX_SELECTION_COL_DEF = exports.GRID_CHECKBOX_SELECTION_COL_DEF = (0, _extends2.default)({}, _gridBooleanColDef.GRID_BOOLEAN_COL_DEF, {
  type: 'custom',
  field: GRID_CHECKBOX_SELECTION_FIELD,
  width: 50,
  resizable: false,
  sortable: false,
  filterable: false,
  // @ts-ignore
  aggregable: false,
  disableColumnMenu: true,
  disableReorder: true,
  disableExport: true,
  getApplyQuickFilterFn: undefined,
  display: 'flex',
  valueGetter: (value, row, column, apiRef) => {
    const selectionLookup = (0, _gridRowSelectionSelector.selectedIdsLookupSelector)(apiRef);
    const rowId = apiRef.current.getRowId(row);
    return selectionLookup[rowId] !== undefined;
  },
  renderHeader: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridHeaderCheckbox.GridHeaderCheckbox, (0, _extends2.default)({}, params)),
  renderCell: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridCellCheckboxRenderer.GridCellCheckboxRenderer, (0, _extends2.default)({}, params))
});