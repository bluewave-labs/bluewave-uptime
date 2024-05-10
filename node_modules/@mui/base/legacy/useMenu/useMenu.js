'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { menuReducer } from './menuReducer';
import { DropdownContext } from '../useDropdown/DropdownContext';
import { ListActionTypes, useList } from '../useList';
import { DropdownActionTypes } from '../useDropdown';
import { useCompoundParent } from '../useCompound';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { extractEventHandlers } from '../utils/extractEventHandlers';
var FALLBACK_MENU_CONTEXT = {
  dispatch: function dispatch() {},
  popupId: '',
  registerPopup: function registerPopup() {},
  registerTrigger: function registerTrigger() {},
  state: {
    open: true,
    changeReason: null
  },
  triggerElement: null
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenu API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu)
 */
export function useMenu() {
  var _useId, _React$useContext;
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var listboxRefProp = parameters.listboxRef,
    onItemsChange = parameters.onItemsChange,
    idParam = parameters.id,
    _parameters$disabledI = parameters.disabledItemsFocusable,
    disabledItemsFocusable = _parameters$disabledI === void 0 ? true : _parameters$disabledI,
    _parameters$disableLi = parameters.disableListWrap,
    disableListWrap = _parameters$disableLi === void 0 ? false : _parameters$disableLi,
    _parameters$autoFocus = parameters.autoFocus,
    autoFocus = _parameters$autoFocus === void 0 ? true : _parameters$autoFocus,
    _parameters$component = parameters.componentName,
    componentName = _parameters$component === void 0 ? 'useMenu' : _parameters$component;
  var rootRef = React.useRef(null);
  var handleRef = useForkRef(rootRef, listboxRefProp);
  var listboxId = (_useId = useId(idParam)) != null ? _useId : '';
  var _ref = (_React$useContext = React.useContext(DropdownContext)) != null ? _React$useContext : FALLBACK_MENU_CONTEXT,
    _ref$state = _ref.state,
    open = _ref$state.open,
    changeReason = _ref$state.changeReason,
    menuDispatch = _ref.dispatch,
    triggerElement = _ref.triggerElement,
    registerPopup = _ref.registerPopup; // store the initial open state to prevent focus stealing
  // (the first menu items gets focued only when the menu is opened by the user)
  var isInitiallyOpen = React.useRef(open);
  var _useCompoundParent = useCompoundParent(),
    subitems = _useCompoundParent.subitems,
    compoundComponentContextValue = _useCompoundParent.contextValue;
  var subitemKeys = React.useMemo(function () {
    return Array.from(subitems.keys());
  }, [subitems]);
  var getItemDomElement = React.useCallback(function (itemId) {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  var isItemDisabled = React.useCallback(function (id) {
    var _subitems$get2;
    return (subitems == null || (_subitems$get2 = subitems.get(id)) == null ? void 0 : _subitems$get2.disabled) || false;
  }, [subitems]);
  var getItemAsString = React.useCallback(function (id) {
    var _subitems$get3, _subitems$get4;
    return ((_subitems$get3 = subitems.get(id)) == null ? void 0 : _subitems$get3.label) || ((_subitems$get4 = subitems.get(id)) == null || (_subitems$get4 = _subitems$get4.ref.current) == null ? void 0 : _subitems$get4.innerText);
  }, [subitems]);
  var reducerActionContext = React.useMemo(function () {
    return {
      listboxRef: rootRef
    };
  }, [rootRef]);
  var _useList = useList({
      disabledItemsFocusable: disabledItemsFocusable,
      disableListWrap: disableListWrap,
      focusManagement: 'DOM',
      getItemDomElement: getItemDomElement,
      getInitialState: function getInitialState() {
        return {
          selectedValues: [],
          highlightedValue: null
        };
      },
      isItemDisabled: isItemDisabled,
      items: subitemKeys,
      getItemAsString: getItemAsString,
      rootRef: handleRef,
      onItemsChange: onItemsChange,
      reducerActionContext: reducerActionContext,
      selectionMode: 'none',
      stateReducer: menuReducer,
      componentName: componentName
    }),
    listDispatch = _useList.dispatch,
    getListRootProps = _useList.getRootProps,
    listContextValue = _useList.contextValue,
    highlightedValue = _useList.state.highlightedValue,
    mergedListRef = _useList.rootRef;
  useEnhancedEffect(function () {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);
  useEnhancedEffect(function () {
    if (open && (changeReason == null ? void 0 : changeReason.type) === 'keydown' && changeReason.key === 'ArrowUp') {
      listDispatch({
        type: ListActionTypes.highlightLast,
        event: changeReason
      });
    }
  }, [open, changeReason, listDispatch]);
  React.useEffect(function () {
    if (open && autoFocus && highlightedValue && !isInitiallyOpen.current) {
      var _subitems$get5;
      (_subitems$get5 = subitems.get(highlightedValue)) == null || (_subitems$get5 = _subitems$get5.ref) == null || (_subitems$get5 = _subitems$get5.current) == null || _subitems$get5.focus();
    }
  }, [open, autoFocus, highlightedValue, subitems, subitemKeys]);
  React.useEffect(function () {
    var _rootRef$current;
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if ((_rootRef$current = rootRef.current) != null && _rootRef$current.contains(document.activeElement) && highlightedValue !== null) {
      var _subitems$get6;
      subitems == null || (_subitems$get6 = subitems.get(highlightedValue)) == null || (_subitems$get6 = _subitems$get6.ref.current) == null || _subitems$get6.focus();
    }
  }, [highlightedValue, subitems]);
  var createHandleBlur = function createHandleBlur(otherHandlers) {
    return function (event) {
      var _otherHandlers$onBlur, _rootRef$current2;
      (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      if ((_rootRef$current2 = rootRef.current) != null && _rootRef$current2.contains(event.relatedTarget) || event.relatedTarget === triggerElement) {
        return;
      }
      menuDispatch({
        type: DropdownActionTypes.blur,
        event: event
      });
    };
  };
  var createHandleKeyDown = function createHandleKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      if (event.key === 'Escape') {
        menuDispatch({
          type: DropdownActionTypes.escapeKeyDown,
          event: event
        });
      }
    };
  };
  var getOwnListboxHandlers = function getOwnListboxHandlers() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers)
    };
  };
  var getListboxProps = function getListboxProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    var externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      id: listboxId,
      role: 'menu'
    });
  };
  React.useDebugValue({
    subitems: subitems,
    highlightedValue: highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch: listDispatch,
    getListboxProps: getListboxProps,
    highlightedValue: highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open: open,
    triggerElement: triggerElement
  };
}