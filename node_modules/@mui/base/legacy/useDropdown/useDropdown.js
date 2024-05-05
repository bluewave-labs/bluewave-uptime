'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
export function useDropdown() {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultOpen = parameters.defaultOpen,
    onOpenChange = parameters.onOpenChange,
    openProp = parameters.open,
    _parameters$component = parameters.componentName,
    componentName = _parameters$component === void 0 ? 'useDropdown' : _parameters$component;
  var _React$useState = React.useState(''),
    popupId = _React$useState[0],
    setPopupId = _React$useState[1];
  var _React$useState2 = React.useState(null),
    triggerElement = _React$useState2[0],
    setTriggerElement = _React$useState2[1];
  var lastActionType = React.useRef(null);
  var handleStateChange = React.useCallback(function (event, field, value, reason) {
    if (field === 'open') {
      onOpenChange == null || onOpenChange(event, value);
    }
    lastActionType.current = reason;
  }, [onOpenChange]);
  var controlledProps = React.useMemo(function () {
    return openProp !== undefined ? {
      open: openProp
    } : {};
  }, [openProp]);
  var _useControllableReduc = useControllableReducer({
      controlledProps: controlledProps,
      initialState: defaultOpen ? {
        open: true,
        changeReason: null
      } : {
        open: false,
        changeReason: null
      },
      onStateChange: handleStateChange,
      reducer: dropdownReducer,
      componentName: componentName
    }),
    _useControllableReduc2 = _slicedToArray(_useControllableReduc, 2),
    state = _useControllableReduc2[0],
    dispatch = _useControllableReduc2[1];
  React.useEffect(function () {
    if (!state.open && lastActionType.current !== null && lastActionType.current !== DropdownActionTypes.blur) {
      triggerElement == null || triggerElement.focus();
    }
  }, [state.open, triggerElement]);
  var contextValue = {
    state: state,
    dispatch: dispatch,
    popupId: popupId,
    registerPopup: setPopupId,
    registerTrigger: setTriggerElement,
    triggerElement: triggerElement
  };
  return {
    contextValue: contextValue,
    open: state.open
  };
}