import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  hours: 'ώρες',
  minutes: 'λεπτά',
  seconds: 'δευτερόλεπτα',
  meridiem: 'μεσημβρία'
};
const elGRPickers = {
  // Calendar navigation
  previousMonth: 'Προηγούμενος μήνας',
  nextMonth: 'Επόμενος μήνας',
  // View navigation
  openPreviousView: 'Άνοίγμα προηγούμενης προβολή',
  openNextView: 'Άνοίγμα επόμενης προβολή',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'η προβολή έτους είναι ανοιχτή, μεταβείτε στην προβολή ημερολογίου' : 'η προβολή ημερολογίου είναι ανοιχτή, μεταβείτε στην προβολή έτους',
  // DateRange labels
  start: 'Αρχή',
  end: 'Τέλος',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Άκυρο',
  clearButtonLabel: 'Καθαρισμός',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Σήμερα',
  // Toolbar titles
  datePickerToolbarTitle: 'Επιλέξτε ημερομηνία',
  dateTimePickerToolbarTitle: 'Επιλέξτε ημερομηνία και ώρα',
  timePickerToolbarTitle: 'Επιλέξτε ώρα',
  dateRangePickerToolbarTitle: 'Επιλέξτε εύρος ημερομηνιών',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Επιλέξτε ${views[view]}. ${time === null ? 'Δεν έχει επιλεγεί ώρα' : `Η επιλεγμένη ώρα είναι ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} ώρες`,
  minutesClockNumberText: minutes => `${minutes} λεπτά`,
  secondsClockNumberText: seconds => `${seconds} δευτερόλεπτα`,
  // Digital clock labels
  selectViewText: view => `Επιλέξτε ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Αριθμός εβδομάδας',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Εβδομάδα ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Επιλέξτε ημερομηνία, η επιλεγμένη ημερομηνία είναι ${utils.format(value, 'fullDate')}` : 'Επιλέξτε ημερομηνία',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Επιλέξτε ώρα, η επιλεγμένη ώρα είναι ${utils.format(value, 'fullTime')}` : 'Επιλέξτε ώρα',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'επιλέξτε ώρα',
  dateTableLabel: 'επιλέξτε ημερομηνία',
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
export const elGR = getPickersLocalization(elGRPickers);