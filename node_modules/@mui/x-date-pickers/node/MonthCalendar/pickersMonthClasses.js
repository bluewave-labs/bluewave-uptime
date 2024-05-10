"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersMonthUtilityClass = getPickersMonthUtilityClass;
exports.pickersMonthClasses = void 0;
var _utils = require("@mui/utils");
function getPickersMonthUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiPickersMonth', slot);
}
const pickersMonthClasses = exports.pickersMonthClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersMonth', ['root', 'monthButton', 'disabled', 'selected']);