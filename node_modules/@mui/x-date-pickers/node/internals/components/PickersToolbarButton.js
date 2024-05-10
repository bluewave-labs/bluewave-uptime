"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersToolbarButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _PickersToolbarText = require("./PickersToolbarText");
var _pickersToolbarClasses = require("./pickersToolbarClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["align", "className", "selected", "typographyClassName", "value", "variant", "width"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _utils.unstable_composeClasses)(slots, _pickersToolbarClasses.getPickersToolbarUtilityClass, classes);
};
const PickersToolbarButtonRoot = (0, _styles.styled)(_Button.default, {
  name: 'MuiPickersToolbarButton',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({
  padding: 0,
  minWidth: 16,
  textTransform: 'none'
});
const PickersToolbarButton = exports.PickersToolbarButton = /*#__PURE__*/React.forwardRef(function PickersToolbarButton(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersToolbarButton'
  });
  const {
      align,
      className,
      selected,
      typographyClassName,
      value,
      variant,
      width
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const classes = useUtilityClasses(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersToolbarButtonRoot, (0, _extends2.default)({
    variant: "text",
    ref: ref,
    className: (0, _clsx.default)(className, classes.root)
  }, width ? {
    sx: {
      width
    }
  } : {}, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarText.PickersToolbarText, {
      align: align,
      className: typographyClassName,
      variant: variant,
      value: value,
      selected: selected
    })
  }));
});