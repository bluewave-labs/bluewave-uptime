import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import TablePagination, { tablePaginationClasses } from '@mui/material/TablePagination';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridPaginationModelSelector, gridPaginationRowCountSelector, gridPageCountSelector } from '../hooks/features/pagination/gridPaginationSelector';
import { jsx as _jsx } from "react/jsx-runtime";
const GridPaginationRoot = styled(TablePagination)(({
  theme
}) => ({
  [`& .${tablePaginationClasses.selectLabel}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  [`& .${tablePaginationClasses.input}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex'
    }
  }
}));
const wrapLabelDisplayedRows = (labelDisplayedRows, estimated) => {
  return ({
    from,
    to,
    count,
    page
  }) => labelDisplayedRows({
    from,
    to,
    count,
    page,
    estimated
  });
};
const defaultLabelDisplayedRows = ({
  from,
  to,
  count,
  estimated
}) => {
  if (!estimated) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }
  return `${from}–${to} of ${count !== -1 ? count : `more than ${estimated > to ? estimated : to}`}`;
};

// A mutable version of a readonly array.

const GridPagination = /*#__PURE__*/React.forwardRef(function GridPagination(props, ref) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const rowCount = useGridSelector(apiRef, gridPaginationRowCountSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const {
    paginationMode,
    loading,
    estimatedRowCount
  } = rootProps;
  const computedProps = React.useMemo(() => {
    if (rowCount === -1 && paginationMode === 'server' && loading) {
      return {
        backIconButtonProps: {
          disabled: true
        },
        nextIconButtonProps: {
          disabled: true
        }
      };
    }
    return {};
  }, [loading, paginationMode, rowCount]);
  const lastPage = React.useMemo(() => Math.max(0, pageCount - 1), [pageCount]);
  const computedPage = React.useMemo(() => {
    if (rowCount === -1) {
      return paginationModel.page;
    }
    return paginationModel.page <= lastPage ? paginationModel.page : lastPage;
  }, [lastPage, paginationModel.page, rowCount]);
  const handlePageSizeChange = React.useCallback(event => {
    const pageSize = Number(event.target.value);
    apiRef.current.setPageSize(pageSize);
  }, [apiRef]);
  const handlePageChange = React.useCallback((_, page) => {
    apiRef.current.setPage(page);
  }, [apiRef]);
  const isPageSizeIncludedInPageSizeOptions = pageSize => {
    for (let i = 0; i < rootProps.pageSizeOptions.length; i += 1) {
      const option = rootProps.pageSizeOptions[i];
      if (typeof option === 'number') {
        if (option === pageSize) {
          return true;
        }
      } else if (option.value === pageSize) {
        return true;
      }
    }
    return false;
  };
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const warnedOnceMissingInPageSizeOptions = React.useRef(false);
    const pageSize = rootProps.paginationModel?.pageSize ?? paginationModel.pageSize;
    if (!warnedOnceMissingInPageSizeOptions.current && !rootProps.autoPageSize && !isPageSizeIncludedInPageSizeOptions(pageSize)) {
      console.warn([`MUI X: The page size \`${paginationModel.pageSize}\` is not present in the \`pageSizeOptions\`.`, `Add it to show the pagination select.`].join('\n'));
      warnedOnceMissingInPageSizeOptions.current = true;
    }
  }
  const pageSizeOptions = isPageSizeIncludedInPageSizeOptions(paginationModel.pageSize) ? rootProps.pageSizeOptions : [];
  const locales = apiRef.current.getLocaleText('MuiTablePagination');
  const wrappedLabelDisplayedRows = wrapLabelDisplayedRows(locales.labelDisplayedRows || defaultLabelDisplayedRows, estimatedRowCount);
  return /*#__PURE__*/_jsx(GridPaginationRoot, _extends({
    ref: ref,
    component: "div",
    count: rowCount,
    page: computedPage
    // TODO: Remove the cast once the type is fixed in Material UI and that the min Material UI version
    // for x-data-grid is past the fix.
    // Note that Material UI will not mutate the array, so this is safe.
    ,
    rowsPerPageOptions: pageSizeOptions,
    rowsPerPage: paginationModel.pageSize,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handlePageSizeChange
  }, computedProps, locales, {
    labelDisplayedRows: wrappedLabelDisplayedRows
  }, props));
});
process.env.NODE_ENV !== "production" ? GridPagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  component: PropTypes.elementType
} : void 0;
export { GridPagination };