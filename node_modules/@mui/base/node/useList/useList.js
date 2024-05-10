"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useList = useList;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _listActions = require("./listActions.types");
var _listReducer = require("./listReducer");
var _useControllableReducer = require("../utils/useControllableReducer");
var _areArraysEqual = require("../utils/areArraysEqual");
var _useTextNavigation = require("../utils/useTextNavigation");
var _extractEventHandlers = require("../utils/extractEventHandlers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EMPTY_OBJECT = {};
const NOOP = () => {};
const defaultItemComparer = (optionA, optionB) => optionA === optionB;
const defaultIsItemDisabled = () => false;
const defaultItemStringifier = item => typeof item === 'string' ? item : String(item);
const defaultGetInitialState = () => ({
  highlightedValue: null,
  selectedValues: []
});

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
  const {
    controlledProps = EMPTY_OBJECT,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    rootRef: externalListRef,
    onStateChange = NOOP,
    items,
    itemComparer = defaultItemComparer,
    getItemAsString = defaultItemStringifier,
    onChange,
    onHighlightChange,
    onItemsChange,
    orientation = 'vertical',
    pageSize = 5,
    reducerActionContext = EMPTY_OBJECT,
    selectionMode = 'single',
    stateReducer: externalReducer,
    componentName = 'useList'
  } = params;
  if (process.env.NODE_ENV !== 'production') {
    if (focusManagement === 'DOM' && getItemDomElement == null) {
      throw new Error('useList: The `getItemDomElement` prop is required when using the `DOM` focus management.');
    }
    if (focusManagement === 'activeDescendant' && getItemId == null) {
      throw new Error('useList: The `getItemId` prop is required when using the `activeDescendant` focus management.');
    }
  }
  const listRef = React.useRef(null);
  const handleRef = (0, _utils.unstable_useForkRef)(externalListRef, listRef);
  const handleHighlightChange = React.useCallback((event, value, reason) => {
    onHighlightChange == null || onHighlightChange(event, value, reason);
    if (focusManagement === 'DOM' && value != null && (reason === _listActions.ListActionTypes.itemClick || reason === _listActions.ListActionTypes.keyDown || reason === _listActions.ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null || (_getItemDomElement = getItemDomElement(value)) == null || _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  const stateComparers = React.useMemo(() => ({
    highlightedValue: itemComparer,
    selectedValues: (valuesArray1, valuesArray2) => (0, _areArraysEqual.areArraysEqual)(valuesArray1, valuesArray2, itemComparer)
  }), [itemComparer]);

  // This gets called whenever a reducer changes the state.
  const handleStateChange = React.useCallback((event, field, value, reason, state) => {
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
  const listActionContext = React.useMemo(() => {
    return {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation,
      pageSize,
      selectionMode,
      stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize, selectionMode, stateComparers]);
  const initialState = getInitialState();
  const reducer = externalReducer != null ? externalReducer : _listReducer.listReducer;
  const actionContext = React.useMemo(() => (0, _extends2.default)({}, reducerActionContext, listActionContext), [reducerActionContext, listActionContext]);
  const [state, dispatch] = (0, _useControllableReducer.useControllableReducer)({
    reducer,
    actionContext,
    initialState: initialState,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange,
    componentName
  });
  const {
    highlightedValue,
    selectedValues
  } = state;
  const handleTextNavigation = (0, _useTextNavigation.useTextNavigation)((searchString, event) => dispatch({
    type: _listActions.ListActionTypes.textNavigation,
    event,
    searchString
  }));
  const previousItems = React.useRef([]);
  React.useEffect(() => {
    // Whenever the `items` object changes, we need to determine if the actual items changed.
    // If they did, we need to dispatch an `itemsChange` action, so the selected/highlighted state is updated.
    if ((0, _areArraysEqual.areArraysEqual)(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: _listActions.ListActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
    onItemsChange == null || onItemsChange(items);
  }, [items, itemComparer, dispatch, onItemsChange]);
  const createHandleKeyDown = externalHandlers => event => {
    var _externalHandlers$onK;
    (_externalHandlers$onK = externalHandlers.onKeyDown) == null || _externalHandlers$onK.call(externalHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const keysToPreventDefault = ['Home', 'End', 'PageUp', 'PageDown'];
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
      type: _listActions.ListActionTypes.keyDown,
      key: event.key,
      event
    });
    handleTextNavigation(event);
  };
  const createHandleBlur = externalHandlers => event => {
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
      type: _listActions.ListActionTypes.blur,
      event
    });
  };
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = (0, _extractEventHandlers.extractEventHandlers)(externalProps);
    return (0, _extends2.default)({}, externalProps, {
      'aria-activedescendant': focusManagement === 'activeDescendant' && highlightedValue != null ? getItemId(highlightedValue) : undefined,
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef
    }, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
  };
  const getItemState = React.useCallback(item => {
    const selected = (selectedValues != null ? selectedValues : []).some(value => value != null && itemComparer(item, value));
    const highlighted = highlightedValue != null && itemComparer(item, highlightedValue);
    const focusable = focusManagement === 'DOM';
    return {
      focusable,
      highlighted,
      selected
    };
  }, [itemComparer, selectedValues, highlightedValue, focusManagement]);
  const contextValue = React.useMemo(() => ({
    dispatch,
    getItemState
  }), [dispatch, getItemState]);
  React.useDebugValue({
    state
  });
  return {
    contextValue,
    dispatch,
    getRootProps,
    rootRef: handleRef,
    state
  };
}