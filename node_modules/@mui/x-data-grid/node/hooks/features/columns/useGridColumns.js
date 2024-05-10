"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsStateInitializer = void 0;
exports.useGridColumns = useGridColumns;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _useGridLogger = require("../../utils/useGridLogger");
var _gridColumnsSelector = require("./gridColumnsSelector");
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
var _pipeProcessing = require("../../core/pipeProcessing");
var _gridColumnsInterfaces = require("./gridColumnsInterfaces");
var _gridColumnsUtils = require("./gridColumnsUtils");
var _preferencesPanel = require("../preferencesPanel");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const columnsStateInitializer = (state, props, apiRef) => {
  const columnsState = (0, _gridColumnsUtils.createColumnsState)({
    apiRef,
    columnsToUpsert: props.columns,
    initialState: props.initialState?.columns,
    columnVisibilityModel: props.columnVisibilityModel ?? props.initialState?.columns?.columnVisibilityModel ?? {},
    keepOnlyColumnsToUpsert: true
  });
  return (0, _extends2.default)({}, state, {
    columns: columnsState,
    // In pro/premium, this part of the state is defined. We give it an empty but defined value
    // for the community version.
    pinnedColumns: state.pinnedColumns ?? _gridColumnsInterfaces.EMPTY_PINNED_COLUMN_FIELDS
  });
};

/**
 * @requires useGridParamsApi (method)
 * @requires useGridDimensions (method, event) - can be after
 * TODO: Impossible priority - useGridParamsApi also needs to be after useGridColumns
 */
exports.columnsStateInitializer = columnsStateInitializer;
function useGridColumns(apiRef, props) {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridColumns');
  const previousColumnsProp = React.useRef(props.columns);
  apiRef.current.registerControlState({
    stateId: 'visibleColumns',
    propModel: props.columnVisibilityModel,
    propOnChange: props.onColumnVisibilityModelChange,
    stateSelector: _gridColumnsSelector.gridColumnVisibilityModelSelector,
    changeEvent: 'columnVisibilityModelChange'
  });
  const setGridColumnsState = React.useCallback(columnsState => {
    logger.debug('Updating columns state.');
    apiRef.current.setState(mergeColumnsState(columnsState));
    apiRef.current.publishEvent('columnsChange', columnsState.orderedFields);
    apiRef.current.updateRenderContext?.();
    apiRef.current.forceUpdate();
  }, [logger, apiRef]);

  /**
   * API METHODS
   */
  const getColumn = React.useCallback(field => (0, _gridColumnsSelector.gridColumnLookupSelector)(apiRef)[field], [apiRef]);
  const getAllColumns = React.useCallback(() => (0, _gridColumnsSelector.gridColumnDefinitionsSelector)(apiRef), [apiRef]);
  const getVisibleColumns = React.useCallback(() => (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef), [apiRef]);
  const getColumnIndex = React.useCallback((field, useVisibleColumns = true) => {
    const columns = useVisibleColumns ? (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef) : (0, _gridColumnsSelector.gridColumnDefinitionsSelector)(apiRef);
    return columns.findIndex(col => col.field === field);
  }, [apiRef]);
  const getColumnPosition = React.useCallback(field => {
    const index = getColumnIndex(field);
    return (0, _gridColumnsSelector.gridColumnPositionsSelector)(apiRef)[index];
  }, [apiRef, getColumnIndex]);
  const setColumnVisibilityModel = React.useCallback(model => {
    const currentModel = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);
    if (currentModel !== model) {
      apiRef.current.setState(state => (0, _extends2.default)({}, state, {
        columns: (0, _gridColumnsUtils.createColumnsState)({
          apiRef,
          columnsToUpsert: [],
          initialState: undefined,
          columnVisibilityModel: model,
          keepOnlyColumnsToUpsert: false
        })
      }));
      apiRef.current.updateRenderContext?.();
      apiRef.current.forceUpdate();
    }
  }, [apiRef]);
  const updateColumns = React.useCallback(columns => {
    const columnsState = (0, _gridColumnsUtils.createColumnsState)({
      apiRef,
      columnsToUpsert: columns,
      initialState: undefined,
      keepOnlyColumnsToUpsert: false
    });
    setGridColumnsState(columnsState);
  }, [apiRef, setGridColumnsState]);
  const setColumnVisibility = React.useCallback((field, isVisible) => {
    const columnVisibilityModel = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);
    const isCurrentlyVisible = columnVisibilityModel[field] ?? true;
    if (isVisible !== isCurrentlyVisible) {
      const newModel = (0, _extends2.default)({}, columnVisibilityModel, {
        [field]: isVisible
      });
      apiRef.current.setColumnVisibilityModel(newModel);
    }
  }, [apiRef]);
  const getColumnIndexRelativeToVisibleColumns = React.useCallback(field => {
    const allColumns = (0, _gridColumnsSelector.gridColumnFieldsSelector)(apiRef);
    return allColumns.findIndex(col => col === field);
  }, [apiRef]);
  const setColumnIndex = React.useCallback((field, targetIndexPosition) => {
    const allColumns = (0, _gridColumnsSelector.gridColumnFieldsSelector)(apiRef);
    const oldIndexPosition = getColumnIndexRelativeToVisibleColumns(field);
    if (oldIndexPosition === targetIndexPosition) {
      return;
    }
    logger.debug(`Moving column ${field} to index ${targetIndexPosition}`);
    const updatedColumns = [...allColumns];
    const fieldRemoved = updatedColumns.splice(oldIndexPosition, 1)[0];
    updatedColumns.splice(targetIndexPosition, 0, fieldRemoved);
    setGridColumnsState((0, _extends2.default)({}, (0, _gridColumnsSelector.gridColumnsStateSelector)(apiRef.current.state), {
      orderedFields: updatedColumns
    }));
    const params = {
      column: apiRef.current.getColumn(field),
      targetIndex: apiRef.current.getColumnIndexRelativeToVisibleColumns(field),
      oldIndex: oldIndexPosition
    };
    apiRef.current.publishEvent('columnIndexChange', params);
  }, [apiRef, logger, setGridColumnsState, getColumnIndexRelativeToVisibleColumns]);
  const setColumnWidth = React.useCallback((field, width) => {
    logger.debug(`Updating column ${field} width to ${width}`);
    const columnsState = (0, _gridColumnsSelector.gridColumnsStateSelector)(apiRef.current.state);
    const column = columnsState.lookup[field];
    const newColumn = (0, _extends2.default)({}, column, {
      width,
      hasBeenResized: true
    });
    setGridColumnsState((0, _gridColumnsUtils.hydrateColumnsWidth)((0, _extends2.default)({}, columnsState, {
      lookup: (0, _extends2.default)({}, columnsState.lookup, {
        [field]: newColumn
      })
    }), apiRef.current.getRootDimensions()));
    apiRef.current.publishEvent('columnWidthChange', {
      element: apiRef.current.getColumnHeaderElement(field),
      colDef: newColumn,
      width
    });
  }, [apiRef, logger, setGridColumnsState]);
  const columnApi = {
    getColumn,
    getAllColumns,
    getColumnIndex,
    getColumnPosition,
    getVisibleColumns,
    getColumnIndexRelativeToVisibleColumns,
    updateColumns,
    setColumnVisibilityModel,
    setColumnVisibility,
    setColumnWidth
  };
  const columnReorderApi = {
    setColumnIndex
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, columnApi, 'public');
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, columnReorderApi, props.signature === _useGridApiEventHandler.GridSignature.DataGrid ? 'private' : 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const columnsStateToExport = {};
    const columnVisibilityModelToExport = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);
    const shouldExportColumnVisibilityModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.columnVisibilityModel != null ||
    // Always export if the model has been initialized
    // TODO v6 Do a nullish check instead to export even if the initial model equals "{}"
    Object.keys(props.initialState?.columns?.columnVisibilityModel ?? {}).length > 0 ||
    // Always export if the model is not empty
    Object.keys(columnVisibilityModelToExport).length > 0;
    if (shouldExportColumnVisibilityModel) {
      columnsStateToExport.columnVisibilityModel = columnVisibilityModelToExport;
    }
    columnsStateToExport.orderedFields = (0, _gridColumnsSelector.gridColumnFieldsSelector)(apiRef);
    const columns = (0, _gridColumnsSelector.gridColumnDefinitionsSelector)(apiRef);
    const dimensions = {};
    columns.forEach(colDef => {
      if (colDef.hasBeenResized) {
        const colDefDimensions = {};
        _gridColumnsUtils.COLUMNS_DIMENSION_PROPERTIES.forEach(propertyName => {
          let propertyValue = colDef[propertyName];
          if (propertyValue === Infinity) {
            propertyValue = -1;
          }
          colDefDimensions[propertyName] = propertyValue;
        });
        dimensions[colDef.field] = colDefDimensions;
      }
    });
    if (Object.keys(dimensions).length > 0) {
      columnsStateToExport.dimensions = dimensions;
    }
    return (0, _extends2.default)({}, prevState, {
      columns: columnsStateToExport
    });
  }, [apiRef, props.columnVisibilityModel, props.initialState?.columns]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const columnVisibilityModelToImport = context.stateToRestore.columns?.columnVisibilityModel;
    const initialState = context.stateToRestore.columns;
    if (columnVisibilityModelToImport == null && initialState == null) {
      return params;
    }
    const columnsState = (0, _gridColumnsUtils.createColumnsState)({
      apiRef,
      columnsToUpsert: [],
      initialState,
      columnVisibilityModel: columnVisibilityModelToImport,
      keepOnlyColumnsToUpsert: false
    });
    apiRef.current.setState(mergeColumnsState(columnsState));
    if (initialState != null) {
      apiRef.current.publishEvent('columnsChange', columnsState.orderedFields);
    }
    return params;
  }, [apiRef]);
  const preferencePanelPreProcessing = React.useCallback((initialValue, value) => {
    if (value === _preferencesPanel.GridPreferencePanelsValue.columns) {
      const ColumnsPanel = props.slots.columnsPanel;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(ColumnsPanel, (0, _extends2.default)({}, props.slotProps?.columnsPanel));
    }
    return initialValue;
  }, [props.slots.columnsPanel, props.slotProps?.columnsPanel]);
  const addColumnMenuItems = React.useCallback(columnMenuItems => {
    if (props.disableColumnSelector) {
      return columnMenuItems;
    }
    return [...columnMenuItems, 'columnMenuColumnsItem'];
  }, [props.disableColumnSelector]);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'columnMenu', addColumnMenuItems);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'preferencePanel', preferencePanelPreProcessing);

  /*
   * EVENTS
   */

  const prevInnerWidth = React.useRef(null);
  const handleGridSizeChange = viewportInnerSize => {
    if (prevInnerWidth.current !== viewportInnerSize.width) {
      prevInnerWidth.current = viewportInnerSize.width;
      setGridColumnsState((0, _gridColumnsUtils.hydrateColumnsWidth)((0, _gridColumnsSelector.gridColumnsStateSelector)(apiRef.current.state), apiRef.current.getRootDimensions()));
    }
  };
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'viewportInnerSizeChange', handleGridSizeChange);

  /**
   * APPLIERS
   */
  const hydrateColumns = React.useCallback(() => {
    logger.info(`Columns pipe processing have changed, regenerating the columns`);
    const columnsState = (0, _gridColumnsUtils.createColumnsState)({
      apiRef,
      columnsToUpsert: [],
      initialState: undefined,
      keepOnlyColumnsToUpsert: false
    });
    setGridColumnsState(columnsState);
  }, [apiRef, logger, setGridColumnsState]);
  (0, _pipeProcessing.useGridRegisterPipeApplier)(apiRef, 'hydrateColumns', hydrateColumns);

  /*
   * EFFECTS
   */
  // The effect do not track any value defined synchronously during the 1st render by hooks called after `useGridColumns`
  // As a consequence, the state generated by the 1st run of this useEffect will always be equal to the initialization one
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    logger.info(`GridColumns have changed, new length ${props.columns.length}`);
    if (previousColumnsProp.current === props.columns) {
      return;
    }
    const columnsState = (0, _gridColumnsUtils.createColumnsState)({
      apiRef,
      initialState: undefined,
      // If the user provides a model, we don't want to set it in the state here because it has it's dedicated `useEffect` which calls `setColumnVisibilityModel`
      columnsToUpsert: props.columns,
      keepOnlyColumnsToUpsert: true
    });
    previousColumnsProp.current = props.columns;
    setGridColumnsState(columnsState);
  }, [logger, apiRef, setGridColumnsState, props.columns]);
  React.useEffect(() => {
    if (props.columnVisibilityModel !== undefined) {
      apiRef.current.setColumnVisibilityModel(props.columnVisibilityModel);
    }
  }, [apiRef, logger, props.columnVisibilityModel]);
}
function mergeColumnsState(columnsState) {
  return state => (0, _extends2.default)({}, state, {
    columns: columnsState
  });
}