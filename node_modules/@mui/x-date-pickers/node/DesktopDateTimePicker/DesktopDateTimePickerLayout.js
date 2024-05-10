"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesktopDateTimePickerLayout = DesktopDateTimePickerLayout;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _PickersLayout = require("../PickersLayout");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @ignore - internal component.
 */
function DesktopDateTimePickerLayout(props) {
  const {
    toolbar,
    tabs,
    content,
    actionBar,
    shortcuts
  } = (0, _PickersLayout.usePickerLayout)(props);
  const {
    sx,
    className,
    isLandscape,
    ref
  } = props;
  const isActionBarVisible = actionBar && (actionBar.props.actions?.length ?? 0) > 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_PickersLayout.PickersLayoutRoot, {
    ref: ref,
    className: (0, _clsx.default)(className, _PickersLayout.pickersLayoutClasses.root),
    sx: [{
      [`& .${_PickersLayout.pickersLayoutClasses.tabs}`]: {
        gridRow: 4,
        gridColumn: '1 / 4'
      },
      [`& .${_PickersLayout.pickersLayoutClasses.actionBar}`]: {
        gridRow: 5
      }
    }, ...(Array.isArray(sx) ? sx : [sx])],
    ownerState: props,
    children: [isLandscape ? shortcuts : toolbar, isLandscape ? toolbar : shortcuts, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_PickersLayout.PickersLayoutContentWrapper, {
      className: _PickersLayout.pickersLayoutClasses.contentWrapper,
      sx: {
        display: 'grid'
      },
      children: [content, tabs, isActionBarVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Divider.default, {
        sx: {
          gridRow: 3,
          gridColumn: '1 / 4'
        }
      })]
    }), actionBar]
  });
}
process.env.NODE_ENV !== "production" ? DesktopDateTimePickerLayout.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isLandscape: _propTypes.default.bool.isRequired,
  isValid: _propTypes.default.func.isRequired,
  onAccept: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onClear: _propTypes.default.func.isRequired,
  onClose: _propTypes.default.func.isRequired,
  onDismiss: _propTypes.default.func.isRequired,
  onOpen: _propTypes.default.func.isRequired,
  onSelectShortcut: _propTypes.default.func.isRequired,
  onSetToday: _propTypes.default.func.isRequired,
  onViewChange: _propTypes.default.func.isRequired,
  /**
   * Force rendering in particular orientation.
   */
  orientation: _propTypes.default.oneOf(['landscape', 'portrait']),
  readOnly: _propTypes.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  value: _propTypes.default.any,
  view: _propTypes.default.oneOf(['day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'year']),
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'year']).isRequired).isRequired,
  wrapperVariant: _propTypes.default.oneOf(['desktop', 'mobile'])
} : void 0;