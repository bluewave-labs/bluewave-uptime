"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urPK = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const timeViews = {
  hours: 'گھنٹے',
  minutes: 'منٹ',
  seconds: 'سیکنڈ',
  meridiem: 'میریڈیم'
};
const urPKPickers = {
  // Calendar navigation
  previousMonth: 'پچھلا مہینہ',
  nextMonth: 'اگلا مہینہ',
  // View navigation
  openPreviousView: 'پچھلا ویو کھولیں',
  openNextView: 'اگلا ویو کھولیں',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'سال والا ویو کھلا ہے۔ کیلنڈر والا ویو کھولیں' : 'کیلنڈر والا ویو کھلا ہے۔ سال والا ویو کھولیں',
  // DateRange labels
  start: 'شروع',
  end: 'ختم',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'کینسل',
  clearButtonLabel: 'کلئیر',
  okButtonLabel: 'اوکے',
  todayButtonLabel: 'آج',
  // Toolbar titles
  datePickerToolbarTitle: 'تاریخ منتخب کریں',
  dateTimePickerToolbarTitle: 'تاریخ اور وقت منتخب کریں',
  timePickerToolbarTitle: 'وقت منتخب کریں',
  dateRangePickerToolbarTitle: 'تاریخوں کی رینج منتخب کریں',
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews[view]} منتخب کریں ${time === null ? 'کوئی وقت منتخب نہیں' : `منتخب وقت ہے ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} گھنٹے`,
  minutesClockNumberText: minutes => `${minutes} منٹ`,
  secondsClockNumberText: seconds => `${seconds} سیکنڈ`,
  // Digital clock labels
  selectViewText: view => `${timeViews[view]} منتخب کریں`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'ہفتہ نمبر',
  calendarWeekNumberHeaderText: 'نمبر',
  calendarWeekNumberAriaLabelText: weekNumber => `ہفتہ ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `تاریخ منتخب کریں، منتخب شدہ تاریخ ہے ${utils.format(value, 'fullDate')}` : 'تاریخ منتخب کریں',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `وقت منتخب کریں، منتخب شدہ وقت ہے ${utils.format(value, 'fullTime')}` : 'وقت منتخب کریں',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'وقت منتخب کریں',
  dateTableLabel: 'تاریخ منتخب کریں'

  // Field section placeholders
  // fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  // fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  // fieldDayPlaceholder: () => 'DD',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  // fieldHoursPlaceholder: () => 'hh',
  // fieldMinutesPlaceholder: () => 'mm',
  // fieldSecondsPlaceholder: () => 'ss',
  // fieldMeridiemPlaceholder: () => 'aa',

  // View names
  // year: 'Year',
  // month: 'Month',
  // day: 'Day',
  // weekDay: 'Week day',
  // hours: 'Hours',
  // minutes: 'Minutes',
  // seconds: 'Seconds',
  // meridiem: 'Meridiem',

  // Common
  // empty: 'Empty',
};
const urPK = exports.urPK = (0, _getPickersLocalization.getPickersLocalization)(urPKPickers);