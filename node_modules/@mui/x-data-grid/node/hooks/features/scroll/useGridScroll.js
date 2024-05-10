"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridScroll = void 0;
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _useGridLogger = require("../../utils/useGridLogger");
var _gridColumnsSelector = require("../columns/gridColumnsSelector");
var _useGridSelector = require("../../utils/useGridSelector");
var _gridPaginationSelector = require("../pagination/gridPaginationSelector");
var _gridRowsSelector = require("../rows/gridRowsSelector");
var _gridRowsMetaSelector = require("../rows/gridRowsMetaSelector");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _gridFilterSelector = require("../filter/gridFilterSelector");
var _dimensions = require("../dimensions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
// Similar to https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
function scrollIntoView(dimensions) {
  const {
    clientHeight,
    scrollTop,
    offsetHeight,
    offsetTop
  } = dimensions;
  const elementBottom = offsetTop + offsetHeight;
  // Always scroll to top when cell is higher than viewport to avoid scroll jump
  // See https://github.com/mui/mui-x/issues/4513 and https://github.com/mui/mui-x/issues/4514
  if (offsetHeight > clientHeight) {
    return offsetTop;
  }
  if (elementBottom - clientHeight > scrollTop) {
    return elementBottom - clientHeight;
  }
  if (offsetTop < scrollTop) {
    return offsetTop;
  }
  return undefined;
}

/**
 * @requires useGridPagination (state) - can be after, async only
 * @requires useGridColumns (state) - can be after, async only
 * @requires useGridRows (state) - can be after, async only
 * @requires useGridRowsMeta (state) - can be after, async only
 * @requires useGridFilter (state)
 * @requires useGridColumnSpanning (method)
 */
const useGridScroll = (apiRef, props) => {
  const theme = (0, _styles.useTheme)();
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridScroll');
  const colRef = apiRef.current.columnHeadersContainerRef;
  const virtualScrollerRef = apiRef.current.virtualScrollerRef;
  const visibleSortedRows = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridExpandedSortedRowEntriesSelector);
  const scrollToIndexes = React.useCallback(params => {
    const dimensions = (0, _dimensions.gridDimensionsSelector)(apiRef.current.state);
    const totalRowCount = (0, _gridRowsSelector.gridRowCountSelector)(apiRef);
    const visibleColumns = (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef);
    const scrollToHeader = params.rowIndex == null;
    if (!scrollToHeader && totalRowCount === 0 || visibleColumns.length === 0) {
      return false;
    }
    logger.debug(`Scrolling to cell at row ${params.rowIndex}, col: ${params.colIndex} `);
    let scrollCoordinates = {};
    if (params.colIndex !== undefined) {
      const columnPositions = (0, _gridColumnsSelector.gridColumnPositionsSelector)(apiRef);
      let cellWidth;
      if (typeof params.rowIndex !== 'undefined') {
        const rowId = visibleSortedRows[params.rowIndex]?.id;
        const cellColSpanInfo = apiRef.current.unstable_getCellColSpanInfo(rowId, params.colIndex);
        if (cellColSpanInfo && !cellColSpanInfo.spannedByColSpan) {
          cellWidth = cellColSpanInfo.cellProps.width;
        }
      }
      if (typeof cellWidth === 'undefined') {
        cellWidth = visibleColumns[params.colIndex].computedWidth;
      }
      // When using RTL, `scrollLeft` becomes negative, so we must ensure that we only compare values.
      scrollCoordinates.left = scrollIntoView({
        clientHeight: dimensions.viewportInnerSize.width,
        scrollTop: Math.abs(virtualScrollerRef.current.scrollLeft),
        offsetHeight: cellWidth,
        offsetTop: columnPositions[params.colIndex]
      });
    }
    if (params.rowIndex !== undefined) {
      const rowsMeta = (0, _gridRowsMetaSelector.gridRowsMetaSelector)(apiRef.current.state);
      const page = (0, _gridPaginationSelector.gridPageSelector)(apiRef);
      const pageSize = (0, _gridPaginationSelector.gridPageSizeSelector)(apiRef);
      const elementIndex = !props.pagination ? params.rowIndex : params.rowIndex - page * pageSize;
      const targetOffsetHeight = rowsMeta.positions[elementIndex + 1] ? rowsMeta.positions[elementIndex + 1] - rowsMeta.positions[elementIndex] : rowsMeta.currentPageTotalHeight - rowsMeta.positions[elementIndex];
      scrollCoordinates.top = scrollIntoView({
        clientHeight: dimensions.viewportInnerSize.height,
        scrollTop: virtualScrollerRef.current.scrollTop,
        offsetHeight: targetOffsetHeight,
        offsetTop: rowsMeta.positions[elementIndex]
      });
    }
    scrollCoordinates = apiRef.current.unstable_applyPipeProcessors('scrollToIndexes', scrollCoordinates, params);
    if (typeof scrollCoordinates.left !== undefined || typeof scrollCoordinates.top !== undefined) {
      apiRef.current.scroll(scrollCoordinates);
      return true;
    }
    return false;
  }, [logger, apiRef, virtualScrollerRef, props.pagination, visibleSortedRows]);
  const scroll = React.useCallback(params => {
    if (virtualScrollerRef.current && params.left !== undefined && colRef.current) {
      const direction = theme.direction === 'rtl' ? -1 : 1;
      colRef.current.scrollLeft = params.left;
      virtualScrollerRef.current.scrollLeft = direction * params.left;
      logger.debug(`Scrolling left: ${params.left}`);
    }
    if (virtualScrollerRef.current && params.top !== undefined) {
      virtualScrollerRef.current.scrollTop = params.top;
      logger.debug(`Scrolling top: ${params.top}`);
    }
    logger.debug(`Scrolling, updating container, and viewport`);
  }, [virtualScrollerRef, theme.direction, colRef, logger]);
  const getScrollPosition = React.useCallback(() => {
    if (!virtualScrollerRef?.current) {
      return {
        top: 0,
        left: 0
      };
    }
    return {
      top: virtualScrollerRef.current.scrollTop,
      left: virtualScrollerRef.current.scrollLeft
    };
  }, [virtualScrollerRef]);
  const scrollApi = {
    scroll,
    scrollToIndexes,
    getScrollPosition
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, scrollApi, 'public');
};
exports.useGridScroll = useGridScroll;