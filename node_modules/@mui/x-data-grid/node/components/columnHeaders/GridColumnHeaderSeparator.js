"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaderSeparatorSides = exports.GridColumnHeaderSeparator = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _gridClasses = require("../../constants/gridClasses");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["resizable", "resizing", "height", "side"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var GridColumnHeaderSeparatorSides = exports.GridColumnHeaderSeparatorSides = /*#__PURE__*/function (GridColumnHeaderSeparatorSides) {
  GridColumnHeaderSeparatorSides["Left"] = "left";
  GridColumnHeaderSeparatorSides["Right"] = "right";
  return GridColumnHeaderSeparatorSides;
}(GridColumnHeaderSeparatorSides || {});
const useUtilityClasses = ownerState => {
  const {
    resizable,
    resizing,
    classes,
    side
  } = ownerState;
  const slots = {
    root: ['columnSeparator', resizable && 'columnSeparator--resizable', resizing && 'columnSeparator--resizing', side && `columnSeparator--side${(0, _utils.unstable_capitalize)(side)}`],
    icon: ['iconSeparator']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function GridColumnHeaderSeparatorRaw(props) {
  const {
      height,
      side = GridColumnHeaderSeparatorSides.Right
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, props, {
    side,
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const stopClick = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    (0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
      className: classes.root,
      style: {
        minHeight: height,
        opacity: rootProps.showColumnVerticalBorder ? 0 : 1
      }
    }, other, {
      onClick: stopClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnResizeIcon, {
        className: classes.icon
      })
    }))
  );
}
const GridColumnHeaderSeparator = exports.GridColumnHeaderSeparator = /*#__PURE__*/React.memo(GridColumnHeaderSeparatorRaw);
process.env.NODE_ENV !== "production" ? GridColumnHeaderSeparatorRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  height: _propTypes.default.number.isRequired,
  resizable: _propTypes.default.bool.isRequired,
  resizing: _propTypes.default.bool.isRequired,
  side: _propTypes.default.oneOf(['left', 'right'])
} : void 0;