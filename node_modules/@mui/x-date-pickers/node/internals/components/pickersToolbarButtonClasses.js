"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersToolbarButtonUtilityClass = getPickersToolbarButtonUtilityClass;
exports.pickersToolbarButtonClasses = void 0;
var _utils = require("@mui/utils");
function getPickersToolbarButtonUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiPickersToolbarButton', slot);
}
const pickersToolbarButtonClasses = exports.pickersToolbarButtonClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersToolbarButton', ['root']);