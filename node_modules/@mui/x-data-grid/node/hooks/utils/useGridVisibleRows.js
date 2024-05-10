"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridVisibleRows = exports.getVisibleRows = void 0;
var React = _interopRequireWildcard(require("react"));
var _gridPaginationSelector = require("../features/pagination/gridPaginationSelector");
var _gridFilterSelector = require("../features/filter/gridFilterSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getVisibleRows = (apiRef, props) => {
  let rows;
  let range;
  if (props.pagination && props.paginationMode === 'client') {
    range = (0, _gridPaginationSelector.gridPaginationRowRangeSelector)(apiRef);
    rows = (0, _gridPaginationSelector.gridPaginatedVisibleSortedGridRowEntriesSelector)(apiRef);
  } else {
    rows = (0, _gridFilterSelector.gridExpandedSortedRowEntriesSelector)(apiRef);
    if (rows.length === 0) {
      range = null;
    } else {
      range = {
        firstRowIndex: 0,
        lastRowIndex: rows.length - 1
      };
    }
  }
  return {
    rows,
    range
  };
};

/**
 * Computes the list of rows that are reachable by scroll.
 * Depending on whether pagination is enabled, it will return the rows in the current page.
 * - If the pagination is disabled or in server mode, it equals all the visible rows.
 * - If the row tree has several layers, it contains up to `state.pageSize` top level rows and all their descendants.
 * - If the row tree is flat, it only contains up to `state.pageSize` rows.
 */
exports.getVisibleRows = getVisibleRows;
const useGridVisibleRows = (apiRef, props) => {
  const response = getVisibleRows(apiRef, props);
  return React.useMemo(() => ({
    rows: response.rows,
    range: response.range
  }), [response.rows, response.range]);
};
exports.useGridVisibleRows = useGridVisibleRows;