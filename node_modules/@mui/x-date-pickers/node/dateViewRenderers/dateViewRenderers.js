"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDateViewCalendar = void 0;
var React = _interopRequireWildcard(require("react"));
var _DateCalendar = require("../DateCalendar");
var _dateUtils = require("../internals/utils/date-utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const renderDateViewCalendar = ({
  view,
  onViewChange,
  views,
  focusedView,
  onFocusedViewChange,
  value,
  defaultValue,
  referenceDate,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  reduceAnimations,
  onMonthChange,
  monthsPerRow,
  onYearChange,
  yearsPerRow,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  sx,
  autoFocus,
  fixedWeekNumber,
  displayWeekNumber,
  timezone
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateCalendar.DateCalendar, {
  view: view,
  onViewChange: onViewChange,
  views: views.filter(_dateUtils.isDatePickerView),
  focusedView: focusedView && (0, _dateUtils.isDatePickerView)(focusedView) ? focusedView : null,
  onFocusedViewChange: onFocusedViewChange,
  value: value,
  defaultValue: defaultValue,
  referenceDate: referenceDate,
  onChange: onChange,
  className: className,
  classes: classes,
  disableFuture: disableFuture,
  disablePast: disablePast,
  minDate: minDate,
  maxDate: maxDate,
  shouldDisableDate: shouldDisableDate,
  shouldDisableMonth: shouldDisableMonth,
  shouldDisableYear: shouldDisableYear,
  reduceAnimations: reduceAnimations,
  onMonthChange: onMonthChange,
  monthsPerRow: monthsPerRow,
  onYearChange: onYearChange,
  yearsPerRow: yearsPerRow,
  slots: slots,
  slotProps: slotProps,
  loading: loading,
  renderLoading: renderLoading,
  disableHighlightToday: disableHighlightToday,
  readOnly: readOnly,
  disabled: disabled,
  showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
  dayOfWeekFormatter: dayOfWeekFormatter,
  sx: sx,
  autoFocus: autoFocus,
  fixedWeekNumber: fixedWeekNumber,
  displayWeekNumber: displayWeekNumber,
  timezone: timezone
});
exports.renderDateViewCalendar = renderDateViewCalendar;