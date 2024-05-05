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
var _utils = require("@mui/base/utils");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _ClickAwayListener = require("@mui/base/ClickAwayListener");
var _useSnackbar = require("@mui/base/useSnackbar");
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useTheme = _interopRequireDefault(require("../styles/useTheme"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _Grow = _interopRequireDefault(require("../Grow"));
var _SnackbarContent = _interopRequireDefault(require("../SnackbarContent"));
var _snackbarClasses = require("./snackbarClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["onEnter", "onExited"],
  _excluded2 = ["action", "anchorOrigin", "autoHideDuration", "children", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    anchorOrigin
  } = ownerState;
  const slots = {
    root: ['root', `anchorOrigin${(0, _capitalize.default)(anchorOrigin.vertical)}${(0, _capitalize.default)(anchorOrigin.horizontal)}`]
  };
  return (0, _composeClasses.default)(slots, _snackbarClasses.getSnackbarUtilityClass, classes);
};
const SnackbarRoot = (0, _styled.default)('div', {
  name: 'MuiSnackbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`anchorOrigin${(0, _capitalize.default)(ownerState.anchorOrigin.vertical)}${(0, _capitalize.default)(ownerState.anchorOrigin.horizontal)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };
  return (0, _extends2.default)({
    zIndex: (theme.vars || theme).zIndex.snackbar,
    position: 'fixed',
    display: 'flex',
    left: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }, ownerState.anchorOrigin.vertical === 'top' ? {
    top: 8
  } : {
    bottom: 8
  }, ownerState.anchorOrigin.horizontal === 'left' && {
    justifyContent: 'flex-start'
  }, ownerState.anchorOrigin.horizontal === 'right' && {
    justifyContent: 'flex-end'
  }, {
    [theme.breakpoints.up('sm')]: (0, _extends2.default)({}, ownerState.anchorOrigin.vertical === 'top' ? {
      top: 24
    } : {
      bottom: 24
    }, ownerState.anchorOrigin.horizontal === 'center' && center, ownerState.anchorOrigin.horizontal === 'left' && {
      left: 24,
      right: 'auto'
    }, ownerState.anchorOrigin.horizontal === 'right' && {
      right: 24,
      left: 'auto'
    })
  });
});
const Snackbar = /*#__PURE__*/React.forwardRef(function Snackbar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSnackbar'
  });
  const theme = (0, _useTheme.default)();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
      action,
      anchorOrigin: {
        vertical,
        horizontal
      } = {
        vertical: 'bottom',
        horizontal: 'left'
      },
      autoHideDuration = null,
      children,
      className,
      ClickAwayListenerProps,
      ContentProps,
      disableWindowBlurListener = false,
      message,
      open,
      TransitionComponent = _Grow.default,
      transitionDuration = defaultTransitionDuration,
      TransitionProps: {
        onEnter,
        onExited
      } = {}
    } = props,
    TransitionProps = (0, _objectWithoutPropertiesLoose2.default)(props.TransitionProps, _excluded),
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const ownerState = (0, _extends2.default)({}, props, {
    anchorOrigin: {
      vertical,
      horizontal
    },
    autoHideDuration,
    disableWindowBlurListener,
    TransitionComponent,
    transitionDuration
  });
  const classes = useUtilityClasses(ownerState);
  const {
    getRootProps,
    onClickAway
  } = (0, _useSnackbar.useSnackbar)((0, _extends2.default)({}, ownerState));
  const [exited, setExited] = React.useState(true);
  const rootProps = (0, _utils.useSlotProps)({
    elementType: SnackbarRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref
    },
    className: [classes.root, className]
  });
  const handleExited = node => {
    setExited(true);
    if (onExited) {
      onExited(node);
    }
  };
  const handleEnter = (node, isAppearing) => {
    setExited(false);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClickAwayListener.ClickAwayListener, (0, _extends2.default)({
    onClickAway: onClickAway
  }, ClickAwayListenerProps, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SnackbarRoot, (0, _extends2.default)({}, rootProps, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === 'top' ? 'down' : 'up',
        onEnter: handleEnter,
        onExited: handleExited
      }, TransitionProps, {
        children: children || /*#__PURE__*/(0, _jsxRuntime.jsx)(_SnackbarContent.default, (0, _extends2.default)({
          message: message,
          action: action
        }, ContentProps))
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Snackbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: _propTypes.default.node,
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOf(['center', 'left', 'right']).isRequired,
    vertical: _propTypes.default.oneOf(['bottom', 'top']).isRequired
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: _propTypes.default.number,
  /**
   * Replace the `SnackbarContent` component.
   */
  children: _propTypes.default.element,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: _propTypes.default.object,
  /**
   * Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element.
   */
  ContentProps: _propTypes.default.object,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: _propTypes.default.bool,
  /**
   * When displaying multiple consecutive snackbars using a single parent-rendered
   * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
   * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
   * in place, and features like `autoHideDuration` could be affected.
   */
  key: () => null,
  /**
   * The message to display.
   */
  message: _propTypes.default.node,
  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: _propTypes.default.func,
  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,
  /**
   * @ignore
   */
  onMouseEnter: _propTypes.default.func,
  /**
   * @ignore
   */
  onMouseLeave: _propTypes.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: _propTypes.default.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: _propTypes.default.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: _propTypes.default.object
} : void 0;
var _default = exports.default = Snackbar;