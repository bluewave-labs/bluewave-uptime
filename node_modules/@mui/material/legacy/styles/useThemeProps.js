'use client';

import systemUseThemeProps from '@mui/system/useThemeProps';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
export default function useThemeProps(_ref) {
  var props = _ref.props,
    name = _ref.name;
  return systemUseThemeProps({
    props: props,
    name: name,
    defaultTheme: defaultTheme,
    themeId: THEME_ID
  });
}