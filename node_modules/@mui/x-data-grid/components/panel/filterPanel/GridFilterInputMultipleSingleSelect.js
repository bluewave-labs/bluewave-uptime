import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "color", "error", "helperText", "size", "variant"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { unstable_useId as useId } from '@mui/utils';
import { getValueOptions, isSingleSelectColDef } from './filterPanelUtils';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
const filter = createFilterOptions();
function GridFilterInputMultipleSingleSelect(props) {
  const {
      item,
      applyValue,
      apiRef,
      focusElementRef,
      color,
      error,
      helperText,
      size,
      variant = 'standard'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const TextFieldProps = {
    color,
    error,
    helperText,
    size,
    variant
  };
  const id = useId();
  const rootProps = useGridRootProps();
  let resolvedColumn = null;
  if (item.field) {
    const column = apiRef.current.getColumn(item.field);
    if (isSingleSelectColDef(column)) {
      resolvedColumn = column;
    }
  }
  const getOptionValue = resolvedColumn?.getOptionValue;
  const getOptionLabel = resolvedColumn?.getOptionLabel;
  const isOptionEqualToValue = React.useCallback((option, value) => getOptionValue(option) === getOptionValue(value), [getOptionValue]);
  const resolvedValueOptions = React.useMemo(() => {
    return getValueOptions(resolvedColumn) || [];
  }, [resolvedColumn]);

  // The value is computed from the item.value and used directly
  // If it was done by a useEffect/useState, the Autocomplete could receive incoherent value and options
  const filteredValues = React.useMemo(() => {
    if (!Array.isArray(item.value)) {
      return [];
    }
    return item.value.reduce((acc, value) => {
      const resolvedValue = resolvedValueOptions.find(v => getOptionValue(v) === value);
      if (resolvedValue != null) {
        acc.push(resolvedValue);
      }
      return acc;
    }, []);
  }, [getOptionValue, item.value, resolvedValueOptions]);
  const handleChange = React.useCallback((event, value) => {
    applyValue(_extends({}, item, {
      value: value.map(getOptionValue)
    }));
  }, [applyValue, item, getOptionValue]);
  return /*#__PURE__*/_jsx(Autocomplete, _extends({
    multiple: true,
    options: resolvedValueOptions,
    isOptionEqualToValue: isOptionEqualToValue,
    filterOptions: filter,
    id: id,
    value: filteredValues,
    onChange: handleChange,
    getOptionLabel: getOptionLabel,
    renderTags: (value, getTagProps) => value.map((option, index) => /*#__PURE__*/_jsx(rootProps.slots.baseChip, _extends({
      variant: "outlined",
      size: "small",
      label: getOptionLabel(option)
    }, getTagProps({
      index
    })))),
    renderInput: params => /*#__PURE__*/_jsx(rootProps.slots.baseTextField, _extends({}, params, {
      label: apiRef.current.getLocaleText('filterPanelInputLabel'),
      placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
      InputLabelProps: _extends({}, params.InputLabelProps, {
        shrink: true
      }),
      inputRef: focusElementRef,
      type: "singleSelect"
    }, TextFieldProps, rootProps.slotProps?.baseTextField))
  }, other));
}
process.env.NODE_ENV !== "production" ? GridFilterInputMultipleSingleSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  focusElementRef: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.func, PropTypes.object]),
  item: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operator: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired,
  type: PropTypes.oneOf(['singleSelect'])
} : void 0;
export { GridFilterInputMultipleSingleSelect };