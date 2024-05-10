import { getPickersLocalization } from './utils/getPickersLocalization';
const timeViews = {
  hours: 'godzin',
  minutes: 'minut',
  seconds: 'sekund',
  meridiem: 'popołudnie'
};
const plPLPickers = {
  // Calendar navigation
  previousMonth: 'Poprzedni miesiąc',
  nextMonth: 'Następny miesiąc',
  // View navigation
  openPreviousView: 'Otwórz poprzedni widok',
  openNextView: 'Otwórz następny widok',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'otwarty jest widok roku, przełącz na widok kalendarza' : 'otwarty jest widok kalendarza, przełącz na widok roku',
  // DateRange labels
  start: 'Początek',
  end: 'Koniec',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Anuluj',
  clearButtonLabel: 'Wyczyść',
  okButtonLabel: 'Zatwierdź',
  todayButtonLabel: 'Dzisiaj',
  // Toolbar titles
  datePickerToolbarTitle: 'Wybierz datę',
  dateTimePickerToolbarTitle: 'Wybierz datę i czas',
  timePickerToolbarTitle: 'Wybierz czas',
  dateRangePickerToolbarTitle: 'Wybierz zakres dat',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Wybierz ${timeViews[view]}. ${time === null ? 'Nie wybrano czasu' : `Wybrany czas to ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} godzin`,
  minutesClockNumberText: minutes => `${minutes} minut`,
  secondsClockNumberText: seconds => `${seconds} sekund`,
  // Digital clock labels
  selectViewText: view => `Wybierz ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Numer tygodnia',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Tydzień ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value != null && utils.isValid(value) ? `Wybierz datę, obecnie wybrana data to ${utils.format(value, 'fullDate')}` : 'Wybierz datę',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Wybierz czas, obecnie wybrany czas to ${utils.format(value, 'fullTime')}` : 'Wybierz czas',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'wybierz czas',
  dateTableLabel: 'wybierz datę'

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
export const plPL = getPickersLocalization(plPLPickers);