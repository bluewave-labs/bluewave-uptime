"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStyles;
let warnedOnce = false;

// To remove in v6
function createStyles(styles) {
  if (!warnedOnce) {
    console.warn(['MUI: createStyles from @mui/material/styles is deprecated.', 'Please use @mui/styles/createStyles'].join('\n'));
    warnedOnce = true;
  }
  return styles;
}