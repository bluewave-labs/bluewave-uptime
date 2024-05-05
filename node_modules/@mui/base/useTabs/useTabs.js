'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { useCompoundParent } from '../useCompound';
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabs API](https://mui.com/base-ui/react-tabs/hooks-api/#use-tabs)
 */
function useTabs(parameters) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    direction = 'ltr',
    selectionFollowsFocus = false
  } = parameters;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value'
  });
  const onSelected = React.useCallback((event, newValue) => {
    setValue(newValue);
    onChange == null || onChange(event, newValue);
  }, [onChange, setValue]);
  const {
    subitems: tabPanels,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React.useRef(() => undefined);
  const getTabPanelId = React.useCallback(tabValue => {
    var _tabPanels$get;
    return (_tabPanels$get = tabPanels.get(tabValue)) == null ? void 0 : _tabPanels$get.id;
  }, [tabPanels]);
  const getTabId = React.useCallback(tabPanelId => {
    return tabIdLookup.current(tabPanelId);
  }, []);
  const registerTabIdLookup = React.useCallback(lookupFunction => {
    tabIdLookup.current = lookupFunction;
  }, []);
  return {
    contextValue: _extends({
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value
    }, compoundComponentContextValue)
  };
}
export { useTabs };