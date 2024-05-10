import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  meridiem: 'Meridiano'
};
const esESPickers = {
  // Calendar navigation
  previousMonth: 'Mes anterior',
  nextMonth: 'Mes siguiente',
  // View navigation
  openPreviousView: 'Abrir la última vista',
  openNextView: 'Abrir la siguiente vista',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'la vista anual está abierta, cambie a la vista de calendario' : 'la vista de calendario está abierta, cambie a la vista anual',
  // DateRange labels
  start: 'Empezar',
  end: 'Terminar',
  startDate: 'Fecha inicio',
  startTime: 'Hora inicio',
  endDate: 'Fecha final',
  endTime: 'Hora final',
  // Action bar
  cancelButtonLabel: 'Cancelar',
  clearButtonLabel: 'Limpiar',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Hoy',
  // Toolbar titles
  datePickerToolbarTitle: 'Seleccionar fecha',
  dateTimePickerToolbarTitle: 'Seleccionar fecha y hora',
  timePickerToolbarTitle: 'Seleccionar hora',
  dateRangePickerToolbarTitle: 'Seleccionar rango de fecha',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Seleccione ${views[view]}. ${time === null ? 'No hay hora seleccionada' : `La hora seleccionada es ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} horas`,
  minutesClockNumberText: minutes => `${minutes} minutos`,
  secondsClockNumberText: seconds => `${seconds} segundos`,
  // Digital clock labels
  selectViewText: view => `Seleccionar ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Número de semana',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Semana ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Elige fecha, la fecha elegida es ${utils.format(value, 'fullDate')}` : 'Elige fecha',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Elige hora, la hora elegida es ${utils.format(value, 'fullTime')}` : 'Elige hora',
  fieldClearLabel: 'Limpiar valor',
  // Table labels
  timeTableLabel: 'elige hora',
  dateTableLabel: 'elige fecha',
  // Field section placeholders
  fieldYearPlaceholder: params => 'A'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
  // View names
  year: 'Año',
  month: 'Mes',
  day: 'Dia',
  weekDay: 'Dia de la semana',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  meridiem: 'Meridiano',
  // Common
  empty: 'Vacío'
};
export const esES = getPickersLocalization(esESPickers);