'use client';

import createStyled from '@mui/system/createStyled';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
import rootShouldForwardProp from './rootShouldForwardProp';
export { default as slotShouldForwardProp } from './slotShouldForwardProp';
export { default as rootShouldForwardProp } from './rootShouldForwardProp';
var styled = createStyled({
  themeId: THEME_ID,
  defaultTheme: defaultTheme,
  rootShouldForwardProp: rootShouldForwardProp
});
export default styled;