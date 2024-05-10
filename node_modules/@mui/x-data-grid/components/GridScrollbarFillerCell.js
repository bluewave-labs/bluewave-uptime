import * as React from 'react';
import clsx from 'clsx';
import { gridClasses } from '../constants';
import { jsx as _jsx } from "react/jsx-runtime";
const classes = {
  root: gridClasses.scrollbarFiller,
  header: gridClasses['scrollbarFiller--header'],
  borderTop: gridClasses['scrollbarFiller--borderTop'],
  pinnedRight: gridClasses['scrollbarFiller--pinnedRight']
};
function GridScrollbarFillerCell({
  header,
  borderTop = true,
  pinnedRight
}) {
  return /*#__PURE__*/_jsx("div", {
    role: "presentation",
    className: clsx(classes.root, header && classes.header, borderTop && classes.borderTop, pinnedRight && classes.pinnedRight)
  });
}
export { GridScrollbarFillerCell };