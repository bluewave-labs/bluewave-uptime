"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeSlots = computeSlots;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
function computeSlots({
  defaultSlots,
  slots
}) {
  const overrides = slots;
  if (!overrides || Object.keys(overrides).length === 0) {
    return defaultSlots;
  }
  const result = (0, _extends2.default)({}, defaultSlots);
  Object.keys(overrides).forEach(key => {
    const k = key;
    if (overrides[k] !== undefined) {
      result[k] = overrides[k];
    }
  });
  return result;
}