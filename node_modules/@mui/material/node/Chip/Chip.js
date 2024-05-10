"use strict";
'use client';

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
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _colorManipulator = require("@mui/system/colorManipulator");
var _Cancel = _interopRequireDefault(require("../internal/svg-icons/Cancel"));
var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));
var _unsupportedProp = _interopRequireDefault(require("../utils/unsupportedProp"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _chipClasses = _interopRequireWildcard(require("./chipClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant", "tabIndex", "skipFocusWhenDisabled"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    disabled,
    size,
    color,
    iconColor,
    onDelete,
    clickable,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant, disabled && 'disabled', `size${(0, _capitalize.default)(size)}`, `color${(0, _capitalize.default)(color)}`, clickable && 'clickable', clickable && `clickableColor${(0, _capitalize.default)(color)}`, onDelete && 'deletable', onDelete && `deletableColor${(0, _capitalize.default)(color)}`, `${variant}${(0, _capitalize.default)(color)}`],
    label: ['label', `label${(0, _capitalize.default)(size)}`],
    avatar: ['avatar', `avatar${(0, _capitalize.default)(size)}`, `avatarColor${(0, _capitalize.default)(color)}`],
    icon: ['icon', `icon${(0, _capitalize.default)(size)}`, `iconColor${(0, _capitalize.default)(iconColor)}`],
    deleteIcon: ['deleteIcon', `deleteIcon${(0, _capitalize.default)(size)}`, `deleteIconColor${(0, _capitalize.default)(color)}`, `deleteIcon${(0, _capitalize.default)(variant)}Color${(0, _capitalize.default)(color)}`]
  };
  return (0, _composeClasses.default)(slots, _chipClasses.getChipUtilityClass, classes);
};
const ChipRoot = (0, _styled.default)('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      color,
      iconColor,
      clickable,
      onDelete,
      size,
      variant
    } = ownerState;
    return [{
      [`& .${_chipClasses.default.avatar}`]: styles.avatar
    }, {
      [`& .${_chipClasses.default.avatar}`]: styles[`avatar${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_chipClasses.default.avatar}`]: styles[`avatarColor${(0, _capitalize.default)(color)}`]
    }, {
      [`& .${_chipClasses.default.icon}`]: styles.icon
    }, {
      [`& .${_chipClasses.default.icon}`]: styles[`icon${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_chipClasses.default.icon}`]: styles[`iconColor${(0, _capitalize.default)(iconColor)}`]
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles.deleteIcon
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles[`deleteIcon${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles[`deleteIconColor${(0, _capitalize.default)(color)}`]
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles[`deleteIcon${(0, _capitalize.default)(variant)}Color${(0, _capitalize.default)(color)}`]
    }, styles.root, styles[`size${(0, _capitalize.default)(size)}`], styles[`color${(0, _capitalize.default)(color)}`], clickable && styles.clickable, clickable && color !== 'default' && styles[`clickableColor${(0, _capitalize.default)(color)})`], onDelete && styles.deletable, onDelete && color !== 'default' && styles[`deletableColor${(0, _capitalize.default)(color)}`], styles[variant], styles[`${variant}${(0, _capitalize.default)(color)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const textColor = theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
  return (0, _extends2.default)({
    maxWidth: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    // reset cursor explicitly in case ButtonBase is used
    cursor: 'unset',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    textDecoration: 'none',
    border: 0,
    // Remove `button` border
    padding: 0,
    // Remove `button` padding
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    [`&.${_chipClasses.default.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: 'none'
    },
    [`& .${_chipClasses.default.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
      fontSize: theme.typography.pxToRem(12)
    },
    [`& .${_chipClasses.default.avatarColorPrimary}`]: {
      color: (theme.vars || theme).palette.primary.contrastText,
      backgroundColor: (theme.vars || theme).palette.primary.dark
    },
    [`& .${_chipClasses.default.avatarColorSecondary}`]: {
      color: (theme.vars || theme).palette.secondary.contrastText,
      backgroundColor: (theme.vars || theme).palette.secondary.dark
    },
    [`& .${_chipClasses.default.avatarSmall}`]: {
      marginLeft: 4,
      marginRight: -4,
      width: 18,
      height: 18,
      fontSize: theme.typography.pxToRem(10)
    },
    [`& .${_chipClasses.default.icon}`]: (0, _extends2.default)({
      marginLeft: 5,
      marginRight: -6
    }, ownerState.size === 'small' && {
      fontSize: 18,
      marginLeft: 4,
      marginRight: -4
    }, ownerState.iconColor === ownerState.color && (0, _extends2.default)({
      color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor
    }, ownerState.color !== 'default' && {
      color: 'inherit'
    })),
    [`& .${_chipClasses.default.deleteIcon}`]: (0, _extends2.default)({
      WebkitTapHighlightColor: 'transparent',
      color: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.26)` : (0, _colorManipulator.alpha)(theme.palette.text.primary, 0.26),
      fontSize: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.4)` : (0, _colorManipulator.alpha)(theme.palette.text.primary, 0.4)
      }
    }, ownerState.size === 'small' && {
      fontSize: 16,
      marginRight: 4,
      marginLeft: -4
    }, ownerState.color !== 'default' && {
      color: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].contrastTextChannel} / 0.7)` : (0, _colorManipulator.alpha)(theme.palette[ownerState.color].contrastText, 0.7),
      '&:hover, &:active': {
        color: (theme.vars || theme).palette[ownerState.color].contrastText
      }
    })
  }, ownerState.size === 'small' && {
    height: 24
  }, ownerState.color !== 'default' && {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    color: (theme.vars || theme).palette[ownerState.color].contrastText
  }, ownerState.onDelete && {
    [`&.${_chipClasses.default.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  }, ownerState.onDelete && ownerState.color !== 'default' && {
    [`&.${_chipClasses.default.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
    }
  });
}, ({
  theme,
  ownerState
}) => (0, _extends2.default)({}, ownerState.clickable && {
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
  },
  [`&.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  },
  '&:active': {
    boxShadow: (theme.vars || theme).shadows[1]
  }
}, ownerState.clickable && ownerState.color !== 'default' && {
  [`&:hover, &.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
  }
}), ({
  theme,
  ownerState
}) => (0, _extends2.default)({}, ownerState.variant === 'outlined' && {
  backgroundColor: 'transparent',
  border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]}`,
  [`&.${_chipClasses.default.clickable}:hover`]: {
    backgroundColor: (theme.vars || theme).palette.action.hover
  },
  [`&.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`& .${_chipClasses.default.avatar}`]: {
    marginLeft: 4
  },
  [`& .${_chipClasses.default.avatarSmall}`]: {
    marginLeft: 2
  },
  [`& .${_chipClasses.default.icon}`]: {
    marginLeft: 4
  },
  [`& .${_chipClasses.default.iconSmall}`]: {
    marginLeft: 2
  },
  [`& .${_chipClasses.default.deleteIcon}`]: {
    marginRight: 5
  },
  [`& .${_chipClasses.default.deleteIconSmall}`]: {
    marginRight: 3
  }
}, ownerState.variant === 'outlined' && ownerState.color !== 'default' && {
  color: (theme.vars || theme).palette[ownerState.color].main,
  border: `1px solid ${theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.7)` : (0, _colorManipulator.alpha)(theme.palette[ownerState.color].main, 0.7)}`,
  [`&.${_chipClasses.default.clickable}:hover`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _colorManipulator.alpha)(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity)
  },
  [`&.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.focusOpacity})` : (0, _colorManipulator.alpha)(theme.palette[ownerState.color].main, theme.palette.action.focusOpacity)
  },
  [`& .${_chipClasses.default.deleteIcon}`]: {
    color: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.7)` : (0, _colorManipulator.alpha)(theme.palette[ownerState.color].main, 0.7),
    '&:hover, &:active': {
      color: (theme.vars || theme).palette[ownerState.color].main
    }
  }
}));
const ChipLabel = (0, _styled.default)('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      size
    } = ownerState;
    return [styles.label, styles[`label${(0, _capitalize.default)(size)}`]];
  }
})(({
  ownerState
}) => (0, _extends2.default)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap'
}, ownerState.variant === 'outlined' && {
  paddingLeft: 11,
  paddingRight: 11
}, ownerState.size === 'small' && {
  paddingLeft: 8,
  paddingRight: 8
}, ownerState.size === 'small' && ownerState.variant === 'outlined' && {
  paddingLeft: 7,
  paddingRight: 7
}));
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = /*#__PURE__*/React.forwardRef(function Chip(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiChip'
  });
  const {
      avatar: avatarProp,
      className,
      clickable: clickableProp,
      color = 'default',
      component: ComponentProp,
      deleteIcon: deleteIconProp,
      disabled = false,
      icon: iconProp,
      label,
      onClick,
      onDelete,
      onKeyDown,
      onKeyUp,
      size = 'medium',
      variant = 'filled',
      tabIndex,
      skipFocusWhenDisabled = false // TODO v6: Rename to `focusableWhenDisabled`.
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const chipRef = React.useRef(null);
  const handleRef = (0, _useForkRef.default)(chipRef, ref);
  const handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };
  const handleKeyDown = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // Will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleKeyUp = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const component = clickable || onDelete ? _ButtonBase.default : ComponentProp || 'div';
  const ownerState = (0, _extends2.default)({}, props, {
    component,
    disabled,
    size,
    color,
    iconColor: /*#__PURE__*/React.isValidElement(iconProp) ? iconProp.props.color || color : color,
    onDelete: !!onDelete,
    clickable,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const moreProps = component === _ButtonBase.default ? (0, _extends2.default)({
    component: ComponentProp || 'div',
    focusVisibleClassName: classes.focusVisible
  }, onDelete && {
    disableRipple: true
  }) : {};
  let deleteIcon = null;
  if (onDelete) {
    deleteIcon = deleteIconProp && /*#__PURE__*/React.isValidElement(deleteIconProp) ? ( /*#__PURE__*/React.cloneElement(deleteIconProp, {
      className: (0, _clsx.default)(deleteIconProp.props.className, classes.deleteIcon),
      onClick: handleDeleteIconClick
    })) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Cancel.default, {
      className: (0, _clsx.default)(classes.deleteIcon),
      onClick: handleDeleteIconClick
    });
  }
  let avatar = null;
  if (avatarProp && /*#__PURE__*/React.isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/React.cloneElement(avatarProp, {
      className: (0, _clsx.default)(classes.avatar, avatarProp.props.className)
    });
  }
  let icon = null;
  if (iconProp && /*#__PURE__*/React.isValidElement(iconProp)) {
    icon = /*#__PURE__*/React.cloneElement(iconProp, {
      className: (0, _clsx.default)(classes.icon, iconProp.props.className)
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error('MUI: The Chip component can not handle the avatar ' + 'and the icon prop at the same time. Pick one.');
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ChipRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    disabled: clickable && disabled ? true : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
    ownerState: ownerState
  }, moreProps, other, {
    children: [avatar || icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(ChipLabel, {
      className: (0, _clsx.default)(classes.label),
      ownerState: ownerState,
      children: label
    }), deleteIcon]
  }));
});
process.env.NODE_ENV !== "production" ? Chip.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Avatar element to display.
   */
  avatar: _propTypes.default.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: _unsupportedProp.default,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: _propTypes.default.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: _propTypes.default.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * Icon element.
   */
  icon: _propTypes.default.element,
  /**
   * The content of the component.
   */
  label: _propTypes.default.node,
  /**
   * @ignore
   */
  onClick: _propTypes.default.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: _propTypes.default.func,
  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,
  /**
   * @ignore
   */
  onKeyUp: _propTypes.default.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.string]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: _propTypes.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * @ignore
   */
  tabIndex: _propTypes.default.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['filled', 'outlined']), _propTypes.default.string])
} : void 0;
var _default = exports.default = Chip;