import { GridSignature } from '../../utils';
const MAX_PAGE_SIZE = 100;
export const defaultPageSize = autoPageSize => autoPageSize ? 0 : 100;
export const getPageCount = (rowCount, pageSize, page) => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }
  if (rowCount === -1) {
    // With unknown row-count, we can assume a page after the current one
    return page + 2;
  }
  return 0;
};
export const getDefaultGridPaginationModel = autoPageSize => ({
  page: 0,
  pageSize: autoPageSize ? 0 : 100
});
export const getValidPage = (page, pageCount = 0) => {
  if (pageCount === 0) {
    return page;
  }
  return Math.max(Math.min(page, pageCount - 1), 0);
};
export const throwIfPageSizeExceedsTheLimit = (pageSize, signatureProp) => {
  if (signatureProp === GridSignature.DataGrid && pageSize > MAX_PAGE_SIZE) {
    throw new Error(['MUI X: `pageSize` cannot exceed 100 in the MIT version of the DataGrid.', 'You need to upgrade to DataGridPro or DataGridPremium component to unlock this feature.'].join('\n'));
  }
};