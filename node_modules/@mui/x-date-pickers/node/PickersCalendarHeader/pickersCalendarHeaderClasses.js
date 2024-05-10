"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickersCalendarHeaderClasses = exports.getPickersCalendarHeaderUtilityClass = void 0;
var _utils = require("@mui/utils");
const getPickersCalendarHeaderUtilityClass = slot => (0, _utils.unstable_generateUtilityClass)('MuiPickersCalendarHeader', slot);
exports.getPickersCalendarHeaderUtilityClass = getPickersCalendarHeaderUtilityClass;
const pickersCalendarHeaderClasses = exports.pickersCalendarHeaderClasses = (0, _utils.unstable_generateUtilityClasses)('MuiPickersCalendarHeader', ['root', 'labelContainer', 'label', 'switchViewButton', 'switchViewIcon']);