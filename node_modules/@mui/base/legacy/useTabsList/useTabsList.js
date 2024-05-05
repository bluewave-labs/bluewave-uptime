'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useTabsContext } from '../Tabs';
import { TabsListActionTypes } from './useTabsList.types';
import { useCompoundParent } from '../useCompound';
import { useList } from '../useList';
import { tabsListReducer } from './tabsListReducer';

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabsList API](https://mui.com/base-ui/react-tabs/hooks-api/#use-tabs-list)
 */
function useTabsList(parameters) {
  var _selectedValues$;
  var externalRef = parameters.rootRef;
  var _useTabsContext = useTabsContext(),
    _useTabsContext$direc = _useTabsContext.direction,
    direction = _useTabsContext$direc === void 0 ? 'ltr' : _useTabsContext$direc,
    onSelected = _useTabsContext.onSelected,
    _useTabsContext$orien = _useTabsContext.orientation,
    orientation = _useTabsContext$orien === void 0 ? 'horizontal' : _useTabsContext$orien,
    value = _useTabsContext.value,
    registerTabIdLookup = _useTabsContext.registerTabIdLookup,
    selectionFollowsFocus = _useTabsContext.selectionFollowsFocus;
  var _useCompoundParent = useCompoundParent(),
    subitems = _useCompoundParent.subitems,
    compoundComponentContextValue = _useCompoundParent.contextValue;
  var tabIdLookup = React.useCallback(function (tabValue) {
    var _subitems$get;
    return (_subitems$get = subitems.get(tabValue)) == null ? void 0 : _subitems$get.id;
  }, [subitems]);
  registerTabIdLookup(tabIdLookup);
  var subitemKeys = React.useMemo(function () {
    return Array.from(subitems.keys());
  }, [subitems]);
  var getTabElement = React.useCallback(function (tabValue) {
    var _subitems$get$ref$cur, _subitems$get2;
    if (tabValue == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get2 = subitems.get(tabValue)) == null ? void 0 : _subitems$get2.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  var isRtl = direction === 'rtl';
  var listOrientation;
  if (orientation === 'vertical') {
    listOrientation = 'vertical';
  } else {
    listOrientation = isRtl ? 'horizontal-rtl' : 'horizontal-ltr';
  }
  var handleChange = React.useCallback(function (event, newValue) {
    var _newValue$;
    onSelected(event, (_newValue$ = newValue[0]) != null ? _newValue$ : null);
  }, [onSelected]);
  var controlledProps = React.useMemo(function () {
    if (value === undefined) {
      return {};
    }
    return value != null ? {
      selectedValues: [value]
    } : {
      selectedValues: []
    };
  }, [value]);
  var isItemDisabled = React.useCallback(function (item) {
    var _subitems$get$disable, _subitems$get3;
    return (_subitems$get$disable = (_subitems$get3 = subitems.get(item)) == null ? void 0 : _subitems$get3.disabled) != null ? _subitems$get$disable : false;
  }, [subitems]);
  var _useList = useList({
      controlledProps: controlledProps,
      disabledItemsFocusable: !selectionFollowsFocus,
      focusManagement: 'DOM',
      getItemDomElement: getTabElement,
      isItemDisabled: isItemDisabled,
      items: subitemKeys,
      rootRef: externalRef,
      onChange: handleChange,
      orientation: listOrientation,
      reducerActionContext: React.useMemo(function () {
        return {
          selectionFollowsFocus: selectionFollowsFocus || false
        };
      }, [selectionFollowsFocus]),
      selectionMode: 'single',
      stateReducer: tabsListReducer
    }),
    listContextValue = _useList.contextValue,
    dispatch = _useList.dispatch,
    getListboxRootProps = _useList.getRootProps,
    _useList$state = _useList.state,
    highlightedValue = _useList$state.highlightedValue,
    selectedValues = _useList$state.selectedValues,
    mergedRootRef = _useList.rootRef;
  React.useEffect(function () {
    if (value === undefined) {
      return;
    }

    // when a value changes externally, the highlighted value should be synced to it
    if (value != null) {
      dispatch({
        type: TabsListActionTypes.valueChange,
        value: value
      });
    }
  }, [dispatch, value]);
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, externalProps, getListboxRootProps(externalProps), {
      'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
      role: 'tablist'
    });
  };
  var contextValue = React.useMemo(function () {
    return _extends({}, compoundComponentContextValue, listContextValue);
  }, [compoundComponentContextValue, listContextValue]);
  return {
    contextValue: contextValue,
    dispatch: dispatch,
    getRootProps: getRootProps,
    highlightedValue: highlightedValue,
    isRtl: isRtl,
    orientation: orientation,
    rootRef: mergedRootRef,
    selectedValue: (_selectedValues$ = selectedValues[0]) != null ? _selectedValues$ : null
  };
}
export { useTabsList };