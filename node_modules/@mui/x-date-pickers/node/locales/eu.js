"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eu = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const views = {
  hours: 'orduak',
  minutes: 'minutuak',
  seconds: 'segunduak',
  meridiem: 'meridianoa'
};
const euPickers = {
  // Calendar navigation
  previousMonth: 'Azken hilabetea',
  nextMonth: 'Hurrengo hilabetea',
  // View navigation
  openPreviousView: 'azken bista ireki',
  openNextView: 'hurrengo bista ireki',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'urteko bista irekita dago, aldatu egutegi bistara' : 'egutegi bista irekita dago, aldatu urteko bistara',
  // DateRange labels
  start: 'Hasi',
  end: 'Bukatu',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Utxi',
  clearButtonLabel: 'Garbitu',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Gaur',
  // Toolbar titles
  datePickerToolbarTitle: 'Data aukeratu',
  dateTimePickerToolbarTitle: 'Data eta ordua aukeratu',
  timePickerToolbarTitle: 'Ordua aukeratu',
  dateRangePickerToolbarTitle: 'Data tartea aukeratu',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Aukeratu ${views[view]}. ${time === null ? 'Ez da ordurik aukertau' : `Aukeratutako ordua ${adapter.format(time, 'fullTime')} da`}`,
  hoursClockNumberText: hours => `${hours} ordu`,
  minutesClockNumberText: minutes => `${minutes} minutu`,
  secondsClockNumberText: seconds => `${seconds} segundu`,
  // Digital clock labels
  selectViewText: view => `Aukeratu ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Astea zenbakia',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `${weekNumber} astea`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Data aukeratu, aukeratutako data ${utils.format(value, 'fullDate')} da` : 'Data aukeratu',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Ordua aukeratu, aukeratutako ordua ${utils.format(value, 'fullTime')} da` : 'Ordua aukeratu',
  fieldClearLabel: 'Balioa garbitu',
  // Table labels
  timeTableLabel: 'ordua aukeratu',
  dateTableLabel: 'data aukeratu',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
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
const eu = exports.eu = (0, _getPickersLocalization.getPickersLocalization)(euPickers);