import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "InputProps", "isFilterActive", "clearButton", "tabIndex", "disabled"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/utils';
import { useTimeout } from '../../../hooks/utils/useTimeout';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
function convertFilterItemValueToInputValue(itemValue, inputType) {
  if (itemValue == null) {
    return '';
  }
  const dateCopy = new Date(itemValue);
  if (Number.isNaN(dateCopy.getTime())) {
    return '';
  }
  if (inputType === 'date') {
    return dateCopy.toISOString().substring(0, 10);
  }
  if (inputType === 'datetime-local') {
    // The date picker expects the date to be in the local timezone.
    // But .toISOString() converts it to UTC with zero offset.
    // So we need to subtract the timezone offset.
    dateCopy.setMinutes(dateCopy.getMinutes() - dateCopy.getTimezoneOffset());
    return dateCopy.toISOString().substring(0, 19);
  }
  return dateCopy.toISOString().substring(0, 10);
}
function GridFilterInputDate(props) {
  const {
      item,
      applyValue,
      type,
      apiRef,
      focusElementRef,
      InputProps,
      clearButton,
      tabIndex,
      disabled
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const filterTimeout = useTimeout();
  const [filterValueState, setFilterValueState] = React.useState(() => convertFilterItemValueToInputValue(item.value, type));
  const [applying, setIsApplying] = React.useState(false);
  const id = useId();
  const rootProps = useGridRootProps();
  const onFilterChange = React.useCallback(event => {
    filterTimeout.clear();
    const value = event.target.value;
    setFilterValueState(value);
    setIsApplying(true);
    filterTimeout.start(rootProps.filterDebounceMs, () => {
      const date = new Date(value);
      applyValue(_extends({}, item, {
        value: Number.isNaN(date.getTime()) ? undefined : date
      }));
      setIsApplying(false);
    });
  }, [applyValue, item, rootProps.filterDebounceMs, filterTimeout]);
  React.useEffect(() => {
    const value = convertFilterItemValueToInputValue(item.value, type);
    setFilterValueState(value);
  }, [item.value, type]);
  return /*#__PURE__*/_jsx(rootProps.slots.baseTextField, _extends({
    fullWidth: true,
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    variant: "standard",
    type: type || 'text',
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef,
    InputProps: _extends({}, applying || clearButton ? {
      endAdornment: applying ? /*#__PURE__*/_jsx(rootProps.slots.loadIcon, {
        fontSize: "small",
        color: "action"
      }) : clearButton
    } : {}, {
      disabled
    }, InputProps, {
      inputProps: _extends({
        max: type === 'datetime-local' ? '9999-12-31T23:59' : '9999-12-31',
        tabIndex
      }, InputProps?.inputProps)
    })
  }, other, rootProps.slotProps?.baseTextField));
}
process.env.NODE_ENV !== "production" ? GridFilterInputDate.propTypes = {
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
export { GridFilterInputDate };