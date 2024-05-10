"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGenericColumnHeaderItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _useGridPrivateApiContext = require("../../hooks/utils/useGridPrivateApiContext");
var _GridColumnHeaderTitle = require("./GridColumnHeaderTitle");
var _GridColumnHeaderSeparator = require("./GridColumnHeaderSeparator");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["classes", "columnMenuOpen", "colIndex", "height", "isResizing", "sortDirection", "hasFocus", "tabIndex", "separatorSide", "isDraggable", "headerComponent", "description", "elementId", "width", "columnMenuIconButton", "columnMenu", "columnTitleIconButtons", "headerClassName", "label", "resizable", "draggableContainerProps", "columnHeaderSeparatorProps", "style"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridGenericColumnHeaderItem = exports.GridGenericColumnHeaderItem = /*#__PURE__*/React.forwardRef(function GridGenericColumnHeaderItem(props, ref) {
  const {
      classes,
      columnMenuOpen,
      colIndex,
      height,
      isResizing,
      sortDirection,
      hasFocus,
      tabIndex,
      separatorSide,
      isDraggable,
      headerComponent,
      description,
      width,
      columnMenuIconButton = null,
      columnMenu = null,
      columnTitleIconButtons = null,
      headerClassName,
      label,
      resizable,
      draggableContainerProps,
      columnHeaderSeparatorProps,
      style
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const headerCellRef = React.useRef(null);
  const [showColumnMenuIcon, setShowColumnMenuIcon] = React.useState(columnMenuOpen);
  const handleRef = (0, _utils.unstable_useForkRef)(headerCellRef, ref);
  let ariaSort = 'none';
  if (sortDirection != null) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }
  React.useEffect(() => {
    if (!showColumnMenuIcon) {
      setShowColumnMenuIcon(columnMenuOpen);
    }
  }, [showColumnMenuIcon, columnMenuOpen]);
  React.useLayoutEffect(() => {
    const columnMenuState = apiRef.current.state.columnMenu;
    if (hasFocus && !columnMenuState.open) {
      const focusableElement = headerCellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusableElement || headerCellRef.current;
      elementToFocus?.focus();
      if (apiRef.current.columnHeadersContainerRef?.current) {
        apiRef.current.columnHeadersContainerRef.current.scrollLeft = 0;
      }
    }
  }, [apiRef, hasFocus]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    ref: handleRef,
    className: (0, _clsx.default)(classes.root, headerClassName),
    style: (0, _extends2.default)({}, style, {
      height,
      width,
      minWidth: width,
      maxWidth: width
    }),
    role: "columnheader",
    tabIndex: tabIndex,
    "aria-colindex": colIndex + 1,
    "aria-sort": ariaSort,
    "aria-label": headerComponent == null ? label : undefined
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
      className: classes.draggableContainer,
      draggable: isDraggable,
      role: "presentation"
    }, draggableContainerProps, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: classes.titleContainer,
        role: "presentation",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: classes.titleContainerContent,
          children: headerComponent !== undefined ? headerComponent : /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnHeaderTitle.GridColumnHeaderTitle, {
            label: label,
            description: description,
            columnWidth: width
          })
        }), columnTitleIconButtons]
      }), columnMenuIconButton]
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnHeaderSeparator.GridColumnHeaderSeparator, (0, _extends2.default)({
      resizable: !rootProps.disableColumnResize && !!resizable,
      resizing: isResizing,
      height: height,
      side: separatorSide
    }, columnHeaderSeparatorProps)), columnMenu]
  }));
});