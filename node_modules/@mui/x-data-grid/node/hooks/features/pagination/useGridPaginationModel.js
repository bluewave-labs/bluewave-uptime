"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridPaginationModel = exports.getDerivedPaginationModel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _density = require("../density");
var _utils = require("../../utils");
var _pipeProcessing = require("../../core/pipeProcessing");
var _gridPaginationSelector = require("./gridPaginationSelector");
var _gridPaginationUtils = require("./gridPaginationUtils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getDerivedPaginationModel = (paginationState, signature, paginationModelProp) => {
  let paginationModel = paginationState.paginationModel;
  const rowCount = paginationState.rowCount;
  const pageSize = paginationModelProp?.pageSize ?? paginationModel.pageSize;
  const page = paginationModelProp?.page ?? paginationModel.page;
  const pageCount = (0, _gridPaginationUtils.getPageCount)(rowCount, pageSize, page);
  if (paginationModelProp && (paginationModelProp?.page !== paginationModel.page || paginationModelProp?.pageSize !== paginationModel.pageSize)) {
    paginationModel = paginationModelProp;
  }
  const validPage = (0, _gridPaginationUtils.getValidPage)(paginationModel.page, pageCount);
  if (validPage !== paginationModel.page) {
    paginationModel = (0, _extends2.default)({}, paginationModel, {
      page: validPage
    });
  }
  (0, _gridPaginationUtils.throwIfPageSizeExceedsTheLimit)(paginationModel.pageSize, signature);
  return paginationModel;
};

/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */
exports.getDerivedPaginationModel = getDerivedPaginationModel;
const useGridPaginationModel = (apiRef, props) => {
  const logger = (0, _utils.useGridLogger)(apiRef, 'useGridPaginationModel');
  const densityFactor = (0, _utils.useGridSelector)(apiRef, _density.gridDensityFactorSelector);
  const rowHeight = Math.floor(props.rowHeight * densityFactor);
  apiRef.current.registerControlState({
    stateId: 'paginationModel',
    propModel: props.paginationModel,
    propOnChange: props.onPaginationModelChange,
    stateSelector: _gridPaginationSelector.gridPaginationModelSelector,
    changeEvent: 'paginationModelChange'
  });

  /**
   * API METHODS
   */
  const setPage = React.useCallback(page => {
    const currentModel = (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
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
    const currentModel = (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
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
    const currentModel = (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
    if (paginationModel === currentModel) {
      return;
    }
    logger.debug("Setting 'paginationModel' to", paginationModel);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      pagination: (0, _extends2.default)({}, state.pagination, {
        paginationModel: getDerivedPaginationModel(state.pagination, props.signature, paginationModel)
      })
    }));
  }, [apiRef, logger, props.signature]);
  const paginationModelApi = {
    setPage,
    setPageSize,
    setPaginationModel
  };
  (0, _utils.useGridApiMethod)(apiRef, paginationModelApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const paginationModel = (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
    const shouldExportPaginationModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the `paginationModel` is controlled
    props.paginationModel != null ||
    // Always export if the `paginationModel` has been initialized
    props.initialState?.pagination?.paginationModel != null ||
    // Export if `page` or `pageSize` is not equal to the default value
    paginationModel.page !== 0 && paginationModel.pageSize !== (0, _gridPaginationUtils.defaultPageSize)(props.autoPageSize);
    if (!shouldExportPaginationModel) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      pagination: (0, _extends2.default)({}, prevState.pagination, {
        paginationModel
      })
    });
  }, [apiRef, props.paginationModel, props.initialState?.pagination?.paginationModel, props.autoPageSize]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const paginationModel = context.stateToRestore.pagination?.paginationModel ? (0, _extends2.default)({}, (0, _gridPaginationUtils.getDefaultGridPaginationModel)(props.autoPageSize), context.stateToRestore.pagination?.paginationModel) : (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      pagination: (0, _extends2.default)({}, state.pagination, {
        paginationModel: getDerivedPaginationModel(state.pagination, props.signature, paginationModel)
      })
    }));
    return params;
  }, [apiRef, props.autoPageSize, props.signature]);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EVENTS
   */
  const handlePaginationModelChange = () => {
    const paginationModel = (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
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
    const paginationModel = (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef);
    const pageCount = (0, _gridPaginationSelector.gridPageCountSelector)(apiRef);
    if (paginationModel.page > pageCount - 1) {
      apiRef.current.setPage(Math.max(0, pageCount - 1));
    }
  }, [apiRef]);
  (0, _utils.useGridApiEventHandler)(apiRef, 'viewportInnerSizeChange', handleUpdateAutoPageSize);
  (0, _utils.useGridApiEventHandler)(apiRef, 'paginationModelChange', handlePaginationModelChange);
  (0, _utils.useGridApiEventHandler)(apiRef, 'rowCountChange', handleRowCountChange);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      pagination: (0, _extends2.default)({}, state.pagination, {
        paginationModel: getDerivedPaginationModel(state.pagination, props.signature, props.paginationModel)
      })
    }));
  }, [apiRef, props.paginationModel, props.paginationMode, props.signature]);
  React.useEffect(handleUpdateAutoPageSize, [handleUpdateAutoPageSize]);
};
exports.useGridPaginationModel = useGridPaginationModel;