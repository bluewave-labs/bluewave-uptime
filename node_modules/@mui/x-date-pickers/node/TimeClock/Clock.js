"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = Clock;
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _ClockPointer = require("./ClockPointer");
var _useUtils = require("../internals/hooks/useUtils");
var _shared = require("./shared");
var _clockClasses = require("./clockClasses");
var _dateUtils = require("../internals/utils/date-utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    clock: ['clock'],
    wrapper: ['wrapper'],
    squareMask: ['squareMask'],
    pin: ['pin'],
    amButton: ['amButton'],
    pmButton: ['pmButton'],
    meridiemText: ['meridiemText']
  };
  return (0, _utils.unstable_composeClasses)(slots, _clockClasses.getClockUtilityClass, classes);
};
const ClockRoot = (0, _styles.styled)('div', {
  name: 'MuiClock',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2)
}));
const ClockClock = (0, _styles.styled)('div', {
  name: 'MuiClock',
  slot: 'Clock',
  overridesResolver: (_, styles) => styles.clock
})({
  backgroundColor: 'rgba(0,0,0,.07)',
  borderRadius: '50%',
  height: 220,
  width: 220,
  flexShrink: 0,
  position: 'relative',
  pointerEvents: 'none'
});
const ClockWrapper = (0, _styles.styled)('div', {
  name: 'MuiClock',
  slot: 'Wrapper',
  overridesResolver: (_, styles) => styles.wrapper
})({
  '&:focus': {
    outline: 'none'
  }
});
const ClockSquareMask = (0, _styles.styled)('div', {
  name: 'MuiClock',
  slot: 'SquareMask',
  overridesResolver: (_, styles) => styles.squareMask
})({
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'auto',
  outline: 0,
  // Disable scroll capabilities.
  touchAction: 'none',
  userSelect: 'none',
  variants: [{
    props: {
      disabled: false
    },
    style: {
      '@media (pointer: fine)': {
        cursor: 'pointer',
        borderRadius: '50%'
      },
      '&:active': {
        cursor: 'move'
      }
    }
  }]
});
const ClockPin = (0, _styles.styled)('div', {
  name: 'MuiClock',
  slot: 'Pin',
  overridesResolver: (_, styles) => styles.pin
})(({
  theme
}) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: (theme.vars || theme).palette.primary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}));
const ClockAmButton = (0, _styles.styled)(_IconButton.default, {
  name: 'MuiClock',
  slot: 'AmButton',
  overridesResolver: (_, styles) => styles.amButton
})(({
  theme
}) => ({
  zIndex: 1,
  position: 'absolute',
  bottom: 8,
  left: 8,
  paddingLeft: 4,
  paddingRight: 4,
  width: _shared.CLOCK_HOUR_WIDTH,
  variants: [{
    props: {
      meridiemMode: 'am'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main,
      color: (theme.vars || theme).palette.primary.contrastText,
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primary.light
      }
    }
  }]
}));
const ClockPmButton = (0, _styles.styled)(_IconButton.default, {
  name: 'MuiClock',
  slot: 'PmButton',
  overridesResolver: (_, styles) => styles.pmButton
})(({
  theme
}) => ({
  zIndex: 1,
  position: 'absolute',
  bottom: 8,
  right: 8,
  paddingLeft: 4,
  paddingRight: 4,
  width: _shared.CLOCK_HOUR_WIDTH,
  variants: [{
    props: {
      meridiemMode: 'pm'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main,
      color: (theme.vars || theme).palette.primary.contrastText,
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primary.light
      }
    }
  }]
}));
const ClockMeridiemText = (0, _styles.styled)(_Typography.default, {
  name: 'MuiClock',
  slot: 'meridiemText',
  overridesResolver: (_, styles) => styles.meridiemText
})({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

/**
 * @ignore - internal component.
 */
function Clock(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiClock'
  });
  const {
    ampm,
    ampmInClock,
    autoFocus,
    children,
    value,
    handleMeridiemChange,
    isTimeDisabled,
    meridiemMode,
    minutesStep = 1,
    onChange,
    selectedId,
    type,
    viewValue,
    disabled = false,
    readOnly,
    className
  } = props;
  const ownerState = props;
  const utils = (0, _useUtils.useUtils)();
  const localeText = (0, _useUtils.useLocaleText)();
  const isMoving = React.useRef(false);
  const classes = useUtilityClasses(ownerState);
  const isSelectedTimeDisabled = isTimeDisabled(viewValue, type);
  const isPointerInner = !ampm && type === 'hours' && (viewValue < 1 || viewValue > 12);
  const handleValueChange = (newValue, isFinish) => {
    if (disabled || readOnly) {
      return;
    }
    if (isTimeDisabled(newValue, type)) {
      return;
    }
    onChange(newValue, isFinish);
  };
  const setTime = (event, isFinish) => {
    let {
      offsetX,
      offsetY
    } = event;
    if (offsetX === undefined) {
      const rect = event.target.getBoundingClientRect();
      offsetX = event.changedTouches[0].clientX - rect.left;
      offsetY = event.changedTouches[0].clientY - rect.top;
    }
    const newSelectedValue = type === 'seconds' || type === 'minutes' ? (0, _shared.getMinutes)(offsetX, offsetY, minutesStep) : (0, _shared.getHours)(offsetX, offsetY, Boolean(ampm));
    handleValueChange(newSelectedValue, isFinish);
  };
  const handleTouchMove = event => {
    isMoving.current = true;
    setTime(event, 'shallow');
  };
  const handleTouchEnd = event => {
    if (isMoving.current) {
      setTime(event, 'finish');
      isMoving.current = false;
    }
  };
  const handleMouseMove = event => {
    // event.buttons & PRIMARY_MOUSE_BUTTON
    if (event.buttons > 0) {
      setTime(event.nativeEvent, 'shallow');
    }
  };
  const handleMouseUp = event => {
    if (isMoving.current) {
      isMoving.current = false;
    }
    setTime(event.nativeEvent, 'finish');
  };
  const hasSelected = React.useMemo(() => {
    if (type === 'hours') {
      return true;
    }
    return viewValue % 5 === 0;
  }, [type, viewValue]);
  const keyboardControlStep = type === 'minutes' ? minutesStep : 1;
  const listboxRef = React.useRef(null);
  // Since this is rendered when a Popper is opened we can't use passive effects.
  // Focusing in passive effects in Popper causes scroll jump.
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (autoFocus) {
      // The ref not being resolved would be a bug in MUI.
      listboxRef.current.focus();
    }
  }, [autoFocus]);
  const handleKeyDown = event => {
    // TODO: Why this early exit?
    if (isMoving.current) {
      return;
    }
    switch (event.key) {
      case 'Home':
        // reset both hours and minutes
        handleValueChange(0, 'partial');
        event.preventDefault();
        break;
      case 'End':
        handleValueChange(type === 'minutes' ? 59 : 23, 'partial');
        event.preventDefault();
        break;
      case 'ArrowUp':
        handleValueChange(viewValue + keyboardControlStep, 'partial');
        event.preventDefault();
        break;
      case 'ArrowDown':
        handleValueChange(viewValue - keyboardControlStep, 'partial');
        event.preventDefault();
        break;
      default:
      // do nothing
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ClockRoot, {
    className: (0, _clsx.default)(className, classes.root),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(ClockClock, {
      className: classes.clock,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ClockSquareMask, {
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onMouseUp: handleMouseUp,
        onMouseMove: handleMouseMove,
        ownerState: {
          disabled
        },
        className: classes.squareMask
      }), !isSelectedTimeDisabled && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ClockPin, {
          className: classes.pin
        }), value != null && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClockPointer.ClockPointer, {
          type: type,
          viewValue: viewValue,
          isInner: isPointerInner,
          hasSelected: hasSelected
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockWrapper, {
        "aria-activedescendant": selectedId,
        "aria-label": localeText.clockLabelText(type, value, utils),
        ref: listboxRef,
        role: "listbox",
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        className: classes.wrapper,
        children: children
      })]
    }), ampm && ampmInClock && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ClockAmButton, {
        onClick: readOnly ? undefined : () => handleMeridiemChange('am'),
        disabled: disabled || meridiemMode === null,
        ownerState: ownerState,
        className: classes.amButton,
        title: (0, _dateUtils.formatMeridiem)(utils, 'am'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockMeridiemText, {
          variant: "caption",
          className: classes.meridiemText,
          children: (0, _dateUtils.formatMeridiem)(utils, 'am')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockPmButton, {
        disabled: disabled || meridiemMode === null,
        onClick: readOnly ? undefined : () => handleMeridiemChange('pm'),
        ownerState: ownerState,
        className: classes.pmButton,
        title: (0, _dateUtils.formatMeridiem)(utils, 'pm'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ClockMeridiemText, {
          variant: "caption",
          className: classes.meridiemText,
          children: (0, _dateUtils.formatMeridiem)(utils, 'pm')
        })
      })]
    })]
  });
}