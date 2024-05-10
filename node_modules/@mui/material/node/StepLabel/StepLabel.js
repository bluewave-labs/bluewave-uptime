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
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _StepIcon = _interopRequireDefault(require("../StepIcon"));
var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));
var _StepContext = _interopRequireDefault(require("../Step/StepContext"));
var _stepLabelClasses = _interopRequireWildcard(require("./stepLabelClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className", "componentsProps", "error", "icon", "optional", "slotProps", "StepIconComponent", "StepIconProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    orientation,
    active,
    completed,
    error,
    disabled,
    alternativeLabel
  } = ownerState;
  const slots = {
    root: ['root', orientation, error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    label: ['label', active && 'active', completed && 'completed', error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    iconContainer: ['iconContainer', active && 'active', completed && 'completed', error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    labelContainer: ['labelContainer', alternativeLabel && 'alternativeLabel']
  };
  return (0, _composeClasses.default)(slots, _stepLabelClasses.getStepLabelUtilityClass, classes);
};
const StepLabelRoot = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation]];
  }
})(({
  ownerState
}) => (0, _extends2.default)({
  display: 'flex',
  alignItems: 'center',
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    flexDirection: 'column'
  },
  [`&.${_stepLabelClasses.default.disabled}`]: {
    cursor: 'default'
  }
}, ownerState.orientation === 'vertical' && {
  textAlign: 'left',
  padding: '8px 0'
}));
const StepLabelLabel = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body2, {
  display: 'block',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_stepLabelClasses.default.active}`]: {
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: 500
  },
  [`&.${_stepLabelClasses.default.completed}`]: {
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: 500
  },
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    marginTop: 16
  },
  [`&.${_stepLabelClasses.default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
const StepLabelIconContainer = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'IconContainer',
  overridesResolver: (props, styles) => styles.iconContainer
})(() => ({
  flexShrink: 0,
  // Fix IE11 issue
  display: 'flex',
  paddingRight: 8,
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    paddingRight: 0
  }
}));
const StepLabelLabelContainer = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'LabelContainer',
  overridesResolver: (props, styles) => styles.labelContainer
})(({
  theme
}) => ({
  width: '100%',
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    textAlign: 'center'
  }
}));
const StepLabel = /*#__PURE__*/React.forwardRef(function StepLabel(inProps, ref) {
  var _slotProps$label;
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepLabel'
  });
  const {
      children,
      className,
      componentsProps = {},
      error = false,
      icon: iconProp,
      optional,
      slotProps = {},
      StepIconComponent: StepIconComponentProp,
      StepIconProps
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    alternativeLabel,
    orientation
  } = React.useContext(_StepperContext.default);
  const {
    active,
    disabled,
    completed,
    icon: iconContext
  } = React.useContext(_StepContext.default);
  const icon = iconProp || iconContext;
  let StepIconComponent = StepIconComponentProp;
  if (icon && !StepIconComponent) {
    StepIconComponent = _StepIcon.default;
  }
  const ownerState = (0, _extends2.default)({}, props, {
    active,
    alternativeLabel,
    completed,
    disabled,
    error,
    orientation
  });
  const classes = useUtilityClasses(ownerState);
  const labelSlotProps = (_slotProps$label = slotProps.label) != null ? _slotProps$label : componentsProps.label;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StepLabelRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: [icon || StepIconComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(StepLabelIconContainer, {
      className: classes.iconContainer,
      ownerState: ownerState,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StepIconComponent, (0, _extends2.default)({
        completed: completed,
        active: active,
        error: error,
        icon: icon
      }, StepIconProps))
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(StepLabelLabelContainer, {
      className: classes.labelContainer,
      ownerState: ownerState,
      children: [children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(StepLabelLabel, (0, _extends2.default)({
        ownerState: ownerState
      }, labelSlotProps, {
        className: (0, _clsx.default)(classes.label, labelSlotProps == null ? void 0 : labelSlotProps.className),
        children: children
      })) : null, optional]
    })]
  }));
});
process.env.NODE_ENV !== "production" ? StepLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * In most cases will simply be a string containing a title for the label.
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
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: _propTypes.default.shape({
    label: _propTypes.default.object
  }),
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: _propTypes.default.bool,
  /**
   * Override the default label of the step icon.
   */
  icon: _propTypes.default.node,
  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    label: _propTypes.default.object
  }),
  /**
   * The component to render in place of the [`StepIcon`](/material-ui/api/step-icon/).
   */
  StepIconComponent: _propTypes.default.elementType,
  /**
   * Props applied to the [`StepIcon`](/material-ui/api/step-icon/) element.
   */
  StepIconProps: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
StepLabel.muiName = 'StepLabel';
var _default = exports.default = StepLabel;