export interface GridClasses {
    /**
     * Styles applied to the root element of the cell with type="actions".
     */
    actionsCell: string;
    /**
     * Styles applied to the root element of the column header when aggregated.
     */
    aggregationColumnHeader: string;
    /**
     * Styles applied to the root element of the header when aggregation if `headerAlign="left"`.
     */
    'aggregationColumnHeader--alignLeft': string;
    /**
     * Styles applied to the root element of the header when aggregation if `headerAlign="center"`.
     */
    'aggregationColumnHeader--alignCenter': string;
    /**
     * Styles applied to the root element of the header when aggregation if `headerAlign="right"`.
     */
    'aggregationColumnHeader--alignRight': string;
    /**
     * Styles applied to the aggregation label in the column header when aggregated.
     */
    aggregationColumnHeaderLabel: string;
    /**
     * Styles applied to the root element if `autoHeight={true}`.
     */
    autoHeight: string;
    /**
     * Styles applied to the root element while it is being autosized.
     */
    autosizing: string;
    /**
     * Styles applied to the icon of the boolean cell.
     */
    booleanCell: string;
    /**
     * Styles applied to the cell element if the cell is editable.
     */
    'cell--editable': string;
    /**
     * Styles applied to the cell element if the cell is in edit mode.
     */
    'cell--editing': string;
    /**
     * Styles applied to the cell element in flex display mode.
     */
    'cell--flex': string;
    /**
     * Styles applied to the cell element if `align="center"`.
     */
    'cell--textCenter': string;
    /**
     * Styles applied to the cell element if `align="left"`.
     */
    'cell--textLeft': string;
    /**
     * Styles applied to the cell element if `align="right"`.
     */
    'cell--textRight': string;
    /**
     * Styles applied to the cell element if it is at the top edge of a cell selection range.
     */
    'cell--rangeTop': string;
    /**
     * Styles applied to the cell element if it is at the bottom edge of a cell selection range.
     */
    'cell--rangeBottom': string;
    /**
     * Styles applied to the cell element if it is at the left edge of a cell selection range.
     */
    'cell--rangeLeft': string;
    /**
     * Styles applied to the cell element if it is at the right edge of a cell selection range.
     */
    'cell--rangeRight': string;
    /**
     * Styles applied to the cell element if it is pinned to the left.
     */
    'cell--pinnedLeft': string;
    /**
     * Styles applied to the cell element if it is pinned to the right.
     */
    'cell--pinnedRight': string;
    /**
     * Styles applied to the cell element if it is in a cell selection range.
     */
    'cell--selectionMode': string;
    /**
     * Styles applied to the cell element.
     */
    cell: string;
    /**
     * Styles applied to the cell checkbox element.
     */
    cellCheckbox: string;
    /**
     * Styles applied to the empty cell element.
     */
    cellEmpty: string;
    /**
     * Styles applied to the skeleton cell element.
     */
    cellSkeleton: string;
    /**
     * @ignore - do not document.
     * Styles applied to the left offset cell element.
     */
    cellOffsetLeft: string;
    /**
     * Styles applied to the selection checkbox element.
     */
    checkboxInput: string;
    /**
     * Styles applied to the column header element.
     */
    columnHeader: string;
    /**
     * Styles applied to the column header if `headerAlign="center"`.
     */
    'columnHeader--alignCenter': string;
    /**
     * Styles applied to the column header if `headerAlign="left"`.
     */
    'columnHeader--alignLeft': string;
    /**
     * Styles applied to the column header if `headerAlign="right"`.
     */
    'columnHeader--alignRight': string;
    /**
     * Styles applied to the floating column header element when it is dragged.
     */
    'columnHeader--dragging': string;
    /**
     * Styles applied to the column header if it is being dragged.
     */
    'columnHeader--moving': string;
    /**
     * Styles applied to the column header if the type of the column is `number`.
     */
    'columnHeader--numeric': string;
    /**
     * Styles applied to the column header if the column is sortable.
     */
    'columnHeader--sortable': string;
    /**
     * Styles applied to the column header if the column is sorted.
     */
    'columnHeader--sorted': string;
    /**
     * Styles applied to the column header if the column has a filter applied to it.
     */
    'columnHeader--filtered': string;
    'columnHeader--pinnedLeft': string;
    'columnHeader--pinnedRight': string;
    /**
     * Styles applied to the last column header element.
     */
    'columnHeader--last': string;
    /**
     * Styles applied to the header checkbox cell element.
     */
    columnHeaderCheckbox: string;
    /**
     * Styles applied to the column header's draggable container element.
     */
    columnHeaderDraggableContainer: string;
    /**
     * Styles applied to the row's draggable placeholder element inside the special row reorder cell.
     */
    rowReorderCellPlaceholder: string;
    /**
     * Styles applied to the column header's title element;
     */
    columnHeaderTitle: string;
    /**
     * Styles applied to the column header's title container element.
     */
    columnHeaderTitleContainer: string;
    /**
     * Styles applied to the column header's title excepted buttons.
     */
    columnHeaderTitleContainerContent: string;
    /**
     * Styles applied to the column group header cell if not empty.
     */
    'columnHeader--filledGroup': string;
    /**
     * Styles applied to the empty column group header cell.
     */
    'columnHeader--emptyGroup': string;
    /**
     * Styles applied to the column headers.
     */
    columnHeaders: string;
    /**
     * Styles applied to the column header separator if the column is resizable.
     */
    'columnSeparator--resizable': string;
    /**
     * Styles applied to the column header separator if the column is being resized.
     */
    'columnSeparator--resizing': string;
    /**
     * Styles applied to the column header separator if the side is "left".
     */
    'columnSeparator--sideLeft': string;
    /**
     * Styles applied to the column header separator if the side is "right".
     */
    'columnSeparator--sideRight': string;
    /**
     * Styles applied to the column header separator element.
     */
    columnSeparator: string;
    /**
     * Styles applied to the columns management body.
     */
    columnsManagement: string;
    /**
     * Styles applied to the columns management row element.
     */
    columnsManagementRow: string;
    /**
     * Styles applied to the columns management header element.
     */
    columnsManagementHeader: string;
    /**
     * Styles applied to the columns management footer element.
     */
    columnsManagementFooter: string;
    /**
     * Styles applied to the top container.
     */
    'container--top': string;
    /**
     * Styles applied to the bottom container.
     */
    'container--bottom': string;
    /**
     * Styles applied to the detail panel element.
     */
    detailPanel: string;
    /**
     * Styles applied to the detail panels wrapper element.
     */
    detailPanels: string;
    /**
     * Styles applied to the detail panel toggle cell element.
     */
    detailPanelToggleCell: string;
    /**
     * Styles applied to the detail panel toggle cell element if expanded.
     */
    'detailPanelToggleCell--expanded': string;
    /**
     * Styles applied to the root element of the cell inside a footer row.
     */
    footerCell: string;
    /**
     * Styles applied to the panel element.
     */
    panel: string;
    /**
     * Styles applied to the panel header element.
     */
    panelHeader: string;
    /**
     * Styles applied to the panel wrapper element.
     */
    panelWrapper: string;
    /**
     * Styles applied to the panel content element.
     */
    panelContent: string;
    /**
     * Styles applied to the panel footer element.
     */
    panelFooter: string;
    /**
     * Styles applied to the paper element.
     */
    paper: string;
    /**
     * Styles applied to root of the boolean edit component.
     */
    editBooleanCell: string;
    /**
     * Styles applied to the filler row.
     * @ignore - do not document.
     */
    filler: string;
    /**
     * Styles applied to the filler row with top border.
     * @ignore - do not document.
     */
    'filler--borderTop': string;
    /**
     * Styles applied to the filler row pinned left section.
     * @ignore - do not document.
     */
    'filler--pinnedLeft': string;
    /**
     * Styles applied to the filler row pinned right section.
     * @ignore - do not document.
     */
    'filler--pinnedRight': string;
    /**
     * Styles applied to the root of the filter form component.
     */
    filterForm: string;
    /**
     * Styles applied to the delete icon of the filter form component.
     */
    filterFormDeleteIcon: string;
    /**
     * Styles applied to the link operator input of the filter form component.
     */
    filterFormLogicOperatorInput: string;
    /**
     * Styles applied to the column input of the filter form component.
     */
    filterFormColumnInput: string;
    /**
     * Styles applied to the operator input of the filter form component.
     */
    filterFormOperatorInput: string;
    /**
     * Styles applied to the value input of the filter form component.
     */
    filterFormValueInput: string;
    /**
     * Styles applied to the root of the input component.
     */
    editInputCell: string;
    /**
     * Styles applied to the filter icon element.
     */
    filterIcon: string;
    /**
     * Styles applied to the footer container element.
     */
    footerContainer: string;
    /**
     * Styles applied to the column header icon's container.
     */
    iconButtonContainer: string;
    /**
     * Styles applied to the column header separator icon element.
     */
    iconSeparator: string;
    /**
     * Styles applied to the column header filter row.
     */
    headerFilterRow: string;
    /**
     * Styles applied to the main container element.
     */
    main: string;
    /**
     * Styles applied to the main container element when it has right pinned columns.
     */
    'main--hasPinnedRight': string;
    /**
     * Styles applied to the menu element.
     */
    menu: string;
    /**
     * Styles applied to the menu icon element.
     */
    menuIcon: string;
    /**
     * Styles applied to the menu icon button element.
     */
    menuIconButton: string;
    /**
     * Styles applied to the menu icon element if the menu is open.
     */
    menuOpen: string;
    /**
     * Styles applied to the menu list element.
     */
    menuList: string;
    /**
     * Styles applied to the overlay wrapper element.
     */
    overlayWrapper: string;
    /**
     * Styles applied to the overlay wrapper inner element.
     */
    overlayWrapperInner: string;
    /**
     * Styles applied to the overlay element.
     */
    overlay: string;
    /**
     * Styles applied to the virtualization container.
     */
    virtualScroller: string;
    /**
     * Styles applied to the virtualization content.
     */
    virtualScrollerContent: string;
    /**
     * Styles applied to the virtualization content when its height is bigger than the virtualization container.
     */
    'virtualScrollerContent--overflowed': string;
    /**
     * Styles applied to the virtualization render zone.
     */
    virtualScrollerRenderZone: string;
    /**
     * Styles applied to the pinned columns.
     */
    pinnedColumns: string;
    /**
     * Styles applied to the root element.
     */
    root: string;
    /**
     * Styles applied to the root element if density is "standard" (default).
     */
    'root--densityStandard': string;
    /**
     * Styles applied to the root element if density is "comfortable".
     */
    'root--densityComfortable': string;
    /**
     * Styles applied to the root element if density is "compact".
     */
    'root--densityCompact': string;
    /**
     * Styles applied to the root element when user selection is disabled.
     */
    'root--disableUserSelection': string;
    /**
     * Styles applied to the row element if the row is editable.
     */
    'row--editable': string;
    /**
     * Styles applied to the row element if the row is in edit mode.
     */
    'row--editing': string;
    /**
     * Styles applied to the floating special row reorder cell element when it is dragged.
     */
    'row--dragging': string;
    /**
     * Styles applied to the first visible row element on every page of the grid.
     */
    'row--firstVisible': string;
    /**
     * Styles applied to the last visible row element on every page of the grid.
     */
    'row--lastVisible': string;
    /**
     * Styles applied to the row if it has dynamic row height.
     */
    'row--dynamicHeight': string;
    /**
     * Styles applied to the row if its detail panel is open.
     */
    'row--detailPanelExpanded': string;
    /**
     * Styles applied to the row element.
     */
    row: string;
    /**
     * Styles applied to the footer row count element to show the total number of rows.
     * Only works when pagination is disabled.
     */
    rowCount: string;
    /**
     * Styles applied to the row reorder cell container element.
     */
    rowReorderCellContainer: string;
    /**
     * Styles applied to the root element of the row reorder cell
     */
    rowReorderCell: string;
    /**
     * Styles applied to the root element of the row reorder cell when dragging is allowed
     */
    'rowReorderCell--draggable': string;
    /**
     * Styles applied to both scroll area elements.
     */
    scrollArea: string;
    /**
     * Styles applied to the left scroll area element.
     */
    'scrollArea--left': string;
    /**
     * Styles applied to the right scroll area element.
     */
    'scrollArea--right': string;
    /**
     * Styles applied to the scrollbars.
     */
    scrollbar: string;
    /**
     * Styles applied to the horizontal scrollbar.
     */
    'scrollbar--horizontal': string;
    /**
     * Styles applied to the horizontal scrollbar.
     */
    'scrollbar--vertical': string;
    /**
     * @ignore - do not document.
     * Styles applied to the scrollbar filler cell.
     */
    scrollbarFiller: string;
    /**
     * @ignore - do not document.
     * Styles applied to the scrollbar filler cell, in header position.
     */
    'scrollbarFiller--header': string;
    /**
     * @ignore - do not document.
     * Styles applied to the scrollbar filler cell, with a border top.
     */
    'scrollbarFiller--borderTop': string;
    /**
     * @ignore - do not document.
     * Styles applied to the scrollbar filler cell.
     */
    'scrollbarFiller--pinnedRight': string;
    /**
     * Styles applied to the footer selected row count element.
     */
    selectedRowCount: string;
    /**
     * Styles applied to the sort icon element.
     */
    sortIcon: string;
    /**
     * Styles applied to the toolbar container element.
     */
    toolbarContainer: string;
    /**
     * Styles applied to the toolbar filter list element.
     */
    toolbarFilterList: string;
    /**
     * Styles applied the grid if `showColumnVerticalBorder={true}`.
     */
    withVerticalBorder: string;
    /**
     * Styles applied to cells, column header and other elements that have border.
     * Sets border color only.
     */
    withBorderColor: string;
    /**
     * Styles applied the cell if `showColumnVerticalBorder={true}`.
     */
    'cell--withRightBorder': string;
    /**
     * Styles applied the cell if `showColumnVerticalBorder={true}`.
     */
    'cell--withLeftBorder': string;
    /**
     * Styles applied the column header if `showColumnVerticalBorder={true}`.
     */
    'columnHeader--withRightBorder': string;
    'columnHeader--withLeftBorder': string;
    /**
     * Styles applied to the root of the grouping column of the tree data.
     */
    treeDataGroupingCell: string;
    /**
     * Styles applied to the toggle of the grouping cell of the tree data.
     */
    treeDataGroupingCellToggle: string;
    /**
     * Styles applied to the root element of the grouping criteria cell
     */
    groupingCriteriaCell: string;
    /**
     * Styles applied to the toggle of the grouping criteria cell
     */
    groupingCriteriaCellToggle: string;
    /**
     * Styles applied to the pinned rows container.
     */
    pinnedRows: string;
    /**
     * Styles applied to the top pinned rows container.
     */
    'pinnedRows--top': string;
    /**
     * Styles applied to the bottom pinned rows container.
     */
    'pinnedRows--bottom': string;
    /**
     * Styles applied to pinned rows render zones.
     */
    pinnedRowsRenderZone: string;
}
export type GridClassKey = keyof GridClasses;
export declare function getDataGridUtilityClass(slot: string): string;
export declare const gridClasses: Record<keyof GridClasses, string>;
