'use client';

import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';
export default function useThemeProps(_ref) {
  var props = _ref.props,
    name = _ref.name,
    defaultTheme = _ref.defaultTheme,
    themeId = _ref.themeId;
  var theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  var mergedProps = getThemeProps({
    theme: theme,
    name: name,
    props: props
  });
  return mergedProps;
}