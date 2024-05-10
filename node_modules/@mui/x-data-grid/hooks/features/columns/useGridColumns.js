import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridColumnFieldsSelector, gridColumnDefinitionsSelector, gridColumnLookupSelector, gridColumnsStateSelector, gridColumnVisibilityModelSelector, gridVisibleColumnDefinitionsSelector, gridColumnPositionsSelector } from './gridColumnsSelector';
import { GridSignature, useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { useGridRegisterPipeProcessor, useGridRegisterPipeApplier } from '../../core/pipeProcessing';
import { EMPTY_PINNED_COLUMN_FIELDS } from './gridColumnsInterfaces';
import { hydrateColumnsWidth, createColumnsState, COLUMNS_DIMENSION_PROPERTIES } from './gridColumnsUtils';
import { GridPreferencePanelsValue } from '../preferencesPanel';
import { jsx as _jsx } from "react/jsx-runtime";
export const columnsStateInitializer = (state, props, apiRef) => {
  const columnsState = createColumnsState({
    apiRef,
    columnsToUpsert: props.columns,
    initialState: props.initialState?.columns,
    columnVisibilityModel: props.columnVisibilityModel ?? props.initialState?.columns?.columnVisibilityModel ?? {},
    keepOnlyColumnsToUpsert: true
  });
  return _extends({}, state, {
    columns: columnsState,
    // In pro/premium, this part of the state is defined. We give it an empty but defined value
    // for the community version.
    pinnedColumns: state.pinnedColumns ?? EMPTY_PINNED_COLUMN_FIELDS
  });
};

/**
 * @requires useGridParamsApi (method)
 * @requires useGridDimensions (method, event) - can be after
 * TODO: Impossible priority - useGridParamsApi also needs to be after useGridColumns
 */
export function useGridColumns(apiRef, props) {
  const logger = useGridLogger(apiRef, 'useGridColumns');
  const previousColumnsProp = React.useRef(props.columns);
  apiRef.current.registerControlState({
    stateId: 'visibleColumns',
    propModel: props.columnVisibilityModel,
    propOnChange: props.onColumnVisibilityModelChange,
    stateSelector: gridColumnVisibilityModelSelector,
    changeEvent: 'columnVisibilityModelChange'
  });
  const setGridColumnsState = React.useCallback(columnsState => {
    logger.debug('Updating columns state.');
    apiRef.current.setState(mergeColumnsState(columnsState));
    apiRef.current.publishEvent('columnsChange', columnsState.orderedFields);
    apiRef.current.updateRenderContext?.();
    apiRef.current.forceUpdate();
  }, [logger, apiRef]);

  /**
   * API METHODS
   */
  const getColumn = React.useCallback(field => gridColumnLookupSelector(apiRef)[field], [apiRef]);
  const getAllColumns = React.useCallback(() => gridColumnDefinitionsSelector(apiRef), [apiRef]);
  const getVisibleColumns = React.useCallback(() => gridVisibleColumnDefinitionsSelector(apiRef), [apiRef]);
  const getColumnIndex = React.useCallback((field, useVisibleColumns = true) => {
    const columns = useVisibleColumns ? gridVisibleColumnDefinitionsSelector(apiRef) : gridColumnDefinitionsSelector(apiRef);
    return columns.findIndex(col => col.field === field);
  }, [apiRef]);
  const getColumnPosition = React.useCallback(field => {
    const index = getColumnIndex(field);
    return gridColumnPositionsSelector(apiRef)[index];
  }, [apiRef, getColumnIndex]);
  const setColumnVisibilityModel = React.useCallback(model => {
    const currentModel = gridColumnVisibilityModelSelector(apiRef);
    if (currentModel !== model) {
      apiRef.current.setState(state => _extends({}, state, {
        columns: createColumnsState({
          apiRef,
          columnsToUpsert: [],
          initialState: undefined,
          columnVisibilityModel: model,
          keepOnlyColumnsToUpsert: false
        })
      }));
      apiRef.current.updateRenderContext?.();
      apiRef.current.forceUpdate();
    }
  }, [apiRef]);
  const updateColumns = React.useCallback(columns => {
    const columnsState = createColumnsState({
      apiRef,
      columnsToUpsert: columns,
      initialState: undefined,
      keepOnlyColumnsToUpsert: false
    });
    setGridColumnsState(columnsState);
  }, [apiRef, setGridColumnsState]);
  const setColumnVisibility = React.useCallback((field, isVisible) => {
    const columnVisibilityModel = gridColumnVisibilityModelSelector(apiRef);
    const isCurrentlyVisible = columnVisibilityModel[field] ?? true;
    if (isVisible !== isCurrentlyVisible) {
      const newModel = _extends({}, columnVisibilityModel, {
        [field]: isVisible
      });
      apiRef.current.setColumnVisibilityModel(newModel);
    }
  }, [apiRef]);
  const getColumnIndexRelativeToVisibleColumns = React.useCallback(field => {
    const allColumns = gridColumnFieldsSelector(apiRef);
    return allColumns.findIndex(col => col === field);
  }, [apiRef]);
  const setColumnIndex = React.useCallback((field, targetIndexPosition) => {
    const allColumns = gridColumnFieldsSelector(apiRef);
    const oldIndexPosition = getColumnIndexRelativeToVisibleColumns(field);
    if (oldIndexPosition === targetIndexPosition) {
      return;
    }
    logger.debug(`Moving column ${field} to index ${targetIndexPosition}`);
    const updatedColumns = [...allColumns];
    const fieldRemoved = updatedColumns.splice(oldIndexPosition, 1)[0];
    updatedColumns.splice(targetIndexPosition, 0, fieldRemoved);
    setGridColumnsState(_extends({}, gridColumnsStateSelector(apiRef.current.state), {
      orderedFields: updatedColumns
    }));
    const params = {
      column: apiRef.current.getColumn(field),
      targetIndex: apiRef.current.getColumnIndexRelativeToVisibleColumns(field),
      oldIndex: oldIndexPosition
    };
    apiRef.current.publishEvent('columnIndexChange', params);
  }, [apiRef, logger, setGridColumnsState, getColumnIndexRelativeToVisibleColumns]);
  const setColumnWidth = React.useCallback((field, width) => {
    logger.debug(`Updating column ${field} width to ${width}`);
    const columnsState = gridColumnsStateSelector(apiRef.current.state);
    const column = columnsState.lookup[field];
    const newColumn = _extends({}, column, {
      width,
      hasBeenResized: true
    });
    setGridColumnsState(hydrateColumnsWidth(_extends({}, columnsState, {
      lookup: _extends({}, columnsState.lookup, {
        [field]: newColumn
      })
    }), apiRef.current.getRootDimensions()));
    apiRef.current.publishEvent('columnWidthChange', {
      element: apiRef.current.getColumnHeaderElement(field),
      colDef: newColumn,
      width
    });
  }, [apiRef, logger, setGridColumnsState]);
  const columnApi = {
    getColumn,
    getAllColumns,
    getColumnIndex,
    getColumnPosition,
    getVisibleColumns,
    getColumnIndexRelativeToVisibleColumns,
    updateColumns,
    setColumnVisibilityModel,
    setColumnVisibility,
    setColumnWidth
  };
  const columnReorderApi = {
    setColumnIndex
  };
  useGridApiMethod(apiRef, columnApi, 'public');
  useGridApiMethod(apiRef, columnReorderApi, props.signature === GridSignature.DataGrid ? 'private' : 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const columnsStateToExport = {};
    const columnVisibilityModelToExport = gridColumnVisibilityModelSelector(apiRef);
    const shouldExportColumnVisibilityModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.columnVisibilityModel != null ||
    // Always export if the model has been initialized
    // TODO v6 Do a nullish check instead to export even if the initial model equals "{}"
    Object.keys(props.initialState?.columns?.columnVisibilityModel ?? {}).length > 0 ||
    // Always export if the model is not empty
    Object.keys(columnVisibilityModelToExport).length > 0;
    if (shouldExportColumnVisibilityModel) {
      columnsStateToExport.columnVisibilityModel = columnVisibilityModelToExport;
    }
    columnsStateToExport.orderedFields = gridColumnFieldsSelector(apiRef);
    const columns = gridColumnDefinitionsSelector(apiRef);
    const dimensions = {};
    columns.forEach(colDef => {
      if (colDef.hasBeenResized) {
        const colDefDimensions = {};
        COLUMNS_DIMENSION_PROPERTIES.forEach(propertyName => {
          let propertyValue = colDef[propertyName];
          if (propertyValue === Infinity) {
            propertyValue = -1;
          }
          colDefDimensions[propertyName] = propertyValue;
        });
        dimensions[colDef.field] = colDefDimensions;
      }
    });
    if (Object.keys(dimensions).length > 0) {
      columnsStateToExport.dimensions = dimensions;
    }
    return _extends({}, prevState, {
      columns: columnsStateToExport
    });
  }, [apiRef, props.columnVisibilityModel, props.initialState?.columns]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const columnVisibilityModelToImport = context.stateToRestore.columns?.columnVisibilityModel;
    const initialState = context.stateToRestore.columns;
    if (columnVisibilityModelToImport == null && initialState == null) {
      return params;
    }
    const columnsState = createColumnsState({
      apiRef,
      columnsToUpsert: [],
      initialState,
      columnVisibilityModel: columnVisibilityModelToImport,
      keepOnlyColumnsToUpsert: false
    });
    apiRef.current.setState(mergeColumnsState(columnsState));
    if (initialState != null) {
      apiRef.current.publishEvent('columnsChange', columnsState.orderedFields);
    }
    return params;
  }, [apiRef]);
  const preferencePanelPreProcessing = React.useCallback((initialValue, value) => {
    if (value === GridPreferencePanelsValue.columns) {
      const ColumnsPanel = props.slots.columnsPanel;
      return /*#__PURE__*/_jsx(ColumnsPanel, _extends({}, props.slotProps?.columnsPanel));
    }
    return initialValue;
  }, [props.slots.columnsPanel, props.slotProps?.columnsPanel]);
  const addColumnMenuItems = React.useCallback(columnMenuItems => {
    if (props.disableColumnSelector) {
      return columnMenuItems;
    }
    return [...columnMenuItems, 'columnMenuColumnsItem'];
  }, [props.disableColumnSelector]);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuItems);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'preferencePanel', preferencePanelPreProcessing);

  /*
   * EVENTS
   */

  const prevInnerWidth = React.useRef(null);
  const handleGridSizeChange = viewportInnerSize => {
    if (prevInnerWidth.current !== viewportInnerSize.width) {
      prevInnerWidth.current = viewportInnerSize.width;
      setGridColumnsState(hydrateColumnsWidth(gridColumnsStateSelector(apiRef.current.state), apiRef.current.getRootDimensions()));
    }
  };
  useGridApiEventHandler(apiRef, 'viewportInnerSizeChange', handleGridSizeChange);

  /**
   * APPLIERS
   */
  const hydrateColumns = React.useCallback(() => {
    logger.info(`Columns pipe processing have changed, regenerating the columns`);
    const columnsState = createColumnsState({
      apiRef,
      columnsToUpsert: [],
      initialState: undefined,
      keepOnlyColumnsToUpsert: false
    });
    setGridColumnsState(columnsState);
  }, [apiRef, logger, setGridColumnsState]);
  useGridRegisterPipeApplier(apiRef, 'hydrateColumns', hydrateColumns);

  /*
   * EFFECTS
   */
  // The effect do not track any value defined synchronously during the 1st render by hooks called after `useGridColumns`
  // As a consequence, the state generated by the 1st run of this useEffect will always be equal to the initialization one
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    logger.info(`GridColumns have changed, new length ${props.columns.length}`);
    if (previousColumnsProp.current === props.columns) {
      return;
    }
    const columnsState = createColumnsState({
      apiRef,
      initialState: undefined,
      // If the user provides a model, we don't want to set it in the state here because it has it's dedicated `useEffect` which calls `setColumnVisibilityModel`
      columnsToUpsert: props.columns,
      keepOnlyColumnsToUpsert: true
    });
    previousColumnsProp.current = props.columns;
    setGridColumnsState(columnsState);
  }, [logger, apiRef, setGridColumnsState, props.columns]);
  React.useEffect(() => {
    if (props.columnVisibilityModel !== undefined) {
      apiRef.current.setColumnVisibilityModel(props.columnVisibilityModel);
    }
  }, [apiRef, logger, props.columnVisibilityModel]);
}
function mergeColumnsState(columnsState) {
  return state => _extends({}, state, {
    columns: columnsState
  });
}