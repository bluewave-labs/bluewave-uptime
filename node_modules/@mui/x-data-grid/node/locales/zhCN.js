"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zhCN = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const zhCNGrid = {
  // Root
  noRowsLabel: '没有数据。',
  noResultsOverlayLabel: '未找到数据。',
  // Density selector toolbar button text
  toolbarDensity: '表格密度',
  toolbarDensityLabel: '表格密度',
  toolbarDensityCompact: '紧密',
  toolbarDensityStandard: '标准',
  toolbarDensityComfortable: '稀疏',
  // Columns selector toolbar button text
  toolbarColumns: '列',
  toolbarColumnsLabel: '选择列',
  // Filters toolbar button text
  toolbarFilters: '筛选器',
  toolbarFiltersLabel: '显示筛选器',
  toolbarFiltersTooltipHide: '隐藏筛选器',
  toolbarFiltersTooltipShow: '显示筛选器',
  toolbarFiltersTooltipActive: count => `${count} 个筛选器`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: '搜索…',
  toolbarQuickFilterLabel: '搜索',
  toolbarQuickFilterDeleteIconLabel: '清除',
  // Export selector toolbar button text
  toolbarExport: '导出',
  toolbarExportLabel: '导出',
  toolbarExportCSV: '导出至CSV',
  toolbarExportPrint: '打印',
  toolbarExportExcel: '导出至Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: '添加筛选器',
  filterPanelRemoveAll: '清除全部',
  filterPanelDeleteIconLabel: '删除',
  filterPanelLogicOperator: '逻辑操作器',
  filterPanelOperator: '操作器',
  filterPanelOperatorAnd: '与',
  filterPanelOperatorOr: '或',
  filterPanelColumns: '列',
  filterPanelInputLabel: '值',
  filterPanelInputPlaceholder: '筛选值',
  // Filter operators text
  filterOperatorContains: '包含',
  filterOperatorEquals: '等于',
  filterOperatorStartsWith: '开始于',
  filterOperatorEndsWith: '结束于',
  filterOperatorIs: '是',
  filterOperatorNot: '不是',
  filterOperatorAfter: '在后面',
  filterOperatorOnOrAfter: '正在后面',
  filterOperatorBefore: '在前面',
  filterOperatorOnOrBefore: '正在前面',
  filterOperatorIsEmpty: '为空',
  filterOperatorIsNotEmpty: '不为空',
  filterOperatorIsAnyOf: '属于',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: '包含',
  headerFilterOperatorEquals: '等于',
  headerFilterOperatorStartsWith: '开始于',
  headerFilterOperatorEndsWith: '结束于',
  headerFilterOperatorIs: '是',
  headerFilterOperatorNot: '不是',
  headerFilterOperatorAfter: '在后面',
  headerFilterOperatorOnOrAfter: '在当前或后面',
  headerFilterOperatorBefore: '在前面',
  headerFilterOperatorOnOrBefore: '在当前或前面',
  headerFilterOperatorIsEmpty: '为空',
  headerFilterOperatorIsNotEmpty: '不为空',
  headerFilterOperatorIsAnyOf: '属于',
  'headerFilterOperator=': '等于',
  'headerFilterOperator!=': '不等于',
  'headerFilterOperator>': '大于',
  'headerFilterOperator>=': '大于或等于',
  'headerFilterOperator<': '小雨',
  'headerFilterOperator<=': '小于或等于',
  // Filter values text
  filterValueAny: '任何',
  filterValueTrue: '真',
  filterValueFalse: '假',
  // Column menu text
  columnMenuLabel: '菜单',
  columnMenuShowColumns: '显示',
  columnMenuManageColumns: '管理列',
  columnMenuFilter: '筛选器',
  columnMenuHideColumn: '隐藏',
  columnMenuUnsort: '恢复默认',
  columnMenuSortAsc: '升序',
  columnMenuSortDesc: '降序',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} 个筛选器` : `${count} 个筛选器`,
  columnHeaderFiltersLabel: '显示筛选器',
  columnHeaderSortIconLabel: '排序',
  // Rows selected footer text
  footerRowSelected: count => `共选中了${count.toLocaleString()}行`,
  // Total row amount footer text
  footerTotalRows: '所有行:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: '多选框',
  checkboxSelectionSelectAllRows: '全选行',
  checkboxSelectionUnselectAllRows: '反选所有行',
  checkboxSelectionSelectRow: '选择行',
  checkboxSelectionUnselectRow: '反选行',
  // Boolean cell text
  booleanCellTrueLabel: '真',
  booleanCellFalseLabel: '假',
  // Actions cell more text
  actionsCellMore: '更多',
  // Column pinning text
  pinToLeft: '固定到左侧',
  pinToRight: '固定到右侧',
  unpin: '取消固定',
  // Tree Data
  treeDataGroupingHeaderName: '组',
  treeDataExpand: '查看子项目',
  treeDataCollapse: '隐藏子项目',
  // Grouping columns
  groupingColumnHeaderName: '组',
  groupColumn: name => `用${name}分组`,
  unGroupColumn: name => `不再用${name}分组`,
  // Master/detail
  detailPanelToggle: '详细信息',
  expandDetailPanel: '显示',
  collapseDetailPanel: '折叠',
  // Row reordering text
  rowReorderingHeaderName: '重新排列行',
  // Aggregation
  aggregationMenuItemHeader: '集合',
  aggregationFunctionLabelSum: '总数',
  aggregationFunctionLabelAvg: '平均',
  aggregationFunctionLabelMin: '最小',
  aggregationFunctionLabelMax: '最大',
  aggregationFunctionLabelSize: '大小'
};
const zhCN = exports.zhCN = (0, _getGridLocalization.getGridLocalization)(zhCNGrid, _locale.zhCN);