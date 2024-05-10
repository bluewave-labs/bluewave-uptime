"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elGR = void 0;
var _locale = require("@mui/material/locale");
var _getGridLocalization = require("../utils/getGridLocalization");
const elGRGrid = {
  // Root
  noRowsLabel: 'Δεν υπάρχουν καταχωρήσεις',
  noResultsOverlayLabel: 'Δεν βρέθηκαν αποτελέσματα.',
  // Density selector toolbar button text
  toolbarDensity: 'Ύψος σειράς',
  toolbarDensityLabel: 'Ύψος σειράς',
  toolbarDensityCompact: 'Συμπαγής',
  toolbarDensityStandard: 'Προκαθορισμένο',
  toolbarDensityComfortable: 'Πλατύ',
  // Columns selector toolbar button text
  toolbarColumns: 'Στήλες',
  toolbarColumnsLabel: 'Επιλέξτε στήλες',
  // Filters toolbar button text
  toolbarFilters: 'Φίλτρα',
  toolbarFiltersLabel: 'Εμφάνιση φίλτρων',
  toolbarFiltersTooltipHide: 'Απόκρυψη φίλτρων',
  toolbarFiltersTooltipShow: 'Εμφάνιση φίλτρων',
  toolbarFiltersTooltipActive: count => count !== 1 ? `${count} ενεργά φίλτρα` : `${count} ενεργό φίλτρο`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Αναζήτηση…',
  toolbarQuickFilterLabel: 'Αναζήτηση',
  toolbarQuickFilterDeleteIconLabel: 'Καθαρισμός',
  // Export selector toolbar button text
  toolbarExport: 'Εξαγωγή',
  toolbarExportLabel: 'Εξαγωγή',
  toolbarExportCSV: 'Λήψη ως CSV',
  toolbarExportPrint: 'Εκτύπωση',
  toolbarExportExcel: 'Λήψη ως Excel',
  // Columns management text
  // columnsManagementSearchTitle: 'Search',
  // columnsManagementNoColumns: 'No columns',
  // columnsManagementShowHideAllText: 'Show/Hide All',
  // columnsManagementReset: 'Reset',

  // Filter panel text
  filterPanelAddFilter: 'Προσθήκη φίλτρου',
  filterPanelRemoveAll: 'Αφαίρεση όλων',
  filterPanelDeleteIconLabel: 'Διαγραφή',
  filterPanelLogicOperator: 'Λογικός τελεστής',
  filterPanelOperator: 'Τελεστές',
  filterPanelOperatorAnd: 'Καί',
  filterPanelOperatorOr: 'Ή',
  filterPanelColumns: 'Στήλες',
  filterPanelInputLabel: 'Τιμή',
  filterPanelInputPlaceholder: 'Τιμή φίλτρου',
  // Filter operators text
  filterOperatorContains: 'περιέχει',
  filterOperatorEquals: 'ισούται',
  filterOperatorStartsWith: 'ξεκινάει με',
  filterOperatorEndsWith: 'τελειώνει με',
  filterOperatorIs: 'είναι',
  filterOperatorNot: 'δεν είναι',
  filterOperatorAfter: 'είναι μετά',
  filterOperatorOnOrAfter: 'είναι ίσο ή μετά',
  filterOperatorBefore: 'είναι πριν',
  filterOperatorOnOrBefore: 'είναι ίσο ή πριν',
  filterOperatorIsEmpty: 'είναι κενό',
  filterOperatorIsNotEmpty: 'δεν είναι κενό',
  filterOperatorIsAnyOf: 'είναι οποιοδήποτε από',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Περιέχει',
  headerFilterOperatorEquals: 'Ισούται',
  headerFilterOperatorStartsWith: 'Ξεκινάει με',
  headerFilterOperatorEndsWith: 'Τελειώνει με',
  headerFilterOperatorIs: 'Είναι',
  headerFilterOperatorNot: 'Δεν είναι',
  headerFilterOperatorAfter: 'Είναι μετά',
  headerFilterOperatorOnOrAfter: 'Είναι ίσο ή μετά',
  headerFilterOperatorBefore: 'Είναι πριν',
  headerFilterOperatorOnOrBefore: 'Είναι ίσο ή πριν',
  headerFilterOperatorIsEmpty: 'Είναι κενό',
  headerFilterOperatorIsNotEmpty: 'Δεν είναι κενό',
  headerFilterOperatorIsAnyOf: 'Είναι οποιοδήποτε από',
  'headerFilterOperator=': 'Ισούται',
  'headerFilterOperator!=': 'Δεν ισούται',
  'headerFilterOperator>': 'Μεγαλύτερο από',
  'headerFilterOperator>=': 'Μεγαλύτερο ή ίσο με',
  'headerFilterOperator<': 'Μικρότερο από',
  'headerFilterOperator<=': 'Μικρότερο ή ίσο με',
  // Filter values text
  filterValueAny: 'οποιοδήποτε',
  filterValueTrue: 'αληθές',
  filterValueFalse: 'ψευδές',
  // Column menu text
  columnMenuLabel: 'Μενού',
  columnMenuShowColumns: 'Εμφάνιση στηλών',
  columnMenuManageColumns: 'Διαχείριση στηλών',
  columnMenuFilter: 'Φίλτρο',
  columnMenuHideColumn: 'Απόκρυψη',
  columnMenuUnsort: 'Απενεργοποίηση ταξινόμησης',
  columnMenuSortAsc: 'Ταξινόμηση σε αύξουσα σειρά',
  columnMenuSortDesc: 'Ταξινόμηση σε φθίνουσα σειρά',
  // Column header text
  columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} ενεργά φίλτρα` : `${count} ενεργό φίλτρο`,
  columnHeaderFiltersLabel: 'Εμφάνιση φίλτρων',
  columnHeaderSortIconLabel: 'Ταξινόμηση',
  // Rows selected footer text
  footerRowSelected: count => count !== 1 ? `${count.toLocaleString()} επιλεγμένες γραμμές` : `${count.toLocaleString()} επιλεγμένη γραμμή`,
  // Total row amount footer text
  footerTotalRows: 'Σύνολο Γραμμών:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} από ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Επιλογή πλαισίου ελέγχου',
  checkboxSelectionSelectAllRows: 'Επιλέξτε όλες τις σειρές',
  checkboxSelectionUnselectAllRows: 'Καταργήση επιλογής όλων των σειρών',
  checkboxSelectionSelectRow: 'Επιλογή γραμμής',
  checkboxSelectionUnselectRow: 'Καταργήση επιλογής γραμμής',
  // Boolean cell text
  booleanCellTrueLabel: 'ναί',
  booleanCellFalseLabel: 'όχι',
  // Actions cell more text
  actionsCellMore: 'περισσότερα',
  // Column pinning text
  pinToLeft: 'Καρφιτσώμα στα αριστερά',
  pinToRight: 'Καρφιτσώμα στα δεξιά',
  unpin: 'Ξεκαρφίτσωμα',
  // Tree Data
  treeDataGroupingHeaderName: 'Ομαδοποίηση',
  treeDataExpand: 'εμφάνιση περιεχομένων',
  treeDataCollapse: 'απόκρυψη περιεχομένων',
  // Grouping columns
  groupingColumnHeaderName: 'Ομαδοποίηση',
  groupColumn: name => `Ομαδοποίηση κατά ${name}`,
  unGroupColumn: name => `Διακοπή ομαδοποίησης κατά ${name}`,
  // Master/detail
  detailPanelToggle: 'Εναλλαγή πίνακα λεπτομερειών',
  expandDetailPanel: 'Ανάπτυξη',
  collapseDetailPanel: 'Σύμπτυξη',
  // Row reordering text
  rowReorderingHeaderName: 'Αναδιάταξη γραμμών',
  // Aggregation
  aggregationMenuItemHeader: 'Συσσωμάτωση',
  aggregationFunctionLabelSum: 'άθροισμα',
  aggregationFunctionLabelAvg: 'μέση τιμή',
  aggregationFunctionLabelMin: 'ελάχιστο',
  aggregationFunctionLabelMax: 'μέγιστο',
  aggregationFunctionLabelSize: 'μέγεθος'
};
const elGR = exports.elGR = (0, _getGridLocalization.getGridLocalization)(elGRGrid, _locale.elGR);