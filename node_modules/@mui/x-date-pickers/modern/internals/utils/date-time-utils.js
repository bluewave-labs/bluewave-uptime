import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["views", "format"];
import { resolveTimeFormat, isTimeView, isInternalTimeView } from './time-utils';
import { resolveDateFormat } from './date-utils';
export const resolveDateTimeFormat = (utils, _ref) => {
  let {
      views,
      format
    } = _ref,
    other = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (format) {
    return format;
  }
  const dateViews = [];
  const timeViews = [];
  views.forEach(view => {
    if (isTimeView(view)) {
      timeViews.push(view);
    } else {
      dateViews.push(view);
    }
  });
  if (timeViews.length === 0) {
    return resolveDateFormat(utils, _extends({
      views: dateViews
    }, other), false);
  }
  if (dateViews.length === 0) {
    return resolveTimeFormat(utils, _extends({
      views: timeViews
    }, other));
  }
  const timeFormat = resolveTimeFormat(utils, _extends({
    views: timeViews
  }, other));
  const dateFormat = resolveDateFormat(utils, _extends({
    views: dateViews
  }, other), false);
  return `${dateFormat} ${timeFormat}`;
};
const resolveViews = (ampm, views, shouldUseSingleColumn) => {
  if (shouldUseSingleColumn) {
    return views.filter(view => !isInternalTimeView(view) || view === 'hours');
  }
  return ampm ? [...views, 'meridiem'] : views;
};
const resolveShouldRenderTimeInASingleColumn = (timeSteps, threshold) => 24 * 60 / ((timeSteps.hours ?? 1) * (timeSteps.minutes ?? 5)) <= threshold;
export function resolveTimeViewsResponse({
  thresholdToRenderTimeInASingleColumn: inThreshold,
  ampm,
  timeSteps: inTimeSteps,
  views
}) {
  const thresholdToRenderTimeInASingleColumn = inThreshold ?? 24;
  const timeSteps = _extends({
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