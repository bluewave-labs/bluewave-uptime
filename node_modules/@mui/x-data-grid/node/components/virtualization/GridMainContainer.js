"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridMainContainer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _useGridAriaAttributes = require("../../hooks/utils/useGridAriaAttributes");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Element = (0, _system.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'Main',
  overridesResolver: (props, styles) => styles.main
})({
  flexGrow: 1,
  position: 'relative',
  overflow: 'hidden'
});
const GridMainContainer = exports.GridMainContainer = /*#__PURE__*/React.forwardRef((props, ref) => {
  const ariaAttributes = (0, _useGridAriaAttributes.useGridAriaAttributes)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Element, (0, _extends2.default)({
    ref: ref,
    ownerState: rootProps,
    className: props.className,
    tabIndex: -1
  }, ariaAttributes, {
    children: props.children
  }));
});