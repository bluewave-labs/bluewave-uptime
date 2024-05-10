"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.koKR = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const views = {
  hours: '시간을',
  minutes: '분을',
  seconds: '초를',
  meridiem: '메리디엠'
};
const koKRPickers = {
  // Calendar navigation
  previousMonth: '이전 달',
  nextMonth: '다음 달',
  // View navigation
  openPreviousView: '이전 화면 보기',
  openNextView: '다음 화면 보기',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? '연도 선택 화면에서 달력 화면으로 전환하기' : '달력 화면에서 연도 선택 화면으로 전환하기',
  // DateRange labels
  start: '시작',
  end: '종료',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: '취소',
  clearButtonLabel: '초기화',
  okButtonLabel: '확인',
  todayButtonLabel: '오늘',
  // Toolbar titles
  datePickerToolbarTitle: '날짜 선택하기',
  dateTimePickerToolbarTitle: '날짜 & 시간 선택하기',
  timePickerToolbarTitle: '시간 선택하기',
  dateRangePickerToolbarTitle: '날짜 범위 선택하기',
  // Clock labels
  clockLabelText: (view, time, adapter) => `${views[view]} 선택하세요. ${time === null ? '시간을 선택하지 않았습니다.' : `현재 선택된 시간은 ${adapter.format(time, 'fullTime')}입니다.`}`,
  hoursClockNumberText: hours => `${hours}시간`,
  minutesClockNumberText: minutes => `${minutes}분`,
  secondsClockNumberText: seconds => `${seconds}초`,
  // Digital clock labels
  selectViewText: view => `${views[view]} 선택하기`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: '주 번호',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `${weekNumber}번째 주`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `날짜를 선택하세요. 현재 선택된 날짜는 ${utils.format(value, 'fullDate')}입니다.` : '날짜를 선택하세요',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `시간을 선택하세요. 현재 선택된 시간은 ${utils.format(value, 'fullTime')}입니다.` : '시간을 선택하세요',
  fieldClearLabel: '지우기',
  // Table labels
  timeTableLabel: '선택한 시간',
  dateTableLabel: '선택한 날짜',
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
const koKR = exports.koKR = (0, _getPickersLocalization.getPickersLocalization)(koKRPickers);