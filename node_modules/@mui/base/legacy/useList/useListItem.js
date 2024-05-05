'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { ListActionTypes } from './listActions.types';
import { ListContext } from './ListContext';

/**
 * Contains the logic for an item of a list-like component (for example Select, Menu, etc.).
 * It handles the item's mouse events and tab index.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */
export function useListItem(parameters) {
  var _parameters$handlePoi = parameters.handlePointerOverEvents,
    handlePointerOverEvents = _parameters$handlePoi === void 0 ? false : _parameters$handlePoi,
    item = parameters.item;
  var listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('useListItem must be used within a ListProvider');
  }
  var dispatch = listContext.dispatch,
    getItemState = listContext.getItemState;
  var _getItemState = getItemState(item),
    highlighted = _getItemState.highlighted,
    selected = _getItemState.selected,
    focusable = _getItemState.focusable;
  var createHandleClick = React.useCallback(function (externalHandlers) {
    return function (event) {
      var _externalHandlers$onC;
      (_externalHandlers$onC = externalHandlers.onClick) == null || _externalHandlers$onC.call(externalHandlers, event);
      if (event.defaultPrevented) {
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        if (item === undefined) {
          throw new Error(['MUI: The `item` provided to useListItem() is undefined.', 'This should happen only during server-side rendering under React 17.'].join('\n'));
        }
      }
      dispatch({
        type: ListActionTypes.itemClick,
        item: item,
        event: event
      });
    };
  }, [dispatch, item]);
  var createHandlePointerOver = React.useCallback(function (externalHandlers) {
    return function (event) {
      var _externalHandlers$onM;
      (_externalHandlers$onM = externalHandlers.onMouseOver) == null || _externalHandlers$onM.call(externalHandlers, event);
      if (event.defaultPrevented) {
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        if (item === undefined) {
          throw new Error(['MUI: The `item` provided to useListItem() is undefined.', 'This should happen only during server-side rendering under React 17.'].join('\n'));
        }
      }
      dispatch({
        type: ListActionTypes.itemHover,
        item: item,
        event: event
      });
    };
  }, [dispatch, item]);
  var tabIndex;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, {
      onClick: createHandleClick(externalEventHandlers),
      onPointerOver: handlePointerOverEvents ? createHandlePointerOver(externalEventHandlers) : undefined,
      tabIndex: tabIndex
    });
  };
  return {
    getRootProps: getRootProps,
    highlighted: highlighted,
    selected: selected
  };
}