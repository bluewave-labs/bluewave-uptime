"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterForm = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _styles = require("@mui/material/styles");
var _clsx = _interopRequireDefault(require("clsx"));
var _gridColumnsSelector = require("../../../hooks/features/columns/gridColumnsSelector");
var _gridFilterSelector = require("../../../hooks/features/filter/gridFilterSelector");
var _useGridSelector = require("../../../hooks/utils/useGridSelector");
var _gridFilterItem = require("../../../models/gridFilterItem");
var _useGridApiContext = require("../../../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");
var _gridClasses = require("../../../constants/gridClasses");
var _filterPanelUtils = require("./filterPanelUtils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["item", "hasMultipleFilters", "deleteFilter", "applyFilterChanges", "showMultiFilterOperators", "disableMultiFilterOperator", "applyMultiFilterOperatorChanges", "focusElementRef", "logicOperators", "columnsSort", "filterColumns", "deleteIconProps", "logicOperatorInputProps", "operatorInputProps", "columnInputProps", "valueInputProps", "readOnly", "children"],
  _excluded2 = ["InputComponentProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['filterForm'],
    deleteIcon: ['filterFormDeleteIcon'],
    logicOperatorInput: ['filterFormLogicOperatorInput'],
    columnInput: ['filterFormColumnInput'],
    operatorInput: ['filterFormOperatorInput'],
    valueInput: ['filterFormValueInput']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const GridFilterFormRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterForm',
  overridesResolver: (props, styles) => styles.filterForm
})(({
  theme
}) => ({
  display: 'flex',
  padding: theme.spacing(1)
}));
const FilterFormDeleteIcon = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterFormDeleteIcon',
  overridesResolver: (_, styles) => styles.filterFormDeleteIcon
})(({
  theme
}) => ({
  flexShrink: 0,
  justifyContent: 'flex-end',
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.2)
}));
const FilterFormLogicOperatorInput = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterFormLogicOperatorInput',
  overridesResolver: (_, styles) => styles.filterFormLogicOperatorInput
})({
  minWidth: 55,
  marginRight: 5,
  justifyContent: 'end'
});
const FilterFormColumnInput = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterFormColumnInput',
  overridesResolver: (_, styles) => styles.filterFormColumnInput
})({
  width: 150
});
const FilterFormOperatorInput = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterFormOperatorInput',
  overridesResolver: (_, styles) => styles.filterFormOperatorInput
})({
  width: 120
});
const FilterFormValueInput = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterFormValueInput',
  overridesResolver: (_, styles) => styles.filterFormValueInput
})({
  width: 190
});
const getLogicOperatorLocaleKey = logicOperator => {
  switch (logicOperator) {
    case _gridFilterItem.GridLogicOperator.And:
      return 'filterPanelOperatorAnd';
    case _gridFilterItem.GridLogicOperator.Or:
      return 'filterPanelOperatorOr';
    default:
      throw new Error('MUI X: Invalid `logicOperator` property in the `GridFilterPanel`.');
  }
};
const getColumnLabel = col => col.headerName || col.field;
const collator = new Intl.Collator();
const GridFilterForm = exports.GridFilterForm = /*#__PURE__*/React.forwardRef(function GridFilterForm(props, ref) {
  const {
      item,
      hasMultipleFilters,
      deleteFilter,
      applyFilterChanges,
      showMultiFilterOperators,
      disableMultiFilterOperator,
      applyMultiFilterOperatorChanges,
      focusElementRef,
      logicOperators = [_gridFilterItem.GridLogicOperator.And, _gridFilterItem.GridLogicOperator.Or],
      columnsSort,
      filterColumns,
      deleteIconProps = {},
      logicOperatorInputProps = {},
      operatorInputProps = {},
      columnInputProps = {},
      valueInputProps = {},
      readOnly
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const columnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnLookupSelector);
  const filterableColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridFilterableColumnDefinitionsSelector);
  const filterModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterModelSelector);
  const columnSelectId = (0, _utils.unstable_useId)();
  const columnSelectLabelId = (0, _utils.unstable_useId)();
  const operatorSelectId = (0, _utils.unstable_useId)();
  const operatorSelectLabelId = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const classes = useUtilityClasses(rootProps);
  const valueRef = React.useRef(null);
  const filterSelectorRef = React.useRef(null);
  const multiFilterOperator = filterModel.logicOperator ?? _gridFilterItem.GridLogicOperator.And;
  const hasLogicOperatorColumn = hasMultipleFilters && logicOperators.length > 0;
  const baseFormControlProps = rootProps.slotProps?.baseFormControl || {};
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isBaseSelectNative = baseSelectProps.native ?? false;
  const baseInputLabelProps = rootProps.slotProps?.baseInputLabel || {};
  const baseSelectOptionProps = rootProps.slotProps?.baseSelectOption || {};
  const {
      InputComponentProps
    } = valueInputProps,
    valueInputPropsOther = (0, _objectWithoutPropertiesLoose2.default)(valueInputProps, _excluded2);
  const {
    filteredColumns,
    selectedField
  } = React.useMemo(() => {
    let itemField = item.field;

    // Yields a valid value if the current filter belongs to a column that is not filterable
    const selectedNonFilterableColumn = columnLookup[item.field].filterable === false ? columnLookup[item.field] : null;
    if (selectedNonFilterableColumn) {
      return {
        filteredColumns: [selectedNonFilterableColumn],
        selectedField: itemField
      };
    }
    if (filterColumns === undefined || typeof filterColumns !== 'function') {
      return {
        filteredColumns: filterableColumns,
        selectedField: itemField
      };
    }
    const filteredFields = filterColumns({
      field: item.field,
      columns: filterableColumns,
      currentFilters: filterModel?.items || []
    });
    return {
      filteredColumns: filterableColumns.filter(column => {
        const isFieldIncluded = filteredFields.includes(column.field);
        if (column.field === item.field && !isFieldIncluded) {
          itemField = undefined;
        }
        return isFieldIncluded;
      }),
      selectedField: itemField
    };
  }, [filterColumns, filterModel?.items, filterableColumns, item.field, columnLookup]);
  const sortedFilteredColumns = React.useMemo(() => {
    switch (columnsSort) {
      case 'asc':
        return filteredColumns.sort((a, b) => collator.compare(getColumnLabel(a), getColumnLabel(b)));
      case 'desc':
        return filteredColumns.sort((a, b) => -collator.compare(getColumnLabel(a), getColumnLabel(b)));
      default:
        return filteredColumns;
    }
  }, [filteredColumns, columnsSort]);
  const currentColumn = item.field ? apiRef.current.getColumn(item.field) : null;
  const currentOperator = React.useMemo(() => {
    if (!item.operator || !currentColumn) {
      return null;
    }
    return currentColumn.filterOperators?.find(operator => operator.value === item.operator);
  }, [item, currentColumn]);
  const changeColumn = React.useCallback(event => {
    const field = event.target.value;
    const column = apiRef.current.getColumn(field);
    if (column.field === currentColumn.field) {
      // column did not change
      return;
    }

    // try to keep the same operator when column change
    const newOperator = column.filterOperators.find(operator => operator.value === item.operator) || column.filterOperators[0];

    // Erase filter value if the input component or filtered column type is modified
    const eraseFilterValue = !newOperator.InputComponent || newOperator.InputComponent !== currentOperator?.InputComponent || column.type !== currentColumn.type;
    let filterValue = eraseFilterValue ? undefined : item.value;

    // Check filter value against the new valueOptions
    if (column.type === 'singleSelect' && filterValue !== undefined) {
      const colDef = column;
      const valueOptions = (0, _filterPanelUtils.getValueOptions)(colDef);
      if (Array.isArray(filterValue)) {
        filterValue = filterValue.filter(val => {
          return (
            // Only keep values that are in the new value options
            (0, _filterPanelUtils.getValueFromValueOptions)(val, valueOptions, colDef?.getOptionValue) !== undefined
          );
        });
      } else if ((0, _filterPanelUtils.getValueFromValueOptions)(item.value, valueOptions, colDef?.getOptionValue) === undefined) {
        // Reset the filter value if it is not in the new value options
        filterValue = undefined;
      }
    }
    applyFilterChanges((0, _extends2.default)({}, item, {
      field,
      operator: newOperator.value,
      value: filterValue
    }));
  }, [apiRef, applyFilterChanges, item, currentColumn, currentOperator]);
  const changeOperator = React.useCallback(event => {
    const operator = event.target.value;
    const newOperator = currentColumn?.filterOperators.find(op => op.value === operator);
    const eraseItemValue = !newOperator?.InputComponent || newOperator?.InputComponent !== currentOperator?.InputComponent;
    applyFilterChanges((0, _extends2.default)({}, item, {
      operator,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [applyFilterChanges, item, currentColumn, currentOperator]);
  const changeLogicOperator = React.useCallback(event => {
    const logicOperator = event.target.value === _gridFilterItem.GridLogicOperator.And.toString() ? _gridFilterItem.GridLogicOperator.And : _gridFilterItem.GridLogicOperator.Or;
    applyMultiFilterOperatorChanges(logicOperator);
  }, [applyMultiFilterOperatorChanges]);
  const handleDeleteFilter = () => {
    if (rootProps.disableMultipleColumnsFiltering) {
      if (item.value === undefined) {
        deleteFilter(item);
      } else {
        // TODO v6: simplify the behavior by always remove the filter form
        applyFilterChanges((0, _extends2.default)({}, item, {
          value: undefined
        }));
      }
    } else {
      deleteFilter(item);
    }
  };
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      if (currentOperator?.InputComponent) {
        valueRef?.current?.focus();
      } else {
        filterSelectorRef.current.focus();
      }
    }
  }), [currentOperator]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridFilterFormRoot, (0, _extends2.default)({
    ref: ref,
    className: classes.root,
    "data-id": item.id,
    ownerState: rootProps
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(FilterFormDeleteIcon, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.slots.baseFormControl
    }, baseFormControlProps, deleteIconProps, {
      className: (0, _clsx.default)(classes.deleteIcon, baseFormControlProps.className, deleteIconProps.className),
      ownerState: rootProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseIconButton, (0, _extends2.default)({
        "aria-label": apiRef.current.getLocaleText('filterPanelDeleteIconLabel'),
        title: apiRef.current.getLocaleText('filterPanelDeleteIconLabel'),
        onClick: handleDeleteFilter,
        size: "small",
        disabled: readOnly
      }, rootProps.slotProps?.baseIconButton, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.filterPanelDeleteIcon, {
          fontSize: "small"
        })
      }))
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(FilterFormLogicOperatorInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.slots.baseFormControl
    }, baseFormControlProps, logicOperatorInputProps, {
      sx: (0, _extends2.default)({
        display: hasLogicOperatorColumn ? 'flex' : 'none',
        visibility: showMultiFilterOperators ? 'visible' : 'hidden'
      }, baseFormControlProps.sx || {}, logicOperatorInputProps.sx || {}),
      className: (0, _clsx.default)(classes.logicOperatorInput, baseFormControlProps.className, logicOperatorInputProps.className),
      ownerState: rootProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelect, (0, _extends2.default)({
        inputProps: {
          'aria-label': apiRef.current.getLocaleText('filterPanelLogicOperator')
        },
        value: multiFilterOperator ?? '',
        onChange: changeLogicOperator,
        disabled: !!disableMultiFilterOperator || logicOperators.length === 1,
        native: isBaseSelectNative
      }, rootProps.slotProps?.baseSelect, {
        children: logicOperators.map(logicOperator => /*#__PURE__*/(0, _react.createElement)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
          native: isBaseSelectNative,
          key: logicOperator.toString(),
          value: logicOperator.toString()
        }), apiRef.current.getLocaleText(getLogicOperatorLocaleKey(logicOperator))))
      }))
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(FilterFormColumnInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.slots.baseFormControl
    }, baseFormControlProps, columnInputProps, {
      className: (0, _clsx.default)(classes.columnInput, baseFormControlProps.className, columnInputProps.className),
      ownerState: rootProps,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseInputLabel, (0, _extends2.default)({}, baseInputLabelProps, {
        htmlFor: columnSelectId,
        id: columnSelectLabelId,
        children: apiRef.current.getLocaleText('filterPanelColumns')
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelect, (0, _extends2.default)({
        labelId: columnSelectLabelId,
        id: columnSelectId,
        label: apiRef.current.getLocaleText('filterPanelColumns'),
        value: selectedField ?? '',
        onChange: changeColumn,
        native: isBaseSelectNative,
        disabled: readOnly
      }, rootProps.slotProps?.baseSelect, {
        children: sortedFilteredColumns.map(col => /*#__PURE__*/(0, _react.createElement)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
          native: isBaseSelectNative,
          key: col.field,
          value: col.field
        }), getColumnLabel(col)))
      }))]
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(FilterFormOperatorInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.slots.baseFormControl
    }, baseFormControlProps, operatorInputProps, {
      className: (0, _clsx.default)(classes.operatorInput, baseFormControlProps.className, operatorInputProps.className),
      ownerState: rootProps,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseInputLabel, (0, _extends2.default)({}, baseInputLabelProps, {
        htmlFor: operatorSelectId,
        id: operatorSelectLabelId,
        children: apiRef.current.getLocaleText('filterPanelOperator')
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelect, (0, _extends2.default)({
        labelId: operatorSelectLabelId,
        label: apiRef.current.getLocaleText('filterPanelOperator'),
        id: operatorSelectId,
        value: item.operator,
        onChange: changeOperator,
        native: isBaseSelectNative,
        inputRef: filterSelectorRef,
        disabled: readOnly
      }, rootProps.slotProps?.baseSelect, {
        children: currentColumn?.filterOperators?.map(operator => /*#__PURE__*/(0, _react.createElement)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
          native: isBaseSelectNative,
          key: operator.value,
          value: operator.value
        }), operator.label || apiRef.current.getLocaleText(`filterOperator${(0, _utils.unstable_capitalize)(operator.value)}`)))
      }))]
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(FilterFormValueInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.slots.baseFormControl
    }, baseFormControlProps, valueInputPropsOther, {
      className: (0, _clsx.default)(classes.valueInput, baseFormControlProps.className, valueInputPropsOther.className),
      ownerState: rootProps,
      children: currentOperator?.InputComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(currentOperator.InputComponent, (0, _extends2.default)({
        apiRef: apiRef,
        item: item,
        applyValue: applyFilterChanges,
        focusElementRef: valueRef,
        disabled: readOnly
      }, currentOperator.InputComponentProps, InputComponentProps), item.field) : null
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? GridFilterForm.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback called when the operator, column field or value is changed.
   * @param {GridFilterItem} item The updated [[GridFilterItem]].
   */
  applyFilterChanges: _propTypes.default.func.isRequired,
  /**
   * Callback called when the logic operator is changed.
   * @param {GridLogicOperator} operator The new logic operator.
   */
  applyMultiFilterOperatorChanges: _propTypes.default.func.isRequired,
  /**
   * @ignore - do not document.
   */
  children: _propTypes.default.node,
  /**
   * Props passed to the column input component.
   * @default {}
   */
  columnInputProps: _propTypes.default.any,
  /**
   * Changes how the options in the columns selector should be ordered.
   * If not specified, the order is derived from the `columns` prop.
   */
  columnsSort: _propTypes.default.oneOf(['asc', 'desc']),
  /**
   * Callback called when the delete button is clicked.
   * @param {GridFilterItem} item The deleted [[GridFilterItem]].
   */
  deleteFilter: _propTypes.default.func.isRequired,
  /**
   * Props passed to the delete icon.
   * @default {}
   */
  deleteIconProps: _propTypes.default.any,
  /**
   * If `true`, disables the logic operator field but still renders it.
   */
  disableMultiFilterOperator: _propTypes.default.bool,
  /**
   * Allows to filter the columns displayed in the filter form.
   * @param {FilterColumnsArgs} args The columns of the grid and name of field.
   * @returns {GridColDef['field'][]} The filtered fields array.
   */
  filterColumns: _propTypes.default.func,
  /**
   * A ref allowing to set imperative focus.
   * It can be passed to the el
   */
  focusElementRef: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  /**
   * If `true`, the logic operator field is rendered.
   * The field will be invisible if `showMultiFilterOperators` is also `true`.
   */
  hasMultipleFilters: _propTypes.default.bool.isRequired,
  /**
   * The [[GridFilterItem]] representing this form.
   */
  item: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operator: _propTypes.default.string.isRequired,
    value: _propTypes.default.any
  }).isRequired,
  /**
   * Props passed to the logic operator input component.
   * @default {}
   */
  logicOperatorInputProps: _propTypes.default.any,
  /**
   * Sets the available logic operators.
   * @default [GridLogicOperator.And, GridLogicOperator.Or]
   */
  logicOperators: _propTypes.default.arrayOf(_propTypes.default.oneOf(['and', 'or']).isRequired),
  /**
   * Props passed to the operator input component.
   * @default {}
   */
  operatorInputProps: _propTypes.default.any,
  /**
   * `true` if the filter is disabled/read only.
   * i.e. `colDef.fiterable = false` but passed in `filterModel`
   * @default false
   */
  readOnly: _propTypes.default.bool,
  /**
   * If `true`, the logic operator field is visible.
   */
  showMultiFilterOperators: _propTypes.default.bool,
  /**
   * Props passed to the value input component.
   * @default {}
   */
  valueInputProps: _propTypes.default.any
} : void 0;

/**
 * Demos:
 * - [Filtering - overview](https://mui.com/x/react-data-grid/filtering/)
 *
 * API:
 * - [GridFilterForm API](https://mui.com/x/api/data-grid/grid-filter-form/)
 */