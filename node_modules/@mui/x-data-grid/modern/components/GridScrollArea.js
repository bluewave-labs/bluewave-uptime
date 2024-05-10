import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses, unstable_useEventCallback as useEventCallback } from '@mui/utils';
import { styled } from '@mui/system';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass, gridClasses } from '../constants';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridApiEventHandler } from '../hooks/utils/useGridApiEventHandler';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { gridDimensionsSelector } from '../hooks/features/dimensions/gridDimensionsSelectors';
import { gridDensityFactorSelector } from '../hooks/features/density/densitySelector';
import { gridColumnsTotalWidthSelector } from '../hooks/features/columns/gridColumnsSelector';
import { useTimeout } from '../hooks/utils/useTimeout';
import { getTotalHeaderHeight } from '../hooks/features/columns/gridColumnsUtils';
import { fastMemo } from '../utils/fastMemo';
import { jsx as _jsx } from "react/jsx-runtime";
const CLIFF = 1;
const SLOP = 1.5;
const useUtilityClasses = ownerState => {
  const {
    scrollDirection,
    classes
  } = ownerState;
  const slots = {
    root: ['scrollArea', `scrollArea--${scrollDirection}`]
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const GridScrollAreaRawRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ScrollArea',
  overridesResolver: (props, styles) => [{
    [`&.${gridClasses['scrollArea--left']}`]: styles['scrollArea--left']
  }, {
    [`&.${gridClasses['scrollArea--right']}`]: styles['scrollArea--right']
  }, styles.scrollArea]
})(() => ({
  position: 'absolute',
  top: 0,
  zIndex: 101,
  width: 20,
  bottom: 0,
  [`&.${gridClasses['scrollArea--left']}`]: {
    left: 0
  },
  [`&.${gridClasses['scrollArea--right']}`]: {
    right: 0
  }
}));
function GridScrollAreaRaw(props) {
  const {
    scrollDirection
  } = props;
  const rootRef = React.useRef(null);
  const apiRef = useGridApiContext();
  const timeout = useTimeout();
  const densityFactor = useGridSelector(apiRef, gridDensityFactorSelector);
  const columnsTotalWidth = useGridSelector(apiRef, gridColumnsTotalWidthSelector);
  const dimensions = useGridSelector(apiRef, gridDimensionsSelector);
  const scrollPosition = React.useRef({
    left: 0,
    top: 0
  });
  const getCanScrollMore = () => {
    if (scrollDirection === 'left') {
      // Only render if the user has not reached yet the start of the list
      return scrollPosition.current.left > 0;
    }
    if (scrollDirection === 'right') {
      // Only render if the user has not reached yet the end of the list
      const maxScrollLeft = columnsTotalWidth - dimensions.viewportInnerSize.width;
      return scrollPosition.current.left < maxScrollLeft;
    }
    return false;
  };
  const [dragging, setDragging] = React.useState(false);
  const [canScrollMore, setCanScrollMore] = React.useState(getCanScrollMore);
  const rootProps = useGridRootProps();
  const ownerState = _extends({}, rootProps, {
    scrollDirection
  });
  const classes = useUtilityClasses(ownerState);
  const totalHeaderHeight = getTotalHeaderHeight(apiRef, rootProps);
  const headerHeight = Math.floor(rootProps.columnHeaderHeight * densityFactor);
  const style = {
    height: headerHeight,
    top: totalHeaderHeight - headerHeight
  };
  if (scrollDirection === 'left') {
    style.left = dimensions.leftPinnedWidth;
  } else if (scrollDirection === 'right') {
    style.right = dimensions.rightPinnedWidth + (dimensions.hasScrollX ? dimensions.scrollbarSize : 0);
  }
  const handleScrolling = newScrollPosition => {
    scrollPosition.current = newScrollPosition;
    setCanScrollMore(getCanScrollMore);
  };
  const handleDragOver = useEventCallback(event => {
    let offset;

    // Prevents showing the forbidden cursor
    event.preventDefault();
    if (scrollDirection === 'left') {
      offset = event.clientX - rootRef.current.getBoundingClientRect().right;
    } else if (scrollDirection === 'right') {
      offset = Math.max(1, event.clientX - rootRef.current.getBoundingClientRect().left);
    } else {
      throw new Error('MUI X: Wrong drag direction');
    }
    offset = (offset - CLIFF) * SLOP + CLIFF;

    // Avoid freeze and inertia.
    timeout.start(0, () => {
      apiRef.current.scroll({
        left: scrollPosition.current.left + offset,
        top: scrollPosition.current.top
      });
    });
  });
  const handleColumnHeaderDragStart = useEventCallback(() => {
    setDragging(true);
  });
  const handleColumnHeaderDragEnd = useEventCallback(() => {
    setDragging(false);
  });
  useGridApiEventHandler(apiRef, 'scrollPositionChange', handleScrolling);
  useGridApiEventHandler(apiRef, 'columnHeaderDragStart', handleColumnHeaderDragStart);
  useGridApiEventHandler(apiRef, 'columnHeaderDragEnd', handleColumnHeaderDragEnd);
  if (!dragging || !canScrollMore) {
    return null;
  }
  return /*#__PURE__*/_jsx(GridScrollAreaRawRoot, {
    ref: rootRef,
    className: clsx(classes.root),
    ownerState: ownerState,
    onDragOver: handleDragOver,
    style: style
  });
}
process.env.NODE_ENV !== "production" ? GridScrollAreaRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  scrollDirection: PropTypes.oneOf(['left', 'right']).isRequired
} : void 0;
const GridScrollArea = fastMemo(GridScrollAreaRaw);
export { GridScrollArea };