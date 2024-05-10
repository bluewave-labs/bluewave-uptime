"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersDayUtilityClass = getPickersDayUtilityClass;
exports.pickersDayClasses = void 0;
var _utils = require("@mui/utils");
function getPickersDayUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiPickersDay', slot);
}
const pickersDayClasses = exports.pickersDayClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersDay', ['root', 'dayWithMargin', 'dayOutsideMonth', 'hiddenDaySpacingFiller', 'today', 'selected', 'disabled']);