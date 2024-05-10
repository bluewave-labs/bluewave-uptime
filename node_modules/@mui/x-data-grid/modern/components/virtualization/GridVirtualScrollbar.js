import * as React from 'react';
import { styled } from '@mui/system';
import { unstable_composeClasses as composeClasses, unstable_useForkRef as useForkRef, unstable_useEventCallback as useEventCallback } from '@mui/utils';
import { useOnMount } from '../../hooks/utils/useOnMount';
import { useGridPrivateApiContext } from '../../hooks/utils/useGridPrivateApiContext';
import { gridDimensionsSelector, useGridSelector } from '../../hooks';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = (ownerState, position) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['scrollbar', `scrollbar--${position}`],
    content: ['scrollbarContent']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const Scrollbar = styled('div')({
  position: 'absolute',
  display: 'inline-block',
  zIndex: 6,
  '& > div': {
    display: 'inline-block'
  },
  // In macOS Safari and Gnome Web, scrollbars are overlaid and don't affect the layout. So we consider
  // their size to be 0px throughout all the calculations, but the floating scrollbar container does need
  // to appear and have a real size. We set it to 14px because it seems like an acceptable value and we
  // don't have a method to find the required size for scrollbars on those platforms.
  '--size': 'calc(max(var(--DataGrid-scrollbarSize), 14px))'
});
const ScrollbarVertical = styled(Scrollbar)({
  width: 'var(--size)',
  height: 'calc(var(--DataGrid-hasScrollY) * (100% - var(--DataGrid-topContainerHeight) - var(--DataGrid-bottomContainerHeight) - var(--DataGrid-hasScrollX) * var(--DataGrid-scrollbarSize)))',
  overflowY: 'auto',
  overflowX: 'hidden',
  // Disable focus-visible style, it's a scrollbar.
  outline: 0,
  '& > div': {
    width: 'var(--size)'
  },
  top: 'var(--DataGrid-topContainerHeight)',
  right: '0px'
});
const ScrollbarHorizontal = styled(Scrollbar)({
  width: '100%',
  height: 'var(--size)',
  overflowY: 'hidden',
  overflowX: 'auto',
  // Disable focus-visible style, it's a scrollbar.
  outline: 0,
  '& > div': {
    height: 'var(--size)'
  },
  bottom: '0px'
});
const Content = styled('div')({
  display: 'inline-block'
});
const GridVirtualScrollbar = /*#__PURE__*/React.forwardRef(function GridVirtualScrollbar(props, ref) {
  const apiRef = useGridPrivateApiContext();
  const rootProps = useGridRootProps();
  const isLocked = React.useRef(false);
  const lastPosition = React.useRef(0);
  const scrollbarRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const classes = useUtilityClasses(rootProps, props.position);
  const dimensions = useGridSelector(apiRef, gridDimensionsSelector);
  const propertyDimension = props.position === 'vertical' ? 'height' : 'width';
  const propertyScroll = props.position === 'vertical' ? 'scrollTop' : 'scrollLeft';
  const hasScroll = props.position === 'vertical' ? dimensions.hasScrollX : dimensions.hasScrollY;
  const contentSize = dimensions.minimumSize[propertyDimension] + (hasScroll ? dimensions.scrollbarSize : 0);
  const scrollbarSize = props.position === 'vertical' ? dimensions.viewportInnerSize.height : dimensions.viewportOuterSize.width;
  const scrollbarInnerSize = scrollbarSize * (contentSize / dimensions.viewportOuterSize[propertyDimension]);
  const onScrollerScroll = useEventCallback(() => {
    const scroller = apiRef.current.virtualScrollerRef.current;
    const scrollbar = scrollbarRef.current;
    if (scroller[propertyScroll] === lastPosition.current) {
      return;
    }
    if (isLocked.current) {
      isLocked.current = false;
      return;
    }
    isLocked.current = true;
    const value = scroller[propertyScroll] / contentSize;
    scrollbar[propertyScroll] = value * scrollbarInnerSize;
    lastPosition.current = scroller[propertyScroll];
  });
  const onScrollbarScroll = useEventCallback(() => {
    const scroller = apiRef.current.virtualScrollerRef.current;
    const scrollbar = scrollbarRef.current;
    if (isLocked.current) {
      isLocked.current = false;
      return;
    }
    isLocked.current = true;
    const value = scrollbar[propertyScroll] / scrollbarInnerSize;
    scroller[propertyScroll] = value * contentSize;
  });
  useOnMount(() => {
    const scroller = apiRef.current.virtualScrollerRef.current;
    const scrollbar = scrollbarRef.current;
    scroller.addEventListener('scroll', onScrollerScroll, {
      capture: true
    });
    scrollbar.addEventListener('scroll', onScrollbarScroll, {
      capture: true
    });
    return () => {
      scroller.removeEventListener('scroll', onScrollerScroll, {
        capture: true
      });
      scrollbar.removeEventListener('scroll', onScrollbarScroll, {
        capture: true
      });
    };
  });
  React.useEffect(() => {
    const content = contentRef.current;
    content.style.setProperty(propertyDimension, `${scrollbarInnerSize}px`);
  }, [scrollbarInnerSize, propertyDimension]);
  const Container = props.position === 'vertical' ? ScrollbarVertical : ScrollbarHorizontal;
  return /*#__PURE__*/_jsx(Container, {
    ref: useForkRef(ref, scrollbarRef),
    className: classes.root,
    tabIndex: -1,
    children: /*#__PURE__*/_jsx(Content, {
      ref: contentRef,
      className: classes.content
    })
  });
});
export { GridVirtualScrollbar };