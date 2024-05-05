'use client';

import * as React from 'react';
import { TabsContext } from '../Tabs/TabsContext';
import { CompoundComponentContext } from '../useCompound';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Sets up the contexts for the underlying Tab and TabPanel components.
 *
 * @ignore - do not document.
 */
export function TabsProvider(props) {
  const {
    value: valueProp,
    children
  } = props;
  const {
    direction,
    getItemIndex,
    onSelected,
    orientation,
    registerItem,
    registerTabIdLookup,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
    getTabId,
    getTabPanelId
  } = valueProp;
  const compoundComponentContextValue = React.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  const tabsContextValue = React.useMemo(() => ({
    direction,
    getTabId,
    getTabPanelId,
    onSelected,
    orientation,
    registerTabIdLookup,
    selectionFollowsFocus,
    value
  }), [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]);
  return /*#__PURE__*/_jsx(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: /*#__PURE__*/_jsx(TabsContext.Provider, {
      value: tabsContextValue,
      children: children
    })
  });
}