import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridSignature, useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridRowsLookupSelector } from '../rows/gridRowsSelector';
import { gridRowSelectionStateSelector, selectedGridRowsSelector, selectedIdsLookupSelector } from './gridRowSelectionSelector';
import { gridPaginatedVisibleSortedGridRowIdsSelector } from '../pagination';
import { gridFocusCellSelector } from '../focus/gridFocusStateSelector';
import { gridExpandedSortedRowIdsSelector, gridFilterModelSelector } from '../filter/gridFilterSelector';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GRID_ACTIONS_COLUMN_TYPE } from '../../../colDef';
import { GridCellModes } from '../../../models/gridEditRowModel';
import { isKeyboardEvent, isNavigationKey } from '../../../utils/keyboardUtils';
import { useGridVisibleRows } from '../../utils/useGridVisibleRows';
import { GRID_DETAIL_PANEL_TOGGLE_FIELD } from '../../../constants/gridDetailPanelToggleField';
import { gridClasses } from '../../../constants/gridClasses';
import { isEventTargetInPortal } from '../../../utils/domUtils';
import { isMultipleRowSelectionEnabled } from './utils';
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
export const rowSelectionStateInitializer = (state, props) => _extends({}, state, {
  rowSelection: props.rowSelection ? getSelectionModelPropValue(props.rowSelectionModel) ?? [] : []
});

/**
 * @requires useGridRows (state, method) - can be after
 * @requires useGridParamsApi (method) - can be after
 * @requires useGridFocus (state) - can be after
 * @requires useGridKeyboardNavigation (`cellKeyDown` event must first be consumed by it)
 */
export const useGridRowSelection = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useGridSelection');
  const runIfRowSelectionIsEnabled = callback => (...args) => {
    if (props.rowSelection) {
      callback(...args);
    }
  };
  const propRowSelectionModel = React.useMemo(() => {
    return getSelectionModelPropValue(props.rowSelectionModel, gridRowSelectionStateSelector(apiRef.current.state));
  }, [apiRef, props.rowSelectionModel]);
  const lastRowToggled = React.useRef(null);
  apiRef.current.registerControlState({
    stateId: 'rowSelection',
    propModel: propRowSelectionModel,
    propOnChange: props.onRowSelectionModelChange,
    stateSelector: gridRowSelectionStateSelector,
    changeEvent: 'rowSelectionChange'
  });
  const {
    checkboxSelection,
    disableRowSelectionOnClick,
    isRowSelectable: propIsRowSelectable
  } = props;
  const canHaveMultipleSelection = isMultipleRowSelectionEnabled(props);
  const visibleRows = useGridVisibleRows(apiRef, props);
  const expandMouseRowRangeSelection = React.useCallback(id => {
    let endId = id;
    const startId = lastRowToggled.current ?? id;
    const isSelected = apiRef.current.isRowSelected(id);
    if (isSelected) {
      const visibleRowIds = gridExpandedSortedRowIdsSelector(apiRef);
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
    if (props.signature === GridSignature.DataGrid && !canHaveMultipleSelection && Array.isArray(model) && model.length > 1) {
      throw new Error(['MUI X: `rowSelectionModel` can only contain 1 item in DataGrid.', 'You need to upgrade to DataGridPro or DataGridPremium component to unlock multiple selection.'].join('\n'));
    }
    const currentModel = gridRowSelectionStateSelector(apiRef.current.state);
    if (currentModel !== model) {
      logger.debug(`Setting selection model`);
      apiRef.current.setState(state => _extends({}, state, {
        rowSelection: props.rowSelection ? model : []
      }));
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger, props.rowSelection, props.signature, canHaveMultipleSelection]);
  const isRowSelected = React.useCallback(id => gridRowSelectionStateSelector(apiRef.current.state).includes(id), [apiRef]);
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
  const getSelectedRows = React.useCallback(() => selectedGridRowsSelector(apiRef), [apiRef]);
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
      const selection = gridRowSelectionStateSelector(apiRef.current.state);
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
      const selectionLookup = _extends({}, selectedIdsLookupSelector(apiRef));
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
    const allPagesRowIds = gridExpandedSortedRowIdsSelector(apiRef);
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
  useGridApiMethod(apiRef, selectionPublicApi, 'public');
  useGridApiMethod(apiRef, selectionPrivateApi, props.signature === GridSignature.DataGrid ? 'private' : 'public');

  /**
   * EVENTS
   */
  const removeOutdatedSelection = React.useCallback(() => {
    if (props.keepNonExistentRowsSelected) {
      return;
    }
    const currentSelection = gridRowSelectionStateSelector(apiRef.current.state);
    const rowsLookup = gridRowsLookupSelector(apiRef);

    // We clone the existing object to avoid mutating the same object returned by the selector to others part of the project
    const selectionLookup = _extends({}, selectedIdsLookupSelector(apiRef));
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

    const isMultipleSelectionDisabled = !checkboxSelection && !hasCtrlKey && !isKeyboardEvent(event);
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
    const field = event.target.closest(`.${gridClasses.cell}`)?.getAttribute('data-field');
    if (field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
      // click on checkbox should not trigger row selection
      return;
    }
    if (field === GRID_DETAIL_PANEL_TOGGLE_FIELD) {
      // click to open the detail panel should not select the row
      return;
    }
    if (field) {
      const column = apiRef.current.getColumn(field);
      if (column?.type === GRID_ACTIONS_COLUMN_TYPE) {
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
    const rowsToBeSelected = shouldLimitSelectionToCurrentPage ? gridPaginatedVisibleSortedGridRowIdsSelector(apiRef) : gridExpandedSortedRowIdsSelector(apiRef);
    const filterModel = gridFilterModelSelector(apiRef);
    apiRef.current.selectRows(rowsToBeSelected, params.value, filterModel?.items.length > 0);
  }, [apiRef, props.checkboxSelectionVisibleOnly, props.pagination]);
  const handleCellKeyDown = React.useCallback((params, event) => {
    // Get the most recent cell mode because it may have been changed by another listener
    if (apiRef.current.getCellMode(params.id, params.field) === GridCellModes.Edit) {
      return;
    }

    // Ignore portal
    // Do not apply shortcuts if the focus is not on the cell root component
    if (isEventTargetInPortal(event)) {
      return;
    }
    if (isNavigationKey(event.key) && event.shiftKey) {
      // The cell that has focus after the keyboard navigation
      const focusCell = gridFocusCellSelector(apiRef);
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
  useGridApiEventHandler(apiRef, 'sortedRowsSet', runIfRowSelectionIsEnabled(removeOutdatedSelection));
  useGridApiEventHandler(apiRef, 'rowClick', runIfRowSelectionIsEnabled(handleRowClick));
  useGridApiEventHandler(apiRef, 'rowSelectionCheckboxChange', runIfRowSelectionIsEnabled(handleRowSelectionCheckboxChange));
  useGridApiEventHandler(apiRef, 'headerSelectionCheckboxChange', handleHeaderSelectionCheckboxChange);
  useGridApiEventHandler(apiRef, 'cellMouseDown', runIfRowSelectionIsEnabled(preventSelectionOnShift));
  useGridApiEventHandler(apiRef, 'cellKeyDown', runIfRowSelectionIsEnabled(handleCellKeyDown));

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
    const currentSelection = gridRowSelectionStateSelector(apiRef.current.state);
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
    const currentSelection = gridRowSelectionStateSelector(apiRef.current.state);
    if (!canHaveMultipleSelection && currentSelection.length > 1) {
      // See https://github.com/mui/mui-x/issues/8455
      apiRef.current.setRowSelectionModel([]);
    }
  }, [apiRef, canHaveMultipleSelection, checkboxSelection, isStateControlled, props.rowSelection]);
};