"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridPagination = exports.paginationStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _gridPaginationUtils = require("./gridPaginationUtils");
var _useGridPaginationModel = require("./useGridPaginationModel");
var _useGridRowCount = require("./useGridRowCount");
var _useGridPaginationMeta = require("./useGridPaginationMeta");
const paginationStateInitializer = (state, props) => {
  const paginationModel = (0, _extends2.default)({}, (0, _gridPaginationUtils.getDefaultGridPaginationModel)(props.autoPageSize), props.paginationModel ?? props.initialState?.pagination?.paginationModel);
  (0, _gridPaginationUtils.throwIfPageSizeExceedsTheLimit)(paginationModel.pageSize, props.signature);
  const rowCount = props.rowCount ?? props.initialState?.pagination?.rowCount;
  const meta = props.paginationMeta ?? props.initialState?.pagination?.meta ?? {};
  return (0, _extends2.default)({}, state, {
    pagination: {
      paginationModel,
      rowCount,
      meta
    }
  });
};

/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */
exports.paginationStateInitializer = paginationStateInitializer;
const useGridPagination = (apiRef, props) => {
  (0, _useGridPaginationMeta.useGridPaginationMeta)(apiRef, props);
  (0, _useGridPaginationModel.useGridPaginationModel)(apiRef, props);
  (0, _useGridRowCount.useGridRowCount)(apiRef, props);
};
exports.useGridPagination = useGridPagination;