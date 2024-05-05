'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { isHostComponent } from '../utils/isHostComponent';
import { getInputUtilityClass } from './inputClasses';
import { useInput } from '../useInput';
import { useSlotProps } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    error = ownerState.error,
    focused = ownerState.focused,
    formControlContext = ownerState.formControlContext,
    multiline = ownerState.multiline,
    startAdornment = ownerState.startAdornment,
    endAdornment = ownerState.endAdornment;
  var slots = {
    root: ['root', disabled && 'disabled', error && 'error', focused && 'focused', Boolean(formControlContext) && 'formControl', multiline && 'multiline', Boolean(startAdornment) && 'adornedStart', Boolean(endAdornment) && 'adornedEnd'],
    input: ['input', disabled && 'disabled', multiline && 'multiline']
  };
  return composeClasses(slots, useClassNamesOverride(getInputUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base-ui/react-input/)
 *
 * API:
 *
 * - [Input API](https://mui.com/base-ui/react-input/components-api/#input)
 */
var Input = /*#__PURE__*/React.forwardRef(function Input(props, forwardedRef) {
  var _slots$root, _slots$textarea, _slots$input;
  var ariaDescribedby = props['aria-describedby'],
    ariaLabel = props['aria-label'],
    ariaLabelledby = props['aria-labelledby'],
    autoComplete = props.autoComplete,
    autoFocus = props.autoFocus,
    className = props.className,
    defaultValue = props.defaultValue,
    disabled = props.disabled,
    endAdornment = props.endAdornment,
    error = props.error,
    id = props.id,
    _props$multiline = props.multiline,
    multiline = _props$multiline === void 0 ? false : _props$multiline,
    name = props.name,
    onClick = props.onClick,
    onChange = props.onChange,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    placeholder = props.placeholder,
    readOnly = props.readOnly,
    required = props.required,
    startAdornment = props.startAdornment,
    value = props.value,
    typeProp = props.type,
    rows = props.rows,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    minRows = props.minRows,
    maxRows = props.maxRows,
    other = _objectWithoutProperties(props, ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "defaultValue", "disabled", "endAdornment", "error", "id", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "startAdornment", "value", "type", "rows", "slotProps", "slots", "minRows", "maxRows"]);
  var _useInput = useInput({
      disabled: disabled,
      defaultValue: defaultValue,
      error: error,
      onBlur: onBlur,
      onClick: onClick,
      onChange: onChange,
      onFocus: onFocus,
      required: required,
      value: value
    }),
    getRootProps = _useInput.getRootProps,
    getInputProps = _useInput.getInputProps,
    focused = _useInput.focused,
    formControlContext = _useInput.formControlContext,
    errorState = _useInput.error,
    disabledState = _useInput.disabled;
  var type = !multiline ? typeProp != null ? typeProp : 'text' : undefined;
  var ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused: focused,
    formControlContext: formControlContext,
    multiline: multiline,
    type: type
  });
  var classes = useUtilityClasses(ownerState);
  var propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    id: id,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    name: name,
    placeholder: placeholder,
    readOnly: readOnly,
    type: type
  };
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: [classes.root, className]
  });
  var InputComponent = multiline ? (_slots$textarea = slots.textarea) != null ? _slots$textarea : 'textarea' : (_slots$input = slots.input) != null ? _slots$input : 'input';
  var inputProps = useSlotProps({
    elementType: InputComponent,
    getSlotProps: function getSlotProps(otherHandlers) {
      return getInputProps(_extends({}, propsToForward, otherHandlers));
    },
    externalSlotProps: slotProps.input,
    additionalProps: _extends({
      rows: multiline ? rows : undefined
    }, multiline && !isHostComponent(InputComponent) && {
      minRows: rows || minRows,
      maxRows: rows || maxRows
    }),
    ownerState: ownerState,
    className: classes.input
  });
  if (process.env.NODE_ENV !== 'production') {
    if (multiline) {
      if (rows) {
        if (minRows || maxRows) {
          console.warn('MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.');
        }
      }
    }
  }
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [startAdornment, /*#__PURE__*/_jsx(InputComponent, _extends({}, inputProps)), endAdornment]
  }));
});
process.env.NODE_ENV !== "production" ? Input.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  'aria-labelledby': PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
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
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.object
  })]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.number,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes /* @typescript-to-proptypes-ignore */.oneOf(['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
export { Input };