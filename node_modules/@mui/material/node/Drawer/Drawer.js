"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAnchor = getAnchor;
exports.isHorizontal = isHorizontal;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _integerPropType = _interopRequireDefault(require("@mui/utils/integerPropType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _RtlProvider = require("@mui/system/RtlProvider");
var _Modal = _interopRequireDefault(require("../Modal"));
var _Slide = _interopRequireDefault(require("../Slide"));
var _Paper = _interopRequireDefault(require("../Paper"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _useTheme = _interopRequireDefault(require("../styles/useTheme"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _styled = _interopRequireWildcard(require("../styles/styled"));
var _drawerClasses = require("./drawerClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["BackdropProps"],
  _excluded2 = ["anchor", "BackdropProps", "children", "className", "elevation", "hideBackdrop", "ModalProps", "onClose", "open", "PaperProps", "SlideProps", "TransitionComponent", "transitionDuration", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && styles.docked, styles.modal];
};
const useUtilityClasses = ownerState => {
  const {
    classes,
    anchor,
    variant
  } = ownerState;
  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper', `paperAnchor${(0, _capitalize.default)(anchor)}`, variant !== 'temporary' && `paperAnchorDocked${(0, _capitalize.default)(anchor)}`]
  };
  return (0, _composeClasses.default)(slots, _drawerClasses.getDrawerUtilityClass, classes);
};
const DrawerRoot = (0, _styled.default)(_Modal.default, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.drawer
}));
const DrawerDockedRoot = (0, _styled.default)('div', {
  shouldForwardProp: _styled.rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver
})({
  flex: '0 0 auto'
});
const DrawerPaper = (0, _styled.default)(_Paper.default, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.paper, styles[`paperAnchor${(0, _capitalize.default)(ownerState.anchor)}`], ownerState.variant !== 'temporary' && styles[`paperAnchorDocked${(0, _capitalize.default)(ownerState.anchor)}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: (theme.vars || theme).zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0
}, ownerState.anchor === 'left' && {
  left: 0
}, ownerState.anchor === 'top' && {
  top: 0,
  left: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, ownerState.anchor === 'right' && {
  right: 0
}, ownerState.anchor === 'bottom' && {
  top: 'auto',
  left: 0,
  bottom: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, ownerState.anchor === 'left' && ownerState.variant !== 'temporary' && {
  borderRight: `1px solid ${(theme.vars || theme).palette.divider}`
}, ownerState.anchor === 'top' && ownerState.variant !== 'temporary' && {
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
}, ownerState.anchor === 'right' && ownerState.variant !== 'temporary' && {
  borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`
}, ownerState.anchor === 'bottom' && ownerState.variant !== 'temporary' && {
  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`
}));
const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};
function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}
function getAnchor({
  direction
}, anchor) {
  return direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

/**
 * The props of the [Modal](/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = /*#__PURE__*/React.forwardRef(function Drawer(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDrawer'
  });
  const theme = (0, _useTheme.default)();
  const isRtl = (0, _RtlProvider.useRtl)();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
      anchor: anchorProp = 'left',
      BackdropProps,
      children,
      className,
      elevation = 16,
      hideBackdrop = false,
      ModalProps: {
        BackdropProps: BackdropPropsProp
      } = {},
      onClose,
      open = false,
      PaperProps = {},
      SlideProps,
      // eslint-disable-next-line react/prop-types
      TransitionComponent = _Slide.default,
      transitionDuration = defaultTransitionDuration,
      variant = 'temporary'
    } = props,
    ModalProps = (0, _objectWithoutPropertiesLoose2.default)(props.ModalProps, _excluded),
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);
  const anchorInvariant = getAnchor({
    direction: isRtl ? 'rtl' : 'ltr'
  }, anchorProp);
  const anchor = anchorProp;
  const ownerState = (0, _extends2.default)({}, props, {
    anchor,
    elevation,
    open,
    variant
  }, other);
  const classes = useUtilityClasses(ownerState);
  const drawer = /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerPaper, (0, _extends2.default)({
    elevation: variant === 'temporary' ? elevation : 0,
    square: true
  }, PaperProps, {
    className: (0, _clsx.default)(classes.paper, PaperProps.className),
    ownerState: ownerState,
    children: children
  }));
  if (variant === 'permanent') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerDockedRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      ownerState: ownerState,
      ref: ref
    }, other, {
      children: drawer
    }));
  }
  const slidingDrawer = /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
    in: open,
    direction: oppositeDirection[anchorInvariant],
    timeout: transitionDuration,
    appear: mounted.current
  }, SlideProps, {
    children: drawer
  }));
  if (variant === 'persistent') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerDockedRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      ownerState: ownerState,
      ref: ref
    }, other, {
      children: slidingDrawer
    }));
  }

  // variant === temporary
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerRoot, (0, _extends2.default)({
    BackdropProps: (0, _extends2.default)({}, BackdropProps, BackdropPropsProp, {
      transitionDuration
    }),
    className: (0, _clsx.default)(classes.root, classes.modal, className),
    open: open,
    ownerState: ownerState,
    onClose: onClose,
    hideBackdrop: hideBackdrop,
    ref: ref
  }, other, ModalProps, {
    children: slidingDrawer
  }));
});
process.env.NODE_ENV !== "production" ? Drawer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: _propTypes.default.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * @ignore
   */
  BackdropProps: _propTypes.default.object,
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
   * The elevation of the drawer.
   * @default 16
   */
  elevation: _integerPropType.default,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: _propTypes.default.bool,
  /**
   * Props applied to the [`Modal`](/material-ui/api/modal/) element.
   * @default {}
   */
  ModalProps: _propTypes.default.object,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: _propTypes.default.func,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: _propTypes.default.bool,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   */
  PaperProps: _propTypes.default.object,
  /**
   * Props applied to the [`Slide`](/material-ui/api/slide/) element.
   */
  SlideProps: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
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
   * The variant to use.
   * @default 'temporary'
   */
  variant: _propTypes.default.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
var _default = exports.default = Drawer;