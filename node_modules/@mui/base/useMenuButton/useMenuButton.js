'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { DropdownContext } from '../useDropdown/DropdownContext';
import { DropdownActionTypes } from '../useDropdown/useDropdown.types';
import { useButton } from '../useButton/useButton';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { extractEventHandlers } from '../utils';

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuButton API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-button)
 */
export function useMenuButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    rootRef: externalRef
  } = parameters;
  const menuContext = React.useContext(DropdownContext);
  if (menuContext === null) {
    throw new Error('useMenuButton: no menu context available.');
  }
  const {
    state,
    dispatch,
    registerTrigger,
    popupId
  } = menuContext;
  const {
    getRootProps: getButtonRootProps,
    rootRef: buttonRootRef,
    active
  } = useButton({
    disabled,
    focusableWhenDisabled,
    rootRef: externalRef
  });
  const handleRef = useForkRef(buttonRootRef, registerTrigger);
  const createHandleClick = otherHandlers => event => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: DropdownActionTypes.toggle,
      event
    });
  };
  const createHandleKeyDown = otherHandlers => event => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      dispatch({
        type: DropdownActionTypes.open,
        event
      });
    }
  };
  const getOwnRootProps = (otherHandlers = {}) => ({
    onClick: createHandleClick(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedProps = combineHooksSlotProps(getOwnRootProps, getButtonRootProps);
    return _extends({
      'aria-haspopup': 'menu',
      'aria-expanded': state.open,
      'aria-controls': popupId
    }, externalProps, externalEventHandlers, getCombinedProps(externalEventHandlers), {
      tabIndex: 0,
      // this is needed to make the button focused after click in Safari
      ref: handleRef
    });
  };
  return {
    active,
    getRootProps,
    open: state.open,
    rootRef: handleRef
  };
}