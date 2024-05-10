"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridKeyboardNavigation = void 0;
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _gridColumnsSelector = require("../columns/gridColumnsSelector");
var _useGridLogger = require("../../utils/useGridLogger");
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
var _gridFilterSelector = require("../filter/gridFilterSelector");
var _useGridVisibleRows = require("../../utils/useGridVisibleRows");
var _gridCheckboxSelectionColDef = require("../../../colDef/gridCheckboxSelectionColDef");
var _gridClasses = require("../../../constants/gridClasses");
var _gridEditRowModel = require("../../../models/gridEditRowModel");
var _keyboardUtils = require("../../../utils/keyboardUtils");
var _gridDetailPanelToggleField = require("../../../constants/gridDetailPanelToggleField");
var _gridRowsSelector = require("../rows/gridRowsSelector");
var _focus = require("../focus");
var _gridColumnGroupsSelector = require("../columnGrouping/gridColumnGroupsSelector");
var _gridHeaderFilteringSelectors = require("../headerFiltering/gridHeaderFilteringSelectors");
var _pipeProcessing = require("../../core/pipeProcessing");
var _domUtils = require("../../../utils/domUtils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function enrichPageRowsWithPinnedRows(apiRef, rows) {
  const pinnedRows = (0, _gridRowsSelector.gridPinnedRowsSelector)(apiRef) || {};
  return [...(pinnedRows.top || []), ...rows, ...(pinnedRows.bottom || [])];
}
const getLeftColumnIndex = ({
  currentColIndex,
  firstColIndex,
  lastColIndex,
  direction
}) => {
  if (direction === 'rtl') {
    if (currentColIndex < lastColIndex) {
      return currentColIndex + 1;
    }
  } else if (direction === 'ltr') {
    if (currentColIndex > firstColIndex) {
      return currentColIndex - 1;
    }
  }
  return null;
};
const getRightColumnIndex = ({
  currentColIndex,
  firstColIndex,
  lastColIndex,
  direction
}) => {
  if (direction === 'rtl') {
    if (currentColIndex > firstColIndex) {
      return currentColIndex - 1;
    }
  } else if (direction === 'ltr') {
    if (currentColIndex < lastColIndex) {
      return currentColIndex + 1;
    }
  }
  return null;
};

/**
 * @requires useGridSorting (method) - can be after
 * @requires useGridFilter (state) - can be after
 * @requires useGridColumns (state, method) - can be after
 * @requires useGridDimensions (method) - can be after
 * @requires useGridFocus (method) - can be after
 * @requires useGridScroll (method) - can be after
 * @requires useGridColumnSpanning (method) - can be after
 */
const useGridKeyboardNavigation = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridKeyboardNavigation');
  const initialCurrentPageRows = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, props).rows;
  const theme = (0, _styles.useTheme)();
  const currentPageRows = React.useMemo(() => enrichPageRowsWithPinnedRows(apiRef, initialCurrentPageRows), [apiRef, initialCurrentPageRows]);
  const headerFilteringEnabled = props.signature !== 'DataGrid' && props.headerFilters;

  /**
   * @param {number} colIndex Index of the column to focus
   * @param {number} rowIndex index of the row to focus
   * @param {string} closestColumnToUse Which closest column cell to use when the cell is spanned by `colSpan`.
   * TODO replace with apiRef.current.moveFocusToRelativeCell()
   */
  const goToCell = React.useCallback((colIndex, rowId, closestColumnToUse = 'left') => {
    const visibleSortedRows = (0, _gridFilterSelector.gridExpandedSortedRowEntriesSelector)(apiRef);
    const nextCellColSpanInfo = apiRef.current.unstable_getCellColSpanInfo(rowId, colIndex);
    if (nextCellColSpanInfo && nextCellColSpanInfo.spannedByColSpan) {
      if (closestColumnToUse === 'left') {
        colIndex = nextCellColSpanInfo.leftVisibleCellIndex;
      } else if (closestColumnToUse === 'right') {
        colIndex = nextCellColSpanInfo.rightVisibleCellIndex;
      }
    }
    // `scrollToIndexes` requires a rowIndex relative to all visible rows.
    // Those rows do not include pinned rows, but pinned rows do not need scroll anyway.
    const rowIndexRelativeToAllRows = visibleSortedRows.findIndex(row => row.id === rowId);
    logger.debug(`Navigating to cell row ${rowIndexRelativeToAllRows}, col ${colIndex}`);
    apiRef.current.scrollToIndexes({
      colIndex,
      rowIndex: rowIndexRelativeToAllRows
    });
    const field = apiRef.current.getVisibleColumns()[colIndex].field;
    apiRef.current.setCellFocus(rowId, field);
  }, [apiRef, logger]);
  const goToHeader = React.useCallback((colIndex, event) => {
    logger.debug(`Navigating to header col ${colIndex}`);
    apiRef.current.scrollToIndexes({
      colIndex
    });
    const field = apiRef.current.getVisibleColumns()[colIndex].field;
    apiRef.current.setColumnHeaderFocus(field, event);
  }, [apiRef, logger]);
  const goToHeaderFilter = React.useCallback((colIndex, event) => {
    logger.debug(`Navigating to header filter col ${colIndex}`);
    apiRef.current.scrollToIndexes({
      colIndex
    });
    const field = apiRef.current.getVisibleColumns()[colIndex].field;
    apiRef.current.setColumnHeaderFilterFocus(field, event);
  }, [apiRef, logger]);
  const goToGroupHeader = React.useCallback((colIndex, depth, event) => {
    logger.debug(`Navigating to header col ${colIndex}`);
    apiRef.current.scrollToIndexes({
      colIndex
    });
    const {
      field
    } = apiRef.current.getVisibleColumns()[colIndex];
    apiRef.current.setColumnGroupHeaderFocus(field, depth, event);
  }, [apiRef, logger]);
  const getRowIdFromIndex = React.useCallback(rowIndex => {
    return currentPageRows[rowIndex]?.id;
  }, [currentPageRows]);
  const handleColumnHeaderKeyDown = React.useCallback((params, event) => {
    const headerTitleNode = event.currentTarget.querySelector(`.${_gridClasses.gridClasses.columnHeaderTitleContainerContent}`);
    const isFromInsideContent = !!headerTitleNode && headerTitleNode.contains(event.target);
    if (isFromInsideContent && params.field !== _gridCheckboxSelectionColDef.GRID_CHECKBOX_SELECTION_COL_DEF.field) {
      // When focus is on a nested input, keyboard events have no effect to avoid conflicts with native events.
      // There is one exception for the checkBoxHeader
      return;
    }
    const viewportPageSize = apiRef.current.getViewportPageSize();
    const colIndexBefore = params.field ? apiRef.current.getColumnIndex(params.field) : 0;
    const firstRowIndexInPage = currentPageRows.length > 0 ? 0 : null;
    const lastRowIndexInPage = currentPageRows.length - 1;
    const firstColIndex = 0;
    const lastColIndex = (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef).length - 1;
    const columnGroupMaxDepth = (0, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector)(apiRef);
    let shouldPreventDefault = true;
    switch (event.key) {
      case 'ArrowDown':
        {
          if (firstRowIndexInPage !== null) {
            if (headerFilteringEnabled) {
              goToHeaderFilter(colIndexBefore, event);
            } else {
              goToCell(colIndexBefore, getRowIdFromIndex(firstRowIndexInPage));
            }
          }
          break;
        }
      case 'ArrowRight':
        {
          const rightColIndex = getRightColumnIndex({
            currentColIndex: colIndexBefore,
            firstColIndex,
            lastColIndex,
            direction: theme.direction
          });
          if (rightColIndex !== null) {
            goToHeader(rightColIndex, event);
          }
          break;
        }
      case 'ArrowLeft':
        {
          const leftColIndex = getLeftColumnIndex({
            currentColIndex: colIndexBefore,
            firstColIndex,
            lastColIndex,
            direction: theme.direction
          });
          if (leftColIndex !== null) {
            goToHeader(leftColIndex, event);
          }
          break;
        }
      case 'ArrowUp':
        {
          if (columnGroupMaxDepth > 0) {
            goToGroupHeader(colIndexBefore, columnGroupMaxDepth - 1, event);
          }
          break;
        }
      case 'PageDown':
        {
          if (firstRowIndexInPage !== null && lastRowIndexInPage !== null) {
            goToCell(colIndexBefore, getRowIdFromIndex(Math.min(firstRowIndexInPage + viewportPageSize, lastRowIndexInPage)));
          }
          break;
        }
      case 'Home':
        {
          goToHeader(firstColIndex, event);
          break;
        }
      case 'End':
        {
          goToHeader(lastColIndex, event);
          break;
        }
      case 'Enter':
        {
          if (event.ctrlKey || event.metaKey) {
            apiRef.current.toggleColumnMenu(params.field);
          }
          break;
        }
      case ' ':
        {
          // prevent Space event from scrolling
          break;
        }
      default:
        {
          shouldPreventDefault = false;
        }
    }
    if (shouldPreventDefault) {
      event.preventDefault();
    }
  }, [apiRef, currentPageRows.length, headerFilteringEnabled, goToHeaderFilter, goToCell, getRowIdFromIndex, theme.direction, goToHeader, goToGroupHeader]);
  const handleHeaderFilterKeyDown = React.useCallback((params, event) => {
    const isEditing = (0, _gridHeaderFilteringSelectors.gridHeaderFilteringEditFieldSelector)(apiRef) === params.field;
    const isHeaderMenuOpen = (0, _gridHeaderFilteringSelectors.gridHeaderFilteringMenuSelector)(apiRef) === params.field;
    if (isEditing || isHeaderMenuOpen || !(0, _keyboardUtils.isNavigationKey)(event.key)) {
      return;
    }
    const viewportPageSize = apiRef.current.getViewportPageSize();
    const colIndexBefore = params.field ? apiRef.current.getColumnIndex(params.field) : 0;
    const firstRowIndexInPage = 0;
    const lastRowIndexInPage = currentPageRows.length - 1;
    const firstColIndex = 0;
    const lastColIndex = (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef).length - 1;
    let shouldPreventDefault = true;
    switch (event.key) {
      case 'ArrowDown':
        {
          const rowId = getRowIdFromIndex(firstRowIndexInPage);
          if (firstRowIndexInPage !== null && rowId != null) {
            goToCell(colIndexBefore, rowId);
          }
          break;
        }
      case 'ArrowRight':
        {
          const rightColIndex = getRightColumnIndex({
            currentColIndex: colIndexBefore,
            firstColIndex,
            lastColIndex,
            direction: theme.direction
          });
          if (rightColIndex !== null) {
            goToHeaderFilter(rightColIndex, event);
          }
          break;
        }
      case 'ArrowLeft':
        {
          const leftColIndex = getLeftColumnIndex({
            currentColIndex: colIndexBefore,
            firstColIndex,
            lastColIndex,
            direction: theme.direction
          });
          if (leftColIndex !== null) {
            goToHeaderFilter(leftColIndex, event);
          } else {
            apiRef.current.setColumnHeaderFilterFocus(params.field, event);
          }
          break;
        }
      case 'ArrowUp':
        {
          goToHeader(colIndexBefore, event);
          break;
        }
      case 'PageDown':
        {
          if (firstRowIndexInPage !== null && lastRowIndexInPage !== null) {
            goToCell(colIndexBefore, getRowIdFromIndex(Math.min(firstRowIndexInPage + viewportPageSize, lastRowIndexInPage)));
          }
          break;
        }
      case 'Home':
        {
          goToHeaderFilter(firstColIndex, event);
          break;
        }
      case 'End':
        {
          goToHeaderFilter(lastColIndex, event);
          break;
        }
      case ' ':
        {
          // prevent Space event from scrolling
          break;
        }
      default:
        {
          shouldPreventDefault = false;
        }
    }
    if (shouldPreventDefault) {
      event.preventDefault();
    }
  }, [apiRef, currentPageRows.length, goToHeaderFilter, theme.direction, goToHeader, goToCell, getRowIdFromIndex]);
  const handleColumnGroupHeaderKeyDown = React.useCallback((params, event) => {
    const focusedColumnGroup = (0, _focus.gridFocusColumnGroupHeaderSelector)(apiRef);
    if (focusedColumnGroup === null) {
      return;
    }
    const {
      field: currentField,
      depth: currentDepth
    } = focusedColumnGroup;
    const {
      fields,
      depth,
      maxDepth
    } = params;
    const viewportPageSize = apiRef.current.getViewportPageSize();
    const currentColIndex = apiRef.current.getColumnIndex(currentField);
    const colIndexBefore = currentField ? apiRef.current.getColumnIndex(currentField) : 0;
    const firstRowIndexInPage = 0;
    const lastRowIndexInPage = currentPageRows.length - 1;
    const firstColIndex = 0;
    const lastColIndex = (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef).length - 1;
    let shouldPreventDefault = true;
    switch (event.key) {
      case 'ArrowDown':
        {
          if (depth === maxDepth - 1) {
            goToHeader(currentColIndex, event);
          } else {
            goToGroupHeader(currentColIndex, currentDepth + 1, event);
          }
          break;
        }
      case 'ArrowUp':
        {
          if (depth > 0) {
            goToGroupHeader(currentColIndex, currentDepth - 1, event);
          }
          break;
        }
      case 'ArrowRight':
        {
          const remainingRightColumns = fields.length - fields.indexOf(currentField) - 1;
          if (currentColIndex + remainingRightColumns + 1 <= lastColIndex) {
            goToGroupHeader(currentColIndex + remainingRightColumns + 1, currentDepth, event);
          }
          break;
        }
      case 'ArrowLeft':
        {
          const remainingLeftColumns = fields.indexOf(currentField);
          if (currentColIndex - remainingLeftColumns - 1 >= firstColIndex) {
            goToGroupHeader(currentColIndex - remainingLeftColumns - 1, currentDepth, event);
          }
          break;
        }
      case 'PageDown':
        {
          if (firstRowIndexInPage !== null && lastRowIndexInPage !== null) {
            goToCell(colIndexBefore, getRowIdFromIndex(Math.min(firstRowIndexInPage + viewportPageSize, lastRowIndexInPage)));
          }
          break;
        }
      case 'Home':
        {
          goToGroupHeader(firstColIndex, currentDepth, event);
          break;
        }
      case 'End':
        {
          goToGroupHeader(lastColIndex, currentDepth, event);
          break;
        }
      case ' ':
        {
          // prevent Space event from scrolling
          break;
        }
      default:
        {
          shouldPreventDefault = false;
        }
    }
    if (shouldPreventDefault) {
      event.preventDefault();
    }
  }, [apiRef, currentPageRows.length, goToHeader, goToGroupHeader, goToCell, getRowIdFromIndex]);
  const handleCellKeyDown = React.useCallback((params, event) => {
    // Ignore portal
    if ((0, _domUtils.isEventTargetInPortal)(event)) {
      return;
    }

    // Get the most recent params because the cell mode may have changed by another listener
    const cellParams = apiRef.current.getCellParams(params.id, params.field);
    if (cellParams.cellMode === _gridEditRowModel.GridCellModes.Edit || !(0, _keyboardUtils.isNavigationKey)(event.key)) {
      return;
    }
    const canUpdateFocus = apiRef.current.unstable_applyPipeProcessors('canUpdateFocus', true, {
      event,
      cell: cellParams
    });
    if (!canUpdateFocus) {
      return;
    }
    if (currentPageRows.length === 0) {
      return;
    }
    const direction = theme.direction;
    const viewportPageSize = apiRef.current.getViewportPageSize();
    const colIndexBefore = params.field ? apiRef.current.getColumnIndex(params.field) : 0;
    const rowIndexBefore = currentPageRows.findIndex(row => row.id === params.id);
    const firstRowIndexInPage = 0;
    const lastRowIndexInPage = currentPageRows.length - 1;
    const firstColIndex = 0;
    const lastColIndex = (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef).length - 1;
    let shouldPreventDefault = true;
    switch (event.key) {
      case 'ArrowDown':
        {
          // "Enter" is only triggered by the row / cell editing feature
          if (rowIndexBefore < lastRowIndexInPage) {
            goToCell(colIndexBefore, getRowIdFromIndex(rowIndexBefore + 1));
          }
          break;
        }
      case 'ArrowUp':
        {
          if (rowIndexBefore > firstRowIndexInPage) {
            goToCell(colIndexBefore, getRowIdFromIndex(rowIndexBefore - 1));
          } else if (headerFilteringEnabled) {
            goToHeaderFilter(colIndexBefore, event);
          } else {
            goToHeader(colIndexBefore, event);
          }
          break;
        }
      case 'ArrowRight':
        {
          const rightColIndex = getRightColumnIndex({
            currentColIndex: colIndexBefore,
            firstColIndex,
            lastColIndex,
            direction
          });
          if (rightColIndex !== null) {
            goToCell(rightColIndex, getRowIdFromIndex(rowIndexBefore), direction === 'rtl' ? 'left' : 'right');
          }
          break;
        }
      case 'ArrowLeft':
        {
          const leftColIndex = getLeftColumnIndex({
            currentColIndex: colIndexBefore,
            firstColIndex,
            lastColIndex,
            direction
          });
          if (leftColIndex !== null) {
            goToCell(leftColIndex, getRowIdFromIndex(rowIndexBefore), direction === 'rtl' ? 'right' : 'left');
          }
          break;
        }
      case 'Tab':
        {
          // "Tab" is only triggered by the row / cell editing feature
          if (event.shiftKey && colIndexBefore > firstColIndex) {
            goToCell(colIndexBefore - 1, getRowIdFromIndex(rowIndexBefore), 'left');
          } else if (!event.shiftKey && colIndexBefore < lastColIndex) {
            goToCell(colIndexBefore + 1, getRowIdFromIndex(rowIndexBefore), 'right');
          }
          break;
        }
      case ' ':
        {
          const field = params.field;
          if (field === _gridDetailPanelToggleField.GRID_DETAIL_PANEL_TOGGLE_FIELD) {
            break;
          }
          const colDef = params.colDef;
          if (colDef &&
          // `GRID_TREE_DATA_GROUPING_FIELD` from the Pro package
          colDef.field === '__tree_data_group__') {
            break;
          }
          if (!event.shiftKey && rowIndexBefore < lastRowIndexInPage) {
            goToCell(colIndexBefore, getRowIdFromIndex(Math.min(rowIndexBefore + viewportPageSize, lastRowIndexInPage)));
          }
          break;
        }
      case 'PageDown':
        {
          if (rowIndexBefore < lastRowIndexInPage) {
            goToCell(colIndexBefore, getRowIdFromIndex(Math.min(rowIndexBefore + viewportPageSize, lastRowIndexInPage)));
          }
          break;
        }
      case 'PageUp':
        {
          // Go to the first row before going to header
          const nextRowIndex = Math.max(rowIndexBefore - viewportPageSize, firstRowIndexInPage);
          if (nextRowIndex !== rowIndexBefore && nextRowIndex >= firstRowIndexInPage) {
            goToCell(colIndexBefore, getRowIdFromIndex(nextRowIndex));
          } else {
            goToHeader(colIndexBefore, event);
          }
          break;
        }
      case 'Home':
        {
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            goToCell(firstColIndex, getRowIdFromIndex(firstRowIndexInPage));
          } else {
            goToCell(firstColIndex, getRowIdFromIndex(rowIndexBefore));
          }
          break;
        }
      case 'End':
        {
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            goToCell(lastColIndex, getRowIdFromIndex(lastRowIndexInPage));
          } else {
            goToCell(lastColIndex, getRowIdFromIndex(rowIndexBefore));
          }
          break;
        }
      default:
        {
          shouldPreventDefault = false;
        }
    }
    if (shouldPreventDefault) {
      event.preventDefault();
    }
  }, [apiRef, currentPageRows, theme.direction, goToCell, getRowIdFromIndex, headerFilteringEnabled, goToHeaderFilter, goToHeader]);
  const checkIfCanStartEditing = React.useCallback((initialValue, {
    event
  }) => {
    if (event.key === ' ') {
      // Space scrolls to the last row
      return false;
    }
    return initialValue;
  }, []);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'canStartEditing', checkIfCanStartEditing);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnHeaderKeyDown', handleColumnHeaderKeyDown);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'headerFilterKeyDown', handleHeaderFilterKeyDown);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnGroupHeaderKeyDown', handleColumnGroupHeaderKeyDown);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'cellKeyDown', handleCellKeyDown);
};
exports.useGridKeyboardNavigation = useGridKeyboardNavigation;