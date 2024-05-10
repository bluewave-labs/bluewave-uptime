"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaderMenu = GridColumnHeaderMenu;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _useGridApiContext = require("../../../hooks/utils/useGridApiContext");
var _GridMenu = require("../GridMenu");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridColumnHeaderMenu({
  columnMenuId,
  columnMenuButtonId,
  ContentComponent,
  contentComponentProps,
  field,
  open,
  target,
  onExited
}) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const colDef = apiRef.current.getColumn(field);
  const hideMenu = (0, _utils.unstable_useEventCallback)(event => {
    if (event) {
      // Prevent triggering the sorting
      event.stopPropagation();
      if (target?.contains(event.target)) {
        return;
      }
    }
    apiRef.current.hideColumnMenu();
  });
  if (!target || !colDef) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridMenu.GridMenu, {
    placement: `bottom-${colDef.align === 'right' ? 'start' : 'end'}`,
    open: open,
    target: target,
    onClose: hideMenu,
    onExited: onExited,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ContentComponent, (0, _extends2.default)({
      colDef: colDef,
      hideMenu: hideMenu,
      open: open,
      id: columnMenuId,
      labelledby: columnMenuButtonId
    }, contentComponentProps))
  });
}
process.env.NODE_ENV !== "production" ? GridColumnHeaderMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnMenuButtonId: _propTypes.default.string,
  columnMenuId: _propTypes.default.string,
  ContentComponent: _propTypes.default.elementType.isRequired,
  contentComponentProps: _propTypes.default.any,
  field: _propTypes.default.string.isRequired,
  onExited: _propTypes.default.func,
  open: _propTypes.default.bool.isRequired,
  target: _utils.HTMLElementType
} : void 0;