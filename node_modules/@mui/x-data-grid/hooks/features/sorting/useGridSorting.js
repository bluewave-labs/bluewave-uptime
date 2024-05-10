import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridColumnLookupSelector } from '../columns/gridColumnsSelector';
import { gridSortedRowEntriesSelector, gridSortedRowIdsSelector, gridSortModelSelector } from './gridSortingSelector';
import { GRID_ROOT_GROUP_ID, gridRowTreeSelector } from '../rows';
import { useFirstRender } from '../../utils/useFirstRender';
import { useGridRegisterStrategyProcessor, GRID_DEFAULT_STRATEGY } from '../../core/strategyProcessing';
import { buildAggregatedSortingApplier, mergeStateWithSortModel, getNextGridSortDirection, sanitizeSortModel } from './gridSortingUtils';
import { useGridRegisterPipeProcessor } from '../../core/pipeProcessing';
import { getTreeNodeDescendants } from '../rows/gridRowsUtils';
export const sortingStateInitializer = (state, props) => {
  const sortModel = props.sortModel ?? props.initialState?.sorting?.sortModel ?? [];
  return _extends({}, state, {
    sorting: {
      sortModel: sanitizeSortModel(sortModel, props.disableMultipleColumnsSorting),
      sortedRows: []
    }
  });
};

/**
 * @requires useGridRows (event)
 * @requires useGridColumns (event)
 */
export const useGridSorting = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useGridSorting');
  apiRef.current.registerControlState({
    stateId: 'sortModel',
    propModel: props.sortModel,
    propOnChange: props.onSortModelChange,
    stateSelector: gridSortModelSelector,
    changeEvent: 'sortModelChange'
  });
  const upsertSortModel = React.useCallback((field, sortItem) => {
    const sortModel = gridSortModelSelector(apiRef);
    const existingIdx = sortModel.findIndex(c => c.field === field);
    let newSortModel = [...sortModel];
    if (existingIdx > -1) {
      if (sortItem?.sort == null) {
        newSortModel.splice(existingIdx, 1);
      } else {
        newSortModel.splice(existingIdx, 1, sortItem);
      }
    } else {
      newSortModel = [...sortModel, sortItem];
    }
    return newSortModel;
  }, [apiRef]);
  const createSortItem = React.useCallback((col, directionOverride) => {
    const sortModel = gridSortModelSelector(apiRef);
    const existing = sortModel.find(c => c.field === col.field);
    if (existing) {
      const nextSort = directionOverride === undefined ? getNextGridSortDirection(col.sortingOrder ?? props.sortingOrder, existing.sort) : directionOverride;
      return nextSort === undefined ? undefined : _extends({}, existing, {
        sort: nextSort
      });
    }
    return {
      field: col.field,
      sort: directionOverride === undefined ? getNextGridSortDirection(col.sortingOrder ?? props.sortingOrder) : directionOverride
    };
  }, [apiRef, props.sortingOrder]);
  const addColumnMenuItem = React.useCallback((columnMenuItems, colDef) => {
    if (colDef == null || colDef.sortable === false || props.disableColumnSorting) {
      return columnMenuItems;
    }
    const sortingOrder = colDef.sortingOrder || props.sortingOrder;
    if (sortingOrder.some(item => !!item)) {
      return [...columnMenuItems, 'columnMenuSortItem'];
    }
    return columnMenuItems;
  }, [props.sortingOrder, props.disableColumnSorting]);

  /**
   * API METHODS
   */
  const applySorting = React.useCallback(() => {
    apiRef.current.setState(state => {
      if (props.sortingMode === 'server') {
        logger.debug('Skipping sorting rows as sortingMode = server');
        return _extends({}, state, {
          sorting: _extends({}, state.sorting, {
            sortedRows: getTreeNodeDescendants(gridRowTreeSelector(apiRef), GRID_ROOT_GROUP_ID, false)
          })
        });
      }
      const sortModel = gridSortModelSelector(state, apiRef.current.instanceId);
      const sortRowList = buildAggregatedSortingApplier(sortModel, apiRef);
      const sortedRows = apiRef.current.applyStrategyProcessor('sorting', {
        sortRowList
      });
      return _extends({}, state, {
        sorting: _extends({}, state.sorting, {
          sortedRows
        })
      });
    });
    apiRef.current.publishEvent('sortedRowsSet');
    apiRef.current.forceUpdate();
  }, [apiRef, logger, props.sortingMode]);
  const setSortModel = React.useCallback(model => {
    const currentModel = gridSortModelSelector(apiRef);
    if (currentModel !== model) {
      logger.debug(`Setting sort model`);
      apiRef.current.setState(mergeStateWithSortModel(model, props.disableMultipleColumnsSorting));
      apiRef.current.forceUpdate();
      apiRef.current.applySorting();
    }
  }, [apiRef, logger, props.disableMultipleColumnsSorting]);
  const sortColumn = React.useCallback((field, direction, allowMultipleSorting) => {
    const column = apiRef.current.getColumn(field);
    const sortItem = createSortItem(column, direction);
    let sortModel;
    if (!allowMultipleSorting || props.disableMultipleColumnsSorting) {
      sortModel = sortItem?.sort == null ? [] : [sortItem];
    } else {
      sortModel = upsertSortModel(column.field, sortItem);
    }
    apiRef.current.setSortModel(sortModel);
  }, [apiRef, upsertSortModel, createSortItem, props.disableMultipleColumnsSorting]);
  const getSortModel = React.useCallback(() => gridSortModelSelector(apiRef), [apiRef]);
  const getSortedRows = React.useCallback(() => {
    const sortedRows = gridSortedRowEntriesSelector(apiRef);
    return sortedRows.map(row => row.model);
  }, [apiRef]);
  const getSortedRowIds = React.useCallback(() => gridSortedRowIdsSelector(apiRef), [apiRef]);
  const getRowIdFromRowIndex = React.useCallback(index => apiRef.current.getSortedRowIds()[index], [apiRef]);
  const sortApi = {
    getSortModel,
    getSortedRows,
    getSortedRowIds,
    getRowIdFromRowIndex,
    setSortModel,
    sortColumn,
    applySorting
  };
  useGridApiMethod(apiRef, sortApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const sortModelToExport = gridSortModelSelector(apiRef);
    const shouldExportSortModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.sortModel != null ||
    // Always export if the model has been initialized
    props.initialState?.sorting?.sortModel != null ||
    // Export if the model is not empty
    sortModelToExport.length > 0;
    if (!shouldExportSortModel) {
      return prevState;
    }
    return _extends({}, prevState, {
      sorting: {
        sortModel: sortModelToExport
      }
    });
  }, [apiRef, props.sortModel, props.initialState?.sorting?.sortModel]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const sortModel = context.stateToRestore.sorting?.sortModel;
    if (sortModel == null) {
      return params;
    }
    apiRef.current.setState(mergeStateWithSortModel(sortModel, props.disableMultipleColumnsSorting));
    return _extends({}, params, {
      callbacks: [...params.callbacks, apiRef.current.applySorting]
    });
  }, [apiRef, props.disableMultipleColumnsSorting]);
  const flatSortingMethod = React.useCallback(params => {
    const rowTree = gridRowTreeSelector(apiRef);
    const rootGroupNode = rowTree[GRID_ROOT_GROUP_ID];
    const sortedChildren = params.sortRowList ? params.sortRowList(rootGroupNode.children.map(childId => rowTree[childId])) : [...rootGroupNode.children];
    if (rootGroupNode.footerId != null) {
      sortedChildren.push(rootGroupNode.footerId);
    }
    return sortedChildren;
  }, [apiRef]);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  useGridRegisterStrategyProcessor(apiRef, GRID_DEFAULT_STRATEGY, 'sorting', flatSortingMethod);

  /**
   * EVENTS
   */
  const handleColumnHeaderClick = React.useCallback(({
    field,
    colDef
  }, event) => {
    if (!colDef.sortable || props.disableColumnSorting) {
      return;
    }
    const allowMultipleSorting = event.shiftKey || event.metaKey || event.ctrlKey;
    sortColumn(field, undefined, allowMultipleSorting);
  }, [sortColumn, props.disableColumnSorting]);
  const handleColumnHeaderKeyDown = React.useCallback(({
    field,
    colDef
  }, event) => {
    if (!colDef.sortable || props.disableColumnSorting) {
      return;
    }
    // Ctrl + Enter opens the column menu
    if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey) {
      sortColumn(field, undefined, event.shiftKey);
    }
  }, [sortColumn, props.disableColumnSorting]);
  const handleColumnsChange = React.useCallback(() => {
    // When the columns change we check that the sorted columns are still part of the dataset
    const sortModel = gridSortModelSelector(apiRef);
    const latestColumns = gridColumnLookupSelector(apiRef);
    if (sortModel.length > 0) {
      const newModel = sortModel.filter(sortItem => latestColumns[sortItem.field]);
      if (newModel.length < sortModel.length) {
        apiRef.current.setSortModel(newModel);
      }
    }
  }, [apiRef]);
  const handleStrategyProcessorChange = React.useCallback(methodName => {
    if (methodName === 'sorting') {
      apiRef.current.applySorting();
    }
  }, [apiRef]);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuItem);
  useGridApiEventHandler(apiRef, 'columnHeaderClick', handleColumnHeaderClick);
  useGridApiEventHandler(apiRef, 'columnHeaderKeyDown', handleColumnHeaderKeyDown);
  useGridApiEventHandler(apiRef, 'rowsSet', apiRef.current.applySorting);
  useGridApiEventHandler(apiRef, 'columnsChange', handleColumnsChange);
  useGridApiEventHandler(apiRef, 'activeStrategyProcessorChange', handleStrategyProcessorChange);

  /**
   * 1ST RENDER
   */
  useFirstRender(() => {
    apiRef.current.applySorting();
  });

  /**
   * EFFECTS
   */
  useEnhancedEffect(() => {
    if (props.sortModel !== undefined) {
      apiRef.current.setSortModel(props.sortModel);
    }
  }, [apiRef, props.sortModel]);
};