"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zhHK = void 0;
var _getPickersLocalization = require("./utils/getPickersLocalization");
const views = {
  hours: '小時',
  minutes: '分鐘',
  seconds: '秒',
  meridiem: '子午線'
};
const zhHKPickers = {
  // Calendar navigation
  previousMonth: '上個月',
  nextMonth: '下個月',
  // View navigation
  openPreviousView: '前一個檢視表',
  openNextView: '下一個檢視表',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? '年份檢視表已打開，切換以檢視日曆' : '日曆檢視表已打開，切換以檢視年份',
  // DateRange labels
  start: '開始',
  end: '結束',
  startDate: '開始日期',
  startTime: '開始時間',
  endDate: '結束日期',
  endTime: '結束時間',
  // Action bar
  cancelButtonLabel: '取消',
  clearButtonLabel: '清除',
  okButtonLabel: '確認',
  todayButtonLabel: '今日',
  // Toolbar titles
  datePickerToolbarTitle: '選擇日期',
  dateTimePickerToolbarTitle: '選擇日期和時間',
  timePickerToolbarTitle: '選擇時間',
  dateRangePickerToolbarTitle: '選擇時間範圍',
  // Clock labels
  clockLabelText: (view, time, adapter) => `選擇 ${views[view]}. ${time === null ? '未選擇時間' : `已選擇${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours}小時`,
  minutesClockNumberText: minutes => `${minutes}分鐘`,
  secondsClockNumberText: seconds => `${seconds}秒`,
  // Digital clock labels
  selectViewText: view => `選擇 ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: '週數',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `第${weekNumber}週`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `選擇日期，已選擇${utils.format(value, 'fullDate')}` : '選擇日期',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `選擇時間，已選擇${utils.format(value, 'fullTime')}` : '選擇時間',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: '選擇時間',
  dateTableLabel: '選擇日期',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
  // View names
  year: '年',
  month: '月',
  day: '日',
  weekDay: '星期',
  hours: '小時',
  minutes: '分鐘',
  seconds: '秒',
  meridiem: '子午線',
  // Common
  empty: '空值'
};
const zhHK = exports.zhHK = (0, _getPickersLocalization.getPickersLocalization)(zhHKPickers);