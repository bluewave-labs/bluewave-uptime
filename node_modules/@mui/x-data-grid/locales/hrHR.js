import { hrHR as hrHRCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
const hrHRGrid = {
  // Root
  noRowsLabel: 'Nema redova',
  noResultsOverlayLabel: 'Nema rezultata.',
  // Density selector toolbar button text
  toolbarDensity: 'Gustoća',
  toolbarDensityLabel: 'Gustoća',
  toolbarDensityCompact: 'Kompaktan',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Udobno',
  // Columns selector toolbar button text
  toolbarColumns: 'Stupci',
  toolbarColumnsLabel: 'Odaberite stupce',
  // Filters toolbar button text
  toolbarFilters: 'Filteri',
  toolbarFiltersLabel: 'Prikaži filtre',
  toolbarFiltersTooltipHide: 'Sakrij filtre',
  toolbarFiltersTooltipShow: 'Prikaži filtre',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} aktivnih filtara` : `${count} aktivni filter`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Traži…',
  toolbarQuickFilterLabel: 'traži',
  toolbarQuickFilterDeleteIconLabel: 'Čisto',
  // Export selector toolbar button text
  toolbarExport: 'Izvoz',
  toolbarExportLabel: 'Izvoz',
  toolbarExportCSV: 'Preuzmi kao CSV',
  toolbarExportPrint: 'Ispis',
  toolbarExportExcel: 'Preuzmite kao Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Dodajte filter',
  filterPanelRemoveAll: 'Ukloniti sve',
  filterPanelDeleteIconLabel: 'Izbrisati',
  filterPanelLogicOperator: 'Logički operator',
  filterPanelOperator: 'Operater',
  filterPanelOperatorAnd: 'I',
  filterPanelOperatorOr: 'Ili',
  filterPanelColumns: 'Stupci',
  filterPanelInputLabel: 'Vrijednost',
  filterPanelInputPlaceholder: 'Vrijednost filtra',
  // Filter operators text
  filterOperatorContains: 'sadrži',
  filterOperatorEquals: 'jednaki',
  filterOperatorStartsWith: 'počinje sa',
  filterOperatorEndsWith: 'završava sa',
  filterOperatorIs: 'je',
  filterOperatorNot: 'nije',
  filterOperatorAfter: 'je poslije',
  filterOperatorOnOrAfter: 'je na ili poslije',
  filterOperatorBefore: 'je prije',
  filterOperatorOnOrBefore: 'je na ili prije',
  filterOperatorIsEmpty: 'prazno je',
  filterOperatorIsNotEmpty: 'nije prazna',
  filterOperatorIsAnyOf: 'je bilo koji od',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Sadrži',
  headerFilterOperatorEquals: 'Jednako',
  headerFilterOperatorStartsWith: 'Počinje sa',
  headerFilterOperatorEndsWith: 'Završava s',
  headerFilterOperatorIs: 'Je',
  headerFilterOperatorNot: 'Nije',
  headerFilterOperatorAfter: 'Je poslije',
  headerFilterOperatorOnOrAfter: 'Je uključeno ili poslije',
  headerFilterOperatorBefore: 'Je li prije',
  headerFilterOperatorOnOrBefore: 'Uključeno je ili prije',
  headerFilterOperatorIsEmpty: 'Prazno je',
  headerFilterOperatorIsNotEmpty: 'Nije prazna',
  headerFilterOperatorIsAnyOf: 'Je li bilo koji od',
  'headerFilterOperator=': 'Jednako',
  'headerFilterOperator!=': 'Nije jednako',
  'headerFilterOperator>': 'Veći od',
  'headerFilterOperator>=': 'Veće ili jednako',
  'headerFilterOperator<': 'Manje od',
  'headerFilterOperator<=': 'Manje od ili jednako',
  // Filter values text
  filterValueAny: 'bilo koji',
  filterValueTrue: 'pravi',
  filterValueFalse: 'lažno',
  // Column menu text
  columnMenuLabel: 'Jelovnik ',
  columnMenuShowColumns: 'Prikaži stupce',
  columnMenuManageColumns: 'Upravljanje stupcima',
  columnMenuFilter: 'filtar',
  columnMenuHideColumn: 'Sakrij stupac',
  columnMenuUnsort: 'Poništi sortiranje',
  columnMenuSortAsc: 'Poredaj uzlazno',
  columnMenuSortDesc: 'Poredaj silaznim redom',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} aktivnih filtara` : `${count} aktivni filter`,
  columnHeaderFiltersLabel: 'Prikaži filtre',
  columnHeaderSortIconLabel: 'Vrsta',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `Odabrano je ${count.toLocaleString()} redaka` : `${count.toLocaleString()} redak odabran`,
  // Total row amount footer text
  footerTotalRows: 'Ukupno redaka:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} od ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Odabir potvrdnog okvira',
  checkboxSelectionSelectAllRows: 'Odaberite sve retke',
  checkboxSelectionUnselectAllRows: 'Poništi odabir svih redaka',
  checkboxSelectionSelectRow: 'Odaberite red',
  checkboxSelectionUnselectRow: 'Poništi odabir retka',
  // Boolean cell text
  booleanCellTrueLabel: 'Da',
  booleanCellFalseLabel: 'Ne',
  // Actions cell more text
  actionsCellMore: 'više',
  // Column pinning text
  pinToLeft: 'Prikvači lijevo',
  pinToRight: 'Prikvači desno',
  unpin: 'Otkvači',
  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: 'vidjeti djecu',
  treeDataCollapse: 'sakriti djecu',
  // Grouping columns
  groupingColumnHeaderName: 'Skupina',
  groupColumn: name => `Grupiraj prema ${name}`,
  unGroupColumn: name => `Zaustavi grupiranje prema ${name}`,
  // Master/detail
  detailPanelToggle: 'Prebacivanje ploče s detaljima',
  expandDetailPanel: 'Proširiti',
  collapseDetailPanel: 'Kolaps',
  // Row reordering text
  rowReorderingHeaderName: 'Promjena redoslijeda',
  // Aggregation
  aggregationMenuItemHeader: 'Agregacija',
  aggregationFunctionLabelSum: 'iznos',
  aggregationFunctionLabelAvg: 'prosj',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'veličina'
};
export const hrHR = getGridLocalization(hrHRGrid, hrHRCore);