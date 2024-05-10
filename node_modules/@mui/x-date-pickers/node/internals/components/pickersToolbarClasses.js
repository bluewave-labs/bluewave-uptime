"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersToolbarUtilityClass = getPickersToolbarUtilityClass;
exports.pickersToolbarClasses = void 0;
var _utils = require("@mui/utils");
function getPickersToolbarUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiPickersToolbar', slot);
}
const pickersToolbarClasses = exports.pickersToolbarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersToolbar', ['root', 'content']);