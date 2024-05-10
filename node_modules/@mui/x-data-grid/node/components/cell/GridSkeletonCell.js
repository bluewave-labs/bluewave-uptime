"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridSkeletonCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Skeleton = _interopRequireDefault(require("@mui/material/Skeleton"));
var _utils = require("@mui/utils");
var _fastMemo = require("../../utils/fastMemo");
var _utils2 = require("../../utils/utils");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridClasses = require("../../constants/gridClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["field", "align", "width", "height"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const randomWidth = (0, _utils2.randomNumberBetween)(10000, 20, 80);
const useUtilityClasses = ownerState => {
  const {
    align,
    classes
  } = ownerState;
  const slots = {
    root: ['cell', 'cellSkeleton', `cell--text${(0, _utils.unstable_capitalize)(align)}`, 'withBorderColor']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function GridSkeletonCell(props) {
  const {
      align,
      width,
      height
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes,
    align
  };
  const classes = useUtilityClasses(ownerState);
  const contentWidth = Math.round(randomWidth());
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
    className: classes.root,
    style: {
      height,
      maxWidth: width,
      minWidth: width
    }
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Skeleton.default, {
      width: `${contentWidth}%`,
      height: 25
    })
  }));
}
process.env.NODE_ENV !== "production" ? GridSkeletonCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  align: _propTypes.default.string.isRequired,
  field: _propTypes.default.string.isRequired,
  height: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]).isRequired,
  width: _propTypes.default.number.isRequired
} : void 0;
const Memoized = exports.GridSkeletonCell = (0, _fastMemo.fastMemo)(GridSkeletonCell);