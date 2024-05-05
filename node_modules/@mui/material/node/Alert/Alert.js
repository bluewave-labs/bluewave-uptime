"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _colorManipulator = require("@mui/system/colorManipulator");
var _zeroStyled = require("../zero-styled");
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _Paper = _interopRequireDefault(require("../Paper"));
var _alertClasses = _interopRequireWildcard(require("./alertClasses"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _SuccessOutlined = _interopRequireDefault(require("../internal/svg-icons/SuccessOutlined"));
var _ReportProblemOutlined = _interopRequireDefault(require("../internal/svg-icons/ReportProblemOutlined"));
var _ErrorOutline = _interopRequireDefault(require("../internal/svg-icons/ErrorOutline"));
var _InfoOutlined = _interopRequireDefault(require("../internal/svg-icons/InfoOutlined"));
var _Close = _interopRequireDefault(require("../internal/svg-icons/Close"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["action", "children", "className", "closeText", "color", "components", "componentsProps", "icon", "iconMapping", "onClose", "role", "severity", "slotProps", "slots", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useThemeProps = (0, _zeroStyled.createUseThemeProps)('MuiAlert');
const useUtilityClasses = ownerState => {
  const {
    variant,
    color,
    severity,
    classes
  } = ownerState;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color || severity)}`, `${variant}${(0, _capitalize.default)(color || severity)}`, `${variant}`],
    icon: ['icon'],
    message: ['message'],
    action: ['action']
  };
  return (0, _composeClasses.default)(slots, _alertClasses.getAlertUtilityClass, classes);
};
const AlertRoot = (0, _zeroStyled.styled)(_Paper.default, {
  name: 'MuiAlert',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${(0, _capitalize.default)(ownerState.color || ownerState.severity)}`]];
  }
})(({
  theme
}) => {
  const getColor = theme.palette.mode === 'light' ? _colorManipulator.darken : _colorManipulator.lighten;
  const getBackgroundColor = theme.palette.mode === 'light' ? _colorManipulator.lighten : _colorManipulator.darken;
  return (0, _extends2.default)({}, theme.typography.body2, {
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px',
    variants: [...Object.entries(theme.palette).filter(([, value]) => value.main && value.light).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: 'standard'
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color}StandardBg`] : getBackgroundColor(theme.palette[color].light, 0.9),
        [`& .${_alertClasses.default.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(([, value]) => value.main && value.light).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: 'outlined'
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        border: `1px solid ${(theme.vars || theme).palette[color].light}`,
        [`& .${_alertClasses.default.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(([, value]) => value.main && value.dark).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: 'filled'
      },
      style: (0, _extends2.default)({
        fontWeight: theme.typography.fontWeightMedium
      }, theme.vars ? {
        color: theme.vars.palette.Alert[`${color}FilledColor`],
        backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`]
      } : {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette[color].dark : theme.palette[color].main,
        color: theme.palette.getContrastText(theme.palette[color].main)
      })
    }))]
  });
});
const AlertIcon = (0, _zeroStyled.styled)('div', {
  name: 'MuiAlert',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9
});
const AlertMessage = (0, _zeroStyled.styled)('div', {
  name: 'MuiAlert',
  slot: 'Message',
  overridesResolver: (props, styles) => styles.message
})({
  padding: '8px 0',
  minWidth: 0,
  overflow: 'auto'
});
const AlertAction = (0, _zeroStyled.styled)('div', {
  name: 'MuiAlert',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action
})({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '4px 0 0 16px',
  marginLeft: 'auto',
  marginRight: -8
});
const defaultIconMapping = {
  success: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SuccessOutlined.default, {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ReportProblemOutlined.default, {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorOutline.default, {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoOutlined.default, {
    fontSize: "inherit"
  })
};
const Alert = /*#__PURE__*/React.forwardRef(function Alert(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAlert'
  });
  const {
      action,
      children,
      className,
      closeText = 'Close',
      color,
      components = {},
      componentsProps = {},
      icon,
      iconMapping = defaultIconMapping,
      onClose,
      role = 'alert',
      severity = 'success',
      slotProps = {},
      slots = {},
      variant = 'standard'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    severity,
    variant,
    colorSeverity: color || severity
  });
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots: (0, _extends2.default)({
      closeButton: components.CloseButton,
      closeIcon: components.CloseIcon
    }, slots),
    slotProps: (0, _extends2.default)({}, componentsProps, slotProps)
  };
  const [CloseButtonSlot, closeButtonProps] = (0, _useSlot.default)('closeButton', {
    elementType: _IconButton.default,
    externalForwardedProps,
    ownerState
  });
  const [CloseIconSlot, closeIconProps] = (0, _useSlot.default)('closeIcon', {
    elementType: _Close.default,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(AlertRoot, (0, _extends2.default)({
    role: role,
    elevation: 0,
    ownerState: ownerState,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    children: [icon !== false ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AlertIcon, {
      ownerState: ownerState,
      className: classes.icon,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(AlertMessage, {
      ownerState: ownerState,
      className: classes.message,
      children: children
    }), action != null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AlertAction, {
      ownerState: ownerState,
      className: classes.action,
      children: action
    }) : null, action == null && onClose ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AlertAction, {
      ownerState: ownerState,
      className: classes.action,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CloseButtonSlot, (0, _extends2.default)({
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose
      }, closeButtonProps, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CloseIconSlot, (0, _extends2.default)({
          fontSize: "small"
        }, closeIconProps))
      }))
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? Alert.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: _propTypes.default.node,
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: _propTypes.default.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  components: _propTypes.default.shape({
    CloseButton: _propTypes.default.elementType,
    CloseIcon: _propTypes.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  componentsProps: _propTypes.default.shape({
    closeButton: _propTypes.default.object,
    closeIcon: _propTypes.default.object
  }),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: _propTypes.default.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: _propTypes.default.shape({
    error: _propTypes.default.node,
    info: _propTypes.default.node,
    success: _propTypes.default.node,
    warning: _propTypes.default.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: _propTypes.default.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: _propTypes.default.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    closeButton: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    closeIcon: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    closeButton: _propTypes.default.elementType,
    closeIcon: _propTypes.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['filled', 'outlined', 'standard']), _propTypes.default.string])
} : void 0;
var _default = exports.default = Alert;