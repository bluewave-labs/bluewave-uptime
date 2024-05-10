import * as React from 'react';
import type { ComponentsPropsList } from '@mui/material/styles';
import type { WrappedLabelDisplayedRows } from '../../components/GridPagination';
import type { GridColDef } from '../colDef';
export type MuiTablePaginationLocalizedProps = Omit<ComponentsPropsList['MuiTablePagination'], 'page' | 'count' | 'onChangePage' | 'rowsPerPage' | 'onPageChange' | 'labelDisplayedRows'> & {
    labelDisplayedRows?: WrappedLabelDisplayedRows;
};
/**
 * Set the types of the texts in the grid.
 */
export interface GridLocaleText {
    noRowsLabel: string;
    noResultsOverlayLabel: string;
    toolbarDensity: React.ReactNode;
    toolbarDensityLabel: string;
    toolbarDensityCompact: string;
    toolbarDensityStandard: string;
    toolbarDensityComfortable: string;
    toolbarColumns: React.ReactNode;
    toolbarColumnsLabel: string;
    toolbarFilters: React.ReactNode;
    toolbarFiltersLabel: string;
    toolbarFiltersTooltipHide: React.ReactNode;
    toolbarFiltersTooltipShow: React.ReactNode;
    toolbarFiltersTooltipActive: (count: number) => React.ReactNode;
    toolbarQuickFilterPlaceholder: string;
    toolbarQuickFilterLabel: string;
    toolbarQuickFilterDeleteIconLabel: string;
    toolbarExport: React.ReactNode;
    toolbarExportLabel: string;
    toolbarExportCSV: React.ReactNode;
    toolbarExportPrint: React.ReactNode;
    toolbarExportExcel: string;
    columnsManagementSearchTitle: string;
    columnsManagementNoColumns: string;
    columnsManagementShowHideAllText: string;
    columnsManagementReset: string;
    filterPanelAddFilter: React.ReactNode;
    filterPanelRemoveAll: React.ReactNode;
    filterPanelDeleteIconLabel: string;
    filterPanelLogicOperator: string;
    filterPanelOperator: React.ReactNode;
    filterPanelOperatorAnd: React.ReactNode;
    filterPanelOperatorOr: React.ReactNode;
    filterPanelColumns: React.ReactNode;
    filterPanelInputLabel: string;
    filterPanelInputPlaceholder: string;
    filterOperatorContains: string;
    filterOperatorEquals: string;
    filterOperatorStartsWith: string;
    filterOperatorEndsWith: string;
    filterOperatorIs: string;
    filterOperatorNot: string;
    filterOperatorAfter: string;
    filterOperatorOnOrAfter: string;
    filterOperatorBefore: string;
    filterOperatorOnOrBefore: string;
    filterOperatorIsEmpty: string;
    filterOperatorIsNotEmpty: string;
    filterOperatorIsAnyOf: string;
    'filterOperator=': string;
    'filterOperator!=': string;
    'filterOperator>': string;
    'filterOperator>=': string;
    'filterOperator<': string;
    'filterOperator<=': string;
    headerFilterOperatorContains: string;
    headerFilterOperatorEquals: string;
    headerFilterOperatorStartsWith: string;
    headerFilterOperatorEndsWith: string;
    headerFilterOperatorIs: string;
    headerFilterOperatorNot: string;
    headerFilterOperatorAfter: string;
    headerFilterOperatorOnOrAfter: string;
    headerFilterOperatorBefore: string;
    headerFilterOperatorOnOrBefore: string;
    headerFilterOperatorIsEmpty: string;
    headerFilterOperatorIsNotEmpty: string;
    headerFilterOperatorIsAnyOf: string;
    'headerFilterOperator=': string;
    'headerFilterOperator!=': string;
    'headerFilterOperator>': string;
    'headerFilterOperator>=': string;
    'headerFilterOperator<': string;
    'headerFilterOperator<=': string;
    filterValueAny: string;
    filterValueTrue: string;
    filterValueFalse: string;
    columnMenuLabel: string;
    columnMenuShowColumns: React.ReactNode;
    columnMenuManageColumns: React.ReactNode;
    columnMenuFilter: React.ReactNode;
    columnMenuHideColumn: React.ReactNode;
    columnMenuUnsort: React.ReactNode;
    columnMenuSortAsc: React.ReactNode | ((colDef: GridColDef) => React.ReactNode);
    columnMenuSortDesc: React.ReactNode | ((colDef: GridColDef) => React.ReactNode);
    columnHeaderFiltersTooltipActive: (count: number) => React.ReactNode;
    columnHeaderFiltersLabel: string;
    columnHeaderSortIconLabel: string;
    footerRowSelected: (count: number) => React.ReactNode;
    footerTotalRows: React.ReactNode;
    footerTotalVisibleRows: (visibleCount: number, totalCount: number) => React.ReactNode;
    checkboxSelectionHeaderName: string;
    checkboxSelectionSelectAllRows: string;
    checkboxSelectionUnselectAllRows: string;
    checkboxSelectionSelectRow: string;
    checkboxSelectionUnselectRow: string;
    booleanCellTrueLabel: string;
    booleanCellFalseLabel: string;
    actionsCellMore: string;
    pinToLeft: string;
    pinToRight: string;
    unpin: string;
    treeDataGroupingHeaderName: string;
    treeDataExpand: string;
    treeDataCollapse: string;
    groupingColumnHeaderName: string;
    groupColumn: (name: string) => string;
    unGroupColumn: (name: string) => string;
    detailPanelToggle: string;
    expandDetailPanel: string;
    collapseDetailPanel: string;
    rowReorderingHeaderName: string;
    aggregationMenuItemHeader: string;
    aggregationFunctionLabelSum: string;
    aggregationFunctionLabelAvg: string;
    aggregationFunctionLabelMin: string;
    aggregationFunctionLabelMax: string;
    aggregationFunctionLabelSize: string;
    MuiTablePagination: MuiTablePaginationLocalizedProps;
}
export type GridTranslationKeys = keyof GridLocaleText;
/**
 * The grid locale text API [[apiRef]].
 */
export interface GridLocaleTextApi {
    /**
     * Returns the translation for the `key`.
     * @param {T} key One of the keys in [[GridLocaleText]].
     * @returns {GridLocaleText[T]} The translated value.
     */
    getLocaleText: <T extends GridTranslationKeys>(key: T) => GridLocaleText[T];
}
