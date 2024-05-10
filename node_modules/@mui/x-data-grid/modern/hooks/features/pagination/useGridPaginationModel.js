import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridDensityFactorSelector } from '../density';
import { useGridLogger, useGridSelector, useGridApiMethod, useGridApiEventHandler } from '../../utils';
import { useGridRegisterPipeProcessor } from '../../core/pipeProcessing';
import { gridPageCountSelector, gridPaginationModelSelector } from './gridPaginationSelector';
import { getPageCount, defaultPageSize, throwIfPageSizeExceedsTheLimit, getDefaultGridPaginationModel, getValidPage } from './gridPaginationUtils';
export const getDerivedPaginationModel = (paginationState, signature, paginationModelProp) => {
  let paginationModel = paginationState.paginationModel;
  const rowCount = paginationState.rowCount;
  const pageSize = paginationModelProp?.pageSize ?? paginationModel.pageSize;
  const page = paginationModelProp?.page ?? paginationModel.page;
  const pageCount = getPageCount(rowCount, pageSize, page);
  if (paginationModelProp && (paginationModelProp?.page !== paginationModel.page || paginationModelProp?.pageSize !== paginationModel.pageSize)) {
    paginationModel = paginationModelProp;
  }
  const validPage = getValidPage(paginationModel.page, pageCount);
  if (validPage !== paginationModel.page) {
    paginationModel = _extends({}, paginationModel, {
      page: validPage
    });
  }
  throwIfPageSizeExceedsTheLimit(paginationModel.pageSize, signature);
  return paginationModel;
};

/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */
export const useGridPaginationModel = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useGridPaginationModel');
  const densityFactor = useGridSelector(apiRef, gridDensityFactorSelector);
  const rowHeight = Math.floor(props.rowHeight * densityFactor);
  apiRef.current.registerControlState({
    stateId: 'paginationModel',
    propModel: props.paginationModel,
    propOnChange: props.onPaginationModelChange,
    stateSelector: gridPaginationModelSelector,
    changeEvent: 'paginationModelChange'
  });

  /**
   * API METHODS
   */
  const setPage = React.useCallback(page => {
    const currentModel = gridPaginationModelSelector(apiRef);
    if (page === currentModel.page) {
      return;
    }
    logger.debug(`Setting page to ${page}`);
    apiRef.current.setPaginationModel({
      page,
      pageSize: currentModel.pageSize
    });
  }, [apiRef, logger]);
  const setPageSize = React.useCallback(pageSize => {
    const currentModel = gridPaginationModelSelector(apiRef);
    if (pageSize === currentModel.pageSize) {
      return;
    }
    logger.debug(`Setting page size to ${pageSize}`);
    apiRef.current.setPaginationModel({
      pageSize,
      page: currentModel.page
    });
  }, [apiRef, logger]);
  const setPaginationModel = React.useCallback(paginationModel => {
    const currentModel = gridPaginationModelSelector(apiRef);
    if (paginationModel === currentModel) {
      return;
    }
    logger.debug("Setting 'paginationModel' to", paginationModel);
    apiRef.current.setState(state => _extends({}, state, {
      pagination: _extends({}, state.pagination, {
        paginationModel: getDerivedPaginationModel(state.pagination, props.signature, paginationModel)
      })
    }));
  }, [apiRef, logger, props.signature]);
  const paginationModelApi = {
    setPage,
    setPageSize,
    setPaginationModel
  };
  useGridApiMethod(apiRef, paginationModelApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const paginationModel = gridPaginationModelSelector(apiRef);
    const shouldExportPaginationModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the `paginationModel` is controlled
    props.paginationModel != null ||
    // Always export if the `paginationModel` has been initialized
    props.initialState?.pagination?.paginationModel != null ||
    // Export if `page` or `pageSize` is not equal to the default value
    paginationModel.page !== 0 && paginationModel.pageSize !== defaultPageSize(props.autoPageSize);
    if (!shouldExportPaginationModel) {
      return prevState;
    }
    return _extends({}, prevState, {
      pagination: _extends({}, prevState.pagination, {
        paginationModel
      })
    });
  }, [apiRef, props.paginationModel, props.initialState?.pagination?.paginationModel, props.autoPageSize]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const paginationModel = context.stateToRestore.pagination?.paginationModel ? _extends({}, getDefaultGridPaginationModel(props.autoPageSize), context.stateToRestore.pagination?.paginationModel) : gridPaginationModelSelector(apiRef);
    apiRef.current.setState(state => _extends({}, state, {
      pagination: _extends({}, state.pagination, {
        paginationModel: getDerivedPaginationModel(state.pagination, props.signature, paginationModel)
      })
    }));
    return params;
  }, [apiRef, props.autoPageSize, props.signature]);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EVENTS
   */
  const handlePaginationModelChange = () => {
    const paginationModel = gridPaginationModelSelector(apiRef);
    if (apiRef.current.virtualScrollerRef?.current) {
      apiRef.current.scrollToIndexes({
        rowIndex: paginationModel.page * paginationModel.pageSize
      });
    }
  };
  const handleUpdateAutoPageSize = React.useCallback(() => {
    if (!props.autoPageSize) {
      return;
    }
    const dimensions = apiRef.current.getRootDimensions();
    const maximumPageSizeWithoutScrollBar = Math.floor(dimensions.viewportInnerSize.height / rowHeight);
    apiRef.current.setPageSize(maximumPageSizeWithoutScrollBar);
  }, [apiRef, props.autoPageSize, rowHeight]);
  const handleRowCountChange = React.useCallback(newRowCount => {
    if (newRowCount == null) {
      return;
    }
    const paginationModel = gridPaginationModelSelector(apiRef);
    const pageCount = gridPageCountSelector(apiRef);
    if (paginationModel.page > pageCount - 1) {
      apiRef.current.setPage(Math.max(0, pageCount - 1));
    }
  }, [apiRef]);
  useGridApiEventHandler(apiRef, 'viewportInnerSizeChange', handleUpdateAutoPageSize);
  useGridApiEventHandler(apiRef, 'paginationModelChange', handlePaginationModelChange);
  useGridApiEventHandler(apiRef, 'rowCountChange', handleRowCountChange);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    apiRef.current.setState(state => _extends({}, state, {
      pagination: _extends({}, state.pagination, {
        paginationModel: getDerivedPaginationModel(state.pagination, props.signature, props.paginationModel)
      })
    }));
  }, [apiRef, props.paginationModel, props.paginationMode, props.signature]);
  React.useEffect(handleUpdateAutoPageSize, [handleUpdateAutoPageSize]);
};