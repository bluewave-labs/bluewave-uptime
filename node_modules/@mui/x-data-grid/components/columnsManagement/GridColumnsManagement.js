import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useLazyRef } from '../../hooks/utils/useLazyRef';
import { checkColumnVisibilityModelsSame, defaultSearchPredicate } from './utils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const collator = new Intl.Collator();
function GridColumnsManagement(props) {
  const apiRef = useGridApiContext();
  const searchInputRef = React.useRef(null);
  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const initialColumnVisibilityModel = useLazyRef(() => gridColumnVisibilityModelSelector(apiRef)).current;
  const columnVisibilityModel = useGridSelector(apiRef, gridColumnVisibilityModelSelector);
  const rootProps = useGridRootProps();
  const [searchValue, setSearchValue] = React.useState('');
  const classes = useUtilityClasses(rootProps);
  const {
    sort,
    searchPredicate = defaultSearchPredicate,
    autoFocusSearchField = true,
    disableShowHideToggle = false,
    disableResetButton = false,
    toggleAllMode = 'all',
    getTogglableColumns
  } = props;
  const isResetDisabled = React.useMemo(() => checkColumnVisibilityModelsSame(columnVisibilityModel, initialColumnVisibilityModel), [columnVisibilityModel, initialColumnVisibilityModel]);
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
    const currentModel = gridColumnVisibilityModelSelector(apiRef);
    const newModel = _extends({}, currentModel);
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
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(GridColumnsManagementHeader, {
      className: classes.header,
      ownerState: rootProps,
      children: /*#__PURE__*/_jsx(rootProps.slots.baseTextField, _extends({
        placeholder: apiRef.current.getLocaleText('columnsManagementSearchTitle'),
        inputRef: searchInputRef,
        value: searchValue,
        onChange: handleSearchValueChange,
        variant: "outlined",
        size: "small",
        InputProps: {
          startAdornment: /*#__PURE__*/_jsx(rootProps.slots.baseInputAdornment, {
            position: "start",
            children: /*#__PURE__*/_jsx(rootProps.slots.quickFilterIcon, {})
          }),
          sx: {
            pl: 1.5
          }
        },
        fullWidth: true
      }, rootProps.slotProps?.baseTextField))
    }), /*#__PURE__*/_jsxs(GridColumnsManagementBody, {
      className: classes.root,
      ownerState: rootProps,
      children: [currentColumns.map(column => /*#__PURE__*/_jsx(FormControlLabel, {
        className: classes.row,
        control: /*#__PURE__*/_jsx(rootProps.slots.baseCheckbox, _extends({
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
      }, column.field)), currentColumns.length === 0 && /*#__PURE__*/_jsx(GridColumnsManagementEmptyText, {
        ownerState: rootProps,
        children: apiRef.current.getLocaleText('columnsManagementNoColumns')
      })]
    }), (!disableShowHideToggle || !disableResetButton) && currentColumns.length > 0 ? /*#__PURE__*/_jsxs(GridColumnsManagementFooter, {
      ownerState: rootProps,
      className: classes.footer,
      children: [!disableShowHideToggle ? /*#__PURE__*/_jsx(FormControlLabel, {
        control: /*#__PURE__*/_jsx(rootProps.slots.baseCheckbox, _extends({
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
      }) : /*#__PURE__*/_jsx("span", {}), !disableResetButton ? /*#__PURE__*/_jsx(rootProps.slots.baseButton, _extends({
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
  autoFocusSearchField: PropTypes.bool,
  /**
   * If `true`, the `Reset` button will not be disabled
   * @default false
   */
  disableResetButton: PropTypes.bool,
  /**
   * If `true`, the `Show/Hide all` toggle checkbox will not be displayed.
   * @default false
   */
  disableShowHideToggle: PropTypes.bool,
  /**
   * Returns the list of togglable columns.
   * If used, only those columns will be displayed in the panel
   * which are passed as the return value of the function.
   * @param {GridColDef[]} columns The `ColDef` list of all columns.
   * @returns {GridColDef['field'][]} The list of togglable columns' field names.
   */
  getTogglableColumns: PropTypes.func,
  searchPredicate: PropTypes.func,
  sort: PropTypes.oneOf(['asc', 'desc']),
  /**
   * Changes the behavior of the `Show/Hide All` toggle when the search field is used:
   * - `all`: Will toggle all columns.
   * - `filteredOnly`: Will only toggle columns that match the search criteria.
   * @default 'all'
   */
  toggleAllMode: PropTypes.oneOf(['all', 'filteredOnly'])
} : void 0;
const GridColumnsManagementBody = styled('div', {
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
const GridColumnsManagementHeader = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsManagementHeader',
  overridesResolver: (props, styles) => styles.columnsManagementHeader
})(({
  theme
}) => ({
  padding: theme.spacing(1.5, 3)
}));
const GridColumnsManagementFooter = styled('div', {
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
const GridColumnsManagementEmptyText = styled('div')(({
  theme
}) => ({
  padding: theme.spacing(0.5, 0),
  color: theme.palette.grey[500]
}));
export { GridColumnsManagement };