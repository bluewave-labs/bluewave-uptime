"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeSortModel = exports.mergeStateWithSortModel = exports.gridStringOrNumberComparator = exports.gridNumberComparator = exports.gridDateComparator = exports.getNextGridSortDirection = exports.buildAggregatedSortingApplier = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _warning = require("../../../utils/warning");
const sortModelDisableMultiColumnsSortingWarning = (0, _warning.buildWarning)(['MUI X: The `sortModel` can only contain a single item when the `disableMultipleColumnsSorting` prop is set to `true`.', 'If you are using the community version of the `DataGrid`, this prop is always `true`.'], 'error');
const sanitizeSortModel = (model, disableMultipleColumnsSorting) => {
  if (disableMultipleColumnsSorting && model.length > 1) {
    if (process.env.NODE_ENV !== 'production') {
      sortModelDisableMultiColumnsSortingWarning();
    }
    return [model[0]];
  }
  return model;
};
exports.sanitizeSortModel = sanitizeSortModel;
const mergeStateWithSortModel = (sortModel, disableMultipleColumnsSorting) => state => (0, _extends2.default)({}, state, {
  sorting: (0, _extends2.default)({}, state.sorting, {
    sortModel: sanitizeSortModel(sortModel, disableMultipleColumnsSorting)
  })
});
exports.mergeStateWithSortModel = mergeStateWithSortModel;
const isDesc = direction => direction === 'desc';

/**
 * Transform an item of the sorting model into a method comparing two rows.
 * @param {GridSortItem} sortItem The sort item we want to apply.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridParsedSortItem | null} The parsed sort item. Returns `null` is the sort item is not valid.
 */
const parseSortItem = (sortItem, apiRef) => {
  const column = apiRef.current.getColumn(sortItem.field);
  if (!column || sortItem.sort === null) {
    return null;
  }
  let comparator;
  if (column.getSortComparator) {
    comparator = column.getSortComparator(sortItem.sort);
  } else {
    comparator = isDesc(sortItem.sort) ? (...args) => -1 * column.sortComparator(...args) : column.sortComparator;
  }
  if (!comparator) {
    return null;
  }
  const getSortCellParams = id => ({
    id,
    field: column.field,
    rowNode: apiRef.current.getRowNode(id),
    value: apiRef.current.getCellValue(id, column.field),
    api: apiRef.current
  });
  return {
    getSortCellParams,
    comparator
  };
};
/**
 * Compare two rows according to a list of valid sort items.
 * The `row1Params` and `row2Params` must have the same length as `parsedSortItems`,
 * and each of their index must contain the `GridSortCellParams` of the sort item with the same index.
 * @param {GridParsedSortItem[]} parsedSortItems All the sort items with which we want to compare the rows.
 * @param {GridRowAggregatedSortingParams} row1 The node and params of the 1st row for each sort item.
 * @param {GridRowAggregatedSortingParams} row2 The node and params of the 2nd row for each sort item.
 */
const compareRows = (parsedSortItems, row1, row2) => {
  return parsedSortItems.reduce((res, item, index) => {
    if (res !== 0) {
      // return the results of the first comparator which distinguish the two rows
      return res;
    }
    const sortCellParams1 = row1.params[index];
    const sortCellParams2 = row2.params[index];
    res = item.comparator(sortCellParams1.value, sortCellParams2.value, sortCellParams1, sortCellParams2);
    return res;
  }, 0);
};

/**
 * Generates a method to easily sort a list of rows according to the current sort model.
 * @param {GridSortModel} sortModel The model with which we want to sort the rows.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridSortingModelApplier | null} A method that generates a list of sorted row ids from a list of rows according to the current sort model. If `null`, we consider that the rows should remain in the order there were provided.
 */
const buildAggregatedSortingApplier = (sortModel, apiRef) => {
  const comparatorList = sortModel.map(item => parseSortItem(item, apiRef)).filter(comparator => !!comparator);
  if (comparatorList.length === 0) {
    return null;
  }
  return rowList => rowList.map(node => ({
    node,
    params: comparatorList.map(el => el.getSortCellParams(node.id))
  })).sort((a, b) => compareRows(comparatorList, a, b)).map(row => row.node.id);
};
exports.buildAggregatedSortingApplier = buildAggregatedSortingApplier;
const getNextGridSortDirection = (sortingOrder, current) => {
  const currentIdx = sortingOrder.indexOf(current);
  if (!current || currentIdx === -1 || currentIdx + 1 === sortingOrder.length) {
    return sortingOrder[0];
  }
  return sortingOrder[currentIdx + 1];
};
exports.getNextGridSortDirection = getNextGridSortDirection;
const gridNillComparator = (v1, v2) => {
  if (v1 == null && v2 != null) {
    return -1;
  }
  if (v2 == null && v1 != null) {
    return 1;
  }
  if (v1 == null && v2 == null) {
    return 0;
  }
  return null;
};
const collator = new Intl.Collator();
const gridStringOrNumberComparator = (value1, value2) => {
  const nillResult = gridNillComparator(value1, value2);
  if (nillResult !== null) {
    return nillResult;
  }
  if (typeof value1 === 'string') {
    return collator.compare(value1.toString(), value2.toString());
  }
  return value1 - value2;
};
exports.gridStringOrNumberComparator = gridStringOrNumberComparator;
const gridNumberComparator = (value1, value2) => {
  const nillResult = gridNillComparator(value1, value2);
  if (nillResult !== null) {
    return nillResult;
  }
  return Number(value1) - Number(value2);
};
exports.gridNumberComparator = gridNumberComparator;
const gridDateComparator = (value1, value2) => {
  const nillResult = gridNillComparator(value1, value2);
  if (nillResult !== null) {
    return nillResult;
  }
  if (value1 > value2) {
    return 1;
  }
  if (value1 < value2) {
    return -1;
  }
  return 0;
};
exports.gridDateComparator = gridDateComparator;