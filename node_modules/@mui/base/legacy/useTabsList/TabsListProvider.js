'use client';

import * as React from 'react';
import { ListContext } from '../useList/ListContext';
import { CompoundComponentContext } from '../useCompound';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Sets up the contexts for the underlying Tab components.
 *
 * @ignore - do not document.
 */
export function TabsListProvider(props) {
  var value = props.value,
    children = props.children;
  var dispatch = value.dispatch,
    getItemIndex = value.getItemIndex,
    getItemState = value.getItemState,
    registerItem = value.registerItem,
    totalSubitemCount = value.totalSubitemCount;
  var listContextValue = React.useMemo(function () {
    return {
      dispatch: dispatch,
      getItemState: getItemState,
      getItemIndex: getItemIndex
    };
  }, [dispatch, getItemIndex, getItemState]);
  var compoundComponentContextValue = React.useMemo(function () {
    return {
      getItemIndex: getItemIndex,
      registerItem: registerItem,
      totalSubitemCount: totalSubitemCount
    };
  }, [registerItem, getItemIndex, totalSubitemCount]);
  return /*#__PURE__*/_jsx(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: /*#__PURE__*/_jsx(ListContext.Provider, {
      value: listContextValue,
      children: children
    })
  });
}