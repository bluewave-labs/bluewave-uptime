"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimePickerToolbarUtilityClass = getTimePickerToolbarUtilityClass;
exports.timePickerToolbarClasses = void 0;
var _utils = require("@mui/utils");
function getTimePickerToolbarUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiTimePickerToolbar', slot);
}
const timePickerToolbarClasses = exports.timePickerToolbarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiTimePickerToolbar', ['root', 'separator', 'hourMinuteLabel', 'hourMinuteLabelLandscape', 'hourMinuteLabelReverse', 'ampmSelection', 'ampmLandscape', 'ampmLabel']);