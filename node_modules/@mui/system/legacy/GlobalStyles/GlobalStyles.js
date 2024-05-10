'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as MuiGlobalStyles } from '@mui/styled-engine';
import useTheme from '../useTheme';
import { jsx as _jsx } from "react/jsx-runtime";
function GlobalStyles(_ref) {
  var styles = _ref.styles,
    themeId = _ref.themeId,
    _ref$defaultTheme = _ref.defaultTheme,
    defaultTheme = _ref$defaultTheme === void 0 ? {} : _ref$defaultTheme;
  var upperTheme = useTheme(defaultTheme);
  var globalStyles = typeof styles === 'function' ? styles(themeId ? upperTheme[themeId] || upperTheme : upperTheme) : styles;
  return /*#__PURE__*/_jsx(MuiGlobalStyles, {
    styles: globalStyles
  });
}
process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: PropTypes.object,
  /**
   * @ignore
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.array, PropTypes.func, PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.bool]),
  /**
   * @ignore
   */
  themeId: PropTypes.string
} : void 0;
export default GlobalStyles;