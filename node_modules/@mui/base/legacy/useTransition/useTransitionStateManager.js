'use client';

import * as React from 'react';
import { TransitionContext } from './TransitionContext';
/**
 * Allows an element to be transitioned in and out.
 * The transition is triggerred by a `TransitionContext` placed above in the component tree.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionStateManager API](https://mui.com/base-ui/react-transitions/hooks-api/#use-transition-state-manager)
 */
export function useTransitionStateManager() {
  var transitionContext = React.useContext(TransitionContext);
  if (!transitionContext) {
    throw new Error('Missing transition context');
  }
  var registerTransition = transitionContext.registerTransition,
    requestedEnter = transitionContext.requestedEnter,
    onExited = transitionContext.onExited;
  React.useEffect(function () {
    return registerTransition();
  }, [registerTransition]);
  return {
    onExited: onExited,
    requestedEnter: requestedEnter
  };
}