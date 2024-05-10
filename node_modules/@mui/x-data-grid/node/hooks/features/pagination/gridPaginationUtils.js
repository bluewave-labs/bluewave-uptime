"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwIfPageSizeExceedsTheLimit = exports.getValidPage = exports.getPageCount = exports.getDefaultGridPaginationModel = exports.defaultPageSize = void 0;
var _utils = require("../../utils");
const MAX_PAGE_SIZE = 100;
const defaultPageSize = autoPageSize => autoPageSize ? 0 : 100;
exports.defaultPageSize = defaultPageSize;
const getPageCount = (rowCount, pageSize, page) => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }
  if (rowCount === -1) {
    // With unknown row-count, we can assume a page after the current one
    return page + 2;
  }
  return 0;
};
exports.getPageCount = getPageCount;
const getDefaultGridPaginationModel = autoPageSize => ({
  page: 0,
  pageSize: autoPageSize ? 0 : 100
});
exports.getDefaultGridPaginationModel = getDefaultGridPaginationModel;
const getValidPage = (page, pageCount = 0) => {
  if (pageCount === 0) {
    return page;
  }
  return Math.max(Math.min(page, pageCount - 1), 0);
};
exports.getValidPage = getValidPage;
const throwIfPageSizeExceedsTheLimit = (pageSize, signatureProp) => {
  if (signatureProp === _utils.GridSignature.DataGrid && pageSize > MAX_PAGE_SIZE) {
    throw new Error(['MUI X: `pageSize` cannot exceed 100 in the MIT version of the DataGrid.', 'You need to upgrade to DataGridPro or DataGridPremium component to unlock this feature.'].join('\n'));
  }
};
exports.throwIfPageSizeExceedsTheLimit = throwIfPageSizeExceedsTheLimit;