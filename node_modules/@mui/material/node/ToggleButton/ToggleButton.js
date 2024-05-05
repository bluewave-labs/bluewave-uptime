"use strict";
'use client';

// @inheritedComponent ButtonBase
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
var _resolveProps = _interopRequireDefault(require("@mui/utils/resolveProps"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _styles = require("../styles");
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _toggleButtonClasses = _interopRequireWildcard(require("./toggleButtonClasses"));
var _ToggleButtonGroupContext = _interopRequireDefault(require("../ToggleButtonGroup/ToggleButtonGroupContext"));
var _ToggleButtonGroupButtonContext = _interopRequireDefault(require("../ToggleButtonGroup/ToggleButtonGroupButtonContext"));
var _isValueSelected = _interopRequireDefault(require("../ToggleButtonGroup/isValueSelected"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["value"],
  _excluded2 = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', fullWidth && 'fullWidth', `size${(0, _capitalize.default)(size)}`, color]
  };
  return (0, _composeClasses.default)(slots, _toggleButtonClasses.getToggleButtonUtilityClass, classes);
};
const ToggleButtonRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`size${(0, _capitalize.default)(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  let selectedColor = ownerState.color === 'standard' ? theme.palette.text.primary : theme.palette[ownerState.color].main;
  let selectedColorChannel;
  if (theme.vars) {
    selectedColor = ownerState.color === 'standard' ? theme.vars.palette.text.primary : theme.vars.palette[ownerState.color].main;
    selectedColorChannel = ownerState.color === 'standard' ? theme.vars.palette.text.primaryChannel : theme.vars.palette[ownerState.color].mainChannel;
  }
  return (0, _extends2.default)({}, theme.typography.button, {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 11,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    color: (theme.vars || theme).palette.action.active
  }, ownerState.fullWidth && {
    width: '100%'
  }, {
    [`&.${_toggleButtonClasses.default.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _styles.alpha)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${_toggleButtonClasses.default.selected}`]: {
      color: selectedColor,
      backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / ${theme.vars.palette.action.selectedOpacity})` : (0, _styles.alpha)(selectedColor, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : (0, _styles.alpha)(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / ${theme.vars.palette.action.selectedOpacity})` : (0, _styles.alpha)(selectedColor, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, ownerState.size === 'small' && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === 'large' && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
const ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const _React$useContext = React.useContext(_ToggleButtonGroupContext.default),
    {
      value: contextValue
    } = _React$useContext,
    contextProps = (0, _objectWithoutPropertiesLoose2.default)(_React$useContext, _excluded);
  const toggleButtonGroupButtonContextPositionClassName = React.useContext(_ToggleButtonGroupButtonContext.default);
  const resolvedProps = (0, _resolveProps.default)((0, _extends2.default)({}, contextProps, {
    selected: (0, _isValueSelected.default)(inProps.value, contextValue)
  }), inProps);
  const props = (0, _useThemeProps.default)({
    props: resolvedProps,
    name: 'MuiToggleButton'
  });
  const {
      children,
      className,
      color = 'standard',
      disabled = false,
      disableFocusRipple = false,
      fullWidth = false,
      onChange,
      onClick,
      selected,
      size = 'medium',
      value
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const handleChange = event => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onChange) {
      onChange(event, value);
    }
  };
  const positionClassName = toggleButtonGroupButtonContextPositionClassName || '';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ToggleButtonRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(contextProps.className, classes.root, className, positionClassName),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    ownerState: ownerState,
    "aria-pressed": selected
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes /* remove-proptypes */ = {
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
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: _propTypes.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: _propTypes.default.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,
  /**
   * Callback fired when the state changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onClick: _propTypes.default.func,
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: _propTypes.default.bool,
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['small', 'medium', 'large']), _propTypes.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: _propTypes.default /* @typescript-to-proptypes-ignore */.any.isRequired
} : void 0;
var _default = exports.default = ToggleButton;