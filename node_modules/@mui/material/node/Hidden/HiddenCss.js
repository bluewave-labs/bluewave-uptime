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
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useTheme = _interopRequireDefault(require("../styles/useTheme"));
var _hiddenCssClasses = require("./hiddenCssClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className", "only"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    breakpoints
  } = ownerState;
  const slots = {
    root: ['root', ...breakpoints.map(({
      breakpoint,
      dir
    }) => {
      return dir === 'only' ? `${dir}${(0, _capitalize.default)(breakpoint)}` : `${breakpoint}${(0, _capitalize.default)(dir)}`;
    })]
  };
  return (0, _composeClasses.default)(slots, _hiddenCssClasses.getHiddenCssUtilityClass, classes);
};
const HiddenCssRoot = (0, _styled.default)('div', {
  name: 'PrivateHiddenCss',
  slot: 'Root'
})(({
  theme,
  ownerState
}) => {
  const hidden = {
    display: 'none'
  };
  return (0, _extends2.default)({}, ownerState.breakpoints.map(({
    breakpoint,
    dir
  }) => {
    if (dir === 'only') {
      return {
        [theme.breakpoints.only(breakpoint)]: hidden
      };
    }
    return dir === 'up' ? {
      [theme.breakpoints.up(breakpoint)]: hidden
    } : {
      [theme.breakpoints.down(breakpoint)]: hidden
    };
  }).reduce((r, o) => {
    Object.keys(o).forEach(k => {
      r[k] = o[k];
    });
    return r;
  }, {}));
});

/**
 * @ignore - internal component.
 */
function HiddenCss(props) {
  const {
      children,
      className,
      only
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _useTheme.default)();
  if (process.env.NODE_ENV !== 'production') {
    const unknownProps = Object.keys(other).filter(propName => {
      const isUndeclaredBreakpoint = !theme.breakpoints.keys.some(breakpoint => {
        return `${breakpoint}Up` === propName || `${breakpoint}Down` === propName;
      });
      return !['classes', 'theme', 'isRtl', 'sx'].includes(propName) && isUndeclaredBreakpoint;
    });
    if (unknownProps.length > 0) {
      console.error(`MUI: Unsupported props received by \`<Hidden implementation="css" />\`: ${unknownProps.join(', ')}. Did you forget to wrap this component in a ThemeProvider declaring these breakpoints?`);
    }
  }
  const breakpoints = [];
  for (let i = 0; i < theme.breakpoints.keys.length; i += 1) {
    const breakpoint = theme.breakpoints.keys[i];
    const breakpointUp = other[`${breakpoint}Up`];
    const breakpointDown = other[`${breakpoint}Down`];
    if (breakpointUp) {
      breakpoints.push({
        breakpoint,
        dir: 'up'
      });
    }
    if (breakpointDown) {
      breakpoints.push({
        breakpoint,
        dir: 'down'
      });
    }
  }
  if (only) {
    const onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(breakpoint => {
      breakpoints.push({
        breakpoint,
        dir: 'only'
      });
    });
  }
  const ownerState = (0, _extends2.default)({}, props, {
    breakpoints
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(HiddenCssRoot, {
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? HiddenCss.propTypes = {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation: _propTypes.default.oneOf(['js', 'css']),
  /**
   * If `true`, screens this size and down are hidden.
   */
  lgDown: _propTypes.default.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  lgUp: _propTypes.default.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  mdDown: _propTypes.default.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  mdUp: _propTypes.default.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: _propTypes.default.oneOfType([_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),
  /**
   * If `true`, screens this size and down are hidden.
   */
  smDown: _propTypes.default.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  smUp: _propTypes.default.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  xlDown: _propTypes.default.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  xlUp: _propTypes.default.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  xsDown: _propTypes.default.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  xsUp: _propTypes.default.bool
} : void 0;
var _default = exports.default = HiddenCss;