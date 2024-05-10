"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRoot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _system = require("@mui/system");
var _GridRootStyles = require("./GridRootStyles");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _useGridPrivateApiContext = require("../../hooks/utils/useGridPrivateApiContext");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridClasses = require("../../constants/gridClasses");
var _densitySelector = require("../../hooks/features/density/densitySelector");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    autoHeight,
    density,
    classes,
    showCellVerticalBorder
  } = ownerState;
  const slots = {
    root: ['root', autoHeight && 'autoHeight', `root--density${(0, _utils.unstable_capitalize)(density)}`, 'withBorderColor', showCellVerticalBorder && 'withVerticalBorder']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const GridPanelAnchor = (0, _system.styled)('div')({
  position: 'absolute',
  top: `var(--DataGrid-headersTotalHeight)`,
  left: 0
});
const GridRoot = exports.GridRoot = /*#__PURE__*/React.forwardRef(function GridRoot(props, ref) {
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const {
      children,
      className
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const density = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensitySelector);
  const rootElementRef = apiRef.current.rootElementRef;
  const handleRef = (0, _utils.unstable_useForkRef)(rootElementRef, ref);
  const ownerState = (0, _extends2.default)({}, rootProps, {
    density
  });
  const classes = useUtilityClasses(ownerState);

  // Our implementation of <NoSsr />
  const [mountedState, setMountedState] = React.useState(false);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    setMountedState(true);
  }, []);
  if (!mountedState) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridRootStyles.GridRootStyles, (0, _extends2.default)({
    ref: handleRef,
    className: (0, _clsx.default)(className, classes.root),
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(GridPanelAnchor, {
      role: "presentation",
      "data-id": "gridPanelAnchor"
    }), children]
  }));
});
process.env.NODE_ENV !== "production" ? GridRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;