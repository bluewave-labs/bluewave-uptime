"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayCalendarSkeleton = DayCalendarSkeleton;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Skeleton = _interopRequireDefault(require("@mui/material/Skeleton"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _dimensions = require("../internals/constants/dimensions");
var _dayCalendarSkeletonClasses = require("./dayCalendarSkeletonClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    week: ['week'],
    daySkeleton: ['daySkeleton']
  };
  return (0, _utils.unstable_composeClasses)(slots, _dayCalendarSkeletonClasses.getDayCalendarSkeletonUtilityClass, classes);
};
const DayCalendarSkeletonRoot = (0, _styles.styled)('div', {
  name: 'MuiDayCalendarSkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  alignSelf: 'start'
});
const DayCalendarSkeletonWeek = (0, _styles.styled)('div', {
  name: 'MuiDayCalendarSkeleton',
  slot: 'Week',
  overridesResolver: (props, styles) => styles.week
})({
  margin: `${_dimensions.DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
const DayCalendarSkeletonDay = (0, _styles.styled)(_Skeleton.default, {
  name: 'MuiDayCalendarSkeleton',
  slot: 'DaySkeleton',
  overridesResolver: (props, styles) => styles.daySkeleton
})({
  margin: `0 ${_dimensions.DAY_MARGIN}px`,
  variants: [{
    props: {
      day: 0
    },
    style: {
      visibility: 'hidden'
    }
  }]
});
DayCalendarSkeletonDay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: _propTypes.default.shape({
    day: _propTypes.default.number.isRequired
  }).isRequired
};
const monthMap = [[0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0]];

/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://mui.com/x/api/date-pickers/calendar-picker-skeleton/)
 */
function DayCalendarSkeleton(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDayCalendarSkeleton'
  });
  const {
      className
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const classes = useUtilityClasses(other);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DayCalendarSkeletonRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className)
  }, other, {
    children: monthMap.map((week, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(DayCalendarSkeletonWeek, {
      className: classes.week,
      children: week.map((day, index2) => /*#__PURE__*/(0, _jsxRuntime.jsx)(DayCalendarSkeletonDay, {
        variant: "circular",
        width: _dimensions.DAY_SIZE,
        height: _dimensions.DAY_SIZE,
        className: classes.daySkeleton,
        ownerState: {
          day
        }
      }, index2))
    }, index))
  }));
}
process.env.NODE_ENV !== "production" ? DayCalendarSkeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;