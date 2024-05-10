"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roRO = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
// maps TimeView to its translation
const timeViews = {
  hours: 'Ore',
  minutes: 'Minute',
  seconds: 'Secunde',
  meridiem: 'Meridiane'
};
const roROPickers = {
  // Calendar navigation
  previousMonth: 'Luna anterioară',
  nextMonth: 'Luna următoare',
  // View navigation
  openPreviousView: 'Deschideți vizualizarea anterioară',
  openNextView: 'Deschideți vizualizarea următoare',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'Vizualizarea anuală este deschisă, comutați la vizualizarea calendarului' : 'Vizualizarea calendarului este deschisă, comutați la vizualizarea anuală',
  // DateRange labels
  start: 'Început',
  end: 'Sfârșit',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Anulare',
  clearButtonLabel: 'Ștergere',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Astăzi',
  // Toolbar titles
  datePickerToolbarTitle: 'Selectați data',
  dateTimePickerToolbarTitle: 'Selectați data și ora',
  timePickerToolbarTitle: 'Selectați ora',
  dateRangePickerToolbarTitle: 'Selectați intervalul de date',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Selectați ${timeViews[view] ?? view}. ${time === null ? 'Nicio oră selectată' : `Ora selectată este ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} ${timeViews.hours}`,
  minutesClockNumberText: minutes => `${minutes} ${timeViews.minutes}`,
  secondsClockNumberText: seconds => `${seconds}  ${timeViews.seconds}`,
  // Digital clock labels
  selectViewText: view => `Selectați ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Număr săptămână',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Săptămâna ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Selectați data, data selectată este ${utils.format(value, 'fullDate')}` : 'Selectați data',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Selectați ora, ora selectată este ${utils.format(value, 'fullTime')}` : 'Selectați ora',
  fieldClearLabel: 'Golire conținut',
  // Table labels
  timeTableLabel: 'Selectați ora',
  dateTableLabel: 'Selectați data',
  // Field section placeholders
  fieldYearPlaceholder: params => 'A'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'LLLL' : 'LL',
  fieldDayPlaceholder: () => 'ZZ',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
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
const roRO = exports.roRO = (0, _getPickersLocalization.getPickersLocalization)(roROPickers);