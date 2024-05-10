"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dimensionsStateInitializer = void 0;
exports.useGridDimensions = useGridDimensions;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _throttle = require("../../../utils/throttle");
var _useGridLogger = require("../../utils/useGridLogger");
var _columns = require("../columns");
var _gridDimensionsSelectors = require("./gridDimensionsSelectors");
var _density = require("../density");
var _virtualization = require("../virtualization");
var _utils2 = require("../../utils");
var _useGridVisibleRows = require("../../utils/useGridVisibleRows");
var _gridRowsMetaSelector = require("../rows/gridRowsMetaSelector");
var _gridRowsUtils = require("../rows/gridRowsUtils");
var _gridColumnsUtils = require("../columns/gridColumnsUtils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EMPTY_SIZE = {
  width: 0,
  height: 0
};
const EMPTY_DIMENSIONS = {
  isReady: false,
  root: EMPTY_SIZE,
  viewportOuterSize: EMPTY_SIZE,
  viewportInnerSize: EMPTY_SIZE,
  contentSize: EMPTY_SIZE,
  minimumSize: EMPTY_SIZE,
  hasScrollX: false,
  hasScrollY: false,
  scrollbarSize: 0,
  headerHeight: 0,
  headerFilterHeight: 0,
  rowWidth: 0,
  rowHeight: 0,
  columnsTotalWidth: 0,
  leftPinnedWidth: 0,
  rightPinnedWidth: 0,
  headersTotalHeight: 0,
  topContainerHeight: 0,
  bottomContainerHeight: 0
};
const dimensionsStateInitializer = state => {
  const dimensions = EMPTY_DIMENSIONS;
  return (0, _extends2.default)({}, state, {
    dimensions
  });
};
exports.dimensionsStateInitializer = dimensionsStateInitializer;
function useGridDimensions(apiRef, props) {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useResizeContainer');
  const errorShown = React.useRef(false);
  const rootDimensionsRef = React.useRef(EMPTY_SIZE);
  const rowsMeta = (0, _utils2.useGridSelector)(apiRef, _gridRowsMetaSelector.gridRowsMetaSelector);
  const pinnedColumns = (0, _utils2.useGridSelector)(apiRef, _columns.gridVisiblePinnedColumnDefinitionsSelector);
  const densityFactor = (0, _utils2.useGridSelector)(apiRef, _density.gridDensityFactorSelector);
  const rowHeight = Math.floor(props.rowHeight * densityFactor);
  const headerHeight = Math.floor(props.columnHeaderHeight * densityFactor);
  const headerFilterHeight = Math.floor((props.headerFilterHeight ?? props.columnHeaderHeight) * densityFactor);
  const columnsTotalWidth = roundToDecimalPlaces((0, _columns.gridColumnsTotalWidthSelector)(apiRef), 6);
  const headersTotalHeight = (0, _gridColumnsUtils.getTotalHeaderHeight)(apiRef, props);
  const leftPinnedWidth = pinnedColumns.left.reduce((w, col) => w + col.computedWidth, 0);
  const rightPinnedWidth = pinnedColumns.right.reduce((w, col) => w + col.computedWidth, 0);
  const [savedSize, setSavedSize] = React.useState();
  const debouncedSetSavedSize = React.useMemo(() => (0, _throttle.throttle)(setSavedSize, props.resizeThrottleMs), [props.resizeThrottleMs]);
  const previousSize = React.useRef();
  const getRootDimensions = () => apiRef.current.state.dimensions;
  const setDimensions = (0, _utils.unstable_useEventCallback)(dimensions => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      dimensions
    }));
  });
  const resize = React.useCallback(() => {
    const element = apiRef.current.mainElementRef.current;
    if (!element) {
      return;
    }
    const computedStyle = (0, _utils.unstable_ownerWindow)(element).getComputedStyle(element);
    const height = parseFloat(computedStyle.height) || 0;
    const width = parseFloat(computedStyle.width) || 0;
    const hasHeightChanged = height !== previousSize.current?.height;
    const hasWidthChanged = width !== previousSize.current?.width;
    if (!previousSize.current || hasHeightChanged || hasWidthChanged) {
      const size = {
        width,
        height
      };
      apiRef.current.publishEvent('resize', size);
      previousSize.current = size;
    }
  }, [apiRef]);
  const getViewportPageSize = React.useCallback(() => {
    const dimensions = (0, _gridDimensionsSelectors.gridDimensionsSelector)(apiRef.current.state);
    if (!dimensions.isReady) {
      return 0;
    }
    const currentPage = (0, _useGridVisibleRows.getVisibleRows)(apiRef, {
      pagination: props.pagination,
      paginationMode: props.paginationMode
    });

    // TODO: Use a combination of scrollTop, dimensions.viewportInnerSize.height and rowsMeta.possitions
    // to find out the maximum number of rows that can fit in the visible part of the grid
    if (props.getRowHeight) {
      const renderContext = (0, _virtualization.gridRenderContextSelector)(apiRef);
      const viewportPageSize = renderContext.lastRowIndex - renderContext.firstRowIndex;
      return Math.min(viewportPageSize - 1, currentPage.rows.length);
    }
    const maximumPageSizeWithoutScrollBar = Math.floor(dimensions.viewportInnerSize.height / rowHeight);
    return Math.min(maximumPageSizeWithoutScrollBar, currentPage.rows.length);
  }, [apiRef, props.pagination, props.paginationMode, props.getRowHeight, rowHeight]);
  const updateDimensions = React.useCallback(() => {
    const rootElement = apiRef.current.rootElementRef.current;
    const pinnedRowsHeight = (0, _gridRowsUtils.calculatePinnedRowsHeight)(apiRef);
    const scrollbarSize = measureScrollbarSize(rootElement, columnsTotalWidth, props.scrollbarSize);
    const topContainerHeight = headersTotalHeight + pinnedRowsHeight.top;
    const bottomContainerHeight = pinnedRowsHeight.bottom;
    const nonPinnedColumnsTotalWidth = columnsTotalWidth - leftPinnedWidth - rightPinnedWidth;
    const contentSize = {
      width: nonPinnedColumnsTotalWidth,
      height: rowsMeta.currentPageTotalHeight
    };
    let viewportOuterSize;
    let viewportInnerSize;
    let hasScrollX = false;
    let hasScrollY = false;
    if (props.autoHeight) {
      hasScrollY = false;
      hasScrollX = Math.round(columnsTotalWidth) > Math.round(rootDimensionsRef.current.width);
      viewportOuterSize = {
        width: rootDimensionsRef.current.width,
        height: topContainerHeight + bottomContainerHeight + contentSize.height
      };
      viewportInnerSize = {
        width: Math.max(0, viewportOuterSize.width - (hasScrollY ? scrollbarSize : 0)),
        height: Math.max(0, viewportOuterSize.height - (hasScrollX ? scrollbarSize : 0))
      };
    } else {
      viewportOuterSize = {
        width: rootDimensionsRef.current.width,
        height: rootDimensionsRef.current.height
      };
      viewportInnerSize = {
        width: Math.max(0, viewportOuterSize.width - leftPinnedWidth - rightPinnedWidth),
        height: Math.max(0, viewportOuterSize.height - topContainerHeight - bottomContainerHeight)
      };
      const content = contentSize;
      const container = viewportInnerSize;
      const hasScrollXIfNoYScrollBar = content.width > container.width;
      const hasScrollYIfNoXScrollBar = content.height > container.height;
      if (hasScrollXIfNoYScrollBar || hasScrollYIfNoXScrollBar) {
        hasScrollY = hasScrollYIfNoXScrollBar;
        hasScrollX = content.width + (hasScrollY ? scrollbarSize : 0) > container.width;

        // We recalculate the scroll y to consider the size of the x scrollbar.
        if (hasScrollX) {
          hasScrollY = content.height + scrollbarSize > container.height;
        }
      }
      if (hasScrollY) {
        viewportInnerSize.width -= scrollbarSize;
      }
      if (hasScrollX) {
        viewportInnerSize.height -= scrollbarSize;
      }
    }
    const rowWidth = Math.max(viewportOuterSize.width, columnsTotalWidth + (hasScrollY ? scrollbarSize : 0));
    const minimumSize = {
      width: columnsTotalWidth,
      height: topContainerHeight + contentSize.height + bottomContainerHeight
    };
    const newDimensions = {
      isReady: true,
      root: rootDimensionsRef.current,
      viewportOuterSize,
      viewportInnerSize,
      contentSize,
      minimumSize,
      hasScrollX,
      hasScrollY,
      scrollbarSize,
      headerHeight,
      headerFilterHeight,
      rowWidth,
      rowHeight,
      columnsTotalWidth,
      leftPinnedWidth,
      rightPinnedWidth,
      headersTotalHeight,
      topContainerHeight,
      bottomContainerHeight
    };
    const prevDimensions = apiRef.current.state.dimensions;
    setDimensions(newDimensions);
    if (newDimensions.viewportInnerSize.width !== prevDimensions.viewportInnerSize.width || newDimensions.viewportInnerSize.height !== prevDimensions.viewportInnerSize.height) {
      apiRef.current.publishEvent('viewportInnerSizeChange', newDimensions.viewportInnerSize);
    }
    apiRef.current.updateRenderContext?.();
  }, [apiRef, setDimensions, props.scrollbarSize, props.autoHeight, rowsMeta.currentPageTotalHeight, rowHeight, headerHeight, headerFilterHeight, columnsTotalWidth, headersTotalHeight, leftPinnedWidth, rightPinnedWidth]);
  const apiPublic = {
    resize,
    getRootDimensions
  };
  const apiPrivate = {
    updateDimensions,
    getViewportPageSize
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, apiPublic, 'public');
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, apiPrivate, 'private');
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (savedSize) {
      updateDimensions();
      apiRef.current.publishEvent('debouncedResize', rootDimensionsRef.current);
    }
  }, [apiRef, savedSize, updateDimensions]);
  const root = apiRef.current.rootElementRef.current;
  const dimensions = apiRef.current.state.dimensions;
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (!root) {
      return;
    }
    const set = (k, v) => root.style.setProperty(k, v);
    set('--DataGrid-width', `${dimensions.viewportOuterSize.width}px`);
    set('--DataGrid-hasScrollX', `${Number(dimensions.hasScrollX)}`);
    set('--DataGrid-hasScrollY', `${Number(dimensions.hasScrollY)}`);
    set('--DataGrid-scrollbarSize', `${dimensions.scrollbarSize}px`);
    set('--DataGrid-rowWidth', `${dimensions.rowWidth}px`);
    set('--DataGrid-columnsTotalWidth', `${dimensions.columnsTotalWidth}px`);
    set('--DataGrid-leftPinnedWidth', `${dimensions.leftPinnedWidth}px`);
    set('--DataGrid-rightPinnedWidth', `${dimensions.rightPinnedWidth}px`);
    set('--DataGrid-headerHeight', `${dimensions.headerHeight}px`);
    set('--DataGrid-headersTotalHeight', `${dimensions.headersTotalHeight}px`);
    set('--DataGrid-topContainerHeight', `${dimensions.topContainerHeight}px`);
    set('--DataGrid-bottomContainerHeight', `${dimensions.bottomContainerHeight}px`);
    set('--height', `${dimensions.rowHeight}px`);
  }, [root, dimensions]);
  const isFirstSizing = React.useRef(true);
  const handleResize = React.useCallback(size => {
    rootDimensionsRef.current = size;

    // jsdom has no layout capabilities
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);
    if (size.height === 0 && !errorShown.current && !props.autoHeight && !isJSDOM) {
      logger.error(['The parent DOM element of the data grid has an empty height.', 'Please make sure that this element has an intrinsic height.', 'The grid displays with a height of 0px.', '', 'More details: https://mui.com/r/x-data-grid-no-dimensions.'].join('\n'));
      errorShown.current = true;
    }
    if (size.width === 0 && !errorShown.current && !isJSDOM) {
      logger.error(['The parent DOM element of the data grid has an empty width.', 'Please make sure that this element has an intrinsic width.', 'The grid displays with a width of 0px.', '', 'More details: https://mui.com/r/x-data-grid-no-dimensions.'].join('\n'));
      errorShown.current = true;
    }
    if (isFirstSizing.current) {
      // We want to initialize the grid dimensions as soon as possible to avoid flickering
      setSavedSize(size);
      isFirstSizing.current = false;
      return;
    }
    debouncedSetSavedSize(size);
  }, [props.autoHeight, debouncedSetSavedSize, logger]);
  (0, _utils.unstable_useEnhancedEffect)(updateDimensions, [updateDimensions]);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'sortedRowsSet', updateDimensions);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'paginationModelChange', updateDimensions);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnsChange', updateDimensions);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'resize', handleResize);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'debouncedResize', props.onResize);
}
function measureScrollbarSize(rootElement, columnsTotalWidth, scrollbarSize) {
  if (scrollbarSize !== undefined) {
    return scrollbarSize;
  }
  if (rootElement === null || columnsTotalWidth === 0) {
    return 0;
  }
  const doc = (0, _utils.unstable_ownerDocument)(rootElement);
  const scrollDiv = doc.createElement('div');
  scrollDiv.style.width = '99px';
  scrollDiv.style.height = '99px';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.className = 'scrollDiv';
  rootElement.appendChild(scrollDiv);
  const size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  rootElement.removeChild(scrollDiv);
  return size;
}

// Get rid of floating point imprecision errors
// https://github.com/mui/mui-x/issues/9550#issuecomment-1619020477
function roundToDecimalPlaces(value, decimals) {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}