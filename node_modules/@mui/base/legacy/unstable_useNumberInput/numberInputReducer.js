import _extends from "@babel/runtime/helpers/esm/extends";
import { NumberInputActionTypes } from './numberInputAction.types';
import { clampStepwise, isNumber } from './utils';
function getClampedValues(rawValue, context) {
  var min = context.min,
    max = context.max,
    step = context.step;
  var clampedValue = rawValue === null ? null : clampStepwise(rawValue, min, max, step);
  var newInputValue = clampedValue === null ? '' : String(clampedValue);
  return {
    value: clampedValue,
    inputValue: newInputValue
  };
}
function stepValue(state, context, direction, multiplier) {
  var value = state.value;
  var _context$step = context.step,
    step = _context$step === void 0 ? 1 : _context$step,
    min = context.min,
    max = context.max;
  if (isNumber(value)) {
    return {
      up: value + (step != null ? step : 1) * multiplier,
      down: value - (step != null ? step : 1) * multiplier
    }[direction];
  }
  return {
    up: min != null ? min : 1,
    down: max != null ? max : -1
  }[direction];
}
function handleClamp(state, context, inputValue) {
  var getInputValueAsString = context.getInputValueAsString;
  var numberValueAsString = getInputValueAsString(inputValue);
  var intermediateValue = numberValueAsString === '' || numberValueAsString === '-' ? null : parseInt(numberValueAsString, 10);
  var clampedValues = getClampedValues(intermediateValue, context);
  return _extends({}, state, clampedValues);
}
function handleInputChange(state, context, inputValue) {
  var getInputValueAsString = context.getInputValueAsString;
  var numberValueAsString = getInputValueAsString(inputValue);
  if (numberValueAsString.match(/^-?\d+?$/) || numberValueAsString === '' || numberValueAsString === '-') {
    return _extends({}, state, {
      inputValue: numberValueAsString
    });
  }
  return state;
}

// use this for ArrowUp, ArrowDown, button clicks
// use this with applyMultiplier: true for PageUp, PageDown, button shift-clicks
function handleStep(state, context, applyMultiplier, direction) {
  var multiplier = applyMultiplier ? context.shiftMultiplier : 1;
  var newValue = stepValue(state, context, direction, multiplier);
  var clampedValues = getClampedValues(newValue, context);
  return _extends({}, state, clampedValues);
}
function handleToMinOrMax(state, context, to) {
  var newValue = context[to];
  if (!isNumber(newValue)) {
    return state;
  }
  return _extends({}, state, {
    value: newValue,
    inputValue: String(newValue)
  });
}
export function numberInputReducer(state, action) {
  var type = action.type,
    context = action.context;
  switch (type) {
    case NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, action.applyMultiplier, 'up');
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, action.applyMultiplier, 'down');
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    case NumberInputActionTypes.resetInputValue:
      return _extends({}, state, {
        inputValue: String(state.value)
      });
    default:
      return state;
  }
}