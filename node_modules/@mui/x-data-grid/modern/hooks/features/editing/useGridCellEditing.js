import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _toPropertyKey from "@babel/runtime/helpers/esm/toPropertyKey";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["id", "field"],
  _excluded2 = ["id", "field"];
import * as React from 'react';
import { unstable_useEventCallback as useEventCallback, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { useGridApiEventHandler, useGridApiOptionHandler } from '../../utils/useGridApiEventHandler';
import { GridEditModes, GridCellModes } from '../../../models/gridEditRowModel';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridEditRowsStateSelector } from './gridEditingSelectors';
import { isPrintableKey, isPasteShortcut } from '../../../utils/keyboardUtils';
import { buildWarning } from '../../../utils/warning';
import { gridRowsDataRowIdToIdLookupSelector } from '../rows/gridRowsSelector';
import { deepClone } from '../../../utils/utils';
import { GridCellEditStartReasons, GridCellEditStopReasons } from '../../../models/params/gridEditCellParams';
const missingOnProcessRowUpdateErrorWarning = buildWarning(['MUI X: A call to `processRowUpdate` threw an error which was not handled because `onProcessRowUpdateError` is missing.', 'To handle the error pass a callback to the `onProcessRowUpdateError` prop, for example `<DataGrid onProcessRowUpdateError={(error) => ...} />`.', 'For more detail, see https://mui.com/x/react-data-grid/editing/#server-side-persistence.'], 'error');
export const useGridCellEditing = (apiRef, props) => {
  const [cellModesModel, setCellModesModel] = React.useState({});
  const cellModesModelRef = React.useRef(cellModesModel);
  const prevCellModesModel = React.useRef({});
  const {
    processRowUpdate,
    onProcessRowUpdateError,
    cellModesModel: cellModesModelProp,
    onCellModesModelChange
  } = props;
  const runIfEditModeIsCell = callback => (...args) => {
    if (props.editMode === GridEditModes.Cell) {
      callback(...args);
    }
  };
  const throwIfNotEditable = React.useCallback((id, field) => {
    const params = apiRef.current.getCellParams(id, field);
    if (!apiRef.current.isCellEditable(params)) {
      throw new Error(`MUI X: The cell with id=${id} and field=${field} is not editable.`);
    }
  }, [apiRef]);
  const throwIfNotInMode = React.useCallback((id, field, mode) => {
    if (apiRef.current.getCellMode(id, field) !== mode) {
      throw new Error(`MUI X: The cell with id=${id} and field=${field} is not in ${mode} mode.`);
    }
  }, [apiRef]);
  const handleCellDoubleClick = React.useCallback((params, event) => {
    if (!params.isEditable) {
      return;
    }
    if (params.cellMode === GridCellModes.Edit) {
      return;
    }
    const newParams = _extends({}, params, {
      reason: GridCellEditStartReasons.cellDoubleClick
    });
    apiRef.current.publishEvent('cellEditStart', newParams, event);
  }, [apiRef]);
  const handleCellFocusOut = React.useCallback((params, event) => {
    if (params.cellMode === GridCellModes.View) {
      return;
    }
    if (apiRef.current.getCellMode(params.id, params.field) === GridCellModes.View) {
      return;
    }
    const newParams = _extends({}, params, {
      reason: GridCellEditStopReasons.cellFocusOut
    });
    apiRef.current.publishEvent('cellEditStop', newParams, event);
  }, [apiRef]);
  const handleCellKeyDown = React.useCallback((params, event) => {
    if (params.cellMode === GridCellModes.Edit) {
      // Wait until IME is settled for Asian languages like Japanese and Chinese
      // TODO: `event.which` is deprecated but this is a temporary workaround
      if (event.which === 229) {
        return;
      }
      let reason;
      if (event.key === 'Escape') {
        reason = GridCellEditStopReasons.escapeKeyDown;
      } else if (event.key === 'Enter') {
        reason = GridCellEditStopReasons.enterKeyDown;
      } else if (event.key === 'Tab') {
        reason = event.shiftKey ? GridCellEditStopReasons.shiftTabKeyDown : GridCellEditStopReasons.tabKeyDown;
        event.preventDefault(); // Prevent going to the next element in the tab sequence
      }
      if (reason) {
        const newParams = _extends({}, params, {
          reason
        });
        apiRef.current.publishEvent('cellEditStop', newParams, event);
      }
    } else if (params.isEditable) {
      let reason;
      const canStartEditing = apiRef.current.unstable_applyPipeProcessors('canStartEditing', true, {
        event,
        cellParams: params,
        editMode: 'cell'
      });
      if (!canStartEditing) {
        return;
      }
      if (isPrintableKey(event)) {
        reason = GridCellEditStartReasons.printableKeyDown;
      } else if (isPasteShortcut(event)) {
        reason = GridCellEditStartReasons.pasteKeyDown;
      } else if (event.key === 'Enter') {
        reason = GridCellEditStartReasons.enterKeyDown;
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        reason = GridCellEditStartReasons.deleteKeyDown;
      }
      if (reason) {
        const newParams = _extends({}, params, {
          reason,
          key: event.key
        });
        apiRef.current.publishEvent('cellEditStart', newParams, event);
      }
    }
  }, [apiRef]);
  const handleCellEditStart = React.useCallback(params => {
    const {
      id,
      field,
      reason
    } = params;
    const startCellEditModeParams = {
      id,
      field
    };
    if (reason === GridCellEditStartReasons.printableKeyDown || reason === GridCellEditStartReasons.deleteKeyDown || reason === GridCellEditStartReasons.pasteKeyDown) {
      startCellEditModeParams.deleteValue = true;
    }
    apiRef.current.startCellEditMode(startCellEditModeParams);
  }, [apiRef]);
  const handleCellEditStop = React.useCallback(params => {
    const {
      id,
      field,
      reason
    } = params;
    apiRef.current.runPendingEditCellValueMutation(id, field);
    let cellToFocusAfter;
    if (reason === GridCellEditStopReasons.enterKeyDown) {
      cellToFocusAfter = 'below';
    } else if (reason === GridCellEditStopReasons.tabKeyDown) {
      cellToFocusAfter = 'right';
    } else if (reason === GridCellEditStopReasons.shiftTabKeyDown) {
      cellToFocusAfter = 'left';
    }
    const ignoreModifications = reason === 'escapeKeyDown';
    apiRef.current.stopCellEditMode({
      id,
      field,
      ignoreModifications,
      cellToFocusAfter
    });
  }, [apiRef]);
  const runIfNoFieldErrors = callback => async (...args) => {
    if (callback) {
      const {
        id,
        field
      } = args[0];
      const editRowsState = apiRef.current.state.editRows;
      const hasFieldErrors = editRowsState[id][field]?.error;
      if (!hasFieldErrors) {
        callback(...args);
      }
    }
  };
  useGridApiEventHandler(apiRef, 'cellDoubleClick', runIfEditModeIsCell(handleCellDoubleClick));
  useGridApiEventHandler(apiRef, 'cellFocusOut', runIfEditModeIsCell(handleCellFocusOut));
  useGridApiEventHandler(apiRef, 'cellKeyDown', runIfEditModeIsCell(handleCellKeyDown));
  useGridApiEventHandler(apiRef, 'cellEditStart', runIfEditModeIsCell(handleCellEditStart));
  useGridApiEventHandler(apiRef, 'cellEditStop', runIfEditModeIsCell(handleCellEditStop));
  useGridApiOptionHandler(apiRef, 'cellEditStart', props.onCellEditStart);
  useGridApiOptionHandler(apiRef, 'cellEditStop', runIfNoFieldErrors(props.onCellEditStop));
  const getCellMode = React.useCallback((id, field) => {
    const editingState = gridEditRowsStateSelector(apiRef.current.state);
    const isEditing = editingState[id] && editingState[id][field];
    return isEditing ? GridCellModes.Edit : GridCellModes.View;
  }, [apiRef]);
  const updateCellModesModel = useEventCallback(newModel => {
    const isNewModelDifferentFromProp = newModel !== props.cellModesModel;
    if (onCellModesModelChange && isNewModelDifferentFromProp) {
      onCellModesModelChange(newModel, {
        api: apiRef.current
      });
    }
    if (props.cellModesModel && isNewModelDifferentFromProp) {
      return; // The prop always win
    }
    setCellModesModel(newModel);
    cellModesModelRef.current = newModel;
    apiRef.current.publishEvent('cellModesModelChange', newModel);
  });
  const updateFieldInCellModesModel = React.useCallback((id, field, newProps) => {
    // We use the ref because it always contain the up-to-date value, different from the state
    // that needs a rerender to reflect the new value
    const newModel = _extends({}, cellModesModelRef.current);
    if (newProps !== null) {
      newModel[id] = _extends({}, newModel[id], {
        [field]: _extends({}, newProps)
      });
    } else {
      const _newModel$id = newModel[id],
        otherFields = _objectWithoutPropertiesLoose(_newModel$id, [field].map(_toPropertyKey)); // Ensure that we have a new object, not a reference
      newModel[id] = otherFields;
      if (Object.keys(newModel[id]).length === 0) {
        delete newModel[id];
      }
    }
    updateCellModesModel(newModel);
  }, [updateCellModesModel]);
  const updateOrDeleteFieldState = React.useCallback((id, field, newProps) => {
    apiRef.current.setState(state => {
      const newEditingState = _extends({}, state.editRows);
      if (newProps !== null) {
        newEditingState[id] = _extends({}, newEditingState[id], {
          [field]: _extends({}, newProps)
        });
      } else {
        delete newEditingState[id][field];
        if (Object.keys(newEditingState[id]).length === 0) {
          delete newEditingState[id];
        }
      }
      return _extends({}, state, {
        editRows: newEditingState
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const startCellEditMode = React.useCallback(params => {
    const {
        id,
        field
      } = params,
      other = _objectWithoutPropertiesLoose(params, _excluded);
    throwIfNotEditable(id, field);
    throwIfNotInMode(id, field, GridCellModes.View);
    updateFieldInCellModesModel(id, field, _extends({
      mode: GridCellModes.Edit
    }, other));
  }, [throwIfNotEditable, throwIfNotInMode, updateFieldInCellModesModel]);
  const updateStateToStartCellEditMode = useEventCallback(params => {
    const {
      id,
      field,
      deleteValue,
      initialValue
    } = params;
    let newValue = apiRef.current.getCellValue(id, field);
    if (deleteValue) {
      const fieldType = apiRef.current.getColumn(field).type;
      switch (fieldType) {
        case 'boolean':
          newValue = false;
          break;
        case 'date':
        case 'dateTime':
        case 'number':
          newValue = undefined;
          break;
        case 'singleSelect':
          newValue = null;
          break;
        case 'string':
        default:
          newValue = '';
          break;
      }
    } else if (initialValue) {
      newValue = initialValue;
    }
    const newProps = {
      value: newValue,
      error: false,
      isProcessingProps: false
    };
    updateOrDeleteFieldState(id, field, newProps);
    apiRef.current.setCellFocus(id, field);
  });
  const stopCellEditMode = React.useCallback(params => {
    const {
        id,
        field
      } = params,
      other = _objectWithoutPropertiesLoose(params, _excluded2);
    throwIfNotInMode(id, field, GridCellModes.Edit);
    updateFieldInCellModesModel(id, field, _extends({
      mode: GridCellModes.View
    }, other));
  }, [throwIfNotInMode, updateFieldInCellModesModel]);
  const updateStateToStopCellEditMode = useEventCallback(async params => {
    const {
      id,
      field,
      ignoreModifications,
      cellToFocusAfter = 'none'
    } = params;
    throwIfNotInMode(id, field, GridCellModes.Edit);
    apiRef.current.runPendingEditCellValueMutation(id, field);
    const finishCellEditMode = () => {
      updateOrDeleteFieldState(id, field, null);
      updateFieldInCellModesModel(id, field, null);
      if (cellToFocusAfter !== 'none') {
        apiRef.current.moveFocusToRelativeCell(id, field, cellToFocusAfter);
      }
    };
    if (ignoreModifications) {
      finishCellEditMode();
      return;
    }
    const editingState = gridEditRowsStateSelector(apiRef.current.state);
    const {
      error,
      isProcessingProps
    } = editingState[id][field];
    if (error || isProcessingProps) {
      // Attempt to change cell mode to "view" was not successful
      // Update previous mode to allow another attempt
      prevCellModesModel.current[id][field].mode = GridCellModes.Edit;
      // Revert the mode in the cellModesModel prop back to "edit"
      updateFieldInCellModesModel(id, field, {
        mode: GridCellModes.Edit
      });
      return;
    }
    const rowUpdate = apiRef.current.getRowWithUpdatedValuesFromCellEditing(id, field);
    if (processRowUpdate) {
      const handleError = errorThrown => {
        prevCellModesModel.current[id][field].mode = GridCellModes.Edit;
        // Revert the mode in the cellModesModel prop back to "edit"
        updateFieldInCellModesModel(id, field, {
          mode: GridCellModes.Edit
        });
        if (onProcessRowUpdateError) {
          onProcessRowUpdateError(errorThrown);
        } else if (process.env.NODE_ENV !== 'production') {
          missingOnProcessRowUpdateErrorWarning();
        }
      };
      try {
        const row = apiRef.current.getRow(id);
        Promise.resolve(processRowUpdate(rowUpdate, row)).then(finalRowUpdate => {
          apiRef.current.updateRows([finalRowUpdate]);
          finishCellEditMode();
        }).catch(handleError);
      } catch (errorThrown) {
        handleError(errorThrown);
      }
    } else {
      apiRef.current.updateRows([rowUpdate]);
      finishCellEditMode();
    }
  });
  const setCellEditingEditCellValue = React.useCallback(async params => {
    const {
      id,
      field,
      value,
      debounceMs,
      unstable_skipValueParser: skipValueParser
    } = params;
    throwIfNotEditable(id, field);
    throwIfNotInMode(id, field, GridCellModes.Edit);
    const column = apiRef.current.getColumn(field);
    const row = apiRef.current.getRow(id);
    let parsedValue = value;
    if (column.valueParser && !skipValueParser) {
      parsedValue = column.valueParser(value, row, column, apiRef);
    }
    let editingState = gridEditRowsStateSelector(apiRef.current.state);
    let newProps = _extends({}, editingState[id][field], {
      value: parsedValue,
      changeReason: debounceMs ? 'debouncedSetEditCellValue' : 'setEditCellValue'
    });
    if (column.preProcessEditCellProps) {
      const hasChanged = value !== editingState[id][field].value;
      newProps = _extends({}, newProps, {
        isProcessingProps: true
      });
      updateOrDeleteFieldState(id, field, newProps);
      newProps = await Promise.resolve(column.preProcessEditCellProps({
        id,
        row,
        props: newProps,
        hasChanged
      }));
    }

    // Check again if the cell is in edit mode because the user may have
    // discarded the changes while the props were being processed.
    if (apiRef.current.getCellMode(id, field) === GridCellModes.View) {
      return false;
    }
    editingState = gridEditRowsStateSelector(apiRef.current.state);
    newProps = _extends({}, newProps, {
      isProcessingProps: false
    });
    // We don't update the value with the one coming from the props pre-processing
    // because when the promise resolves it may be already outdated. The only
    // exception to this rule is when there's no pre-processing.
    newProps.value = column.preProcessEditCellProps ? editingState[id][field].value : parsedValue;
    updateOrDeleteFieldState(id, field, newProps);
    editingState = gridEditRowsStateSelector(apiRef.current.state);
    return !editingState[id]?.[field]?.error;
  }, [apiRef, throwIfNotEditable, throwIfNotInMode, updateOrDeleteFieldState]);
  const getRowWithUpdatedValuesFromCellEditing = React.useCallback((id, field) => {
    const column = apiRef.current.getColumn(field);
    const editingState = gridEditRowsStateSelector(apiRef.current.state);
    const row = apiRef.current.getRow(id);
    if (!editingState[id] || !editingState[id][field]) {
      return apiRef.current.getRow(id);
    }
    const {
      value
    } = editingState[id][field];
    return column.valueSetter ? column.valueSetter(value, row, column, apiRef) : _extends({}, row, {
      [field]: value
    });
  }, [apiRef]);
  const editingApi = {
    getCellMode,
    startCellEditMode,
    stopCellEditMode
  };
  const editingPrivateApi = {
    setCellEditingEditCellValue,
    getRowWithUpdatedValuesFromCellEditing
  };
  useGridApiMethod(apiRef, editingApi, 'public');
  useGridApiMethod(apiRef, editingPrivateApi, 'private');
  React.useEffect(() => {
    if (cellModesModelProp) {
      updateCellModesModel(cellModesModelProp);
    }
  }, [cellModesModelProp, updateCellModesModel]);

  // Run this effect synchronously so that the keyboard event can impact the yet-to-be-rendered input.
  useEnhancedEffect(() => {
    const idToIdLookup = gridRowsDataRowIdToIdLookupSelector(apiRef);

    // Update the ref here because updateStateToStopCellEditMode may change it later
    const copyOfPrevCellModes = prevCellModesModel.current;
    prevCellModesModel.current = deepClone(cellModesModel); // Do a deep-clone because the attributes might be changed later

    Object.entries(cellModesModel).forEach(([id, fields]) => {
      Object.entries(fields).forEach(([field, params]) => {
        const prevMode = copyOfPrevCellModes[id]?.[field]?.mode || GridCellModes.View;
        const originalId = idToIdLookup[id] ?? id;
        if (params.mode === GridCellModes.Edit && prevMode === GridCellModes.View) {
          updateStateToStartCellEditMode(_extends({
            id: originalId,
            field
          }, params));
        } else if (params.mode === GridCellModes.View && prevMode === GridCellModes.Edit) {
          updateStateToStopCellEditMode(_extends({
            id: originalId,
            field
          }, params));
        }
      });
    });
  }, [apiRef, cellModesModel, updateStateToStartCellEditMode, updateStateToStopCellEditMode]);
};