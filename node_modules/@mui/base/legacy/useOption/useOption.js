'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useListItem } from '../useList';
import { useCompoundItem } from '../useCompound';
import { useButton } from '../useButton';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOption API](https://mui.com/base-ui/react-select/hooks-api/#use-option)
 */
export function useOption(params) {
  var value = params.value,
    label = params.label,
    disabled = params.disabled,
    optionRefParam = params.rootRef,
    idParam = params.id;
  var _useListItem = useListItem({
      item: value
    }),
    getListItemProps = _useListItem.getRootProps,
    highlighted = _useListItem.highlighted,
    selected = _useListItem.selected;
  var _useButton = useButton({
      disabled: disabled,
      focusableWhenDisabled: true
    }),
    getButtonProps = _useButton.getRootProps,
    buttonRefHandler = _useButton.rootRef;
  var id = useId(idParam);
  var optionRef = React.useRef(null);
  var selectOption = React.useMemo(function () {
    return {
      disabled: disabled,
      label: label,
      value: value,
      ref: optionRef,
      id: id
    };
  }, [disabled, label, value, id]);
  var _useCompoundItem = useCompoundItem(value, selectOption),
    index = _useCompoundItem.index;
  var handleRef = useForkRef(optionRefParam, optionRef, buttonRefHandler);
  var createHandleKeyDown = function createHandleKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      if ([' ', 'Enter'].includes(event.key)) {
        event.defaultMuiPrevented = true; // prevent listbox onKeyDown
      }
    };
  };
  var getOwnHandlers = function getOwnHandlers() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      onKeyDown: createHandleKeyDown(otherHandlers)
    };
  };
  return {
    getRootProps: function getRootProps() {
      var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var externalEventHandlers = extractEventHandlers(externalProps);
      var getCombinedRootProps = combineHooksSlotProps(getListItemProps, combineHooksSlotProps(getButtonProps, getOwnHandlers));
      return _extends({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
        id: id,
        ref: handleRef,
        role: 'option',
        'aria-selected': selected
      });
    },
    highlighted: highlighted,
    index: index,
    selected: selected,
    rootRef: handleRef
  };
}