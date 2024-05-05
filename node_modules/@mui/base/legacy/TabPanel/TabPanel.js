'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSlotProps } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getTabPanelUtilityClass } from './tabPanelClasses';
import { useTabPanel } from '../useTabPanel/useTabPanel';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var hidden = ownerState.hidden;
  var slots = {
    root: ['root', hidden && 'hidden']
  };
  return composeClasses(slots, useClassNamesOverride(getTabPanelUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [TabPanel API](https://mui.com/base-ui/react-tabs/components-api/#tab-panel)
 */
var TabPanel = /*#__PURE__*/React.forwardRef(function TabPanel(props, forwardedRef) {
  var _slots$root;
  var children = props.children,
    value = props.value,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["children", "value", "slotProps", "slots"]);
  var _useTabPanel = useTabPanel(props),
    hidden = _useTabPanel.hidden,
    getRootProps = _useTabPanel.getRootProps;
  var ownerState = _extends({}, props, {
    hidden: hidden
  });
  var classes = useUtilityClasses(ownerState);
  var TabPanelRoot = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var tabPanelRootProps = useSlotProps({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: 'tabpanel',
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(TabPanelRoot, _extends({}, tabPanelRootProps, {
    children: !hidden && children
  }));
});
process.env.NODE_ENV !== "production" ? TabPanel.propTypes /* remove-proptypes */ = {
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
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   * If not provided, it will fall back to the index of the panel.
   * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : void 0;
export { TabPanel };