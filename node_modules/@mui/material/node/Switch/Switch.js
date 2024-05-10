"use strict";
'use client';

// @inheritedComponent IconButton
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _refType = _interopRequireDefault(require("@mui/utils/refType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _colorManipulator = require("@mui/system/colorManipulator");
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));
var _zeroStyled = require("../zero-styled");
var _switchClasses = _interopRequireWildcard(require("./switchClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "color", "edge", "size", "sx"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useThemeProps = (0, _zeroStyled.createUseThemeProps)('MuiSwitch');
const useUtilityClasses = ownerState => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', edge && `edge${(0, _capitalize.default)(edge)}`, `size${(0, _capitalize.default)(size)}`],
    switchBase: ['switchBase', `color${(0, _capitalize.default)(color)}`, checked && 'checked', disabled && 'disabled'],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input']
  };
  const composedClasses = (0, _composeClasses.default)(slots, _switchClasses.getSwitchUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};
const SwitchRoot = (0, _zeroStyled.styled)('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.edge && styles[`edge${(0, _capitalize.default)(ownerState.edge)}`], styles[`size${(0, _capitalize.default)(ownerState.size)}`]];
  }
})({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  // Reset the stacking context.
  verticalAlign: 'middle',
  // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact'
  },
  variants: [{
    props: {
      edge: 'start'
    },
    style: {
      marginLeft: -8
    }
  }, {
    props: {
      edge: 'end'
    },
    style: {
      marginRight: -8
    }
  }, {
    props: {
      size: 'small'
    },
    style: {
      width: 40,
      height: 24,
      padding: 7,
      [`& .${_switchClasses.default.thumb}`]: {
        width: 16,
        height: 16
      },
      [`& .${_switchClasses.default.switchBase}`]: {
        padding: 4,
        [`&.${_switchClasses.default.checked}`]: {
          transform: 'translateX(16px)'
        }
      }
    }
  }]
});
const SwitchSwitchBase = (0, _zeroStyled.styled)(_SwitchBase.default, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.switchBase, {
      [`& .${_switchClasses.default.input}`]: styles.input
    }, ownerState.color !== 'default' && styles[`color${(0, _capitalize.default)(ownerState.color)}`]];
  }
})(({
  theme
}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  // Render above the focus ripple.
  color: theme.vars ? theme.vars.palette.Switch.defaultColor : `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]}`,
  transition: theme.transitions.create(['left', 'transform'], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_switchClasses.default.checked}`]: {
    transform: 'translateX(20px)'
  },
  [`&.${_switchClasses.default.disabled}`]: {
    color: theme.vars ? theme.vars.palette.Switch.defaultDisabledColor : `${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]}`
  },
  [`&.${_switchClasses.default.checked} + .${_switchClasses.default.track}`]: {
    opacity: 0.5
  },
  [`&.${_switchClasses.default.disabled} + .${_switchClasses.default.track}`]: {
    opacity: theme.vars ? theme.vars.opacity.switchTrackDisabled : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`
  },
  [`& .${_switchClasses.default.input}`]: {
    left: '-100%',
    width: '300%'
  }
}), ({
  theme
}) => ({
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _colorManipulator.alpha)(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  variants: [...Object.entries(theme.palette).filter(([, value]) => value.main && value.light) // check all the used fields in the style below
  .map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${_switchClasses.default.checked}`]: {
        color: (theme.vars || theme).palette[color].main,
        '&:hover': {
          backgroundColor: theme.vars ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _colorManipulator.alpha)(theme.palette[color].main, theme.palette.action.hoverOpacity),
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        [`&.${_switchClasses.default.disabled}`]: {
          color: theme.vars ? theme.vars.palette.Switch[`${color}DisabledColor`] : `${theme.palette.mode === 'light' ? (0, _colorManipulator.lighten)(theme.palette[color].main, 0.62) : (0, _colorManipulator.darken)(theme.palette[color].main, 0.55)}`
        }
      },
      [`&.${_switchClasses.default.checked} + .${_switchClasses.default.track}`]: {
        backgroundColor: (theme.vars || theme).palette[color].main
      }
    }
  }))]
}));
const SwitchTrack = (0, _zeroStyled.styled)('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track
})(({
  theme
}) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.vars ? theme.vars.palette.common.onBackground : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
  opacity: theme.vars ? theme.vars.opacity.switchTrack : `${theme.palette.mode === 'light' ? 0.38 : 0.3}`
}));
const SwitchThumb = (0, _zeroStyled.styled)('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb
})(({
  theme
}) => ({
  boxShadow: (theme.vars || theme).shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%'
}));
const Switch = /*#__PURE__*/React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSwitch'
  });
  const {
      className,
      color = 'primary',
      edge = false,
      size = 'medium',
      sx
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const icon = /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchThumb, {
    className: classes.thumb,
    ownerState: ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SwitchRoot, {
    className: (0, _clsx.default)(classes.root, className),
    sx: sx,
    ownerState: ownerState,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchSwitchBase, (0, _extends2.default)({
      type: "checkbox",
      icon: icon,
      checkedIcon: icon,
      ref: ref,
      ownerState: ownerState
    }, other, {
      classes: (0, _extends2.default)({}, classes, {
        root: classes.switchBase
      })
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchTrack, {
      className: classes.track,
      ownerState: ownerState
    })]
  });
});
process.env.NODE_ENV !== "production" ? Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: _propTypes.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: _propTypes.default.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: _propTypes.default.oneOf(['end', 'start', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: _propTypes.default.node,
  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: _propTypes.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _refType.default,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: _propTypes.default.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: _propTypes.default.any
} : void 0;
var _default = exports.default = Switch;