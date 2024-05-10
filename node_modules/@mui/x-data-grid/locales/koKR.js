import { koKR as koKRCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const koKRGrid = {
  // Root
  noRowsLabel: '행이 없습니다.',
  noResultsOverlayLabel: '결과값이 없습니다.',
  // Density selector toolbar button text
  toolbarDensity: '행 간격',
  toolbarDensityLabel: '행 간격',
  toolbarDensityCompact: '좁게',
  toolbarDensityStandard: '기본',
  toolbarDensityComfortable: '넓게',
  // Columns selector toolbar button text
  toolbarColumns: '열 목록',
  toolbarColumnsLabel: '열 선택',
  // Filters toolbar button text
  toolbarFilters: '필터',
  toolbarFiltersLabel: '필터 표시',
  toolbarFiltersTooltipHide: '필터 숨기기',
  toolbarFiltersTooltipShow: '필터 표시',
  toolbarFiltersTooltipActive: count => `${count}건의 필터를 적용중`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: '검색…',
  toolbarQuickFilterLabel: '검색',
  toolbarQuickFilterDeleteIconLabel: '초기화',
  // Export selector toolbar button text
  toolbarExport: '내보내기',
  toolbarExportLabel: '내보내기',
  toolbarExportCSV: 'CSV로 내보내기',
  toolbarExportPrint: '프린트',
  toolbarExportExcel: 'Excel로 내보내기',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: '필터 추가',
  // filterPanelRemoveAll: 'Remove all',
  filterPanelDeleteIconLabel: '삭제',
  filterPanelLogicOperator: '논리 연산자',
  filterPanelOperator: '연산자',
  filterPanelOperatorAnd: '그리고',
  filterPanelOperatorOr: '또는',
  filterPanelColumns: '목록',
  filterPanelInputLabel: '값',
  filterPanelInputPlaceholder: '값 입력',
  // Filter operators text
  filterOperatorContains: '포함하는',
  filterOperatorEquals: '값이 같은',
  filterOperatorStartsWith: '시작하는',
  filterOperatorEndsWith: '끝나는',
  filterOperatorIs: '~인',
  filterOperatorNot: '~아닌',
  filterOperatorAfter: '더 이후',
  filterOperatorOnOrAfter: '이후',
  filterOperatorBefore: '더 이전',
  filterOperatorOnOrBefore: '이전',
  filterOperatorIsEmpty: '값이 없는',
  filterOperatorIsNotEmpty: '값이 있는',
  filterOperatorIsAnyOf: '값 중 하나인',
  // 'filterOperator=': '=',
  // 'filterOperator!=': '!=',
  // 'filterOperator>': '>',
  // 'filterOperator>=': '>=',
  // 'filterOperator<': '<',
  // 'filterOperator<=': '<=',

  // Header filter operators text
  // headerFilterOperatorContains: 'Contains',
  // headerFilterOperatorEquals: 'Equals',
  // headerFilterOperatorStartsWith: 'Starts with',
  // headerFilterOperatorEndsWith: 'Ends with',
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
  filterValueAny: '아무값',
  filterValueTrue: '참',
  filterValueFalse: '거짓',
  // Column menu text
  columnMenuLabel: '메뉴',
  columnMenuShowColumns: '열 표시',
  // columnMenuManageColumns: 'Manage columns',
  columnMenuFilter: '필터',
  columnMenuHideColumn: '열 숨기기',
  columnMenuUnsort: '정렬 해제',
  columnMenuSortAsc: '오름차순 정렬',
  columnMenuSortDesc: '내림차순 정렬',
  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count}건의 필터를 적용중`,
  columnHeaderFiltersLabel: '필터 표시',
  columnHeaderSortIconLabel: '정렬',
  // Rows selected footer text
  footerRowSelected: count => `${count}행 선택중`,
  // Total row amount footer text
  footerTotalRows: '총 행수:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: '선택',
  checkboxSelectionSelectAllRows: '모든 행 선택',
  checkboxSelectionUnselectAllRows: '모든 행 선택 해제',
  checkboxSelectionSelectRow: '행 선택',
  checkboxSelectionUnselectRow: '행 선택 해제',
  // Boolean cell text
  booleanCellTrueLabel: '참',
  booleanCellFalseLabel: '거짓',
  // Actions cell more text
  actionsCellMore: '더보기',
  // Column pinning text
  pinToLeft: '왼쪽에 고정',
  pinToRight: '오른쪽에 고정',
  unpin: '고정 해제',
  // Tree Data
  treeDataGroupingHeaderName: '그룹',
  treeDataExpand: '하위노드 펼치기',
  treeDataCollapse: '하위노드 접기',
  // Grouping columns
  groupingColumnHeaderName: '그룹',
  groupColumn: name => `${name} 값으로 그룹 생성`,
  unGroupColumn: name => `${name} 값으로 그룹 해제`,
  // Master/detail
  detailPanelToggle: '상세 패널 토글',
  expandDetailPanel: '열기',
  collapseDetailPanel: '접기',
  // Row reordering text
  rowReorderingHeaderName: '행 재배치',
  // Aggregation
  aggregationMenuItemHeader: '총계',
  aggregationFunctionLabelSum: '합',
  aggregationFunctionLabelAvg: '평균',
  aggregationFunctionLabelMin: '최소값',
  aggregationFunctionLabelMax: '최대값',
  aggregationFunctionLabelSize: '크기'
};
export const koKR = getGridLocalization(koKRGrid, koKRCore);