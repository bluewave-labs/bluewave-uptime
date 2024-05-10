import { getPickersLocalization } from './utils/getPickersLocalization';
const timeViews = {
  hours: 'uren',
  minutes: 'minuten',
  seconds: 'seconden',
  meridiem: 'meridium'
};
const nlNLPickers = {
  // Calendar navigation
  previousMonth: 'Vorige maand',
  nextMonth: 'Volgende maand',
  // View navigation
  openPreviousView: 'Open vorige view',
  openNextView: 'Open volgende view',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'jaarweergave is geopend, schakel over naar kalenderweergave' : 'kalenderweergave is geopend, switch naar jaarweergave',
  // DateRange labels
  start: 'Start',
  end: 'Einde',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Annuleren',
  clearButtonLabel: 'Resetten',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Vandaag',
  // Toolbar titles
  datePickerToolbarTitle: 'Selecteer datum',
  dateTimePickerToolbarTitle: 'Selecteer datum & tijd',
  timePickerToolbarTitle: 'Selecteer tijd',
  dateRangePickerToolbarTitle: 'Selecteer datumbereik',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Selecteer ${timeViews[view]}. ${time === null ? 'Geen tijd geselecteerd' : `Geselecteerde tijd is ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} uren`,
  minutesClockNumberText: minutes => `${minutes} minuten`,
  secondsClockNumberText: seconds => `${seconds} seconden`,
  // Digital clock labels
  selectViewText: view => `Selecteer ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Weeknummer',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Week ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Kies datum, geselecteerde datum is ${utils.format(value, 'fullDate')}` : 'Kies datum',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Kies tijd, geselecteerde tijd is ${utils.format(value, 'fullTime')}` : 'Kies tijd',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'kies tijd',
  dateTableLabel: 'kies datum',
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
export const nlNL = getPickersLocalization(nlNLPickers);