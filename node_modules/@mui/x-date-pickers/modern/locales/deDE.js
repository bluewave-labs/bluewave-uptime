import { getPickersLocalization } from './utils/getPickersLocalization';
// maps TimeView to its translation
const timeViews = {
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden',
  meridiem: 'Meridiem'
};
const deDEPickers = {
  // Calendar navigation
  previousMonth: 'Letzter Monat',
  nextMonth: 'Nächster Monat',
  // View navigation
  openPreviousView: 'Letzte Ansicht öffnen',
  openNextView: 'Nächste Ansicht öffnen',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'Jahresansicht ist geöffnet, zur Kalenderansicht wechseln' : 'Kalenderansicht ist geöffnet, zur Jahresansicht wechseln',
  // DateRange labels
  start: 'Beginn',
  end: 'Ende',
  startDate: 'Startdatum',
  startTime: 'Startzeit',
  endDate: 'Enddatum',
  endTime: 'Endzeit',
  // Action bar
  cancelButtonLabel: 'Abbrechen',
  clearButtonLabel: 'Löschen',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Heute',
  // Toolbar titles
  datePickerToolbarTitle: 'Datum auswählen',
  dateTimePickerToolbarTitle: 'Datum & Uhrzeit auswählen',
  timePickerToolbarTitle: 'Uhrzeit auswählen',
  dateRangePickerToolbarTitle: 'Datumsbereich auswählen',
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews[view] ?? view} auswählen. ${time === null ? 'Keine Uhrzeit ausgewählt' : `Gewählte Uhrzeit ist ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} ${timeViews.hours}`,
  minutesClockNumberText: minutes => `${minutes} ${timeViews.minutes}`,
  secondsClockNumberText: seconds => `${seconds}  ${timeViews.seconds}`,
  // Digital clock labels
  selectViewText: view => `${timeViews[view]} auswählen`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Kalenderwoche',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Woche ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Datum auswählen, gewähltes Datum ist ${utils.format(value, 'fullDate')}` : 'Datum auswählen',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Uhrzeit auswählen, gewählte Uhrzeit ist ${utils.format(value, 'fullTime')}` : 'Uhrzeit auswählen',
  fieldClearLabel: 'Wert leeren',
  // Table labels
  timeTableLabel: 'Uhrzeit auswählen',
  dateTableLabel: 'Datum auswählen',
  // Field section placeholders
  fieldYearPlaceholder: params => 'J'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'TT',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
  // View names
  year: 'Jahr',
  month: 'Monat',
  day: 'Tag',
  weekDay: 'Wochentag',
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden',
  meridiem: 'Tageszeit',
  // Common
  empty: 'Leer'
};
export const deDE = getPickersLocalization(deDEPickers);