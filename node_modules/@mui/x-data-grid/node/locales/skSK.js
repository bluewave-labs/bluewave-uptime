"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skSK = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const skSKGrid = {
  // Root
  noRowsLabel: 'Žiadne záznamy',
  noResultsOverlayLabel: 'Nenašli sa žadne výsledky.',
  // Density selector toolbar button text
  toolbarDensity: 'Hustota',
  toolbarDensityLabel: 'Hustota',
  toolbarDensityCompact: 'Kompaktná',
  toolbarDensityStandard: 'Štandartná',
  toolbarDensityComfortable: 'Komfortná',
  // Columns selector toolbar button text
  toolbarColumns: 'Stĺpce',
  toolbarColumnsLabel: 'Vybrať stĺpce',
  // Filters toolbar button text
  toolbarFilters: 'Filtre',
  toolbarFiltersLabel: 'Zobraziť filtre',
  toolbarFiltersTooltipHide: 'Skryť filtre ',
  toolbarFiltersTooltipShow: 'Zobraziť filtre',
  toolbarFiltersTooltipActive: count => {
    let pluralForm = 'aktívnych filtrov';
    if (count > 1 && count < 5) {
      pluralForm = 'aktívne filtre';
    } else if (count === 1) {
      pluralForm = 'aktívny filter';
    }
    return `${count} ${pluralForm}`;
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Vyhľadať…',
  toolbarQuickFilterLabel: 'Vyhľadať',
  toolbarQuickFilterDeleteIconLabel: 'Vymazať',
  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Stiahnuť ako CSV',
  toolbarExportPrint: 'Vytlačiť',
  toolbarExportExcel: 'Stiahnuť ako Excel',
  // Columns management text
  columnsManagementSearchTitle: 'Vyhľadať',
  columnsManagementNoColumns: 'Žiadne stĺpce',
  columnsManagementShowHideAllText: 'Zobraziť/Skryť všetko',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Pridať filter',
  filterPanelRemoveAll: 'Odstrániť všetky',
  filterPanelDeleteIconLabel: 'Odstrániť',
  filterPanelLogicOperator: 'Logický operátor',
  filterPanelOperator: 'Operátory',
  filterPanelOperatorAnd: 'A',
  filterPanelOperatorOr: 'Alebo',
  filterPanelColumns: 'Stĺpce',
  filterPanelInputLabel: 'Hodnota',
  filterPanelInputPlaceholder: 'Hodnota filtra',
  // Filter operators text
  filterOperatorContains: 'obsahuje',
  filterOperatorEquals: 'rovná sa',
  filterOperatorStartsWith: 'začína s',
  filterOperatorEndsWith: 'končí na',
  filterOperatorIs: 'je',
  filterOperatorNot: 'nie je',
  filterOperatorAfter: 'je po',
  filterOperatorOnOrAfter: 'je na alebo po',
  filterOperatorBefore: 'je pred',
  filterOperatorOnOrBefore: 'je na alebo skôr',
  filterOperatorIsEmpty: 'je prázdny',
  filterOperatorIsNotEmpty: 'nie je prázdny',
  filterOperatorIsAnyOf: 'je jeden z',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Obsahuje',
  headerFilterOperatorEquals: 'Rovná sa',
  headerFilterOperatorStartsWith: 'Začína s',
  headerFilterOperatorEndsWith: 'Končí na',
  headerFilterOperatorIs: 'Je',
  headerFilterOperatorNot: 'Nie je',
  headerFilterOperatorAfter: 'Je po',
  headerFilterOperatorOnOrAfter: 'Je na alebo po',
  headerFilterOperatorBefore: 'Je pred',
  headerFilterOperatorOnOrBefore: 'Je na alebo skôr',
  headerFilterOperatorIsEmpty: 'Je prázdny',
  headerFilterOperatorIsNotEmpty: 'Nie je prázdny',
  headerFilterOperatorIsAnyOf: 'Je jeden z',
  'headerFilterOperator=': 'Rovná sa',
  'headerFilterOperator!=': 'Nerovná sa',
  'headerFilterOperator>': 'Väčší ako',
  'headerFilterOperator>=': 'Väčší ako alebo rovný',
  'headerFilterOperator<': 'Menší ako',
  'headerFilterOperator<=': 'Menší ako alebo rovný',
  // Filter values text
  filterValueAny: 'akýkoľvek',
  filterValueTrue: 'áno',
  filterValueFalse: 'nie',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Zobraziť stĺpce',
  columnMenuManageColumns: 'Spravovať stĺpce',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Skryť',
  columnMenuUnsort: 'Zrušiť filtre',
  columnMenuSortAsc: 'Zoradiť vzostupne',
  columnMenuSortDesc: 'Zoradiť zostupne',
  // Column header text
  columnHeaderFiltersTooltipActive: count => {
    let pluralForm = 'aktívnych filtrov';
    if (count > 1 && count < 5) {
      pluralForm = 'aktívne filtre';
    } else if (count === 1) {
      pluralForm = 'aktívny filter';
    }
    return `${count} ${pluralForm}`;
  },
  columnHeaderFiltersLabel: 'Zobraziť filtre',
  columnHeaderSortIconLabel: 'Filtrovať',
  // Rows selected footer text
  footerRowSelected: count => {
    let pluralForm = 'vybraných záznamov';
    if (count > 1 && count < 5) {
      pluralForm = 'vybrané záznamy';
    } else if (count === 1) {
      pluralForm = 'vybraný záznam';
    }
    return `${count} ${pluralForm}`;
  },
  // Total row amount footer text
  footerTotalRows: 'Riadkov spolu:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => {
    const str = totalCount.toString();
    const firstDigit = str[0];
    const op = ['4', '6', '7'].includes(firstDigit) || firstDigit === '1' && str.length % 3 === 0 ? 'zo' : 'z';
    return `${visibleCount.toLocaleString()} ${op} ${totalCount.toLocaleString()}`;
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Výber riadku',
  checkboxSelectionSelectAllRows: 'Vybrať všetky riadky',
  checkboxSelectionUnselectAllRows: 'Zrušiť výber všetkých riadkov',
  checkboxSelectionSelectRow: 'Vyber riadok',
  checkboxSelectionUnselectRow: 'Zruš výber riadku',
  // Boolean cell text
  booleanCellTrueLabel: 'áno',
  booleanCellFalseLabel: 'nie',
  // Actions cell more text
  actionsCellMore: 'viac',
  // Column pinning text
  pinToLeft: 'Pripnúť na ľavo',
  pinToRight: 'Pripnúť na pravo',
  unpin: 'Odopnúť',
  // Tree Data
  treeDataGroupingHeaderName: 'Skupina',
  treeDataExpand: 'zobraziť potomkov',
  treeDataCollapse: 'skryť potomkov',
  // Grouping columns
  groupingColumnHeaderName: 'Skupina',
  groupColumn: name => `Zoskupiť podľa ${name}`,
  unGroupColumn: name => `Prestať zoskupovať podľa ${name}`,
  // Master/detail
  detailPanelToggle: 'Prepnúť detail panelu',
  expandDetailPanel: 'Rozbaliť',
  collapseDetailPanel: 'Zbaliť',
  // Row reordering text
  rowReorderingHeaderName: 'Preusporiadávanie riadkov',
  // Aggregation
  aggregationMenuItemHeader: 'Agregácia',
  aggregationFunctionLabelSum: 'suma',
  aggregationFunctionLabelAvg: 'priemer',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'počet'
};
const skSK = exports.skSK = (0, _getGridLocalization.getGridLocalization)(skSKGrid, _locale.skSK);