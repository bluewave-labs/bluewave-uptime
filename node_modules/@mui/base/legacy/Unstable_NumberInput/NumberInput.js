'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { getNumberInputUtilityClass } from './numberInputClasses';
import { unstable_useNumberInput as useNumberInput } from '../unstable_useNumberInput';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    error = ownerState.error,
    focused = ownerState.focused,
    readOnly = ownerState.readOnly,
    formControlContext = ownerState.formControlContext,
    isIncrementDisabled = ownerState.isIncrementDisabled,
    isDecrementDisabled = ownerState.isDecrementDisabled,
    startAdornment = ownerState.startAdornment,
    endAdornment = ownerState.endAdornment;
  var slots = {
    root: ['root', disabled && 'disabled', error && 'error', focused && 'focused', readOnly && 'readOnly', Boolean(formControlContext) && 'formControl', Boolean(startAdornment) && 'adornedStart', Boolean(endAdornment) && 'adornedEnd'],
    input: ['input', disabled && 'disabled', readOnly && 'readOnly'],
    incrementButton: ['incrementButton', isIncrementDisabled && 'disabled'],
    decrementButton: ['decrementButton', isDecrementDisabled && 'disabled']
  };
  return composeClasses(slots, useClassNamesOverride(getNumberInputUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Number Input](https://mui.com/base-ui/react-number-input/)
 *
 * API:
 *
 * - [NumberInput API](https://mui.com/base-ui/react-number-input/components-api/#number-input)
 */
var NumberInput = /*#__PURE__*/React.forwardRef(function NumberInput(props, forwardedRef) {
  var _slots$root, _slots$input, _slots$incrementButto, _slots$decrementButto;
  var className = props.className,
    defaultValue = props.defaultValue,
    disabled = props.disabled,
    endAdornment = props.endAdornment,
    error = props.error,
    id = props.id,
    max = props.max,
    min = props.min,
    onBlur = props.onBlur,
    onInputChange = props.onInputChange,
    onFocus = props.onFocus,
    onChange = props.onChange,
    placeholder = props.placeholder,
    required = props.required,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
    shiftMultiplier = props.shiftMultiplier,
    startAdornment = props.startAdornment,
    step = props.step,
    value = props.value,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    rest = _objectWithoutProperties(props, ["className", "defaultValue", "disabled", "endAdornment", "error", "id", "max", "min", "onBlur", "onInputChange", "onFocus", "onChange", "placeholder", "required", "readOnly", "shiftMultiplier", "startAdornment", "step", "value", "slotProps", "slots"]);
  var _useNumberInput = useNumberInput({
      min: min,
      max: max,
      step: step,
      shiftMultiplier: shiftMultiplier,
      defaultValue: defaultValue,
      disabled: disabled,
      error: error,
      onFocus: onFocus,
      onInputChange: onInputChange,
      onBlur: onBlur,
      onChange: onChange,
      required: required,
      readOnly: readOnly,
      value: value,
      inputId: id,
      componentName: 'NumberInput'
    }),
    getRootProps = _useNumberInput.getRootProps,
    getInputProps = _useNumberInput.getInputProps,
    getIncrementButtonProps = _useNumberInput.getIncrementButtonProps,
    getDecrementButtonProps = _useNumberInput.getDecrementButtonProps,
    focused = _useNumberInput.focused,
    errorState = _useNumberInput.error,
    disabledState = _useNumberInput.disabled,
    formControlContext = _useNumberInput.formControlContext,
    isIncrementDisabled = _useNumberInput.isIncrementDisabled,
    isDecrementDisabled = _useNumberInput.isDecrementDisabled;
  var ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused: focused,
    readOnly: readOnly,
    formControlContext: formControlContext,
    isIncrementDisabled: isIncrementDisabled,
    isDecrementDisabled: isDecrementDisabled
  });
  var classes = useUtilityClasses(ownerState);
  var propsForwardedToInputSlot = {
    placeholder: placeholder
  };
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: rest,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: [classes.root, className]
  });
  var Input = (_slots$input = slots.input) != null ? _slots$input : 'input';
  var inputProps = useSlotProps({
    elementType: Input,
    getSlotProps: function getSlotProps(otherHandlers) {
      return getInputProps(_extends({}, propsForwardedToInputSlot, otherHandlers));
    },
    externalSlotProps: slotProps.input,
    ownerState: ownerState,
    className: classes.input
  });
  var IncrementButton = (_slots$incrementButto = slots.incrementButton) != null ? _slots$incrementButto : 'button';
  var incrementButtonProps = useSlotProps({
    elementType: IncrementButton,
    getSlotProps: getIncrementButtonProps,
    externalSlotProps: slotProps.incrementButton,
    ownerState: ownerState,
    className: classes.incrementButton
  });
  var DecrementButton = (_slots$decrementButto = slots.decrementButton) != null ? _slots$decrementButto : 'button';
  var decrementButtonProps = useSlotProps({
    elementType: DecrementButton,
    getSlotProps: getDecrementButtonProps,
    externalSlotProps: slotProps.decrementButton,
    ownerState: ownerState,
    className: classes.decrementButton
  });
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [/*#__PURE__*/_jsx(DecrementButton, _extends({}, decrementButtonProps)), /*#__PURE__*/_jsx(IncrementButton, _extends({}, incrementButtonProps)), startAdornment, /*#__PURE__*/_jsx(Input, _extends({}, inputProps)), endAdornment]
  }));
});
process.env.NODE_ENV !== "production" ? NumberInput.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.number,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The maximum value.
   */
  max: PropTypes.number,
  /**
   * The minimum value.
   */
  min: PropTypes.number,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired after the value is clamped and changes - when the `input` is blurred or when
   * the stepper buttons are triggered.
   * Called with `undefined` when the value is unset.
   *
   * @param {React.FocusEvent<HTMLInputElement>|React.PointerEvent|React.KeyboardEvent} event The event source of the callback
   * @param {number|undefined} value The new value of the component
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the `input` value changes after each keypress, before clamping is applied.
   * Note that `event.target.value` may contain values that fall outside of `min` and `max` or
   * are otherwise "invalid".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   */
  onInputChange: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the `input` element becomes read-only. The stepper buttons remain active,
   * with the addition that they are now keyboard focusable.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Multiplier applied to `step` if the shift key is held while incrementing
   * or decrementing the value. Defaults to `10`.
   */
  shiftMultiplier: PropTypes.number,
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: PropTypes.shape({
    decrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    incrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    decrementButton: PropTypes.elementType,
    incrementButton: PropTypes.elementType,
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,
  /**
   * The amount that the value changes on each increment or decrement.
   */
  step: PropTypes.number,
  /**
   * The current value. Use when the component is controlled.
   * @default null
   */
  value: PropTypes.number
} : void 0;
export { NumberInput };