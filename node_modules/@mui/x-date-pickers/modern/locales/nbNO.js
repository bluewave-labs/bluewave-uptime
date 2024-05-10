import { getPickersLocalization } from './utils/getPickersLocalization';
const timeViews = {
  hours: 'timer',
  minutes: 'minutter',
  seconds: 'sekunder',
  meridiem: 'meridiem'
};
const nbNOPickers = {
  // Calendar navigation
  previousMonth: 'Forrige måned',
  nextMonth: 'Neste måned',
  // View navigation
  openPreviousView: 'Åpne forrige visning',
  openNextView: 'Åpne neste visning',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'årsvisning er åpen, bytt til kalendervisning' : 'kalendervisning er åpen, bytt til årsvisning',
  // DateRange labels
  start: 'Start',
  end: 'Slutt',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Avbryt',
  clearButtonLabel: 'Fjern',
  okButtonLabel: 'OK',
  todayButtonLabel: 'I dag',
  // Toolbar titles
  datePickerToolbarTitle: 'Velg dato',
  dateTimePickerToolbarTitle: 'Velg dato & klokkeslett',
  timePickerToolbarTitle: 'Velg klokkeslett',
  dateRangePickerToolbarTitle: 'Velg datoperiode',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Velg ${timeViews[view]}. ${time === null ? 'Ingen tid valgt' : `Valgt tid er ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} timer`,
  minutesClockNumberText: minutes => `${minutes} minutter`,
  secondsClockNumberText: seconds => `${seconds} sekunder`,
  // Digital clock labels
  selectViewText: view => `Velg ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Ukenummer',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Uke ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velg dato, valgt dato er ${utils.format(value, 'fullDate')}` : 'Velg dato',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velg tid, valgt tid er ${utils.format(value, 'fullTime')}` : 'Velg tid',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'velg tid',
  dateTableLabel: 'velg dato',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Å'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'tt',
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
export const nbNO = getPickersLocalization(nbNOPickers);