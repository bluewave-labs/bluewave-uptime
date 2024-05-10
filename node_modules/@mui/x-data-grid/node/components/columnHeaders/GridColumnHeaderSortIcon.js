"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaderSortIcon = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _Badge = _interopRequireDefault(require("@mui/material/Badge"));
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _gridClasses = require("../../constants/gridClasses");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _GridIconButtonContainer = require("./GridIconButtonContainer");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    icon: ['sortIcon']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function getIcon(icons, direction, className, sortingOrder) {
  let Icon;
  const iconProps = {};
  if (direction === 'asc') {
    Icon = icons.columnSortedAscendingIcon;
  } else if (direction === 'desc') {
    Icon = icons.columnSortedDescendingIcon;
  } else {
    Icon = icons.columnUnsortedIcon;
    iconProps.sortingOrder = sortingOrder;
  }
  return Icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, (0, _extends2.default)({
    fontSize: "small",
    className: className
  }, iconProps)) : null;
}
function GridColumnHeaderSortIconRaw(props) {
  const {
    direction,
    index,
    sortingOrder,
    disabled
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, props, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const iconElement = getIcon(rootProps.slots, direction, classes.icon, sortingOrder);
  if (!iconElement) {
    return null;
  }
  const iconButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseIconButton, (0, _extends2.default)({
    tabIndex: -1,
    "aria-label": apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    title: apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    size: "small",
    disabled: disabled
  }, rootProps.slotProps?.baseIconButton, {
    children: iconElement
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridIconButtonContainer.GridIconButtonContainer, {
    children: [index != null && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
      badgeContent: index,
      color: "default",
      children: iconButton
    }), index == null && iconButton]
  });
}
const GridColumnHeaderSortIcon = exports.GridColumnHeaderSortIcon = /*#__PURE__*/React.memo(GridColumnHeaderSortIconRaw);
process.env.NODE_ENV !== "production" ? GridColumnHeaderSortIconRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  direction: _propTypes.default.oneOf(['asc', 'desc']),
  disabled: _propTypes.default.bool,
  index: _propTypes.default.number,
  sortingOrder: _propTypes.default.arrayOf(_propTypes.default.oneOf(['asc', 'desc'])).isRequired
} : void 0;