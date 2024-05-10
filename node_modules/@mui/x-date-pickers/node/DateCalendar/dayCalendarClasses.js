"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDayCalendarUtilityClass = exports.dayCalendarClasses = void 0;
var _utils = require("@mui/utils");
const getDayCalendarUtilityClass = slot => (0, _utils.unstable_generateUtilityClass)('MuiDayCalendar', slot);
exports.getDayCalendarUtilityClass = getDayCalendarUtilityClass;
const dayCalendarClasses = exports.dayCalendarClasses = (0, _utils.unstable_generateUtilityClasses)('MuiDayCalendar', ['root', 'header', 'weekDayLabel', 'loadingContainer', 'slideTransition', 'monthContainer', 'weekContainer', 'weekNumberLabel', 'weekNumber']);