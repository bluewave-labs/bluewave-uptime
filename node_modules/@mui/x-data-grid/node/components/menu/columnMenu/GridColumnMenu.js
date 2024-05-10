"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGenericColumnMenu = exports.GridColumnMenu = exports.GRID_COLUMN_MENU_SLOT_PROPS = exports.GRID_COLUMN_MENU_SLOTS = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useGridColumnMenuSlots = require("../../../hooks/features/columnMenu/useGridColumnMenuSlots");
var _GridColumnMenuContainer = require("./GridColumnMenuContainer");
var _GridColumnMenuColumnsItem = require("./menuItems/GridColumnMenuColumnsItem");
var _GridColumnMenuFilterItem = require("./menuItems/GridColumnMenuFilterItem");
var _GridColumnMenuSortItem = require("./menuItems/GridColumnMenuSortItem");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["defaultSlots", "defaultSlotProps", "slots", "slotProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GRID_COLUMN_MENU_SLOTS = exports.GRID_COLUMN_MENU_SLOTS = {
  columnMenuSortItem: _GridColumnMenuSortItem.GridColumnMenuSortItem,
  columnMenuFilterItem: _GridColumnMenuFilterItem.GridColumnMenuFilterItem,
  columnMenuColumnsItem: _GridColumnMenuColumnsItem.GridColumnMenuColumnsItem
};
const GRID_COLUMN_MENU_SLOT_PROPS = exports.GRID_COLUMN_MENU_SLOT_PROPS = {
  columnMenuSortItem: {
    displayOrder: 10
  },
  columnMenuFilterItem: {
    displayOrder: 20
  },
  columnMenuColumnsItem: {
    displayOrder: 30
  }
};
const GridGenericColumnMenu = exports.GridGenericColumnMenu = /*#__PURE__*/React.forwardRef(function GridGenericColumnMenu(props, ref) {
  const {
      defaultSlots,
      defaultSlotProps,
      slots,
      slotProps
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const orderedSlots = (0, _useGridColumnMenuSlots.useGridColumnMenuSlots)((0, _extends2.default)({}, other, {
    defaultSlots,
    defaultSlotProps,
    slots,
    slotProps
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnMenuContainer.GridColumnMenuContainer, (0, _extends2.default)({
    ref: ref
  }, other, {
    children: orderedSlots.map(([Component, otherProps], index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, (0, _extends2.default)({}, otherProps), index))
  }));
});
const GridColumnMenu = exports.GridColumnMenu = /*#__PURE__*/React.forwardRef(function GridColumnMenu(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridGenericColumnMenu, (0, _extends2.default)({}, props, {
    ref: ref,
    defaultSlots: GRID_COLUMN_MENU_SLOTS,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  hideMenu: _propTypes.default.func.isRequired,
  id: _propTypes.default.string,
  labelledby: _propTypes.default.string,
  open: _propTypes.default.bool.isRequired,
  /**
   * Could be used to pass new props or override props specific to a column menu component
   * e.g. `displayOrder`
   */
  slotProps: _propTypes.default.object,
  /**
   * `slots` could be used to add new and (or) override default column menu items
   * If you register a nee component you must pass it's `displayOrder` in `slotProps`
   * or it will be placed in the end of the list
   */
  slots: _propTypes.default.object
} : void 0;