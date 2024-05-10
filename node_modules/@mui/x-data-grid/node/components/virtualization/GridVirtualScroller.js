"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridVirtualScroller = GridVirtualScroller;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _utils = require("@mui/utils");
var _GridScrollArea = require("../GridScrollArea");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _gridClasses = require("../../constants/gridClasses");
var _dimensions = require("../../hooks/features/dimensions");
var _useGridVirtualScroller = require("../../hooks/features/virtualization/useGridVirtualScroller");
var _GridOverlays = require("../base/GridOverlays");
var _GridHeaders = require("../GridHeaders");
var _GridMainContainer = require("./GridMainContainer");
var _GridTopContainer = require("./GridTopContainer");
var _GridBottomContainer = require("./GridBottomContainer");
var _GridVirtualScrollerContent = require("./GridVirtualScrollerContent");
var _GridVirtualScrollerFiller = require("./GridVirtualScrollerFiller");
var _GridVirtualScrollerRenderZone = require("./GridVirtualScrollerRenderZone");
var _GridVirtualScrollbar = require("./GridVirtualScrollbar");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = (ownerState, dimensions) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['main', dimensions.rightPinnedWidth > 0 && 'main--hasPinnedRight'],
    scroller: ['virtualScroller']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const Scroller = (0, _system.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'VirtualScroller',
  overridesResolver: (props, styles) => styles.virtualScroller
})({
  position: 'relative',
  height: '100%',
  overflow: 'scroll',
  scrollbarWidth: 'none' /* Firefox */,
  '&::-webkit-scrollbar': {
    display: 'none' /* Safari and Chrome */
  },
  '@media print': {
    overflow: 'hidden'
  },
  // See https://github.com/mui/mui-x/issues/10547
  zIndex: 0
});
function GridVirtualScroller(props) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const dimensions = (0, _useGridSelector.useGridSelector)(apiRef, _dimensions.gridDimensionsSelector);
  const classes = useUtilityClasses(rootProps, dimensions);
  const virtualScroller = (0, _useGridVirtualScroller.useGridVirtualScroller)();
  const {
    getContainerProps,
    getScrollerProps,
    getContentProps,
    getRenderZoneProps,
    getScrollbarVerticalProps,
    getScrollbarHorizontalProps,
    getRows
  } = virtualScroller;
  const rows = getRows();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridMainContainer.GridMainContainer, (0, _extends2.default)({
    className: classes.root
  }, getContainerProps(), {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridScrollArea.GridScrollArea, {
      scrollDirection: "left"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridScrollArea.GridScrollArea, {
      scrollDirection: "right"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(Scroller, (0, _extends2.default)({
      className: classes.scroller
    }, getScrollerProps(), {
      ownerState: rootProps,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridTopContainer.GridTopContainer, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridHeaders.GridHeaders, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.pinnedRows, {
          position: "top",
          virtualScroller: virtualScroller
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridOverlays.GridOverlays, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScrollerContent.GridVirtualScrollerContent, (0, _extends2.default)({}, getContentProps(), {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridVirtualScrollerRenderZone.GridVirtualScrollerRenderZone, (0, _extends2.default)({}, getRenderZoneProps(), {
          children: [rows, /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.detailPanels, {
            virtualScroller: virtualScroller
          })]
        }))
      })), rows.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScrollerFiller.GridVirtualScrollerFiller, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridBottomContainer.GridBottomContainer, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.pinnedRows, {
          position: "bottom",
          virtualScroller: virtualScroller
        })
      })]
    })), dimensions.hasScrollY && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScrollbar.GridVirtualScrollbar, (0, _extends2.default)({
      position: "vertical"
    }, getScrollbarVerticalProps())), dimensions.hasScrollX && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridVirtualScrollbar.GridVirtualScrollbar, (0, _extends2.default)({
      position: "horizontal"
    }, getScrollbarHorizontalProps())), props.children]
  }));
}