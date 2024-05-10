"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createBox;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styledEngine = _interopRequireDefault(require("@mui/styled-engine"));
var _styleFunctionSx = _interopRequireWildcard(require("./styleFunctionSx"));
var _useTheme = _interopRequireDefault(require("./useTheme"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "component"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function createBox(options = {}) {
  const {
    themeId,
    defaultTheme,
    defaultClassName = 'MuiBox-root',
    generateClassName
  } = options;
  const BoxRoot = (0, _styledEngine.default)('div', {
    shouldForwardProp: prop => prop !== 'theme' && prop !== 'sx' && prop !== 'as'
  })(_styleFunctionSx.default);
  const Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
    const theme = (0, _useTheme.default)(defaultTheme);
    const _extendSxProp = (0, _styleFunctionSx.extendSxProp)(inProps),
      {
        className,
        component = 'div'
      } = _extendSxProp,
      other = (0, _objectWithoutPropertiesLoose2.default)(_extendSxProp, _excluded);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(BoxRoot, (0, _extends2.default)({
      as: component,
      ref: ref,
      className: (0, _clsx.default)(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme
    }, other));
  });
  return Box;
}