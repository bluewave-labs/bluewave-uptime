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
export function useMenuButton() {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _parameters$disabled = parameters.disabled,
    disabled = _parameters$disabled === void 0 ? false : _parameters$disabled,
    focusableWhenDisabled = parameters.focusableWhenDisabled,
    externalRef = parameters.rootRef;
  var menuContext = React.useContext(DropdownContext);
  if (menuContext === null) {
    throw new Error('useMenuButton: no menu context available.');
  }
  var state = menuContext.state,
    dispatch = menuContext.dispatch,
    registerTrigger = menuContext.registerTrigger,
    popupId = menuContext.popupId;
  var _useButton = useButton({
      disabled: disabled,
      focusableWhenDisabled: focusableWhenDisabled,
      rootRef: externalRef
    }),
    getButtonRootProps = _useButton.getRootProps,
    buttonRootRef = _useButton.rootRef,
    active = _useButton.active;
  var handleRef = useForkRef(buttonRootRef, registerTrigger);
  var createHandleClick = function createHandleClick(otherHandlers) {
    return function (event) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      dispatch({
        type: DropdownActionTypes.toggle,
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
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        dispatch({
          type: DropdownActionTypes.open,
          event: event
        });
      }
    };
  };
  var getOwnRootProps = function getOwnRootProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      onClick: createHandleClick(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers)
    };
  };
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = extractEventHandlers(externalProps);
    var getCombinedProps = combineHooksSlotProps(getOwnRootProps, getButtonRootProps);
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
    active: active,
    getRootProps: getRootProps,
    open: state.open,
    rootRef: handleRef
  };
}