"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockClasses = void 0;
exports.getClockUtilityClass = getClockUtilityClass;
var _utils = require("@mui/utils");
function getClockUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiClock', slot);
}
const clockClasses = exports.clockClasses = (0, _utils.unstable_generateUtilityClasses)('MuiClock', ['root', 'clock', 'wrapper', 'squareMask', 'pin', 'amButton', 'pmButton', 'meridiemText']);