'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getOptionUtilityClass } from './optionClasses';
import { useSlotProps } from '../utils';
import { useOption, useOptionContextStabilizer } from '../useOption';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { ListContext } from '../useList';
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    highlighted = ownerState.highlighted,
    selected = ownerState.selected;
  var slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected']
  };
  return composeClasses(slots, useClassNamesOverride(getOptionUtilityClass));
}
var InnerOption = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function Option(props, forwardedRef) {
  var _slots$root, _optionRef$current;
  var children = props.children,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    label = props.label,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    value = props.value,
    other = _objectWithoutProperties(props, ["children", "disabled", "label", "slotProps", "slots", "value"]);
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'li';
  var optionRef = React.useRef(null);
  var combinedRef = useForkRef(optionRef, forwardedRef);

  // If `label` is not explicitly provided, the `children` are used for convenience.
  // This is used to populate the select's trigger with the selected option's label.
  var computedLabel = label != null ? label : typeof children === 'string' ? children : (_optionRef$current = optionRef.current) == null || (_optionRef$current = _optionRef$current.textContent) == null ? void 0 : _optionRef$current.trim();
  var _useOption = useOption({
      disabled: disabled,
      label: computedLabel,
      rootRef: combinedRef,
      value: value
    }),
    getRootProps = _useOption.getRootProps,
    selected = _useOption.selected,
    highlighted = _useOption.highlighted,
    index = _useOption.index;
  var ownerState = _extends({}, props, {
    disabled: disabled,
    highlighted: highlighted,
    index: index,
    selected: selected
  });
  var classes = useUtilityClasses(ownerState);
  var rootProps = useSlotProps({
    getSlotProps: getRootProps,
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState: ownerState
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: children
  }));
}));

/**
 * An unstyled option to be used within a Select.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [Option API](https://mui.com/base-ui/react-select/components-api/#option)
 */
var Option = /*#__PURE__*/React.forwardRef(function Option(props, ref) {
  var value = props.value; // This wrapper component is used as a performance optimization.
  // `useOptionContextStabilizer` ensures that the context value
  // is stable across renders, so that the actual Option re-renders
  // only when it needs to.
  var _useOptionContextStab = useOptionContextStabilizer(value),
    contextValue = _useOptionContextStab.contextValue;
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(InnerOption, _extends({}, props, {
      ref: ref
    }))
  });
});
process.env.NODE_ENV !== "production" ? Option.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The value of the option.
   */
  value: PropTypes.any.isRequired
} : void 0;
export { Option };