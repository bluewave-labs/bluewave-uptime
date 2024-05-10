"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersCalendarHeader = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Fade = _interopRequireDefault(require("@mui/material/Fade"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/base/utils");
var _utils2 = require("@mui/utils");
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _useUtils = require("../internals/hooks/useUtils");
var _PickersFadeTransitionGroup = require("../DateCalendar/PickersFadeTransitionGroup");
var _icons = require("../icons");
var _PickersArrowSwitcher = require("../internals/components/PickersArrowSwitcher");
var _dateHelpersHooks = require("../internals/hooks/date-helpers-hooks");
var _pickersCalendarHeaderClasses = require("./pickersCalendarHeaderClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "currentMonth", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onMonthChange", "onViewChange", "view", "reduceAnimations", "views", "labelId", "className", "timezone", "format"],
  _excluded2 = ["ownerState"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    labelContainer: ['labelContainer'],
    label: ['label'],
    switchViewButton: ['switchViewButton'],
    switchViewIcon: ['switchViewIcon']
  };
  return (0, _utils2.unstable_composeClasses)(slots, _pickersCalendarHeaderClasses.getPickersCalendarHeaderUtilityClass, classes);
};
const PickersCalendarHeaderRoot = (0, _styles.styled)('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({
  display: 'flex',
  alignItems: 'center',
  marginTop: 12,
  marginBottom: 4,
  paddingLeft: 24,
  paddingRight: 12,
  // prevent jumping in safari
  maxHeight: 40,
  minHeight: 40
});
const PickersCalendarHeaderLabelContainer = (0, _styles.styled)('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'LabelContainer',
  overridesResolver: (_, styles) => styles.labelContainer
})(({
  theme
}) => (0, _extends2.default)({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: 'auto'
}, theme.typography.body1, {
  fontWeight: theme.typography.fontWeightMedium
}));
const PickersCalendarHeaderLabel = (0, _styles.styled)('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Label',
  overridesResolver: (_, styles) => styles.label
})({
  marginRight: 6
});
const PickersCalendarHeaderSwitchViewButton = (0, _styles.styled)(_IconButton.default, {
  name: 'MuiPickersCalendarHeader',
  slot: 'SwitchViewButton',
  overridesResolver: (_, styles) => styles.switchViewButton
})({
  marginRight: 'auto',
  variants: [{
    props: {
      view: 'year'
    },
    style: {
      [`.${_pickersCalendarHeaderClasses.pickersCalendarHeaderClasses.switchViewIcon}`]: {
        transform: 'rotate(180deg)'
      }
    }
  }]
});
const PickersCalendarHeaderSwitchViewIcon = (0, _styles.styled)(_icons.ArrowDropDownIcon, {
  name: 'MuiPickersCalendarHeader',
  slot: 'SwitchViewIcon',
  overridesResolver: (_, styles) => styles.switchViewIcon
})(({
  theme
}) => ({
  willChange: 'transform',
  transition: theme.transitions.create('transform'),
  transform: 'rotate(0deg)'
}));
/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 * - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
 * - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [PickersCalendarHeader API](https://mui.com/x/api/date-pickers/pickers-calendar-header/)
 */
const PickersCalendarHeader = exports.PickersCalendarHeader = /*#__PURE__*/React.forwardRef(function PickersCalendarHeader(inProps, ref) {
  const localeText = (0, _useUtils.useLocaleText)();
  const utils = (0, _useUtils.useUtils)();
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersCalendarHeader'
  });
  const {
      slots,
      slotProps,
      currentMonth: month,
      disabled,
      disableFuture,
      disablePast,
      maxDate,
      minDate,
      onMonthChange,
      onViewChange,
      view,
      reduceAnimations,
      views,
      labelId,
      className,
      timezone,
      format = `${utils.formats.month} ${utils.formats.year}`
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(props);
  const SwitchViewButton = slots?.switchViewButton ?? PickersCalendarHeaderSwitchViewButton;
  const switchViewButtonProps = (0, _utils.useSlotProps)({
    elementType: SwitchViewButton,
    externalSlotProps: slotProps?.switchViewButton,
    additionalProps: {
      size: 'small',
      'aria-label': localeText.calendarViewSwitchingButtonAriaLabel(view)
    },
    ownerState,
    className: classes.switchViewButton
  });
  const SwitchViewIcon = slots?.switchViewIcon ?? PickersCalendarHeaderSwitchViewIcon;
  // The spread is here to avoid this bug mui/material-ui#34056
  const _useSlotProps = (0, _utils.useSlotProps)({
      elementType: SwitchViewIcon,
      externalSlotProps: slotProps?.switchViewIcon,
      ownerState: undefined,
      className: classes.switchViewIcon
    }),
    switchViewIconProps = (0, _objectWithoutPropertiesLoose2.default)(_useSlotProps, _excluded2);
  const selectNextMonth = () => onMonthChange(utils.addMonths(month, 1), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.addMonths(month, -1), 'right');
  const isNextMonthDisabled = (0, _dateHelpersHooks.useNextMonthDisabled)(month, {
    disableFuture,
    maxDate,
    timezone
  });
  const isPreviousMonthDisabled = (0, _dateHelpersHooks.usePreviousMonthDisabled)(month, {
    disablePast,
    minDate,
    timezone
  });
  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange || disabled) {
      return;
    }
    if (views.length === 2) {
      onViewChange(views.find(el => el !== view) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(view) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  };

  // No need to display more information
  if (views.length === 1 && views[0] === 'year') {
    return null;
  }
  const label = utils.formatByString(month, format);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PickersCalendarHeaderRoot, (0, _extends2.default)({}, other, {
    ownerState: ownerState,
    className: (0, _clsx.default)(className, classes.root),
    ref: ref,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(PickersCalendarHeaderLabelContainer, {
      role: "presentation",
      onClick: handleToggleView,
      ownerState: ownerState
      // putting this on the label item element below breaks when using transition
      ,
      "aria-live": "polite",
      className: classes.labelContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersFadeTransitionGroup.PickersFadeTransitionGroup, {
        reduceAnimations: reduceAnimations,
        transKey: label,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarHeaderLabel, {
          id: labelId,
          ownerState: ownerState,
          className: classes.label,
          children: label
        })
      }), views.length > 1 && !disabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchViewButton, (0, _extends2.default)({}, switchViewButtonProps, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchViewIcon, (0, _extends2.default)({}, switchViewIconProps))
      }))]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Fade.default, {
      in: view === 'day',
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersArrowSwitcher.PickersArrowSwitcher, {
        slots: slots,
        slotProps: slotProps,
        onGoToPrevious: selectPreviousMonth,
        isPreviousDisabled: isPreviousMonthDisabled,
        previousLabel: localeText.previousMonth,
        onGoToNext: selectNextMonth,
        isNextDisabled: isNextMonthDisabled,
        nextLabel: localeText.nextMonth
      })
    })]
  }));
});
process.env.NODE_ENV !== "production" ? PickersCalendarHeader.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  currentMonth: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.bool,
  disableFuture: _propTypes.default.bool,
  disablePast: _propTypes.default.bool,
  /**
   * Format used to display the date.
   * @default `${adapter.formats.month} ${adapter.formats.year}`
   */
  format: _propTypes.default.string,
  labelId: _propTypes.default.string,
  maxDate: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.object.isRequired,
  onMonthChange: _propTypes.default.func.isRequired,
  onViewChange: _propTypes.default.func,
  reduceAnimations: _propTypes.default.bool.isRequired,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  timezone: _propTypes.default.string.isRequired,
  view: _propTypes.default.oneOf(['day', 'month', 'year']).isRequired,
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['day', 'month', 'year']).isRequired).isRequired
} : void 0;