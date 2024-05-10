'use client';

// @inheritedComponent ButtonBase
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveProps from '@mui/utils/resolveProps';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '../styles';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import toggleButtonClasses, { getToggleButtonUtilityClass } from './toggleButtonClasses';
import ToggleButtonGroupContext from '../ToggleButtonGroup/ToggleButtonGroupContext';
import ToggleButtonGroupButtonContext from '../ToggleButtonGroup/ToggleButtonGroupButtonContext';
import isValueSelected from '../ToggleButtonGroup/isValueSelected';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    fullWidth = ownerState.fullWidth,
    selected = ownerState.selected,
    disabled = ownerState.disabled,
    size = ownerState.size,
    color = ownerState.color;
  var slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', fullWidth && 'fullWidth', "size".concat(capitalize(size)), color]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};
var ToggleButtonRoot = styled(ButtonBase, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles["size".concat(capitalize(ownerState.size))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var selectedColor = ownerState.color === 'standard' ? theme.palette.text.primary : theme.palette[ownerState.color].main;
  var selectedColorChannel;
  if (theme.vars) {
    selectedColor = ownerState.color === 'standard' ? theme.vars.palette.text.primary : theme.vars.palette[ownerState.color].main;
    selectedColorChannel = ownerState.color === 'standard' ? theme.vars.palette.text.primaryChannel : theme.vars.palette[ownerState.color].mainChannel;
  }
  return _extends({}, theme.typography.button, {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 11,
    border: "1px solid ".concat((theme.vars || theme).palette.divider),
    color: (theme.vars || theme).palette.action.active
  }, ownerState.fullWidth && {
    width: '100%'
  }, _defineProperty(_defineProperty(_defineProperty({}, "&.".concat(toggleButtonClasses.disabled), {
    color: (theme.vars || theme).palette.action.disabled,
    border: "1px solid ".concat((theme.vars || theme).palette.action.disabledBackground)
  }), '&:hover', {
    textDecoration: 'none',
    // Reset on mouse devices
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.text.primaryChannel, " / ").concat(theme.vars.palette.action.hoverOpacity, ")") : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }), "&.".concat(toggleButtonClasses.selected), {
    color: selectedColor,
    backgroundColor: theme.vars ? "rgba(".concat(selectedColorChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(selectedColor, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: theme.vars ? "rgba(".concat(selectedColorChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.hoverOpacity, "))") : alpha(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.vars ? "rgba(".concat(selectedColorChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(selectedColor, theme.palette.action.selectedOpacity)
      }
    }
  }), ownerState.size === 'small' && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === 'large' && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  var _React$useContext = React.useContext(ToggleButtonGroupContext),
    contextValue = _React$useContext.value,
    contextProps = _objectWithoutProperties(_React$useContext, ["value"]);
  var toggleButtonGroupButtonContextPositionClassName = React.useContext(ToggleButtonGroupButtonContext);
  var resolvedProps = resolveProps(_extends({}, contextProps, {
    selected: isValueSelected(inProps.value, contextValue)
  }), inProps);
  var props = useThemeProps({
    props: resolvedProps,
    name: 'MuiToggleButton'
  });
  var children = props.children,
    className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'standard' : _props$color,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableFocusRi = props.disableFocusRipple,
    disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
    _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    onChange = props.onChange,
    onClick = props.onClick,
    selected = props.selected,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    value = props.value,
    other = _objectWithoutProperties(props, ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"]);
  var ownerState = _extends({}, props, {
    color: color,
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    fullWidth: fullWidth,
    size: size
  });
  var classes = useUtilityClasses(ownerState);
  var handleChange = function handleChange(event) {
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
  var positionClassName = toggleButtonGroupButtonContextPositionClassName || '';
  return /*#__PURE__*/_jsx(ToggleButtonRoot, _extends({
    className: clsx(contextProps.className, classes.root, className, positionClassName),
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
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the state changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes /* @typescript-to-proptypes-ignore */.any.isRequired
} : void 0;
export default ToggleButton;