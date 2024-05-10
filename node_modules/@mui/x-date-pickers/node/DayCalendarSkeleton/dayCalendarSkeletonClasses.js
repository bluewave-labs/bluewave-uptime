"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDayCalendarSkeletonUtilityClass = exports.dayCalendarSkeletonClasses = void 0;
var _utils = require("@mui/utils");
const getDayCalendarSkeletonUtilityClass = slot => (0, _utils.unstable_generateUtilityClass)('MuiDayCalendarSkeleton', slot);
exports.getDayCalendarSkeletonUtilityClass = getDayCalendarSkeletonUtilityClass;
const dayCalendarSkeletonClasses = exports.dayCalendarSkeletonClasses = (0, _utils.unstable_generateUtilityClasses)('MuiDayCalendarSkeleton', ['root', 'week', 'daySkeleton']);