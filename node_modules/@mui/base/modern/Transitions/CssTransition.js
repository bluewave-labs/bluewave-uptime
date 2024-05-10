'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "lastTransitionedPropertyOnExit", "enterClassName", "exitClassName"];
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
const CssTransition = /*#__PURE__*/React.forwardRef(function CssTransition(props, forwardedRef) {
  const {
      children,
      className,
      lastTransitionedPropertyOnExit,
      enterClassName,
      exitClassName
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    requestedEnter,
    onExited
  } = useTransitionStateManager();
  const [isEntering, setIsEntering] = React.useState(false);

  // The `isEntering` state (which is used to determine the right CSS class to apply)
  // is updated slightly (one animation frame) after the `requestedEnter` state is updated.
  // Thanks to this, elements that are mounted will have their enter transition applied
  // (if the `enterClassName` was applied when the element was mounted, the transition would not be fired).
  React.useEffect(() => {
    if (requestedEnter) {
      requestAnimationFrame(() => {
        setIsEntering(true);
      });
    } else {
      setIsEntering(false);
    }
  }, [requestedEnter]);
  const handleTransitionEnd = React.useCallback(event => {
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