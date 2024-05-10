"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridVirtualScrollerFiller = void 0;
var React = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _fastMemo = require("../../utils/fastMemo");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _dimensions = require("../../hooks/features/dimensions");
var _constants = require("../../constants");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Filler = (0, _system.styled)('div')({
  display: 'flex',
  flexDirection: 'row',
  width: 'var(--DataGrid-rowWidth)',
  boxSizing: 'border-box'
});
const Pinned = (0, _system.styled)('div')({
  position: 'sticky',
  height: '100%',
  boxSizing: 'border-box',
  borderTop: '1px solid var(--DataGrid-rowBorderColor)',
  backgroundColor: 'var(--DataGrid-pinnedBackground)'
});
const PinnedLeft = (0, _system.styled)(Pinned)({
  left: 0,
  borderRight: '1px solid var(--DataGrid-rowBorderColor)'
});
const PinnedRight = (0, _system.styled)(Pinned)({
  right: 0,
  borderLeft: '1px solid var(--DataGrid-rowBorderColor)'
});
const Main = (0, _system.styled)('div')({
  flexGrow: 1,
  borderTop: '1px solid var(--DataGrid-rowBorderColor)'
});
function GridVirtualScrollerFiller() {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const {
    viewportOuterSize,
    minimumSize,
    hasScrollX,
    hasScrollY,
    scrollbarSize,
    leftPinnedWidth,
    rightPinnedWidth
  } = (0, _useGridSelector.useGridSelector)(apiRef, _dimensions.gridDimensionsSelector);
  const scrollbarHeight = hasScrollX ? scrollbarSize : 0;
  const expandedHeight = viewportOuterSize.height - minimumSize.height - scrollbarHeight;
  const height = Math.max(scrollbarHeight, expandedHeight);
  if (height === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Filler, {
    className: _constants.gridClasses.filler,
    role: "presentation",
    style: {
      height
    },
    children: [leftPinnedWidth > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(PinnedLeft, {
      className: _constants.gridClasses['filler--pinnedLeft'],
      style: {
        width: leftPinnedWidth
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Main, {}), rightPinnedWidth > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(PinnedRight, {
      className: _constants.gridClasses['filler--pinnedRight'],
      style: {
        width: rightPinnedWidth + (hasScrollY ? scrollbarSize : 0)
      }
    })]
  });
}
const Memoized = exports.GridVirtualScrollerFiller = (0, _fastMemo.fastMemo)(GridVirtualScrollerFiller);