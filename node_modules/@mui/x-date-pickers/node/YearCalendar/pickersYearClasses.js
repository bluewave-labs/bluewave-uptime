"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersYearUtilityClass = getPickersYearUtilityClass;
exports.pickersYearClasses = void 0;
var _utils = require("@mui/utils");
function getPickersYearUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiPickersYear', slot);
}
const pickersYearClasses = exports.pickersYearClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersYear', ['root', 'yearButton', 'selected', 'disabled']);