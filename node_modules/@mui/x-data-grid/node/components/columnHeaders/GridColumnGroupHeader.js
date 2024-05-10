"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnGroupHeader = GridColumnGroupHeader;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _gridClasses = require("../../constants/gridClasses");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridColumnGroupsSelector = require("../../hooks/features/columnGrouping/gridColumnGroupsSelector");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _GridGenericColumnHeaderItem = require("./GridGenericColumnHeaderItem");
var _domUtils = require("../../utils/domUtils");
var _cellBorderUtils = require("../../utils/cellBorderUtils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    headerAlign,
    isDragging,
    showLeftBorder,
    showRightBorder,
    groupId,
    pinnedPosition
  } = ownerState;
  const slots = {
    root: ['columnHeader', headerAlign === 'left' && 'columnHeader--alignLeft', headerAlign === 'center' && 'columnHeader--alignCenter', headerAlign === 'right' && 'columnHeader--alignRight', isDragging && 'columnHeader--moving', showRightBorder && 'columnHeader--withRightBorder', showLeftBorder && 'columnHeader--withLeftBorder', 'withBorderColor', groupId === null ? 'columnHeader--emptyGroup' : 'columnHeader--filledGroup', pinnedPosition === 'left' && 'columnHeader--pinnedLeft', pinnedPosition === 'right' && 'columnHeader--pinnedRight'],
    draggableContainer: ['columnHeaderDraggableContainer'],
    titleContainer: ['columnHeaderTitleContainer', 'withBorderColor'],
    titleContainerContent: ['columnHeaderTitleContainerContent']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function GridColumnGroupHeader(props) {
  const {
    groupId,
    width,
    depth,
    maxDepth,
    fields,
    height,
    colIndex,
    hasFocus,
    tabIndex,
    isLastColumn,
    pinnedPosition,
    style,
    indexInSection,
    sectionLength,
    gridHasFiller
  } = props;
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const headerCellRef = React.useRef(null);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const columnGroupsLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsLookupSelector);
  const group = groupId ? columnGroupsLookup[groupId] : {};
  const {
    headerName = groupId ?? '',
    description = '',
    headerAlign = undefined
  } = group;
  let headerComponent;
  const render = groupId && columnGroupsLookup[groupId]?.renderHeaderGroup;
  const renderParams = React.useMemo(() => ({
    groupId,
    headerName,
    description,
    depth,
    maxDepth,
    fields,
    colIndex,
    isLastColumn
  }), [groupId, headerName, description, depth, maxDepth, fields, colIndex, isLastColumn]);
  if (groupId && render) {
    headerComponent = render(renderParams);
  }
  const showLeftBorder = (0, _cellBorderUtils.shouldCellShowLeftBorder)(pinnedPosition, indexInSection);
  const showRightBorder = (0, _cellBorderUtils.shouldCellShowRightBorder)(pinnedPosition, indexInSection, sectionLength, rootProps.showCellVerticalBorder, gridHasFiller);
  const ownerState = (0, _extends2.default)({}, props, {
    classes: rootProps.classes,
    showLeftBorder,
    showRightBorder,
    headerAlign,
    depth,
    isDragging: false
  });
  const label = headerName ?? groupId;
  const id = (0, _utils.unstable_useId)();
  const elementId = groupId === null ? `empty-group-cell-${id}` : groupId;
  const classes = useUtilityClasses(ownerState);
  React.useLayoutEffect(() => {
    if (hasFocus) {
      const focusableElement = headerCellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusableElement || headerCellRef.current;
      elementToFocus?.focus();
    }
  }, [apiRef, hasFocus]);
  const publish = React.useCallback(eventName => event => {
    // Ignore portal
    // See https://github.com/mui/mui-x/issues/1721
    if ((0, _domUtils.isEventTargetInPortal)(event)) {
      return;
    }
    apiRef.current.publishEvent(eventName, renderParams, event);
  },
  // For now this is stupid, because renderParams change all the time.
  // Need to move it's computation in the api, such that for a given depth+columnField, I can get the group parameters
  [apiRef, renderParams]);
  const mouseEventsHandlers = React.useMemo(() => ({
    onKeyDown: publish('columnGroupHeaderKeyDown'),
    onFocus: publish('columnGroupHeaderFocus'),
    onBlur: publish('columnGroupHeaderBlur')
  }), [publish]);
  const headerClassName = typeof group.headerClassName === 'function' ? group.headerClassName(renderParams) : group.headerClassName;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridGenericColumnHeaderItem.GridGenericColumnHeaderItem, (0, _extends2.default)({
    ref: headerCellRef,
    classes: classes,
    columnMenuOpen: false,
    colIndex: colIndex,
    height: height,
    isResizing: false,
    sortDirection: null,
    hasFocus: false,
    tabIndex: tabIndex,
    isDraggable: false,
    headerComponent: headerComponent,
    headerClassName: headerClassName,
    description: description,
    elementId: elementId,
    width: width,
    columnMenuIconButton: null,
    columnTitleIconButtons: null,
    resizable: true,
    label: label,
    "aria-colspan": fields.length
    // The fields are wrapped between |-...-| to avoid confusion between fields "id" and "id2" when using selector data-fields~=
    ,
    "data-fields": `|-${fields.join('-|-')}-|`,
    style: style
  }, mouseEventsHandlers));
}