import { itIT as itITCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const itITGrid = {
  // Root
  noRowsLabel: 'Nessun record',
  noResultsOverlayLabel: 'Nessun record trovato.',
  // Density selector toolbar button text
  toolbarDensity: 'Densità',
  toolbarDensityLabel: 'Densità',
  toolbarDensityCompact: 'Compatta',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comoda',
  // Columns selector toolbar button text
  toolbarColumns: 'Colonne',
  toolbarColumnsLabel: 'Seleziona le colonne',
  // Filters toolbar button text
  toolbarFilters: 'Filtri',
  toolbarFiltersLabel: 'Mostra i filtri',
  toolbarFiltersTooltipHide: 'Nascondi i filtri',
  toolbarFiltersTooltipShow: 'Mostra i filtri',
  toolbarFiltersTooltipActive: count => count > 1 ? `${count} filtri attivi` : `${count} filtro attivo`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Cerca…',
  toolbarQuickFilterLabel: 'Cerca',
  toolbarQuickFilterDeleteIconLabel: 'Resetta',
  // Export selector toolbar button text
  toolbarExport: 'Esporta',
  toolbarExportLabel: 'Esporta',
  toolbarExportCSV: 'Esporta in CSV',
  toolbarExportPrint: 'Stampa',
  toolbarExportExcel: 'Scarica come Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Aggiungi un filtro',
  filterPanelRemoveAll: 'Rimuovi filtri',
  filterPanelDeleteIconLabel: 'Rimuovi',
  filterPanelLogicOperator: 'Operatore logico',
  filterPanelOperator: 'Operatori',
  filterPanelOperatorAnd: 'E (and)',
  filterPanelOperatorOr: 'O (or)',
  filterPanelColumns: 'Colonne',
  filterPanelInputLabel: 'Valore',
  filterPanelInputPlaceholder: 'Filtra il valore',
  // Filter operators text
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'uguale a',
  filterOperatorStartsWith: 'comincia per',
  filterOperatorEndsWith: 'termina per',
  filterOperatorIs: 'uguale a',
  filterOperatorNot: 'diversa da',
  filterOperatorAfter: 'dopo il',
  filterOperatorOnOrAfter: 'a partire dal',
  filterOperatorBefore: 'prima del',
  filterOperatorOnOrBefore: 'fino al',
  filterOperatorIsEmpty: 'è vuoto',
  filterOperatorIsNotEmpty: 'non è vuoto',
  filterOperatorIsAnyOf: 'è uno tra',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Contiene',
  headerFilterOperatorEquals: 'uguale a',
  headerFilterOperatorStartsWith: 'comincia per',
  headerFilterOperatorEndsWith: 'termina per',
  headerFilterOperatorIs: 'uguale a',
  headerFilterOperatorNot: 'diversa da',
  headerFilterOperatorAfter: 'dopo il',
  headerFilterOperatorOnOrAfter: 'a partire dal',
  headerFilterOperatorBefore: 'prima del',
  headerFilterOperatorOnOrBefore: 'fino al',
  headerFilterOperatorIsEmpty: 'è vuoto',
  headerFilterOperatorIsNotEmpty: 'non è vuoto',
  headerFilterOperatorIsAnyOf: 'è uno tra',
  'headerFilterOperator=': 'uguale a',
  'headerFilterOperator!=': 'diverso da',
  'headerFilterOperator>': 'maggiore di',
  'headerFilterOperator>=': 'maggiore o uguale a',
  'headerFilterOperator<': 'minore di',
  'headerFilterOperator<=': 'minore o uguale a',
  // Filter values text
  filterValueAny: 'qualunque',
  filterValueTrue: 'vero',
  filterValueFalse: 'falso',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostra le colonne',
  columnMenuManageColumns: 'Gestisci colonne',
  columnMenuFilter: 'Filtra',
  columnMenuHideColumn: 'Nascondi',
  columnMenuUnsort: "Annulla l'ordinamento",
  columnMenuSortAsc: 'Ordinamento crescente',
  columnMenuSortDesc: 'Ordinamento decrescente',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count > 1 ? `${count} filtri attivi` : `${count} filtro attivo`,
  columnHeaderFiltersLabel: 'Mostra i filtri',
  columnHeaderSortIconLabel: 'Ordina',
  // Rows selected footer text
  footerRowSelected: count => count > 1 ? `${count.toLocaleString()} record selezionati` : `${count.toLocaleString()} record selezionato`,
  // Total row amount footer text
  footerTotalRows: 'Record totali:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} di ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleziona',
  checkboxSelectionSelectAllRows: 'Seleziona tutte le righe',
  checkboxSelectionUnselectAllRows: 'Deseleziona tutte le righe',
  checkboxSelectionSelectRow: 'Seleziona riga',
  checkboxSelectionUnselectRow: 'Deseleziona riga',
  // Boolean cell text
  booleanCellTrueLabel: 'vero',
  booleanCellFalseLabel: 'falso',
  // Actions cell more text
  actionsCellMore: 'più',
  // Column pinning text
  pinToLeft: 'Blocca a sinistra',
  pinToRight: 'Blocca a destra',
  unpin: 'Sblocca',
  // Tree Data
  treeDataGroupingHeaderName: 'Gruppo',
  treeDataExpand: 'mostra figli',
  treeDataCollapse: 'nascondi figli',
  // Grouping columns
  groupingColumnHeaderName: 'Gruppo',
  groupColumn: name => `Raggruppa per ${name}`,
  unGroupColumn: name => `Annulla raggruppamento per ${name}`,
  // Master/detail
  detailPanelToggle: 'Abilita pannello dettagli',
  expandDetailPanel: 'Espandi',
  collapseDetailPanel: 'Comprimi',
  // Row reordering text
  rowReorderingHeaderName: 'Riordinamento righe',
  // Aggregation
  aggregationMenuItemHeader: 'aggregazione',
  aggregationFunctionLabelSum: 'somma',
  aggregationFunctionLabelAvg: 'media',
  aggregationFunctionLabelMin: 'minimo',
  aggregationFunctionLabelMax: 'massimo',
  aggregationFunctionLabelSize: 'numero di elementi'
};
export const itIT = getGridLocalization(itITGrid, itITCore);