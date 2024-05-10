"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridOverlays = GridOverlays;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _system = require("@mui/system");
var _utils = require("@mui/utils");
var _clsx = _interopRequireDefault(require("clsx"));
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");
var _gridRowsSelector = require("../../hooks/features/rows/gridRowsSelector");
var _dimensions = require("../../hooks/features/dimensions");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _useGridVisibleRows = require("../../hooks/utils/useGridVisibleRows");
var _gridRowsUtils = require("../../hooks/features/rows/gridRowsUtils");
var _gridClasses = require("../../constants/gridClasses");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridOverlayWrapperRoot = (0, _system.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'OverlayWrapper',
  shouldForwardProp: prop => prop !== 'overlayType',
  overridesResolver: (props, styles) => styles.overlayWrapper
})(({
  overlayType
}) => ({
  position: 'sticky',
  // To stay in place while scrolling
  top: 'var(--DataGrid-headersTotalHeight)',
  left: 0,
  width: 0,
  // To stay above the content instead of shifting it down
  height: 0,
  // To stay above the content instead of shifting it down
  zIndex: overlayType === 'loadingOverlay' ? 5 // Should be above pinned columns, pinned rows, and detail panel
  : 4 // Should be above pinned columns and detail panel
}));
const GridOverlayWrapperInner = (0, _system.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'OverlayWrapperInner',
  shouldForwardProp: prop => prop !== 'overlayType',
  overridesResolver: (props, styles) => styles.overlayWrapperInner
})({});
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['overlayWrapper'],
    inner: ['overlayWrapperInner']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function GridOverlayWrapper(props) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const currentPage = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, rootProps);
  const dimensions = (0, _useGridSelector.useGridSelector)(apiRef, _dimensions.gridDimensionsSelector);
  let height = dimensions.viewportOuterSize.height - dimensions.headersTotalHeight - (dimensions.hasScrollX ? dimensions.scrollbarSize : 0);
  if (rootProps.autoHeight && currentPage.rows.length === 0 || height === 0) {
    height = (0, _gridRowsUtils.getMinimalContentHeight)(apiRef);
  }
  const classes = useUtilityClasses((0, _extends2.default)({}, props, {
    classes: rootProps.classes
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridOverlayWrapperRoot, {
    className: (0, _clsx.default)(classes.root),
    overlayType: props.overlayType,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(GridOverlayWrapperInner, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.inner),
      style: {
        height,
        width: dimensions.viewportOuterSize.width
      }
    }, props))
  });
}
process.env.NODE_ENV !== "production" ? GridOverlayWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  overlayType: _propTypes.default.string.isRequired
} : void 0;
function GridOverlays() {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const totalRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridRowCountSelector);
  const visibleRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridExpandedRowCountSelector);
  const loading = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridRowsLoadingSelector);
  const showNoRowsOverlay = !loading && totalRowCount === 0;
  const showNoResultsOverlay = !loading && totalRowCount > 0 && visibleRowCount === 0;
  let overlay = null;
  let overlayType = '';
  if (showNoRowsOverlay) {
    overlay = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.noRowsOverlay, (0, _extends2.default)({}, rootProps.slotProps?.noRowsOverlay));
    overlayType = 'noRowsOverlay';
  }
  if (showNoResultsOverlay) {
    overlay = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.noResultsOverlay, (0, _extends2.default)({}, rootProps.slotProps?.noResultsOverlay));
    overlayType = 'noResultsOverlay';
  }
  if (loading) {
    overlay = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.loadingOverlay, (0, _extends2.default)({}, rootProps.slotProps?.loadingOverlay));
    overlayType = 'loadingOverlay';
  }
  if (overlay === null) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridOverlayWrapper, {
    overlayType: overlayType,
    children: overlay
  });
}