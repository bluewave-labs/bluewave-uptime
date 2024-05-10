'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { ListActionTypes } from './listActions.types';
import { listReducer as defaultReducer } from './listReducer';
import { useControllableReducer } from '../utils/useControllableReducer';
import { areArraysEqual } from '../utils/areArraysEqual';
import { useTextNavigation } from '../utils/useTextNavigation';
import { extractEventHandlers } from '../utils/extractEventHandlers';
var EMPTY_OBJECT = {};
var NOOP = function NOOP() {};
var defaultItemComparer = function defaultItemComparer(optionA, optionB) {
  return optionA === optionB;
};
var defaultIsItemDisabled = function defaultIsItemDisabled() {
  return false;
};
var defaultItemStringifier = function defaultItemStringifier(item) {
  return typeof item === 'string' ? item : String(item);
};
var defaultGetInitialState = function defaultGetInitialState() {
  return {
    highlightedValue: null,
    selectedValues: []
  };
};

/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * The state of the list is managed by a controllable reducer - that is a reducer that can have its state
 * controlled from outside.
 *
 * By default, the state consists of `selectedValues` and `highlightedValue` but can be extended by the caller of the hook.
 * Also the actions that can be dispatched and the reducer function can be defined externally.
 *
 * @template ItemValue The type of the item values.
 * @template State The type of the list state. This should be a subtype of `ListState<ItemValue>`.
 * @template CustomAction The type of the actions that can be dispatched (besides the standard ListAction).
 * @template CustomActionContext The shape of additional properties that will be added to actions when dispatched.
 *
 * @ignore - internal hook.
 */
function useList(params) {
  var _params$controlledPro = params.controlledProps,
    controlledProps = _params$controlledPro === void 0 ? EMPTY_OBJECT : _params$controlledPro,
    _params$disabledItems = params.disabledItemsFocusable,
    disabledItemsFocusable = _params$disabledItems === void 0 ? false : _params$disabledItems,
    _params$disableListWr = params.disableListWrap,
    disableListWrap = _params$disableListWr === void 0 ? false : _params$disableListWr,
    _params$focusManageme = params.focusManagement,
    focusManagement = _params$focusManageme === void 0 ? 'activeDescendant' : _params$focusManageme,
    _params$getInitialSta = params.getInitialState,
    getInitialState = _params$getInitialSta === void 0 ? defaultGetInitialState : _params$getInitialSta,
    getItemDomElement = params.getItemDomElement,
    getItemId = params.getItemId,
    _params$isItemDisable = params.isItemDisabled,
    isItemDisabled = _params$isItemDisable === void 0 ? defaultIsItemDisabled : _params$isItemDisable,
    externalListRef = params.rootRef,
    _params$onStateChange = params.onStateChange,
    onStateChange = _params$onStateChange === void 0 ? NOOP : _params$onStateChange,
    items = params.items,
    _params$itemComparer = params.itemComparer,
    itemComparer = _params$itemComparer === void 0 ? defaultItemComparer : _params$itemComparer,
    _params$getItemAsStri = params.getItemAsString,
    getItemAsString = _params$getItemAsStri === void 0 ? defaultItemStringifier : _params$getItemAsStri,
    onChange = params.onChange,
    onHighlightChange = params.onHighlightChange,
    onItemsChange = params.onItemsChange,
    _params$orientation = params.orientation,
    orientation = _params$orientation === void 0 ? 'vertical' : _params$orientation,
    _params$pageSize = params.pageSize,
    pageSize = _params$pageSize === void 0 ? 5 : _params$pageSize,
    _params$reducerAction = params.reducerActionContext,
    reducerActionContext = _params$reducerAction === void 0 ? EMPTY_OBJECT : _params$reducerAction,
    _params$selectionMode = params.selectionMode,
    selectionMode = _params$selectionMode === void 0 ? 'single' : _params$selectionMode,
    externalReducer = params.stateReducer,
    _params$componentName = params.componentName,
    componentName = _params$componentName === void 0 ? 'useList' : _params$componentName;
  if (process.env.NODE_ENV !== 'production') {
    if (focusManagement === 'DOM' && getItemDomElement == null) {
      throw new Error('useList: The `getItemDomElement` prop is required when using the `DOM` focus management.');
    }
    if (focusManagement === 'activeDescendant' && getItemId == null) {
      throw new Error('useList: The `getItemId` prop is required when using the `activeDescendant` focus management.');
    }
  }
  var listRef = React.useRef(null);
  var handleRef = useForkRef(externalListRef, listRef);
  var handleHighlightChange = React.useCallback(function (event, value, reason) {
    onHighlightChange == null || onHighlightChange(event, value, reason);
    if (focusManagement === 'DOM' && value != null && (reason === ListActionTypes.itemClick || reason === ListActionTypes.keyDown || reason === ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null || (_getItemDomElement = getItemDomElement(value)) == null || _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  var stateComparers = React.useMemo(function () {
    return {
      highlightedValue: itemComparer,
      selectedValues: function selectedValues(valuesArray1, valuesArray2) {
        return areArraysEqual(valuesArray1, valuesArray2, itemComparer);
      }
    };
  }, [itemComparer]);

  // This gets called whenever a reducer changes the state.
  var handleStateChange = React.useCallback(function (event, field, value, reason, state) {
    onStateChange == null || onStateChange(event, field, value, reason, state);
    switch (field) {
      case 'highlightedValue':
        handleHighlightChange(event, value, reason);
        break;
      case 'selectedValues':
        onChange == null || onChange(event, value, reason);
        break;
      default:
        break;
    }
  }, [handleHighlightChange, onChange, onStateChange]);

  // The following object is added to each action when it's dispatched.
  // It's accessible in the reducer via the `action.context` field.
  var listActionContext = React.useMemo(function () {
    return {
      disabledItemsFocusable: disabledItemsFocusable,
      disableListWrap: disableListWrap,
      focusManagement: focusManagement,
      isItemDisabled: isItemDisabled,
      itemComparer: itemComparer,
      items: items,
      getItemAsString: getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation: orientation,
      pageSize: pageSize,
      selectionMode: selectionMode,
      stateComparers: stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize, selectionMode, stateComparers]);
  var initialState = getInitialState();
  var reducer = externalReducer != null ? externalReducer : defaultReducer;
  var actionContext = React.useMemo(function () {
    return _extends({}, reducerActionContext, listActionContext);
  }, [reducerActionContext, listActionContext]);
  var _useControllableReduc = useControllableReducer({
      reducer: reducer,
      actionContext: actionContext,
      initialState: initialState,
      controlledProps: controlledProps,
      stateComparers: stateComparers,
      onStateChange: handleStateChange,
      componentName: componentName
    }),
    _useControllableReduc2 = _slicedToArray(_useControllableReduc, 2),
    state = _useControllableReduc2[0],
    dispatch = _useControllableReduc2[1];
  var highlightedValue = state.highlightedValue,
    selectedValues = state.selectedValues;
  var handleTextNavigation = useTextNavigation(function (searchString, event) {
    return dispatch({
      type: ListActionTypes.textNavigation,
      event: event,
      searchString: searchString
    });
  });
  var previousItems = React.useRef([]);
  React.useEffect(function () {
    // Whenever the `items` object changes, we need to determine if the actual items changed.
    // If they did, we need to dispatch an `itemsChange` action, so the selected/highlighted state is updated.
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemsChange,
      event: null,
      items: items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
    onItemsChange == null || onItemsChange(items);
  }, [items, itemComparer, dispatch, onItemsChange]);
  var createHandleKeyDown = function createHandleKeyDown(externalHandlers) {
    return function (event) {
      var _externalHandlers$onK;
      (_externalHandlers$onK = externalHandlers.onKeyDown) == null || _externalHandlers$onK.call(externalHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      var keysToPreventDefault = ['Home', 'End', 'PageUp', 'PageDown'];
      if (orientation === 'vertical') {
        keysToPreventDefault.push('ArrowUp', 'ArrowDown');
      } else {
        keysToPreventDefault.push('ArrowLeft', 'ArrowRight');
      }
      if (focusManagement === 'activeDescendant') {
        // When the child element is focused using the activeDescendant attribute,
        // the list handles keyboard events on its behalf.
        // We have to `preventDefault()` is this case to prevent the browser from
        // scrolling the view when space is pressed or submitting forms when enter is pressed.
        keysToPreventDefault.push(' ', 'Enter');
      }
      if (keysToPreventDefault.includes(event.key)) {
        event.preventDefault();
      }
      dispatch({
        type: ListActionTypes.keyDown,
        key: event.key,
        event: event
      });
      handleTextNavigation(event);
    };
  };
  var createHandleBlur = function createHandleBlur(externalHandlers) {
    return function (event) {
      var _externalHandlers$onB, _listRef$current;
      (_externalHandlers$onB = externalHandlers.onBlur) == null || _externalHandlers$onB.call(externalHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      if ((_listRef$current = listRef.current) != null && _listRef$current.contains(event.relatedTarget)) {
        // focus remains within the list
        return;
      }
      dispatch({
        type: ListActionTypes.blur,
        event: event
      });
    };
  };
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({}, externalProps, {
      'aria-activedescendant': focusManagement === 'activeDescendant' && highlightedValue != null ? getItemId(highlightedValue) : undefined,
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef
    }, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
  };
  var getItemState = React.useCallback(function (item) {
    var selected = (selectedValues != null ? selectedValues : []).some(function (value) {
      return value != null && itemComparer(item, value);
    });
    var highlighted = highlightedValue != null && itemComparer(item, highlightedValue);
    var focusable = focusManagement === 'DOM';
    return {
      focusable: focusable,
      highlighted: highlighted,
      selected: selected
    };
  }, [itemComparer, selectedValues, highlightedValue, focusManagement]);
  var contextValue = React.useMemo(function () {
    return {
      dispatch: dispatch,
      getItemState: getItemState
    };
  }, [dispatch, getItemState]);
  React.useDebugValue({
    state: state
  });
  return {
    contextValue: contextValue,
    dispatch: dispatch,
    getRootProps: getRootProps,
    rootRef: handleRef,
    state: state
  };
}
export { useList };