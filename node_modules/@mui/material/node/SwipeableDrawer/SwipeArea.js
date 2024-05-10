"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styled = _interopRequireWildcard(require("../styles/styled"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _Drawer = require("../Drawer/Drawer");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["anchor", "classes", "className", "width", "style"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SwipeAreaRoot = (0, _styled.default)('div', {
  shouldForwardProp: _styled.rootShouldForwardProp
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer - 1
}, ownerState.anchor === 'left' && {
  right: 'auto'
}, ownerState.anchor === 'right' && {
  left: 'auto',
  right: 0
}, ownerState.anchor === 'top' && {
  bottom: 'auto',
  right: 0
}, ownerState.anchor === 'bottom' && {
  top: 'auto',
  bottom: 0,
  right: 0
}));

/**
 * @ignore - internal component.
 */
const SwipeArea = /*#__PURE__*/React.forwardRef(function SwipeArea(props, ref) {
  const {
      anchor,
      classes = {},
      className,
      width,
      style
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SwipeAreaRoot, (0, _extends2.default)({
    className: (0, _clsx.default)('PrivateSwipeArea-root', classes.root, classes[`anchor${(0, _capitalize.default)(anchor)}`], className),
    ref: ref,
    style: (0, _extends2.default)({
      [(0, _Drawer.isHorizontal)(anchor) ? 'width' : 'height']: width
    }, style),
    ownerState: ownerState
  }, other));
});
process.env.NODE_ENV !== "production" ? SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: _propTypes.default.oneOf(['left', 'top', 'right', 'bottom']).isRequired,
  /**
   * @ignore
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * @ignore
   */
  style: _propTypes.default.object,
  /**
   * The width of the left most (or right most) area in `px` where the
   * drawer can be swiped open from.
   */
  width: _propTypes.default.number.isRequired
} : void 0;
var _default = exports.default = SwipeArea;