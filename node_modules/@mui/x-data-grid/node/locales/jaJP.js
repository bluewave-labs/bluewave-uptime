"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jaJP = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const jaJPGrid = {
  // Root
  noRowsLabel: '行がありません。',
  noResultsOverlayLabel: '結果がありません。',
  // Density selector toolbar button text
  toolbarDensity: '行間隔',
  toolbarDensityLabel: '行間隔',
  toolbarDensityCompact: 'コンパクト',
  toolbarDensityStandard: '標準',
  toolbarDensityComfortable: '広め',
  // Columns selector toolbar button text
  toolbarColumns: '列一覧',
  toolbarColumnsLabel: '列選択',
  // Filters toolbar button text
  toolbarFilters: 'フィルター',
  toolbarFiltersLabel: 'フィルター表示',
  toolbarFiltersTooltipHide: 'フィルター非表示',
  toolbarFiltersTooltipShow: 'フィルター表示',
  toolbarFiltersTooltipActive: count => `${count}件のフィルターを適用中`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: '検索…',
  toolbarQuickFilterLabel: '検索',
  toolbarQuickFilterDeleteIconLabel: 'クリア',
  // Export selector toolbar button text
  toolbarExport: 'エクスポート',
  toolbarExportLabel: 'エクスポート',
  toolbarExportCSV: 'CSVダウンロード',
  toolbarExportPrint: '印刷',
  toolbarExportExcel: 'Excelダウンロード',
  // Columns management text
  columnsManagementSearchTitle: '検索',
  columnsManagementNoColumns: 'カラムなし',
  columnsManagementShowHideAllText: 'すべて表示/非表示',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'フィルター追加',
  filterPanelRemoveAll: 'すべて削除',
  filterPanelDeleteIconLabel: '削除',
  filterPanelLogicOperator: '論理演算子',
  filterPanelOperator: '演算子',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: '列',
  filterPanelInputLabel: '値',
  filterPanelInputPlaceholder: '値を入力…',
  // Filter operators text
  filterOperatorContains: '...を含む',
  filterOperatorEquals: '...に等しい',
  filterOperatorStartsWith: '...で始まる',
  filterOperatorEndsWith: '...で終わる',
  filterOperatorIs: '...である',
  filterOperatorNot: '...でない',
  filterOperatorAfter: '...より後ろ',
  filterOperatorOnOrAfter: '...以降',
  filterOperatorBefore: '...より前',
  filterOperatorOnOrBefore: '...以前',
  filterOperatorIsEmpty: '...空である',
  filterOperatorIsNotEmpty: '...空でない',
  filterOperatorIsAnyOf: '...のいずれか',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: '含む',
  headerFilterOperatorEquals: '等しい',
  headerFilterOperatorStartsWith: 'で始まる',
  headerFilterOperatorEndsWith: 'で終わる',
  headerFilterOperatorIs: 'である',
  headerFilterOperatorNot: 'ではない',
  headerFilterOperatorAfter: '...より後ろ',
  headerFilterOperatorOnOrAfter: '...以降',
  headerFilterOperatorBefore: '...より前',
  headerFilterOperatorOnOrBefore: '...以前',
  headerFilterOperatorIsEmpty: '空白',
  headerFilterOperatorIsNotEmpty: '空白ではない',
  headerFilterOperatorIsAnyOf: 'いずれか',
  'headerFilterOperator=': '等しい',
  'headerFilterOperator!=': '等しくない',
  'headerFilterOperator>': 'より大きい',
  'headerFilterOperator>=': '以上',
  'headerFilterOperator<': '未満',
  'headerFilterOperator<=': '以下',
  // Filter values text
  filterValueAny: 'いずれか',
  filterValueTrue: '真',
  filterValueFalse: '偽',
  // Column menu text
  columnMenuLabel: 'メニュー',
  columnMenuShowColumns: '列表示',
  columnMenuManageColumns: '列管理',
  columnMenuFilter: 'フィルター',
  columnMenuHideColumn: '列非表示',
  columnMenuUnsort: 'ソート解除',
  columnMenuSortAsc: '昇順ソート',
  columnMenuSortDesc: '降順ソート',
  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count}件のフィルターを適用中`,
  columnHeaderFiltersLabel: 'フィルター表示',
  columnHeaderSortIconLabel: 'ソート',
  // Rows selected footer text
  footerRowSelected: count => `${count}行を選択中`,
  // Total row amount footer text
  footerTotalRows: '総行数:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'チェックボックス',
  checkboxSelectionSelectAllRows: 'すべての行を選択',
  checkboxSelectionUnselectAllRows: 'すべての行選択を解除',
  checkboxSelectionSelectRow: '行を選択',
  checkboxSelectionUnselectRow: '行選択を解除',
  // Boolean cell text
  booleanCellTrueLabel: '真',
  booleanCellFalseLabel: '偽',
  // Actions cell more text
  actionsCellMore: 'もっと見る',
  // Column pinning text
  pinToLeft: '左側に固定',
  pinToRight: '右側に固定',
  unpin: '固定解除',
  // Tree Data
  treeDataGroupingHeaderName: 'グループ',
  treeDataExpand: '展開',
  treeDataCollapse: '折りたたみ',
  // Grouping columns
  groupingColumnHeaderName: 'グループ',
  groupColumn: name => `${name}でグループ化`,
  unGroupColumn: name => `${name}のグループを解除`,
  // Master/detail
  detailPanelToggle: '詳細パネルの切り替え',
  expandDetailPanel: '展開',
  collapseDetailPanel: '折りたたみ',
  // Row reordering text
  rowReorderingHeaderName: '行並び替え',
  // Aggregation
  aggregationMenuItemHeader: '合計',
  aggregationFunctionLabelSum: '和',
  aggregationFunctionLabelAvg: '平均',
  aggregationFunctionLabelMin: '最小値',
  aggregationFunctionLabelMax: '最大値',
  aggregationFunctionLabelSize: 'サイズ'
};
const jaJP = exports.jaJP = (0, _getGridLocalization.getGridLocalization)(jaJPGrid, _locale.jaJP);