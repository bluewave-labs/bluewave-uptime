"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trTR = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const timeViews = {
  hours: 'saat',
  minutes: 'dakika',
  seconds: 'saniye',
  meridiem: 'öğleden sonra'
};
const trTRPickers = {
  // Calendar navigation
  previousMonth: 'Önceki ay',
  nextMonth: 'Sonraki ay',
  // View navigation
  openPreviousView: 'Sonraki görünüm',
  openNextView: 'Önceki görünüm',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'yıl görünümü açık, takvim görünümüne geç' : 'takvim görünümü açık, yıl görünümüne geç',
  // DateRange labels
  start: 'Başlangıç',
  end: 'Bitiş',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'iptal',
  clearButtonLabel: 'Temizle',
  okButtonLabel: 'Tamam',
  todayButtonLabel: 'Bugün',
  // Toolbar titles
  datePickerToolbarTitle: 'Tarih Seç',
  dateTimePickerToolbarTitle: 'Tarih & Saat seç',
  timePickerToolbarTitle: 'Saat seç',
  dateRangePickerToolbarTitle: 'Tarih aralığı seçin',
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews[view]} seç.  ${time === null ? 'Zaman seçilmedi' : `Seçilen zaman: ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} saat`,
  minutesClockNumberText: minutes => `${minutes} dakika`,
  secondsClockNumberText: seconds => `${seconds} saniye`,
  // Digital clock labels
  selectViewText: view => `Seç ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Hafta numarası',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Hafta ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Tarih seçin, seçilen tarih: ${utils.format(value, 'fullDate')}` : 'Tarih seç',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Saat seçin, seçilen saat: ${utils.format(value, 'fullTime')}` : 'Saat seç',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'saat seç',
  dateTableLabel: 'tarih seç',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'AAA' : 'AA',
  fieldDayPlaceholder: () => 'GG',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'HHH' : 'HH',
  fieldHoursPlaceholder: () => 'ss',
  fieldMinutesPlaceholder: () => 'dd',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa'

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
const trTR = exports.trTR = (0, _getPickersLocalization.getPickersLocalization)(trTRPickers);