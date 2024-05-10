"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnGrouping = exports.columnGroupsStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _gridColumnGrouping = require("../../../models/gridColumnGrouping");
var _gridColumnGroupsSelector = require("./gridColumnGroupsSelector");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _gridColumnGroupsUtils = require("./gridColumnGroupsUtils");
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
var _columns = require("../columns");
const _excluded = ["groupId", "children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createGroupLookup = columnGroupingModel => {
  let groupLookup = {};
  columnGroupingModel.forEach(node => {
    if ((0, _gridColumnGrouping.isLeaf)(node)) {
      return;
    }
    const {
        groupId,
        children
      } = node,
      other = (0, _objectWithoutPropertiesLoose2.default)(node, _excluded);
    if (!groupId) {
      throw new Error('MUI X: An element of the columnGroupingModel does not have either `field` or `groupId`.');
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!children) {
        console.warn(`MUI X: group groupId=${groupId} has no children.`);
      }
    }
    const groupParam = (0, _extends2.default)({}, other, {
      groupId
    });
    const subTreeLookup = createGroupLookup(children);
    if (subTreeLookup[groupId] !== undefined || groupLookup[groupId] !== undefined) {
      throw new Error(`MUI X: The groupId ${groupId} is used multiple times in the columnGroupingModel.`);
    }
    groupLookup = (0, _extends2.default)({}, groupLookup, subTreeLookup, {
      [groupId]: groupParam
    });
  });
  return (0, _extends2.default)({}, groupLookup);
};
const columnGroupsStateInitializer = (state, props, apiRef) => {
  if (!props.columnGroupingModel) {
    return state;
  }
  const columnFields = (0, _columns.gridColumnFieldsSelector)(apiRef);
  const visibleColumnFields = (0, _columns.gridVisibleColumnFieldsSelector)(apiRef);
  const groupLookup = createGroupLookup(props.columnGroupingModel ?? []);
  const unwrappedGroupingModel = (0, _gridColumnGroupsUtils.unwrapGroupingColumnModel)(props.columnGroupingModel ?? []);
  const columnGroupsHeaderStructure = (0, _gridColumnGroupsUtils.getColumnGroupsHeaderStructure)(columnFields, unwrappedGroupingModel, apiRef.current.state.pinnedColumns ?? {});
  const maxDepth = visibleColumnFields.length === 0 ? 0 : Math.max(...visibleColumnFields.map(field => unwrappedGroupingModel[field]?.length ?? 0));
  return (0, _extends2.default)({}, state, {
    columnGrouping: {
      lookup: groupLookup,
      unwrappedGroupingModel,
      headerStructure: columnGroupsHeaderStructure,
      maxDepth
    }
  });
};

/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
exports.columnGroupsStateInitializer = columnGroupsStateInitializer;
const useGridColumnGrouping = (apiRef, props) => {
  /**
   * API METHODS
   */
  const getColumnGroupPath = React.useCallback(field => {
    const unwrappedGroupingModel = (0, _gridColumnGroupsSelector.gridColumnGroupsUnwrappedModelSelector)(apiRef);
    return unwrappedGroupingModel[field] ?? [];
  }, [apiRef]);
  const getAllGroupDetails = React.useCallback(() => {
    const columnGroupLookup = (0, _gridColumnGroupsSelector.gridColumnGroupsLookupSelector)(apiRef);
    return columnGroupLookup;
  }, [apiRef]);
  const columnGroupingApi = {
    getColumnGroupPath,
    getAllGroupDetails
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, columnGroupingApi, 'public');
  const handleColumnIndexChange = React.useCallback(() => {
    const unwrappedGroupingModel = (0, _gridColumnGroupsUtils.unwrapGroupingColumnModel)(props.columnGroupingModel ?? []);
    apiRef.current.setState(state => {
      const orderedFields = state.columns?.orderedFields ?? [];
      const pinnedColumns = state.pinnedColumns ?? {};
      const columnGroupsHeaderStructure = (0, _gridColumnGroupsUtils.getColumnGroupsHeaderStructure)(orderedFields, unwrappedGroupingModel, pinnedColumns);
      return (0, _extends2.default)({}, state, {
        columnGrouping: (0, _extends2.default)({}, state.columnGrouping, {
          headerStructure: columnGroupsHeaderStructure
        })
      });
    });
  }, [apiRef, props.columnGroupingModel]);
  const updateColumnGroupingState = React.useCallback(columnGroupingModel => {
    // @ts-expect-error Move this logic to `Pro` package
    const pinnedColumns = apiRef.current.getPinnedColumns?.() ?? {};
    const columnFields = (0, _columns.gridColumnFieldsSelector)(apiRef);
    const visibleColumnFields = (0, _columns.gridVisibleColumnFieldsSelector)(apiRef);
    const groupLookup = createGroupLookup(columnGroupingModel ?? []);
    const unwrappedGroupingModel = (0, _gridColumnGroupsUtils.unwrapGroupingColumnModel)(columnGroupingModel ?? []);
    const columnGroupsHeaderStructure = (0, _gridColumnGroupsUtils.getColumnGroupsHeaderStructure)(columnFields, unwrappedGroupingModel, pinnedColumns);
    const maxDepth = visibleColumnFields.length === 0 ? 0 : Math.max(...visibleColumnFields.map(field => unwrappedGroupingModel[field]?.length ?? 0));
    apiRef.current.setState(state => {
      return (0, _extends2.default)({}, state, {
        columnGrouping: {
          lookup: groupLookup,
          unwrappedGroupingModel,
          headerStructure: columnGroupsHeaderStructure,
          maxDepth
        }
      });
    });
  }, [apiRef]);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnIndexChange', handleColumnIndexChange);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnsChange', () => {
    updateColumnGroupingState(props.columnGroupingModel);
  });
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnVisibilityModelChange', () => {
    updateColumnGroupingState(props.columnGroupingModel);
  });

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    updateColumnGroupingState(props.columnGroupingModel);
  }, [updateColumnGroupingState, props.columnGroupingModel]);
};
exports.useGridColumnGrouping = useGridColumnGrouping;