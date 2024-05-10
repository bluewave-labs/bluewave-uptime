"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersPopperUtilityClass = getPickersPopperUtilityClass;
exports.pickersPopperClasses = void 0;
var _utils = require("@mui/utils");
function getPickersPopperUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiPickersPopper', slot);
}
const pickersPopperClasses = exports.pickersPopperClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersPopper', ['root', 'paper']);