"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimePickerToolbarClasses = void 0;
exports.getDateTimePickerToolbarUtilityClass = getDateTimePickerToolbarUtilityClass;
var _utils = require("@mui/utils");
function getDateTimePickerToolbarUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiDateTimePickerToolbar', slot);
}
const dateTimePickerToolbarClasses = exports.dateTimePickerToolbarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'timeDigitsContainer', 'separator', 'timeLabelReverse', 'ampmSelection', 'ampmLandscape', 'ampmLabel']);