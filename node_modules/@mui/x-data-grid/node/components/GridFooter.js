"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFooter = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useGridSelector = require("../hooks/utils/useGridSelector");
var _gridRowsSelector = require("../hooks/features/rows/gridRowsSelector");
var _gridRowSelectionSelector = require("../hooks/features/rowSelection/gridRowSelectionSelector");
var _gridFilterSelector = require("../hooks/features/filter/gridFilterSelector");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _GridSelectedRowCount = require("./GridSelectedRowCount");
var _GridFooterContainer = require("./containers/GridFooterContainer");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridFooter = exports.GridFooter = /*#__PURE__*/React.forwardRef(function GridFooter(props, ref) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const totalTopLevelRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridTopLevelRowCountSelector);
  const selectedRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowSelectionSelector.selectedGridRowsCountSelector);
  const visibleTopLevelRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilteredTopLevelRowCountSelector);
  const selectedRowCountElement = !rootProps.hideFooterSelectedRowCount && selectedRowCount > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridSelectedRowCount.GridSelectedRowCount, {
    selectedRowCount: selectedRowCount
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {});
  const rowCountElement = !rootProps.hideFooterRowCount && !rootProps.pagination ? /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.footerRowCount, (0, _extends2.default)({}, rootProps.slotProps?.footerRowCount, {
    rowCount: totalTopLevelRowCount,
    visibleRowCount: visibleTopLevelRowCount
  })) : null;
  const paginationElement = rootProps.pagination && !rootProps.hideFooterPagination && rootProps.slots.pagination && /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.pagination, (0, _extends2.default)({}, rootProps.slotProps?.pagination));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridFooterContainer.GridFooterContainer, (0, _extends2.default)({
    ref: ref
  }, props, {
    children: [selectedRowCountElement, rowCountElement, paginationElement]
  }));
});
process.env.NODE_ENV !== "production" ? GridFooter.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;