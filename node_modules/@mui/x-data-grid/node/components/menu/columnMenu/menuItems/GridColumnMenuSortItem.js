"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuSortItem = GridColumnMenuSortItem;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _useGridSelector = require("../../../../hooks/utils/useGridSelector");
var _gridSortingSelector = require("../../../../hooks/features/sorting/gridSortingSelector");
var _useGridApiContext = require("../../../../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../../../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridColumnMenuSortItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const sortModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortModelSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const sortDirection = React.useMemo(() => {
    if (!colDef) {
      return null;
    }
    const sortItem = sortModel.find(item => item.field === colDef.field);
    return sortItem?.sort;
  }, [colDef, sortModel]);
  const sortingOrder = colDef.sortingOrder ?? rootProps.sortingOrder;
  const onSortMenuItemClick = React.useCallback(event => {
    onClick(event);
    const direction = event.currentTarget.getAttribute('data-value') || null;
    apiRef.current.sortColumn(colDef.field, direction === sortDirection ? null : direction);
  }, [apiRef, colDef, onClick, sortDirection]);
  if (rootProps.disableColumnSorting || !colDef || !colDef.sortable || !sortingOrder.some(item => !!item)) {
    return null;
  }
  const getLabel = key => {
    const label = apiRef.current.getLocaleText(key);
    return typeof label === 'function' ? label(colDef) : label;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [sortingOrder.includes('asc') && sortDirection !== 'asc' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: onSortMenuItemClick,
      "data-value": "asc",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuSortAscendingIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: getLabel('columnMenuSortAsc')
      })]
    }) : null, sortingOrder.includes('desc') && sortDirection !== 'desc' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: onSortMenuItemClick,
      "data-value": "desc",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuSortDescendingIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: getLabel('columnMenuSortDesc')
      })]
    }) : null, sortingOrder.includes(null) && sortDirection != null ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: onSortMenuItemClick,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: apiRef.current.getLocaleText('columnMenuUnsort')
      })]
    }) : null]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuSortItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  onClick: _propTypes.default.func.isRequired
} : void 0;