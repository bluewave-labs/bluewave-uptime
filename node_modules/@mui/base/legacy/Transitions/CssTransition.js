'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTransitionStateManager } from '../useTransition';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * A utility component that hooks up to the Base UI transitions API and
 * applies a CSS transition to its children when necessary.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssTransition API](https://mui.com/base-ui/react-transitions/components-api/#css-transition)
 */
var CssTransition = /*#__PURE__*/React.forwardRef(function CssTransition(props, forwardedRef) {
  var children = props.children,
    className = props.className,
    lastTransitionedPropertyOnExit = props.lastTransitionedPropertyOnExit,
    enterClassName = props.enterClassName,
    exitClassName = props.exitClassName,
    other = _objectWithoutProperties(props, ["children", "className", "lastTransitionedPropertyOnExit", "enterClassName", "exitClassName"]);
  var _useTransitionStateMa = useTransitionStateManager(),
    requestedEnter = _useTransitionStateMa.requestedEnter,
    onExited = _useTransitionStateMa.onExited;
  var _React$useState = React.useState(false),
    isEntering = _React$useState[0],
    setIsEntering = _React$useState[1]; // The `isEntering` state (which is used to determine the right CSS class to apply)
  // is updated slightly (one animation frame) after the `requestedEnter` state is updated.
  // Thanks to this, elements that are mounted will have their enter transition applied
  // (if the `enterClassName` was applied when the element was mounted, the transition would not be fired).
  React.useEffect(function () {
    if (requestedEnter) {
      requestAnimationFrame(function () {
        setIsEntering(true);
      });
    } else {
      setIsEntering(false);
    }
  }, [requestedEnter]);
  var handleTransitionEnd = React.useCallback(function (event) {
    if (!requestedEnter && (lastTransitionedPropertyOnExit == null || event.propertyName === lastTransitionedPropertyOnExit)) {
      onExited();
    }
  }, [onExited, requestedEnter, lastTransitionedPropertyOnExit]);
  return /*#__PURE__*/_jsx("div", _extends({
    onTransitionEnd: handleTransitionEnd,
    className: clsx(className, isEntering ? enterClassName : exitClassName)
  }, other, {
    ref: forwardedRef,
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? CssTransition.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enterClassName: PropTypes.string,
  exitClassName: PropTypes.string,
  lastTransitionedPropertyOnEnter: PropTypes.string,
  lastTransitionedPropertyOnExit: PropTypes.string
} : void 0;
export { CssTransition };