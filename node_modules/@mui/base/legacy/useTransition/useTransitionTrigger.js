'use client';

import * as React from 'react';
/**
 * Allows child elements to be transitioned in and out.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionTrigger API](https://mui.com/base-ui/react-transitions/hooks-api/#use-transition-trigger)
 */
export function useTransitionTrigger(requestEnter) {
  var _React$useState = React.useState(true),
    exitTransitionFinished = _React$useState[0],
    setExitTransitionFinished = _React$useState[1];
  var hasPendingExitTransition = React.useRef(false);
  var registeredTransitions = React.useRef(0);
  var _React$useState2 = React.useState(false),
    hasTransition = _React$useState2[0],
    setHasTransition = _React$useState2[1];
  var previousRequestEnter = React.useRef(requestEnter);
  React.useEffect(function () {
    if (!requestEnter &&
    // checking registeredTransitions.current instead of hasTransition to avoid this effect re-firing whenever hasTransition changes
    registeredTransitions.current > 0 &&
    // prevents waiting for a pending transition right after mounting
    previousRequestEnter.current !== requestEnter) {
      hasPendingExitTransition.current = true;
      setExitTransitionFinished(false);
    }
    previousRequestEnter.current = requestEnter;
  }, [requestEnter]);
  var handleExited = React.useCallback(function () {
    hasPendingExitTransition.current = false;
    setExitTransitionFinished(true);
  }, []);
  var registerTransition = React.useCallback(function () {
    registeredTransitions.current += 1;
    setHasTransition(true);
    return function () {
      registeredTransitions.current -= 1;
      if (registeredTransitions.current === 0) {
        setHasTransition(false);
      }
    };
  }, []);
  var hasExited;
  if (!hasTransition) {
    // If there are no transitions registered, the `exited` state is opposite of `requestEnter` immediately.
    hasExited = !requestEnter;
  } else if (requestEnter) {
    hasExited = false;
  } else {
    hasExited = !hasPendingExitTransition.current && exitTransitionFinished;
  }
  var contextValue = React.useMemo(function () {
    return {
      requestedEnter: requestEnter,
      onExited: handleExited,
      registerTransition: registerTransition,
      hasExited: hasExited
    };
  }, [handleExited, requestEnter, registerTransition, hasExited]);
  return {
    contextValue: contextValue,
    hasExited: hasExited
  };
}