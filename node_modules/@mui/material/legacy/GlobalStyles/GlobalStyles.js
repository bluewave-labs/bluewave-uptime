'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as SystemGlobalStyles } from '@mui/system';
import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';
import { jsx as _jsx } from "react/jsx-runtime";
function GlobalStyles(props) {
  return /*#__PURE__*/_jsx(SystemGlobalStyles, _extends({}, props, {
    defaultTheme: defaultTheme,
    themeId: THEME_ID
  }));
}
process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.array, PropTypes.func, PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.bool])
} : void 0;
export default GlobalStyles;