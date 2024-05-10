"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ukUA = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const getPluralForm = (count, options) => {
  let pluralForm = options.many;
  const lastDigit = count % 10;
  if (lastDigit > 1 && lastDigit < 5) {
    pluralForm = options.few;
  } else if (lastDigit === 1) {
    pluralForm = options.one;
  }
  return `${count} ${pluralForm}`;
};
const ukUAGrid = {
  // Root
  noRowsLabel: 'Немає рядків',
  noResultsOverlayLabel: 'Дані не знайдено.',
  // Density selector toolbar button text
  toolbarDensity: 'Висота рядка',
  toolbarDensityLabel: 'Висота рядка',
  toolbarDensityCompact: 'Компактний',
  toolbarDensityStandard: 'Стандартний',
  toolbarDensityComfortable: 'Комфортний',
  // Columns selector toolbar button text
  toolbarColumns: 'Стовпці',
  toolbarColumnsLabel: 'Виділіть стовпці',
  // Filters toolbar button text
  toolbarFilters: 'Фільтри',
  toolbarFiltersLabel: 'Показати фільтри',
  toolbarFiltersTooltipHide: 'Приховати фільтри',
  toolbarFiltersTooltipShow: 'Показати фільтри',
  toolbarFiltersTooltipActive: count => getPluralForm(count, {
    one: 'активний фільтр',
    few: 'активні фільтри',
    many: 'активних фільтрів'
  }),
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Пошук…',
  toolbarQuickFilterLabel: 'Пошук',
  toolbarQuickFilterDeleteIconLabel: 'Очистити',
  // Export selector toolbar button text
  toolbarExport: 'Експорт',
  toolbarExportLabel: 'Експорт',
  toolbarExportCSV: 'Завантажити у форматі CSV',
  toolbarExportPrint: 'Друк',
  toolbarExportExcel: 'Завантажити у форматі Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Додати фільтр',
  filterPanelRemoveAll: 'Видалити всі',
  filterPanelDeleteIconLabel: 'Видалити',
  filterPanelLogicOperator: 'Логічна функція',
  filterPanelOperator: 'Оператори',
  filterPanelOperatorAnd: 'І',
  filterPanelOperatorOr: 'Або',
  filterPanelColumns: 'Стовпці',
  filterPanelInputLabel: 'Значення',
  filterPanelInputPlaceholder: 'Значення фільтра',
  // Filter operators text
  filterOperatorContains: 'містить',
  filterOperatorEquals: 'дорівнює',
  filterOperatorStartsWith: 'починається з',
  filterOperatorEndsWith: 'закінчується на',
  filterOperatorIs: 'дорівнює',
  filterOperatorNot: 'не дорівнює',
  filterOperatorAfter: 'більше ніж',
  filterOperatorOnOrAfter: 'більше або дорівнює',
  filterOperatorBefore: 'менше ніж',
  filterOperatorOnOrBefore: 'менше або дорівнює',
  filterOperatorIsEmpty: 'порожній',
  filterOperatorIsNotEmpty: 'не порожній',
  filterOperatorIsAnyOf: 'будь-що із',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Містить',
  headerFilterOperatorEquals: 'Дорівнює',
  headerFilterOperatorStartsWith: 'Починається з',
  headerFilterOperatorEndsWith: 'Закінчується на',
  headerFilterOperatorIs: 'Дорівнює',
  headerFilterOperatorNot: 'Не дорівнює',
  headerFilterOperatorAfter: 'Після',
  headerFilterOperatorOnOrAfter: 'Після (включаючи)',
  headerFilterOperatorBefore: 'Раніше',
  headerFilterOperatorOnOrBefore: 'Раніше (включаючи)',
  headerFilterOperatorIsEmpty: 'Порожнє',
  headerFilterOperatorIsNotEmpty: 'Не порожнє',
  headerFilterOperatorIsAnyOf: 'Будь-що із',
  'headerFilterOperator=': 'Дорівнює',
  'headerFilterOperator!=': 'Не дорівнює',
  'headerFilterOperator>': 'Більше ніж',
  'headerFilterOperator>=': 'Більше або дорівнює',
  'headerFilterOperator<': 'Менше ніж',
  'headerFilterOperator<=': 'Менше або дорівнює',
  // Filter values text
  filterValueAny: 'будь-який',
  filterValueTrue: 'так',
  filterValueFalse: 'ні',
  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показати стовпці',
  columnMenuManageColumns: 'Керування стовпцями',
  columnMenuFilter: 'Фільтр',
  columnMenuHideColumn: 'Приховати',
  columnMenuUnsort: 'Скасувати сортування',
  columnMenuSortAsc: 'Сортувати за зростанням',
  columnMenuSortDesc: 'Сортувати за спаданням',
  // Column header text
  columnHeaderFiltersTooltipActive: count => getPluralForm(count, {
    one: 'активний фільтр',
    few: 'активні фільтри',
    many: 'активних фільтрів'
  }),
  columnHeaderFiltersLabel: 'Показати фільтри',
  columnHeaderSortIconLabel: 'Сортувати',
  // Rows selected footer text
  footerRowSelected: count => getPluralForm(count, {
    one: 'вибраний рядок',
    few: 'вибрані рядки',
    many: 'вибраних рядків'
  }),
  // Total row amount footer text
  footerTotalRows: 'Усього рядків:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} з ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Вибір прапорця',
  checkboxSelectionSelectAllRows: 'Вибрати всі рядки',
  checkboxSelectionUnselectAllRows: 'Скасувати вибір всіх рядків',
  checkboxSelectionSelectRow: 'Вибрати рядок',
  checkboxSelectionUnselectRow: 'Скасувати вибір рядка',
  // Boolean cell text
  booleanCellTrueLabel: 'так',
  booleanCellFalseLabel: 'ні',
  // Actions cell more text
  actionsCellMore: 'більше',
  // Column pinning text
  pinToLeft: 'Закріпити ліворуч',
  pinToRight: 'Закріпити праворуч',
  unpin: 'Відкріпити',
  // Tree Data
  treeDataGroupingHeaderName: 'Група',
  treeDataExpand: 'показати дочірні елементи',
  treeDataCollapse: 'приховати дочірні елементи',
  // Grouping columns
  groupingColumnHeaderName: 'Група',
  groupColumn: name => `Групувати за ${name}`,
  unGroupColumn: name => `Відмінити групування за ${name}`,
  // Master/detail
  detailPanelToggle: 'Перемикач панелі деталей',
  expandDetailPanel: 'Показати',
  collapseDetailPanel: 'Приховати',
  // Row reordering text
  rowReorderingHeaderName: 'Порядок рядків',
  // Aggregation
  aggregationMenuItemHeader: 'Агрегація',
  aggregationFunctionLabelSum: 'сума',
  aggregationFunctionLabelAvg: 'сер',
  aggregationFunctionLabelMin: 'мін',
  aggregationFunctionLabelMax: 'макс',
  aggregationFunctionLabelSize: 'кількість'
};
const ukUA = exports.ukUA = (0, _getGridLocalization.getGridLocalization)(ukUAGrid, _locale.ukUA);