import { clamp } from '@mui/utils';
export function clampStepwise(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MIN_SAFE_INTEGER;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.MAX_SAFE_INTEGER;
  var stepProp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NaN;
  if (Number.isNaN(stepProp)) {
    return clamp(val, min, max);
  }
  var step = stepProp || 1;
  var remainder = val % step;
  var positivity = Math.sign(remainder);
  if (Math.abs(remainder) > step / 2) {
    return clamp(val + positivity * (step - Math.abs(remainder)), min, max);
  }
  return clamp(val - positivity * Math.abs(remainder), min, max);
}
export function isNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}