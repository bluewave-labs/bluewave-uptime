"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersActionBar = PickersActionBar;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _useUtils = require("../internals/hooks/useUtils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["onAccept", "onClear", "onCancel", "onSetToday", "actions"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Demos:
 *
 * - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
 * - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
 *
 * API:
 *
 * - [PickersActionBar API](https://mui.com/x/api/date-pickers/pickers-action-bar/)
 */
function PickersActionBar(props) {
  const {
      onAccept,
      onClear,
      onCancel,
      onSetToday,
      actions
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const localeText = (0, _useUtils.useLocaleText)();
  if (actions == null || actions.length === 0) {
    return null;
  }
  const buttons = actions?.map(actionType => {
    switch (actionType) {
      case 'clear':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onClear,
          children: localeText.clearButtonLabel
        }, actionType);
      case 'cancel':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onCancel,
          children: localeText.cancelButtonLabel
        }, actionType);
      case 'accept':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onAccept,
          children: localeText.okButtonLabel
        }, actionType);
      case 'today':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onSetToday,
          children: localeText.todayButtonLabel
        }, actionType);
      default:
        return null;
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogActions.default, (0, _extends2.default)({}, other, {
    children: buttons
  }));
}
process.env.NODE_ENV !== "production" ? PickersActionBar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Ordered array of actions to display.
   * If empty, does not display that action bar.
   * @default `['cancel', 'accept']` for mobile and `[]` for desktop
   */
  actions: _propTypes.default.arrayOf(_propTypes.default.oneOf(['accept', 'cancel', 'clear', 'today']).isRequired),
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: _propTypes.default.bool,
  onAccept: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired,
  onClear: _propTypes.default.func.isRequired,
  onSetToday: _propTypes.default.func.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;