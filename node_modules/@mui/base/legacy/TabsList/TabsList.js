'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useSlotProps } from '../utils';
import { getTabsListUtilityClass } from './tabsListClasses';
import { useTabsList } from '../useTabsList';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { TabsListProvider } from '../useTabsList/TabsListProvider';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var orientation = ownerState.orientation;
  var slots = {
    root: ['root', orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsListUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [TabsList API](https://mui.com/base-ui/react-tabs/components-api/#tabs-list)
 */
var TabsList = /*#__PURE__*/React.forwardRef(function TabsList(props, forwardedRef) {
  var _slots$root;
  var children = props.children,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["children", "slotProps", "slots"]);
  var _useTabsList = useTabsList({
      rootRef: forwardedRef
    }),
    isRtl = _useTabsList.isRtl,
    orientation = _useTabsList.orientation,
    getRootProps = _useTabsList.getRootProps,
    contextValue = _useTabsList.contextValue;
  var ownerState = _extends({}, props, {
    isRtl: isRtl,
    orientation: orientation
  });
  var classes = useUtilityClasses(ownerState);
  var TabsListRoot = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var tabsListRootProps = useSlotProps({
    elementType: TabsListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState: ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(TabsListProvider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(TabsListRoot, _extends({}, tabsListRootProps, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? TabsList.propTypes /* remove-proptypes */ = {
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
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  })
} : void 0;
export { TabsList };