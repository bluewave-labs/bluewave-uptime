"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowCount = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useLazyRef = _interopRequireDefault(require("@mui/utils/useLazyRef"));
var _filter = require("../filter");
var _utils = require("../../utils");
var _pipeProcessing = require("../../core/pipeProcessing");
var _gridPaginationSelector = require("./gridPaginationSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useGridRowCount = (apiRef, props) => {
  const logger = (0, _utils.useGridLogger)(apiRef, 'useGridRowCount');
  const visibleTopLevelRowCount = (0, _utils.useGridSelector)(apiRef, _filter.gridFilteredTopLevelRowCountSelector);
  const rowCountState = (0, _utils.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginationRowCountSelector);
  const paginationMeta = (0, _utils.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginationMetaSelector);
  const paginationModel = (0, _utils.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginationModelSelector);
  const previousPageSize = (0, _useLazyRef.default)(() => (0, _gridPaginationSelector.gridPaginationModelSelector)(apiRef).pageSize);
  apiRef.current.registerControlState({
    stateId: 'paginationRowCount',
    propModel: props.rowCount,
    propOnChange: props.onRowCountChange,
    stateSelector: _gridPaginationSelector.gridPaginationRowCountSelector,
    changeEvent: 'rowCountChange'
  });

  /**
   * API METHODS
   */
  const setRowCount = React.useCallback(newRowCount => {
    if (rowCountState === newRowCount) {
      return;
    }
    logger.debug("Setting 'rowCount' to", newRowCount);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      pagination: (0, _extends2.default)({}, state.pagination, {
        rowCount: newRowCount
      })
    }));
  }, [apiRef, logger, rowCountState]);
  const paginationRowCountApi = {
    setRowCount
  };
  (0, _utils.useGridApiMethod)(apiRef, paginationRowCountApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const exportedRowCount = (0, _gridPaginationSelector.gridPaginationRowCountSelector)(apiRef);
    const shouldExportRowCount =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the `rowCount` is controlled
    props.rowCount != null ||
    // Always export if the `rowCount` has been initialized
    props.initialState?.pagination?.rowCount != null;
    if (!shouldExportRowCount) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      pagination: (0, _extends2.default)({}, prevState.pagination, {
        rowCount: exportedRowCount
      })
    });
  }, [apiRef, props.rowCount, props.initialState?.pagination?.rowCount]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const restoredRowCount = context.stateToRestore.pagination?.rowCount ? context.stateToRestore.pagination.rowCount : (0, _gridPaginationSelector.gridPaginationRowCountSelector)(apiRef);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      pagination: (0, _extends2.default)({}, state.pagination, {
        rowCount: restoredRowCount
      })
    }));
    return params;
  }, [apiRef]);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EVENTS
   */
  const handlePaginationModelChange = React.useCallback(model => {
    if (props.paginationMode === 'client' || !previousPageSize.current) {
      return;
    }
    if (model.pageSize !== previousPageSize.current) {
      previousPageSize.current = model.pageSize;
      if (rowCountState === -1) {
        // Row count unknown and page size changed, reset the page
        apiRef.current.setPage(0);
      }
    }
  }, [props.paginationMode, previousPageSize, rowCountState, apiRef]);
  (0, _utils.useGridApiEventHandler)(apiRef, 'paginationModelChange', handlePaginationModelChange);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (props.paginationMode === 'client') {
      apiRef.current.setRowCount(visibleTopLevelRowCount);
    } else if (props.rowCount != null) {
      apiRef.current.setRowCount(props.rowCount);
    }
  }, [apiRef, props.paginationMode, visibleTopLevelRowCount, props.rowCount]);
  const isLastPage = paginationMeta.hasNextPage === false;
  React.useEffect(() => {
    if (isLastPage && rowCountState === -1) {
      apiRef.current.setRowCount(paginationModel.pageSize * paginationModel.page + visibleTopLevelRowCount);
    }
  }, [apiRef, visibleTopLevelRowCount, isLastPage, rowCountState, paginationModel]);
};
exports.useGridRowCount = useGridRowCount;