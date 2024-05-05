'use client';

// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import _extends from "@babel/runtime/helpers/esm/extends";
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import experimental_extendTheme from './experimental_extendTheme';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';
import THEME_ID from './identifier';
var defaultTheme = experimental_extendTheme();
var _createCssVarsProvide = createCssVarsProvider({
    themeId: THEME_ID,
    theme: defaultTheme,
    attribute: 'data-mui-color-scheme',
    modeStorageKey: 'mui-mode',
    colorSchemeStorageKey: 'mui-color-scheme',
    defaultColorScheme: {
      light: 'light',
      dark: 'dark'
    },
    resolveTheme: function resolveTheme(theme) {
      var newTheme = _extends({}, theme, {
        typography: createTypography(theme.palette, theme.typography)
      });
      newTheme.unstable_sx = function sx(props) {
        return styleFunctionSx({
          sx: props,
          theme: this
        });
      };
      return newTheme;
    },
    excludeVariablesFromRoot: excludeVariablesFromRoot
  }),
  CssVarsProvider = _createCssVarsProvide.CssVarsProvider,
  useColorScheme = _createCssVarsProvide.useColorScheme,
  getInitColorSchemeScript = _createCssVarsProvide.getInitColorSchemeScript;
export { useColorScheme, getInitColorSchemeScript, CssVarsProvider as Experimental_CssVarsProvider };