'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import exactProp from '@mui/utils/exactProp';
import withWidth, { isWidthDown, isWidthUp } from './withWidth';
import useTheme from '../styles/useTheme';

/**
 * @ignore - internal component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
function HiddenJs(props) {
  var children = props.children,
    only = props.only,
    width = props.width;
  var theme = useTheme();
  var visible = true;

  // `only` check is faster to get out sooner if used.
  if (only) {
    if (Array.isArray(only)) {
      for (var i = 0; i < only.length; i += 1) {
        var breakpoint = only[i];
        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  }

  // Allow `only` to be combined with other props. If already hidden, no need to check others.
  if (visible) {
    // determine visibility based on the smallest size up
    for (var _i = 0; _i < theme.breakpoints.keys.length; _i += 1) {
      var _breakpoint = theme.breakpoints.keys[_i];
      var breakpointUp = props["".concat(_breakpoint, "Up")];
      var breakpointDown = props["".concat(_breakpoint, "Down")];
      if (breakpointUp && isWidthUp(_breakpoint, width) || breakpointDown && isWidthDown(_breakpoint, width)) {
        visible = false;
        break;
      }
    }
  }
  if (!visible) {
    return null;
  }
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: children
  });
}
process.env.NODE_ENV !== "production" ? HiddenJs.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  lgDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  lgUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  mdDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  mdUp: PropTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  smDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  smUp: PropTypes.bool,
  /**
   * @ignore
   * width prop provided by withWidth decorator.
   */
  width: PropTypes.string.isRequired,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xlDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xlUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xsDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  xsUp: PropTypes.bool
} : void 0;
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? HiddenJs.propTypes = exactProp(HiddenJs.propTypes) : void 0;
}
export default withWidth()(HiddenJs);