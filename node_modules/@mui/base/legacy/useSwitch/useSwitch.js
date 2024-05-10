'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { unstable_useControlled as useControlled, unstable_useForkRef as useForkRef, unstable_useIsFocusVisible as useIsFocusVisible } from '@mui/utils';
/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switch](https://mui.com/base-ui/react-switch/#hook)
 *
 * API:
 *
 * - [useSwitch API](https://mui.com/base-ui/react-switch/hooks-api/#use-switch)
 */
export function useSwitch(props) {
  var checkedProp = props.checked,
    defaultChecked = props.defaultChecked,
    disabled = props.disabled,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    onFocusVisible = props.onFocusVisible,
    readOnly = props.readOnly,
    required = props.required;
  var _useControlled = useControlled({
      controlled: checkedProp,
      default: Boolean(defaultChecked),
      name: 'Switch',
      state: 'checked'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    checked = _useControlled2[0],
    setCheckedState = _useControlled2[1];
  var createHandleInputChange = function createHandleInputChange(otherProps) {
    return function (event) {
      var _otherProps$onChange;
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      setCheckedState(event.target.checked);
      onChange == null || onChange(event);
      (_otherProps$onChange = otherProps.onChange) == null || _otherProps$onChange.call(otherProps, event);
    };
  };
  var _useIsFocusVisible = useIsFocusVisible(),
    isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
    handleBlurVisible = _useIsFocusVisible.onBlur,
    handleFocusVisible = _useIsFocusVisible.onFocus,
    focusVisibleRef = _useIsFocusVisible.ref;
  var _React$useState = React.useState(false),
    focusVisible = _React$useState[0],
    setFocusVisible = _React$useState[1];
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React.useEffect(function () {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  var inputRef = React.useRef(null);
  var createHandleFocus = function createHandleFocus(otherProps) {
    return function (event) {
      var _otherProps$onFocus;
      // Fix for https://github.com/facebook/react/issues/7769
      if (!inputRef.current) {
        inputRef.current = event.currentTarget;
      }
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        onFocusVisible == null || onFocusVisible(event);
      }
      onFocus == null || onFocus(event);
      (_otherProps$onFocus = otherProps.onFocus) == null || _otherProps$onFocus.call(otherProps, event);
    };
  };
  var createHandleBlur = function createHandleBlur(otherProps) {
    return function (event) {
      var _otherProps$onBlur;
      handleBlurVisible(event);
      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }
      onBlur == null || onBlur(event);
      (_otherProps$onBlur = otherProps.onBlur) == null || _otherProps$onBlur.call(otherProps, event);
    };
  };
  var handleInputRef = useForkRef(focusVisibleRef, inputRef);
  var getInputProps = function getInputProps() {
    var otherProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({
      checked: checkedProp,
      defaultChecked: defaultChecked,
      disabled: disabled,
      readOnly: readOnly,
      ref: handleInputRef,
      required: required,
      type: 'checkbox',
      role: 'switch',
      'aria-checked': checkedProp
    }, otherProps, {
      onChange: createHandleInputChange(otherProps),
      onFocus: createHandleFocus(otherProps),
      onBlur: createHandleBlur(otherProps)
    });
  };
  return {
    checked: checked,
    disabled: Boolean(disabled),
    focusVisible: focusVisible,
    getInputProps: getInputProps,
    inputRef: handleInputRef,
    readOnly: Boolean(readOnly)
  };
}