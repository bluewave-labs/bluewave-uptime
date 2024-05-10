import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "apiRef", "focusElementRef", "isFilterActive", "clearButton", "tabIndex", "label", "variant", "InputLabelProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { refType, unstable_useId as useId } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BooleanOperatorContainer = styled('div')({
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
    others = _objectWithoutPropertiesLoose(props, _excluded);
  const [filterValueState, setFilterValueState] = React.useState(item.value || '');
  const rootProps = useGridRootProps();
  const labelId = useId();
  const selectId = useId();
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? false;
  const baseSelectOptionProps = rootProps.slotProps?.baseSelectOption || {};
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    setFilterValueState(value);
    applyValue(_extends({}, item, {
      value
    }));
  }, [applyValue, item]);
  React.useEffect(() => {
    setFilterValueState(item.value || '');
  }, [item.value]);
  const label = labelProp ?? apiRef.current.getLocaleText('filterPanelInputLabel');
  return /*#__PURE__*/_jsxs(BooleanOperatorContainer, {
    children: [/*#__PURE__*/_jsxs(rootProps.slots.baseFormControl, {
      fullWidth: true,
      children: [/*#__PURE__*/_jsx(rootProps.slots.baseInputLabel, _extends({}, rootProps.slotProps?.baseInputLabel, {
        id: labelId,
        shrink: true,
        variant: variant,
        children: label
      })), /*#__PURE__*/_jsxs(rootProps.slots.baseSelect, _extends({
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
        children: [/*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "",
          children: apiRef.current.getLocaleText('filterValueAny')
        })), /*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "true",
          children: apiRef.current.getLocaleText('filterValueTrue')
        })), /*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
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
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  clearButton: PropTypes.node,
  focusElementRef: refType,
  /**
   * It is `true` if the filter either has a value or an operator with no value
   * required is selected (for example `isEmpty`)
   */
  isFilterActive: PropTypes.bool,
  item: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operator: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired
} : void 0;
export { GridFilterInputBoolean };