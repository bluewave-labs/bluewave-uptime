"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itIT = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const views = {
  hours: 'le ore',
  minutes: 'i minuti',
  seconds: 'i secondi',
  meridiem: 'il meridiano'
};
const itITPickers = {
  // Calendar navigation
  previousMonth: 'Mese precedente',
  nextMonth: 'Mese successivo',
  // View navigation
  openPreviousView: 'Apri la vista precedente',
  openNextView: 'Apri la vista successiva',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? "la vista dell'anno è aperta, passare alla vista del calendario" : "la vista dell'calendario è aperta, passare alla vista dell'anno",
  // DateRange labels
  start: 'Inizio',
  end: 'Fine',
  startDate: 'Data di inizio',
  startTime: 'Ora di inizio',
  endDate: 'Data di fine',
  endTime: 'Ora di fine',
  // Action bar
  cancelButtonLabel: 'Cancellare',
  clearButtonLabel: 'Sgomberare',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Oggi',
  // Toolbar titles
  datePickerToolbarTitle: 'Seleziona data',
  dateTimePickerToolbarTitle: 'Seleziona data e orario',
  timePickerToolbarTitle: 'Seleziona orario',
  dateRangePickerToolbarTitle: 'Seleziona intervallo di date',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Seleziona ${views[view]}. ${time === null ? 'Nessun orario selezionato' : `L'ora selezionata è ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} ore`,
  minutesClockNumberText: minutes => `${minutes} minuti`,
  secondsClockNumberText: seconds => `${seconds} secondi`,
  // Digital clock labels
  selectViewText: view => `Seleziona ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Numero settimana',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Settimana ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Scegli la data, la data selezionata è ${utils.format(value, 'fullDate')}` : 'Scegli la data',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Scegli l'ora, l'ora selezionata è ${utils.format(value, 'fullTime')}` : "Scegli l'ora",
  fieldClearLabel: 'Cancella valore',
  // Table labels
  timeTableLabel: "scegli un'ora",
  dateTableLabel: 'scegli una data',
  // Field section placeholders
  fieldYearPlaceholder: params => 'A'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'GG',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'GGGG' : 'GG',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
  // View names
  year: 'Anno',
  month: 'Mese',
  day: 'Giorno',
  weekDay: 'Giorno della settimana',
  hours: 'Ore',
  minutes: 'Minuti',
  seconds: 'Secondi',
  meridiem: 'Meridiano',
  // Common
  empty: 'Vuoto'
};
const itIT = exports.itIT = (0, _getPickersLocalization.getPickersLocalization)(itITPickers);