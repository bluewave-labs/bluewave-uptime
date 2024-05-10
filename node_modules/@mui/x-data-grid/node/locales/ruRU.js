"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruRU = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const ruRUGrid = {
  // Root
  noRowsLabel: 'Нет строк',
  noResultsOverlayLabel: 'Данные не найдены.',
  // Density selector toolbar button text
  toolbarDensity: 'Высота строки',
  toolbarDensityLabel: 'Высота строки',
  toolbarDensityCompact: 'Компактная',
  toolbarDensityStandard: 'Стандартная',
  toolbarDensityComfortable: 'Комфортная',
  // Columns selector toolbar button text
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выделите столбцы',
  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Скрыть фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: count => {
    let pluralForm = 'активных фильтров';
    const lastDigit = count % 10;
    if (lastDigit > 1 && lastDigit < 5) {
      pluralForm = 'активных фильтра';
    } else if (lastDigit === 1) {
      pluralForm = 'активный фильтр';
    }
    return `${count} ${pluralForm}`;
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Поиск…',
  toolbarQuickFilterLabel: 'Поиск',
  toolbarQuickFilterDeleteIconLabel: 'Очистить',
  // Export selector toolbar button text
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать в формате CSV',
  toolbarExportPrint: 'Печать',
  toolbarExportExcel: 'Скачать в формате Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelRemoveAll: 'Очистить фильтр',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelLogicOperator: 'Логические операторы',
  filterPanelOperator: 'Операторы',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Столбцы',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',
  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равен',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'равен',
  filterOperatorNot: 'не равен',
  filterOperatorAfter: 'больше чем',
  filterOperatorOnOrAfter: 'больше или равно',
  filterOperatorBefore: 'меньше чем',
  filterOperatorOnOrBefore: 'меньше или равно',
  filterOperatorIsEmpty: 'пустой',
  filterOperatorIsNotEmpty: 'не пустой',
  filterOperatorIsAnyOf: 'любой из',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'содержит',
  headerFilterOperatorEquals: 'равен',
  headerFilterOperatorStartsWith: 'начинается с',
  headerFilterOperatorEndsWith: 'заканчивается на',
  headerFilterOperatorIs: 'равен',
  headerFilterOperatorNot: 'не равен',
  headerFilterOperatorAfter: 'больше чем',
  headerFilterOperatorOnOrAfter: 'больше или равно',
  headerFilterOperatorBefore: 'меньше чем',
  headerFilterOperatorOnOrBefore: 'меньше или равно',
  headerFilterOperatorIsEmpty: 'пустой',
  headerFilterOperatorIsNotEmpty: 'не пустой',
  headerFilterOperatorIsAnyOf: 'любой из',
  'headerFilterOperator=': 'содержит',
  'headerFilterOperator!=': 'не содержит',
  'headerFilterOperator>': 'больше чем',
  'headerFilterOperator>=': 'больше или равно',
  'headerFilterOperator<': 'меньше чем',
  'headerFilterOperator<=': 'меньше или равно',
  // Filter values text
  filterValueAny: 'любой',
  filterValueTrue: 'истина',
  filterValueFalse: 'ложь',
  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать столбцы',
  columnMenuManageColumns: 'Управление колонками',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть',
  columnMenuUnsort: 'Отменить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',
  // Column header text
  columnHeaderFiltersTooltipActive: count => {
    let pluralForm = 'активных фильтров';
    const lastDigit = count % 10;
    if (lastDigit > 1 && lastDigit < 5) {
      pluralForm = 'активных фильтра';
    } else if (lastDigit === 1) {
      pluralForm = 'активный фильтр';
    }
    return `${count} ${pluralForm}`;
  },
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировать',
  // Rows selected footer text
  footerRowSelected: count => {
    let pluralForm = 'строк выбрано';
    const lastDigit = count % 10;
    if (lastDigit > 1 && lastDigit < 5) {
      pluralForm = 'строки выбраны';
    } else if (lastDigit === 1) {
      pluralForm = 'строка выбрана';
    }
    return `${count} ${pluralForm}`;
  },
  // Total row amount footer text
  footerTotalRows: 'Всего строк:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Выбор флажка',
  checkboxSelectionSelectAllRows: 'Выбрать все строки',
  checkboxSelectionUnselectAllRows: 'Отменить выбор всех строк',
  checkboxSelectionSelectRow: 'Выбрать строку',
  checkboxSelectionUnselectRow: 'Отменить выбор строки',
  // Boolean cell text
  booleanCellTrueLabel: 'истина',
  booleanCellFalseLabel: 'ложь',
  // Actions cell more text
  actionsCellMore: 'ещё',
  // Column pinning text
  pinToLeft: 'Закрепить слева',
  pinToRight: 'Закрепить справа',
  unpin: 'Открепить',
  // Tree Data
  treeDataGroupingHeaderName: 'Группа',
  treeDataExpand: 'показать дочерние элементы',
  treeDataCollapse: 'скрыть дочерние элементы',
  // Grouping columns
  groupingColumnHeaderName: 'Группа',
  groupColumn: name => `Сгруппировать по ${name}`,
  unGroupColumn: name => `Разгруппировать по ${name}`,
  // Master/detail
  detailPanelToggle: 'Детали',
  expandDetailPanel: 'Развернуть',
  collapseDetailPanel: 'Свернуть',
  // Row reordering text
  rowReorderingHeaderName: 'Изменение порядка строк',
  // Aggregation
  aggregationMenuItemHeader: 'Объединение данных',
  aggregationFunctionLabelSum: 'сумм',
  aggregationFunctionLabelAvg: 'срзнач',
  aggregationFunctionLabelMin: 'мин',
  aggregationFunctionLabelMax: 'макс',
  aggregationFunctionLabelSize: 'счет'
};
const ruRU = exports.ruRU = (0, _getGridLocalization.getGridLocalization)(ruRUGrid, _locale.ruRU);