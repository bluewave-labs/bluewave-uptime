"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowsPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _strategyProcessing = require("../../core/strategyProcessing");
var _gridRowsUtils = require("./gridRowsUtils");
const createFlatRowTree = rows => {
  const tree = {
    [_gridRowsUtils.GRID_ROOT_GROUP_ID]: (0, _extends2.default)({}, (0, _gridRowsUtils.buildRootGroup)(), {
      children: rows
    })
  };
  for (let i = 0; i < rows.length; i += 1) {
    const rowId = rows[i];
    tree[rowId] = {
      id: rowId,
      depth: 0,
      parent: _gridRowsUtils.GRID_ROOT_GROUP_ID,
      type: 'leaf',
      groupingKey: null
    };
  }
  return {
    groupingName: _strategyProcessing.GRID_DEFAULT_STRATEGY,
    tree,
    treeDepths: {
      0: rows.length
    },
    dataRowIds: rows
  };
};
const updateFlatRowTree = ({
  previousTree,
  actions
}) => {
  const tree = (0, _extends2.default)({}, previousTree);
  const idsToRemoveFromRootGroup = {};
  for (let i = 0; i < actions.remove.length; i += 1) {
    const idToDelete = actions.remove[i];
    idsToRemoveFromRootGroup[idToDelete] = true;
    delete tree[idToDelete];
  }
  for (let i = 0; i < actions.insert.length; i += 1) {
    const idToInsert = actions.insert[i];
    tree[idToInsert] = {
      id: idToInsert,
      depth: 0,
      parent: _gridRowsUtils.GRID_ROOT_GROUP_ID,
      type: 'leaf',
      groupingKey: null
    };
  }

  // TODO rows v6: Support row unpinning

  const rootGroup = tree[_gridRowsUtils.GRID_ROOT_GROUP_ID];
  let rootGroupChildren = [...rootGroup.children, ...actions.insert];
  if (Object.values(idsToRemoveFromRootGroup).length) {
    rootGroupChildren = rootGroupChildren.filter(id => !idsToRemoveFromRootGroup[id]);
  }
  tree[_gridRowsUtils.GRID_ROOT_GROUP_ID] = (0, _extends2.default)({}, rootGroup, {
    children: rootGroupChildren
  });
  return {
    groupingName: _strategyProcessing.GRID_DEFAULT_STRATEGY,
    tree,
    treeDepths: {
      0: rootGroupChildren.length
    },
    dataRowIds: rootGroupChildren
  };
};
const flatRowTreeCreationMethod = params => {
  if (params.updates.type === 'full') {
    return createFlatRowTree(params.updates.rows);
  }
  return updateFlatRowTree({
    previousTree: params.previousTree,
    actions: params.updates.actions
  });
};
const useGridRowsPreProcessors = apiRef => {
  (0, _strategyProcessing.useGridRegisterStrategyProcessor)(apiRef, _strategyProcessing.GRID_DEFAULT_STRATEGY, 'rowTreeCreation', flatRowTreeCreationMethod);
};
exports.useGridRowsPreProcessors = useGridRowsPreProcessors;