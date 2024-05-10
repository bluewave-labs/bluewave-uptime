'use client';

import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
import { jsx as _jsx } from "react/jsx-runtime";
var cache;
if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object') {
  cache = createCache({
    key: 'css',
    prepend: true
  });
}
export default function StyledEngineProvider(props) {
  var injectFirst = props.injectFirst,
    children = props.children;
  return injectFirst && cache ? /*#__PURE__*/_jsx(CacheProvider, {
    value: cache,
    children: children
  }) : children;
}
process.env.NODE_ENV !== "production" ? StyledEngineProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: PropTypes.bool
} : void 0;