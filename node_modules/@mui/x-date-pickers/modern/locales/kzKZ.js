import { getPickersLocalization } from './utils/getPickersLocalization';
// Translation map for Clock Label
const timeViews = {
  hours: 'Сағатты',
  minutes: 'Минутты',
  seconds: 'Секундты',
  meridiem: 'Меридием'
};
const kzKZPickers = {
  // Calendar navigation
  previousMonth: 'Алдыңғы ай',
  nextMonth: 'Келесі ай',
  // View navigation
  openPreviousView: 'Алдыңғы көріністі ашу',
  openNextView: 'Келесі көріністі ашу',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'жылдық көріністі ашу, күнтізбе көрінісіне ауысу' : 'күнтізбе көрінісін ашу, жылдық көрінісіне ауысу',
  // DateRange labels
  start: 'Бастау',
  end: 'Cоңы',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Бас тарту',
  clearButtonLabel: 'Тазарту',
  okButtonLabel: 'Ок',
  todayButtonLabel: 'Бүгін',
  // Toolbar titles
  datePickerToolbarTitle: 'Күнді таңдау',
  dateTimePickerToolbarTitle: 'Күн мен уақытты таңдау',
  timePickerToolbarTitle: 'Уақытты таңдау',
  dateRangePickerToolbarTitle: 'Кезеңді таңдаңыз',
  // Clock labels
  clockLabelText: (view, time, adapter) => `${timeViews[view]} таңдау. ${time === null ? 'Уақыт таңдалмаған' : `Таңдалған уақыт ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} сағат`,
  minutesClockNumberText: minutes => `${minutes} минут`,
  secondsClockNumberText: seconds => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: view => `${timeViews[view]} таңдау`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Апта нөмірі',
  calendarWeekNumberHeaderText: '№',
  calendarWeekNumberAriaLabelText: weekNumber => `Апта ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Күнді таңдаңыз, таңдалған күн ${utils.format(value, 'fullDate')}` : 'Күнді таңдаңыз',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Уақытты таңдаңыз, таңдалған уақыт ${utils.format(value, 'fullTime')}` : 'Уақытты таңдаңыз',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'уақытты таңдау',
  dateTableLabel: 'күнді таңдау',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Ж'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'AAAA' : 'AA',
  fieldDayPlaceholder: () => 'КК',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'сс',
  fieldMinutesPlaceholder: () => 'мм',
  fieldSecondsPlaceholder: () => 'сс',
  fieldMeridiemPlaceholder: () => '(т|к)'

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
export const kzKZ = getPickersLocalization(kzKZPickers);