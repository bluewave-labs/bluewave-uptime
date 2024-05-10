"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csCZ = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const csCZGrid = {
  // Root
  noRowsLabel: 'Žádné záznamy',
  noResultsOverlayLabel: 'Nenašly se žadné výsledky.',
  // Density selector toolbar button text
  toolbarDensity: 'Zobrazení',
  toolbarDensityLabel: 'Zobrazení',
  toolbarDensityCompact: 'Kompaktní',
  toolbarDensityStandard: 'Standartní',
  toolbarDensityComfortable: 'Komfortní',
  // Columns selector toolbar button text
  toolbarColumns: 'Sloupce',
  toolbarColumnsLabel: 'Vybrat sloupec',
  // Filters toolbar button text
  toolbarFilters: 'Filtry',
  toolbarFiltersLabel: 'Zobrazit filtry',
  toolbarFiltersTooltipHide: 'Skrýt filtry',
  toolbarFiltersTooltipShow: 'Zobrazit filtry',
  toolbarFiltersTooltipActive: count => {
    let pluralForm = 'aktivních filtrů';
    if (count > 1 && count < 5) {
      pluralForm = 'aktivní filtry';
    } else if (count === 1) {
      pluralForm = 'aktivní filtr';
    }
    return `${count} ${pluralForm}`;
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Hledat…',
  toolbarQuickFilterLabel: 'Hledat',
  toolbarQuickFilterDeleteIconLabel: 'Vymazat',
  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Stáhnout jako CSV',
  toolbarExportPrint: 'Vytisknout',
  toolbarExportExcel: 'Stáhnout jako Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Přidat filtr',
  filterPanelRemoveAll: 'Odstranit vše',
  filterPanelDeleteIconLabel: 'Odstranit',
  filterPanelLogicOperator: 'Logický operátor',
  filterPanelOperator: 'Operátory',
  filterPanelOperatorAnd: 'A',
  filterPanelOperatorOr: 'Nebo',
  filterPanelColumns: 'Sloupce',
  filterPanelInputLabel: 'Hodnota',
  filterPanelInputPlaceholder: 'Hodnota filtru',
  // Filter operators text
  filterOperatorContains: 'obsahuje',
  filterOperatorEquals: 'rovná se',
  filterOperatorStartsWith: 'začíná na',
  filterOperatorEndsWith: 'končí na',
  filterOperatorIs: 'je',
  filterOperatorNot: 'není',
  filterOperatorAfter: 'je po',
  filterOperatorOnOrAfter: 'je po včetně',
  filterOperatorBefore: 'je před',
  filterOperatorOnOrBefore: 'je před včetně',
  filterOperatorIsEmpty: 'je prázdný',
  filterOperatorIsNotEmpty: 'není prázdný',
  filterOperatorIsAnyOf: 'je jeden z',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Obsahuje',
  headerFilterOperatorEquals: 'Rovná se',
  headerFilterOperatorStartsWith: 'Začíná na',
  headerFilterOperatorEndsWith: 'Končí na',
  headerFilterOperatorIs: 'Je',
  headerFilterOperatorNot: 'Není',
  headerFilterOperatorAfter: 'Je po',
  headerFilterOperatorOnOrAfter: 'Je po včetně',
  headerFilterOperatorBefore: 'Je před',
  headerFilterOperatorOnOrBefore: 'Je před včetně',
  headerFilterOperatorIsEmpty: 'Je prázdný',
  headerFilterOperatorIsNotEmpty: 'Není prázdný',
  headerFilterOperatorIsAnyOf: 'Je jeden z',
  'headerFilterOperator=': 'Rovná se',
  'headerFilterOperator!=': 'Nerovná se',
  'headerFilterOperator>': 'Větší než',
  'headerFilterOperator>=': 'Větší než nebo rovno',
  'headerFilterOperator<': 'Menší než',
  'headerFilterOperator<=': 'Menší než nebo rovno',
  // Filter values text
  filterValueAny: 'jakýkoliv',
  filterValueTrue: 'ano',
  filterValueFalse: 'ne',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Zobrazit sloupce',
  columnMenuManageColumns: 'Spravovat sloupce',
  columnMenuFilter: 'Filtr',
  columnMenuHideColumn: 'Skrýt',
  columnMenuUnsort: 'Zrušit filtry',
  columnMenuSortAsc: 'Seřadit vzestupně',
  columnMenuSortDesc: 'Seřadit sestupně',
  // Column header text
  columnHeaderFiltersTooltipActive: count => {
    let pluralForm = 'aktivních filtrů';
    if (count > 1 && count < 5) {
      pluralForm = 'aktivní filtry';
    } else if (count === 1) {
      pluralForm = 'aktivní filtr';
    }
    return `${count} ${pluralForm}`;
  },
  columnHeaderFiltersLabel: 'Zobrazit filtry',
  columnHeaderSortIconLabel: 'Filtrovat',
  // Rows selected footer text
  footerRowSelected: count => {
    let pluralForm = 'vybraných záznamů';
    if (count > 1 && count < 5) {
      pluralForm = 'vybrané záznamy';
    } else if (count === 1) {
      pluralForm = 'vybraný záznam';
    }
    return `${count} ${pluralForm}`;
  },
  // Total row amount footer text
  footerTotalRows: 'Celkem řádků:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => {
    const str = totalCount.toString();
    const firstDigit = str[0];
    const op = ['4', '6', '7'].includes(firstDigit) || firstDigit === '1' && str.length % 3 === 0 ? 'ze' : 'z';
    return `${visibleCount.toLocaleString()} ${op} ${totalCount.toLocaleString()}`;
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Výběr řádku',
  checkboxSelectionSelectAllRows: 'Označit všechny řádky',
  checkboxSelectionUnselectAllRows: 'Odznačit všechny řádky',
  checkboxSelectionSelectRow: 'Označit řádek',
  checkboxSelectionUnselectRow: 'Odznačit řádek',
  // Boolean cell text
  booleanCellTrueLabel: 'ano',
  booleanCellFalseLabel: 'ne',
  // Actions cell more text
  actionsCellMore: 'více',
  // Column pinning text
  pinToLeft: 'Připnout vlevo',
  pinToRight: 'Připnout vpravo',
  unpin: 'Odepnout',
  // Tree Data
  treeDataGroupingHeaderName: 'Skupina',
  treeDataExpand: 'zobrazit potomky',
  treeDataCollapse: 'skrýt potomky',
  // Grouping columns
  groupingColumnHeaderName: 'Skupina',
  groupColumn: name => `Seskupit podle ${name}`,
  unGroupColumn: name => `Přestat seskupovat podle ${name}`,
  // Master/detail
  detailPanelToggle: 'Přepnout detail panelu',
  expandDetailPanel: 'Rozbalit',
  collapseDetailPanel: 'Sbalit',
  // Row reordering text
  rowReorderingHeaderName: 'Přeuspořádávání řádků',
  // Aggregation
  aggregationMenuItemHeader: 'Seskupování',
  aggregationFunctionLabelSum: 'součet',
  aggregationFunctionLabelAvg: 'průměr',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'počet'
};
const csCZ = exports.csCZ = (0, _getGridLocalization.getGridLocalization)(csCZGrid, _locale.csCZ);