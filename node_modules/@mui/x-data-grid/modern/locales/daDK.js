import { daDK as daDKCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const daDKGrid = {
  // Root
  noRowsLabel: 'Ingen rækker',
  noResultsOverlayLabel: 'Ingen resultater',
  // Density selector toolbar button text
  toolbarDensity: 'Tæthed',
  toolbarDensityLabel: 'Tæthed',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Luftig',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolonner',
  toolbarColumnsLabel: 'Vælg kolonner',
  // Filters toolbar button text
  toolbarFilters: 'Filtre',
  toolbarFiltersLabel: 'Vis filtre',
  toolbarFiltersTooltipHide: 'Skjul filtre',
  toolbarFiltersTooltipShow: 'Vis filtre',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} aktive filtre` : `${count} aktivt filter`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Søg…',
  toolbarQuickFilterLabel: 'Søg',
  toolbarQuickFilterDeleteIconLabel: 'Ryd',
  // Export selector toolbar button text
  toolbarExport: 'Eksport',
  toolbarExportLabel: 'Eksporter',
  toolbarExportCSV: 'Download som CSV',
  toolbarExportPrint: 'Print',
  toolbarExportExcel: 'Download som Excel',
  // Columns management text
  columnsManagementSearchTitle: 'Søg',
  columnsManagementNoColumns: 'Ingen søjler',
  columnsManagementShowHideAllText: 'Vis/Skjul Alle',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Tilføj filter',
  filterPanelRemoveAll: 'Fjern alle',
  filterPanelDeleteIconLabel: 'Slet',
  filterPanelLogicOperator: 'Logisk operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'Og',
  filterPanelOperatorOr: 'Eller',
  filterPanelColumns: 'Kolonner',
  filterPanelInputLabel: 'Værdi',
  filterPanelInputPlaceholder: 'Filterværdi',
  // Filter operators text
  filterOperatorContains: 'indeholder',
  filterOperatorEquals: 'lig med',
  filterOperatorStartsWith: 'begynder med',
  filterOperatorEndsWith: 'ender med',
  filterOperatorIs: 'er lig med',
  filterOperatorNot: 'er ikke lig med',
  filterOperatorAfter: 'efter',
  filterOperatorOnOrAfter: 'på eller efter',
  filterOperatorBefore: 'før',
  filterOperatorOnOrBefore: 'på eller før',
  filterOperatorIsEmpty: 'indeholder ikke data',
  filterOperatorIsNotEmpty: 'indeholder data',
  filterOperatorIsAnyOf: 'indeholder en af',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Indeholder',
  headerFilterOperatorEquals: 'Lig med',
  headerFilterOperatorStartsWith: 'Begynder med',
  headerFilterOperatorEndsWith: 'Ender med',
  headerFilterOperatorIs: 'Er lig med',
  headerFilterOperatorNot: 'Er ikke lig med',
  headerFilterOperatorAfter: 'Efter',
  headerFilterOperatorOnOrAfter: 'På eller efter',
  headerFilterOperatorBefore: 'Før',
  headerFilterOperatorOnOrBefore: 'På eller før',
  headerFilterOperatorIsEmpty: 'Indeholder ikke data',
  headerFilterOperatorIsNotEmpty: 'Indeholder data',
  headerFilterOperatorIsAnyOf: 'Indeholder en af',
  'headerFilterOperator=': 'Lig med',
  'headerFilterOperator!=': 'Ikke lig med',
  'headerFilterOperator>': 'Større end',
  'headerFilterOperator>=': 'Større end eller lig med',
  'headerFilterOperator<': 'Mindre end',
  'headerFilterOperator<=': 'Mindre end eller lig med',
  // Filter values text
  filterValueAny: 'hvilken som helst',
  filterValueTrue: 'positiv',
  filterValueFalse: 'negativ',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Vis kolonner',
  columnMenuManageColumns: 'Administrer kolonner',
  columnMenuFilter: 'Filtrer',
  columnMenuHideColumn: 'Skjul kolonne',
  columnMenuUnsort: 'Fjern sortering',
  columnMenuSortAsc: 'Sorter stigende',
  columnMenuSortDesc: 'Sorter faldende',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} aktive filtre` : `Ét aktivt filter`,
  columnHeaderFiltersLabel: 'Vis filtre',
  columnHeaderSortIconLabel: 'Sorter',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `${count.toLocaleString()} rækker valgt` : `Én række valgt`,
  // Total row amount footer text
  footerTotalRows: 'Antal rækker i alt:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} af ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Afkrydsningsvalg',
  checkboxSelectionSelectAllRows: 'Vælg alle rækker',
  checkboxSelectionUnselectAllRows: 'Fravælg alle rækker',
  checkboxSelectionSelectRow: 'Vælg række',
  checkboxSelectionUnselectRow: 'Fravælg række',
  // Boolean cell text
  booleanCellTrueLabel: 'ja',
  booleanCellFalseLabel: 'nej',
  // Actions cell more text
  actionsCellMore: 'mere',
  // Column pinning text
  pinToLeft: 'Fastgør til venstre',
  pinToRight: 'Fastgør til højre',
  unpin: 'Frigiv',
  // Tree Data
  treeDataGroupingHeaderName: 'Gruppe',
  treeDataExpand: 'Vis underelementer',
  treeDataCollapse: 'Skjul underelementer',
  // Grouping columns
  groupingColumnHeaderName: 'Gruppe',
  groupColumn: name => `Gruppér efter ${name}`,
  unGroupColumn: name => `Fjern gruppering efter ${name}`,
  // Master/detail
  detailPanelToggle: 'Udvid/kollaps detaljepanel',
  expandDetailPanel: 'Udvid',
  collapseDetailPanel: 'Kollaps',
  // Row reordering text
  rowReorderingHeaderName: 'Omarrangering af rækker',
  // Aggregation
  aggregationMenuItemHeader: 'Aggregering',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'gns',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'størrelse'
};
export const daDK = getGridLocalization(daDKGrid, daDKCore);