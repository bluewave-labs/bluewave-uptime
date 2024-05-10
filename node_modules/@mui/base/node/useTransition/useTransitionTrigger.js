"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransitionTrigger = useTransitionTrigger;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
function useTransitionTrigger(requestEnter) {
  const [exitTransitionFinished, setExitTransitionFinished] = React.useState(true);
  const hasPendingExitTransition = React.useRef(false);
  const registeredTransitions = React.useRef(0);
  const [hasTransition, setHasTransition] = React.useState(false);
  const previousRequestEnter = React.useRef(requestEnter);
  React.useEffect(() => {
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
  const handleExited = React.useCallback(() => {
    hasPendingExitTransition.current = false;
    setExitTransitionFinished(true);
  }, []);
  const registerTransition = React.useCallback(() => {
    registeredTransitions.current += 1;
    setHasTransition(true);
    return () => {
      registeredTransitions.current -= 1;
      if (registeredTransitions.current === 0) {
        setHasTransition(false);
      }
    };
  }, []);
  let hasExited;
  if (!hasTransition) {
    // If there are no transitions registered, the `exited` state is opposite of `requestEnter` immediately.
    hasExited = !requestEnter;
  } else if (requestEnter) {
    hasExited = false;
  } else {
    hasExited = !hasPendingExitTransition.current && exitTransitionFinished;
  }
  const contextValue = React.useMemo(() => ({
    requestedEnter: requestEnter,
    onExited: handleExited,
    registerTransition,
    hasExited
  }), [handleExited, requestEnter, registerTransition, hasExited]);
  return {
    contextValue,
    hasExited
  };
}