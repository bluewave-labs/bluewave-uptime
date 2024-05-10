"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDateTimeFormat = void 0;
exports.resolveTimeViewsResponse = resolveTimeViewsResponse;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _timeUtils = require("./time-utils");
var _dateUtils = require("./date-utils");
const _excluded = ["views", "format"];
const resolveDateTimeFormat = (utils, _ref) => {
  let {
      views,
      format
    } = _ref,
    other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  if (format) {
    return format;
  }
  const dateViews = [];
  const timeViews = [];
  views.forEach(view => {
    if ((0, _timeUtils.isTimeView)(view)) {
      timeViews.push(view);
    } else {
      dateViews.push(view);
    }
  });
  if (timeViews.length === 0) {
    return (0, _dateUtils.resolveDateFormat)(utils, (0, _extends2.default)({
      views: dateViews
    }, other), false);
  }
  if (dateViews.length === 0) {
    return (0, _timeUtils.resolveTimeFormat)(utils, (0, _extends2.default)({
      views: timeViews
    }, other));
  }
  const timeFormat = (0, _timeUtils.resolveTimeFormat)(utils, (0, _extends2.default)({
    views: timeViews
  }, other));
  const dateFormat = (0, _dateUtils.resolveDateFormat)(utils, (0, _extends2.default)({
    views: dateViews
  }, other), false);
  return `${dateFormat} ${timeFormat}`;
};
exports.resolveDateTimeFormat = resolveDateTimeFormat;
const resolveViews = (ampm, views, shouldUseSingleColumn) => {
  if (shouldUseSingleColumn) {
    return views.filter(view => !(0, _timeUtils.isInternalTimeView)(view) || view === 'hours');
  }
  return ampm ? [...views, 'meridiem'] : views;
};
const resolveShouldRenderTimeInASingleColumn = (timeSteps, threshold) => 24 * 60 / ((timeSteps.hours ?? 1) * (timeSteps.minutes ?? 5)) <= threshold;
function resolveTimeViewsResponse({
  thresholdToRenderTimeInASingleColumn: inThreshold,
  ampm,
  timeSteps: inTimeSteps,
  views
}) {
  const thresholdToRenderTimeInASingleColumn = inThreshold ?? 24;
  const timeSteps = (0, _extends2.default)({
    hours: 1,
    minutes: 5,
    seconds: 5
  }, inTimeSteps);
  const shouldRenderTimeInASingleColumn = resolveShouldRenderTimeInASingleColumn(timeSteps, thresholdToRenderTimeInASingleColumn);
  return {
    thresholdToRenderTimeInASingleColumn,
    timeSteps,
    shouldRenderTimeInASingleColumn,
    views: resolveViews(ampm, views, shouldRenderTimeInASingleColumn)
  };
}