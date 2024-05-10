import * as React from 'react';
/**
 * Set of icons used in the grid component UI.
 */
export interface GridIconSlotsComponent {
    /**
     * Icon displayed on the boolean cell to represent the true value.
     * @default GridCheckIcon
     */
    booleanCellTrueIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the boolean cell to represent the false value.
     * @default GridCloseIcon
     */
    booleanCellFalseIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the side of the column header title to display the filter input component.
     * @default GridTripleDotsVerticalIcon
     */
    columnMenuIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the open filter button present in the toolbar by default.
     * @default GridFilterListIcon
     */
    openFilterButtonIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the column header menu to show that a filter has been applied to the column.
     * @default GridFilterAltIcon
     */
    columnFilteredIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the column menu selector tab.
     * @default GridColumnIcon
     */
    columnSelectorIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the side of the column header title when unsorted.
     * @default GridColumnUnsortedIcon
     */
    columnUnsortedIcon: React.JSXElementConstructor<any> | null;
    /**
     * Icon displayed on the side of the column header title when sorted in ascending order.
     * @default GridArrowUpwardIcon
     */
    columnSortedAscendingIcon: React.JSXElementConstructor<any> | null;
    /**
     * Icon displayed on the side of the column header title when sorted in descending order.
     * @default GridArrowDownwardIcon
     */
    columnSortedDescendingIcon: React.JSXElementConstructor<any> | null;
    /**
     * Icon displayed in between two column headers that allows to resize the column header.
     * @default GridSeparatorIcon
     */
    columnResizeIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the compact density option in the toolbar.
     * @default GridViewHeadlineIcon
     */
    densityCompactIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the standard density option in the toolbar.
     * @default GridTableRowsIcon
     */
    densityStandardIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the "comfortable" density option in the toolbar.
     * @default GridViewStreamIcon
     */
    densityComfortableIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the open export button present in the toolbar by default.
     * @default GridSaveAltIcon
     */
    exportIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the `actions` column type to open the menu.
     * @default GridMoreVertIcon
     */
    moreActionsIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the tree data toggling column when the children are collapsed
     * @default GridKeyboardArrowRight
     */
    treeDataExpandIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the tree data toggling column when the children are expanded
     * @default GridExpandMoreIcon
     */
    treeDataCollapseIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the grouping column when the children are collapsed
     * @default GridKeyboardArrowRight
     */
    groupingCriteriaExpandIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the grouping column when the children are expanded
     * @default GridExpandMoreIcon
     */
    groupingCriteriaCollapseIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the detail panel toggle column when collapsed.
     * @default GridAddIcon
     */
    detailPanelExpandIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the detail panel toggle column when expanded.
     * @default GridRemoveIcon
     */
    detailPanelCollapseIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed for deleting the filter from filter panel.
     * @default GridAddIcon
     */
    filterPanelAddIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed for deleting the filter from filter panel.
     * @default GridDeleteIcon
     */
    filterPanelDeleteIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed for deleting all the active filters from filter panel.
     * @default GridDeleteForeverIcon
     */
    filterPanelRemoveAllIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the `reorder` column type to reorder a row.
     * @default GridDragIcon
     */
    rowReorderIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the quick filter input.
     * @default GridSearchIcon
     */
    quickFilterIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the quick filter reset input.
     * @default GridCloseIcon
     */
    quickFilterClearIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed in column menu for hiding column
     * @default GridVisibilityOffIcon
     */
    columnMenuHideIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed in column menu for ascending sort
     * @default GridArrowUpwardIcon
     */
    columnMenuSortAscendingIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed in column menu for descending sort
     * @default GridArrowDownwardIcon
     */
    columnMenuSortDescendingIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed in column menu for filter
     * @default GridFilterAltIcon
     */
    columnMenuFilterIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed in column menu for showing all columns
     * @default GridViewColumnIcon
     */
    columnMenuManageColumnsIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed in column menu for clearing values
     * @default GridClearIcon
     */
    columnMenuClearIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the input while processing.
     * @default GridLoadIcon
     */
    loadIcon: React.JSXElementConstructor<any>;
    /**
     * Icon displayed on the column reorder button.
     * @default GridDragIcon
     */
    columnReorderIcon: React.JSXElementConstructor<any>;
}
