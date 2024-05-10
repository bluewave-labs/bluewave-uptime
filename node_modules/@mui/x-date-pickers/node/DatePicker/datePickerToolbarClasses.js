"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datePickerToolbarClasses = void 0;
exports.getDatePickerToolbarUtilityClass = getDatePickerToolbarUtilityClass;
var _utils = require("@mui/utils");
function getDatePickerToolbarUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiDatePickerToolbar', slot);
}
const datePickerToolbarClasses = exports.datePickerToolbarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiDatePickerToolbar', ['root', 'title']);