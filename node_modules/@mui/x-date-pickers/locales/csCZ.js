import { getPickersLocalization } from './utils/getPickersLocalization';
// maps TimeView to its translation
const timeViews = {
  hours: 'Hodiny',
  minutes: 'Minuty',
  seconds: 'Sekundy',
  meridiem: 'Odpoledne'
};
const csCZPickers = {
  // Calendar navigation
  previousMonth: 'Předchozí měsíc',
  nextMonth: 'Další měsíc',
  // View navigation
  openPreviousView: 'Otevřít předchozí zobrazení',
  openNextView: 'Otevřít další zobrazení',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'roční zobrazení otevřeno, přepněte do zobrazení kalendáře' : 'zobrazení kalendáře otevřeno, přepněte do zobrazení roku',
  // DateRange labels
  start: 'Začátek',
  end: 'Konec',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Zrušit',
  clearButtonLabel: 'Vymazat',
  okButtonLabel: 'Potvrdit',
  todayButtonLabel: 'Dnes',
  // Toolbar titles
  datePickerToolbarTitle: 'Vyberte datum',
  dateTimePickerToolbarTitle: 'Vyberte datum a čas',
  timePickerToolbarTitle: 'Vyberte čas',
  dateRangePickerToolbarTitle: 'Vyberete rozmezí dat',
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews[view] ?? view} vybrány. ${time === null ? 'Není vybrán čas' : `Vybraný čas je ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} hodin`,
  minutesClockNumberText: minutes => `${minutes} minut`,
  secondsClockNumberText: seconds => `${seconds} sekund`,
  // Digital clock labels
  selectViewText: view => `Vyberte ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Týden v roce',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `${weekNumber} týden v roce`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vyberte datum, vybrané datum je ${utils.format(value, 'fullDate')}` : 'Vyberte datum',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Vyberte čas, vybraný čas je ${utils.format(value, 'fullTime')}` : 'Vyberte čas',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'vyberte čas',
  dateTableLabel: 'vyberte datum',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
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
export const csCZ = getPickersLocalization(csCZPickers);