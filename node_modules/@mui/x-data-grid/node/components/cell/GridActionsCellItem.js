"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridActionsCellItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["label", "icon", "showInMenu", "onClick"],
  _excluded2 = ["label", "icon", "showInMenu", "onClick", "closeMenuOnClick", "closeMenu"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridActionsCellItem = exports.GridActionsCellItem = /*#__PURE__*/React.forwardRef((props, ref) => {
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  if (!props.showInMenu) {
    const {
        label,
        icon,
        onClick
      } = props,
      other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
    const handleClick = event => {
      onClick?.(event);
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseIconButton, (0, _extends2.default)({
      ref: ref,
      size: "small",
      role: "menuitem",
      "aria-label": label
    }, other, {
      onClick: handleClick
    }, rootProps.slotProps?.baseIconButton, {
      children: /*#__PURE__*/React.cloneElement(icon, {
        fontSize: 'small'
      })
    }));
  }
  const {
      label,
      icon,
      onClick,
      closeMenuOnClick = true,
      closeMenu
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const handleClick = event => {
    onClick?.(event);
    if (closeMenuOnClick) {
      closeMenu?.();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, (0, _extends2.default)({
    ref: ref
  }, other, {
    onClick: handleClick,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: icon
    }), label]
  }));
});
process.env.NODE_ENV !== "production" ? GridActionsCellItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * from https://mui.com/material-ui/api/button-base/#ButtonBase-prop-component
   */
  component: _propTypes.default.elementType,
  icon: _propTypes.default.element,
  label: _propTypes.default.string.isRequired,
  showInMenu: _propTypes.default.bool
} : void 0;