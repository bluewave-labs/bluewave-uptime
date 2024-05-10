"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridNoResultsOverlay = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _GridOverlay = require("./containers/GridOverlay");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridNoResultsOverlay = exports.GridNoResultsOverlay = /*#__PURE__*/React.forwardRef(function GridNoResultsOverlay(props, ref) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const noResultsOverlayLabel = apiRef.current.getLocaleText('noResultsOverlayLabel');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridOverlay.GridOverlay, (0, _extends2.default)({
    ref: ref
  }, props, {
    children: noResultsOverlayLabel
  }));
});