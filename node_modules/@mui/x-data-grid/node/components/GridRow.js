"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _fastMemo = require("../utils/fastMemo");
var _gridEditRowModel = require("../models/gridEditRowModel");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _gridClasses = require("../constants/gridClasses");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _gridColumnsSelector = require("../hooks/features/columns/gridColumnsSelector");
var _useGridSelector = require("../hooks/utils/useGridSelector");
var _useGridVisibleRows = require("../hooks/utils/useGridVisibleRows");
var _domUtils = require("../utils/domUtils");
var _gridCheckboxSelectionColDef = require("../colDef/gridCheckboxSelectionColDef");
var _gridActionsColDef = require("../colDef/gridActionsColDef");
var _gridDetailPanelToggleField = require("../constants/gridDetailPanelToggleField");
var _gridSortingSelector = require("../hooks/features/sorting/gridSortingSelector");
var _gridRowsSelector = require("../hooks/features/rows/gridRowsSelector");
var _gridColumnGroupsSelector = require("../hooks/features/columnGrouping/gridColumnGroupsSelector");
var _gridEditingSelectors = require("../hooks/features/editing/gridEditingSelectors");
var _GridCell = require("./cell/GridCell");
var _GridScrollbarFillerCell = require("./GridScrollbarFillerCell");
var _getPinnedCellOffset = require("../internals/utils/getPinnedCellOffset");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["selected", "rowId", "row", "index", "style", "rowHeight", "className", "visibleColumns", "pinnedColumns", "offsetTop", "offsetLeft", "dimensions", "renderContext", "focusedColumnIndex", "isFirstVisible", "isLastVisible", "isNotVisible", "focusedCell", "tabbableCell", "onClick", "onDoubleClick", "onMouseEnter", "onMouseLeave", "onMouseOut", "onMouseOver"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    editable,
    editing,
    selected,
    isFirstVisible,
    isLastVisible,
    rowHeight,
    classes
  } = ownerState;
  const slots = {
    root: ['row', selected && 'selected', editable && 'row--editable', editing && 'row--editing', isFirstVisible && 'row--firstVisible', isLastVisible && 'row--lastVisible', rowHeight === 'auto' && 'row--dynamicHeight']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function EmptyCell({
  width
}) {
  if (!width) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "presentation",
    className: (0, _clsx.default)(_gridClasses.gridClasses.cell, _gridClasses.gridClasses.cellEmpty),
    style: {
      '--width': `${width}px`
    }
  });
}
const GridRow = /*#__PURE__*/React.forwardRef(function GridRow(props, refProp) {
  const {
      selected,
      rowId,
      row,
      index,
      style: styleProp,
      rowHeight,
      className,
      visibleColumns,
      pinnedColumns,
      offsetLeft,
      dimensions,
      renderContext,
      focusedColumnIndex,
      isFirstVisible,
      isLastVisible,
      isNotVisible,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onMouseOut,
      onMouseOver
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const ref = React.useRef(null);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const currentPage = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, rootProps);
  const sortModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortModelSelector);
  const treeDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridRowMaximumTreeDepthSelector);
  const headerGroupingMaxDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector);
  const columnPositions = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnPositionsSelector);
  const editRowsState = (0, _useGridSelector.useGridSelector)(apiRef, _gridEditingSelectors.gridEditRowsStateSelector);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, refProp);
  const rowNode = apiRef.current.getRowNode(rowId);
  const scrollbarWidth = dimensions.hasScrollY ? dimensions.scrollbarSize : 0;
  const gridHasFiller = dimensions.columnsTotalWidth < dimensions.viewportOuterSize.width;
  const hasFocusCell = focusedColumnIndex !== undefined;
  const hasVirtualFocusCellLeft = hasFocusCell && focusedColumnIndex >= pinnedColumns.left.length && focusedColumnIndex < renderContext.firstColumnIndex;
  const hasVirtualFocusCellRight = hasFocusCell && focusedColumnIndex < visibleColumns.length - pinnedColumns.right.length && focusedColumnIndex >= renderContext.lastColumnIndex;
  const ariaRowIndex = index + headerGroupingMaxDepth + 2; // 1 for the header row and 1 as it's 1-based

  const ownerState = {
    selected,
    isFirstVisible,
    isLastVisible,
    classes: rootProps.classes,
    editing: apiRef.current.getRowMode(rowId) === _gridEditRowModel.GridRowModes.Edit,
    editable: rootProps.editMode === _gridEditRowModel.GridEditModes.Row,
    rowHeight
  };
  const classes = useUtilityClasses(ownerState);
  React.useLayoutEffect(() => {
    if (rowHeight === 'auto' && ref.current && typeof ResizeObserver === 'undefined') {
      // Fallback for IE
      apiRef.current.unstable_storeRowHeightMeasurement(rowId, ref.current.clientHeight);
    }
  }, [apiRef, rowHeight, rowId]);
  React.useLayoutEffect(() => {
    if (currentPage.range) {
      // The index prop is relative to the rows from all pages. As example, the index prop of the
      // first row is 5 if `paginationModel.pageSize=5` and `paginationModel.page=1`. However, the index used by the virtualization
      // doesn't care about pagination and considers the rows from the current page only, so the
      // first row always has index=0. We need to subtract the index of the first row to make it
      // compatible with the index used by the virtualization.
      const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
      // pinned rows are not part of the visible rows
      if (rowIndex != null) {
        apiRef.current.unstable_setLastMeasuredRowIndex(rowIndex);
      }
    }
    const rootElement = ref.current;
    const hasFixedHeight = rowHeight !== 'auto';
    if (!rootElement || hasFixedHeight || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;
      const height = entry.borderBoxSize && entry.borderBoxSize.length > 0 ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
      apiRef.current.unstable_storeRowHeightMeasurement(rowId, height);
    });
    resizeObserver.observe(rootElement);
    return () => resizeObserver.disconnect();
  }, [apiRef, currentPage.range, index, rowHeight, rowId]);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // Ignore portal
    if ((0, _domUtils.isEventTargetInPortal)(event)) {
      return;
    }

    // The row might have been deleted
    if (!apiRef.current.getRow(rowId)) {
      return;
    }
    apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(rowId), event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, rowId]);
  const publishClick = React.useCallback(event => {
    const cell = (0, _domUtils.findParentElementFromClassName)(event.target, _gridClasses.gridClasses.cell);
    const field = cell?.getAttribute('data-field');

    // Check if the field is available because the cell that fills the empty
    // space of the row has no field.
    if (field) {
      // User clicked in the checkbox added by checkboxSelection
      if (field === _gridCheckboxSelectionColDef.GRID_CHECKBOX_SELECTION_COL_DEF.field) {
        return;
      }

      // User opened a detail panel
      if (field === _gridDetailPanelToggleField.GRID_DETAIL_PANEL_TOGGLE_FIELD) {
        return;
      }

      // User reorders a row
      if (field === '__reorder__') {
        return;
      }

      // User is editing a cell
      if (apiRef.current.getCellMode(rowId, field) === _gridEditRowModel.GridCellModes.Edit) {
        return;
      }

      // User clicked a button from the "actions" column type
      const column = apiRef.current.getColumn(field);
      if (column?.type === _gridActionsColDef.GRID_ACTIONS_COLUMN_TYPE) {
        return;
      }
    }
    publish('rowClick', onClick)(event);
  }, [apiRef, onClick, publish, rowId]);
  const {
    slots,
    slotProps,
    disableColumnReorder
  } = rootProps;
  const rowReordering = rootProps.rowReordering;
  const sizes = (0, _useGridSelector.useGridSelector)(apiRef, () => (0, _extends2.default)({}, apiRef.current.unstable_getRowInternalSizes(rowId)), _useGridSelector.objectShallowCompare);
  let minHeight = rowHeight;
  if (minHeight === 'auto' && sizes) {
    const numberOfBaseSizes = 1;
    const maximumSize = sizes.baseCenter ?? 0;
    if (maximumSize > 0 && numberOfBaseSizes > 1) {
      minHeight = maximumSize;
    }
  }
  const style = React.useMemo(() => {
    if (isNotVisible) {
      return {
        opacity: 0,
        width: 0,
        height: 0
      };
    }
    const rowStyle = (0, _extends2.default)({}, styleProp, {
      maxHeight: rowHeight === 'auto' ? 'none' : rowHeight,
      // max-height doesn't support "auto"
      minHeight,
      '--height': typeof rowHeight === 'number' ? `${rowHeight}px` : rowHeight
    });
    if (sizes?.spacingTop) {
      const property = rootProps.rowSpacingType === 'border' ? 'borderTopWidth' : 'marginTop';
      rowStyle[property] = sizes.spacingTop;
    }
    if (sizes?.spacingBottom) {
      const property = rootProps.rowSpacingType === 'border' ? 'borderBottomWidth' : 'marginBottom';
      let propertyValue = rowStyle[property];
      // avoid overriding existing value
      if (typeof propertyValue !== 'number') {
        propertyValue = parseInt(propertyValue || '0', 10);
      }
      propertyValue += sizes.spacingBottom;
      rowStyle[property] = propertyValue;
    }
    return rowStyle;
  }, [isNotVisible, rowHeight, styleProp, minHeight, sizes, rootProps.rowSpacingType]);
  const rowClassNames = apiRef.current.unstable_applyPipeProcessors('rowClassName', [], rowId);
  if (typeof rootProps.getRowClassName === 'function') {
    const indexRelativeToCurrentPage = index - (currentPage.range?.firstRowIndex || 0);
    const rowParams = (0, _extends2.default)({}, apiRef.current.getRowParams(rowId), {
      isFirstVisible: indexRelativeToCurrentPage === 0,
      isLastVisible: indexRelativeToCurrentPage === currentPage.rows.length - 1,
      indexRelativeToCurrentPage
    });
    rowClassNames.push(rootProps.getRowClassName(rowParams));
  }
  const getCell = (column, indexInSection, indexRelativeToAllColumns, sectionLength, pinnedPosition = _GridCell.PinnedPosition.NONE) => {
    const cellColSpanInfo = apiRef.current.unstable_getCellColSpanInfo(rowId, indexRelativeToAllColumns);
    if (cellColSpanInfo?.spannedByColSpan) {
      return null;
    }
    const width = cellColSpanInfo?.cellProps.width ?? column.computedWidth;
    const colSpan = cellColSpanInfo?.cellProps.colSpan ?? 1;
    const pinnedOffset = (0, _getPinnedCellOffset.getPinnedCellOffset)(_GridCell.gridPinnedColumnPositionLookup[pinnedPosition], column.computedWidth, indexRelativeToAllColumns, columnPositions, dimensions);
    if (rowNode?.type === 'skeletonRow') {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(slots.skeletonCell, {
        width: width,
        height: rowHeight,
        field: column.field,
        align: column.align ?? 'left'
      }, column.field);
    }
    const editCellState = editRowsState[rowId]?.[column.field] ?? null;

    // when the cell is a reorder cell we are not allowing to reorder the col
    // fixes https://github.com/mui/mui-x/issues/11126
    const isReorderCell = column.field === '__reorder__';
    const isEditingRows = Object.keys(editRowsState).length > 0;
    const canReorderColumn = !(disableColumnReorder || column.disableReorder);
    const canReorderRow = rowReordering && !sortModel.length && treeDepth <= 1 && !isEditingRows;
    const disableDragEvents = !(canReorderColumn || isReorderCell && canReorderRow);
    const cellIsNotVisible = pinnedPosition === _GridCell.PinnedPosition.VIRTUAL;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(slots.cell, (0, _extends2.default)({
      column: column,
      width: width,
      rowId: rowId,
      align: column.align || 'left',
      colIndex: indexRelativeToAllColumns,
      colSpan: colSpan,
      disableDragEvents: disableDragEvents,
      editCellState: editCellState,
      isNotVisible: cellIsNotVisible,
      pinnedOffset: pinnedOffset,
      pinnedPosition: pinnedPosition,
      sectionIndex: indexInSection,
      sectionLength: sectionLength,
      gridHasFiller: gridHasFiller
    }, slotProps?.cell), column.field);
  };

  /* Start of rendering */

  if (!rowNode) {
    return null;
  }
  const leftCells = pinnedColumns.left.map((column, i) => {
    const indexRelativeToAllColumns = i;
    return getCell(column, i, indexRelativeToAllColumns, pinnedColumns.left.length, _GridCell.PinnedPosition.LEFT);
  });
  const rightCells = pinnedColumns.right.map((column, i) => {
    const indexRelativeToAllColumns = visibleColumns.length - pinnedColumns.right.length + i;
    return getCell(column, i, indexRelativeToAllColumns, pinnedColumns.right.length, _GridCell.PinnedPosition.RIGHT);
  });
  const middleColumnsLength = visibleColumns.length - pinnedColumns.left.length - pinnedColumns.right.length;
  const cells = [];
  if (hasVirtualFocusCellLeft) {
    cells.push(getCell(visibleColumns[focusedColumnIndex], focusedColumnIndex - pinnedColumns.left.length, focusedColumnIndex, middleColumnsLength, _GridCell.PinnedPosition.VIRTUAL));
  }
  for (let i = renderContext.firstColumnIndex; i < renderContext.lastColumnIndex; i += 1) {
    const column = visibleColumns[i];
    const indexInSection = i - pinnedColumns.left.length;
    cells.push(getCell(column, indexInSection, i, middleColumnsLength));
  }
  if (hasVirtualFocusCellRight) {
    cells.push(getCell(visibleColumns[focusedColumnIndex], focusedColumnIndex - pinnedColumns.left.length, focusedColumnIndex, middleColumnsLength, _GridCell.PinnedPosition.VIRTUAL));
  }
  const eventHandlers = row ? {
    onClick: publishClick,
    onDoubleClick: publish('rowDoubleClick', onDoubleClick),
    onMouseEnter: publish('rowMouseEnter', onMouseEnter),
    onMouseLeave: publish('rowMouseLeave', onMouseLeave),
    onMouseOut: publish('rowMouseOut', onMouseOut),
    onMouseOver: publish('rowMouseOver', onMouseOver)
  } : null;
  const expandedWidth = dimensions.viewportOuterSize.width - dimensions.columnsTotalWidth - scrollbarWidth;
  const emptyCellWidth = Math.max(0, expandedWidth);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    ref: handleRef,
    "data-id": rowId,
    "data-rowindex": index,
    role: "row",
    className: (0, _clsx.default)(...rowClassNames, classes.root, className),
    "aria-rowindex": ariaRowIndex,
    "aria-selected": selected,
    style: style
  }, eventHandlers, other, {
    children: [leftCells, /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      role: "presentation",
      className: _gridClasses.gridClasses.cellOffsetLeft,
      style: {
        width: offsetLeft
      }
    }), cells, emptyCellWidth > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(EmptyCell, {
      width: emptyCellWidth
    }), rightCells.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      role: "presentation",
      className: _gridClasses.gridClasses.filler
    }), rightCells, scrollbarWidth !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridScrollbarFillerCell.GridScrollbarFillerCell, {
      pinnedRight: pinnedColumns.right.length > 0
    })]
  }));
});
process.env.NODE_ENV !== "production" ? GridRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  dimensions: _propTypes.default.shape({
    bottomContainerHeight: _propTypes.default.number.isRequired,
    columnsTotalWidth: _propTypes.default.number.isRequired,
    contentSize: _propTypes.default.shape({
      height: _propTypes.default.number.isRequired,
      width: _propTypes.default.number.isRequired
    }).isRequired,
    hasScrollX: _propTypes.default.bool.isRequired,
    hasScrollY: _propTypes.default.bool.isRequired,
    headerFilterHeight: _propTypes.default.number.isRequired,
    headerHeight: _propTypes.default.number.isRequired,
    headersTotalHeight: _propTypes.default.number.isRequired,
    isReady: _propTypes.default.bool.isRequired,
    leftPinnedWidth: _propTypes.default.number.isRequired,
    minimumSize: _propTypes.default.shape({
      height: _propTypes.default.number.isRequired,
      width: _propTypes.default.number.isRequired
    }).isRequired,
    rightPinnedWidth: _propTypes.default.number.isRequired,
    root: _propTypes.default.shape({
      height: _propTypes.default.number.isRequired,
      width: _propTypes.default.number.isRequired
    }).isRequired,
    rowHeight: _propTypes.default.number.isRequired,
    rowWidth: _propTypes.default.number.isRequired,
    scrollbarSize: _propTypes.default.number.isRequired,
    topContainerHeight: _propTypes.default.number.isRequired,
    viewportInnerSize: _propTypes.default.shape({
      height: _propTypes.default.number.isRequired,
      width: _propTypes.default.number.isRequired
    }).isRequired,
    viewportOuterSize: _propTypes.default.shape({
      height: _propTypes.default.number.isRequired,
      width: _propTypes.default.number.isRequired
    }).isRequired
  }).isRequired,
  /**
   * Determines which cell has focus.
   * If `null`, no cell in this row has focus.
   */
  focusedColumnIndex: _propTypes.default.number,
  /**
   * Index of the row in the whole sorted and filtered dataset.
   * If some rows above have expanded children, this index also take those children into account.
   */
  index: _propTypes.default.number.isRequired,
  isFirstVisible: _propTypes.default.bool.isRequired,
  isLastVisible: _propTypes.default.bool.isRequired,
  isNotVisible: _propTypes.default.bool.isRequired,
  offsetLeft: _propTypes.default.number.isRequired,
  offsetTop: _propTypes.default.number,
  onClick: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  pinnedColumns: _propTypes.default.object.isRequired,
  renderContext: _propTypes.default.shape({
    firstColumnIndex: _propTypes.default.number.isRequired,
    firstRowIndex: _propTypes.default.number.isRequired,
    lastColumnIndex: _propTypes.default.number.isRequired,
    lastRowIndex: _propTypes.default.number.isRequired
  }).isRequired,
  row: _propTypes.default.object.isRequired,
  rowHeight: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]).isRequired,
  rowId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  selected: _propTypes.default.bool.isRequired,
  /**
   * Determines which cell should be tabbable by having tabIndex=0.
   * If `null`, no cell in this row is in the tab sequence.
   */
  tabbableCell: _propTypes.default.string,
  visibleColumns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
} : void 0;
const MemoizedGridRow = exports.GridRow = (0, _fastMemo.fastMemo)(GridRow);