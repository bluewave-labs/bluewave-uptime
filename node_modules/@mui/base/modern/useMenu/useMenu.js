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
const FALLBACK_MENU_CONTEXT = {
  dispatch: () => {},
  popupId: '',
  registerPopup: () => {},
  registerTrigger: () => {},
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
export function useMenu(parameters = {}) {
  const {
    listboxRef: listboxRefProp,
    onItemsChange,
    id: idParam,
    disabledItemsFocusable = true,
    disableListWrap = false,
    autoFocus = true,
    componentName = 'useMenu'
  } = parameters;
  const rootRef = React.useRef(null);
  const handleRef = useForkRef(rootRef, listboxRefProp);
  const listboxId = useId(idParam) ?? '';
  const {
    state: {
      open,
      changeReason
    },
    dispatch: menuDispatch,
    triggerElement,
    registerPopup
  } = React.useContext(DropdownContext) ?? FALLBACK_MENU_CONTEXT;

  // store the initial open state to prevent focus stealing
  // (the first menu items gets focued only when the menu is opened by the user)
  const isInitiallyOpen = React.useRef(open);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const subitemKeys = React.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getItemDomElement = React.useCallback(itemId => {
    if (itemId == null) {
      return null;
    }
    return subitems.get(itemId)?.ref.current ?? null;
  }, [subitems]);
  const isItemDisabled = React.useCallback(id => subitems?.get(id)?.disabled || false, [subitems]);
  const getItemAsString = React.useCallback(id => subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText, [subitems]);
  const reducerActionContext = React.useMemo(() => ({
    listboxRef: rootRef
  }), [rootRef]);
  const {
    dispatch: listDispatch,
    getRootProps: getListRootProps,
    contextValue: listContextValue,
    state: {
      highlightedValue
    },
    rootRef: mergedListRef
  } = useList({
    disabledItemsFocusable,
    disableListWrap,
    focusManagement: 'DOM',
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null
    }),
    isItemDisabled,
    items: subitemKeys,
    getItemAsString,
    rootRef: handleRef,
    onItemsChange,
    reducerActionContext,
    selectionMode: 'none',
    stateReducer: menuReducer,
    componentName
  });
  useEnhancedEffect(() => {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);
  useEnhancedEffect(() => {
    if (open && changeReason?.type === 'keydown' && changeReason.key === 'ArrowUp') {
      listDispatch({
        type: ListActionTypes.highlightLast,
        event: changeReason
      });
    }
  }, [open, changeReason, listDispatch]);
  React.useEffect(() => {
    if (open && autoFocus && highlightedValue && !isInitiallyOpen.current) {
      subitems.get(highlightedValue)?.ref?.current?.focus();
    }
  }, [open, autoFocus, highlightedValue, subitems, subitemKeys]);
  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (rootRef.current?.contains(document.activeElement) && highlightedValue !== null) {
      subitems?.get(highlightedValue)?.ref.current?.focus();
    }
  }, [highlightedValue, subitems]);
  const createHandleBlur = otherHandlers => event => {
    otherHandlers.onBlur?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (rootRef.current?.contains(event.relatedTarget) || event.relatedTarget === triggerElement) {
      return;
    }
    menuDispatch({
      type: DropdownActionTypes.blur,
      event
    });
  };
  const createHandleKeyDown = otherHandlers => event => {
    otherHandlers.onKeyDown?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === 'Escape') {
      menuDispatch({
        type: DropdownActionTypes.escapeKeyDown,
        event
      });
    }
  };
  const getOwnListboxHandlers = (otherHandlers = {}) => ({
    onBlur: createHandleBlur(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getListboxProps = (externalProps = {}) => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      id: listboxId,
      role: 'menu'
    });
  };
  React.useDebugValue({
    subitems,
    highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch: listDispatch,
    getListboxProps,
    highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open,
    triggerElement
  };
}