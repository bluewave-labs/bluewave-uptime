"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPagination = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _TablePagination = _interopRequireWildcard(require("@mui/material/TablePagination"));
var _useGridSelector = require("../hooks/utils/useGridSelector");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _gridPaginationSelector = require("../hooks/features/pagination/gridPaginationSelector");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridPaginationRoot = (0, _styles.styled)(_TablePagination.default)(({
  theme
}) => ({
  [`& .${_TablePagination.tablePaginationClasses.selectLabel}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  [`& .${_TablePagination.tablePaginationClasses.input}`]: {
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

const GridPagination = exports.GridPagination = /*#__PURE__*/React.forwardRef(function GridPagination(props, ref) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const paginationModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginationModelSelector);
  const rowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginationRowCountSelector);
  const pageCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridPaginationSelector.gridPageCountSelector);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridPaginationRoot, (0, _extends2.default)({
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
  component: _propTypes.default.elementType
} : void 0;