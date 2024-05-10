"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateCalendarUtilityClass = exports.dateCalendarClasses = void 0;
var _utils = require("@mui/utils");
const getDateCalendarUtilityClass = slot => (0, _utils.unstable_generateUtilityClass)('MuiDateCalendar', slot);
exports.getDateCalendarUtilityClass = getDateCalendarUtilityClass;
const dateCalendarClasses = exports.dateCalendarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiDateCalendar', ['root', 'viewTransitionContainer']);