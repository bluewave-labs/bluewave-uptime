'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSlotProps } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getTabsUtilityClass } from './tabsClasses';
import { useTabs } from '../useTabs';
import { TabsProvider } from '../useTabs/TabsProvider';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var orientation = ownerState.orientation;
  var slots = {
    root: ['root', orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [Tabs API](https://mui.com/base-ui/react-tabs/components-api/#tabs)
 */
var Tabs = /*#__PURE__*/React.forwardRef(function Tabs(props, forwardedRef) {
  var _slots$root;
  var children = props.children,
    valueProp = props.value,
    defaultValue = props.defaultValue,
    _props$orientation = props.orientation,
    orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'ltr' : _props$direction,
    onChange = props.onChange,
    selectionFollowsFocus = props.selectionFollowsFocus,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["children", "value", "defaultValue", "orientation", "direction", "onChange", "selectionFollowsFocus", "slotProps", "slots"]);
  var ownerState = _extends({}, props, {
    orientation: orientation,
    direction: direction
  });
  var _useTabs = useTabs(ownerState),
    contextValue = _useTabs.contextValue;
  var classes = useUtilityClasses(ownerState);
  var TabsRoot = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var tabsRootProps = useSlotProps({
    elementType: TabsRoot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(TabsRoot, _extends({}, tabsRootProps, {
    children: /*#__PURE__*/_jsx(TabsProvider, {
      value: contextValue,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? Tabs.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  /**
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,
  /**
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Tabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `null`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : void 0;
export { Tabs };