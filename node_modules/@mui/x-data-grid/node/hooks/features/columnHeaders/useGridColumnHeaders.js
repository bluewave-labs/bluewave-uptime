"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnHeaders = exports.GridColumnHeaderRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _utils = require("../../utils");
var _useGridRootProps = require("../../utils/useGridRootProps");
var _useGridPrivateApiContext = require("../../utils/useGridPrivateApiContext");
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
var _GridColumnHeaderItem = require("../../../components/columnHeaders/GridColumnHeaderItem");
var _dimensions = require("../dimensions");
var _virtualization = require("../virtualization");
var _useGridVirtualScroller = require("../virtualization/useGridVirtualScroller");
var _GridColumnGroupHeader = require("../../../components/columnHeaders/GridColumnGroupHeader");
var _columns = require("../columns");
var _GridScrollbarFillerCell = require("../../../components/GridScrollbarFillerCell");
var _getPinnedCellOffset = require("../../../internals/utils/getPinnedCellOffset");
var _GridColumnHeaderSeparator = require("../../../components/columnHeaders/GridColumnHeaderSeparator");
var _gridClasses = require("../../../constants/gridClasses");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridColumnHeaderRow = exports.GridColumnHeaderRow = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnHeaderRow',
  overridesResolver: (_, styles) => styles.columnHeaderRow
})({
  display: 'flex'
});
const useGridColumnHeaders = props => {
  const {
    visibleColumns,
    sortColumnLookup,
    filterColumnLookup,
    columnHeaderTabIndexState,
    columnGroupHeaderTabIndexState,
    columnHeaderFocus,
    columnGroupHeaderFocus,
    headerGroupingMaxDepth,
    columnMenuState,
    columnVisibility,
    columnGroupsHeaderStructure,
    hasOtherElementInTabSequence
  } = props;
  const [dragCol, setDragCol] = React.useState('');
  const [resizeCol, setResizeCol] = React.useState('');
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const theme = (0, _styles.useTheme)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const hasVirtualization = (0, _utils.useGridSelector)(apiRef, _virtualization.gridVirtualizationColumnEnabledSelector);
  const dimensions = (0, _utils.useGridSelector)(apiRef, _dimensions.gridDimensionsSelector);
  const columnPositions = (0, _utils.useGridSelector)(apiRef, _columns.gridColumnPositionsSelector);
  const renderContext = (0, _utils.useGridSelector)(apiRef, _virtualization.gridRenderContextColumnsSelector);
  const pinnedColumns = (0, _utils.useGridSelector)(apiRef, _columns.gridVisiblePinnedColumnDefinitionsSelector);
  const offsetLeft = (0, _useGridVirtualScroller.computeOffsetLeft)(columnPositions, renderContext, theme.direction, pinnedColumns.left.length);
  const gridHasFiller = dimensions.columnsTotalWidth < dimensions.viewportOuterSize.width;
  React.useEffect(() => {
    apiRef.current.columnHeadersContainerRef.current.scrollLeft = 0;
  }, [apiRef]);
  const handleColumnResizeStart = React.useCallback(params => setResizeCol(params.field), []);
  const handleColumnResizeStop = React.useCallback(() => setResizeCol(''), []);
  const handleColumnReorderStart = React.useCallback(params => setDragCol(params.field), []);
  const handleColumnReorderStop = React.useCallback(() => setDragCol(''), []);
  const leftRenderContext = React.useMemo(() => {
    return pinnedColumns.left.length ? {
      firstColumnIndex: 0,
      lastColumnIndex: pinnedColumns.left.length
    } : null;
  }, [pinnedColumns.left.length]);
  const rightRenderContext = React.useMemo(() => {
    return pinnedColumns.right.length ? {
      firstColumnIndex: visibleColumns.length - pinnedColumns.right.length,
      lastColumnIndex: visibleColumns.length
    } : null;
  }, [pinnedColumns.right.length, visibleColumns.length]);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnResizeStart', handleColumnResizeStart);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnResizeStop', handleColumnResizeStop);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnHeaderDragStart', handleColumnReorderStart);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnHeaderDragEnd', handleColumnReorderStop);

  // Helper for computation common between getColumnHeaders and getColumnGroupHeaders
  const getColumnsToRender = params => {
    const {
      renderContext: currentContext = renderContext,
      // TODO: `minFirstColumn` is not used anymore, could be refactored out.
      maxLastColumn = visibleColumns.length
    } = params || {};
    const firstColumnToRender = !hasVirtualization ? 0 : currentContext.firstColumnIndex;
    const lastColumnToRender = !hasVirtualization ? maxLastColumn : currentContext.lastColumnIndex;
    const renderedColumns = visibleColumns.slice(firstColumnToRender, lastColumnToRender);
    return {
      renderedColumns,
      firstColumnToRender,
      lastColumnToRender
    };
  };
  const getFillers = (params, children, leftOverflow, borderTop = false) => {
    const isPinnedRight = params?.position === _columns.GridPinnedColumnPosition.RIGHT;
    const isNotPinned = params?.position === undefined;
    const hasScrollbarFiller = pinnedColumns.right.length > 0 && isPinnedRight || pinnedColumns.right.length === 0 && isNotPinned;
    const leftOffsetWidth = offsetLeft - leftOverflow;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [isNotPinned && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        role: "presentation",
        style: {
          width: leftOffsetWidth
        }
      }), children, isNotPinned && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        role: "presentation",
        className: (0, _clsx.default)(_gridClasses.gridClasses.filler, borderTop && _gridClasses.gridClasses['filler--borderTop'])
      }), hasScrollbarFiller && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridScrollbarFillerCell.GridScrollbarFillerCell, {
        header: true,
        borderTop: borderTop,
        pinnedRight: isPinnedRight
      })]
    });
  };
  const getCellOffsetStyle = ({
    pinnedPosition,
    columnIndex,
    computedWidth
  }) => {
    let style;
    if (pinnedPosition === 'left' || pinnedPosition === 'right') {
      const pinnedOffset = (0, _getPinnedCellOffset.getPinnedCellOffset)(pinnedPosition, computedWidth, columnIndex, columnPositions, dimensions);
      if (pinnedPosition === 'left') {
        style = {
          left: pinnedOffset
        };
      }
      if (pinnedPosition === 'right') {
        style = {
          right: pinnedOffset
        };
      }
    }
    return style;
  };
  const getColumnHeaders = (params, other = {}) => {
    const {
      renderedColumns,
      firstColumnToRender
    } = getColumnsToRender(params);
    const columns = [];
    for (let i = 0; i < renderedColumns.length; i += 1) {
      const colDef = renderedColumns[i];
      const columnIndex = firstColumnToRender + i;
      const isFirstColumn = columnIndex === 0;
      const tabIndex = columnHeaderTabIndexState !== null && columnHeaderTabIndexState.field === colDef.field || isFirstColumn && !hasOtherElementInTabSequence ? 0 : -1;
      const hasFocus = columnHeaderFocus !== null && columnHeaderFocus.field === colDef.field;
      const open = columnMenuState.open && columnMenuState.field === colDef.field;
      const pinnedPosition = params?.position;
      const style = getCellOffsetStyle({
        pinnedPosition,
        columnIndex,
        computedWidth: colDef.computedWidth
      });
      columns.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnHeaderItem.GridColumnHeaderItem, (0, _extends2.default)({}, sortColumnLookup[colDef.field], {
        columnMenuOpen: open,
        filterItemsCounter: filterColumnLookup[colDef.field] && filterColumnLookup[colDef.field].length,
        headerHeight: dimensions.headerHeight,
        isDragging: colDef.field === dragCol,
        colDef: colDef,
        colIndex: columnIndex,
        isResizing: resizeCol === colDef.field,
        isLast: columnIndex === columnPositions.length - 1,
        hasFocus: hasFocus,
        tabIndex: tabIndex,
        pinnedPosition: pinnedPosition,
        style: style,
        indexInSection: i,
        sectionLength: renderedColumns.length,
        gridHasFiller: gridHasFiller
      }, other), colDef.field));
    }
    return getFillers(params, columns, 0);
  };
  const getColumnHeadersRow = () => {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnHeaderRow, {
      role: "row",
      "aria-rowindex": headerGroupingMaxDepth + 1,
      ownerState: rootProps,
      children: [leftRenderContext && getColumnHeaders({
        position: _columns.GridPinnedColumnPosition.LEFT,
        renderContext: leftRenderContext,
        minFirstColumn: leftRenderContext.firstColumnIndex,
        maxLastColumn: leftRenderContext.lastColumnIndex
      }, {
        disableReorder: true
      }), getColumnHeaders({
        renderContext,
        minFirstColumn: pinnedColumns.left.length,
        maxLastColumn: visibleColumns.length - pinnedColumns.right.length
      }), rightRenderContext && getColumnHeaders({
        position: _columns.GridPinnedColumnPosition.RIGHT,
        renderContext: rightRenderContext,
        minFirstColumn: rightRenderContext.firstColumnIndex,
        maxLastColumn: rightRenderContext.lastColumnIndex
      }, {
        disableReorder: true,
        separatorSide: _GridColumnHeaderSeparator.GridColumnHeaderSeparatorSides.Left
      })]
    });
  };
  const getColumnGroupHeaders = ({
    depth,
    params
  }) => {
    const columnsToRender = getColumnsToRender(params);
    if (columnsToRender.renderedColumns.length === 0) {
      return null;
    }
    const {
      renderedColumns,
      firstColumnToRender,
      lastColumnToRender
    } = columnsToRender;
    const rowStructure = columnGroupsHeaderStructure[depth];
    const firstColumnFieldToRender = visibleColumns[firstColumnToRender].field;
    const firstGroupToRender = apiRef.current.getColumnGroupPath(firstColumnFieldToRender)[depth] ?? null;
    const firstGroupIndex = rowStructure.findIndex(({
      groupId,
      columnFields
    }) => groupId === firstGroupToRender && columnFields.includes(firstColumnFieldToRender));
    const lastColumnFieldToRender = visibleColumns[lastColumnToRender - 1].field;
    const lastGroupToRender = apiRef.current.getColumnGroupPath(lastColumnFieldToRender)[depth] ?? null;
    const lastGroupIndex = rowStructure.findIndex(({
      groupId,
      columnFields
    }) => groupId === lastGroupToRender && columnFields.includes(lastColumnFieldToRender));
    const visibleColumnGroupHeader = rowStructure.slice(firstGroupIndex, lastGroupIndex + 1).map(groupStructure => {
      return (0, _extends2.default)({}, groupStructure, {
        columnFields: groupStructure.columnFields.filter(field => columnVisibility[field] !== false)
      });
    }).filter(groupStructure => groupStructure.columnFields.length > 0);
    const firstVisibleColumnIndex = visibleColumnGroupHeader[0].columnFields.indexOf(firstColumnFieldToRender);
    const hiddenGroupColumns = visibleColumnGroupHeader[0].columnFields.slice(0, firstVisibleColumnIndex);
    const leftOverflow = hiddenGroupColumns.reduce((acc, field) => {
      const column = apiRef.current.getColumn(field);
      return acc + (column.computedWidth ?? 0);
    }, 0);
    let columnIndex = firstColumnToRender;
    const children = visibleColumnGroupHeader.map(({
      groupId,
      columnFields
    }, index) => {
      const hasFocus = columnGroupHeaderFocus !== null && columnGroupHeaderFocus.depth === depth && columnFields.includes(columnGroupHeaderFocus.field);
      const tabIndex = columnGroupHeaderTabIndexState !== null && columnGroupHeaderTabIndexState.depth === depth && columnFields.includes(columnGroupHeaderTabIndexState.field) ? 0 : -1;
      const headerInfo = {
        groupId,
        width: columnFields.reduce((acc, field) => acc + apiRef.current.getColumn(field).computedWidth, 0),
        fields: columnFields,
        colIndex: columnIndex,
        hasFocus,
        tabIndex
      };
      const pinnedPosition = params.position;
      const style = getCellOffsetStyle({
        pinnedPosition,
        columnIndex,
        computedWidth: headerInfo.width
      });
      columnIndex += columnFields.length;
      let indexInSection = index;
      if (pinnedPosition === 'left') {
        // Group headers can expand to multiple columns, we need to adjust the index
        indexInSection = columnIndex - 1;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnGroupHeader.GridColumnGroupHeader, {
        groupId: groupId,
        width: headerInfo.width,
        fields: headerInfo.fields,
        colIndex: headerInfo.colIndex,
        depth: depth,
        isLastColumn: headerInfo.colIndex === visibleColumns.length - headerInfo.fields.length,
        maxDepth: headerGroupingMaxDepth,
        height: dimensions.headerHeight,
        hasFocus: hasFocus,
        tabIndex: tabIndex,
        pinnedPosition: pinnedPosition,
        style: style,
        indexInSection: indexInSection,
        sectionLength: renderedColumns.length,
        gridHasFiller: gridHasFiller
      }, index);
    });
    return getFillers(params, children, leftOverflow);
  };
  const getColumnGroupHeadersRows = () => {
    if (headerGroupingMaxDepth === 0) {
      return null;
    }
    const headerRows = [];
    for (let depth = 0; depth < headerGroupingMaxDepth; depth += 1) {
      headerRows.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnHeaderRow, {
        role: "row",
        "aria-rowindex": depth + 1,
        ownerState: rootProps,
        children: [leftRenderContext && getColumnGroupHeaders({
          depth,
          params: {
            position: _columns.GridPinnedColumnPosition.LEFT,
            renderContext: leftRenderContext,
            minFirstColumn: leftRenderContext.firstColumnIndex,
            maxLastColumn: leftRenderContext.lastColumnIndex
          }
        }), getColumnGroupHeaders({
          depth,
          params: {
            renderContext
          }
        }), rightRenderContext && getColumnGroupHeaders({
          depth,
          params: {
            position: _columns.GridPinnedColumnPosition.RIGHT,
            renderContext: rightRenderContext,
            minFirstColumn: rightRenderContext.firstColumnIndex,
            maxLastColumn: rightRenderContext.lastColumnIndex
          }
        })]
      }, depth));
    }
    return headerRows;
  };
  return {
    renderContext,
    leftRenderContext,
    rightRenderContext,
    pinnedColumns,
    visibleColumns,
    getCellOffsetStyle,
    getFillers,
    getColumnHeadersRow,
    getColumnsToRender,
    getColumnGroupHeadersRows,
    isDragging: !!dragCol,
    getInnerProps: () => ({
      role: 'rowgroup'
    })
  };
};
exports.useGridColumnHeaders = useGridColumnHeaders;