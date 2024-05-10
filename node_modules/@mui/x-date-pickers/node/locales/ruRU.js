"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruRU = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
// Translation map for Clock Label
const timeViews = {
  hours: 'часы',
  minutes: 'минуты',
  seconds: 'секунды',
  meridiem: 'меридием'
};
const ruRUPickers = {
  // Calendar navigation
  previousMonth: 'Предыдущий месяц',
  nextMonth: 'Следующий месяц',
  // View navigation
  openPreviousView: 'Открыть предыдущий вид',
  openNextView: 'Открыть следующий вид',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'открыт годовой вид, переключить на календарный вид' : 'открыт календарный вид, переключить на годовой вид',
  // DateRange labels
  start: 'Начало',
  end: 'Конец',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Отмена',
  clearButtonLabel: 'Очистить',
  okButtonLabel: 'Ок',
  todayButtonLabel: 'Сегодня',
  // Toolbar titles
  datePickerToolbarTitle: 'Выбрать дату',
  dateTimePickerToolbarTitle: 'Выбрать дату и время',
  timePickerToolbarTitle: 'Выбрать время',
  dateRangePickerToolbarTitle: 'Выбрать период',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Выбрать ${timeViews[view]}. ${time === null ? 'Время не выбрано' : `Выбрано время ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} часов`,
  minutesClockNumberText: minutes => `${minutes} минут`,
  secondsClockNumberText: seconds => `${seconds} секунд`,
  // Digital clock labels
  selectViewText: view => `Выбрать ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Номер недели',
  calendarWeekNumberHeaderText: '№',
  calendarWeekNumberAriaLabelText: weekNumber => `Неделя ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Выберите дату, выбрана дата ${utils.format(value, 'fullDate')}` : 'Выберите дату',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Выберите время, выбрано время ${utils.format(value, 'fullTime')}` : 'Выберите время',
  fieldClearLabel: 'Очистить значение',
  // Table labels
  timeTableLabel: 'выбрать время',
  dateTableLabel: 'выбрать дату',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Г'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'ММММ' : 'ММ',
  fieldDayPlaceholder: () => 'ДД',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'чч',
  fieldMinutesPlaceholder: () => 'мм',
  fieldSecondsPlaceholder: () => 'сс',
  fieldMeridiemPlaceholder: () => '(д|п)п'

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
const ruRU = exports.ruRU = (0, _getPickersLocalization.getPickersLocalization)(ruRUPickers);