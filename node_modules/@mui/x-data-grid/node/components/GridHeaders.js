"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridHeaders = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _fastMemo = require("../utils/fastMemo");
var _useGridPrivateApiContext = require("../hooks/utils/useGridPrivateApiContext");
var _useGridSelector = require("../hooks/utils/useGridSelector");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _gridColumnsSelector = require("../hooks/features/columns/gridColumnsSelector");
var _gridFilterSelector = require("../hooks/features/filter/gridFilterSelector");
var _gridSortingSelector = require("../hooks/features/sorting/gridSortingSelector");
var _gridFocusStateSelector = require("../hooks/features/focus/gridFocusStateSelector");
var _gridColumnGroupsSelector = require("../hooks/features/columnGrouping/gridColumnGroupsSelector");
var _columnMenuSelector = require("../hooks/features/columnMenu/columnMenuSelector");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridHeaders() {
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const visibleColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector);
  const filterColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterActiveItemsLookupSelector);
  const sortColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortColumnLookupSelector);
  const columnHeaderTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnHeaderSelector);
  const cellTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexCellSelector);
  const columnGroupHeaderTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnGroupHeaderSelector);
  const columnHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridFocusColumnHeaderSelector);
  const columnGroupHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridFocusColumnGroupHeaderSelector);
  const headerGroupingMaxDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector);
  const columnMenuState = (0, _useGridSelector.useGridSelector)(apiRef, _columnMenuSelector.gridColumnMenuSelector);
  const columnVisibility = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnVisibilityModelSelector);
  const columnGroupsHeaderStructure = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderStructureSelector);
  const hasOtherElementInTabSequence = !(columnGroupHeaderTabIndexState === null && columnHeaderTabIndexState === null && cellTabIndexState === null);
  const columnsContainerRef = React.useRef(null);
  apiRef.current.register('private', {
    columnHeadersContainerRef: columnsContainerRef
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnHeaders, (0, _extends2.default)({
    ref: columnsContainerRef,
    visibleColumns: visibleColumns,
    filterColumnLookup: filterColumnLookup,
    sortColumnLookup: sortColumnLookup,
    columnHeaderTabIndexState: columnHeaderTabIndexState,
    columnGroupHeaderTabIndexState: columnGroupHeaderTabIndexState,
    columnHeaderFocus: columnHeaderFocus,
    columnGroupHeaderFocus: columnGroupHeaderFocus,
    headerGroupingMaxDepth: headerGroupingMaxDepth,
    columnMenuState: columnMenuState,
    columnVisibility: columnVisibility,
    columnGroupsHeaderStructure: columnGroupsHeaderStructure,
    hasOtherElementInTabSequence: hasOtherElementInTabSequence
  }, rootProps.slotProps?.columnHeaders));
}
const MemoizedGridHeaders = exports.GridHeaders = (0, _fastMemo.fastMemo)(GridHeaders);