"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersShortcuts = PickersShortcuts;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));
var _Chip = _interopRequireDefault(require("@mui/material/Chip"));
var _dimensions = require("../internals/constants/dimensions");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["items", "changeImportance", "isLandscape", "onChange", "isValid"],
  _excluded2 = ["getValue"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Demos:
 *
 * - [Shortcuts](https://mui.com/x/react-date-pickers/shortcuts/)
 *
 * API:
 *
 * - [PickersShortcuts API](https://mui.com/x/api/date-pickers/pickers-shortcuts/)
 */
function PickersShortcuts(props) {
  const {
      items,
      changeImportance = 'accept',
      onChange,
      isValid
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  if (items == null || items.length === 0) {
    return null;
  }
  const resolvedItems = items.map(_ref => {
    let {
        getValue
      } = _ref,
      item = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
    const newValue = getValue({
      isValid
    });
    return {
      label: item.label,
      onClick: () => {
        onChange(newValue, changeImportance, item);
      },
      disabled: !isValid(newValue)
    };
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_List.default, (0, _extends2.default)({
    dense: true,
    sx: [{
      maxHeight: _dimensions.VIEW_HEIGHT,
      maxWidth: 200,
      overflow: 'auto'
    }, ...(Array.isArray(other.sx) ? other.sx : [other.sx])]
  }, other, {
    children: resolvedItems.map(item => {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chip.default, (0, _extends2.default)({}, item))
      }, item.label);
    })
  }));
}
process.env.NODE_ENV !== "production" ? PickersShortcuts.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Importance of the change when picking a shortcut:
   * - "accept": fires `onChange`, fires `onAccept` and closes the picker.
   * - "set": fires `onChange` but do not fire `onAccept` and does not close the picker.
   * @default "accept"
   */
  changeImportance: _propTypes.default.oneOf(['accept', 'set']),
  className: _propTypes.default.string,
  component: _propTypes.default.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: _propTypes.default.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: _propTypes.default.bool,
  isLandscape: _propTypes.default.bool.isRequired,
  isValid: _propTypes.default.func.isRequired,
  /**
   * Ordered array of shortcuts to display.
   * If empty, does not display the shortcuts.
   * @default []
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    getValue: _propTypes.default.func.isRequired,
    label: _propTypes.default.string.isRequired
  })),
  onChange: _propTypes.default.func.isRequired,
  style: _propTypes.default.object,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: _propTypes.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;