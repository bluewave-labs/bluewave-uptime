"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClockPointer = ClockPointer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _shared = require("./shared");
var _clockPointerClasses = require("./clockPointerClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "hasSelected", "isInner", "type", "viewValue"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    thumb: ['thumb']
  };
  return (0, _utils.unstable_composeClasses)(slots, _clockPointerClasses.getClockPointerUtilityClass, classes);
};
const ClockPointerRoot = (0, _styles.styled)('div', {
  name: 'MuiClockPointer',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  width: 2,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  position: 'absolute',
  left: 'calc(50% - 1px)',
  bottom: '50%',
  transformOrigin: 'center bottom 0px',
  variants: [{
    props: {
      shouldAnimate: true
    },
    style: {
      transition: theme.transitions.create(['transform', 'height'])
    }
  }]
}));
const ClockPointerThumb = (0, _styles.styled)('div', {
  name: 'MuiClockPointer',
  slot: 'Thumb',
  overridesResolver: (_, styles) => styles.thumb
})(({
  theme
}) => ({
  width: 4,
  height: 4,
  backgroundColor: (theme.vars || theme).palette.primary.contrastText,
  borderRadius: '50%',
  position: 'absolute',
  top: -21,
  left: `calc(50% - ${_shared.CLOCK_HOUR_WIDTH / 2}px)`,
  border: `${(_shared.CLOCK_HOUR_WIDTH - 4) / 2}px solid ${(theme.vars || theme).palette.primary.main}`,
  boxSizing: 'content-box',
  variants: [{
    props: {
      hasSelected: true
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main
    }
  }]
}));

/**
 * @ignore - internal component.
 */
function ClockPointer(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiClockPointer'
  });
  const {
      className,
      isInner,
      type,
      viewValue
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const previousType = React.useRef(type);
  React.useEffect(() => {
    previousType.current = type;
  }, [type]);
  const ownerState = (0, _extends2.default)({}, props, {
    shouldAnimate: previousType.current !== type
  });
  const classes = useUtilityClasses(ownerState);
  const getAngleStyle = () => {
    const max = type === 'hours' ? 12 : 60;
    let angle = 360 / max * viewValue;
    if (type === 'hours' && viewValue > 12) {
      angle -= 360; // round up angle to max 360 degrees
    }
    return {
      height: Math.round((isInner ? 0.26 : 0.4) * _shared.CLOCK_WIDTH),
      transform: `rotateZ(${angle}deg)`
    };
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockPointerRoot, (0, _extends2.default)({
    style: getAngleStyle(),
    className: (0, _clsx.default)(className, classes.root),
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockPointerThumb, {
      ownerState: ownerState,
      className: classes.thumb
    })
  }));
}