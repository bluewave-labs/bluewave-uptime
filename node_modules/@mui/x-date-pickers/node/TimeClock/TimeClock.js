"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeClock = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _useUtils = require("../internals/hooks/useUtils");
var _PickersArrowSwitcher = require("../internals/components/PickersArrowSwitcher");
var _timeUtils = require("../internals/utils/time-utils");
var _useViews = require("../internals/hooks/useViews");
var _dateHelpersHooks = require("../internals/hooks/date-helpers-hooks");
var _PickerViewRoot = require("../internals/components/PickerViewRoot");
var _timeClockClasses = require("./timeClockClasses");
var _Clock = require("./Clock");
var _ClockNumbers = require("./ClockNumbers");
var _useValueWithTimezone = require("../internals/hooks/useValueWithTimezone");
var _valueManagers = require("../internals/utils/valueManagers");
var _useClockReferenceDate = require("../internals/hooks/useClockReferenceDate");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["ampm", "ampmInClock", "autoFocus", "slots", "slotProps", "value", "defaultValue", "referenceDate", "disableIgnoringDatePartForTimeValidation", "maxTime", "minTime", "disableFuture", "disablePast", "minutesStep", "shouldDisableTime", "showViewSwitcher", "onChange", "view", "views", "openTo", "onViewChange", "focusedView", "onFocusedViewChange", "className", "disabled", "readOnly", "timezone"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    arrowSwitcher: ['arrowSwitcher']
  };
  return (0, _utils.unstable_composeClasses)(slots, _timeClockClasses.getTimeClockUtilityClass, classes);
};
const TimeClockRoot = (0, _styles.styled)(_PickerViewRoot.PickerViewRoot, {
  name: 'MuiTimeClock',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
});
const TimeClockArrowSwitcher = (0, _styles.styled)(_PickersArrowSwitcher.PickersArrowSwitcher, {
  name: 'MuiTimeClock',
  slot: 'ArrowSwitcher',
  overridesResolver: (props, styles) => styles.arrowSwitcher
})({
  position: 'absolute',
  right: 12,
  top: 15
});
const TIME_CLOCK_DEFAULT_VIEWS = ['hours', 'minutes'];

/**
 * Demos:
 *
 * - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
 * - [TimeClock](https://mui.com/x/react-date-pickers/time-clock/)
 *
 * API:
 *
 * - [TimeClock API](https://mui.com/x/api/date-pickers/time-clock/)
 */
const TimeClock = exports.TimeClock = /*#__PURE__*/React.forwardRef(function TimeClock(inProps, ref) {
  const utils = (0, _useUtils.useUtils)();
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiTimeClock'
  });
  const {
      ampm = utils.is12HourCycleInCurrentLocale(),
      ampmInClock = false,
      autoFocus,
      slots,
      slotProps,
      value: valueProp,
      defaultValue,
      referenceDate: referenceDateProp,
      disableIgnoringDatePartForTimeValidation = false,
      maxTime,
      minTime,
      disableFuture,
      disablePast,
      minutesStep = 1,
      shouldDisableTime,
      showViewSwitcher,
      onChange,
      view: inView,
      views = TIME_CLOCK_DEFAULT_VIEWS,
      openTo,
      onViewChange,
      focusedView,
      onFocusedViewChange,
      className,
      disabled,
      readOnly,
      timezone: timezoneProp
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    value,
    handleValueChange,
    timezone
  } = (0, _useValueWithTimezone.useControlledValueWithTimezone)({
    name: 'TimeClock',
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: _valueManagers.singleItemValueManager
  });
  const valueOrReferenceDate = (0, _useClockReferenceDate.useClockReferenceDate)({
    value,
    referenceDate: referenceDateProp,
    utils,
    props,
    timezone
  });
  const localeText = (0, _useUtils.useLocaleText)();
  const now = (0, _useUtils.useNow)(timezone);
  const {
    view,
    setView,
    previousView,
    nextView,
    setValueAndGoToNextView
  } = (0, _useViews.useViews)({
    view: inView,
    views,
    openTo,
    onViewChange,
    onChange: handleValueChange,
    focusedView,
    onFocusedViewChange
  });
  const {
    meridiemMode,
    handleMeridiemChange
  } = (0, _dateHelpersHooks.useMeridiemMode)(valueOrReferenceDate, ampm, setValueAndGoToNextView);
  const isTimeDisabled = React.useCallback((rawValue, viewType) => {
    const isAfter = (0, _timeUtils.createIsAfterIgnoreDatePart)(disableIgnoringDatePartForTimeValidation, utils);
    const shouldCheckPastEnd = viewType === 'hours' || viewType === 'minutes' && views.includes('seconds');
    const containsValidTime = ({
      start,
      end
    }) => {
      if (minTime && isAfter(minTime, end)) {
        return false;
      }
      if (maxTime && isAfter(start, maxTime)) {
        return false;
      }
      if (disableFuture && isAfter(start, now)) {
        return false;
      }
      if (disablePast && isAfter(now, shouldCheckPastEnd ? end : start)) {
        return false;
      }
      return true;
    };
    const isValidValue = (timeValue, step = 1) => {
      if (timeValue % step !== 0) {
        return false;
      }
      if (shouldDisableTime) {
        switch (viewType) {
          case 'hours':
            return !shouldDisableTime(utils.setHours(valueOrReferenceDate, timeValue), 'hours');
          case 'minutes':
            return !shouldDisableTime(utils.setMinutes(valueOrReferenceDate, timeValue), 'minutes');
          case 'seconds':
            return !shouldDisableTime(utils.setSeconds(valueOrReferenceDate, timeValue), 'seconds');
          default:
            return false;
        }
      }
      return true;
    };
    switch (viewType) {
      case 'hours':
        {
          const valueWithMeridiem = (0, _timeUtils.convertValueToMeridiem)(rawValue, meridiemMode, ampm);
          const dateWithNewHours = utils.setHours(valueOrReferenceDate, valueWithMeridiem);
          const start = utils.setSeconds(utils.setMinutes(dateWithNewHours, 0), 0);
          const end = utils.setSeconds(utils.setMinutes(dateWithNewHours, 59), 59);
          return !containsValidTime({
            start,
            end
          }) || !isValidValue(valueWithMeridiem);
        }
      case 'minutes':
        {
          const dateWithNewMinutes = utils.setMinutes(valueOrReferenceDate, rawValue);
          const start = utils.setSeconds(dateWithNewMinutes, 0);
          const end = utils.setSeconds(dateWithNewMinutes, 59);
          return !containsValidTime({
            start,
            end
          }) || !isValidValue(rawValue, minutesStep);
        }
      case 'seconds':
        {
          const dateWithNewSeconds = utils.setSeconds(valueOrReferenceDate, rawValue);
          const start = dateWithNewSeconds;
          const end = dateWithNewSeconds;
          return !containsValidTime({
            start,
            end
          }) || !isValidValue(rawValue);
        }
      default:
        throw new Error('not supported');
    }
  }, [ampm, valueOrReferenceDate, disableIgnoringDatePartForTimeValidation, maxTime, meridiemMode, minTime, minutesStep, shouldDisableTime, utils, disableFuture, disablePast, now, views]);
  const selectedId = (0, _utils.unstable_useId)();
  const viewProps = React.useMemo(() => {
    switch (view) {
      case 'hours':
        {
          const handleHoursChange = (hourValue, isFinish) => {
            const valueWithMeridiem = (0, _timeUtils.convertValueToMeridiem)(hourValue, meridiemMode, ampm);
            setValueAndGoToNextView(utils.setHours(valueOrReferenceDate, valueWithMeridiem), isFinish, 'hours');
          };
          return {
            onChange: handleHoursChange,
            viewValue: utils.getHours(valueOrReferenceDate),
            children: (0, _ClockNumbers.getHourNumbers)({
              value,
              utils,
              ampm,
              onChange: handleHoursChange,
              getClockNumberText: localeText.hoursClockNumberText,
              isDisabled: hourValue => disabled || isTimeDisabled(hourValue, 'hours'),
              selectedId
            })
          };
        }
      case 'minutes':
        {
          const minutesValue = utils.getMinutes(valueOrReferenceDate);
          const handleMinutesChange = (minuteValue, isFinish) => {
            setValueAndGoToNextView(utils.setMinutes(valueOrReferenceDate, minuteValue), isFinish, 'minutes');
          };
          return {
            viewValue: minutesValue,
            onChange: handleMinutesChange,
            children: (0, _ClockNumbers.getMinutesNumbers)({
              utils,
              value: minutesValue,
              onChange: handleMinutesChange,
              getClockNumberText: localeText.minutesClockNumberText,
              isDisabled: minuteValue => disabled || isTimeDisabled(minuteValue, 'minutes'),
              selectedId
            })
          };
        }
      case 'seconds':
        {
          const secondsValue = utils.getSeconds(valueOrReferenceDate);
          const handleSecondsChange = (secondValue, isFinish) => {
            setValueAndGoToNextView(utils.setSeconds(valueOrReferenceDate, secondValue), isFinish, 'seconds');
          };
          return {
            viewValue: secondsValue,
            onChange: handleSecondsChange,
            children: (0, _ClockNumbers.getMinutesNumbers)({
              utils,
              value: secondsValue,
              onChange: handleSecondsChange,
              getClockNumberText: localeText.secondsClockNumberText,
              isDisabled: secondValue => disabled || isTimeDisabled(secondValue, 'seconds'),
              selectedId
            })
          };
        }
      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [view, utils, value, ampm, localeText.hoursClockNumberText, localeText.minutesClockNumberText, localeText.secondsClockNumberText, meridiemMode, setValueAndGoToNextView, valueOrReferenceDate, isTimeDisabled, selectedId, disabled]);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(TimeClockRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Clock.Clock, (0, _extends2.default)({
      autoFocus: autoFocus ?? !!focusedView,
      ampmInClock: ampmInClock && views.includes('hours'),
      value: value,
      type: view,
      ampm: ampm,
      minutesStep: minutesStep,
      isTimeDisabled: isTimeDisabled,
      meridiemMode: meridiemMode,
      handleMeridiemChange: handleMeridiemChange,
      selectedId: selectedId,
      disabled: disabled,
      readOnly: readOnly
    }, viewProps)), showViewSwitcher && /*#__PURE__*/(0, _jsxRuntime.jsx)(TimeClockArrowSwitcher, {
      className: classes.arrowSwitcher,
      slots: slots,
      slotProps: slotProps,
      onGoToPrevious: () => setView(previousView),
      isPreviousDisabled: !previousView,
      previousLabel: localeText.openPreviousView,
      onGoToNext: () => setView(nextView),
      isNextDisabled: !nextView,
      nextLabel: localeText.openNextView,
      ownerState: ownerState
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TimeClock.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default utils.is12HourCycleInCurrentLocale()
   */
  ampm: _propTypes.default.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: _propTypes.default.bool,
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: _propTypes.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: _propTypes.default.object,
  /**
   * If `true`, the picker views and text field are disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: _propTypes.default.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: _propTypes.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: _propTypes.default.bool,
  /**
   * Controlled focused view.
   */
  focusedView: _propTypes.default.oneOf(['hours', 'minutes', 'seconds']),
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: _propTypes.default.object,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: _propTypes.default.object,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: _propTypes.default.number,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TView The view type. Will be one of date or time views.
   * @param {TValue} value The new value.
   * @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
   * @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired on focused view change.
   * @template TView
   * @param {TView} view The new view to focus or not.
   * @param {boolean} hasFocus `true` if the view should be focused.
   */
  onFocusedViewChange: _propTypes.default.func,
  /**
   * Callback fired on view change.
   * @template TView
   * @param {TView} view The new view.
   */
  onViewChange: _propTypes.default.func,
  /**
   * The default visible view.
   * Used when the component view is not controlled.
   * Must be a valid option from `views` list.
   */
  openTo: _propTypes.default.oneOf(['hours', 'minutes', 'seconds']),
  /**
   * If `true`, the picker views and text field are read-only.
   * @default false
   */
  readOnly: _propTypes.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid time using the validation props, except callbacks such as `shouldDisableTime`.
   */
  referenceDate: _propTypes.default.object,
  /**
   * Disable specific time.
   * @template TDate
   * @param {TDate} value The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: _propTypes.default.func,
  showViewSwitcher: _propTypes.default.bool,
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
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: _propTypes.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: _propTypes.default.object,
  /**
   * The visible view.
   * Used when the component view is controlled.
   * Must be a valid option from `views` list.
   */
  view: _propTypes.default.oneOf(['hours', 'minutes', 'seconds']),
  /**
   * Available views.
   * @default ['hours', 'minutes']
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['hours', 'minutes', 'seconds']).isRequired)
} : void 0;