"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersMonth = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _pickersMonthClasses = require("./pickersMonthClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["autoFocus", "children", "disabled", "selected", "value", "tabIndex", "onClick", "onKeyDown", "onFocus", "onBlur", "aria-current", "aria-label", "monthsPerRow"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    disabled,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    monthButton: ['monthButton', disabled && 'disabled', selected && 'selected']
  };
  return (0, _utils.unstable_composeClasses)(slots, _pickersMonthClasses.getPickersMonthUtilityClass, classes);
};
const PickersMonthRoot = (0, _styles.styled)('div', {
  name: 'MuiPickersMonth',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexBasis: '33.3%',
  variants: [{
    props: {
      monthsPerRow: 4
    },
    style: {
      flexBasis: '25%'
    }
  }]
});
const PickersMonthButton = (0, _styles.styled)('button', {
  name: 'MuiPickersMonth',
  slot: 'MonthButton',
  overridesResolver: (_, styles) => [styles.monthButton, {
    [`&.${_pickersMonthClasses.pickersMonthClasses.disabled}`]: styles.disabled
  }, {
    [`&.${_pickersMonthClasses.pickersMonthClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => (0, _extends2.default)({
  color: 'unset',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
  margin: '8px 0',
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: 'pointer',
  '&:focus': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _styles.alpha)(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _styles.alpha)(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  '&:disabled': {
    cursor: 'auto',
    pointerEvents: 'none'
  },
  [`&.${_pickersMonthClasses.pickersMonthClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.secondary
  },
  [`&.${_pickersMonthClasses.pickersMonthClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  }
}));

/**
 * @ignore - do not document.
 */
const PickersMonth = exports.PickersMonth = /*#__PURE__*/React.memo(function PickersMonth(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersMonth'
  });
  const {
      autoFocus,
      children,
      disabled,
      selected,
      value,
      tabIndex,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      'aria-current': ariaCurrent,
      'aria-label': ariaLabel
      // We don't want to forward this prop to the root element
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ref = React.useRef(null);
  const classes = useUtilityClasses(props);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersMonthRoot, (0, _extends2.default)({
    className: classes.root,
    ownerState: props
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersMonthButton, {
      ref: ref,
      disabled: disabled,
      type: "button",
      role: "radio",
      tabIndex: disabled ? -1 : tabIndex,
      "aria-current": ariaCurrent,
      "aria-checked": selected,
      "aria-label": ariaLabel,
      onClick: event => onClick(event, value),
      onKeyDown: event => onKeyDown(event, value),
      onFocus: event => onFocus(event, value),
      onBlur: event => onBlur(event, value),
      className: classes.monthButton,
      ownerState: props,
      children: children
    })
  }));
});