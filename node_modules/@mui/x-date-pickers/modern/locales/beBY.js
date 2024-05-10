import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  // maps TimeView to its translation
  hours: 'гадзіны',
  minutes: 'хвіліны',
  seconds: 'секунды',
  meridiem: 'мерыдыем'
};
const beBYPickers = {
  // Calendar navigation
  previousMonth: 'Папярэдні месяц',
  nextMonth: 'Наступны месяц',
  // View navigation
  openPreviousView: 'Aдкрыць папярэдні выгляд',
  openNextView: 'Aдкрыць наступны выгляд',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'гадавы выгляд адкрыты, перайсці да каляндарнага выгляду' : 'каляндарны выгляд адкрыты, перайсці да гадавога выгляду',
  // DateRange labels
  start: 'Пачатак',
  end: 'Канец',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Адмена',
  clearButtonLabel: 'Ачысціць',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Сёння',
  // Toolbar titles
  datePickerToolbarTitle: 'Абраць дату',
  dateTimePickerToolbarTitle: 'Абраць дату і час',
  timePickerToolbarTitle: 'Абраць час',
  dateRangePickerToolbarTitle: 'Абраць каляндарны перыяд',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Абярыце ${views[view]}. ${time === null ? 'Час не абраны' : `Абраны час ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} гадзін`,
  minutesClockNumberText: minutes => `${minutes} хвілін`,
  secondsClockNumberText: seconds => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: view => `Абярыце ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Нумар тыдня',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Тыдзень ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Абраць дату, абрана дата  ${utils.format(value, 'fullDate')}` : 'Абраць дату',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Абраць час, абрыны час  ${utils.format(value, 'fullTime')}` : 'Абраць час',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'абраць час',
  dateTableLabel: 'абраць дату',
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
export const beBY = getPickersLocalization(beBYPickers);