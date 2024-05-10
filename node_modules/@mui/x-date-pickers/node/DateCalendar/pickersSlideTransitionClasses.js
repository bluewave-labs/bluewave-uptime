"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickersSlideTransitionClasses = exports.getPickersSlideTransitionUtilityClass = void 0;
var _utils = require("@mui/utils");
const getPickersSlideTransitionUtilityClass = slot => (0, _utils.unstable_generateUtilityClass)('MuiPickersSlideTransition', slot);
exports.getPickersSlideTransitionUtilityClass = getPickersSlideTransitionUtilityClass;
const pickersSlideTransitionClasses = exports.pickersSlideTransitionClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersSlideTransition', ['root', 'slideEnter-left', 'slideEnter-right', 'slideEnterActive', 'slideExit', 'slideExitActiveLeft-left', 'slideExitActiveLeft-right']);