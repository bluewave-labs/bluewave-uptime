'use client';

import * as React from 'react';
import { unstable_useId as useId } from '@mui/utils';
import { ListContext } from '../useList';

/**
 * Stabilizes the ListContext value for the MenuItem component, so it doesn't change when sibling items update.
 *
 * @param id The id of the MenuItem. If undefined, it will be generated with useId.
 * @returns The stable ListContext value and the id of the MenuItem.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItemContextStabilizer API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item-context-stabilizer)
 */
export function useMenuItemContextStabilizer(id) {
  var listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('MenuItem: ListContext was not found.');
  }
  var itemId = useId(id);
  var getItemState = listContext.getItemState,
    dispatch = listContext.dispatch;
  var itemState;
  if (itemId != null) {
    itemState = getItemState(itemId);
  } else {
    itemState = {
      focusable: true,
      highlighted: false,
      selected: false
    };
  }
  var _itemState = itemState,
    highlighted = _itemState.highlighted,
    selected = _itemState.selected,
    focusable = _itemState.focusable; // The local version of getItemState can be only called with the current Option's value.
  // It doesn't make much sense to render an Option depending on other Options' state anyway.
  var localGetItemState = React.useCallback(function (itemValue) {
    if (itemValue !== itemId) {
      throw new Error(['Base UI MenuItem: Tried to access the state of another MenuItem.', "itemValue: ".concat(itemValue, " | id: ").concat(itemId), 'This is unsupported when the MenuItem uses the MenuItemContextStabilizer as a performance optimization.'].join('/n'));
    }
    return {
      highlighted: highlighted,
      selected: selected,
      focusable: focusable
    };
  }, [highlighted, selected, focusable, itemId]);

  // Create a local (per MenuItem) instance of the ListContext that changes only when
  // the getItemState's return value changes.
  // This makes MenuItems re-render only when their state actually change, not when any MenuItem's state changes.
  var localContextValue = React.useMemo(function () {
    return {
      dispatch: dispatch,
      getItemState: localGetItemState
    };
  }, [dispatch, localGetItemState]);
  return {
    contextValue: localContextValue,
    id: itemId
  };
}