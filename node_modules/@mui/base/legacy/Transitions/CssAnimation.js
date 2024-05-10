'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTransitionStateManager } from '../useTransition';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssAnimation API](https://mui.com/base-ui/react-transitions/components-api/#css-animation)
 */
function CssAnimation(props) {
  var children = props.children,
    className = props.className,
    enterAnimationName = props.enterAnimationName,
    enterClassName = props.enterClassName,
    exitAnimationName = props.exitAnimationName,
    exitClassName = props.exitClassName,
    other = _objectWithoutProperties(props, ["children", "className", "enterAnimationName", "enterClassName", "exitAnimationName", "exitClassName"]);
  var _useTransitionStateMa = useTransitionStateManager(),
    requestedEnter = _useTransitionStateMa.requestedEnter,
    onExited = _useTransitionStateMa.onExited;
  var hasExited = React.useRef(true);
  React.useEffect(function () {
    if (requestedEnter && hasExited.current) {
      hasExited.current = false;
    }
  }, [requestedEnter]);
  var handleAnimationEnd = React.useCallback(function (event) {
    if (event.animationName === exitAnimationName) {
      onExited();
      hasExited.current = true;
    } else if (event.animationName === enterAnimationName) {
      hasExited.current = false;
    }
  }, [onExited, exitAnimationName, enterAnimationName]);
  return /*#__PURE__*/_jsx("div", _extends({
    onAnimationEnd: handleAnimationEnd,
    className: clsx(className, requestedEnter ? enterClassName : exitClassName)
  }, other, {
    children: children
  }));
}
process.env.NODE_ENV !== "production" ? CssAnimation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enterAnimationName: PropTypes.string,
  enterClassName: PropTypes.string,
  exitAnimationName: PropTypes.string,
  exitClassName: PropTypes.string
} : void 0;
export { CssAnimation };