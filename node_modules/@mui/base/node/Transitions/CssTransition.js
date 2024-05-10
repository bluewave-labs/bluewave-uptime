"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssTransition = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useTransition = require("../useTransition");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className", "lastTransitionedPropertyOnExit", "enterClassName", "exitClassName"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * A utility component that hooks up to the Base UI transitions API and
 * applies a CSS transition to its children when necessary.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssTransition API](https://mui.com/base-ui/react-transitions/components-api/#css-transition)
 */
const CssTransition = exports.CssTransition = /*#__PURE__*/React.forwardRef(function CssTransition(props, forwardedRef) {
  const {
      children,
      className,
      lastTransitionedPropertyOnExit,
      enterClassName,
      exitClassName
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    requestedEnter,
    onExited
  } = (0, _useTransition.useTransitionStateManager)();
  const [isEntering, setIsEntering] = React.useState(false);

  // The `isEntering` state (which is used to determine the right CSS class to apply)
  // is updated slightly (one animation frame) after the `requestedEnter` state is updated.
  // Thanks to this, elements that are mounted will have their enter transition applied
  // (if the `enterClassName` was applied when the element was mounted, the transition would not be fired).
  React.useEffect(() => {
    if (requestedEnter) {
      requestAnimationFrame(() => {
        setIsEntering(true);
      });
    } else {
      setIsEntering(false);
    }
  }, [requestedEnter]);
  const handleTransitionEnd = React.useCallback(event => {
    if (!requestedEnter && (lastTransitionedPropertyOnExit == null || event.propertyName === lastTransitionedPropertyOnExit)) {
      onExited();
    }
  }, [onExited, requestedEnter, lastTransitionedPropertyOnExit]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
    onTransitionEnd: handleTransitionEnd,
    className: (0, _clsx.default)(className, isEntering ? enterClassName : exitClassName)
  }, other, {
    ref: forwardedRef,
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? CssTransition.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  enterClassName: _propTypes.default.string,
  exitClassName: _propTypes.default.string,
  lastTransitionedPropertyOnEnter: _propTypes.default.string,
  lastTransitionedPropertyOnExit: _propTypes.default.string
} : void 0;