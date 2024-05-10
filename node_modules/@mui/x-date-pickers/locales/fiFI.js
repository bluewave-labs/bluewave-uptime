import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  hours: 'tunnit',
  minutes: 'minuutit',
  seconds: 'sekuntit',
  meridiem: 'iltapäivä'
};
const fiFIPickers = {
  // Calendar navigation
  previousMonth: 'Edellinen kuukausi',
  nextMonth: 'Seuraava kuukausi',
  // View navigation
  openPreviousView: 'Avaa edellinen kuukausi',
  openNextView: 'Avaa seuraava kuukausi',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'vuosinäkymä on auki, vaihda kalenterinäkymään' : 'kalenterinäkymä on auki, vaihda vuosinäkymään',
  // DateRange labels
  start: 'Alku',
  end: 'Loppu',
  // startDate: 'Start date',
  // startTime: 'Start time',
  // endDate: 'End date',
  // endTime: 'End time',

  // Action bar
  cancelButtonLabel: 'Peruuta',
  clearButtonLabel: 'Tyhjennä',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Tänään',
  // Toolbar titles
  datePickerToolbarTitle: 'Valitse päivä',
  dateTimePickerToolbarTitle: 'Valitse päivä ja aika',
  timePickerToolbarTitle: 'Valitse aika',
  dateRangePickerToolbarTitle: 'Valitse aikaväli',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Valitse ${views[view]}. ${time === null ? 'Ei aikaa valittuna' : `Valittu aika on ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} tuntia`,
  minutesClockNumberText: minutes => `${minutes} minuuttia`,
  secondsClockNumberText: seconds => `${seconds} sekunttia`,
  // Digital clock labels
  selectViewText: view => `Valitse ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Viikko',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Viikko ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Valitse päivä, valittu päivä on ${utils.format(value, 'fullDate')}` : 'Valitse päivä',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Valitse aika, valittu aika on ${utils.format(value, 'fullTime')}` : 'Valitse aika',
  // fieldClearLabel: 'Clear value',

  // Table labels
  timeTableLabel: 'valitse aika',
  dateTableLabel: 'valitse päivä',
  // Field section placeholders
  fieldYearPlaceholder: params => 'V'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'KKKK' : 'KK',
  fieldDayPlaceholder: () => 'PP',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'tt',
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
export const fiFI = getPickersLocalization(fiFIPickers);