import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "placeholder", "tabIndex", "label", "variant", "isFilterActive", "clearButton", "InputLabelProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { getValueFromValueOptions, getValueOptions, isSingleSelectColDef } from './filterPanelUtils';
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const renderSingleSelectOptions = ({
  column,
  OptionComponent,
  getOptionLabel,
  getOptionValue,
  isSelectNative,
  baseSelectOptionProps
}) => {
  const iterableColumnValues = ['', ...(getValueOptions(column) || [])];
  return iterableColumnValues.map(option => {
    const value = getOptionValue(option);
    let label = getOptionLabel(option);
    if (label === '') {
      label = ' '; // To force the height of the empty option
    }
    return /*#__PURE__*/_createElement(OptionComponent, _extends({}, baseSelectOptionProps, {
      native: isSelectNative,
      key: value,
      value: value
    }), label);
  });
};
const SingleSelectOperatorContainer = styled('div')({
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
    others = _objectWithoutPropertiesLoose(props, _excluded);
  const filterValue = item.value ?? '';
  const id = useId();
  const labelId = useId();
  const rootProps = useGridRootProps();
  const isSelectNative = rootProps.slotProps?.baseSelect?.native ?? false;
  let resolvedColumn = null;
  if (item.field) {
    const column = apiRef.current.getColumn(item.field);
    if (isSingleSelectColDef(column)) {
      resolvedColumn = column;
    }
  }
  const getOptionValue = resolvedColumn?.getOptionValue;
  const getOptionLabel = resolvedColumn?.getOptionLabel;
  const currentValueOptions = React.useMemo(() => {
    return getValueOptions(resolvedColumn);
  }, [resolvedColumn]);
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value;

    // NativeSelect casts the value to a string.
    value = getValueFromValueOptions(value, currentValueOptions, getOptionValue);
    applyValue(_extends({}, item, {
      value
    }));
  }, [currentValueOptions, getOptionValue, applyValue, item]);
  if (!isSingleSelectColDef(resolvedColumn)) {
    return null;
  }
  const label = labelProp ?? apiRef.current.getLocaleText('filterPanelInputLabel');
  return /*#__PURE__*/_jsxs(SingleSelectOperatorContainer, {
    children: [/*#__PURE__*/_jsxs(rootProps.slots.baseFormControl, {
      fullWidth: true,
      children: [/*#__PURE__*/_jsx(rootProps.slots.baseInputLabel, _extends({}, rootProps.slotProps?.baseInputLabel, {
        id: labelId,
        htmlFor: id,
        shrink: true,
        variant: variant,
        children: label
      })), /*#__PURE__*/_jsx(rootProps.slots.baseSelect, _extends({
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
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  clearButton: PropTypes.node,
  focusElementRef: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.func, PropTypes.object]),
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
export { GridFilterInputSingleSelect };