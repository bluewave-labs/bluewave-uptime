import { arSD as arSDCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const arSDGrid = {
  // Root
  noRowsLabel: 'لا توجد صفوف',
  noResultsOverlayLabel: 'لم يتم العثور على نتائج.',
  // Density selector toolbar button text
  toolbarDensity: 'الكثافة',
  toolbarDensityLabel: 'الكثافة',
  toolbarDensityCompact: 'مضغوط',
  toolbarDensityStandard: 'قياسي',
  toolbarDensityComfortable: 'مريح',
  // Columns selector toolbar button text
  toolbarColumns: 'الأعمدة',
  toolbarColumnsLabel: 'حدد أعمدة',
  // Filters toolbar button text
  toolbarFilters: 'المُرشِحات',
  toolbarFiltersLabel: 'إظهار المرشِحات',
  toolbarFiltersTooltipHide: 'إخفاء المرشِحات',
  toolbarFiltersTooltipShow: 'اظهر المرشِحات',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} من المرشِحات النشطة` : `مرشِح نشط`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'بحث...',
  toolbarQuickFilterLabel: 'بحث',
  toolbarQuickFilterDeleteIconLabel: 'أزال',
  // Export selector toolbar button text
  toolbarExport: 'تصدير',
  toolbarExportLabel: 'تصدير',
  toolbarExportCSV: 'تنزيل كملف CSV',
  toolbarExportPrint: 'طباعة',
  toolbarExportExcel: 'تحميل كملف الإكسل',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'إضافة مرشِح',
  filterPanelRemoveAll: 'حذف الكل',
  filterPanelDeleteIconLabel: 'حذف',
  filterPanelLogicOperator: 'عامل منطقي',
  filterPanelOperator: 'عامل',
  filterPanelOperatorAnd: 'و',
  filterPanelOperatorOr: 'أو',
  filterPanelColumns: 'الأعمدة',
  filterPanelInputLabel: 'القيمة',
  filterPanelInputPlaceholder: 'ترشِيح قيمة',
  // Filter operators text
  filterOperatorContains: 'يحتوي',
  filterOperatorEquals: 'يساوي',
  filterOperatorStartsWith: 'يبدأ بـ',
  filterOperatorEndsWith: 'ينتهي بـ',
  filterOperatorIs: 'يكون',
  filterOperatorNot: 'ليس',
  filterOperatorAfter: 'بعد',
  filterOperatorOnOrAfter: 'عند أو بعد',
  filterOperatorBefore: 'قبل',
  filterOperatorOnOrBefore: 'عند أو قبل',
  filterOperatorIsEmpty: 'خالي',
  filterOperatorIsNotEmpty: 'غير خالي',
  filterOperatorIsAnyOf: 'أي من',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'يحتوي على',
  headerFilterOperatorEquals: 'يساوي',
  headerFilterOperatorStartsWith: 'يبدأ ب',
  headerFilterOperatorEndsWith: 'ينتهي ب',
  headerFilterOperatorIs: 'هو',
  headerFilterOperatorNot: 'هو ليس',
  headerFilterOperatorAfter: 'يقع بعد',
  headerFilterOperatorOnOrAfter: 'هو على او بعد',
  headerFilterOperatorBefore: 'يقع قبل',
  headerFilterOperatorOnOrBefore: 'هو على او بعد',
  headerFilterOperatorIsEmpty: 'هو فارغ',
  headerFilterOperatorIsNotEmpty: 'هو ليس فارغ',
  headerFilterOperatorIsAnyOf: 'هو أي من',
  'headerFilterOperator=': 'يساوي',
  'headerFilterOperator!=': 'لا يساوي',
  'headerFilterOperator>': 'أكبر من',
  'headerFilterOperator>=': 'أكبر من او يساوي',
  'headerFilterOperator<': 'اصغر من',
  'headerFilterOperator<=': 'اصغر من او يساوي',
  // Filter values text
  filterValueAny: 'أي',
  filterValueTrue: 'صائب',
  filterValueFalse: 'خاطئ',
  // Column menu text
  columnMenuLabel: 'القائمة',
  columnMenuShowColumns: 'إظهار الأعمدة',
  columnMenuManageColumns: 'إدارة الأعمدة',
  columnMenuFilter: 'المرشِح',
  columnMenuHideColumn: 'إخفاء',
  columnMenuUnsort: 'الغاء الفرز',
  columnMenuSortAsc: 'الفرز تصاعدياً',
  columnMenuSortDesc: 'الفرز تنازلياً',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} من المرشِحات النشطة` : `مرشِح نشط`,
  columnHeaderFiltersLabel: 'إظهار المرشحات',
  columnHeaderSortIconLabel: 'فرز',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `تم تحديد ${count.toLocaleString()} من الصفوف` : `تم تحديد صف واحد`,
  // Total row amount footer text
  footerTotalRows: 'إجمالي الصفوف:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} من ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'تحديد خانة الاختيار',
  checkboxSelectionSelectAllRows: 'تحديد كل الصفوف',
  checkboxSelectionUnselectAllRows: 'الغاء تحديد كل الصفوف',
  checkboxSelectionSelectRow: 'تحديد صف',
  checkboxSelectionUnselectRow: 'الغاء تحديد الصف',
  // Boolean cell text
  booleanCellTrueLabel: 'نعم',
  booleanCellFalseLabel: 'لا',
  // Actions cell more text
  actionsCellMore: 'المزيد',
  // Column pinning text
  pinToLeft: 'التدبيس يميناً',
  pinToRight: 'التدبيس يساراً',
  unpin: 'الغاء التدبيس',
  // Tree Data
  treeDataGroupingHeaderName: 'تجميع',
  treeDataExpand: 'رؤية الأبناء',
  treeDataCollapse: 'إخفاء الأبناء',
  // Grouping columns
  groupingColumnHeaderName: 'تجميع',
  groupColumn: name => `تجميع حسب ${name}`,
  unGroupColumn: name => `إيقاف التجميع حسب ${name}`,
  // Master/detail
  detailPanelToggle: 'اظهار/اخفاء لوحة التفاصيل',
  expandDetailPanel: 'توسيع',
  collapseDetailPanel: 'طوي',
  // Row reordering text
  rowReorderingHeaderName: 'أعادة ترتيب الصفوف',
  // Aggregation
  aggregationMenuItemHeader: 'الدلالات الحسابية',
  aggregationFunctionLabelSum: 'مجموع',
  aggregationFunctionLabelAvg: 'معدل',
  aggregationFunctionLabelMin: 'الحد الادنى',
  aggregationFunctionLabelMax: 'الحد الاقصى',
  aggregationFunctionLabelSize: 'الحجم'
};
export const arSD = getGridLocalization(arSDGrid, arSDCore);