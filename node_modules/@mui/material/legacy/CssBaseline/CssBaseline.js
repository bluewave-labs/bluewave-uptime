'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import useThemeProps from '../styles/useThemeProps';
import GlobalStyles from '../GlobalStyles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var html = function html(theme, enableColorScheme) {
  return _extends({
    WebkitFontSmoothing: 'antialiased',
    // Antialiasing.
    MozOsxFontSmoothing: 'grayscale',
    // Antialiasing.
    // Change from `box-sizing: content-box` so that `width`
    // is not affected by `padding` or `border`.
    boxSizing: 'border-box',
    // Fix font resize problem in iOS
    WebkitTextSizeAdjust: '100%'
  }, enableColorScheme && !theme.vars && {
    colorScheme: theme.palette.mode
  });
};
export var body = function body(theme) {
  return _extends({
    color: (theme.vars || theme).palette.text.primary
  }, theme.typography.body1, {
    backgroundColor: (theme.vars || theme).palette.background.default,
    '@media print': {
      // Save printer ink.
      backgroundColor: (theme.vars || theme).palette.common.white
    }
  });
};
var _styles = function styles(theme) {
  var _theme$components;
  var enableColorScheme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var colorSchemeStyles = {};
  if (enableColorScheme && theme.colorSchemes) {
    Object.entries(theme.colorSchemes).forEach(function (_ref) {
      var _scheme$palette;
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        scheme = _ref2[1];
      colorSchemeStyles[theme.getColorSchemeSelector(key).replace(/\s*&/, '')] = {
        colorScheme: (_scheme$palette = scheme.palette) == null ? void 0 : _scheme$palette.mode
      };
    });
  }
  var defaultStyles = _extends({
    html: html(theme, enableColorScheme),
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    },
    body: _extends({
      margin: 0
    }, body(theme), {
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: (theme.vars || theme).palette.background.default
      }
    })
  }, colorSchemeStyles);
  var themeOverrides = (_theme$components = theme.components) == null || (_theme$components = _theme$components.MuiCssBaseline) == null ? void 0 : _theme$components.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }
  return defaultStyles;
};

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
export { _styles as styles };
function CssBaseline(inProps) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCssBaseline'
  });
  var children = props.children,
    _props$enableColorSch = props.enableColorScheme,
    enableColorScheme = _props$enableColorSch === void 0 ? false : _props$enableColorSch;
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(GlobalStyles, {
      styles: function styles(theme) {
        return _styles(theme, enableColorScheme);
      }
    }), children]
  });
}
process.env.NODE_ENV !== "production" ? CssBaseline.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: PropTypes.bool
} : void 0;
export default CssBaseline;