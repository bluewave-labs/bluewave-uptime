'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import { unstable_ownerDocument as ownerDocument, unstable_useControlled as useControlled, unstable_useEnhancedEffect as useEnhancedEffect, unstable_useEventCallback as useEventCallback, unstable_useForkRef as useForkRef, unstable_useIsFocusVisible as useIsFocusVisible, visuallyHidden, clamp } from '@mui/utils';
import { areArraysEqual, extractEventHandlers } from '../utils';
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function asc(a, b) {
  return a - b;
}
function findClosest(values, currentValue) {
  var _values$reduce;
  var _ref = (_values$reduce = values.reduce(function (acc, value, index) {
      var distance = Math.abs(currentValue - value);
      if (acc === null || distance < acc.distance || distance === acc.distance) {
        return {
          distance: distance,
          index: index
        };
      }
      return acc;
    }, null)) != null ? _values$reduce : {},
    closestIndex = _ref.index;
  return closestIndex;
}
function trackFinger(event, touchId) {
  // The event is TouchEvent
  if (touchId.current !== undefined && event.changedTouches) {
    var touchEvent = event;
    for (var i = 0; i < touchEvent.changedTouches.length; i += 1) {
      var touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }

  // The event is MouseEvent
  return {
    x: event.clientX,
    y: event.clientY
  };
}
export function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}
function getDecimalPrecision(num) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    var parts = num.toExponential().split('e-');
    var matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  var decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
  var nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex(_ref2) {
  var values = _ref2.values,
    newValue = _ref2.newValue,
    index = _ref2.index;
  var output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb(_ref3) {
  var _sliderRef$current, _doc$activeElement;
  var sliderRef = _ref3.sliderRef,
    activeIndex = _ref3.activeIndex,
    setActive = _ref3.setActive;
  var doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null || (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute('data-index')) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null || _sliderRef$current2.querySelector("[type=\"range\"][data-index=\"".concat(activeIndex, "\"]")).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === 'number' && typeof oldValue === 'number') {
    return newValue === oldValue;
  }
  if (_typeof(newValue) === 'object' && _typeof(oldValue) === 'object') {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}
var axisProps = {
  horizontal: {
    offset: function offset(percent) {
      return {
        left: "".concat(percent, "%")
      };
    },
    leap: function leap(percent) {
      return {
        width: "".concat(percent, "%")
      };
    }
  },
  'horizontal-reverse': {
    offset: function offset(percent) {
      return {
        right: "".concat(percent, "%")
      };
    },
    leap: function leap(percent) {
      return {
        width: "".concat(percent, "%")
      };
    }
  },
  vertical: {
    offset: function offset(percent) {
      return {
        bottom: "".concat(percent, "%")
      };
    },
    leap: function leap(percent) {
      return {
        height: "".concat(percent, "%")
      };
    }
  }
};
export var Identity = function Identity(x) {
  return x;
};

// TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported
var cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/base-ui/react-slider/#hook)
 *
 * API:
 *
 * - [useSlider API](https://mui.com/base-ui/react-slider/hooks-api/#use-slider)
 */
export function useSlider(parameters) {
  var ariaLabelledby = parameters['aria-labelledby'],
    defaultValue = parameters.defaultValue,
    _parameters$disabled = parameters.disabled,
    disabled = _parameters$disabled === void 0 ? false : _parameters$disabled,
    _parameters$disableSw = parameters.disableSwap,
    disableSwap = _parameters$disableSw === void 0 ? false : _parameters$disableSw,
    _parameters$isRtl = parameters.isRtl,
    isRtl = _parameters$isRtl === void 0 ? false : _parameters$isRtl,
    _parameters$marks = parameters.marks,
    marksProp = _parameters$marks === void 0 ? false : _parameters$marks,
    _parameters$max = parameters.max,
    max = _parameters$max === void 0 ? 100 : _parameters$max,
    _parameters$min = parameters.min,
    min = _parameters$min === void 0 ? 0 : _parameters$min,
    name = parameters.name,
    onChange = parameters.onChange,
    onChangeCommitted = parameters.onChangeCommitted,
    _parameters$orientati = parameters.orientation,
    orientation = _parameters$orientati === void 0 ? 'horizontal' : _parameters$orientati,
    ref = parameters.rootRef,
    _parameters$scale = parameters.scale,
    scale = _parameters$scale === void 0 ? Identity : _parameters$scale,
    _parameters$step = parameters.step,
    step = _parameters$step === void 0 ? 1 : _parameters$step,
    _parameters$shiftStep = parameters.shiftStep,
    shiftStep = _parameters$shiftStep === void 0 ? 10 : _parameters$shiftStep,
    tabIndex = parameters.tabIndex,
    valueProp = parameters.value;
  var touchId = React.useRef();
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.
  var _React$useState = React.useState(-1),
    active = _React$useState[0],
    setActive = _React$useState[1];
  var _React$useState2 = React.useState(-1),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    dragging = _React$useState3[0],
    setDragging = _React$useState3[1];
  var moveCount = React.useRef(0);
  var _useControlled = useControlled({
      controlled: valueProp,
      default: defaultValue != null ? defaultValue : min,
      name: 'Slider'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    valueDerived = _useControlled2[0],
    setValueState = _useControlled2[1];
  var handleChange = onChange && function (event, value, thumbIndex) {
    // Redefine target to allow name and value to be read.
    // This allows seamless integration with the most popular form libraries.
    // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
    // Clone the event to not override `target` of the original event.
    var nativeEvent = event.nativeEvent || event;
    // @ts-ignore The nativeEvent is function, not object
    var clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, 'target', {
      writable: true,
      value: {
        value: value,
        name: name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  };
  var range = Array.isArray(valueDerived);
  var values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map(function (value) {
    return value == null ? min : clamp(value, min, max);
  });
  var marks = marksProp === true && step !== null ? _toConsumableArray(Array(Math.floor((max - min) / step) + 1)).map(function (_, index) {
    return {
      value: min + step * index
    };
  }) : marksProp || [];
  var marksValues = marks.map(function (mark) {
    return mark.value;
  });
  var _useIsFocusVisible = useIsFocusVisible(),
    isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
    handleBlurVisible = _useIsFocusVisible.onBlur,
    handleFocusVisible = _useIsFocusVisible.onFocus,
    focusVisibleRef = _useIsFocusVisible.ref;
  var _React$useState4 = React.useState(-1),
    focusedThumbIndex = _React$useState4[0],
    setFocusedThumbIndex = _React$useState4[1];
  var sliderRef = React.useRef();
  var handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  var handleRef = useForkRef(ref, handleFocusRef);
  var createHandleHiddenInputFocus = function createHandleHiddenInputFocus(otherHandlers) {
    return function (event) {
      var _otherHandlers$onFocu;
      var index = Number(event.currentTarget.getAttribute('data-index'));
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusedThumbIndex(index);
      }
      setOpen(index);
      otherHandlers == null || (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
    };
  };
  var createHandleHiddenInputBlur = function createHandleHiddenInputBlur(otherHandlers) {
    return function (event) {
      var _otherHandlers$onBlur;
      handleBlurVisible(event);
      if (isFocusVisibleRef.current === false) {
        setFocusedThumbIndex(-1);
      }
      setOpen(-1);
      otherHandlers == null || (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    };
  };
  var changeValue = function changeValue(event, valueInput) {
    var index = Number(event.currentTarget.getAttribute('data-index'));
    var value = values[index];
    var marksIndex = marksValues.indexOf(value);
    var newValue = valueInput;
    if (marks && step == null) {
      var maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue > maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue < marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }
    newValue = clamp(newValue, min, max);
    if (range) {
      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }
      var previousValue = newValue;
      newValue = setValueIndex({
        values: values,
        newValue: newValue,
        index: index
      });
      var activeIndex = index;

      // Potentially swap the index if needed.
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef: sliderRef,
        activeIndex: activeIndex
      });
    }
    setValueState(newValue);
    setFocusedThumbIndex(index);
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  var createHandleHiddenInputKeyDown = function createHandleHiddenInputKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      // The Shift + Up/Down keyboard shortcuts for moving the slider makes sense to be supported
      // only if the step is defined. If the step is null, this means tha the marks are used for specifying the valid values.
      if (step !== null) {
        var index = Number(event.currentTarget.getAttribute('data-index'));
        var value = values[index];
        var newValue = null;
        if ((event.key === 'ArrowLeft' || event.key === 'ArrowDown') && event.shiftKey || event.key === 'PageDown') {
          newValue = Math.max(value - shiftStep, min);
        } else if ((event.key === 'ArrowRight' || event.key === 'ArrowUp') && event.shiftKey || event.key === 'PageUp') {
          newValue = Math.min(value + shiftStep, max);
        }
        if (newValue !== null) {
          changeValue(event, newValue);
          event.preventDefault();
        }
      }
      otherHandlers == null || (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    };
  };
  useEnhancedEffect(function () {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/p/sandbox/mui-pr-22247-forked-h151h?file=/src/App.js
      // @ts-ignore
      (_document$activeEleme = document.activeElement) == null || _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }
  var createHandleHiddenInputChange = function createHandleHiddenInputChange(otherHandlers) {
    return function (event) {
      var _otherHandlers$onChan;
      (_otherHandlers$onChan = otherHandlers.onChange) == null || _otherHandlers$onChan.call(otherHandlers, event);
      // @ts-ignore
      changeValue(event, event.target.valueAsNumber);
    };
  };
  var previousIndex = React.useRef();
  var axis = orientation;
  if (isRtl && orientation === 'horizontal') {
    axis += '-reverse';
  }
  var getFingerNewValue = function getFingerNewValue(_ref4) {
    var finger = _ref4.finger,
      _ref4$move = _ref4.move,
      move = _ref4$move === void 0 ? false : _ref4$move;
    var slider = sliderRef.current;
    var _getBoundingClientRec = slider.getBoundingClientRect(),
      width = _getBoundingClientRec.width,
      height = _getBoundingClientRec.height,
      bottom = _getBoundingClientRec.bottom,
      left = _getBoundingClientRec.left;
    var percent;
    if (axis.indexOf('vertical') === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }
    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }
    var newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      var closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp(newValue, min, max);
    var activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue);
      } else {
        activeIndex = previousIndex.current;
      }

      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[activeIndex - 1] || -Infinity, values[activeIndex + 1] || Infinity);
      }
      var previousValue = newValue;
      newValue = setValueIndex({
        values: values,
        newValue: newValue,
        index: activeIndex
      });

      // Potentially swap the index if needed.
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue: newValue,
      activeIndex: activeIndex
    };
  };
  var handleTouchMove = useEventCallback(function (nativeEvent) {
    var finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;

    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    // @ts-ignore buttons doesn't not exists on touch event
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }
    var _getFingerNewValue = getFingerNewValue({
        finger: finger,
        move: true
      }),
      newValue = _getFingerNewValue.newValue,
      activeIndex = _getFingerNewValue.activeIndex;
    focusThumb({
      sliderRef: sliderRef,
      activeIndex: activeIndex,
      setActive: setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  var handleTouchEnd = useEventCallback(function (nativeEvent) {
    var finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    var _getFingerNewValue2 = getFingerNewValue({
        finger: finger,
        move: true
      }),
      newValue = _getFingerNewValue2.newValue;
    setActive(-1);
    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = undefined;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
  });
  var handleTouchStart = useEventCallback(function (nativeEvent) {
    if (disabled) {
      return;
    }
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    var touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    var finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      var _getFingerNewValue3 = getFingerNewValue({
          finger: finger
        }),
        newValue = _getFingerNewValue3.newValue,
        activeIndex = _getFingerNewValue3.activeIndex;
      focusThumb({
        sliderRef: sliderRef,
        activeIndex: activeIndex,
        setActive: setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    var doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove, {
      passive: true
    });
    doc.addEventListener('touchend', handleTouchEnd, {
      passive: true
    });
  });
  var stopListening = React.useCallback(function () {
    var doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React.useEffect(function () {
    var slider = sliderRef.current;
    slider.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return function () {
      slider.removeEventListener('touchstart', handleTouchStart);
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React.useEffect(function () {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  var createHandleMouseDown = function createHandleMouseDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onMous;
      (_otherHandlers$onMous = otherHandlers.onMouseDown) == null || _otherHandlers$onMous.call(otherHandlers, event);
      if (disabled) {
        return;
      }
      if (event.defaultPrevented) {
        return;
      }

      // Only handle left clicks
      if (event.button !== 0) {
        return;
      }

      // Avoid text selection
      event.preventDefault();
      var finger = trackFinger(event, touchId);
      if (finger !== false) {
        var _getFingerNewValue4 = getFingerNewValue({
            finger: finger
          }),
          newValue = _getFingerNewValue4.newValue,
          activeIndex = _getFingerNewValue4.activeIndex;
        focusThumb({
          sliderRef: sliderRef,
          activeIndex: activeIndex,
          setActive: setActive
        });
        setValueState(newValue);
        if (handleChange && !areValuesEqual(newValue, valueDerived)) {
          handleChange(event, newValue, activeIndex);
        }
      }
      moveCount.current = 0;
      var doc = ownerDocument(sliderRef.current);
      doc.addEventListener('mousemove', handleTouchMove, {
        passive: true
      });
      doc.addEventListener('mouseup', handleTouchEnd);
    };
  };
  var trackOffset = valueToPercent(range ? values[0] : min, min, max);
  var trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalHandlers = extractEventHandlers(externalProps);
    var ownEventHandlers = {
      onMouseDown: createHandleMouseDown(externalHandlers || {})
    };
    var mergedEventHandlers = _extends({}, externalHandlers, ownEventHandlers);
    return _extends({}, externalProps, {
      ref: handleRef
    }, mergedEventHandlers);
  };
  var createHandleMouseOver = function createHandleMouseOver(otherHandlers) {
    return function (event) {
      var _otherHandlers$onMous2;
      (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null || _otherHandlers$onMous2.call(otherHandlers, event);
      var index = Number(event.currentTarget.getAttribute('data-index'));
      setOpen(index);
    };
  };
  var createHandleMouseLeave = function createHandleMouseLeave(otherHandlers) {
    return function (event) {
      var _otherHandlers$onMous3;
      (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null || _otherHandlers$onMous3.call(otherHandlers, event);
      setOpen(-1);
    };
  };
  var getThumbProps = function getThumbProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalHandlers = extractEventHandlers(externalProps);
    var ownEventHandlers = {
      onMouseOver: createHandleMouseOver(externalHandlers || {}),
      onMouseLeave: createHandleMouseLeave(externalHandlers || {})
    };
    return _extends({}, externalProps, externalHandlers, ownEventHandlers);
  };
  var getThumbStyle = function getThumbStyle(index) {
    return {
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: active !== -1 && active !== index ? 'none' : undefined
    };
  };
  var getHiddenInputProps = function getHiddenInputProps() {
    var _parameters$step2;
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalHandlers = extractEventHandlers(externalProps);
    var ownEventHandlers = {
      onChange: createHandleHiddenInputChange(externalHandlers || {}),
      onFocus: createHandleHiddenInputFocus(externalHandlers || {}),
      onBlur: createHandleHiddenInputBlur(externalHandlers || {}),
      onKeyDown: createHandleHiddenInputKeyDown(externalHandlers || {})
    };
    var mergedEventHandlers = _extends({}, externalHandlers, ownEventHandlers);
    return _extends({
      tabIndex: tabIndex,
      'aria-labelledby': ariaLabelledby,
      'aria-orientation': orientation,
      'aria-valuemax': scale(max),
      'aria-valuemin': scale(min),
      name: name,
      type: 'range',
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? 'any' : (_parameters$step2 = parameters.step) != null ? _parameters$step2 : undefined,
      disabled: disabled
    }, externalProps, mergedEventHandlers, {
      style: _extends({}, visuallyHidden, {
        direction: isRtl ? 'rtl' : 'ltr',
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: '100%',
        height: '100%'
      })
    });
  };
  return {
    active: active,
    axis: axis,
    axisProps: axisProps,
    dragging: dragging,
    focusedThumbIndex: focusedThumbIndex,
    getHiddenInputProps: getHiddenInputProps,
    getRootProps: getRootProps,
    getThumbProps: getThumbProps,
    marks: marks,
    open: open,
    range: range,
    rootRef: handleRef,
    trackLeap: trackLeap,
    trackOffset: trackOffset,
    values: values,
    getThumbStyle: getThumbStyle
  };
}