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
var _integerPropType = _interopRequireDefault(require("@mui/utils/integerPropType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _Paper = _interopRequireDefault(require("../Paper"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _LinearProgress = _interopRequireDefault(require("../LinearProgress"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _styled = _interopRequireWildcard(require("../styles/styled"));
var _mobileStepperClasses = require("./mobileStepperClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["activeStep", "backButton", "className", "LinearProgressProps", "nextButton", "position", "steps", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ['root', `position${(0, _capitalize.default)(position)}`],
    dots: ['dots'],
    dot: ['dot'],
    dotActive: ['dotActive'],
    progress: ['progress']
  };
  return (0, _composeClasses.default)(slots, _mobileStepperClasses.getMobileStepperUtilityClass, classes);
};
const MobileStepperRoot = (0, _styled.default)(_Paper.default, {
  name: 'MuiMobileStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`position${(0, _capitalize.default)(ownerState.position)}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: (theme.vars || theme).palette.background.default,
  padding: 8
}, ownerState.position === 'bottom' && {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: (theme.vars || theme).zIndex.mobileStepper
}, ownerState.position === 'top' && {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: (theme.vars || theme).zIndex.mobileStepper
}));
const MobileStepperDots = (0, _styled.default)('div', {
  name: 'MuiMobileStepper',
  slot: 'Dots',
  overridesResolver: (props, styles) => styles.dots
})(({
  ownerState
}) => (0, _extends2.default)({}, ownerState.variant === 'dots' && {
  display: 'flex',
  flexDirection: 'row'
}));
const MobileStepperDot = (0, _styled.default)('div', {
  name: 'MuiMobileStepper',
  slot: 'Dot',
  shouldForwardProp: prop => (0, _styled.slotShouldForwardProp)(prop) && prop !== 'dotActive',
  overridesResolver: (props, styles) => {
    const {
      dotActive
    } = props;
    return [styles.dot, dotActive && styles.dotActive];
  }
})(({
  theme,
  ownerState,
  dotActive
}) => (0, _extends2.default)({}, ownerState.variant === 'dots' && (0, _extends2.default)({
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: (theme.vars || theme).palette.action.disabled,
  borderRadius: '50%',
  width: 8,
  height: 8,
  margin: '0 2px'
}, dotActive && {
  backgroundColor: (theme.vars || theme).palette.primary.main
})));
const MobileStepperProgress = (0, _styled.default)(_LinearProgress.default, {
  name: 'MuiMobileStepper',
  slot: 'Progress',
  overridesResolver: (props, styles) => styles.progress
})(({
  ownerState
}) => (0, _extends2.default)({}, ownerState.variant === 'progress' && {
  width: '50%'
}));
const MobileStepper = /*#__PURE__*/React.forwardRef(function MobileStepper(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiMobileStepper'
  });
  const {
      activeStep = 0,
      backButton,
      className,
      LinearProgressProps,
      nextButton,
      position = 'bottom',
      steps,
      variant = 'dots'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    activeStep,
    position,
    variant
  });
  let value;
  if (variant === 'progress') {
    if (steps === 1) {
      value = 100;
    } else {
      value = Math.ceil(activeStep / (steps - 1) * 100);
    }
  }
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(MobileStepperRoot, (0, _extends2.default)({
    square: true,
    elevation: 0,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: [backButton, variant === 'text' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [activeStep + 1, " / ", steps]
    }), variant === 'dots' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileStepperDots, {
      ownerState: ownerState,
      className: classes.dots,
      children: [...new Array(steps)].map((_, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileStepperDot, {
        className: (0, _clsx.default)(classes.dot, index === activeStep && classes.dotActive),
        ownerState: ownerState,
        dotActive: index === activeStep
      }, index))
    }), variant === 'progress' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileStepperProgress, (0, _extends2.default)({
      ownerState: ownerState,
      className: classes.progress,
      variant: "determinate",
      value: value
    }, LinearProgressProps)), nextButton]
  }));
});
process.env.NODE_ENV !== "production" ? MobileStepper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: _integerPropType.default,
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: _propTypes.default.object,
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: _propTypes.default.node,
  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: _propTypes.default.oneOf(['bottom', 'static', 'top']),
  /**
   * The total steps.
   */
  steps: _integerPropType.default.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: _propTypes.default.oneOf(['dots', 'progress', 'text'])
} : void 0;
var _default = exports.default = MobileStepper;