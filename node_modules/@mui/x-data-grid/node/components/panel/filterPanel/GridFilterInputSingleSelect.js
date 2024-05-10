"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputSingleSelect = GridFilterInputSingleSelect;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _styles = require("@mui/material/styles");
var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");
var _filterPanelUtils = require("./filterPanelUtils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "placeholder", "tabIndex", "label", "variant", "isFilterActive", "clearButton", "InputLabelProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const renderSingleSelectOptions = ({
  column,
  OptionComponent,
  getOptionLabel,
  getOptionValue,
  isSelectNative,
  baseSelectOptionProps
}) => {
  const iterableColumnValues = ['', ...((0, _filterPanelUtils.getValueOptions)(column) || [])];
  return iterableColumnValues.map(option => {
    const value = getOptionValue(option);
    let label = getOptionLabel(option);
    if (label === '') {
      label = ' '; // To force the height of the empty option
    }
    return /*#__PURE__*/(0, _react.createElement)(OptionComponent, (0, _extends2.default)({}, baseSelectOptionProps, {
      native: isSelectNative,
      key: value,
      value: value
    }), label);
  });
};
const SingleSelectOperatorContainer = (0, _styles.styled)('div')({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  [`& button`]: {
    margin: 'auto 0px 5px 5px'
  }
});
function GridFilterInputSingleSelect(props) {
  const {
      item,
      applyValue,
      type,
      apiRef,
      focusElementRef,
      placeholder,
      tabIndex,
      label: labelProp,
      variant = 'standard',
      clearButton
    } = props,
    others = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const filterValue = item.value ?? '';
  const id = (0, _utils.unstable_useId)();
  const labelId = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const isSelectNative = rootProps.slotProps?.baseSelect?.native ?? false;
  let resolvedColumn = null;
  if (item.field) {
    const column = apiRef.current.getColumn(item.field);
    if ((0, _filterPanelUtils.isSingleSelectColDef)(column)) {
      resolvedColumn = column;
    }
  }
  const getOptionValue = resolvedColumn?.getOptionValue;
  const getOptionLabel = resolvedColumn?.getOptionLabel;
  const currentValueOptions = React.useMemo(() => {
    return (0, _filterPanelUtils.getValueOptions)(resolvedColumn);
  }, [resolvedColumn]);
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value;

    // NativeSelect casts the value to a string.
    value = (0, _filterPanelUtils.getValueFromValueOptions)(value, currentValueOptions, getOptionValue);
    applyValue((0, _extends2.default)({}, item, {
      value
    }));
  }, [currentValueOptions, getOptionValue, applyValue, item]);
  if (!(0, _filterPanelUtils.isSingleSelectColDef)(resolvedColumn)) {
    return null;
  }
  const label = labelProp ?? apiRef.current.getLocaleText('filterPanelInputLabel');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SingleSelectOperatorContainer, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(rootProps.slots.baseFormControl, {
      fullWidth: true,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseInputLabel, (0, _extends2.default)({}, rootProps.slotProps?.baseInputLabel, {
        id: labelId,
        htmlFor: id,
        shrink: true,
        variant: variant,
        children: label
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelect, (0, _extends2.default)({
        id: id,
        label: label,
        labelId: labelId,
        value: filterValue,
        onChange: onFilterChange,
        variant: variant,
        type: type || 'text',
        inputProps: {
          tabIndex,
          ref: focusElementRef,
          placeholder: placeholder ?? apiRef.current.getLocaleText('filterPanelInputPlaceholder')
        },
        native: isSelectNative,
        notched: variant === 'outlined' ? true : undefined
      }, others /* FIXME: typing error */, rootProps.slotProps?.baseSelect, {
        children: renderSingleSelectOptions({
          column: resolvedColumn,
          OptionComponent: rootProps.slots.baseSelectOption,
          getOptionLabel,
          getOptionValue,
          isSelectNative,
          baseSelectOptionProps: rootProps.slotProps?.baseSelectOption
        })
      }))]
    }), clearButton]
  });
}
process.env.NODE_ENV !== "production" ? GridFilterInputSingleSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.shape({
    current: _propTypes.default.object.isRequired
  }).isRequired,
  applyValue: _propTypes.default.func.isRequired,
  clearButton: _propTypes.default.node,
  focusElementRef: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  /**
   * It is `true` if the filter either has a value or an operator with no value
   * required is selected (for example `isEmpty`)
   */
  isFilterActive: _propTypes.default.bool,
  item: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operator: _propTypes.default.string.isRequired,
    value: _propTypes.default.any
  }).isRequired
} : void 0;