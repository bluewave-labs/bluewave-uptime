"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClockNumber = ClockNumber;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _shared = require("./shared");
var _clockNumberClasses = require("./clockNumberClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "disabled", "index", "inner", "label", "selected"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled']
  };
  return (0, _utils.unstable_composeClasses)(slots, _clockNumberClasses.getClockNumberUtilityClass, classes);
};
const ClockNumberRoot = (0, _styles.styled)('span', {
  name: 'MuiClockNumber',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, {
    [`&.${_clockNumberClasses.clockNumberClasses.disabled}`]: styles.disabled
  }, {
    [`&.${_clockNumberClasses.clockNumberClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => ({
  height: _shared.CLOCK_HOUR_WIDTH,
  width: _shared.CLOCK_HOUR_WIDTH,
  position: 'absolute',
  left: `calc((100% - ${_shared.CLOCK_HOUR_WIDTH}px) / 2)`,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: (theme.vars || theme).palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '&:focused': {
    backgroundColor: (theme.vars || theme).palette.background.paper
  },
  [`&.${_clockNumberClasses.clockNumberClasses.selected}`]: {
    color: (theme.vars || theme).palette.primary.contrastText
  },
  [`&.${_clockNumberClasses.clockNumberClasses.disabled}`]: {
    pointerEvents: 'none',
    color: (theme.vars || theme).palette.text.disabled
  },
  variants: [{
    props: {
      inner: true
    },
    style: (0, _extends2.default)({}, theme.typography.body2, {
      color: (theme.vars || theme).palette.text.secondary
    })
  }]
}));

/**
 * @ignore - internal component.
 */
function ClockNumber(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiClockNumber'
  });
  const {
      className,
      disabled,
      index,
      inner,
      label,
      selected
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const angle = index % 12 / 12 * Math.PI * 2 - Math.PI / 2;
  const length = (_shared.CLOCK_WIDTH - _shared.CLOCK_HOUR_WIDTH - 2) / 2 * (inner ? 0.65 : 1);
  const x = Math.round(Math.cos(angle) * length);
  const y = Math.round(Math.sin(angle) * length);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockNumberRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(className, classes.root),
    "aria-disabled": disabled ? true : undefined,
    "aria-selected": selected ? true : undefined,
    role: "option",
    style: {
      transform: `translate(${x}px, ${y + (_shared.CLOCK_WIDTH - _shared.CLOCK_HOUR_WIDTH) / 2}px`
    },
    ownerState: ownerState
  }, other, {
    children: label
  }));
}