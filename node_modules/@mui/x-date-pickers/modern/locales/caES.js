import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  hours: 'Hores',
  minutes: 'Minuts',
  seconds: 'Segons',
  meridiem: 'Meridià'
};
const caESPickers = {
  // Calendar navigation
  previousMonth: 'Mes anterior',
  nextMonth: 'Mes següent',
  // View navigation
  openPreviousView: "Obrir l'última vista",
  openNextView: 'Obrir la següent vista',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'la vista anual està oberta, canvia a la vista de calendari' : 'la vista de calendari està oberta, canvia a la vista anual',
  // DateRange labels
  start: 'Començar',
  end: 'Terminar',
  startDate: 'Data inicial',
  startTime: 'Hora inicial',
  endDate: 'Data final',
  endTime: 'Hora final',
  // Action bar
  cancelButtonLabel: 'Cancel·lar',
  clearButtonLabel: 'Netejar',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Avuí',
  // Toolbar titles
  datePickerToolbarTitle: 'Seleccionar data',
  dateTimePickerToolbarTitle: 'Seleccionar data i hora',
  timePickerToolbarTitle: 'Seleccionar hora',
  dateRangePickerToolbarTitle: 'Seleccionar rang de dates',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Selecciona ${views[view]}. ${time === null ? 'Hora no seleccionada' : `L'hora seleccionada és ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} hores`,
  minutesClockNumberText: minutes => `${minutes} minuts`,
  secondsClockNumberText: seconds => `${seconds} segons`,
  // Digital clock labels
  selectViewText: view => `Seleccionar ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Número de la setmana',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Setmana ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Tria la data, la data triada és ${utils.format(value, 'fullDate')}` : 'Tria la data',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Tria l'hora, l'hora triada és ${utils.format(value, 'fullTime')}` : "Tria l'hora",
  fieldClearLabel: 'Netega el valor',
  // Table labels
  timeTableLabel: 'tria la data',
  dateTableLabel: "tria l'hora",
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
  year: 'Any',
  month: 'Mes',
  day: 'Dia',
  weekDay: 'Dia de la setmana',
  hours: 'Hores',
  minutes: 'Minuts',
  seconds: 'Segons',
  meridiem: 'Meridià',
  // Common
  empty: 'Buit'
};
export const caES = getPickersLocalization(caESPickers);