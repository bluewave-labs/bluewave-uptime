"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowSelection = exports.rowSelectionStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _useGridLogger = require("../../utils/useGridLogger");
var _gridRowsSelector = require("../rows/gridRowsSelector");
var _gridRowSelectionSelector = require("./gridRowSelectionSelector");
var _pagination = require("../pagination");
var _gridFocusStateSelector = require("../focus/gridFocusStateSelector");
var _gridFilterSelector = require("../filter/gridFilterSelector");
var _colDef = require("../../../colDef");
var _gridEditRowModel = require("../../../models/gridEditRowModel");
var _keyboardUtils = require("../../../utils/keyboardUtils");
var _useGridVisibleRows = require("../../utils/useGridVisibleRows");
var _gridDetailPanelToggleField = require("../../../constants/gridDetailPanelToggleField");
var _gridClasses = require("../../../constants/gridClasses");
var _domUtils = require("../../../utils/domUtils");
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getSelectionModelPropValue = (selectionModelProp, prevSelectionModel) => {
  if (selectionModelProp == null) {
    return selectionModelProp;
  }
  if (Array.isArray(selectionModelProp)) {
    return selectionModelProp;
  }
  if (prevSelectionModel && prevSelectionModel[0] === selectionModelProp) {
    return prevSelectionModel;
  }
  return [selectionModelProp];
};
const rowSelectionStateInitializer = (state, props) => (0, _extends2.default)({}, state, {
  rowSelection: props.rowSelection ? getSelectionModelPropValue(props.rowSelectionModel) ?? [] : []
});

/**
 * @requires useGridRows (state, method) - can be after
 * @requires useGridParamsApi (method) - can be after
 * @requires useGridFocus (state) - can be after
 * @requires useGridKeyboardNavigation (`cellKeyDown` event must first be consumed by it)
 */
exports.rowSelectionStateInitializer = rowSelectionStateInitializer;
const useGridRowSelection = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridSelection');
  const runIfRowSelectionIsEnabled = callback => (...args) => {
    if (props.rowSelection) {
      callback(...args);
    }
  };
  const propRowSelectionModel = React.useMemo(() => {
    return getSelectionModelPropValue(props.rowSelectionModel, (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state));
  }, [apiRef, props.rowSelectionModel]);
  const lastRowToggled = React.useRef(null);
  apiRef.current.registerControlState({
    stateId: 'rowSelection',
    propModel: propRowSelectionModel,
    propOnChange: props.onRowSelectionModelChange,
    stateSelector: _gridRowSelectionSelector.gridRowSelectionStateSelector,
    changeEvent: 'rowSelectionChange'
  });
  const {
    checkboxSelection,
    disableRowSelectionOnClick,
    isRowSelectable: propIsRowSelectable
  } = props;
  const canHaveMultipleSelection = (0, _utils.isMultipleRowSelectionEnabled)(props);
  const visibleRows = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, props);
  const expandMouseRowRangeSelection = React.useCallback(id => {
    let endId = id;
    const startId = lastRowToggled.current ?? id;
    const isSelected = apiRef.current.isRowSelected(id);
    if (isSelected) {
      const visibleRowIds = (0, _gridFilterSelector.gridExpandedSortedRowIdsSelector)(apiRef);
      const startIndex = visibleRowIds.findIndex(rowId => rowId === startId);
      const endIndex = visibleRowIds.findIndex(rowId => rowId === endId);
      if (startIndex === endIndex) {
        return;
      }
      if (startIndex > endIndex) {
        endId = visibleRowIds[endIndex + 1];
      } else {
        endId = visibleRowIds[endIndex - 1];
      }
    }
    lastRowToggled.current = id;
    apiRef.current.selectRowRange({
      startId,
      endId
    }, !isSelected);
  }, [apiRef]);

  /**
   * API METHODS
   */
  const setRowSelectionModel = React.useCallback(model => {
    if (props.signature === _useGridApiEventHandler.GridSignature.DataGrid && !canHaveMultipleSelection && Array.isArray(model) && model.length > 1) {
      throw new Error(['MUI X: `rowSelectionModel` can only contain 1 item in DataGrid.', 'You need to upgrade to DataGridPro or DataGridPremium component to unlock multiple selection.'].join('\n'));
    }
    const currentModel = (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state);
    if (currentModel !== model) {
      logger.debug(`Setting selection model`);
      apiRef.current.setState(state => (0, _extends2.default)({}, state, {
        rowSelection: props.rowSelection ? model : []
      }));
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger, props.rowSelection, props.signature, canHaveMultipleSelection]);
  const isRowSelected = React.useCallback(id => (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state).includes(id), [apiRef]);
  const isRowSelectable = React.useCallback(id => {
    if (propIsRowSelectable && !propIsRowSelectable(apiRef.current.getRowParams(id))) {
      return false;
    }
    const rowNode = apiRef.current.getRowNode(id);
    if (rowNode?.type === 'footer' || rowNode?.type === 'pinnedRow') {
      return false;
    }
    return true;
  }, [apiRef, propIsRowSelectable]);
  const getSelectedRows = React.useCallback(() => (0, _gridRowSelectionSelector.selectedGridRowsSelector)(apiRef), [apiRef]);
  const selectRow = React.useCallback((id, isSelected = true, resetSelection = false) => {
    if (!apiRef.current.isRowSelectable(id)) {
      return;
    }
    lastRowToggled.current = id;
    if (resetSelection) {
      logger.debug(`Setting selection for row ${id}`);
      apiRef.current.setRowSelectionModel(isSelected ? [id] : []);
    } else {
      logger.debug(`Toggling selection for row ${id}`);
      const selection = (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state);
      const newSelection = selection.filter(el => el !== id);
      if (isSelected) {
        newSelection.push(id);
      }
      const isSelectionValid = newSelection.length < 2 || canHaveMultipleSelection;
      if (isSelectionValid) {
        apiRef.current.setRowSelectionModel(newSelection);
      }
    }
  }, [apiRef, logger, canHaveMultipleSelection]);
  const selectRows = React.useCallback((ids, isSelected = true, resetSelection = false) => {
    logger.debug(`Setting selection for several rows`);
    const selectableIds = ids.filter(id => apiRef.current.isRowSelectable(id));
    let newSelection;
    if (resetSelection) {
      newSelection = isSelected ? selectableIds : [];
    } else {
      // We clone the existing object to avoid mutating the same object returned by the selector to others part of the project
      const selectionLookup = (0, _extends2.default)({}, (0, _gridRowSelectionSelector.selectedIdsLookupSelector)(apiRef));
      selectableIds.forEach(id => {
        if (isSelected) {
          selectionLookup[id] = id;
        } else {
          delete selectionLookup[id];
        }
      });
      newSelection = Object.values(selectionLookup);
    }
    const isSelectionValid = newSelection.length < 2 || canHaveMultipleSelection;
    if (isSelectionValid) {
      apiRef.current.setRowSelectionModel(newSelection);
    }
  }, [apiRef, logger, canHaveMultipleSelection]);
  const selectRowRange = React.useCallback(({
    startId,
    endId
  }, isSelected = true, resetSelection = false) => {
    if (!apiRef.current.getRow(startId) || !apiRef.current.getRow(endId)) {
      return;
    }
    logger.debug(`Expanding selection from row ${startId} to row ${endId}`);

    // Using rows from all pages allow to select a range across several pages
    const allPagesRowIds = (0, _gridFilterSelector.gridExpandedSortedRowIdsSelector)(apiRef);
    const startIndex = allPagesRowIds.indexOf(startId);
    const endIndex = allPagesRowIds.indexOf(endId);
    const [start, end] = startIndex > endIndex ? [endIndex, startIndex] : [startIndex, endIndex];
    const rowsBetweenStartAndEnd = allPagesRowIds.slice(start, end + 1);
    apiRef.current.selectRows(rowsBetweenStartAndEnd, isSelected, resetSelection);
  }, [apiRef, logger]);
  const selectionPublicApi = {
    selectRow,
    setRowSelectionModel,
    getSelectedRows,
    isRowSelected,
    isRowSelectable
  };
  const selectionPrivateApi = {
    selectRows,
    selectRowRange
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, selectionPublicApi, 'public');
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, selectionPrivateApi, props.signature === _useGridApiEventHandler.GridSignature.DataGrid ? 'private' : 'public');

  /**
   * EVENTS
   */
  const removeOutdatedSelection = React.useCallback(() => {
    if (props.keepNonExistentRowsSelected) {
      return;
    }
    const currentSelection = (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state);
    const rowsLookup = (0, _gridRowsSelector.gridRowsLookupSelector)(apiRef);

    // We clone the existing object to avoid mutating the same object returned by the selector to others part of the project
    const selectionLookup = (0, _extends2.default)({}, (0, _gridRowSelectionSelector.selectedIdsLookupSelector)(apiRef));
    let hasChanged = false;
    currentSelection.forEach(id => {
      if (!rowsLookup[id]) {
        delete selectionLookup[id];
        hasChanged = true;
      }
    });
    if (hasChanged) {
      apiRef.current.setRowSelectionModel(Object.values(selectionLookup));
    }
  }, [apiRef, props.keepNonExistentRowsSelected]);
  const handleSingleRowSelection = React.useCallback((id, event) => {
    const hasCtrlKey = event.metaKey || event.ctrlKey;

    // multiple selection is only allowed if:
    // - it is a checkboxSelection
    // - it is a keyboard selection
    // - Ctrl is pressed

    const isMultipleSelectionDisabled = !checkboxSelection && !hasCtrlKey && !(0, _keyboardUtils.isKeyboardEvent)(event);
    const resetSelection = !canHaveMultipleSelection || isMultipleSelectionDisabled;
    const isSelected = apiRef.current.isRowSelected(id);
    if (resetSelection) {
      apiRef.current.selectRow(id, !isMultipleSelectionDisabled ? !isSelected : true, true);
    } else {
      apiRef.current.selectRow(id, !isSelected, false);
    }
  }, [apiRef, canHaveMultipleSelection, checkboxSelection]);
  const handleRowClick = React.useCallback((params, event) => {
    if (disableRowSelectionOnClick) {
      return;
    }
    const field = event.target.closest(`.${_gridClasses.gridClasses.cell}`)?.getAttribute('data-field');
    if (field === _colDef.GRID_CHECKBOX_SELECTION_COL_DEF.field) {
      // click on checkbox should not trigger row selection
      return;
    }
    if (field === _gridDetailPanelToggleField.GRID_DETAIL_PANEL_TOGGLE_FIELD) {
      // click to open the detail panel should not select the row
      return;
    }
    if (field) {
      const column = apiRef.current.getColumn(field);
      if (column?.type === _colDef.GRID_ACTIONS_COLUMN_TYPE) {
        return;
      }
    }
    const rowNode = apiRef.current.getRowNode(params.id);
    if (rowNode.type === 'pinnedRow') {
      return;
    }
    if (event.shiftKey && canHaveMultipleSelection) {
      expandMouseRowRangeSelection(params.id);
    } else {
      handleSingleRowSelection(params.id, event);
    }
  }, [disableRowSelectionOnClick, canHaveMultipleSelection, apiRef, expandMouseRowRangeSelection, handleSingleRowSelection]);
  const preventSelectionOnShift = React.useCallback((params, event) => {
    if (canHaveMultipleSelection && event.shiftKey) {
      window.getSelection()?.removeAllRanges();
    }
  }, [canHaveMultipleSelection]);
  const handleRowSelectionCheckboxChange = React.useCallback((params, event) => {
    if (canHaveMultipleSelection && event.nativeEvent.shiftKey) {
      expandMouseRowRangeSelection(params.id);
    } else {
      apiRef.current.selectRow(params.id, params.value, !canHaveMultipleSelection);
    }
  }, [apiRef, expandMouseRowRangeSelection, canHaveMultipleSelection]);
  const handleHeaderSelectionCheckboxChange = React.useCallback(params => {
    const shouldLimitSelectionToCurrentPage = props.checkboxSelectionVisibleOnly && props.pagination;
    const rowsToBeSelected = shouldLimitSelectionToCurrentPage ? (0, _pagination.gridPaginatedVisibleSortedGridRowIdsSelector)(apiRef) : (0, _gridFilterSelector.gridExpandedSortedRowIdsSelector)(apiRef);
    const filterModel = (0, _gridFilterSelector.gridFilterModelSelector)(apiRef);
    apiRef.current.selectRows(rowsToBeSelected, params.value, filterModel?.items.length > 0);
  }, [apiRef, props.checkboxSelectionVisibleOnly, props.pagination]);
  const handleCellKeyDown = React.useCallback((params, event) => {
    // Get the most recent cell mode because it may have been changed by another listener
    if (apiRef.current.getCellMode(params.id, params.field) === _gridEditRowModel.GridCellModes.Edit) {
      return;
    }

    // Ignore portal
    // Do not apply shortcuts if the focus is not on the cell root component
    if ((0, _domUtils.isEventTargetInPortal)(event)) {
      return;
    }
    if ((0, _keyboardUtils.isNavigationKey)(event.key) && event.shiftKey) {
      // The cell that has focus after the keyboard navigation
      const focusCell = (0, _gridFocusStateSelector.gridFocusCellSelector)(apiRef);
      if (focusCell && focusCell.id !== params.id) {
        event.preventDefault();
        const isNextRowSelected = apiRef.current.isRowSelected(focusCell.id);
        if (!canHaveMultipleSelection) {
          apiRef.current.selectRow(focusCell.id, !isNextRowSelected, true);
          return;
        }
        const newRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(focusCell.id);
        const previousRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
        let start;
        let end;
        if (newRowIndex > previousRowIndex) {
          if (isNextRowSelected) {
            // We are navigating to the bottom of the page and adding selected rows
            start = previousRowIndex;
            end = newRowIndex - 1;
          } else {
            // We are navigating to the bottom of the page and removing selected rows
            start = previousRowIndex;
            end = newRowIndex;
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (isNextRowSelected) {
            // We are navigating to the top of the page and removing selected rows
            start = newRowIndex + 1;
            end = previousRowIndex;
          } else {
            // We are navigating to the top of the page and adding selected rows
            start = newRowIndex;
            end = previousRowIndex;
          }
        }
        const rowsBetweenStartAndEnd = visibleRows.rows.slice(start, end + 1).map(row => row.id);
        apiRef.current.selectRows(rowsBetweenStartAndEnd, !isNextRowSelected);
        return;
      }
    }
    if (event.key === ' ' && event.shiftKey) {
      event.preventDefault();
      handleSingleRowSelection(params.id, event);
      return;
    }
    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      selectRows(apiRef.current.getAllRowIds(), true);
    }
  }, [apiRef, handleSingleRowSelection, selectRows, visibleRows.rows, canHaveMultipleSelection]);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'sortedRowsSet', runIfRowSelectionIsEnabled(removeOutdatedSelection));
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'rowClick', runIfRowSelectionIsEnabled(handleRowClick));
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'rowSelectionCheckboxChange', runIfRowSelectionIsEnabled(handleRowSelectionCheckboxChange));
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'headerSelectionCheckboxChange', handleHeaderSelectionCheckboxChange);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'cellMouseDown', runIfRowSelectionIsEnabled(preventSelectionOnShift));
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'cellKeyDown', runIfRowSelectionIsEnabled(handleCellKeyDown));

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (propRowSelectionModel !== undefined) {
      apiRef.current.setRowSelectionModel(propRowSelectionModel);
    }
  }, [apiRef, propRowSelectionModel, props.rowSelection]);
  React.useEffect(() => {
    if (!props.rowSelection) {
      apiRef.current.setRowSelectionModel([]);
    }
  }, [apiRef, props.rowSelection]);
  const isStateControlled = propRowSelectionModel != null;
  React.useEffect(() => {
    if (isStateControlled || !props.rowSelection) {
      return;
    }

    // props.isRowSelectable changed
    const currentSelection = (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state);
    if (isRowSelectable) {
      const newSelection = currentSelection.filter(id => isRowSelectable(id));
      if (newSelection.length < currentSelection.length) {
        apiRef.current.setRowSelectionModel(newSelection);
      }
    }
  }, [apiRef, isRowSelectable, isStateControlled, props.rowSelection]);
  React.useEffect(() => {
    if (!props.rowSelection || isStateControlled) {
      return;
    }
    const currentSelection = (0, _gridRowSelectionSelector.gridRowSelectionStateSelector)(apiRef.current.state);
    if (!canHaveMultipleSelection && currentSelection.length > 1) {
      // See https://github.com/mui/mui-x/issues/8455
      apiRef.current.setRowSelectionModel([]);
    }
  }, [apiRef, canHaveMultipleSelection, checkboxSelection, isStateControlled, props.rowSelection]);
};
exports.useGridRowSelection = useGridRowSelection;