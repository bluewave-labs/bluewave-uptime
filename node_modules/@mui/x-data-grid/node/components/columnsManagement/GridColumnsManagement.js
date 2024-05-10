"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnsManagement = GridColumnsManagement;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _styles = require("@mui/material/styles");
var _gridColumnsSelector = require("../../hooks/features/columns/gridColumnsSelector");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridClasses = require("../../constants/gridClasses");
var _useLazyRef = require("../../hooks/utils/useLazyRef");
var _utils2 = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable @typescript-eslint/no-use-before-define */

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['columnsManagement'],
    header: ['columnsManagementHeader'],
    footer: ['columnsManagementFooter'],
    row: ['columnsManagementRow']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const collator = new Intl.Collator();
function GridColumnsManagement(props) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const searchInputRef = React.useRef(null);
  const columns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnDefinitionsSelector);
  const initialColumnVisibilityModel = (0, _useLazyRef.useLazyRef)(() => (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef)).current;
  const columnVisibilityModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnVisibilityModelSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const [searchValue, setSearchValue] = React.useState('');
  const classes = useUtilityClasses(rootProps);
  const {
    sort,
    searchPredicate = _utils2.defaultSearchPredicate,
    autoFocusSearchField = true,
    disableShowHideToggle = false,
    disableResetButton = false,
    toggleAllMode = 'all',
    getTogglableColumns
  } = props;
  const isResetDisabled = React.useMemo(() => (0, _utils2.checkColumnVisibilityModelsSame)(columnVisibilityModel, initialColumnVisibilityModel), [columnVisibilityModel, initialColumnVisibilityModel]);
  const sortedColumns = React.useMemo(() => {
    switch (sort) {
      case 'asc':
        return [...columns].sort((a, b) => collator.compare(a.headerName || a.field, b.headerName || b.field));
      case 'desc':
        return [...columns].sort((a, b) => -collator.compare(a.headerName || a.field, b.headerName || b.field));
      default:
        return columns;
    }
  }, [columns, sort]);
  const toggleColumn = event => {
    const {
      name: field
    } = event.target;
    apiRef.current.setColumnVisibility(field, columnVisibilityModel[field] === false);
  };
  const currentColumns = React.useMemo(() => {
    const togglableColumns = getTogglableColumns ? getTogglableColumns(sortedColumns) : null;
    const togglableSortedColumns = togglableColumns ? sortedColumns.filter(({
      field
    }) => togglableColumns.includes(field)) : sortedColumns;
    if (!searchValue) {
      return togglableSortedColumns;
    }
    return togglableSortedColumns.filter(column => searchPredicate(column, searchValue.toLowerCase()));
  }, [sortedColumns, searchValue, searchPredicate, getTogglableColumns]);
  const toggleAllColumns = React.useCallback(isVisible => {
    const currentModel = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);
    const newModel = (0, _extends2.default)({}, currentModel);
    const togglableColumns = getTogglableColumns ? getTogglableColumns(columns) : null;
    (toggleAllMode === 'filteredOnly' ? currentColumns : columns).forEach(col => {
      if (col.hideable && (togglableColumns == null || togglableColumns.includes(col.field))) {
        if (isVisible) {
          // delete the key from the model instead of setting it to `true`
          delete newModel[col.field];
        } else {
          newModel[col.field] = false;
        }
      }
    });
    return apiRef.current.setColumnVisibilityModel(newModel);
  }, [apiRef, columns, getTogglableColumns, toggleAllMode, currentColumns]);
  const handleSearchValueChange = React.useCallback(event => {
    setSearchValue(event.target.value);
  }, []);
  const hideableColumns = React.useMemo(() => currentColumns.filter(col => col.hideable), [currentColumns]);
  const allHideableColumnsVisible = React.useMemo(() => hideableColumns.every(column => columnVisibilityModel[column.field] == null || columnVisibilityModel[column.field] !== false), [columnVisibilityModel, hideableColumns]);
  const allHideableColumnsHidden = React.useMemo(() => hideableColumns.every(column => columnVisibilityModel[column.field] === false), [columnVisibilityModel, hideableColumns]);
  const firstSwitchRef = React.useRef(null);
  React.useEffect(() => {
    if (autoFocusSearchField) {
      searchInputRef.current.focus();
    } else if (firstSwitchRef.current && typeof firstSwitchRef.current.focus === 'function') {
      firstSwitchRef.current.focus();
    }
  }, [autoFocusSearchField]);
  let firstHideableColumnFound = false;
  const isFirstHideableColumn = column => {
    if (firstHideableColumnFound === false && column.hideable !== false) {
      firstHideableColumnFound = true;
      return true;
    }
    return false;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(GridColumnsManagementHeader, {
      className: classes.header,
      ownerState: rootProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseTextField, (0, _extends2.default)({
        placeholder: apiRef.current.getLocaleText('columnsManagementSearchTitle'),
        inputRef: searchInputRef,
        value: searchValue,
        onChange: handleSearchValueChange,
        variant: "outlined",
        size: "small",
        InputProps: {
          startAdornment: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseInputAdornment, {
            position: "start",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.quickFilterIcon, {})
          }),
          sx: {
            pl: 1.5
          }
        },
        fullWidth: true
      }, rootProps.slotProps?.baseTextField))
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnsManagementBody, {
      className: classes.root,
      ownerState: rootProps,
      children: [currentColumns.map(column => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControlLabel.default, {
        className: classes.row,
        control: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseCheckbox, (0, _extends2.default)({
          disabled: column.hideable === false,
          checked: columnVisibilityModel[column.field] !== false,
          onClick: toggleColumn,
          name: column.field,
          sx: {
            p: 0.5
          },
          inputRef: isFirstHideableColumn(column) ? firstSwitchRef : undefined
        }, rootProps.slotProps?.baseCheckbox)),
        label: column.headerName || column.field
      }, column.field)), currentColumns.length === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(GridColumnsManagementEmptyText, {
        ownerState: rootProps,
        children: apiRef.current.getLocaleText('columnsManagementNoColumns')
      })]
    }), (!disableShowHideToggle || !disableResetButton) && currentColumns.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnsManagementFooter, {
      ownerState: rootProps,
      className: classes.footer,
      children: [!disableShowHideToggle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControlLabel.default, {
        control: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseCheckbox, (0, _extends2.default)({
          disabled: hideableColumns.length === 0,
          checked: allHideableColumnsVisible,
          indeterminate: !allHideableColumnsVisible && !allHideableColumnsHidden,
          onClick: () => toggleAllColumns(!allHideableColumnsVisible),
          name: apiRef.current.getLocaleText('columnsManagementShowHideAllText'),
          sx: {
            p: 0.5
          }
        }, rootProps.slotProps?.baseCheckbox)),
        label: apiRef.current.getLocaleText('columnsManagementShowHideAllText')
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {}), !disableResetButton ? /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseButton, (0, _extends2.default)({
        onClick: () => apiRef.current.setColumnVisibilityModel(initialColumnVisibilityModel),
        disabled: isResetDisabled
      }, rootProps.slotProps?.baseButton, {
        children: apiRef.current.getLocaleText('columnsManagementReset')
      })) : null]
    }) : null]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnsManagement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the column search field will be focused automatically.
   * If `false`, the first column switch input will be focused automatically.
   * This helps to avoid input keyboard panel to popup automatically on touch devices.
   * @default true
   */
  autoFocusSearchField: _propTypes.default.bool,
  /**
   * If `true`, the `Reset` button will not be disabled
   * @default false
   */
  disableResetButton: _propTypes.default.bool,
  /**
   * If `true`, the `Show/Hide all` toggle checkbox will not be displayed.
   * @default false
   */
  disableShowHideToggle: _propTypes.default.bool,
  /**
   * Returns the list of togglable columns.
   * If used, only those columns will be displayed in the panel
   * which are passed as the return value of the function.
   * @param {GridColDef[]} columns The `ColDef` list of all columns.
   * @returns {GridColDef['field'][]} The list of togglable columns' field names.
   */
  getTogglableColumns: _propTypes.default.func,
  searchPredicate: _propTypes.default.func,
  sort: _propTypes.default.oneOf(['asc', 'desc']),
  /**
   * Changes the behavior of the `Show/Hide All` toggle when the search field is used:
   * - `all`: Will toggle all columns.
   * - `filteredOnly`: Will only toggle columns that match the search criteria.
   * @default 'all'
   */
  toggleAllMode: _propTypes.default.oneOf(['all', 'filteredOnly'])
} : void 0;
const GridColumnsManagementBody = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsManagement',
  overridesResolver: (props, styles) => styles.columnsManagement
})(({
  theme
}) => ({
  padding: theme.spacing(0, 3, 1.5),
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  flex: '1 1',
  maxHeight: 400,
  alignItems: 'flex-start'
}));
const GridColumnsManagementHeader = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsManagementHeader',
  overridesResolver: (props, styles) => styles.columnsManagementHeader
})(({
  theme
}) => ({
  padding: theme.spacing(1.5, 3)
}));
const GridColumnsManagementFooter = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsManagementFooter',
  overridesResolver: (props, styles) => styles.columnsManagementFooter
})(({
  theme
}) => ({
  padding: theme.spacing(0.5, 1, 0.5, 3),
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.divider}`
}));
const GridColumnsManagementEmptyText = (0, _styles.styled)('div')(({
  theme
}) => ({
  padding: theme.spacing(0.5, 0),
  color: theme.palette.grey[500]
}));