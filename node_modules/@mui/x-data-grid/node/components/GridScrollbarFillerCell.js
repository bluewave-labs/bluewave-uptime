"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridScrollbarFillerCell = GridScrollbarFillerCell;
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _constants = require("../constants");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const classes = {
  root: _constants.gridClasses.scrollbarFiller,
  header: _constants.gridClasses['scrollbarFiller--header'],
  borderTop: _constants.gridClasses['scrollbarFiller--borderTop'],
  pinnedRight: _constants.gridClasses['scrollbarFiller--pinnedRight']
};
function GridScrollbarFillerCell({
  header,
  borderTop = true,
  pinnedRight
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "presentation",
    className: (0, _clsx.default)(classes.root, header && classes.header, borderTop && classes.borderTop, pinnedRight && classes.pinnedRight)
  });
}