"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GridVisibilityOffIcon = exports.GridViewStreamIcon = exports.GridViewHeadlineIcon = exports.GridViewColumnIcon = exports.GridTripleDotsVerticalIcon = exports.GridTableRowsIcon = exports.GridSeparatorIcon = exports.GridSearchIcon = exports.GridSaveAltIcon = exports.GridRemoveIcon = exports.GridMoreVertIcon = exports.GridMenuIcon = exports.GridLoadIcon = exports.GridKeyboardArrowRight = exports.GridKeyboardArrowLeft = exports.GridFilterListIcon = exports.GridFilterAltIcon = exports.GridExpandMoreIcon = exports.GridDragIcon = exports.GridDeleteIcon = exports.GridDeleteForeverIcon = exports.GridColumnIcon = exports.GridCloseIcon = exports.GridClearIcon = exports.GridCheckIcon = exports.GridCheckCircleIcon = exports.GridArrowUpwardIcon = exports.GridArrowDownwardIcon = exports.GridAddIcon = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _SvgIcon = _interopRequireDefault(require("@mui/joy/SvgIcon"));
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["sx", "fontSize"],
  _excluded2 = ["sortingOrder"];
/**
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
 * provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
 * FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
 * OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function createSvgIcon(path, displayName) {
  const fontSizeMap = {
    small: 'lg',
    medium: 'xl',
    large: 'xl2',
    inherit: undefined
  };
  // @ts-ignore internal component
  function Component(_ref, ref) {
    let {
        sx,
        fontSize
      } = _ref,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgIcon.default, (0, _extends2.default)({
      "data-testid": `${displayName}Icon`,
      ref: ref,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      sx: [{
        fill: 'none'
      }, ...(Array.isArray(sx) ? sx : [sx])],
      fontSize: fontSize ? fontSizeMap[fontSize] : undefined
    }, props, {
      children: path
    }));
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  // @ts-ignore internal component
  Component.muiName = _SvgIcon.default.muiName;

  // @ts-ignore internal component
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}
const GridArrowUpwardIcon = exports.GridArrowUpwardIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "12",
    x2: "12",
    y1: "19",
    y2: "5"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
    points: "5 12 12 5 19 12"
  })]
}), 'ArrowUpward');
const GridArrowDownwardIcon = exports.GridArrowDownwardIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "12",
    x2: "12",
    y1: "5",
    y2: "19"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
    points: "19 12 12 19 5 12"
  })]
}), 'ArrowDownward');
const GridKeyboardArrowLeft = exports.GridKeyboardArrowLeft = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
  points: "15 18 9 12 15 6"
}), 'KeyboardArrowLeft');
const GridKeyboardArrowRight = exports.GridKeyboardArrowRight = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
  points: "9 18 15 12 9 6"
}), 'KeyboardArrowRight');
const GridExpandMoreIcon = exports.GridExpandMoreIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "m7 15 5 5 5-5"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "m7 9 5-5 5 5"
  })]
}), 'ExpandMore');
const GridFilterListIcon = exports.GridFilterListIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("polygon", {
  points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
}), 'FilterList');
const GridFilterAltIcon = exports.GridFilterAltIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M7 12h10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M10 18h4"
  })]
}), 'FilterAlt');
const GridSearchIcon = exports.GridSearchIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "21",
    x2: "16.65",
    y1: "21",
    y2: "16.65"
  })]
}), 'Search');
const GridMenuIcon = exports.GridMenuIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M7 8h10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M7 12h10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M7 16h10"
  })]
}), 'Menu');
const GridCheckCircleIcon = exports.GridCheckCircleIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })]
}), 'CheckCircle');
const GridColumnIcon = exports.GridColumnIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "12",
    x2: "12",
    y1: "3",
    y2: "21"
  })]
}), 'ColumnIcon');
const GridSeparatorIcon = exports.GridSeparatorIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M11 19V5h2v14z"
}), 'Separator');
const GridViewHeadlineIcon = exports.GridViewHeadlineIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  d: "M3 12h18M3 12v4.5M3 12V7.5M21 12v4.5m0-4.5V7.5m-18 9v3.9a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6v-3.9m-18 0h18m0-9V3.6a.6.6 0 0 0-.6-.6H3.6a.6.6 0 0 0-.6.6v3.9m18 0H3"
}), 'ViewHeadline');
const GridTableRowsIcon = exports.GridTableRowsIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  fill: "currentColor",
  strokeWidth: "0",
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h14zm0 5v4H5v-4h14zM5 19v-3h14v3H5z"
}), 'TableRows');
const GridViewStreamIcon = exports.GridViewStreamIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 6h16"
}), 'ViewStream');
const GridTripleDotsVerticalIcon = exports.GridTripleDotsVerticalIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "19",
    r: "1"
  })]
}), 'TripleDotsVertical');
const GridCloseIcon = exports.GridCloseIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "15",
    x2: "9",
    y1: "9",
    y2: "15"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "9",
    x2: "15",
    y1: "9",
    y2: "15"
  })]
}), 'Close');
const GridAddIcon = exports.GridAddIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "12",
    x2: "12",
    y1: "8",
    y2: "16"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "8",
    x2: "16",
    y1: "12",
    y2: "12"
  })]
}), 'Add');
const GridRemoveIcon = exports.GridRemoveIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "15",
    x2: "9",
    y1: "9",
    y2: "15"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "9",
    x2: "15",
    y1: "9",
    y2: "15"
  })]
}), 'Remove');
const GridLoadIcon = exports.GridLoadIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "12",
    x2: "12",
    y1: "15",
    y2: "3"
  })]
}), 'Load');
const GridDragIcon = exports.GridDragIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "9",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "9",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "9",
    cy: "19",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "15",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "15",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "15",
    cy: "19",
    r: "1"
  })]
}), 'Drag');
const GridSaveAltIcon = exports.GridSaveAltIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M12 12v6"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "m15 15-3-3-3 3"
  })]
}), 'SaveAlt');
const GridCheckIcon = exports.GridCheckIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
  points: "20 6 9 17 4 12"
}), 'Check');
const GridMoreVertIcon = exports.GridMoreVertIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "19",
    r: "1"
  })]
}), 'MoreVert');
const GridVisibilityOffIcon = exports.GridVisibilityOffIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M9.88 9.88a3 3 0 1 0 4.24 4.24"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "2",
    x2: "22",
    y1: "2",
    y2: "22"
  })]
}), 'VisibilityOff');
const GridViewColumnIcon = exports.GridViewColumnIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
    width: "6",
    height: "20",
    x: "4",
    y: "2",
    rx: "2"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
    width: "6",
    height: "20",
    x: "14",
    y: "2",
    rx: "2"
  })]
}), 'ViewColumn');
const GridClearIcon = exports.GridClearIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M22 21H7"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "m5 11 9 9"
  })]
}), 'Clear');
const GridDeleteIcon = exports.GridDeleteIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "10",
    x2: "10",
    y1: "11",
    y2: "17"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "14",
    x2: "14",
    y1: "11",
    y2: "17"
  })]
}), 'Delete');
const GridDeleteForeverIcon = exports.GridDeleteForeverIcon = createSvgIcon( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "10",
    x2: "10",
    y1: "11",
    y2: "17"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: "14",
    x2: "14",
    y1: "11",
    y2: "17"
  })]
}), 'Delete');
const GridColumnUnsortedIcon = /*#__PURE__*/React.memo(function GridColumnHeaderSortIcon(props) {
  const {
      sortingOrder
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const [nextSortDirection] = sortingOrder;
  const Icon = nextSortDirection === 'asc' ? rootProps.slots.columnSortedAscendingIcon : rootProps.slots.columnSortedDescendingIcon;
  return Icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, (0, _extends2.default)({}, other)) : null;
});
const joyIconSlots = {
  booleanCellTrueIcon: GridCheckIcon,
  booleanCellFalseIcon: GridCloseIcon,
  columnMenuIcon: GridTripleDotsVerticalIcon,
  openFilterButtonIcon: GridFilterListIcon,
  filterPanelDeleteIcon: GridCloseIcon,
  columnFilteredIcon: GridFilterAltIcon,
  columnSelectorIcon: GridColumnIcon,
  columnUnsortedIcon: GridColumnUnsortedIcon,
  columnSortedAscendingIcon: GridArrowUpwardIcon,
  columnSortedDescendingIcon: GridArrowDownwardIcon,
  columnResizeIcon: GridSeparatorIcon,
  densityCompactIcon: GridViewHeadlineIcon,
  densityStandardIcon: GridTableRowsIcon,
  densityComfortableIcon: GridViewStreamIcon,
  exportIcon: GridSaveAltIcon,
  moreActionsIcon: GridMoreVertIcon,
  treeDataCollapseIcon: GridExpandMoreIcon,
  treeDataExpandIcon: GridKeyboardArrowRight,
  groupingCriteriaCollapseIcon: GridExpandMoreIcon,
  groupingCriteriaExpandIcon: GridKeyboardArrowRight,
  detailPanelExpandIcon: GridAddIcon,
  detailPanelCollapseIcon: GridRemoveIcon,
  rowReorderIcon: GridDragIcon,
  quickFilterIcon: GridSearchIcon,
  quickFilterClearIcon: GridCloseIcon,
  columnMenuHideIcon: GridVisibilityOffIcon,
  columnMenuSortAscendingIcon: GridArrowUpwardIcon,
  columnMenuSortDescendingIcon: GridArrowDownwardIcon,
  columnMenuFilterIcon: GridFilterAltIcon,
  columnMenuManageColumnsIcon: GridViewColumnIcon,
  columnMenuClearIcon: GridClearIcon,
  loadIcon: GridLoadIcon,
  filterPanelAddIcon: GridAddIcon,
  filterPanelRemoveAllIcon: GridDeleteForeverIcon,
  columnReorderIcon: GridDragIcon
};
var _default = exports.default = joyIconSlots;