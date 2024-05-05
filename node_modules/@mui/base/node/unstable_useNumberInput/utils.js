"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clampStepwise = clampStepwise;
exports.isNumber = isNumber;
var _utils = require("@mui/utils");
function clampStepwise(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, stepProp = NaN) {
  if (Number.isNaN(stepProp)) {
    return (0, _utils.clamp)(val, min, max);
  }
  const step = stepProp || 1;
  const remainder = val % step;
  const positivity = Math.sign(remainder);
  if (Math.abs(remainder) > step / 2) {
    return (0, _utils.clamp)(val + positivity * (step - Math.abs(remainder)), min, max);
  }
  return (0, _utils.clamp)(val - positivity * Math.abs(remainder), min, max);
}
function isNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}