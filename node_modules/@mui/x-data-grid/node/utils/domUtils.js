"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findGridCellElementsFromCol = findGridCellElementsFromCol;
exports.findGridCells = findGridCells;
exports.findGridElement = findGridElement;
exports.findGridHeader = findGridHeader;
exports.findGroupHeaderElementsFromField = findGroupHeaderElementsFromField;
exports.findHeaderElementFromField = findHeaderElementFromField;
exports.findLeftPinnedCellsAfterCol = findLeftPinnedCellsAfterCol;
exports.findLeftPinnedHeadersAfterCol = findLeftPinnedHeadersAfterCol;
exports.findParentElementFromClassName = findParentElementFromClassName;
exports.findRightPinnedCellsBeforeCol = findRightPinnedCellsBeforeCol;
exports.findRightPinnedHeadersBeforeCol = findRightPinnedHeadersBeforeCol;
exports.getActiveElement = void 0;
exports.getFieldFromHeaderElem = getFieldFromHeaderElem;
exports.getFieldsFromGroupHeaderElem = getFieldsFromGroupHeaderElem;
exports.getGridCellElement = getGridCellElement;
exports.getGridColumnHeaderElement = getGridColumnHeaderElement;
exports.getGridRowElement = getGridRowElement;
exports.isEventTargetInPortal = isEventTargetInPortal;
exports.isOverflown = isOverflown;
var _gridClasses = require("../constants/gridClasses");
function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
function findParentElementFromClassName(elem, className) {
  return elem.closest(`.${className}`);
}
function escapeOperandAttributeSelector(operand) {
  return operand.replace(/["\\]/g, '\\$&');
}
function getGridColumnHeaderElement(root, field) {
  return root.querySelector(`[role="columnheader"][data-field="${escapeOperandAttributeSelector(field)}"]`);
}
function getGridRowElementSelector(id) {
  return `.${_gridClasses.gridClasses.row}[data-id="${escapeOperandAttributeSelector(String(id))}"]`;
}
function getGridRowElement(root, id) {
  return root.querySelector(getGridRowElementSelector(id));
}
function getGridCellElement(root, {
  id,
  field
}) {
  const rowSelector = getGridRowElementSelector(id);
  const cellSelector = `.${_gridClasses.gridClasses.cell}[data-field="${escapeOperandAttributeSelector(field)}"]`;
  const selector = `${rowSelector} ${cellSelector}`;
  return root.querySelector(selector);
}

// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
const getActiveElement = (root = document) => {
  const activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};
exports.getActiveElement = getActiveElement;
function isEventTargetInPortal(event) {
  if (
  // The target is not an element when triggered by a Select inside the cell
  // See https://github.com/mui/material-ui/issues/10534
  event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
    return true;
  }
  return false;
}
function getFieldFromHeaderElem(colCellEl) {
  return colCellEl.getAttribute('data-field');
}
function findHeaderElementFromField(elem, field) {
  return elem.querySelector(`[data-field="${field}"]`);
}
function getFieldsFromGroupHeaderElem(colCellEl) {
  const fieldsString = colCellEl.getAttribute('data-fields');
  return fieldsString?.startsWith('|-') ? fieldsString.slice(2, -2).split('-|-') : [];
}
function findGroupHeaderElementsFromField(elem, field) {
  return Array.from(elem.querySelectorAll(`[data-fields*="|-${field}-|"]`) ?? []);
}
function findGridCellElementsFromCol(col, api) {
  const root = findParentElementFromClassName(col, _gridClasses.gridClasses.root);
  if (!root) {
    throw new Error('MUI X: The root element is not found.');
  }
  const ariaColIndex = col.getAttribute('aria-colindex');
  if (!ariaColIndex) {
    return [];
  }
  const colIndex = Number(ariaColIndex) - 1;
  const cells = [];
  if (!api.virtualScrollerRef?.current) {
    return [];
  }
  queryRows(api).forEach(rowElement => {
    const rowId = rowElement.getAttribute('data-id');
    if (!rowId) {
      return;
    }
    let columnIndex = colIndex;
    const cellColSpanInfo = api.unstable_getCellColSpanInfo(rowId, colIndex);
    if (cellColSpanInfo && cellColSpanInfo.spannedByColSpan) {
      columnIndex = cellColSpanInfo.leftVisibleCellIndex;
    }
    const cell = rowElement.querySelector(`[data-colindex="${columnIndex}"]`);
    if (cell) {
      cells.push(cell);
    }
  });
  return cells;
}
function findGridElement(api, klass) {
  return api.rootElementRef.current.querySelector(`.${_gridClasses.gridClasses[klass]}`);
}
const findPinnedCells = ({
  api,
  colIndex,
  position,
  filterFn
}) => {
  if (colIndex === null) {
    return [];
  }
  const cells = [];
  queryRows(api).forEach(rowElement => {
    const rowId = rowElement.getAttribute('data-id');
    if (!rowId) {
      return;
    }
    rowElement.querySelectorAll(`.${_gridClasses.gridClasses[position === 'left' ? 'cell--pinnedLeft' : 'cell--pinnedRight']}`).forEach(cell => {
      const currentColIndex = parseCellColIndex(cell);
      if (currentColIndex !== null && filterFn(currentColIndex)) {
        cells.push(cell);
      }
    });
  });
  return cells;
};
function findLeftPinnedCellsAfterCol(api, col) {
  const colIndex = parseCellColIndex(col);
  return findPinnedCells({
    api,
    colIndex,
    position: 'left',
    filterFn: index => index > colIndex
  });
}
function findRightPinnedCellsBeforeCol(api, col) {
  const colIndex = parseCellColIndex(col);
  return findPinnedCells({
    api,
    colIndex,
    position: 'right',
    filterFn: index => index < colIndex
  });
}
const findPinnedHeaders = ({
  api,
  colIndex,
  position,
  filterFn
}) => {
  if (!api.columnHeadersContainerRef?.current) {
    return [];
  }
  if (colIndex === null) {
    return [];
  }
  const elements = [];
  api.columnHeadersContainerRef.current.querySelectorAll(`.${_gridClasses.gridClasses[position === 'left' ? 'columnHeader--pinnedLeft' : 'columnHeader--pinnedRight']}`).forEach(element => {
    const currentColIndex = parseCellColIndex(element);
    if (currentColIndex !== null && filterFn(currentColIndex)) {
      elements.push(element);
    }
  });
  return elements;
};
function findLeftPinnedHeadersAfterCol(api, col) {
  const colIndex = parseCellColIndex(col);
  return findPinnedHeaders({
    api,
    position: 'left',
    colIndex,
    filterFn: index => index > colIndex
  });
}
function findRightPinnedHeadersBeforeCol(api, col) {
  const colIndex = parseCellColIndex(col);
  return findPinnedHeaders({
    api,
    position: 'right',
    colIndex,
    filterFn: index => index < colIndex
  });
}
function findGridHeader(api, field) {
  const headers = api.columnHeadersContainerRef.current;
  return headers.querySelector(`:scope > div > [data-field="${field}"][role="columnheader"]`);
}
function findGridCells(api, field) {
  const container = api.virtualScrollerRef.current;
  return Array.from(container.querySelectorAll(`:scope > div > div > div > [data-field="${field}"][role="gridcell"]`));
}
function queryRows(api) {
  return api.virtualScrollerRef.current.querySelectorAll(
  // Use > to ignore rows from nested data grids (for example in detail panel)
  `:scope > div > div > .${_gridClasses.gridClasses.row}`);
}
function parseCellColIndex(col) {
  const ariaColIndex = col.getAttribute('aria-colindex');
  if (!ariaColIndex) {
    return null;
  }
  return Number(ariaColIndex) - 1;
}