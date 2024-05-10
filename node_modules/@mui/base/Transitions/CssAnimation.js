'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "enterAnimationName", "enterClassName", "exitAnimationName", "exitClassName"];
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
  const {
      children,
      className,
      enterAnimationName,
      enterClassName,
      exitAnimationName,
      exitClassName
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    requestedEnter,
    onExited
  } = useTransitionStateManager();
  const hasExited = React.useRef(true);
  React.useEffect(() => {
    if (requestedEnter && hasExited.current) {
      hasExited.current = false;
    }
  }, [requestedEnter]);
  const handleAnimationEnd = React.useCallback(event => {
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