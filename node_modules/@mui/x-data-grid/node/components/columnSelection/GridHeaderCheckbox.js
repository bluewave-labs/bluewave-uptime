"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridHeaderCheckbox = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _utils2 = require("../../hooks/features/rowSelection/utils");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _gridFocusStateSelector = require("../../hooks/features/focus/gridFocusStateSelector");
var _gridRowSelectionSelector = require("../../hooks/features/rowSelection/gridRowSelectionSelector");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _gridClasses = require("../../constants/gridClasses");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");
var _gridPaginationSelector = require("../../hooks/features/pagination/gridPaginationSelector");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["field", "colDef"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['checkboxInput']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const GridHeaderCheckbox = exports.GridHeaderCheckbox = /*#__PURE__*/React.forwardRef(function GridHeaderCheckbox(props, ref) {
  const other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [, forceUpdate] = React.useState(false);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const tabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnHeaderSelector);
  const selection = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowSelectionSelector.gridRowSelectionStateSelector);
  const visibleRowIds = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridExpandedSortedRowIdsSelector);
  const paginatedVisibleRowIds = (0, _useGridSelector.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginatedVisibleSortedGridRowIdsSelector);
  const filteredSelection = React.useMemo(() => {
    if (typeof rootProps.isRowSelectable !== 'function') {
      return selection;
    }
    return selection.filter(id => {
      // The row might have been deleted
      if (!apiRef.current.getRow(id)) {
        return false;
      }
      return rootProps.isRowSelectable(apiRef.current.getRowParams(id));
    });
  }, [apiRef, rootProps.isRowSelectable, selection]);

  // All the rows that could be selected / unselected by toggling this checkbox
  const selectionCandidates = React.useMemo(() => {
    const rowIds = !rootProps.pagination || !rootProps.checkboxSelectionVisibleOnly ? visibleRowIds : paginatedVisibleRowIds;

    // Convert to an object to make O(1) checking if a row exists or not
    // TODO create selector that returns visibleRowIds/paginatedVisibleRowIds as an object
    return rowIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  }, [rootProps.pagination, rootProps.checkboxSelectionVisibleOnly, paginatedVisibleRowIds, visibleRowIds]);

  // Amount of rows selected and that are visible in the current page
  const currentSelectionSize = React.useMemo(() => filteredSelection.filter(id => selectionCandidates[id]).length, [filteredSelection, selectionCandidates]);
  const isIndeterminate = currentSelectionSize > 0 && currentSelectionSize < Object.keys(selectionCandidates).length;
  const isChecked = currentSelectionSize > 0;
  const handleChange = event => {
    const params = {
      value: event.target.checked
    };
    apiRef.current.publishEvent('headerSelectionCheckboxChange', params);
  };
  const tabIndex = tabIndexState !== null && tabIndexState.field === props.field ? 0 : -1;
  React.useLayoutEffect(() => {
    const element = apiRef.current.getColumnHeaderElement(props.field);
    if (tabIndex === 0 && element) {
      element.tabIndex = -1;
    }
  }, [tabIndex, apiRef, props.field]);
  const handleKeyDown = React.useCallback(event => {
    if (event.key === ' ') {
      // imperative toggle the checkbox because Space is disable by some preventDefault
      apiRef.current.publishEvent('headerSelectionCheckboxChange', {
        value: !isChecked
      });
    }
  }, [apiRef, isChecked]);
  const handleSelectionChange = React.useCallback(() => {
    forceUpdate(p => !p);
  }, []);
  React.useEffect(() => {
    return apiRef.current.subscribeEvent('rowSelectionChange', handleSelectionChange);
  }, [apiRef, handleSelectionChange]);
  const label = apiRef.current.getLocaleText(isChecked ? 'checkboxSelectionUnselectAllRows' : 'checkboxSelectionSelectAllRows');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseCheckbox, (0, _extends2.default)({
    ref: ref,
    indeterminate: isIndeterminate,
    checked: isChecked,
    onChange: handleChange,
    className: classes.root,
    inputProps: {
      'aria-label': label
    },
    tabIndex: tabIndex,
    onKeyDown: handleKeyDown,
    disabled: !(0, _utils2.isMultipleRowSelectionEnabled)(rootProps)
  }, rootProps.slotProps?.baseCheckbox, other));
});
process.env.NODE_ENV !== "production" ? GridHeaderCheckbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The column of the current header component.
   */
  colDef: _propTypes.default.object.isRequired,
  /**
   * The column field of the column that triggered the event
   */
  field: _propTypes.default.string.isRequired
} : void 0;