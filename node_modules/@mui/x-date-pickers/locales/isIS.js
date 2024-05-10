import { getPickersLocalization } from './utils/getPickersLocalization';
const timeViews = {
  hours: 'klukkustundir',
  minutes: 'mínútur',
  seconds: 'sekúndur',
  meridiem: 'eftirmiðdagur'
};
const isISPickers = {
  // Calendar navigation
  previousMonth: 'Fyrri mánuður',
  nextMonth: 'Næsti mánuður',
  // View navigation
  openPreviousView: 'Opna fyrri skoðun',
  openNextView: 'Opna næstu skoðun',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'ársskoðun er opin, skipta yfir í dagatalsskoðun' : 'dagatalsskoðun er opin, skipta yfir í ársskoðun',
  // DateRange labels
  start: 'Upphaf',
  end: 'Endir',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Hætta við',
  clearButtonLabel: 'Hreinsa',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Í dag',
  // Toolbar titles
  datePickerToolbarTitle: 'Velja dagsetningu',
  dateTimePickerToolbarTitle: 'Velja dagsetningu og tíma',
  timePickerToolbarTitle: 'Velja tíma',
  dateRangePickerToolbarTitle: 'Velja tímabil',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Velja ${timeViews[view]}. ${time === null ? 'Enginn tími valinn' : `Valinn tími er ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} klukkustundir`,
  minutesClockNumberText: minutes => `${minutes} mínútur`,
  secondsClockNumberText: seconds => `${seconds} sekúndur`,
  // Digital clock labels
  selectViewText: view => `Velja ${timeViews[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Vikunúmer',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Vika ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velja dagsetningu, valin dagsetning er ${utils.format(value, 'fullDate')}` : 'Velja dagsetningu',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Velja tíma, valinn tími er ${utils.format(value, 'fullTime')}` : 'Velja tíma',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'velja tíma',
  dateTableLabel: 'velja dagsetningu',
  // Field section placeholders
  fieldYearPlaceholder: params => 'Á'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'kk',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'ee'

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
export const isIS = getPickersLocalization(isISPickers);