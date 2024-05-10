'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import THEME_ID from './identifier';
import { jsx as _jsx } from "react/jsx-runtime";
export default function ThemeProvider(_ref) {
  var themeInput = _ref.theme,
    props = _objectWithoutProperties(_ref, ["theme"]);
  var scopedTheme = themeInput[THEME_ID];
  return /*#__PURE__*/_jsx(SystemThemeProvider, _extends({}, props, {
    themeId: scopedTheme ? THEME_ID : undefined,
    theme: scopedTheme || themeInput
  }));
}
process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
} : void 0;