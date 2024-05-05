'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
function areEqual(a, b) {
  return a === b;
}
const EMPTY_OBJECT = {};
const NOOP = () => {};

/**
 * Gets the current state augmented with controlled values from the outside.
 * If a state item has a corresponding controlled value, it will be used instead of the internal state.
 */
function getControlledState(internalState, controlledProps) {
  const augmentedState = _extends({}, internalState);
  Object.keys(controlledProps).forEach(key => {
    if (controlledProps[key] !== undefined) {
      augmentedState[key] = controlledProps[key];
    }
  });
  return augmentedState;
}
/**
 * Defines an effect that compares the next state with the previous state and calls
 * the `onStateChange` callback if the state has changed.
 * The comparison is done based on the `stateComparers` parameter.
 */
function useStateChangeDetection(parameters) {
  const {
    nextState,
    initialState,
    stateComparers,
    onStateChange,
    controlledProps,
    lastActionRef
  } = parameters;
  const internalPreviousStateRef = React.useRef(initialState);
  React.useEffect(() => {
    if (lastActionRef.current === null) {
      // Detect changes only if an action has been dispatched.
      return;
    }
    const previousState = getControlledState(internalPreviousStateRef.current, controlledProps);
    Object.keys(nextState).forEach(key => {
      var _stateComparers$key;
      // go through all state keys and compare them with the previous state
      const stateComparer = (_stateComparers$key = stateComparers[key]) != null ? _stateComparers$key : areEqual;
      const nextStateItem = nextState[key];
      const previousStateItem = previousState[key];
      if (previousStateItem == null && nextStateItem != null || previousStateItem != null && nextStateItem == null || previousStateItem != null && nextStateItem != null && !stateComparer(nextStateItem, previousStateItem)) {
        var _event, _type;
        onStateChange == null || onStateChange((_event = lastActionRef.current.event) != null ? _event : null, key, nextStateItem, (_type = lastActionRef.current.type) != null ? _type : '', nextState);
      }
    });
    internalPreviousStateRef.current = nextState;
    lastActionRef.current = null;
  }, [internalPreviousStateRef, nextState, lastActionRef, onStateChange, stateComparers, controlledProps]);
}

/**
 * The alternative to `React.useReducer` that lets you control the state from the outside.
 *
 * It can be used in an uncontrolled mode, similar to `React.useReducer`, or in a controlled mode, when the state is controlled by the props.
 * It also supports partially controlled state, when some state items are controlled and some are not.
 *
 * The controlled state items are provided via the `controlledProps` parameter.
 * When a reducer action is dispatched, the internal state is updated with the new values.
 * A change event (`onStateChange`) is then triggered (for each changed state item) if the new state is different from the previous state.
 * This event can be used to update the controlled values.
 *
 * The comparison of the previous and next states is done using the `stateComparers` parameter.
 * If a state item has a corresponding comparer, it will be used to determine if the state has changed.
 * This is useful when the state item is an object and you want to compare only a subset of its properties or if it's an array and you want to compare its contents.
 *
 * An additional feature is the `actionContext` parameter. It allows you to add additional properties to every action object,
 * similarly to how React context is implicitly available to every component.
 *
 * @template State - The type of the state calculated by the reducer.
 * @template Action - The type of the actions that can be dispatched.
 * @template ActionContext - The type of the additional properties that will be added to every action object.
 *
 * @ignore - internal hook.
 */
export function useControllableReducer(parameters) {
  const lastActionRef = React.useRef(null);
  const {
    reducer,
    initialState,
    controlledProps = EMPTY_OBJECT,
    stateComparers = EMPTY_OBJECT,
    onStateChange = NOOP,
    actionContext,
    componentName = ''
  } = parameters;
  const controlledPropsRef = React.useRef(controlledProps);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      Object.keys(controlledProps).forEach(key => {
        if (controlledPropsRef.current[key] !== undefined && controlledProps[key] === undefined) {
          console.error(`useControllableReducer: ${componentName ? `The ${componentName} component` : 'A component'} is changing a controlled prop to be uncontrolled: ${key}`);
        }
        if (controlledPropsRef.current[key] === undefined && controlledProps[key] !== undefined) {
          console.error(`useControllableReducer: ${componentName ? `The ${componentName} component` : 'A component'} is changing an uncontrolled prop to be controlled: ${key}`);
        }
      });
    }, [controlledProps, componentName]);
  }

  // The reducer that is passed to React.useReducer is wrapped with a function that augments the state with controlled values.
  const reducerWithControlledState = React.useCallback((state, action) => {
    lastActionRef.current = action;
    const controlledState = getControlledState(state, controlledProps);
    const newState = reducer(controlledState, action);
    return newState;
  }, [controlledProps, reducer]);
  const [nextState, dispatch] = React.useReducer(reducerWithControlledState, initialState);

  // The action that is passed to dispatch is augmented with the actionContext.
  const dispatchWithContext = React.useCallback(action => {
    dispatch(_extends({}, action, {
      context: actionContext
    }));
  }, [actionContext]);
  useStateChangeDetection({
    nextState,
    initialState,
    stateComparers: stateComparers != null ? stateComparers : EMPTY_OBJECT,
    onStateChange: onStateChange != null ? onStateChange : NOOP,
    controlledProps,
    lastActionRef
  });
  return [getControlledState(nextState, controlledProps), dispatchWithContext];
}