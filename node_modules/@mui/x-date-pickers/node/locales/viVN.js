"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viVN = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const views = {
  hours: 'giờ',
  minutes: 'phút',
  seconds: 'giây',
  meridiem: 'buổi'
};
const viVNPickers = {
  // Calendar navigation
  previousMonth: 'Tháng trước',
  nextMonth: 'Tháng sau',
  // View navigation
  openPreviousView: 'Mở xem trước',
  openNextView: 'Mở xem sau',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'đang mở xem năm, chuyển sang xem lịch' : 'đang mở xem lịch, chuyển sang xem năm',
  // DateRange labels
  start: 'Bắt đầu',
  end: 'Kết thúc',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Hủy',
  clearButtonLabel: 'Xóa',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Hôm nay',
  // Toolbar titles
  datePickerToolbarTitle: 'Chọn ngày',
  dateTimePickerToolbarTitle: 'Chọn ngày và giờ',
  timePickerToolbarTitle: 'Chọn giờ',
  dateRangePickerToolbarTitle: 'Chọn khoảng ngày',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Chọn ${views[view]}. ${time === null ? 'Không có giờ được chọn' : `Giờ được chọn là ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} giờ`,
  minutesClockNumberText: minutes => `${minutes} phút`,
  secondsClockNumberText: seconds => `${seconds} giây`,
  // Digital clock labels
  selectViewText: view => `Chọn ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Số tuần',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Tuần ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Chọn ngày, ngày đã chọn là ${utils.format(value, 'fullDate')}` : 'Chọn ngày',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Chọn giờ, giờ đã chọn là ${utils.format(value, 'fullTime')}` : 'Chọn giờ',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'chọn giờ',
  dateTableLabel: 'chọn ngày',
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
const viVN = exports.viVN = (0, _getPickersLocalization.getPickersLocalization)(viVNPickers);