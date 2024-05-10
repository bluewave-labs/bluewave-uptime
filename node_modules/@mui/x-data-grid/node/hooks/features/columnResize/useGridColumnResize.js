"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnResize = exports.columnResizeStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useLazyRef = _interopRequireDefault(require("@mui/utils/useLazyRef"));
var _styles = require("@mui/material/styles");
var _domUtils = require("../../../utils/domUtils");
var _gridColumnResizeApi = require("./gridColumnResizeApi");
var _gridClasses = require("../../../constants/gridClasses");
var _utils2 = require("../../utils");
var _virtualization = require("../virtualization");
var _createControllablePromise = require("../../../utils/createControllablePromise");
var _utils3 = require("../../../utils/utils");
var _useTimeout = require("../../utils/useTimeout");
var _gridColumnsInterfaces = require("../columns/gridColumnsInterfaces");
var _columns = require("../columns");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported
let cachedSupportsTouchActionNone = false;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function trackFinger(event, currentTouchId) {
  if (currentTouchId !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === currentTouchId) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function computeNewWidth(initialOffsetToSeparator, clickX, columnBounds, resizeDirection) {
  let newWidth = initialOffsetToSeparator;
  if (resizeDirection === 'Right') {
    newWidth += clickX - columnBounds.left;
  } else {
    newWidth += columnBounds.right - clickX;
  }
  return newWidth;
}
function computeOffsetToSeparator(clickX, columnBounds, resizeDirection) {
  if (resizeDirection === 'Left') {
    return clickX - columnBounds.left;
  }
  return columnBounds.right - clickX;
}
function flipResizeDirection(side) {
  if (side === 'Right') {
    return 'Left';
  }
  return 'Right';
}
function getResizeDirection(separator, direction) {
  const side = separator.classList.contains(_gridClasses.gridClasses['columnSeparator--sideRight']) ? 'Right' : 'Left';
  if (direction === 'rtl') {
    // Resizing logic should be mirrored in the RTL case
    return flipResizeDirection(side);
  }
  return side;
}
function preventClick(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

/**
 * Checker that returns a promise that resolves when the column virtualization
 * is disabled.
 */
function useColumnVirtualizationDisabled(apiRef) {
  const promise = React.useRef();
  const selector = () => (0, _virtualization.gridVirtualizationColumnEnabledSelector)(apiRef);
  const value = (0, _utils2.useGridSelector)(apiRef, selector);
  React.useEffect(() => {
    if (promise.current && value === false) {
      promise.current.resolve();
      promise.current = undefined;
    }
  });
  const asyncCheck = () => {
    if (!promise.current) {
      if (selector() === false) {
        return Promise.resolve();
      }
      promise.current = (0, _createControllablePromise.createControllablePromise)();
    }
    return promise.current;
  };
  return asyncCheck;
}

/**
 * Basic statistical outlier detection, checks if the value is `F * IQR` away from
 * the Q1 and Q3 boundaries. IQR: interquartile range.
 */
function excludeOutliers(inputValues, factor) {
  if (inputValues.length < 4) {
    return inputValues;
  }
  const values = inputValues.slice();
  values.sort((a, b) => a - b);
  const q1 = values[Math.floor(values.length * 0.25)];
  const q3 = values[Math.floor(values.length * 0.75) - 1];
  const iqr = q3 - q1;

  // We make a small adjustment if `iqr < 5` for the cases where the IQR is
  // very small (for example zero) due to very close by values in the input data.
  // Otherwise, with an IQR of `0`, anything outside that would be considered
  // an outlier, but it makes more sense visually to allow for this 5px variance
  // rather than showing a cropped cell.
  const deviation = iqr < 5 ? 5 : iqr * factor;
  return values.filter(v => v > q1 - deviation && v < q3 + deviation);
}
function extractColumnWidths(apiRef, options, columns) {
  const widthByField = {};
  const root = apiRef.current.rootElementRef.current;
  root.classList.add(_gridClasses.gridClasses.autosizing);
  columns.forEach(column => {
    const cells = (0, _domUtils.findGridCells)(apiRef.current, column.field);
    const widths = cells.map(cell => {
      return cell.getBoundingClientRect().width ?? 0;
    });
    const filteredWidths = options.includeOutliers ? widths : excludeOutliers(widths, options.outliersFactor);
    if (options.includeHeaders) {
      const header = (0, _domUtils.findGridHeader)(apiRef.current, column.field);
      if (header) {
        const title = header.querySelector(`.${_gridClasses.gridClasses.columnHeaderTitle}`);
        const content = header.querySelector(`.${_gridClasses.gridClasses.columnHeaderTitleContainerContent}`);
        const iconContainer = header.querySelector(`.${_gridClasses.gridClasses.iconButtonContainer}`);
        const menuContainer = header.querySelector(`.${_gridClasses.gridClasses.menuIcon}`);
        const element = title ?? content;
        const style = window.getComputedStyle(header, null);
        const paddingWidth = parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
        const contentWidth = element.scrollWidth + 1;
        const width = contentWidth + paddingWidth + (iconContainer?.clientWidth ?? 0) + (menuContainer?.clientWidth ?? 0);
        filteredWidths.push(width);
      }
    }
    const hasColumnMin = column.minWidth !== -Infinity && column.minWidth !== undefined;
    const hasColumnMax = column.maxWidth !== Infinity && column.maxWidth !== undefined;
    const min = hasColumnMin ? column.minWidth : 0;
    const max = hasColumnMax ? column.maxWidth : Infinity;
    const maxContent = filteredWidths.length === 0 ? 0 : Math.max(...filteredWidths);
    widthByField[column.field] = (0, _utils3.clamp)(maxContent, min, max);
  });
  root.classList.remove(_gridClasses.gridClasses.autosizing);
  return widthByField;
}
const columnResizeStateInitializer = state => (0, _extends2.default)({}, state, {
  columnResize: {
    resizingColumnField: ''
  }
});
exports.columnResizeStateInitializer = columnResizeStateInitializer;
function createResizeRefs() {
  return {
    colDef: undefined,
    initialColWidth: 0,
    initialTotalWidth: 0,
    previousMouseClickEvent: undefined,
    columnHeaderElement: undefined,
    headerFilterElement: undefined,
    groupHeaderElements: [],
    cellElements: [],
    leftPinnedCellsAfter: [],
    rightPinnedCellsBefore: [],
    fillerLeft: undefined,
    fillerRight: undefined,
    leftPinnedHeadersAfter: [],
    rightPinnedHeadersBefore: []
  };
}

/**
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
const useGridColumnResize = (apiRef, props) => {
  const theme = (0, _styles.useTheme)();
  const logger = (0, _utils2.useGridLogger)(apiRef, 'useGridColumnResize');
  const refs = (0, _useLazyRef.default)(createResizeRefs).current;

  // To improve accessibility, the separator has padding on both sides.
  // Clicking inside the padding area should be treated as a click in the separator.
  // This ref stores the offset between the click and the separator.
  const initialOffsetToSeparator = React.useRef();
  const resizeDirection = React.useRef();
  const stopResizeEventTimeout = (0, _useTimeout.useTimeout)();
  const touchId = React.useRef();
  const updateWidth = newWidth => {
    logger.debug(`Updating width to ${newWidth} for col ${refs.colDef.field}`);
    const prevWidth = refs.columnHeaderElement.offsetWidth;
    const widthDiff = newWidth - prevWidth;
    const columnWidthDiff = newWidth - refs.initialColWidth;
    const newTotalWidth = refs.initialTotalWidth + columnWidthDiff;
    apiRef.current.rootElementRef?.current?.style.setProperty('--DataGrid-rowWidth', `${newTotalWidth}px`);
    refs.colDef.computedWidth = newWidth;
    refs.colDef.width = newWidth;
    refs.colDef.flex = 0;
    refs.columnHeaderElement.style.width = `${newWidth}px`;
    refs.columnHeaderElement.style.minWidth = `${newWidth}px`;
    refs.columnHeaderElement.style.maxWidth = `${newWidth}px`;
    const headerFilterElement = refs.headerFilterElement;
    if (headerFilterElement) {
      headerFilterElement.style.width = `${newWidth}px`;
      headerFilterElement.style.minWidth = `${newWidth}px`;
      headerFilterElement.style.maxWidth = `${newWidth}px`;
    }
    refs.groupHeaderElements.forEach(element => {
      const div = element;
      let finalWidth;
      if (div.getAttribute('aria-colspan') === '1') {
        finalWidth = `${newWidth}px`;
      } else {
        // Cell with colspan > 1 cannot be just updated width new width.
        // Instead, we add width diff to the current width.
        finalWidth = `${div.offsetWidth + widthDiff}px`;
      }
      div.style.width = finalWidth;
      div.style.minWidth = finalWidth;
      div.style.maxWidth = finalWidth;
    });
    refs.cellElements.forEach(element => {
      const div = element;
      let finalWidth;
      if (div.getAttribute('aria-colspan') === '1') {
        finalWidth = `${newWidth}px`;
      } else {
        // Cell with colspan > 1 cannot be just updated width new width.
        // Instead, we add width diff to the current width.
        finalWidth = `${div.offsetWidth + widthDiff}px`;
      }
      div.style.setProperty('--width', finalWidth);
    });
    const pinnedPosition = apiRef.current.unstable_applyPipeProcessors('isColumnPinned', false, refs.colDef.field);
    if (pinnedPosition === _gridColumnsInterfaces.GridPinnedColumnPosition.LEFT) {
      updateProperty(refs.fillerLeft, 'width', widthDiff);
      refs.leftPinnedCellsAfter.forEach(cell => {
        updateProperty(cell, 'left', widthDiff);
      });
      refs.leftPinnedHeadersAfter.forEach(header => {
        updateProperty(header, 'left', widthDiff);
      });
    }
    if (pinnedPosition === _gridColumnsInterfaces.GridPinnedColumnPosition.RIGHT) {
      updateProperty(refs.fillerRight, 'width', widthDiff);
      refs.rightPinnedCellsBefore.forEach(cell => {
        updateProperty(cell, 'right', widthDiff);
      });
      refs.rightPinnedHeadersBefore.forEach(header => {
        updateProperty(header, 'right', widthDiff);
      });
    }
  };
  const finishResize = nativeEvent => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();

    // Prevent double-clicks from being interpreted as two separate clicks
    if (refs.previousMouseClickEvent) {
      const prevEvent = refs.previousMouseClickEvent;
      const prevTimeStamp = prevEvent.timeStamp;
      const prevClientX = prevEvent.clientX;
      const prevClientY = prevEvent.clientY;

      // Check if the current event is part of a double-click
      if (nativeEvent.timeStamp - prevTimeStamp < 300 && nativeEvent.clientX === prevClientX && nativeEvent.clientY === prevClientY) {
        refs.previousMouseClickEvent = undefined;
        return;
      }
    }
    if (refs.colDef) {
      apiRef.current.setColumnWidth(refs.colDef.field, refs.colDef.width);
      logger.debug(`Updating col ${refs.colDef.field} with new width: ${refs.colDef.width}`);
      const columnsState = (0, _columns.gridColumnsStateSelector)(apiRef.current.state);
      refs.groupHeaderElements.forEach(element => {
        const fields = (0, _domUtils.getFieldsFromGroupHeaderElem)(element);
        const div = element;
        const newWidth = fields.reduce((acc, field) => {
          if (columnsState.columnVisibilityModel[field] !== false) {
            return acc + columnsState.lookup[field].computedWidth;
          }
          return acc;
        }, 0);
        const finalWidth = `${newWidth}px`;
        div.style.width = finalWidth;
        div.style.minWidth = finalWidth;
        div.style.maxWidth = finalWidth;
      });
    }
    stopResizeEventTimeout.start(0, () => {
      apiRef.current.publishEvent('columnResizeStop', null, nativeEvent);
    });
  };
  const storeReferences = (colDef, separator, xStart) => {
    const root = apiRef.current.rootElementRef.current;
    refs.initialColWidth = colDef.computedWidth;
    refs.initialTotalWidth = apiRef.current.getRootDimensions().rowWidth;
    refs.colDef = colDef;
    refs.columnHeaderElement = (0, _domUtils.findHeaderElementFromField)(apiRef.current.columnHeadersContainerRef.current, colDef.field);
    const headerFilterElement = root.querySelector(`.${_gridClasses.gridClasses.headerFilterRow} [data-field="${colDef.field}"]`);
    if (headerFilterElement) {
      refs.headerFilterElement = headerFilterElement;
    }
    refs.groupHeaderElements = (0, _domUtils.findGroupHeaderElementsFromField)(apiRef.current.columnHeadersContainerRef?.current, colDef.field);
    refs.cellElements = (0, _domUtils.findGridCellElementsFromCol)(refs.columnHeaderElement, apiRef.current);
    refs.fillerLeft = (0, _domUtils.findGridElement)(apiRef.current, 'filler--pinnedLeft');
    refs.fillerRight = (0, _domUtils.findGridElement)(apiRef.current, 'filler--pinnedRight');
    const pinnedPosition = apiRef.current.unstable_applyPipeProcessors('isColumnPinned', false, refs.colDef.field);
    refs.leftPinnedCellsAfter = pinnedPosition !== _gridColumnsInterfaces.GridPinnedColumnPosition.LEFT ? [] : (0, _domUtils.findLeftPinnedCellsAfterCol)(apiRef.current, refs.columnHeaderElement);
    refs.rightPinnedCellsBefore = pinnedPosition !== _gridColumnsInterfaces.GridPinnedColumnPosition.RIGHT ? [] : (0, _domUtils.findRightPinnedCellsBeforeCol)(apiRef.current, refs.columnHeaderElement);
    refs.leftPinnedHeadersAfter = pinnedPosition !== _gridColumnsInterfaces.GridPinnedColumnPosition.LEFT ? [] : (0, _domUtils.findLeftPinnedHeadersAfterCol)(apiRef.current, refs.columnHeaderElement);
    refs.rightPinnedHeadersBefore = pinnedPosition !== _gridColumnsInterfaces.GridPinnedColumnPosition.RIGHT ? [] : (0, _domUtils.findRightPinnedHeadersBeforeCol)(apiRef.current, refs.columnHeaderElement);
    resizeDirection.current = getResizeDirection(separator, theme.direction);
    initialOffsetToSeparator.current = computeOffsetToSeparator(xStart, refs.columnHeaderElement.getBoundingClientRect(), resizeDirection.current);
  };
  const handleResizeMouseUp = (0, _utils.unstable_useEventCallback)(finishResize);
  const handleResizeMouseMove = (0, _utils.unstable_useEventCallback)(nativeEvent => {
    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    if (nativeEvent.buttons === 0) {
      handleResizeMouseUp(nativeEvent);
      return;
    }
    let newWidth = computeNewWidth(initialOffsetToSeparator.current, nativeEvent.clientX, refs.columnHeaderElement.getBoundingClientRect(), resizeDirection.current);
    newWidth = (0, _utils3.clamp)(newWidth, refs.colDef.minWidth, refs.colDef.maxWidth);
    updateWidth(newWidth);
    const params = {
      element: refs.columnHeaderElement,
      colDef: refs.colDef,
      width: newWidth
    };
    apiRef.current.publishEvent('columnResize', params, nativeEvent);
  });
  const handleTouchEnd = (0, _utils.unstable_useEventCallback)(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }
    finishResize(nativeEvent);
  });
  const handleTouchMove = (0, _utils.unstable_useEventCallback)(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }

    // Cancel move in case some other element consumed a touchmove event and it was not fired.
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    let newWidth = computeNewWidth(initialOffsetToSeparator.current, finger.x, refs.columnHeaderElement.getBoundingClientRect(), resizeDirection.current);
    newWidth = (0, _utils3.clamp)(newWidth, refs.colDef.minWidth, refs.colDef.maxWidth);
    updateWidth(newWidth);
    const params = {
      element: refs.columnHeaderElement,
      colDef: refs.colDef,
      width: newWidth
    };
    apiRef.current.publishEvent('columnResize', params, nativeEvent);
  });
  const handleTouchStart = (0, _utils.unstable_useEventCallback)(event => {
    const cellSeparator = (0, _domUtils.findParentElementFromClassName)(event.target, _gridClasses.gridClasses['columnSeparator--resizable']);
    // Let the event bubble if the target is not a col separator
    if (!cellSeparator) {
      return;
    }
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      event.preventDefault();
    }
    const touch = event.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const columnHeaderElement = (0, _domUtils.findParentElementFromClassName)(event.target, _gridClasses.gridClasses.columnHeader);
    const field = (0, _domUtils.getFieldFromHeaderElem)(columnHeaderElement);
    const colDef = apiRef.current.getColumn(field);
    logger.debug(`Start Resize on col ${colDef.field}`);
    apiRef.current.publishEvent('columnResizeStart', {
      field
    }, event);
    storeReferences(colDef, cellSeparator, touch.clientX);
    const doc = (0, _utils.unstable_ownerDocument)(event.currentTarget);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });
  const stopListening = React.useCallback(() => {
    const doc = (0, _utils.unstable_ownerDocument)(apiRef.current.rootElementRef.current);
    doc.body.style.removeProperty('cursor');
    doc.removeEventListener('mousemove', handleResizeMouseMove);
    doc.removeEventListener('mouseup', handleResizeMouseUp);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
    // The click event runs right after the mouseup event, we want to wait until it
    // has been canceled before removing our handler.
    setTimeout(() => {
      doc.removeEventListener('click', preventClick, true);
    }, 100);
    if (refs.columnHeaderElement) {
      refs.columnHeaderElement.style.pointerEvents = 'unset';
    }
  }, [apiRef, refs, handleResizeMouseMove, handleResizeMouseUp, handleTouchMove, handleTouchEnd]);
  const handleResizeStart = React.useCallback(({
    field
  }) => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      columnResize: (0, _extends2.default)({}, state.columnResize, {
        resizingColumnField: field
      })
    }));
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const handleResizeStop = React.useCallback(() => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      columnResize: (0, _extends2.default)({}, state.columnResize, {
        resizingColumnField: ''
      })
    }));
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const handleColumnResizeMouseDown = (0, _utils.unstable_useEventCallback)(({
    colDef
  }, event) => {
    // Only handle left clicks
    if (event.button !== 0) {
      return;
    }

    // Skip if the column isn't resizable
    if (!event.currentTarget.classList.contains(_gridClasses.gridClasses['columnSeparator--resizable'])) {
      return;
    }

    // Avoid text selection
    event.preventDefault();
    logger.debug(`Start Resize on col ${colDef.field}`);
    apiRef.current.publishEvent('columnResizeStart', {
      field: colDef.field
    }, event);
    storeReferences(colDef, event.currentTarget, event.clientX);
    const doc = (0, _utils.unstable_ownerDocument)(apiRef.current.rootElementRef.current);
    doc.body.style.cursor = 'col-resize';
    refs.previousMouseClickEvent = event.nativeEvent;
    doc.addEventListener('mousemove', handleResizeMouseMove);
    doc.addEventListener('mouseup', handleResizeMouseUp);

    // Prevent the click event if we have resized the column.
    // Fixes https://github.com/mui/mui-x/issues/4777
    doc.addEventListener('click', preventClick, true);
  });
  const handleColumnSeparatorDoubleClick = (0, _utils.unstable_useEventCallback)((params, event) => {
    if (props.disableAutosize) {
      return;
    }

    // Only handle left clicks
    if (event.button !== 0) {
      return;
    }
    const column = apiRef.current.state.columns.lookup[params.field];
    if (column.resizable === false) {
      return;
    }
    apiRef.current.autosizeColumns((0, _extends2.default)({}, props.autosizeOptions, {
      columns: [column.field]
    }));
  });

  /**
   * API METHODS
   */

  const columnVirtualizationDisabled = useColumnVirtualizationDisabled(apiRef);
  const isAutosizingRef = React.useRef(false);
  const autosizeColumns = React.useCallback(async userOptions => {
    const root = apiRef.current.rootElementRef?.current;
    if (!root) {
      return;
    }
    if (isAutosizingRef.current) {
      return;
    }
    isAutosizingRef.current = true;
    const state = (0, _columns.gridColumnsStateSelector)(apiRef.current.state);
    const options = (0, _extends2.default)({}, _gridColumnResizeApi.DEFAULT_GRID_AUTOSIZE_OPTIONS, userOptions, {
      columns: userOptions?.columns ?? state.orderedFields
    });
    options.columns = options.columns.filter(c => state.columnVisibilityModel[c] !== false);
    const columns = options.columns.map(c => apiRef.current.state.columns.lookup[c]);
    try {
      apiRef.current.unstable_setColumnVirtualization(false);
      await columnVirtualizationDisabled();
      const widthByField = extractColumnWidths(apiRef, options, columns);
      const newColumns = columns.map(column => (0, _extends2.default)({}, column, {
        width: widthByField[column.field],
        computedWidth: widthByField[column.field]
      }));
      if (options.expand) {
        const visibleColumns = state.orderedFields.map(field => state.lookup[field]).filter(c => state.columnVisibilityModel[c.field] !== false);
        const totalWidth = visibleColumns.reduce((total, column) => total + (widthByField[column.field] ?? column.computedWidth ?? column.width), 0);
        const availableWidth = apiRef.current.getRootDimensions().viewportInnerSize.width;
        const remainingWidth = availableWidth - totalWidth;
        if (remainingWidth > 0) {
          const widthPerColumn = remainingWidth / (newColumns.length || 1);
          newColumns.forEach(column => {
            column.width += widthPerColumn;
            column.computedWidth += widthPerColumn;
          });
        }
      }
      apiRef.current.updateColumns(newColumns);
      newColumns.forEach((newColumn, index) => {
        if (newColumn.width !== columns[index].width) {
          const width = newColumn.width;
          apiRef.current.publishEvent('columnWidthChange', {
            element: apiRef.current.getColumnHeaderElement(newColumn.field),
            colDef: newColumn,
            width
          });
        }
      });
    } finally {
      apiRef.current.unstable_setColumnVirtualization(true);
      isAutosizingRef.current = false;
    }
  }, [apiRef, columnVirtualizationDisabled]);

  /**
   * EFFECTS
   */

  React.useEffect(() => stopListening, [stopListening]);
  (0, _utils2.useOnMount)(() => {
    if (props.autosizeOnMount) {
      Promise.resolve().then(() => {
        apiRef.current.autosizeColumns(props.autosizeOptions);
      });
    }
  });
  (0, _utils2.useGridNativeEventListener)(apiRef, () => apiRef.current.columnHeadersContainerRef?.current, 'touchstart', handleTouchStart, {
    passive: doesSupportTouchActionNone()
  });
  (0, _utils2.useGridApiMethod)(apiRef, {
    autosizeColumns
  }, 'public');
  (0, _utils2.useGridApiEventHandler)(apiRef, 'columnResizeStop', handleResizeStop);
  (0, _utils2.useGridApiEventHandler)(apiRef, 'columnResizeStart', handleResizeStart);
  (0, _utils2.useGridApiEventHandler)(apiRef, 'columnSeparatorMouseDown', handleColumnResizeMouseDown);
  (0, _utils2.useGridApiEventHandler)(apiRef, 'columnSeparatorDoubleClick', handleColumnSeparatorDoubleClick);
  (0, _utils2.useGridApiOptionHandler)(apiRef, 'columnResize', props.onColumnResize);
  (0, _utils2.useGridApiOptionHandler)(apiRef, 'columnWidthChange', props.onColumnWidthChange);
};
exports.useGridColumnResize = useGridColumnResize;
function updateProperty(element, property, delta) {
  if (!element) {
    return;
  }
  element.style[property] = `${parseInt(element.style[property], 10) + delta}px`;
}