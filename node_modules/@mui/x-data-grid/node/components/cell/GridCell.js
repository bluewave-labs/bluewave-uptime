"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridPinnedColumnPositionLookup = exports.PinnedPosition = exports.GridCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _fastMemo = require("../../utils/fastMemo");
var _doesSupportPreventScroll = require("../../utils/doesSupportPreventScroll");
var _gridClasses = require("../../constants/gridClasses");
var _models = require("../../models");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridFocusStateSelector = require("../../hooks/features/focus/gridFocusStateSelector");
var _useGridParamsApi = require("../../hooks/features/rows/useGridParamsApi");
var _cellBorderUtils = require("../../utils/cellBorderUtils");
var _gridColumnsInterfaces = require("../../hooks/features/columns/gridColumnsInterfaces");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["column", "rowId", "editCellState", "align", "children", "colIndex", "width", "className", "style", "gridHasScrollX", "colSpan", "disableDragEvents", "isNotVisible", "pinnedOffset", "pinnedPosition", "sectionIndex", "sectionLength", "gridHasFiller", "onClick", "onDoubleClick", "onMouseDown", "onMouseUp", "onMouseOver", "onKeyDown", "onKeyUp", "onDragEnter", "onDragOver"],
  _excluded2 = ["changeReason", "unstable_updateValueOnRender"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let PinnedPosition = exports.PinnedPosition = /*#__PURE__*/function (PinnedPosition) {
  PinnedPosition[PinnedPosition["NONE"] = 0] = "NONE";
  PinnedPosition[PinnedPosition["LEFT"] = 1] = "LEFT";
  PinnedPosition[PinnedPosition["RIGHT"] = 2] = "RIGHT";
  PinnedPosition[PinnedPosition["VIRTUAL"] = 3] = "VIRTUAL";
  return PinnedPosition;
}({});
const gridPinnedColumnPositionLookup = exports.gridPinnedColumnPositionLookup = {
  [PinnedPosition.LEFT]: _gridColumnsInterfaces.GridPinnedColumnPosition.LEFT,
  [PinnedPosition.RIGHT]: _gridColumnsInterfaces.GridPinnedColumnPosition.RIGHT,
  [PinnedPosition.NONE]: undefined,
  [PinnedPosition.VIRTUAL]: undefined
};
const EMPTY_CELL_PARAMS = {
  id: -1,
  field: '__unset__',
  row: {},
  rowNode: {
    id: -1,
    depth: 0,
    type: 'leaf',
    parent: -1,
    groupingKey: null
  },
  colDef: {
    type: 'string',
    field: '__unset__',
    computedWidth: 0
  },
  cellMode: _models.GridCellModes.View,
  hasFocus: false,
  tabIndex: -1,
  value: null,
  formattedValue: '__unset__',
  isEditable: false,
  api: {}
};
const useUtilityClasses = ownerState => {
  const {
    align,
    showLeftBorder,
    showRightBorder,
    pinnedPosition,
    isEditable,
    isSelected,
    isSelectionMode,
    classes
  } = ownerState;
  const slots = {
    root: ['cell', `cell--text${(0, _utils.unstable_capitalize)(align)}`, isSelected && 'selected', isEditable && 'cell--editable', showLeftBorder && 'cell--withLeftBorder', showRightBorder && 'cell--withRightBorder', pinnedPosition === PinnedPosition.LEFT && 'cell--pinnedLeft', pinnedPosition === PinnedPosition.RIGHT && 'cell--pinnedRight', isSelectionMode && !isEditable && 'cell--selectionMode']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
let warnedOnce = false;

// TODO(v7): Removing the wrapper will break the docs performance visualization demo.

const GridCell = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      column,
      rowId,
      editCellState,
      align,
      colIndex,
      width,
      className,
      style: styleProp,
      colSpan,
      disableDragEvents,
      isNotVisible,
      pinnedOffset,
      pinnedPosition,
      sectionIndex,
      sectionLength,
      gridHasFiller,
      onClick,
      onDoubleClick,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onKeyDown,
      onKeyUp,
      onDragEnter,
      onDragOver
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const field = column.field;
  const cellParamsWithAPI = (0, _useGridSelector.useGridSelector)(apiRef, () => {
    // This is required because `.getCellParams` tries to get the `state.rows.tree` entry
    // associated with `rowId`/`fieldId`, but this selector runs after the state has been
    // updated, while `rowId`/`fieldId` reference an entry in the old state.
    try {
      const cellParams = apiRef.current.getCellParams(rowId, field);
      const result = cellParams;
      result.api = apiRef.current;
      return result;
    } catch (e) {
      if (e instanceof _useGridParamsApi.MissingRowIdError) {
        return EMPTY_CELL_PARAMS;
      }
      throw e;
    }
  }, _useGridSelector.objectShallowCompare);
  const isSelected = (0, _useGridSelector.useGridSelector)(apiRef, () => apiRef.current.unstable_applyPipeProcessors('isCellSelected', false, {
    id: rowId,
    field
  }));
  const {
    cellMode,
    hasFocus,
    isEditable = false,
    value
  } = cellParamsWithAPI;
  const canManageOwnFocus = column.type === 'actions' && column.getActions?.(apiRef.current.getRowParams(rowId)).some(action => !action.props.disabled);
  const tabIndex = (cellMode === 'view' || !isEditable) && !canManageOwnFocus ? cellParamsWithAPI.tabIndex : -1;
  const {
    classes: rootClasses,
    getCellClassName
  } = rootProps;

  // There is a hidden grid state access in `applyPipeProcessor('cellClassName', ...)`
  const pipesClassName = (0, _useGridSelector.useGridSelector)(apiRef, () => apiRef.current.unstable_applyPipeProcessors('cellClassName', [], {
    id: rowId,
    field
  }).filter(Boolean).join(' '));
  const classNames = [pipesClassName];
  if (column.cellClassName) {
    classNames.push(typeof column.cellClassName === 'function' ? column.cellClassName(cellParamsWithAPI) : column.cellClassName);
  }
  if (column.display === 'flex') {
    classNames.push(_gridClasses.gridClasses['cell--flex']);
  }
  if (getCellClassName) {
    classNames.push(getCellClassName(cellParamsWithAPI));
  }
  const valueToRender = cellParamsWithAPI.formattedValue ?? value;
  const cellRef = React.useRef(null);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, cellRef);
  const focusElementRef = React.useRef(null);
  const isSelectionMode = rootProps.cellSelection ?? false;
  const position = gridPinnedColumnPositionLookup[pinnedPosition];
  const showLeftBorder = (0, _cellBorderUtils.shouldCellShowLeftBorder)(position, sectionIndex);
  const showRightBorder = (0, _cellBorderUtils.shouldCellShowRightBorder)(position, sectionIndex, sectionLength, rootProps.showCellVerticalBorder, gridHasFiller);
  const ownerState = {
    align,
    showLeftBorder,
    showRightBorder,
    isEditable,
    classes: rootProps.classes,
    pinnedPosition,
    isSelected,
    isSelectionMode
  };
  const classes = useUtilityClasses(ownerState);
  const publishMouseUp = React.useCallback(eventName => event => {
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (onMouseUp) {
      onMouseUp(event);
    }
  }, [apiRef, field, onMouseUp, rowId]);
  const publishMouseDown = React.useCallback(eventName => event => {
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  }, [apiRef, field, onMouseDown, rowId]);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // The row might have been deleted during the click
    if (!apiRef.current.getRow(rowId)) {
      return;
    }
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, field, rowId]);
  const style = React.useMemo(() => {
    if (isNotVisible) {
      return {
        padding: 0,
        opacity: 0,
        width: 0,
        border: 0
      };
    }
    const cellStyle = (0, _extends2.default)({
      '--width': `${width}px`
    }, styleProp);
    if (pinnedPosition === PinnedPosition.LEFT) {
      cellStyle.left = pinnedOffset;
    }
    if (pinnedPosition === PinnedPosition.RIGHT) {
      cellStyle.right = pinnedOffset;
    }
    return cellStyle;
  }, [width, isNotVisible, styleProp, pinnedOffset, pinnedPosition]);
  React.useEffect(() => {
    if (!hasFocus || cellMode === _models.GridCellModes.Edit) {
      return;
    }
    const doc = (0, _utils.unstable_ownerDocument)(apiRef.current.rootElementRef.current);
    if (cellRef.current && !cellRef.current.contains(doc.activeElement)) {
      const focusableElement = cellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusElementRef.current || focusableElement || cellRef.current;
      if ((0, _doesSupportPreventScroll.doesSupportPreventScroll)()) {
        elementToFocus.focus({
          preventScroll: true
        });
      } else {
        const scrollPosition = apiRef.current.getScrollPosition();
        elementToFocus.focus();
        apiRef.current.scroll(scrollPosition);
      }
    }
  }, [hasFocus, cellMode, apiRef]);
  if (cellParamsWithAPI === EMPTY_CELL_PARAMS) {
    return null;
  }
  let handleFocus = other.onFocus;
  if (process.env.NODE_ENV === 'test' && rootProps.experimentalFeatures?.warnIfFocusStateIsNotSynced) {
    handleFocus = event => {
      const focusedCell = (0, _gridFocusStateSelector.gridFocusCellSelector)(apiRef);
      if (focusedCell?.id === rowId && focusedCell.field === field) {
        if (typeof other.onFocus === 'function') {
          other.onFocus(event);
        }
        return;
      }
      if (!warnedOnce) {
        console.warn([`MUI X: The cell with id=${rowId} and field=${field} received focus.`, `According to the state, the focus should be at id=${focusedCell?.id}, field=${focusedCell?.field}.`, "Not syncing the state may cause unwanted behaviors since the `cellFocusIn` event won't be fired.", 'Call `fireEvent.mouseUp` before the `fireEvent.click` to sync the focus with the state.'].join('\n'));
        warnedOnce = true;
      }
    };
  }
  let children;
  let title;
  if (editCellState === null && column.renderCell) {
    children = column.renderCell(cellParamsWithAPI);
  }
  if (editCellState !== null && column.renderEditCell) {
    const updatedRow = apiRef.current.getRowWithUpdatedValues(rowId, column.field);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const editCellStateRest = (0, _objectWithoutPropertiesLoose2.default)(editCellState, _excluded2);
    const formattedValue = column.valueFormatter ? column.valueFormatter(editCellState.value, updatedRow, column, apiRef) : cellParamsWithAPI.formattedValue;
    const params = (0, _extends2.default)({}, cellParamsWithAPI, {
      row: updatedRow,
      formattedValue
    }, editCellStateRest);
    children = column.renderEditCell(params);
    classNames.push(_gridClasses.gridClasses['cell--editing']);
    classNames.push(rootClasses?.['cell--editing']);
  }
  if (children === undefined) {
    const valueString = valueToRender?.toString();
    children = valueString;
    title = valueString;
  }
  if ( /*#__PURE__*/React.isValidElement(children) && canManageOwnFocus) {
    children = /*#__PURE__*/React.cloneElement(children, {
      focusElementRef
    });
  }
  const draggableEventHandlers = disableDragEvents ? null : {
    onDragEnter: publish('cellDragEnter', onDragEnter),
    onDragOver: publish('cellDragOver', onDragOver)
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
    ref: handleRef,
    className: (0, _clsx.default)(className, classNames, classes.root),
    role: "gridcell",
    "data-field": field,
    "data-colindex": colIndex,
    "aria-colindex": colIndex + 1,
    "aria-colspan": colSpan,
    style: style,
    title: title,
    tabIndex: tabIndex,
    onClick: publish('cellClick', onClick),
    onDoubleClick: publish('cellDoubleClick', onDoubleClick),
    onMouseOver: publish('cellMouseOver', onMouseOver),
    onMouseDown: publishMouseDown('cellMouseDown'),
    onMouseUp: publishMouseUp('cellMouseUp'),
    onKeyDown: publish('cellKeyDown', onKeyDown),
    onKeyUp: publish('cellKeyUp', onKeyUp)
  }, draggableEventHandlers, other, {
    onFocus: handleFocus,
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? GridCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  align: _propTypes.default.oneOf(['center', 'left', 'right']).isRequired,
  className: _propTypes.default.string,
  colIndex: _propTypes.default.number.isRequired,
  colSpan: _propTypes.default.number,
  column: _propTypes.default.object.isRequired,
  disableDragEvents: _propTypes.default.bool,
  editCellState: _propTypes.default.shape({
    changeReason: _propTypes.default.oneOf(['debouncedSetEditCellValue', 'setEditCellValue']),
    isProcessingProps: _propTypes.default.bool,
    isValidating: _propTypes.default.bool,
    value: _propTypes.default.any
  }),
  gridHasFiller: _propTypes.default.bool.isRequired,
  isNotVisible: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  onDragEnter: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  pinnedOffset: _propTypes.default.number.isRequired,
  pinnedPosition: _propTypes.default.oneOf([0, 1, 2, 3]).isRequired,
  rowId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  sectionIndex: _propTypes.default.number.isRequired,
  sectionLength: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired
} : void 0;
const MemoizedGridCell = exports.GridCell = (0, _fastMemo.fastMemo)(GridCell);