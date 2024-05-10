import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { styled } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { GridScrollArea } from '../GridScrollArea';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { gridDimensionsSelector } from '../../hooks/features/dimensions';
import { useGridVirtualScroller } from '../../hooks/features/virtualization/useGridVirtualScroller';
import { GridOverlays } from '../base/GridOverlays';
import { GridHeaders } from '../GridHeaders';
import { GridMainContainer as Container } from './GridMainContainer';
import { GridTopContainer as TopContainer } from './GridTopContainer';
import { GridBottomContainer as BottomContainer } from './GridBottomContainer';
import { GridVirtualScrollerContent as Content } from './GridVirtualScrollerContent';
import { GridVirtualScrollerFiller as SpaceFiller } from './GridVirtualScrollerFiller';
import { GridVirtualScrollerRenderZone as RenderZone } from './GridVirtualScrollerRenderZone';
import { GridVirtualScrollbar as Scrollbar } from './GridVirtualScrollbar';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useUtilityClasses = (ownerState, dimensions) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['main', dimensions.rightPinnedWidth > 0 && 'main--hasPinnedRight'],
    scroller: ['virtualScroller']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const Scroller = styled('div', {
  name: 'MuiDataGrid',
  slot: 'VirtualScroller',
  overridesResolver: (props, styles) => styles.virtualScroller
})({
  position: 'relative',
  height: '100%',
  overflow: 'scroll',
  scrollbarWidth: 'none' /* Firefox */,
  '&::-webkit-scrollbar': {
    display: 'none' /* Safari and Chrome */
  },
  '@media print': {
    overflow: 'hidden'
  },
  // See https://github.com/mui/mui-x/issues/10547
  zIndex: 0
});
function GridVirtualScroller(props) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const dimensions = useGridSelector(apiRef, gridDimensionsSelector);
  const classes = useUtilityClasses(rootProps, dimensions);
  const virtualScroller = useGridVirtualScroller();
  const {
    getContainerProps,
    getScrollerProps,
    getContentProps,
    getRenderZoneProps,
    getScrollbarVerticalProps,
    getScrollbarHorizontalProps,
    getRows
  } = virtualScroller;
  const rows = getRows();
  return /*#__PURE__*/_jsxs(Container, _extends({
    className: classes.root
  }, getContainerProps(), {
    children: [/*#__PURE__*/_jsx(GridScrollArea, {
      scrollDirection: "left"
    }), /*#__PURE__*/_jsx(GridScrollArea, {
      scrollDirection: "right"
    }), /*#__PURE__*/_jsxs(Scroller, _extends({
      className: classes.scroller
    }, getScrollerProps(), {
      ownerState: rootProps,
      children: [/*#__PURE__*/_jsxs(TopContainer, {
        children: [/*#__PURE__*/_jsx(GridHeaders, {}), /*#__PURE__*/_jsx(rootProps.slots.pinnedRows, {
          position: "top",
          virtualScroller: virtualScroller
        })]
      }), /*#__PURE__*/_jsx(GridOverlays, {}), /*#__PURE__*/_jsx(Content, _extends({}, getContentProps(), {
        children: /*#__PURE__*/_jsxs(RenderZone, _extends({}, getRenderZoneProps(), {
          children: [rows, /*#__PURE__*/_jsx(rootProps.slots.detailPanels, {
            virtualScroller: virtualScroller
          })]
        }))
      })), rows.length > 0 && /*#__PURE__*/_jsx(SpaceFiller, {}), /*#__PURE__*/_jsx(BottomContainer, {
        children: /*#__PURE__*/_jsx(rootProps.slots.pinnedRows, {
          position: "bottom",
          virtualScroller: virtualScroller
        })
      })]
    })), dimensions.hasScrollY && /*#__PURE__*/_jsx(Scrollbar, _extends({
      position: "vertical"
    }, getScrollbarVerticalProps())), dimensions.hasScrollX && /*#__PURE__*/_jsx(Scrollbar, _extends({
      position: "horizontal"
    }, getScrollbarHorizontalProps())), props.children]
  }));
}
export { GridVirtualScroller };