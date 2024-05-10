import { deDE as deDECore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const deDEGrid = {
  // Root
  noRowsLabel: 'Keine Einträge',
  noResultsOverlayLabel: 'Keine Ergebnisse gefunden.',
  // Density selector toolbar button text
  toolbarDensity: 'Zeilenhöhe',
  toolbarDensityLabel: 'Zeilenhöhe',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Breit',
  // Columns selector toolbar button text
  toolbarColumns: 'Spalten',
  toolbarColumnsLabel: 'Zeige Spaltenauswahl',
  // Filters toolbar button text
  toolbarFilters: 'Filter',
  toolbarFiltersLabel: 'Zeige Filter',
  toolbarFiltersTooltipHide: 'Verberge Filter',
  toolbarFiltersTooltipShow: 'Zeige Filter',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} aktive Filter` : `${count} aktiver Filter`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Suchen…',
  toolbarQuickFilterLabel: 'Suchen',
  toolbarQuickFilterDeleteIconLabel: 'Löschen',
  // Export selector toolbar button text
  toolbarExport: 'Exportieren',
  toolbarExportLabel: 'Exportieren',
  toolbarExportCSV: 'Download als CSV',
  toolbarExportPrint: 'Drucken',
  toolbarExportExcel: 'Download als Excel',
  // Columns management text
  columnsManagementSearchTitle: 'Suche',
  columnsManagementNoColumns: 'Keine Spalten',
  columnsManagementShowHideAllText: 'Alle anzeigen/verbergen',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Filter hinzufügen',
  filterPanelRemoveAll: 'Alle entfernen',
  filterPanelDeleteIconLabel: 'Löschen',
  filterPanelLogicOperator: 'Logische Operatoren',
  filterPanelOperator: 'Operatoren',
  filterPanelOperatorAnd: 'Und',
  filterPanelOperatorOr: 'Oder',
  filterPanelColumns: 'Spalten',
  filterPanelInputLabel: 'Wert',
  filterPanelInputPlaceholder: 'Wert filtern',
  // Filter operators text
  filterOperatorContains: 'enthält',
  filterOperatorEquals: 'ist gleich',
  filterOperatorStartsWith: 'beginnt mit',
  filterOperatorEndsWith: 'endet mit',
  filterOperatorIs: 'ist',
  filterOperatorNot: 'ist nicht',
  filterOperatorAfter: 'ist nach',
  filterOperatorOnOrAfter: 'ist am oder nach',
  filterOperatorBefore: 'ist vor',
  filterOperatorOnOrBefore: 'ist am oder vor',
  filterOperatorIsEmpty: 'ist leer',
  filterOperatorIsNotEmpty: 'ist nicht leer',
  filterOperatorIsAnyOf: 'ist einer der Werte',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Enthält',
  headerFilterOperatorEquals: 'Gleich',
  headerFilterOperatorStartsWith: 'Beginnt mit',
  headerFilterOperatorEndsWith: 'Endet mit',
  headerFilterOperatorIs: 'Ist',
  headerFilterOperatorNot: 'Ist nicht',
  headerFilterOperatorAfter: 'Ist nach',
  headerFilterOperatorOnOrAfter: 'Ist am oder nach',
  headerFilterOperatorBefore: 'Ist vor',
  headerFilterOperatorOnOrBefore: 'Ist am oder vor',
  headerFilterOperatorIsEmpty: 'Ist leer',
  headerFilterOperatorIsNotEmpty: 'Ist nicht leer',
  headerFilterOperatorIsAnyOf: 'Ist eines von',
  'headerFilterOperator=': 'Gleich',
  'headerFilterOperator!=': 'Ungleich',
  'headerFilterOperator>': 'Größer als',
  'headerFilterOperator>=': 'Größer als oder gleich',
  'headerFilterOperator<': 'Kleiner als',
  'headerFilterOperator<=': 'Kleiner als oder gleich',
  // Filter values text
  filterValueAny: 'Beliebig',
  filterValueTrue: 'Ja',
  filterValueFalse: 'Nein',
  // Column menu text
  columnMenuLabel: 'Menü',
  columnMenuShowColumns: 'Zeige alle Spalten',
  columnMenuManageColumns: 'Spalten verwalten',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Verbergen',
  columnMenuUnsort: 'Sortierung deaktivieren',
  columnMenuSortAsc: 'Sortiere aufsteigend',
  columnMenuSortDesc: 'Sortiere absteigend',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} aktive Filter` : `${count} aktiver Filter`,
  columnHeaderFiltersLabel: 'Zeige Filter',
  columnHeaderSortIconLabel: 'Sortieren',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `${count.toLocaleString()} Einträge ausgewählt` : `${count.toLocaleString()} Eintrag ausgewählt`,
  // Total row amount footer text
  footerTotalRows: 'Gesamt:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} von ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox Auswahl',
  checkboxSelectionSelectAllRows: 'Alle Zeilen auswählen',
  checkboxSelectionUnselectAllRows: 'Alle Zeilen abwählen',
  checkboxSelectionSelectRow: 'Zeile auswählen',
  checkboxSelectionUnselectRow: 'Zeile abwählen',
  // Boolean cell text
  booleanCellTrueLabel: 'Ja',
  booleanCellFalseLabel: 'Nein',
  // Actions cell more text
  actionsCellMore: 'Mehr',
  // Column pinning text
  pinToLeft: 'Links anheften',
  pinToRight: 'Rechts anheften',
  unpin: 'Loslösen',
  // Tree Data
  treeDataGroupingHeaderName: 'Gruppe',
  treeDataExpand: 'Kinder einblenden',
  treeDataCollapse: 'Kinder ausblenden',
  // Grouping columns
  groupingColumnHeaderName: 'Gruppierung',
  groupColumn: name => `Gruppieren nach ${name}`,
  unGroupColumn: name => `Gruppierung nach ${name} aufheben`,
  // Master/detail
  detailPanelToggle: 'Detailansicht Kippschalter',
  expandDetailPanel: 'Aufklappen',
  collapseDetailPanel: 'Zuklappen',
  // Row reordering text
  rowReorderingHeaderName: 'Reihen neu ordnen',
  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'Summe',
  aggregationFunctionLabelAvg: 'Mittelwert',
  aggregationFunctionLabelMin: 'Minimum',
  aggregationFunctionLabelMax: 'Maximum',
  aggregationFunctionLabelSize: 'Anzahl'
};
export const deDE = getGridLocalization(deDEGrid, deDECore);