import { clamp } from '@mui/utils';
export function clampStepwise(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, stepProp = NaN) {
  if (Number.isNaN(stepProp)) {
    return clamp(val, min, max);
  }
  const step = stepProp || 1;
  const remainder = val % step;
  const positivity = Math.sign(remainder);
  if (Math.abs(remainder) > step / 2) {
    return clamp(val + positivity * (step - Math.abs(remainder)), min, max);
  }
  return clamp(val - positivity * Math.abs(remainder), min, max);
}
export function isNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}