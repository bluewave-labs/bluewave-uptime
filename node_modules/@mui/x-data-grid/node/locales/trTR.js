"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trTR = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const trTRGrid = {
  // Root
  noRowsLabel: 'Satır yok',
  noResultsOverlayLabel: 'Sonuç bulunamadı.',
  // Density selector toolbar button text
  toolbarDensity: 'Yoğunluk',
  toolbarDensityLabel: 'Yoğunluk',
  toolbarDensityCompact: 'Sıkı',
  toolbarDensityStandard: 'Standart',
  toolbarDensityComfortable: 'Rahat',
  // Columns selector toolbar button text
  toolbarColumns: 'Sütunlar',
  toolbarColumnsLabel: 'Sütun seç',
  // Filters toolbar button text
  toolbarFilters: 'Filtreler',
  toolbarFiltersLabel: 'Filtreleri göster',
  toolbarFiltersTooltipHide: 'Filtreleri gizle',
  toolbarFiltersTooltipShow: 'Filtreleri göster',
  toolbarFiltersTooltipActive: count => `${count} aktif filtre`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Ara…',
  toolbarQuickFilterLabel: 'Ara',
  toolbarQuickFilterDeleteIconLabel: 'Temizle',
  // Export selector toolbar button text
  toolbarExport: 'Dışa aktar',
  toolbarExportLabel: 'Dışa aktar',
  toolbarExportCSV: 'CSV olarak aktar',
  toolbarExportPrint: 'Yazdır',
  toolbarExportExcel: 'Excel olarak aktar',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Filtre Ekle',
  filterPanelRemoveAll: 'Hepsini kaldır',
  filterPanelDeleteIconLabel: 'Kaldır',
  filterPanelLogicOperator: 'Mantıksal operatörler',
  filterPanelOperator: 'Operatör',
  filterPanelOperatorAnd: 'Ve',
  filterPanelOperatorOr: 'Veya',
  filterPanelColumns: 'Sütunlar',
  filterPanelInputLabel: 'Değer',
  filterPanelInputPlaceholder: 'Filtre değeri',
  // Filter operators text
  filterOperatorContains: 'içerir',
  filterOperatorEquals: 'eşittir',
  filterOperatorStartsWith: 'ile başlar',
  filterOperatorEndsWith: 'ile biter',
  filterOperatorIs: 'eşittir',
  filterOperatorNot: 'eşit değildir',
  filterOperatorAfter: 'büyük',
  filterOperatorOnOrAfter: 'büyük eşit',
  filterOperatorBefore: 'küçük',
  filterOperatorOnOrBefore: 'küçük eşit',
  filterOperatorIsEmpty: 'boş',
  filterOperatorIsNotEmpty: 'dolu',
  filterOperatorIsAnyOf: 'herhangi biri',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Şunu içerir',
  headerFilterOperatorEquals: 'Şuna eşittir',
  headerFilterOperatorStartsWith: 'Şununla başlar',
  headerFilterOperatorEndsWith: 'Şununla biter',
  // headerFilterOperatorIs: 'Is',
  // headerFilterOperatorNot: 'Is not',
  // headerFilterOperatorAfter: 'Is after',
  // headerFilterOperatorOnOrAfter: 'Is on or after',
  // headerFilterOperatorBefore: 'Is before',
  // headerFilterOperatorOnOrBefore: 'Is on or before',
  // headerFilterOperatorIsEmpty: 'Is empty',
  // headerFilterOperatorIsNotEmpty: 'Is not empty',
  // headerFilterOperatorIsAnyOf: 'Is any of',
  // 'headerFilterOperator=': 'Equals',
  // 'headerFilterOperator!=': 'Not equals',
  // 'headerFilterOperator>': 'Greater than',
  // 'headerFilterOperator>=': 'Greater than or equal to',
  // 'headerFilterOperator<': 'Less than',
  // 'headerFilterOperator<=': 'Less than or equal to',

  // Filter values text
  filterValueAny: 'herhangi',
  filterValueTrue: 'doğru',
  filterValueFalse: 'yanlış',
  // Column menu text
  columnMenuLabel: 'Menü',
  columnMenuShowColumns: 'Sütunları göster',
  columnMenuManageColumns: 'Sütunları yönet',
  columnMenuFilter: 'Filtre Ekle',
  columnMenuHideColumn: 'Gizle',
  columnMenuUnsort: 'Varsayılan Sıralama',
  columnMenuSortAsc: 'Sırala - Artan',
  columnMenuSortDesc: 'Sırala - Azalan',
  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count} filtre aktif`,
  columnHeaderFiltersLabel: 'Filtreleri göster',
  columnHeaderSortIconLabel: 'Sırala',
  // Rows selected footer text
  footerRowSelected: count => `${count.toLocaleString()} satır seçildi`,
  // Total row amount footer text
  footerTotalRows: 'Toplam Satır:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seçim',
  checkboxSelectionSelectAllRows: 'Tüm satırları seç',
  checkboxSelectionUnselectAllRows: 'Tüm satırların seçimini kaldır',
  checkboxSelectionSelectRow: 'Satırı seç',
  checkboxSelectionUnselectRow: 'Satır seçimini bırak',
  // Boolean cell text
  booleanCellTrueLabel: 'Evet',
  booleanCellFalseLabel: 'Hayır',
  // Actions cell more text
  actionsCellMore: 'daha fazla',
  // Column pinning text
  pinToLeft: 'Sola sabitle',
  pinToRight: 'Sağa sabitle',
  unpin: 'Sabitlemeyi kaldır',
  // Tree Data
  treeDataGroupingHeaderName: 'Grup',
  treeDataExpand: 'göster',
  treeDataCollapse: 'gizle',
  // Grouping columns
  groupingColumnHeaderName: 'Grup',
  groupColumn: name => `${name} için grupla`,
  unGroupColumn: name => `${name} için gruplamayı kaldır`,
  // Master/detail
  detailPanelToggle: 'Detay görünümüne geçiş',
  expandDetailPanel: 'Genişlet',
  collapseDetailPanel: 'Gizle',
  // Row reordering text
  rowReorderingHeaderName: 'Satırı yeniden sırala',
  // Aggregation
  aggregationMenuItemHeader: 'Toplama',
  aggregationFunctionLabelSum: 'top',
  aggregationFunctionLabelAvg: 'ort',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'maks',
  aggregationFunctionLabelSize: 'boyut'
};
const trTR = exports.trTR = (0, _getGridLocalization.getGridLocalization)(trTRGrid, _locale.trTR);