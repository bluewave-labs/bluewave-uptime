"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nlNL = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const nlNLGrid = {
  // Root
  noRowsLabel: 'Geen resultaten.',
  noResultsOverlayLabel: 'Geen resultaten gevonden.',
  // Density selector toolbar button text
  toolbarDensity: 'Grootte',
  toolbarDensityLabel: 'Grootte',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Normaal',
  toolbarDensityComfortable: 'Breed',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolommen',
  toolbarColumnsLabel: 'Kies kolommen',
  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Toon filters',
  toolbarFiltersTooltipHide: 'Verberg filters',
  toolbarFiltersTooltipShow: 'Toon filters',
  toolbarFiltersTooltipActive: count => count > 1 ? `${count} actieve filters` : `${count} filter actief`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Zoeken…',
  toolbarQuickFilterLabel: 'Zoeken',
  toolbarQuickFilterDeleteIconLabel: 'Wissen',
  // Export selector toolbar button text
  toolbarExport: 'Exporteren',
  toolbarExportLabel: 'Exporteren',
  toolbarExportCSV: 'Exporteer naar CSV',
  toolbarExportPrint: 'Print',
  toolbarExportExcel: 'Downloaden als Excel-bestand',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Filter toevoegen',
  filterPanelRemoveAll: 'Alles verwijderen',
  filterPanelDeleteIconLabel: 'Verwijderen',
  filterPanelLogicOperator: 'Logische operator',
  filterPanelOperator: 'Operatoren',
  filterPanelOperatorAnd: 'En',
  filterPanelOperatorOr: 'Of',
  filterPanelColumns: 'Kolommen',
  filterPanelInputLabel: 'Waarde',
  filterPanelInputPlaceholder: 'Filter waarde',
  // Filter operators text
  filterOperatorContains: 'bevat',
  filterOperatorEquals: 'gelijk aan',
  filterOperatorStartsWith: 'begint met',
  filterOperatorEndsWith: 'eindigt met',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is niet',
  filterOperatorAfter: 'is na',
  filterOperatorOnOrAfter: 'is gelijk of er na',
  filterOperatorBefore: 'is voor',
  filterOperatorOnOrBefore: 'is gelijk of er voor',
  filterOperatorIsEmpty: 'is leeg',
  filterOperatorIsNotEmpty: 'is niet leeg',
  filterOperatorIsAnyOf: 'is een van',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Bevat',
  headerFilterOperatorEquals: 'Gelijk aan',
  headerFilterOperatorStartsWith: 'Begint met',
  headerFilterOperatorEndsWith: 'Eindigt met',
  headerFilterOperatorIs: 'Is',
  headerFilterOperatorNot: 'Is niet',
  headerFilterOperatorAfter: 'Is na',
  headerFilterOperatorOnOrAfter: 'Is op of na',
  headerFilterOperatorBefore: 'Is voor',
  headerFilterOperatorOnOrBefore: 'Is op of voor',
  headerFilterOperatorIsEmpty: 'Is leeg',
  headerFilterOperatorIsNotEmpty: 'Is niet leeg',
  headerFilterOperatorIsAnyOf: 'Is een van',
  'headerFilterOperator=': 'Gelijk aan',
  'headerFilterOperator!=': 'Niet gelijk aan',
  'headerFilterOperator>': 'Is groter dan',
  'headerFilterOperator>=': 'Is groter dan of gelijk aan',
  'headerFilterOperator<': 'Is kleiner dan',
  'headerFilterOperator<=': 'Is kleiner dan of gelijk aan',
  // Filter values text
  filterValueAny: 'alles',
  filterValueTrue: 'waar',
  filterValueFalse: 'onwaar',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Toon kolommen',
  columnMenuManageColumns: 'Kolommen beheren',
  columnMenuFilter: 'Filteren',
  columnMenuHideColumn: 'Verbergen',
  columnMenuUnsort: 'Annuleer sortering',
  columnMenuSortAsc: 'Oplopend sorteren',
  columnMenuSortDesc: 'Aflopend sorteren',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count > 1 ? `${count} actieve filters` : `${count} filter actief`,
  columnHeaderFiltersLabel: 'Toon filters',
  columnHeaderSortIconLabel: 'Sorteren',
  // Rows selected footer text
  footerRowSelected: count => count > 1 ? `${count.toLocaleString()} rijen geselecteerd` : `${count.toLocaleString()} rij geselecteerd`,
  // Total row amount footer text
  footerTotalRows: 'Totaal:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} van ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox selectie',
  checkboxSelectionSelectAllRows: 'Alle rijen selecteren',
  checkboxSelectionUnselectAllRows: 'Alle rijen de-selecteren',
  checkboxSelectionSelectRow: 'Rij selecteren',
  checkboxSelectionUnselectRow: 'Rij de-selecteren',
  // Boolean cell text
  booleanCellTrueLabel: 'waar',
  booleanCellFalseLabel: 'onwaar',
  // Actions cell more text
  actionsCellMore: 'meer',
  // Column pinning text
  pinToLeft: 'Links vastzetten',
  pinToRight: 'Rechts vastzetten',
  unpin: 'Losmaken',
  // Tree Data
  treeDataGroupingHeaderName: 'Groep',
  treeDataExpand: 'Uitvouwen',
  treeDataCollapse: 'Inklappen',
  // Grouping columns
  groupingColumnHeaderName: 'Groep',
  groupColumn: name => `Groepeer op ${name}`,
  unGroupColumn: name => `Stop groeperen op ${name}`,
  // Master/detail
  detailPanelToggle: 'Detailmenu in- of uitklappen',
  expandDetailPanel: 'Uitklappen',
  collapseDetailPanel: 'Inklappen',
  // Row reordering text
  rowReorderingHeaderName: 'Rijen hersorteren',
  // Aggregation
  aggregationMenuItemHeader: 'Aggregatie',
  aggregationFunctionLabelSum: 'som',
  aggregationFunctionLabelAvg: 'gem',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'grootte'
};
const nlNL = exports.nlNL = (0, _getGridLocalization.getGridLocalization)(nlNLGrid, _locale.nlNL);