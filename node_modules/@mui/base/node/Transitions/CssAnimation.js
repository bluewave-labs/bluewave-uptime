"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssAnimation = CssAnimation;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useTransition = require("../useTransition");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className", "enterAnimationName", "enterClassName", "exitAnimationName", "exitClassName"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssAnimation API](https://mui.com/base-ui/react-transitions/components-api/#css-animation)
 */
function CssAnimation(props) {
  const {
      children,
      className,
      enterAnimationName,
      enterClassName,
      exitAnimationName,
      exitClassName
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    requestedEnter,
    onExited
  } = (0, _useTransition.useTransitionStateManager)();
  const hasExited = React.useRef(true);
  React.useEffect(() => {
    if (requestedEnter && hasExited.current) {
      hasExited.current = false;
    }
  }, [requestedEnter]);
  const handleAnimationEnd = React.useCallback(event => {
    if (event.animationName === exitAnimationName) {
      onExited();
      hasExited.current = true;
    } else if (event.animationName === enterAnimationName) {
      hasExited.current = false;
    }
  }, [onExited, exitAnimationName, enterAnimationName]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
    onAnimationEnd: handleAnimationEnd,
    className: (0, _clsx.default)(className, requestedEnter ? enterClassName : exitClassName)
  }, other, {
    children: children
  }));
}
process.env.NODE_ENV !== "production" ? CssAnimation.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  enterAnimationName: _propTypes.default.string,
  enterClassName: _propTypes.default.string,
  exitAnimationName: _propTypes.default.string,
  exitClassName: _propTypes.default.string
} : void 0;