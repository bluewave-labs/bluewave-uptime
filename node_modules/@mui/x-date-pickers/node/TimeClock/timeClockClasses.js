"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeClockUtilityClass = getTimeClockUtilityClass;
exports.timeClockClasses = void 0;
var _utils = require("@mui/utils");
function getTimeClockUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiTimeClock', slot);
}
const timeClockClasses = exports.timeClockClasses = (0, _utils.unstable_generateUtilityClasses)('MuiTimeClock', ['root', 'arrowSwitcher']);