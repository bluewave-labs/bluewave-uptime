"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuContainer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));
var _styles = require("@mui/material/styles");
var _keyboardUtils = require("../../../utils/keyboardUtils");
var _gridClasses = require("../../../constants/gridClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["hideMenu", "colDef", "id", "labelledby", "className", "children", "open"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const StyledMenuList = (0, _styles.styled)(_MenuList.default)(() => ({
  minWidth: 248
}));
const GridColumnMenuContainer = exports.GridColumnMenuContainer = /*#__PURE__*/React.forwardRef(function GridColumnMenuContainer(props, ref) {
  const {
      hideMenu,
      id,
      labelledby,
      className,
      children,
      open
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const handleListKeyDown = React.useCallback(event => {
    if ((0, _keyboardUtils.isTabKey)(event.key)) {
      event.preventDefault();
    }
    if ((0, _keyboardUtils.isHideMenuKey)(event.key)) {
      hideMenu(event);
    }
  }, [hideMenu]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledMenuList, (0, _extends2.default)({
    id: id,
    ref: ref,
    className: (0, _clsx.default)(_gridClasses.gridClasses.menuList, className),
    "aria-labelledby": labelledby,
    onKeyDown: handleListKeyDown,
    autoFocus: open
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnMenuContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  hideMenu: _propTypes.default.func.isRequired,
  id: _propTypes.default.string,
  labelledby: _propTypes.default.string,
  open: _propTypes.default.bool.isRequired
} : void 0;