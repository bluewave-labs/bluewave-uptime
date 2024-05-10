'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _formatMuiErrorMessage from "@mui/utils/formatMuiErrorMessage";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useControllableReducer } from '../utils/useControllableReducer';
import { useFormControlContext } from '../FormControl';
import { NumberInputActionTypes } from './numberInputAction.types';
import { numberInputReducer } from './numberInputReducer';
import { isNumber } from './utils';
var STEP_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];
var SUPPORTED_KEYS = [].concat(STEP_KEYS, ['Home', 'End']);
export function getInputValueAsString(v) {
  return v ? String(v.trim()) : String(v);
}

/**
 *
 * Demos:
 *
 * - [Number Input](https://mui.com/base-ui/react-number-input/#hook)
 *
 * API:
 *
 * - [useNumberInput API](https://mui.com/base-ui/react-number-input/hooks-api/#use-number-input)
 */
export function useNumberInput(parameters) {
  var _ref;
  var min = parameters.min,
    max = parameters.max,
    step = parameters.step,
    _parameters$shiftMult = parameters.shiftMultiplier,
    shiftMultiplier = _parameters$shiftMult === void 0 ? 10 : _parameters$shiftMult,
    defaultValueProp = parameters.defaultValue,
    _parameters$disabled = parameters.disabled,
    disabledProp = _parameters$disabled === void 0 ? false : _parameters$disabled,
    _parameters$error = parameters.error,
    errorProp = _parameters$error === void 0 ? false : _parameters$error,
    onBlur = parameters.onBlur,
    onInputChange = parameters.onInputChange,
    onFocus = parameters.onFocus,
    onChange = parameters.onChange,
    _parameters$required = parameters.required,
    requiredProp = _parameters$required === void 0 ? false : _parameters$required,
    _parameters$readOnly = parameters.readOnly,
    readOnlyProp = _parameters$readOnly === void 0 ? false : _parameters$readOnly,
    valueProp = parameters.value,
    inputRefProp = parameters.inputRef,
    inputIdProp = parameters.inputId,
    _parameters$component = parameters.componentName,
    componentName = _parameters$component === void 0 ? 'useNumberInput' : _parameters$component; // TODO: make it work with FormControl
  var formControlContext = useFormControlContext();
  var _React$useRef = React.useRef(valueProp != null),
    isControlled = _React$useRef.current;
  var handleInputRefWarning = React.useCallback(function (instance) {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(['MUI: You have provided a `slots.input` to the input component', 'that does not correctly handle the `ref` prop.', 'Make sure the `ref` prop is called with a HTMLInputElement.'].join('\n'));
      }
    }
  }, []);
  var inputRef = React.useRef(null);
  var handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  var inputId = useId(inputIdProp);
  var _React$useState = React.useState(false),
    focused = _React$useState[0],
    setFocused = _React$useState[1];
  var handleStateChange = React.useCallback(function (event, field, fieldValue, reason) {
    if (field === 'value' && typeof fieldValue !== 'string') {
      switch (reason) {
        // only a blur event will dispatch `numberInput:clamp`
        case 'numberInput:clamp':
          onChange == null || onChange(event, fieldValue);
          break;
        case 'numberInput:increment':
        case 'numberInput:decrement':
        case 'numberInput:incrementToMax':
        case 'numberInput:decrementToMin':
          onChange == null || onChange(event, fieldValue);
          break;
        default:
          break;
      }
    }
  }, [onChange]);
  var numberInputActionContext = React.useMemo(function () {
    return {
      min: min,
      max: max,
      step: step,
      shiftMultiplier: shiftMultiplier,
      getInputValueAsString: getInputValueAsString
    };
  }, [min, max, step, shiftMultiplier]);
  var initialValue = (_ref = valueProp != null ? valueProp : defaultValueProp) != null ? _ref : null;
  var initialState = {
    value: initialValue,
    inputValue: initialValue ? String(initialValue) : ''
  };
  var controlledState = React.useMemo(function () {
    return {
      value: valueProp
    };
  }, [valueProp]);
  var _useControllableReduc = useControllableReducer({
      reducer: numberInputReducer,
      controlledProps: controlledState,
      initialState: initialState,
      onStateChange: handleStateChange,
      actionContext: React.useMemo(function () {
        return numberInputActionContext;
      }, [numberInputActionContext]),
      componentName: componentName
    }),
    _useControllableReduc2 = _slicedToArray(_useControllableReduc, 2),
    state = _useControllableReduc2[0],
    dispatch = _useControllableReduc2[1];
  var value = state.value,
    inputValue = state.inputValue;
  React.useEffect(function () {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);
      onBlur == null || onBlur();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);
  React.useEffect(function () {
    if (isControlled && isNumber(value)) {
      dispatch({
        type: NumberInputActionTypes.resetInputValue
      });
    }
  }, [value, dispatch, isControlled]);
  var createHandleFocus = function createHandleFocus(otherHandlers) {
    return function (event) {
      var _otherHandlers$onFocu;
      (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      if (formControlContext && formControlContext.onFocus) {
        var _formControlContext$o;
        formControlContext == null || (_formControlContext$o = formControlContext.onFocus) == null || _formControlContext$o.call(formControlContext);
      }
      setFocused(true);
    };
  };
  var createHandleInputChange = function createHandleInputChange(otherHandlers) {
    return function (event) {
      var _formControlContext$o2, _otherHandlers$onInpu;
      if (!isControlled && event.target === null) {
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `slots.input` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : _formatMuiErrorMessage(17));
      }
      formControlContext == null || (_formControlContext$o2 = formControlContext.onChange) == null || _formControlContext$o2.call(formControlContext, event);
      (_otherHandlers$onInpu = otherHandlers.onInputChange) == null || _otherHandlers$onInpu.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      dispatch({
        type: NumberInputActionTypes.inputChange,
        event: event,
        inputValue: event.currentTarget.value
      });
    };
  };
  var createHandleBlur = function createHandleBlur(otherHandlers) {
    return function (event) {
      var _otherHandlers$onBlur;
      formControlContext == null || formControlContext.onBlur();
      (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      dispatch({
        type: NumberInputActionTypes.clamp,
        event: event,
        inputValue: event.currentTarget.value
      });
      setFocused(false);
    };
  };
  var createHandleClick = function createHandleClick(otherHandlers) {
    return function (event) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }
    };
  };
  var handleStep = function handleStep(direction) {
    return function (event) {
      var applyMultiplier = Boolean(event.shiftKey);
      var actionType = {
        up: NumberInputActionTypes.increment,
        down: NumberInputActionTypes.decrement
      }[direction];
      dispatch({
        type: actionType,
        event: event,
        applyMultiplier: applyMultiplier
      });
    };
  };
  var createHandleKeyDown = function createHandleKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      // this prevents unintended page scrolling
      if (SUPPORTED_KEYS.includes(event.key)) {
        event.preventDefault();
      }
      switch (event.key) {
        case 'ArrowUp':
          dispatch({
            type: NumberInputActionTypes.increment,
            event: event,
            applyMultiplier: !!event.shiftKey
          });
          break;
        case 'ArrowDown':
          dispatch({
            type: NumberInputActionTypes.decrement,
            event: event,
            applyMultiplier: !!event.shiftKey
          });
          break;
        case 'PageUp':
          dispatch({
            type: NumberInputActionTypes.increment,
            event: event,
            applyMultiplier: true
          });
          break;
        case 'PageDown':
          dispatch({
            type: NumberInputActionTypes.decrement,
            event: event,
            applyMultiplier: true
          });
          break;
        case 'Home':
          dispatch({
            type: NumberInputActionTypes.incrementToMax,
            event: event
          });
          break;
        case 'End':
          dispatch({
            type: NumberInputActionTypes.decrementToMin,
            event: event
          });
          break;
        default:
          break;
      }
    };
  };
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var propsEventHandlers = extractEventHandlers(parameters, [
    // these are handled by the input slot
    'onBlur', 'onInputChange', 'onFocus', 'onChange']);
    var externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: createHandleClick(externalEventHandlers)
    });
  };
  var getInputProps = function getInputProps() {
    var _ref2;
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var propsEventHandlers = {
      onBlur: onBlur,
      onFocus: onFocus,
      // onChange from normal props is the custom onChange so we ignore it here
      onChange: onInputChange
    };
    var externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps, [
    // onClick is handled by the root slot
    'onClick'
    // do not ignore 'onInputChange', we want slotProps.input.onInputChange to enter the DOM and throw
    ]));
    var mergedEventHandlers = _extends({}, externalEventHandlers, {
      onFocus: createHandleFocus(externalEventHandlers),
      // slotProps.onChange is renamed to onInputChange and passed to createHandleInputChange
      onChange: createHandleInputChange(_extends({}, externalEventHandlers, {
        onInputChange: externalEventHandlers.onChange
      })),
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
    var displayValue = (_ref2 = focused ? inputValue : value) != null ? _ref2 : '';

    // get rid of slotProps.input.onInputChange before returning to prevent it from entering the DOM
    // if it was passed, it will be in mergedEventHandlers and throw
    delete externalProps.onInputChange;
    return _extends({
      type: 'text',
      id: inputId,
      'aria-invalid': errorProp || undefined,
      defaultValue: undefined,
      value: displayValue,
      'aria-valuenow': displayValue,
      'aria-valuetext': String(displayValue),
      'aria-valuemin': min,
      'aria-valuemax': max,
      autoComplete: 'off',
      autoCorrect: 'off',
      spellCheck: 'false',
      required: requiredProp,
      readOnly: readOnlyProp,
      'aria-disabled': disabledProp,
      disabled: disabledProp
    }, externalProps, {
      ref: handleInputRef
    }, mergedEventHandlers);
  };
  var handleStepperButtonMouseDown = function handleStepperButtonMouseDown(event) {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  var stepperButtonCommonProps = {
    'aria-controls': inputId,
    tabIndex: -1
  };
  var isIncrementDisabled = disabledProp || (isNumber(value) ? value >= (max != null ? max : Number.MAX_SAFE_INTEGER) : false);
  var getIncrementButtonProps = function getIncrementButtonProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isIncrementDisabled,
      'aria-disabled': isIncrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep('up')
    });
  };
  var isDecrementDisabled = disabledProp || (isNumber(value) ? value <= (min != null ? min : Number.MIN_SAFE_INTEGER) : false);
  var getDecrementButtonProps = function getDecrementButtonProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isDecrementDisabled,
      'aria-disabled': isDecrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep('down')
    });
  };
  return {
    disabled: disabledProp,
    error: errorProp,
    focused: focused,
    formControlContext: formControlContext,
    getInputProps: getInputProps,
    getIncrementButtonProps: getIncrementButtonProps,
    getDecrementButtonProps: getDecrementButtonProps,
    getRootProps: getRootProps,
    required: requiredProp,
    value: value,
    inputValue: inputValue,
    isIncrementDisabled: isIncrementDisabled,
    isDecrementDisabled: isDecrementDisabled
  };
}