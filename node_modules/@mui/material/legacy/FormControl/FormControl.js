'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { isFilled, isAdornedStart } from '../InputBase/utils';
import capitalize from '../utils/capitalize';
import isMuiElement from '../utils/isMuiElement';
import FormControlContext from './FormControlContext';
import { getFormControlUtilityClasses } from './formControlClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    margin = ownerState.margin,
    fullWidth = ownerState.fullWidth;
  var slots = {
    root: ['root', margin !== 'none' && "margin".concat(capitalize(margin)), fullWidth && 'fullWidth']
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled('div', {
  name: 'MuiFormControl',
  slot: 'Root',
  overridesResolver: function overridesResolver(_ref, styles) {
    var ownerState = _ref.ownerState;
    return _extends({}, styles.root, styles["margin".concat(capitalize(ownerState.margin))], ownerState.fullWidth && styles.fullWidth);
  }
})(function (_ref2) {
  var ownerState = _ref2.ownerState;
  return _extends({
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style.
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: 'top'
  }, ownerState.margin === 'normal' && {
    marginTop: 16,
    marginBottom: 8
  }, ownerState.margin === 'dense' && {
    marginTop: 8,
    marginBottom: 4
  }, ownerState.fullWidth && {
    width: '100%'
  });
});

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */
var FormControl = /*#__PURE__*/React.forwardRef(function FormControl(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormControl'
  });
  var children = props.children,
    className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'primary' : _props$color,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$error = props.error,
    error = _props$error === void 0 ? false : _props$error,
    visuallyFocused = props.focused,
    _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$hiddenLabel = props.hiddenLabel,
    hiddenLabel = _props$hiddenLabel === void 0 ? false : _props$hiddenLabel,
    _props$margin = props.margin,
    margin = _props$margin === void 0 ? 'none' : _props$margin,
    _props$required = props.required,
    required = _props$required === void 0 ? false : _props$required,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'outlined' : _props$variant,
    other = _objectWithoutProperties(props, ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"]);
  var ownerState = _extends({}, props, {
    color: color,
    component: component,
    disabled: disabled,
    error: error,
    fullWidth: fullWidth,
    hiddenLabel: hiddenLabel,
    margin: margin,
    required: required,
    size: size,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  var _React$useState = React.useState(function () {
      // We need to iterate through the children and find the Input in order
      // to fully support server-side rendering.
      var initialAdornedStart = false;
      if (children) {
        React.Children.forEach(children, function (child) {
          if (!isMuiElement(child, ['Input', 'Select'])) {
            return;
          }
          var input = isMuiElement(child, ['Select']) ? child.props.input : child;
          if (input && isAdornedStart(input.props)) {
            initialAdornedStart = true;
          }
        });
      }
      return initialAdornedStart;
    }),
    adornedStart = _React$useState[0],
    setAdornedStart = _React$useState[1];
  var _React$useState2 = React.useState(function () {
      // We need to iterate through the children and find the Input in order
      // to fully support server-side rendering.
      var initialFilled = false;
      if (children) {
        React.Children.forEach(children, function (child) {
          if (!isMuiElement(child, ['Input', 'Select'])) {
            return;
          }
          if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) {
            initialFilled = true;
          }
        });
      }
      return initialFilled;
    }),
    filled = _React$useState2[0],
    setFilled = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    focusedState = _React$useState3[0],
    setFocused = _React$useState3[1];
  if (disabled && focusedState) {
    setFocused(false);
  }
  var focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;
  var registerEffect;
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var registeredInput = React.useRef(false);
    registerEffect = function registerEffect() {
      if (registeredInput.current) {
        console.error(['MUI: There are multiple `InputBase` components inside a FormControl.', 'This creates visual inconsistencies, only use one `InputBase`.'].join('\n'));
      }
      registeredInput.current = true;
      return function () {
        registeredInput.current = false;
      };
    };
  }
  var childContext = React.useMemo(function () {
    return {
      adornedStart: adornedStart,
      setAdornedStart: setAdornedStart,
      color: color,
      disabled: disabled,
      error: error,
      filled: filled,
      focused: focused,
      fullWidth: fullWidth,
      hiddenLabel: hiddenLabel,
      size: size,
      onBlur: function onBlur() {
        setFocused(false);
      },
      onEmpty: function onEmpty() {
        setFilled(false);
      },
      onFilled: function onFilled() {
        setFilled(true);
      },
      onFocus: function onFocus() {
        setFocused(true);
      },
      registerEffect: registerEffect,
      required: required,
      variant: variant
    };
  }, [adornedStart, color, disabled, error, filled, focused, fullWidth, hiddenLabel, registerEffect, required, size, variant]);
  return /*#__PURE__*/_jsx(FormControlContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsx(FormControlRoot, _extends({
      as: component,
      ownerState: ownerState,
      className: clsx(classes.root, className),
      ref: ref
    }, other, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? FormControl.propTypes /* remove-proptypes */ = {
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
export default FormControl;