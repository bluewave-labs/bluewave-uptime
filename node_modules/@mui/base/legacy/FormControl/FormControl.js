'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import useControlled from '@mui/utils/useControlled';
import { FormControlContext } from './FormControlContext';
import { getFormControlUtilityClass } from './formControlClasses';
import { useSlotProps } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== '';
}
function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    error = ownerState.error,
    filled = ownerState.filled,
    focused = ownerState.focused,
    required = ownerState.required;
  var slots = {
    root: ['root', disabled && 'disabled', focused && 'focused', error && 'error', filled && 'filled', required && 'required']
  };
  return composeClasses(slots, useClassNamesOverride(getFormControlUtilityClass));
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * *   FormLabel
 * *   FormHelperText
 * *   Input
 * *   InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://mui.com/material-ui/react-text-field/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `Input` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 *
 * Demos:
 *
 * - [Form Control](https://mui.com/base-ui/react-form-control/)
 * - [Input](https://mui.com/joy-ui/react-input/)
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormControl API](https://mui.com/base-ui/react-form-control/components-api/#form-control)
 */
var FormControl = /*#__PURE__*/React.forwardRef(function FormControl(props, forwardedRef) {
  var _slots$root;
  var defaultValue = props.defaultValue,
    children = props.children,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$error = props.error,
    error = _props$error === void 0 ? false : _props$error,
    _onChange = props.onChange,
    _props$required = props.required,
    required = _props$required === void 0 ? false : _props$required,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    incomingValue = props.value,
    other = _objectWithoutProperties(props, ["defaultValue", "children", "disabled", "error", "onChange", "required", "slotProps", "slots", "value"]);
  var _useControlled = useControlled({
      controlled: incomingValue,
      default: defaultValue,
      name: 'FormControl',
      state: 'value'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    value = _useControlled2[0],
    setValue = _useControlled2[1];
  var filled = hasValue(value);
  var _React$useState = React.useState(false),
    focusedState = _React$useState[0],
    setFocused = _React$useState[1];
  var focused = focusedState && !disabled;
  React.useEffect(function () {
    return setFocused(function (isFocused) {
      return disabled ? false : isFocused;
    });
  }, [disabled]);
  var ownerState = _extends({}, props, {
    disabled: disabled,
    error: error,
    filled: filled,
    focused: focused,
    required: required
  });
  var childContext = React.useMemo(function () {
    return {
      disabled: disabled,
      error: error,
      filled: filled,
      focused: focused,
      onBlur: function onBlur() {
        setFocused(false);
      },
      onChange: function onChange(event) {
        setValue(event.target.value);
        _onChange == null || _onChange(event);
      },
      onFocus: function onFocus() {
        setFocused(true);
      },
      required: required,
      value: value != null ? value : ''
    };
  }, [disabled, error, filled, focused, _onChange, required, setValue, value]);
  var classes = useUtilityClasses(ownerState);
  var renderChildren = function renderChildren() {
    if (typeof children === 'function') {
      return children(childContext);
    }
    return children;
  };
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      children: renderChildren()
    },
    ownerState: ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(FormControlContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsx(Root, _extends({}, rootProps))
  });
});
process.env.NODE_ENV !== "production" ? FormControl.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultValue: PropTypes.any,
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
   * Callback fired when the form element's value is modified.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the FormControl.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The value of the form element.
   */
  value: PropTypes.any
} : void 0;
export { FormControl };