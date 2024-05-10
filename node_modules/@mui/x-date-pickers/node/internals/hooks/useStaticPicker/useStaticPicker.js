"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStaticPicker = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _usePicker = require("../usePicker");
var _LocalizationProvider = require("../../../LocalizationProvider");
var _PickersLayout = require("../../../PickersLayout");
var _dimensions = require("../../constants/dimensions");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["props", "ref"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PickerStaticLayout = (0, _styles.styled)(_PickersLayout.PickersLayout)(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: _dimensions.DIALOG_WIDTH,
  backgroundColor: (theme.vars || theme).palette.background.paper
}));

/**
 * Hook managing all the single-date static pickers:
 * - StaticDatePicker
 * - StaticDateTimePicker
 * - StaticTimePicker
 */
const useStaticPicker = _ref => {
  let {
      props,
      ref
    } = _ref,
    pickerParams = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const {
    localeText,
    slots,
    slotProps,
    className,
    sx,
    displayStaticWrapperAs,
    autoFocus
  } = props;
  const {
    layoutProps,
    renderCurrentView
  } = (0, _usePicker.usePicker)((0, _extends2.default)({}, pickerParams, {
    props,
    autoFocusView: autoFocus ?? false,
    fieldRef: undefined,
    additionalViewProps: {},
    wrapperVariant: displayStaticWrapperAs
  }));
  const Layout = slots?.layout ?? PickerStaticLayout;
  const renderPicker = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_LocalizationProvider.LocalizationProvider, {
    localeText: localeText,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Layout, (0, _extends2.default)({}, layoutProps, slotProps?.layout, {
      slots: slots,
      slotProps: slotProps,
      sx: [...(Array.isArray(sx) ? sx : [sx]), ...(Array.isArray(slotProps?.layout?.sx) ? slotProps.layout.sx : [slotProps?.layout?.sx])],
      className: (0, _clsx.default)(className, slotProps?.layout?.className),
      ref: ref,
      children: renderCurrentView()
    }))
  });
  return {
    renderPicker
  };
};
exports.useStaticPicker = useStaticPicker;