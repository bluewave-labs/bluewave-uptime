"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockNumberClasses = void 0;
exports.getClockNumberUtilityClass = getClockNumberUtilityClass;
var _utils = require("@mui/utils");
function getClockNumberUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiClockNumber', slot);
}
const clockNumberClasses = exports.clockNumberClasses = (0, _utils.unstable_generateUtilityClasses)('MuiClockNumber', ['root', 'selected', 'disabled']);