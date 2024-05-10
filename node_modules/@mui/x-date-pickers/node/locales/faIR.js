"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.faIR = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const timeViews = {
  hours: 'ساعت ها',
  minutes: 'دقیقه ها',
  seconds: 'ثانیه ها',
  meridiem: 'بعد از ظهر'
};
const faIRPickers = {
  // Calendar navigation
  previousMonth: 'ماه گذشته',
  nextMonth: 'ماه آینده',
  // View navigation
  openPreviousView: 'نمای قبلی',
  openNextView: 'نمای بعدی',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'نمای سال باز است، رفتن به نمای تقویم' : 'نمای تقویم باز است، رفتن به نمای سال',
  // DateRange labels
  start: 'شروع',
  end: 'پایان',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'لغو',
  clearButtonLabel: 'پاک کردن',
  okButtonLabel: 'اوکی',
  todayButtonLabel: 'امروز',
  // Toolbar titles
  datePickerToolbarTitle: 'تاریخ را انتخاب کنید',
  dateTimePickerToolbarTitle: 'تاریخ و ساعت را انتخاب کنید',
  timePickerToolbarTitle: 'ساعت را انتخاب کنید',
  dateRangePickerToolbarTitle: 'محدوده تاریخ را انتخاب کنید',
  // Clock labels
  clockLabelText: (view, time, adapter) => ` را انتخاب کنید ${timeViews[view]}. ${time === null ? 'هیچ ساعتی انتخاب نشده است' : `ساعت انتخاب ${adapter.format(time, 'fullTime')} می باشد`}`,
  hoursClockNumberText: hours => `${hours} ساعت ها`,
  minutesClockNumberText: minutes => `${minutes} دقیقه ها`,
  secondsClockNumberText: seconds => `${seconds} ثانیه ها`,
  // Digital clock labels
  selectViewText: view => ` را انتخاب کنید ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'عدد هفته',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `هفته ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `تاریخ را انتخاب کنید، تاریخ انتخاب شده ${utils.format(value, 'fullDate')} می باشد` : 'تاریخ را انتخاب کنید',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `ساعت را انتخاب کنید، ساعت انتخاب شده ${utils.format(value, 'fullTime')} می باشد` : 'ساعت را انتخاب کنید',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'انتخاب تاریخ',
  dateTableLabel: 'انتخاب ساعت',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
  // View names
  year: 'سال',
  month: 'ماه',
  day: 'روز',
  // weekDay: 'Week day',
  hours: 'ساعت ها',
  minutes: 'دقیقه ها',
  seconds: 'ثانیه ها'
  // meridiem: 'Meridiem',

  // Common
  // empty: 'Empty',
};
const faIR = exports.faIR = (0, _getPickersLocalization.getPickersLocalization)(faIRPickers);