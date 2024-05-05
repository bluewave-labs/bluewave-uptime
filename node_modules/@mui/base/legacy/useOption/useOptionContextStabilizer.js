'use client';

import * as React from 'react';
import { ListContext } from '../useList';

/**
 * Stabilizes the ListContext value for the Option component, so it doesn't change when sibling Options update.
 *
 * @param value The value of the Option.
 * @returns The stable ListContext value.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOptionContextStabilizer API](https://mui.com/base-ui/react-select/hooks-api/#use-option-context-stabilizer)
 */
export function useOptionContextStabilizer(value) {
  var listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('Option: ListContext was not found.');
  }
  var getItemState = listContext.getItemState,
    dispatch = listContext.dispatch;
  var _getItemState = getItemState(value),
    highlighted = _getItemState.highlighted,
    selected = _getItemState.selected,
    focusable = _getItemState.focusable; // The local version of getItemState can be only called with the current Option's value.
  // It doesn't make much sense to render an Option depending on other Options' state anyway.
  var localGetItemState = React.useCallback(function (itemValue) {
    if (itemValue !== value) {
      throw new Error(['Base UI Option: Tried to access the state of another Option.', 'This is unsupported when the Option uses the OptionContextStabilizer as a performance optimization.'].join('/n'));
    }
    return {
      highlighted: highlighted,
      selected: selected,
      focusable: focusable
    };
  }, [highlighted, selected, focusable, value]);

  // Create a local (per Option) instance of the ListContext that changes only when
  // the getItemState's return value changes.
  // This makes Options re-render only when their state actually change, not when any Option's state changes.
  var localContextValue = React.useMemo(function () {
    return {
      dispatch: dispatch,
      getItemState: localGetItemState
    };
  }, [dispatch, localGetItemState]);
  return {
    contextValue: localContextValue
  };
}