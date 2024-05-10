import { zhTW as zhTWCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const zhTWGrid = {
  // Root
  noRowsLabel: '沒有資料',
  noResultsOverlayLabel: '沒有結果',
  // Density selector toolbar button text
  toolbarDensity: '表格密度',
  toolbarDensityLabel: '表格密度',
  toolbarDensityCompact: '緊湊',
  toolbarDensityStandard: '標準',
  toolbarDensityComfortable: '舒適',
  // Columns selector toolbar button text
  toolbarColumns: '欄位',
  toolbarColumnsLabel: '選擇欄位',
  // Filters toolbar button text
  toolbarFilters: '篩選器',
  toolbarFiltersLabel: '顯示篩選器',
  toolbarFiltersTooltipHide: '隱藏篩選器',
  toolbarFiltersTooltipShow: '顯示篩選器',
  toolbarFiltersTooltipActive: count => `${count} 個篩選器`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: '搜尋…',
  toolbarQuickFilterLabel: '搜尋',
  toolbarQuickFilterDeleteIconLabel: '清除',
  // Export selector toolbar button text
  toolbarExport: '匯出',
  toolbarExportLabel: '匯出',
  toolbarExportCSV: '匯出 CSV',
  toolbarExportPrint: '列印',
  toolbarExportExcel: '匯出 Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: '增加篩選器',
  filterPanelRemoveAll: '清除所有',
  filterPanelDeleteIconLabel: '刪除',
  filterPanelLogicOperator: '邏輯運算子',
  filterPanelOperator: '運算子',
  filterPanelOperatorAnd: '且',
  filterPanelOperatorOr: '或',
  filterPanelColumns: '欄位',
  filterPanelInputLabel: '值',
  filterPanelInputPlaceholder: '篩選值',
  // Filter operators text
  filterOperatorContains: '包含',
  filterOperatorEquals: '等於',
  filterOperatorStartsWith: '以...開頭',
  filterOperatorEndsWith: '以...結束',
  filterOperatorIs: '為',
  filterOperatorNot: '不為',
  filterOperatorAfter: '...之後',
  filterOperatorOnOrAfter: '...(含)之後',
  filterOperatorBefore: '...之前',
  filterOperatorOnOrBefore: '...(含)之前',
  filterOperatorIsEmpty: '為空',
  filterOperatorIsNotEmpty: '不為空',
  filterOperatorIsAnyOf: '是其中之一',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: '包含',
  headerFilterOperatorEquals: '等於',
  headerFilterOperatorStartsWith: '以...開頭',
  headerFilterOperatorEndsWith: '以...結束',
  headerFilterOperatorIs: '為',
  headerFilterOperatorNot: '不為',
  headerFilterOperatorAfter: '...之後',
  headerFilterOperatorOnOrAfter: '...(含)之後',
  headerFilterOperatorBefore: '...之前',
  headerFilterOperatorOnOrBefore: '...(含)之前',
  headerFilterOperatorIsEmpty: '為空',
  headerFilterOperatorIsNotEmpty: '不為空',
  headerFilterOperatorIsAnyOf: '是其中之一',
  'headerFilterOperator=': '等於',
  'headerFilterOperator!=': '不等於',
  'headerFilterOperator>': '大於',
  'headerFilterOperator>=': '大於或等於',
  'headerFilterOperator<': '小於',
  'headerFilterOperator<=': '小於或等於',
  // Filter values text
  filterValueAny: '任何值',
  filterValueTrue: '真',
  filterValueFalse: '假',
  // Column menu text
  columnMenuLabel: '選單',
  columnMenuShowColumns: '顯示欄位',
  columnMenuManageColumns: '管理欄位',
  columnMenuFilter: '篩選器',
  columnMenuHideColumn: '隱藏',
  columnMenuUnsort: '預設排序',
  columnMenuSortAsc: '升序',
  columnMenuSortDesc: '降序',
  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count} 個篩選器`,
  columnHeaderFiltersLabel: '顯示篩選器',
  columnHeaderSortIconLabel: '排序',
  // Rows selected footer text
  footerRowSelected: count => `已選取 ${count.toLocaleString()} 個`,
  // Total row amount footer text
  footerTotalRows: '總數:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: '核取方塊',
  checkboxSelectionSelectAllRows: '全選',
  checkboxSelectionUnselectAllRows: '取消全選',
  checkboxSelectionSelectRow: '選取',
  checkboxSelectionUnselectRow: '取消選取',
  // Boolean cell text
  booleanCellTrueLabel: '真',
  booleanCellFalseLabel: '假',
  // Actions cell more text
  actionsCellMore: '查看更多',
  // Column pinning text
  pinToLeft: '釘選在左側',
  pinToRight: '釘選在右側',
  unpin: '取消釘選',
  // Tree Data
  treeDataGroupingHeaderName: '群組',
  treeDataExpand: '查看子項目',
  treeDataCollapse: '隱藏子項目',
  // Grouping columns
  groupingColumnHeaderName: '群組',
  groupColumn: name => `以 ${name} 分組`,
  unGroupColumn: name => `取消以 ${name} 分組`,
  // Master/detail
  detailPanelToggle: '切換顯示詳細資訊',
  expandDetailPanel: '展開',
  collapseDetailPanel: '摺疊',
  // Row reordering text
  rowReorderingHeaderName: '排序',
  // Aggregation
  aggregationMenuItemHeader: '集合',
  aggregationFunctionLabelSum: '總數',
  aggregationFunctionLabelAvg: '平均數',
  aggregationFunctionLabelMin: '最小',
  aggregationFunctionLabelMax: '最大',
  aggregationFunctionLabelSize: '尺寸'
};
export const zhTW = getGridLocalization(zhTWGrid, zhTWCore);