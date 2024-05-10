"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTimeFormat = exports.isTimeView = exports.isInternalTimeView = exports.getSecondsInDay = exports.getMeridiem = exports.createIsAfterIgnoreDatePart = exports.convertValueToMeridiem = exports.convertToMeridiem = void 0;
var _views = require("./views");
const timeViews = ['hours', 'minutes', 'seconds'];
const isTimeView = view => timeViews.includes(view);
exports.isTimeView = isTimeView;
const isInternalTimeView = view => timeViews.includes(view) || view === 'meridiem';
exports.isInternalTimeView = isInternalTimeView;
const getMeridiem = (date, utils) => {
  if (!date) {
    return null;
  }
  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};
exports.getMeridiem = getMeridiem;
const convertValueToMeridiem = (value, meridiem, ampm) => {
  if (ampm) {
    const currentMeridiem = value >= 12 ? 'pm' : 'am';
    if (currentMeridiem !== meridiem) {
      return meridiem === 'am' ? value - 12 : value + 12;
    }
  }
  return value;
};
exports.convertValueToMeridiem = convertValueToMeridiem;
const convertToMeridiem = (time, meridiem, ampm, utils) => {
  const newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};
exports.convertToMeridiem = convertToMeridiem;
const getSecondsInDay = (date, utils) => {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
};
exports.getSecondsInDay = getSecondsInDay;
const createIsAfterIgnoreDatePart = (disableIgnoringDatePartForTimeValidation, utils) => (dateLeft, dateRight) => {
  if (disableIgnoringDatePartForTimeValidation) {
    return utils.isAfter(dateLeft, dateRight);
  }
  return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
};
exports.createIsAfterIgnoreDatePart = createIsAfterIgnoreDatePart;
const resolveTimeFormat = (utils, {
  format,
  views,
  ampm
}) => {
  if (format != null) {
    return format;
  }
  const formats = utils.formats;
  if ((0, _views.areViewsEqual)(views, ['hours'])) {
    return ampm ? `${formats.hours12h} ${formats.meridiem}` : formats.hours24h;
  }
  if ((0, _views.areViewsEqual)(views, ['minutes'])) {
    return formats.minutes;
  }
  if ((0, _views.areViewsEqual)(views, ['seconds'])) {
    return formats.seconds;
  }
  if ((0, _views.areViewsEqual)(views, ['minutes', 'seconds'])) {
    return `${formats.minutes}:${formats.seconds}`;
  }
  if ((0, _views.areViewsEqual)(views, ['hours', 'minutes', 'seconds'])) {
    return ampm ? `${formats.hours12h}:${formats.minutes}:${formats.seconds} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}:${formats.seconds}`;
  }
  return ampm ? `${formats.hours12h}:${formats.minutes} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}`;
};
exports.resolveTimeFormat = resolveTimeFormat;