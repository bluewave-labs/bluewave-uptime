import { getPickersLocalization } from './utils/getPickersLocalization';
const views = {
  hours: 'heures',
  minutes: 'minutes',
  seconds: 'secondes',
  meridiem: 'méridien'
};
const frFRPickers = {
  // Calendar navigation
  previousMonth: 'Mois précédent',
  nextMonth: 'Mois suivant',
  // View navigation
  openPreviousView: 'Ouvrir la vue précédente',
  openNextView: 'Ouvrir la vue suivante',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'La vue année est ouverte, ouvrir la vue calendrier' : 'La vue calendrier est ouverte, ouvrir la vue année',
  // DateRange labels
  start: 'Début',
  end: 'Fin',
  startDate: 'Date de début',
  startTime: 'Heure de début',
  endDate: 'Date de fin',
  endTime: 'Heure de fin',
  // Action bar
  cancelButtonLabel: 'Annuler',
  clearButtonLabel: 'Vider',
  okButtonLabel: 'OK',
  todayButtonLabel: "Aujourd'hui",
  // Toolbar titles
  datePickerToolbarTitle: 'Choisir une date',
  dateTimePickerToolbarTitle: "Choisir la date et l'heure",
  timePickerToolbarTitle: "Choisir l'heure",
  dateRangePickerToolbarTitle: 'Choisir la plage de dates',
  // Clock labels
  clockLabelText: (view, time, adapter) => `Choix des ${views[view]}. ${time === null ? 'Aucune heure choisie' : `L'heure choisie est ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: hours => `${hours} heures`,
  minutesClockNumberText: minutes => `${minutes} minutes`,
  secondsClockNumberText: seconds => `${seconds} secondes`,
  // Digital clock labels
  selectViewText: view => `Choisir ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Semaine',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: weekNumber => `Semaine ${weekNumber}`,
  calendarWeekNumberText: weekNumber => `${weekNumber}`,
  // Open picker labels
  openDatePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Choisir la date, la date sélectionnée est ${utils.format(value, 'fullDate')}` : 'Choisir la date',
  openTimePickerDialogue: (value, utils) => value !== null && utils.isValid(value) ? `Choisir l'heure, l'heure sélectionnée est ${utils.format(value, 'fullTime')}` : "Choisir l'heure",
  fieldClearLabel: 'Effacer la valeur',
  // Table labels
  timeTableLabel: "choix de l'heure",
  dateTableLabel: 'choix de la date',
  // Field section placeholders
  fieldYearPlaceholder: params => 'A'.repeat(params.digitAmount),
  fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'JJ',
  fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
  // View names
  year: 'Année',
  month: 'Mois',
  day: 'Jour',
  weekDay: 'Jour de la semaine',
  hours: 'Heures',
  minutes: 'Minutes',
  seconds: 'Secondes',
  meridiem: 'Méridien',
  // Common
  empty: 'Vider'
};
export const frFR = getPickersLocalization(frFRPickers);