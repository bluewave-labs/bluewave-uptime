'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '../useButton';
import { useListItem } from '../useList';
import { DropdownActionTypes } from '../useDropdown';
import { DropdownContext } from '../useDropdown/DropdownContext';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { useCompoundItem } from '../useCompound';
import { extractEventHandlers } from '../utils/extractEventHandlers';
function idGenerator(existingKeys) {
  return "menu-item-".concat(existingKeys.size);
}
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
 * - [useMenuItem API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item)
 */
export function useMenuItem(params) {
  var _React$useContext;
  var _params$disabled = params.disabled,
    disabled = _params$disabled === void 0 ? false : _params$disabled,
    idParam = params.id,
    externalRef = params.rootRef,
    label = params.label,
    _params$disableFocusO = params.disableFocusOnHover,
    disableFocusOnHover = _params$disableFocusO === void 0 ? false : _params$disableFocusO;
  var id = useId(idParam);
  var itemRef = React.useRef(null);
  var itemMetadata = React.useMemo(function () {
    return {
      disabled: disabled,
      id: id != null ? id : '',
      label: label,
      ref: itemRef
    };
  }, [disabled, id, label]);
  var _ref = (_React$useContext = React.useContext(DropdownContext)) != null ? _React$useContext : FALLBACK_MENU_CONTEXT,
    dispatch = _ref.dispatch;
  var _useListItem = useListItem({
      item: id,
      handlePointerOverEvents: !disableFocusOnHover
    }),
    getListRootProps = _useListItem.getRootProps,
    highlighted = _useListItem.highlighted;
  var _useCompoundItem = useCompoundItem(id != null ? id : idGenerator, itemMetadata),
    index = _useCompoundItem.index,
    totalItemCount = _useCompoundItem.totalItemCount;
  var _useButton = useButton({
      disabled: disabled,
      focusableWhenDisabled: true
    }),
    getButtonProps = _useButton.getRootProps,
    focusVisible = _useButton.focusVisible,
    buttonRefHandler = _useButton.rootRef;
  var handleRef = useForkRef(buttonRefHandler, externalRef, itemRef);
  React.useDebugValue({
    id: id,
    highlighted: highlighted,
    disabled: disabled,
    label: label
  });
  var createHandleClick = function createHandleClick(otherHandlers) {
    return function (event) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      dispatch({
        type: DropdownActionTypes.close,
        event: event
      });
    };
  };
  var getOwnHandlers = function getOwnHandlers() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, otherHandlers, {
      onClick: createHandleClick(otherHandlers)
    });
  };
  function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = extractEventHandlers(externalProps);
    var getCombinedRootProps = combineHooksSlotProps(getOwnHandlers, combineHooksSlotProps(getButtonProps, getListRootProps));
    return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
      id: id,
      ref: handleRef,
      role: 'menuitem'
    });
  }

  // If `id` is undefined (during SSR in React < 18), we fall back to rendering a simplified menu item
  // which does not have access to infortmation about its position or highlighted state.
  if (id === undefined) {
    return {
      getRootProps: getRootProps,
      disabled: false,
      focusVisible: focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  return {
    getRootProps: getRootProps,
    disabled: disabled,
    focusVisible: focusVisible,
    highlighted: highlighted,
    index: index,
    totalItemCount: totalItemCount,
    rootRef: handleRef
  };
}