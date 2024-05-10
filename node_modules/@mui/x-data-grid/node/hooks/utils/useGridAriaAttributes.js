"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridAriaAttributes = void 0;
var _gridColumnsSelector = require("../features/columns/gridColumnsSelector");
var _useGridSelector = require("./useGridSelector");
var _useGridRootProps = require("./useGridRootProps");
var _gridColumnGroupsSelector = require("../features/columnGrouping/gridColumnGroupsSelector");
var _gridRowsSelector = require("../features/rows/gridRowsSelector");
var _useGridPrivateApiContext = require("./useGridPrivateApiContext");
var _utils = require("../features/rowSelection/utils");
const useGridAriaAttributes = () => {
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const visibleColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector);
  const totalRowCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridRowCountSelector);
  const headerGroupingMaxDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector);
  const pinnedRowsCount = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridPinnedRowsCountSelector);
  let role = 'grid';
  if (rootProps.treeData) {
    role = 'treegrid';
  }
  return {
    role,
    'aria-colcount': visibleColumns.length,
    'aria-rowcount': headerGroupingMaxDepth + 1 + pinnedRowsCount + totalRowCount,
    'aria-multiselectable': (0, _utils.isMultipleRowSelectionEnabled)(rootProps)
  };
};
exports.useGridAriaAttributes = useGridAriaAttributes;