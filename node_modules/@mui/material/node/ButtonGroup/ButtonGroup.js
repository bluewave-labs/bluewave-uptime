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
var _getValidReactChildren = _interopRequireDefault(require("@mui/utils/getValidReactChildren"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _buttonGroupClasses = _interopRequireWildcard(require("./buttonGroupClasses"));
var _ButtonGroupContext = _interopRequireDefault(require("./ButtonGroupContext"));
var _ButtonGroupButtonContext = _interopRequireDefault(require("./ButtonGroupButtonContext"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "disableRipple", "fullWidth", "orientation", "size", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${_buttonGroupClasses.default.grouped}`]: styles.grouped
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.orientation)}`]
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.variant)}`]
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.variant)}${(0, _capitalize.default)(ownerState.orientation)}`]
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.variant)}${(0, _capitalize.default)(ownerState.color)}`]
  }, {
    [`& .${_buttonGroupClasses.default.firstButton}`]: styles.firstButton
  }, {
    [`& .${_buttonGroupClasses.default.lastButton}`]: styles.lastButton
  }, {
    [`& .${_buttonGroupClasses.default.middleButton}`]: styles.middleButton
  }, styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === 'vertical' && styles.vertical];
};
const useUtilityClasses = ownerState => {
  const {
    classes,
    color,
    disabled,
    disableElevation,
    fullWidth,
    orientation,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant, orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth', disableElevation && 'disableElevation'],
    grouped: ['grouped', `grouped${(0, _capitalize.default)(orientation)}`, `grouped${(0, _capitalize.default)(variant)}`, `grouped${(0, _capitalize.default)(variant)}${(0, _capitalize.default)(orientation)}`, `grouped${(0, _capitalize.default)(variant)}${(0, _capitalize.default)(color)}`, disabled && 'disabled'],
    firstButton: ['firstButton'],
    lastButton: ['lastButton'],
    middleButton: ['middleButton']
  };
  return (0, _composeClasses.default)(slots, _buttonGroupClasses.getButtonGroupUtilityClass, classes);
};
const ButtonGroupRoot = (0, _styled.default)('div', {
  name: 'MuiButtonGroup',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  display: 'inline-flex',
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.variant === 'contained' && {
  boxShadow: (theme.vars || theme).shadows[2]
}, ownerState.disableElevation && {
  boxShadow: 'none'
}, ownerState.fullWidth && {
  width: '100%'
}, ownerState.orientation === 'vertical' && {
  flexDirection: 'column'
}, {
  [`& .${_buttonGroupClasses.default.grouped}`]: (0, _extends2.default)({
    minWidth: 40,
    '&:hover': (0, _extends2.default)({}, ownerState.variant === 'contained' && {
      boxShadow: 'none'
    })
  }, ownerState.variant === 'contained' && {
    boxShadow: 'none'
  }),
  [`& .${_buttonGroupClasses.default.firstButton},& .${_buttonGroupClasses.default.middleButton}`]: (0, _extends2.default)({}, ownerState.orientation === 'horizontal' && {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }, ownerState.orientation === 'vertical' && {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  }, ownerState.variant === 'text' && ownerState.orientation === 'horizontal' && {
    borderRight: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
    [`&.${_buttonGroupClasses.default.disabled}`]: {
      borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === 'text' && ownerState.orientation === 'vertical' && {
    borderBottom: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
    [`&.${_buttonGroupClasses.default.disabled}`]: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
    borderColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : (0, _colorManipulator.alpha)(theme.palette[ownerState.color].main, 0.5)
  }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
    borderRightColor: 'transparent'
  }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
    borderBottomColor: 'transparent'
  }, ownerState.variant === 'contained' && ownerState.orientation === 'horizontal' && {
    borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
    [`&.${_buttonGroupClasses.default.disabled}`]: {
      borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === 'contained' && ownerState.orientation === 'vertical' && {
    borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
    [`&.${_buttonGroupClasses.default.disabled}`]: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }
  }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
    borderColor: (theme.vars || theme).palette[ownerState.color].dark
  }, {
    '&:hover': (0, _extends2.default)({}, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      borderRightColor: 'currentColor'
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      borderBottomColor: 'currentColor'
    })
  }),
  [`& .${_buttonGroupClasses.default.lastButton},& .${_buttonGroupClasses.default.middleButton}`]: (0, _extends2.default)({}, ownerState.orientation === 'horizontal' && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }, ownerState.orientation === 'vertical' && {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
    marginLeft: -1
  }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
    marginTop: -1
  })
}));
const ButtonGroup = /*#__PURE__*/React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiButtonGroup'
  });
  const {
      children,
      className,
      color = 'primary',
      component = 'div',
      disabled = false,
      disableElevation = false,
      disableFocusRipple = false,
      disableRipple = false,
      fullWidth = false,
      orientation = 'horizontal',
      size = 'medium',
      variant = 'outlined'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    color,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    size,
    variant
  }), [color, disabled, disableElevation, disableFocusRipple, disableRipple, fullWidth, size, variant, classes.grouped]);
  const validChildren = (0, _getValidReactChildren.default)(children);
  const childrenCount = validChildren.length;
  const getButtonPositionClassName = index => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;
    if (isFirstButton && isLastButton) {
      return '';
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ButtonGroupRoot, (0, _extends2.default)({
    as: component,
    role: "group",
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonGroupContext.default.Provider, {
      value: context,
      children: validChildren.map((child, index) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonGroupButtonContext.default.Provider, {
          value: getButtonPositionClassName(index),
          children: child
        }, index);
      })
    })
  }));
});
process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: _propTypes.default.bool,
  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: _propTypes.default.bool,
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: _propTypes.default.bool,
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['small', 'medium', 'large']), _propTypes.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['contained', 'outlined', 'text']), _propTypes.default.string])
} : void 0;
var _default = exports.default = ButtonGroup;