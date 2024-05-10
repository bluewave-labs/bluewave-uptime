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
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex
  }), [dispatch, getItemIndex, getItemState]);
  const compoundComponentContextValue = React.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return /*#__PURE__*/_jsx(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: /*#__PURE__*/_jsx(ListContext.Provider, {
      value: listContextValue,
      children: children
    })
  });
}