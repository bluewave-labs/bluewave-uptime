"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputBoolean = GridFilterInputBoolean;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _styles = require("@mui/material/styles");
var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["item", "applyValue", "apiRef", "focusElementRef", "isFilterActive", "clearButton", "tabIndex", "label", "variant", "InputLabelProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BooleanOperatorContainer = (0, _styles.styled)('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  [`& button`]: {
    margin: 'auto 0px 5px 5px'
  }
});
function GridFilterInputBoolean(props) {
  const {
      item,
      applyValue,
      apiRef,
      focusElementRef,
      clearButton,
      tabIndex,
      label: labelProp,
      variant = 'standard'
    } = props,
    others = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [filterValueState, setFilterValueState] = React.useState(item.value || '');
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const labelId = (0, _utils.unstable_useId)();
  const selectId = (0, _utils.unstable_useId)();
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? false;
  const baseSelectOptionProps = rootProps.slotProps?.baseSelectOption || {};
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    setFilterValueState(value);
    applyValue((0, _extends2.default)({}, item, {
      value
    }));
  }, [applyValue, item]);
  React.useEffect(() => {
    setFilterValueState(item.value || '');
  }, [item.value]);
  const label = labelProp ?? apiRef.current.getLocaleText('filterPanelInputLabel');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(BooleanOperatorContainer, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(rootProps.slots.baseFormControl, {
      fullWidth: true,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseInputLabel, (0, _extends2.default)({}, rootProps.slotProps?.baseInputLabel, {
        id: labelId,
        shrink: true,
        variant: variant,
        children: label
      })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(rootProps.slots.baseSelect, (0, _extends2.default)({
        labelId: labelId,
        id: selectId,
        label: label,
        value: filterValueState,
        onChange: onFilterChange,
        variant: variant,
        notched: variant === 'outlined' ? true : undefined,
        native: isSelectNative,
        displayEmpty: true,
        inputProps: {
          ref: focusElementRef,
          tabIndex
        }
      }, others /* FIXME: typing error */, baseSelectProps, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "",
          children: apiRef.current.getLocaleText('filterValueAny')
        })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "true",
          children: apiRef.current.getLocaleText('filterValueTrue')
        })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "false",
          children: apiRef.current.getLocaleText('filterValueFalse')
        }))]
      }))]
    }), clearButton]
  });
}
process.env.NODE_ENV !== "production" ? GridFilterInputBoolean.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.shape({
    current: _propTypes.default.object.isRequired
  }).isRequired,
  applyValue: _propTypes.default.func.isRequired,
  clearButton: _propTypes.default.node,
  focusElementRef: _utils.refType,
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