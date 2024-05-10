import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "tabIndex", "disabled", "isFilterActive", "clearButton", "InputProps", "variant"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/utils';
import { useTimeout } from '../../../hooks/utils/useTimeout';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
function GridFilterInputValue(props) {
  const {
      item,
      applyValue,
      type,
      apiRef,
      focusElementRef,
      tabIndex,
      disabled,
      clearButton,
      InputProps,
      variant = 'standard'
    } = props,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  const filterTimeout = useTimeout();
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');
  const [applying, setIsApplying] = React.useState(false);
  const id = useId();
  const rootProps = useGridRootProps();
  const onFilterChange = React.useCallback(event => {
    const {
      value
    } = event.target;
    setFilterValueState(String(value));
    setIsApplying(true);
    filterTimeout.start(rootProps.filterDebounceMs, () => {
      const newItem = _extends({}, item, {
        value,
        fromInput: id
      });
      applyValue(newItem);
      setIsApplying(false);
    });
  }, [id, applyValue, item, rootProps.filterDebounceMs, filterTimeout]);
  React.useEffect(() => {
    const itemPlusTag = item;
    if (itemPlusTag.fromInput !== id || item.value === undefined) {
      setFilterValueState(String(item.value ?? ''));
    }
  }, [id, item]);
  return /*#__PURE__*/_jsx(rootProps.slots.baseTextField, _extends({
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    variant: variant,
    type: type || 'text',
    InputProps: _extends({}, applying || clearButton ? {
      endAdornment: applying ? /*#__PURE__*/_jsx(rootProps.slots.loadIcon, {
        fontSize: "small",
        color: "action"
      }) : clearButton
    } : {}, {
      disabled
    }, InputProps, {
      inputProps: _extends({
        tabIndex
      }, InputProps?.inputProps)
    }),
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, others, rootProps.slotProps?.baseTextField));
}
process.env.NODE_ENV !== "production" ? GridFilterInputValue.propTypes = {
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
export { GridFilterInputValue };