import { getPickersLocalization } from './utils/getPickersLocalization';
// maps TimeView to its translation
const timeViews = {
  hours: 'Timer',
  minutes: 'Minutter',
  seconds: 'Sekunder',
  meridiem: 'Meridiem'
};
const daDKPickers = {
  // Calendar navigation
  previousMonth: 'Forrige måned',
  nextMonth: 'Næste måned',
  // View navigation
  openPreviousView: 'Åben forrige visning',
  openNextView: 'Åben næste visning',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'årsvisning er åben, skift til kalendervisning' : 'kalendervisning er åben, skift til årsvisning',
  // DateRange labels
  start: 'Start',
  end: 'Slut',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Annuller',
  clearButtonLabel: 'Ryd',
  okButtonLabel: 'OK',
  todayButtonLabel: 'I dag',
  // Toolbar titles
  datePickerToolbarTitle: 'Vælg dato',
  dateTimePickerToolbarTitle: 'Vælg dato & tidspunkt',
  timePickerToolbarTitle: 'Vælg tidspunkt',
  dateRangePickerToolbarTitle: 'Vælg datointerval',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Vælg ${timeViews[view] ?? view}. ${time === null ? 'Intet tidspunkt valgt' : `Valgte tidspunkt er ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} timer`,
  minutesClockNumberText: minutes => `${minutes} minutter`,
  secondsClockNumberText: seconds => `${seconds} sekunder`,
  // Digital clock labels
  selectViewText: view => `Vælg ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Ugenummer',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Uge ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vælg dato, valgte dato er ${utils.format(value, 'fullDate')}` : 'Vælg dato',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vælg tidspunkt, valgte tidspunkt er ${utils.format(value, 'fullTime')}` : 'Vælg tidspunkt',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'vælg tidspunkt',
  dateTableLabel: 'vælg dato',
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
export const daDK = getPickersLocalization(daDKPickers);