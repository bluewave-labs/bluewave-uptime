import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  hours: '小时',
  minutes: '分钟',
  seconds: '秒',
  meridiem: '十二小时制'
};
const zhCNPickers = {
  // Calendar navigation
  previousMonth: '上个月',
  nextMonth: '下个月',
  // View navigation
  openPreviousView: '前一个视图',
  openNextView: '下一个视图',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? '年视图已打开，切换为日历视图' : '日历视图已打开，切换为年视图',
  // DateRange labels
  start: '开始',
  end: '结束',
  startDate: '开始日期',
  startTime: '开始时间',
  endDate: '结束日期',
  endTime: '结束时间',
  // Action bar
  cancelButtonLabel: '取消',
  clearButtonLabel: '清除',
  okButtonLabel: '确认',
  todayButtonLabel: '今天',
  // Toolbar titles
  datePickerToolbarTitle: '选择日期',
  dateTimePickerToolbarTitle: '选择日期和时间',
  timePickerToolbarTitle: '选择时间',
  dateRangePickerToolbarTitle: '选择时间范围',
  // Clock labels
  clockLabelText: (view, time, adapter) => `选择 ${views[view]}. ${time === null ? '未选择时间' : `已选择${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours}小时`,
  minutesClockNumberText: minutes => `${minutes}分钟`,
  secondsClockNumberText: seconds => `${seconds}秒`,
  // Digital clock labels
  selectViewText: view => `选择 ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: '周数',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `第${weekNumber}周`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `选择日期，已选择${utils.format(value, 'fullDate')}` : '选择日期',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `选择时间，已选择${utils.format(value, 'fullTime')}` : '选择时间',
  fieldClearLabel: '清除',
  // Table labels
  timeTableLabel: '选择时间',
  dateTableLabel: '选择日期',
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
  year: '年份',
  month: '月份',
  day: '日期',
  weekDay: '星期',
  hours: '时',
  minutes: '分',
  seconds: '秒',
  meridiem: '十二小时制',
  // Common
  empty: '空'
};
export const zhCN = getPickersLocalization(zhCNPickers);