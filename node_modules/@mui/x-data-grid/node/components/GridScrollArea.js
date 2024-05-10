"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridScrollArea = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _system = require("@mui/system");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _constants = require("../constants");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _useGridApiEventHandler = require("../hooks/utils/useGridApiEventHandler");
var _useGridSelector = require("../hooks/utils/useGridSelector");
var _gridDimensionsSelectors = require("../hooks/features/dimensions/gridDimensionsSelectors");
var _densitySelector = require("../hooks/features/density/densitySelector");
var _gridColumnsSelector = require("../hooks/features/columns/gridColumnsSelector");
var _useTimeout = require("../hooks/utils/useTimeout");
var _gridColumnsUtils = require("../hooks/features/columns/gridColumnsUtils");
var _fastMemo = require("../utils/fastMemo");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CLIFF = 1;
const SLOP = 1.5;
const useUtilityClasses = ownerState => {
  const {
    scrollDirection,
    classes
  } = ownerState;
  const slots = {
    root: ['scrollArea', `scrollArea--${scrollDirection}`]
  };
  return (0, _utils.unstable_composeClasses)(slots, _constants.getDataGridUtilityClass, classes);
};
const GridScrollAreaRawRoot = (0, _system.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ScrollArea',
  overridesResolver: (props, styles) => [{
    [`&.${_constants.gridClasses['scrollArea--left']}`]: styles['scrollArea--left']
  }, {
    [`&.${_constants.gridClasses['scrollArea--right']}`]: styles['scrollArea--right']
  }, styles.scrollArea]
})(() => ({
  position: 'absolute',
  top: 0,
  zIndex: 101,
  width: 20,
  bottom: 0,
  [`&.${_constants.gridClasses['scrollArea--left']}`]: {
    left: 0
  },
  [`&.${_constants.gridClasses['scrollArea--right']}`]: {
    right: 0
  }
}));
function GridScrollAreaRaw(props) {
  const {
    scrollDirection
  } = props;
  const rootRef = React.useRef(null);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const timeout = (0, _useTimeout.useTimeout)();
  const densityFactor = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityFactorSelector);
  const columnsTotalWidth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnsTotalWidthSelector);
  const dimensions = (0, _useGridSelector.useGridSelector)(apiRef, _gridDimensionsSelectors.gridDimensionsSelector);
  const scrollPosition = React.useRef({
    left: 0,
    top: 0
  });
  const getCanScrollMore = () => {
    if (scrollDirection === 'left') {
      // Only render if the user has not reached yet the start of the list
      return scrollPosition.current.left > 0;
    }
    if (scrollDirection === 'right') {
      // Only render if the user has not reached yet the end of the list
      const maxScrollLeft = columnsTotalWidth - dimensions.viewportInnerSize.width;
      return scrollPosition.current.left < maxScrollLeft;
    }
    return false;
  };
  const [dragging, setDragging] = React.useState(false);
  const [canScrollMore, setCanScrollMore] = React.useState(getCanScrollMore);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, rootProps, {
    scrollDirection
  });
  const classes = useUtilityClasses(ownerState);
  const totalHeaderHeight = (0, _gridColumnsUtils.getTotalHeaderHeight)(apiRef, rootProps);
  const headerHeight = Math.floor(rootProps.columnHeaderHeight * densityFactor);
  const style = {
    height: headerHeight,
    top: totalHeaderHeight - headerHeight
  };
  if (scrollDirection === 'left') {
    style.left = dimensions.leftPinnedWidth;
  } else if (scrollDirection === 'right') {
    style.right = dimensions.rightPinnedWidth + (dimensions.hasScrollX ? dimensions.scrollbarSize : 0);
  }
  const handleScrolling = newScrollPosition => {
    scrollPosition.current = newScrollPosition;
    setCanScrollMore(getCanScrollMore);
  };
  const handleDragOver = (0, _utils.unstable_useEventCallback)(event => {
    let offset;

    // Prevents showing the forbidden cursor
    event.preventDefault();
    if (scrollDirection === 'left') {
      offset = event.clientX - rootRef.current.getBoundingClientRect().right;
    } else if (scrollDirection === 'right') {
      offset = Math.max(1, event.clientX - rootRef.current.getBoundingClientRect().left);
    } else {
      throw new Error('MUI X: Wrong drag direction');
    }
    offset = (offset - CLIFF) * SLOP + CLIFF;

    // Avoid freeze and inertia.
    timeout.start(0, () => {
      apiRef.current.scroll({
        left: scrollPosition.current.left + offset,
        top: scrollPosition.current.top
      });
    });
  });
  const handleColumnHeaderDragStart = (0, _utils.unstable_useEventCallback)(() => {
    setDragging(true);
  });
  const handleColumnHeaderDragEnd = (0, _utils.unstable_useEventCallback)(() => {
    setDragging(false);
  });
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'scrollPositionChange', handleScrolling);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnHeaderDragStart', handleColumnHeaderDragStart);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'columnHeaderDragEnd', handleColumnHeaderDragEnd);
  if (!dragging || !canScrollMore) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridScrollAreaRawRoot, {
    ref: rootRef,
    className: (0, _clsx.default)(classes.root),
    ownerState: ownerState,
    onDragOver: handleDragOver,
    style: style
  });
}
process.env.NODE_ENV !== "production" ? GridScrollAreaRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  scrollDirection: _propTypes.default.oneOf(['left', 'right']).isRequired
} : void 0;
const GridScrollArea = exports.GridScrollArea = (0, _fastMemo.fastMemo)(GridScrollAreaRaw);