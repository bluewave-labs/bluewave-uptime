'use client';

import * as React from 'react';
import { useControllableReducer } from '../utils/useControllableReducer';
import { DropdownActionTypes } from './useDropdown.types';
import { dropdownReducer } from './dropdownReducer';

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useDropdown API](https://mui.com/base-ui/react-menu/hooks-api/#use-dropdown)
 */
export function useDropdown(parameters = {}) {
  const {
    defaultOpen,
    onOpenChange,
    open: openProp,
    componentName = 'useDropdown'
  } = parameters;
  const [popupId, setPopupId] = React.useState('');
  const [triggerElement, setTriggerElement] = React.useState(null);
  const lastActionType = React.useRef(null);
  const handleStateChange = React.useCallback((event, field, value, reason) => {
    if (field === 'open') {
      onOpenChange?.(event, value);
    }
    lastActionType.current = reason;
  }, [onOpenChange]);
  const controlledProps = React.useMemo(() => openProp !== undefined ? {
    open: openProp
  } : {}, [openProp]);
  const [state, dispatch] = useControllableReducer({
    controlledProps,
    initialState: defaultOpen ? {
      open: true,
      changeReason: null
    } : {
      open: false,
      changeReason: null
    },
    onStateChange: handleStateChange,
    reducer: dropdownReducer,
    componentName
  });
  React.useEffect(() => {
    if (!state.open && lastActionType.current !== null && lastActionType.current !== DropdownActionTypes.blur) {
      triggerElement?.focus();
    }
  }, [state.open, triggerElement]);
  const contextValue = {
    state,
    dispatch,
    popupId,
    registerPopup: setPopupId,
    registerTrigger: setTriggerElement,
    triggerElement
  };
  return {
    contextValue,
    open: state.open
  };
}