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
  var valueProp = props.value,
    children = props.children;
  var direction = valueProp.direction,
    getItemIndex = valueProp.getItemIndex,
    onSelected = valueProp.onSelected,
    orientation = valueProp.orientation,
    registerItem = valueProp.registerItem,
    registerTabIdLookup = valueProp.registerTabIdLookup,
    selectionFollowsFocus = valueProp.selectionFollowsFocus,
    totalSubitemCount = valueProp.totalSubitemCount,
    value = valueProp.value,
    getTabId = valueProp.getTabId,
    getTabPanelId = valueProp.getTabPanelId;
  var compoundComponentContextValue = React.useMemo(function () {
    return {
      getItemIndex: getItemIndex,
      registerItem: registerItem,
      totalSubitemCount: totalSubitemCount
    };
  }, [registerItem, getItemIndex, totalSubitemCount]);
  var tabsContextValue = React.useMemo(function () {
    return {
      direction: direction,
      getTabId: getTabId,
      getTabPanelId: getTabPanelId,
      onSelected: onSelected,
      orientation: orientation,
      registerTabIdLookup: registerTabIdLookup,
      selectionFollowsFocus: selectionFollowsFocus,
      value: value
    };
  }, [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]);
  return /*#__PURE__*/_jsx(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: /*#__PURE__*/_jsx(TabsContext.Provider, {
      value: tabsContextValue,
      children: children
    })
  });
}