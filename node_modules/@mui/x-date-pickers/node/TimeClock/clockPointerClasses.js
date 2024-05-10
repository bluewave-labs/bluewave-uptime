"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockPointerClasses = void 0;
exports.getClockPointerUtilityClass = getClockPointerUtilityClass;
var _utils = require("@mui/utils");
function getClockPointerUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiClockPointer', slot);
}
const clockPointerClasses = exports.clockPointerClasses = (0, _utils.unstable_generateUtilityClasses)('MuiClockPointer', ['root', 'thumb']);