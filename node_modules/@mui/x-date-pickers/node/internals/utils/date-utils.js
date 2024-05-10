"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDateFormat = exports.replaceInvalidDateByNull = exports.mergeDateAndTime = exports.isDatePickerView = exports.getWeekdays = exports.getTodayDate = exports.getMonthsInYear = exports.formatMeridiem = exports.findClosestEnabledDate = exports.areDatesEqual = exports.applyDefaultDate = void 0;
var _views = require("./views");
const mergeDateAndTime = (utils, dateParam, timeParam) => {
  let mergedDate = dateParam;
  mergedDate = utils.setHours(mergedDate, utils.getHours(timeParam));
  mergedDate = utils.setMinutes(mergedDate, utils.getMinutes(timeParam));
  mergedDate = utils.setSeconds(mergedDate, utils.getSeconds(timeParam));
  return mergedDate;
};
exports.mergeDateAndTime = mergeDateAndTime;
const findClosestEnabledDate = ({
  date,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  isDateDisabled,
  utils,
  timezone
}) => {
  const today = mergeDateAndTime(utils, utils.date(undefined, timezone), date);
  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }
  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }
  let forward = date;
  let backward = date;
  if (utils.isBefore(date, minDate)) {
    forward = minDate;
    backward = null;
  }
  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = maxDate;
    }
    forward = null;
  }
  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }
    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }
    if (forward) {
      if (!isDateDisabled(forward)) {
        return forward;
      }
      forward = utils.addDays(forward, 1);
    }
    if (backward) {
      if (!isDateDisabled(backward)) {
        return backward;
      }
      backward = utils.addDays(backward, -1);
    }
  }
  return null;
};
exports.findClosestEnabledDate = findClosestEnabledDate;
const replaceInvalidDateByNull = (utils, value) => value == null || !utils.isValid(value) ? null : value;
exports.replaceInvalidDateByNull = replaceInvalidDateByNull;
const applyDefaultDate = (utils, value, defaultValue) => {
  if (value == null || !utils.isValid(value)) {
    return defaultValue;
  }
  return value;
};
exports.applyDefaultDate = applyDefaultDate;
const areDatesEqual = (utils, a, b) => {
  if (!utils.isValid(a) && a != null && !utils.isValid(b) && b != null) {
    return true;
  }
  return utils.isEqual(a, b);
};
exports.areDatesEqual = areDatesEqual;
const getMonthsInYear = (utils, year) => {
  const firstMonth = utils.startOfYear(year);
  const months = [firstMonth];
  while (months.length < 12) {
    const prevMonth = months[months.length - 1];
    months.push(utils.addMonths(prevMonth, 1));
  }
  return months;
};
exports.getMonthsInYear = getMonthsInYear;
const getTodayDate = (utils, timezone, valueType) => valueType === 'date' ? utils.startOfDay(utils.date(undefined, timezone)) : utils.date(undefined, timezone);
exports.getTodayDate = getTodayDate;
const formatMeridiem = (utils, meridiem) => {
  const date = utils.setHours(utils.date(), meridiem === 'am' ? 2 : 14);
  return utils.format(date, 'meridiem');
};
exports.formatMeridiem = formatMeridiem;
const dateViews = ['year', 'month', 'day'];
const isDatePickerView = view => dateViews.includes(view);
exports.isDatePickerView = isDatePickerView;
const resolveDateFormat = (utils, {
  format,
  views
}, isInToolbar) => {
  if (format != null) {
    return format;
  }
  const formats = utils.formats;
  if ((0, _views.areViewsEqual)(views, ['year'])) {
    return formats.year;
  }
  if ((0, _views.areViewsEqual)(views, ['month'])) {
    return formats.month;
  }
  if ((0, _views.areViewsEqual)(views, ['day'])) {
    return formats.dayOfMonth;
  }
  if ((0, _views.areViewsEqual)(views, ['month', 'year'])) {
    return `${formats.month} ${formats.year}`;
  }
  if ((0, _views.areViewsEqual)(views, ['day', 'month'])) {
    return `${formats.month} ${formats.dayOfMonth}`;
  }
  if (isInToolbar) {
    // Little localization hack (Google is doing the same for android native pickers):
    // For english localization it is convenient to include weekday into the date "Mon, Jun 1".
    // For other locales using strings like "June 1", without weekday.
    return /en/.test(utils.getCurrentLocaleCode()) ? formats.normalDateWithWeekday : formats.normalDate;
  }
  return formats.keyboardDate;
};
exports.resolveDateFormat = resolveDateFormat;
const getWeekdays = (utils, date) => {
  const start = utils.startOfWeek(date);
  return [0, 1, 2, 3, 4, 5, 6].map(diff => utils.addDays(start, diff));
};
exports.getWeekdays = getWeekdays;