import { roRO as roROCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const roROGrid = {
  // Root
  noRowsLabel: 'Lipsă date',
  noResultsOverlayLabel: 'Nu au fost găsite rezultate.',
  // Density selector toolbar button text
  toolbarDensity: 'Înălțime rând',
  toolbarDensityLabel: 'Înălțime rând',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Lat',
  // Columns selector toolbar button text
  toolbarColumns: 'Coloane',
  toolbarColumnsLabel: 'Afișează selecție coloane',
  // Filters toolbar button text
  toolbarFilters: 'Filtru',
  toolbarFiltersLabel: 'Afișează filtru',
  toolbarFiltersTooltipHide: 'Ascunde filtru',
  toolbarFiltersTooltipShow: 'Afișează filtru',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} filtru activ` : `${count} filtru activ`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Căutare…',
  toolbarQuickFilterLabel: 'Căutare',
  toolbarQuickFilterDeleteIconLabel: 'Ștergere',
  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Download în format CSV',
  toolbarExportPrint: 'Printare',
  toolbarExportExcel: 'Download în format Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Adăugare filtru',
  filterPanelRemoveAll: 'Șterge tot',
  filterPanelDeleteIconLabel: 'Ștergere',
  filterPanelLogicOperator: 'Operatori logici',
  filterPanelOperator: 'Operatori',
  filterPanelOperatorAnd: 'Și',
  filterPanelOperatorOr: 'Sau',
  filterPanelColumns: 'Coloane',
  filterPanelInputLabel: 'Valoare',
  filterPanelInputPlaceholder: 'Filtrare valoare',
  // Filter operators text
  filterOperatorContains: 'conține',
  filterOperatorEquals: 'este egal cu',
  filterOperatorStartsWith: 'începe cu',
  filterOperatorEndsWith: 'se termină cu',
  filterOperatorIs: 'este',
  filterOperatorNot: 'nu este',
  filterOperatorAfter: 'este după',
  filterOperatorOnOrAfter: 'este la sau după',
  filterOperatorBefore: 'este înainte de',
  filterOperatorOnOrBefore: 'este la sau înainte de',
  filterOperatorIsEmpty: 'este gol',
  filterOperatorIsNotEmpty: 'nu este gol',
  filterOperatorIsAnyOf: 'este una din valori',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Conține',
  headerFilterOperatorEquals: 'Egal cu',
  headerFilterOperatorStartsWith: 'Începe cu',
  headerFilterOperatorEndsWith: 'Se termină cu',
  headerFilterOperatorIs: 'Este',
  headerFilterOperatorNot: 'Nu este',
  headerFilterOperatorAfter: 'Este după',
  headerFilterOperatorOnOrAfter: 'Este la sau după',
  headerFilterOperatorBefore: 'Este înainte de',
  headerFilterOperatorOnOrBefore: 'este la sau înainte de',
  headerFilterOperatorIsEmpty: 'Este gol',
  headerFilterOperatorIsNotEmpty: 'Nu este gol',
  headerFilterOperatorIsAnyOf: 'Este una din valori',
  'headerFilterOperator=': 'Egal cu',
  'headerFilterOperator!=': 'Nu este egal cu',
  'headerFilterOperator>': 'Mai mare decât',
  'headerFilterOperator>=': 'Mai mare sau egal cu',
  'headerFilterOperator<': 'Mai mic decât',
  'headerFilterOperator<=': 'Mai mic sau egal cu',
  // Filter values text
  filterValueAny: 'Aleatoriu',
  filterValueTrue: 'Da',
  filterValueFalse: 'Nu',
  // Column menu text
  columnMenuLabel: 'Meniu',
  columnMenuShowColumns: 'Afișează toate coloanele',
  columnMenuManageColumns: 'Gestionează coloane',
  columnMenuFilter: 'Filtru',
  columnMenuHideColumn: 'Ascunde',
  columnMenuUnsort: 'Dezactivare sortare',
  columnMenuSortAsc: 'Sortează crescător',
  columnMenuSortDesc: 'Sortează descrescător',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} filtru activ` : `${count} filtru activ`,
  columnHeaderFiltersLabel: 'Afișează filtru',
  columnHeaderSortIconLabel: 'Sortare',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `${count.toLocaleString()} Înregistrări selectate` : `${count.toLocaleString()} Înregistrare selectată`,
  // Total row amount footer text
  footerTotalRows: 'Total:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} din ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox Selecție',
  checkboxSelectionSelectAllRows: 'Selectare toate rândurile',
  checkboxSelectionUnselectAllRows: 'Deselectare toate rândurile',
  checkboxSelectionSelectRow: 'Selectare rând',
  checkboxSelectionUnselectRow: 'Deselectare rând',
  // Boolean cell text
  booleanCellTrueLabel: 'Da',
  booleanCellFalseLabel: 'Nu',
  // Actions cell more text
  actionsCellMore: 'Mai multe',
  // Column pinning text
  pinToLeft: 'Fixare în stânga',
  pinToRight: 'Fixare în dreapta',
  unpin: 'Anulare fixare',
  // Tree Data
  treeDataGroupingHeaderName: 'Grup',
  treeDataExpand: 'Afișare copii',
  treeDataCollapse: 'Ascundere copii',
  // Grouping columns
  groupingColumnHeaderName: 'Grupare',
  groupColumn: name => `Grupare după ${name}`,
  unGroupColumn: name => `Anulare Grupare după ${name}`,
  // Master/detail
  detailPanelToggle: 'Comutare panou detalii',
  expandDetailPanel: 'Extindere',
  collapseDetailPanel: 'Restrângere',
  // Row reordering text
  rowReorderingHeaderName: 'Reordonare rânduri',
  // Aggregation
  aggregationMenuItemHeader: 'Agregare',
  aggregationFunctionLabelSum: 'Sumă',
  aggregationFunctionLabelAvg: 'Medie',
  aggregationFunctionLabelMin: 'Minim',
  aggregationFunctionLabelMax: 'Maxim',
  aggregationFunctionLabelSize: 'Numărul elementelor'
};
export const roRO = getGridLocalization(roROGrid, roROCore);