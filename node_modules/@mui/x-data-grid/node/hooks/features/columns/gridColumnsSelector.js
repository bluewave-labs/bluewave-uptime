"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridVisiblePinnedColumnDefinitionsSelector = exports.gridVisibleColumnFieldsSelector = exports.gridVisibleColumnDefinitionsSelector = exports.gridPinnedColumnsSelector = exports.gridHasColSpanSelector = exports.gridFilterableColumnLookupSelector = exports.gridFilterableColumnDefinitionsSelector = exports.gridColumnsTotalWidthSelector = exports.gridColumnsStateSelector = exports.gridColumnVisibilityModelSelector = exports.gridColumnPositionsSelector = exports.gridColumnLookupSelector = exports.gridColumnFieldsSelector = exports.gridColumnDefinitionsSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
var _gridColumnsInterfaces = require("./gridColumnsInterfaces");
var _gridCoreSelector = require("../../core/gridCoreSelector");
/**
 * Get the columns state
 * @category Columns
 */
const gridColumnsStateSelector = state => state.columns;

/**
 * Get an array of column fields in the order rendered on screen.
 * @category Columns
 */
exports.gridColumnsStateSelector = gridColumnsStateSelector;
const gridColumnFieldsSelector = exports.gridColumnFieldsSelector = (0, _createSelector.createSelector)(gridColumnsStateSelector, columnsState => columnsState.orderedFields);

/**
 * Get the columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */
const gridColumnLookupSelector = exports.gridColumnLookupSelector = (0, _createSelector.createSelector)(gridColumnsStateSelector, columnsState => columnsState.lookup);

/**
 * Get an array of column definitions in the order rendered on screen..
 * @category Columns
 */
const gridColumnDefinitionsSelector = exports.gridColumnDefinitionsSelector = (0, _createSelector.createSelectorMemoized)(gridColumnFieldsSelector, gridColumnLookupSelector, (allFields, lookup) => allFields.map(field => lookup[field]));

/**
 * Get the column visibility model, containing the visibility status of each column.
 * If a column is not registered in the model, it is visible.
 * @category Visible Columns
 */
const gridColumnVisibilityModelSelector = exports.gridColumnVisibilityModelSelector = (0, _createSelector.createSelector)(gridColumnsStateSelector, columnsState => columnsState.columnVisibilityModel);

/**
 * Get the visible columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Visible Columns
 */
const gridVisibleColumnDefinitionsSelector = exports.gridVisibleColumnDefinitionsSelector = (0, _createSelector.createSelectorMemoized)(gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector, (columns, columnVisibilityModel) => columns.filter(column => columnVisibilityModel[column.field] !== false));

/**
 * Get the field of each visible column.
 * @category Visible Columns
 */
const gridVisibleColumnFieldsSelector = exports.gridVisibleColumnFieldsSelector = (0, _createSelector.createSelectorMemoized)(gridVisibleColumnDefinitionsSelector, visibleColumns => visibleColumns.map(column => column.field));

/**
 * Get the visible pinned columns model.
 * @category Visible Columns
 */
const gridPinnedColumnsSelector = state => state.pinnedColumns;

/**
 * Get the visible pinned columns.
 * @category Visible Columns
 */
exports.gridPinnedColumnsSelector = gridPinnedColumnsSelector;
const gridVisiblePinnedColumnDefinitionsSelector = exports.gridVisiblePinnedColumnDefinitionsSelector = (0, _createSelector.createSelectorMemoized)(gridColumnsStateSelector, gridPinnedColumnsSelector, gridVisibleColumnFieldsSelector, _gridCoreSelector.gridThemeSelector, (columnsState, model, visibleColumnFields, theme) => {
  const visiblePinnedFields = filterVisibleColumns(model, visibleColumnFields, theme.direction === 'rtl');
  const visiblePinnedColumns = {
    left: visiblePinnedFields.left.map(field => columnsState.lookup[field]),
    right: visiblePinnedFields.right.map(field => columnsState.lookup[field])
  };
  return visiblePinnedColumns;
});
function filterVisibleColumns(pinnedColumns, columns, invert) {
  if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
    return _gridColumnsInterfaces.EMPTY_PINNED_COLUMN_FIELDS;
  }
  if (pinnedColumns.left?.length === 0 && pinnedColumns.right?.length === 0) {
    return _gridColumnsInterfaces.EMPTY_PINNED_COLUMN_FIELDS;
  }
  const filter = (newPinnedColumns, remainingColumns) => {
    if (!Array.isArray(newPinnedColumns)) {
      return [];
    }
    return newPinnedColumns.filter(field => remainingColumns.includes(field));
  };
  const leftPinnedColumns = filter(pinnedColumns.left, columns);
  const columnsWithoutLeftPinnedColumns = columns.filter(
  // Filter out from the remaining columns those columns already pinned to the left
  field => !leftPinnedColumns.includes(field));
  const rightPinnedColumns = filter(pinnedColumns.right, columnsWithoutLeftPinnedColumns);
  if (invert) {
    return {
      left: rightPinnedColumns,
      right: leftPinnedColumns
    };
  }
  return {
    left: leftPinnedColumns,
    right: rightPinnedColumns
  };
}

/**
 * Get the left position in pixel of each visible columns relative to the left of the first column.
 * @category Visible Columns
 */
const gridColumnPositionsSelector = exports.gridColumnPositionsSelector = (0, _createSelector.createSelectorMemoized)(gridVisibleColumnDefinitionsSelector, visibleColumns => {
  const positions = [];
  let currentPosition = 0;
  for (let i = 0; i < visibleColumns.length; i += 1) {
    positions.push(currentPosition);
    currentPosition += visibleColumns[i].computedWidth;
  }
  return positions;
});

/**
 * Get the summed width of all the visible columns.
 * @category Visible Columns
 */
const gridColumnsTotalWidthSelector = exports.gridColumnsTotalWidthSelector = (0, _createSelector.createSelector)(gridVisibleColumnDefinitionsSelector, gridColumnPositionsSelector, (visibleColumns, positions) => {
  const colCount = visibleColumns.length;
  if (colCount === 0) {
    return 0;
  }
  return positions[colCount - 1] + visibleColumns[colCount - 1].computedWidth;
});

/**
 * Get the filterable columns as an array.
 * @category Columns
 */
const gridFilterableColumnDefinitionsSelector = exports.gridFilterableColumnDefinitionsSelector = (0, _createSelector.createSelectorMemoized)(gridColumnDefinitionsSelector, columns => columns.filter(col => col.filterable));

/**
 * Get the filterable columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */
const gridFilterableColumnLookupSelector = exports.gridFilterableColumnLookupSelector = (0, _createSelector.createSelectorMemoized)(gridColumnDefinitionsSelector, columns => columns.reduce((acc, col) => {
  if (col.filterable) {
    acc[col.field] = col;
  }
  return acc;
}, {}));

/**
 * Checks if some column has a colSpan field.
 * @category Columns
 * @ignore - Do not document
 */
const gridHasColSpanSelector = exports.gridHasColSpanSelector = (0, _createSelector.createSelectorMemoized)(gridColumnDefinitionsSelector, columns => columns.some(column => column.colSpan !== undefined));