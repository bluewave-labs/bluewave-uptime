import * as React from 'react';
import { styled } from '@mui/system';
import { fastMemo } from '../../utils/fastMemo';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { gridDimensionsSelector } from '../../hooks/features/dimensions';
import { gridClasses } from '../../constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Filler = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: 'var(--DataGrid-rowWidth)',
  boxSizing: 'border-box'
});
const Pinned = styled('div')({
  position: 'sticky',
  height: '100%',
  boxSizing: 'border-box',
  borderTop: '1px solid var(--DataGrid-rowBorderColor)',
  backgroundColor: 'var(--DataGrid-pinnedBackground)'
});
const PinnedLeft = styled(Pinned)({
  left: 0,
  borderRight: '1px solid var(--DataGrid-rowBorderColor)'
});
const PinnedRight = styled(Pinned)({
  right: 0,
  borderLeft: '1px solid var(--DataGrid-rowBorderColor)'
});
const Main = styled('div')({
  flexGrow: 1,
  borderTop: '1px solid var(--DataGrid-rowBorderColor)'
});
function GridVirtualScrollerFiller() {
  const apiRef = useGridApiContext();
  const {
    viewportOuterSize,
    minimumSize,
    hasScrollX,
    hasScrollY,
    scrollbarSize,
    leftPinnedWidth,
    rightPinnedWidth
  } = useGridSelector(apiRef, gridDimensionsSelector);
  const scrollbarHeight = hasScrollX ? scrollbarSize : 0;
  const expandedHeight = viewportOuterSize.height - minimumSize.height - scrollbarHeight;
  const height = Math.max(scrollbarHeight, expandedHeight);
  if (height === 0) {
    return null;
  }
  return /*#__PURE__*/_jsxs(Filler, {
    className: gridClasses.filler,
    role: "presentation",
    style: {
      height
    },
    children: [leftPinnedWidth > 0 && /*#__PURE__*/_jsx(PinnedLeft, {
      className: gridClasses['filler--pinnedLeft'],
      style: {
        width: leftPinnedWidth
      }
    }), /*#__PURE__*/_jsx(Main, {}), rightPinnedWidth > 0 && /*#__PURE__*/_jsx(PinnedRight, {
      className: gridClasses['filler--pinnedRight'],
      style: {
        width: rightPinnedWidth + (hasScrollY ? scrollbarSize : 0)
      }
    })]
  });
}
const Memoized = fastMemo(GridVirtualScrollerFiller);
export { Memoized as GridVirtualScrollerFiller };