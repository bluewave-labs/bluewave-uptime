"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePickerToolbar = TimePickerToolbar;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _PickersToolbarText = require("../internals/components/PickersToolbarText");
var _PickersToolbarButton = require("../internals/components/PickersToolbarButton");
var _PickersToolbar = require("../internals/components/PickersToolbar");
var _utils2 = require("../internals/utils/utils");
var _useUtils = require("../internals/hooks/useUtils");
var _dateHelpersHooks = require("../internals/hooks/date-helpers-hooks");
var _timePickerToolbarClasses = require("./timePickerToolbarClasses");
var _dateUtils = require("../internals/utils/date-utils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["ampm", "ampmInClock", "value", "isLandscape", "onChange", "view", "onViewChange", "views", "disabled", "readOnly", "className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    theme,
    isLandscape,
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    separator: ['separator'],
    hourMinuteLabel: ['hourMinuteLabel', isLandscape && 'hourMinuteLabelLandscape', theme.direction === 'rtl' && 'hourMinuteLabelReverse'],
    ampmSelection: ['ampmSelection', isLandscape && 'ampmLandscape'],
    ampmLabel: ['ampmLabel']
  };
  return (0, _utils.unstable_composeClasses)(slots, _timePickerToolbarClasses.getTimePickerToolbarUtilityClass, classes);
};
const TimePickerToolbarRoot = (0, _styles.styled)(_PickersToolbar.PickersToolbar, {
  name: 'MuiTimePickerToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});
const TimePickerToolbarSeparator = (0, _styles.styled)(_PickersToolbarText.PickersToolbarText, {
  name: 'MuiTimePickerToolbar',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({
  outline: 0,
  margin: '0 4px 0 2px',
  cursor: 'default'
});
const TimePickerToolbarHourMinuteLabel = (0, _styles.styled)('div', {
  name: 'MuiTimePickerToolbar',
  slot: 'HourMinuteLabel',
  overridesResolver: (props, styles) => [{
    [`&.${_timePickerToolbarClasses.timePickerToolbarClasses.hourMinuteLabelLandscape}`]: styles.hourMinuteLabelLandscape,
    [`&.${_timePickerToolbarClasses.timePickerToolbarClasses.hourMinuteLabelReverse}`]: styles.hourMinuteLabelReverse
  }, styles.hourMinuteLabel]
})(({
  theme
}) => (0, _extends2.default)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
}, theme.direction === 'rtl' && {
  flexDirection: 'row-reverse'
}, {
  variants: [{
    props: {
      isLandscape: true
    },
    style: {
      marginTop: 'auto'
    }
  }]
}));
TimePickerToolbarHourMinuteLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  as: _propTypes.default.elementType,
  ownerState: _propTypes.default.object.isRequired,
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
};
const TimePickerToolbarAmPmSelection = (0, _styles.styled)('div', {
  name: 'MuiTimePickerToolbar',
  slot: 'AmPmSelection',
  overridesResolver: (props, styles) => [{
    [`.${_timePickerToolbarClasses.timePickerToolbarClasses.ampmLabel}`]: styles.ampmLabel
  }, {
    [`&.${_timePickerToolbarClasses.timePickerToolbarClasses.ampmLandscape}`]: styles.ampmLandscape
  }, styles.ampmSelection]
})({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 'auto',
  marginLeft: 12,
  [`& .${_timePickerToolbarClasses.timePickerToolbarClasses.ampmLabel}`]: {
    fontSize: 17
  },
  variants: [{
    props: {
      isLandscape: true
    },
    style: {
      margin: '4px 0 auto',
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexBasis: '100%'
    }
  }]
});
TimePickerToolbarAmPmSelection.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  as: _propTypes.default.elementType,
  ownerState: _propTypes.default.object.isRequired,
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
};

/**
 * Demos:
 *
 * - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
 * - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [TimePickerToolbar API](https://mui.com/x/api/date-pickers/time-picker-toolbar/)
 */
function TimePickerToolbar(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiTimePickerToolbar'
  });
  const {
      ampm,
      ampmInClock,
      value,
      isLandscape,
      onChange,
      view,
      onViewChange,
      views,
      disabled,
      readOnly,
      className
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const localeText = (0, _useUtils.useLocaleText)();
  const theme = (0, _styles.useTheme)();
  const showAmPmControl = Boolean(ampm && !ampmInClock && views.includes('hours'));
  const {
    meridiemMode,
    handleMeridiemChange
  } = (0, _dateHelpersHooks.useMeridiemMode)(value, ampm, onChange);
  const formatHours = time => ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  const ownerState = props;
  const classes = useUtilityClasses((0, _extends2.default)({}, ownerState, {
    theme
  }));
  const separator = /*#__PURE__*/(0, _jsxRuntime.jsx)(TimePickerToolbarSeparator, {
    tabIndex: -1,
    value: ":",
    variant: "h3",
    selected: false,
    className: classes.separator
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(TimePickerToolbarRoot, (0, _extends2.default)({
    landscapeDirection: "row",
    toolbarTitle: localeText.timePickerToolbarTitle,
    isLandscape: isLandscape,
    ownerState: ownerState,
    className: (0, _clsx.default)(classes.root, className)
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(TimePickerToolbarHourMinuteLabel, {
      className: classes.hourMinuteLabel,
      ownerState: ownerState,
      children: [(0, _utils2.arrayIncludes)(views, 'hours') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
        tabIndex: -1,
        variant: "h3",
        onClick: () => onViewChange('hours'),
        selected: view === 'hours',
        value: value ? formatHours(value) : '--'
      }), (0, _utils2.arrayIncludes)(views, ['hours', 'minutes']) && separator, (0, _utils2.arrayIncludes)(views, 'minutes') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
        tabIndex: -1,
        variant: "h3",
        onClick: () => onViewChange('minutes'),
        selected: view === 'minutes',
        value: value ? utils.format(value, 'minutes') : '--'
      }), (0, _utils2.arrayIncludes)(views, ['minutes', 'seconds']) && separator, (0, _utils2.arrayIncludes)(views, 'seconds') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
        variant: "h3",
        onClick: () => onViewChange('seconds'),
        selected: view === 'seconds',
        value: value ? utils.format(value, 'seconds') : '--'
      })]
    }), showAmPmControl && /*#__PURE__*/(0, _jsxRuntime.jsxs)(TimePickerToolbarAmPmSelection, {
      className: classes.ampmSelection,
      ownerState: ownerState,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
        disableRipple: true,
        variant: "subtitle2",
        selected: meridiemMode === 'am',
        typographyClassName: classes.ampmLabel,
        value: (0, _dateUtils.formatMeridiem)(utils, 'am'),
        onClick: readOnly ? undefined : () => handleMeridiemChange('am'),
        disabled: disabled
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
        disableRipple: true,
        variant: "subtitle2",
        selected: meridiemMode === 'pm',
        typographyClassName: classes.ampmLabel,
        value: (0, _dateUtils.formatMeridiem)(utils, 'pm'),
        onClick: readOnly ? undefined : () => handleMeridiemChange('pm'),
        disabled: disabled
      })]
    })]
  }));
}
process.env.NODE_ENV !== "production" ? TimePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ampm: _propTypes.default.bool,
  ampmInClock: _propTypes.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: _propTypes.default.bool,
  isLandscape: _propTypes.default.bool.isRequired,
  onChange: _propTypes.default.func.isRequired,
  /**
   * Callback called when a toolbar is clicked
   * @template TView
   * @param {TView} view The view to open
   */
  onViewChange: _propTypes.default.func.isRequired,
  readOnly: _propTypes.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  titleId: _propTypes.default.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: _propTypes.default.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: _propTypes.default.node,
  value: _propTypes.default.object,
  /**
   * Currently visible picker view.
   */
  view: _propTypes.default.oneOf(['hours', 'meridiem', 'minutes', 'seconds']).isRequired,
  /**
   * Available views.
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['hours', 'meridiem', 'minutes', 'seconds']).isRequired).isRequired
} : void 0;