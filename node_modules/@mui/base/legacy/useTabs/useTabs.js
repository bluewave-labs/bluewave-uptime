'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
  var valueProp = parameters.value,
    defaultValue = parameters.defaultValue,
    onChange = parameters.onChange,
    _parameters$orientati = parameters.orientation,
    orientation = _parameters$orientati === void 0 ? 'horizontal' : _parameters$orientati,
    _parameters$direction = parameters.direction,
    direction = _parameters$direction === void 0 ? 'ltr' : _parameters$direction,
    _parameters$selection = parameters.selectionFollowsFocus,
    selectionFollowsFocus = _parameters$selection === void 0 ? false : _parameters$selection;
  var _useControlled = useControlled({
      controlled: valueProp,
      default: defaultValue,
      name: 'Tabs',
      state: 'value'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    value = _useControlled2[0],
    setValue = _useControlled2[1];
  var onSelected = React.useCallback(function (event, newValue) {
    setValue(newValue);
    onChange == null || onChange(event, newValue);
  }, [onChange, setValue]);
  var _useCompoundParent = useCompoundParent(),
    tabPanels = _useCompoundParent.subitems,
    compoundComponentContextValue = _useCompoundParent.contextValue;
  var tabIdLookup = React.useRef(function () {
    return undefined;
  });
  var getTabPanelId = React.useCallback(function (tabValue) {
    var _tabPanels$get;
    return (_tabPanels$get = tabPanels.get(tabValue)) == null ? void 0 : _tabPanels$get.id;
  }, [tabPanels]);
  var getTabId = React.useCallback(function (tabPanelId) {
    return tabIdLookup.current(tabPanelId);
  }, []);
  var registerTabIdLookup = React.useCallback(function (lookupFunction) {
    tabIdLookup.current = lookupFunction;
  }, []);
  return {
    contextValue: _extends({
      direction: direction,
      getTabId: getTabId,
      getTabPanelId: getTabPanelId,
      onSelected: onSelected,
      orientation: orientation,
      registerTabIdLookup: registerTabIdLookup,
      selectionFollowsFocus: selectionFollowsFocus,
      value: value
    }, compoundComponentContextValue)
  };
}
export { useTabs };