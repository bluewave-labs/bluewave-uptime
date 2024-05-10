"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerTabs = void 0;
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Tabs = _interopRequireWildcard(require("@mui/material/Tabs"));
var _styles = require("@mui/material/styles");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _icons = require("../icons");
var _useUtils = require("../internals/hooks/useUtils");
var _dateTimePickerTabsClasses = require("./dateTimePickerTabsClasses");
var _dateUtils = require("../internals/utils/date-utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const viewToTab = view => {
  if ((0, _dateUtils.isDatePickerView)(view)) {
    return 'date';
  }
  return 'time';
};
const tabToView = tab => {
  if (tab === 'date') {
    return 'day';
  }
  return 'hours';
};
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _composeClasses.default)(slots, _dateTimePickerTabsClasses.getDateTimePickerTabsUtilityClass, classes);
};
const DateTimePickerTabsRoot = (0, _styles.styled)(_Tabs.default, {
  name: 'MuiDateTimePickerTabs',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  boxShadow: `0 -1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
  '&:last-child': {
    boxShadow: `0 1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
    [`& .${_Tabs.tabsClasses.indicator}`]: {
      bottom: 'auto',
      top: 0
    }
  }
}));

/**
 * Demos:
 *
 * - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
 * - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [DateTimePickerTabs API](https://mui.com/x/api/date-pickers/date-time-picker-tabs/)
 */
const DateTimePickerTabs = exports.DateTimePickerTabs = function DateTimePickerTabs(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDateTimePickerTabs'
  });
  const {
    dateIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.DateRangeIcon, {}),
    onViewChange,
    timeIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.TimeIcon, {}),
    view,
    hidden = typeof window === 'undefined' || window.innerHeight < 667,
    className,
    sx
  } = props;
  const localeText = (0, _useUtils.useLocaleText)();
  const classes = useUtilityClasses(props);
  const handleChange = (event, value) => {
    onViewChange(tabToView(value));
  };
  if (hidden) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerTabsRoot, {
    ownerState: props,
    variant: "fullWidth",
    value: viewToTab(view),
    onChange: handleChange,
    className: (0, _clsx.default)(className, classes.root),
    sx: sx,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
      value: "date",
      "aria-label": localeText.dateTableLabel,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
        children: dateIcon
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
      value: "time",
      "aria-label": localeText.timeTableLabel,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
        children: timeIcon
      })
    })]
  });
};
process.env.NODE_ENV !== "production" ? DateTimePickerTabs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  /**
   * Date tab icon.
   * @default DateRange
   */
  dateIcon: _propTypes.default.node,
  /**
   * Toggles visibility of the tabs allowing view switching.
   * @default `window.innerHeight < 667` for `DesktopDateTimePicker` and `MobileDateTimePicker`, `displayStaticWrapperAs === 'desktop'` for `StaticDateTimePicker`
   */
  hidden: _propTypes.default.bool,
  /**
   * Callback called when a tab is clicked.
   * @template TView
   * @param {TView} view The view to open
   */
  onViewChange: _propTypes.default.func.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * Time tab icon.
   * @default Time
   */
  timeIcon: _propTypes.default.node,
  /**
   * Currently visible picker view.
   */
  view: _propTypes.default.oneOf(['day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'year']).isRequired
} : void 0;