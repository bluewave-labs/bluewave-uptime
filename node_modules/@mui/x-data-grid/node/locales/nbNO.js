"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nbNO = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const nbNOGrid = {
  // Root
  noRowsLabel: 'Ingen rader',
  noResultsOverlayLabel: 'Fant ingen resultat.',
  // Density selector toolbar button text
  toolbarDensity: 'Tetthet',
  toolbarDensityLabel: 'Tetthet',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Komfortabelt',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolonner',
  toolbarColumnsLabel: 'Velg kolonner',
  // Filters toolbar button text
  toolbarFilters: 'Filter',
  toolbarFiltersLabel: 'Vis filter',
  toolbarFiltersTooltipHide: 'Skjul fitler',
  toolbarFiltersTooltipShow: 'Vis filter',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} aktive filter` : `${count} aktivt filter`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Søk…',
  toolbarQuickFilterLabel: 'Søk',
  toolbarQuickFilterDeleteIconLabel: 'Slett',
  // Export selector toolbar button text
  toolbarExport: 'Eksporter',
  toolbarExportLabel: 'Eksporter',
  toolbarExportCSV: 'Last ned som CSV',
  toolbarExportPrint: 'Skriv ut',
  toolbarExportExcel: 'Last ned som Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Legg til filter',
  filterPanelRemoveAll: 'Fjern alle',
  filterPanelDeleteIconLabel: 'Slett',
  filterPanelLogicOperator: 'Logisk operator',
  filterPanelOperator: 'Operatører',
  filterPanelOperatorAnd: 'Og',
  filterPanelOperatorOr: 'Eller',
  filterPanelColumns: 'Kolonner',
  filterPanelInputLabel: 'Verdi',
  filterPanelInputPlaceholder: 'Filter verdi',
  // Filter operators text
  filterOperatorContains: 'inneholder',
  filterOperatorEquals: 'er lik',
  filterOperatorStartsWith: 'starter med',
  filterOperatorEndsWith: 'slutter med',
  filterOperatorIs: 'er',
  filterOperatorNot: 'er ikke',
  filterOperatorAfter: 'er etter',
  filterOperatorOnOrAfter: 'er på eller etter',
  filterOperatorBefore: 'er før',
  filterOperatorOnOrBefore: 'er på eller før',
  filterOperatorIsEmpty: 'er tom',
  filterOperatorIsNotEmpty: 'er ikke tom',
  filterOperatorIsAnyOf: 'er en av',
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
  filterValueAny: 'noen',
  filterValueTrue: 'sant',
  filterValueFalse: 'usant',
  // Column menu text
  columnMenuLabel: 'Meny',
  columnMenuShowColumns: 'Vis kolonner',
  columnMenuManageColumns: 'Administrer kolonner',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Skjul',
  columnMenuUnsort: 'Usorter',
  columnMenuSortAsc: 'Sorter ØKENDE',
  columnMenuSortDesc: 'Sorter SYNKENDE',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} aktive filter` : `${count} aktivt filter`,
  columnHeaderFiltersLabel: 'Vis filter',
  columnHeaderSortIconLabel: 'Sorter',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `${count.toLocaleString()} rader valgt` : `${count.toLocaleString()} rad valgt`,
  // Total row amount footer text
  footerTotalRows: 'Totalt antall rader:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} av ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Avmerkingsboks valgt',
  checkboxSelectionSelectAllRows: 'Velg alle rader',
  checkboxSelectionUnselectAllRows: 'Velg bort alle rader',
  checkboxSelectionSelectRow: 'Velg rad',
  checkboxSelectionUnselectRow: 'Velg bort rad',
  // Boolean cell text
  booleanCellTrueLabel: 'sant',
  booleanCellFalseLabel: 'usant',
  // Actions cell more text
  actionsCellMore: 'mer',
  // Column pinning text
  pinToLeft: 'Fest til venstre',
  pinToRight: 'Fest til høyre',
  unpin: 'Løsne',
  // Tree Data
  treeDataGroupingHeaderName: 'Grupper',
  treeDataExpand: 'se barn',
  treeDataCollapse: 'skjul barn',
  // Grouping columns
  groupingColumnHeaderName: 'Grupper',
  groupColumn: name => `Grupper på ${name}`,
  unGroupColumn: name => `Stopp å grupper på ${name}`,
  // Master/detail
  detailPanelToggle: 'Utvid/kollaps detalj panel',
  expandDetailPanel: 'Utvid',
  collapseDetailPanel: 'Kollaps',
  // Row reordering text
  rowReorderingHeaderName: 'Rad reorganisering',
  // Aggregation
  aggregationMenuItemHeader: 'Aggregering',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'snitt',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'maks',
  aggregationFunctionLabelSize: 'størrelse'
};
const nbNO = exports.nbNO = (0, _getGridLocalization.getGridLocalization)(nbNOGrid, _locale.nbNO);