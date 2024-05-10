'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import CancelIcon from '../internal/svg-icons/Cancel';
import useForkRef from '../utils/useForkRef';
import unsupportedProp from '../utils/unsupportedProp';
import capitalize from '../utils/capitalize';
import ButtonBase from '../ButtonBase';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import chipClasses, { getChipUtilityClass } from './chipClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    disabled = ownerState.disabled,
    size = ownerState.size,
    color = ownerState.color,
    iconColor = ownerState.iconColor,
    onDelete = ownerState.onDelete,
    clickable = ownerState.clickable,
    variant = ownerState.variant;
  var slots = {
    root: ['root', variant, disabled && 'disabled', "size".concat(capitalize(size)), "color".concat(capitalize(color)), clickable && 'clickable', clickable && "clickableColor".concat(capitalize(color)), onDelete && 'deletable', onDelete && "deletableColor".concat(capitalize(color)), "".concat(variant).concat(capitalize(color))],
    label: ['label', "label".concat(capitalize(size))],
    avatar: ['avatar', "avatar".concat(capitalize(size)), "avatarColor".concat(capitalize(color))],
    icon: ['icon', "icon".concat(capitalize(size)), "iconColor".concat(capitalize(iconColor))],
    deleteIcon: ['deleteIcon', "deleteIcon".concat(capitalize(size)), "deleteIconColor".concat(capitalize(color)), "deleteIcon".concat(capitalize(variant), "Color").concat(capitalize(color))]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};
var ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    var color = ownerState.color,
      iconColor = ownerState.iconColor,
      clickable = ownerState.clickable,
      onDelete = ownerState.onDelete,
      size = ownerState.size,
      variant = ownerState.variant;
    return [_defineProperty({}, "& .".concat(chipClasses.avatar), styles.avatar), _defineProperty({}, "& .".concat(chipClasses.avatar), styles["avatar".concat(capitalize(size))]), _defineProperty({}, "& .".concat(chipClasses.avatar), styles["avatarColor".concat(capitalize(color))]), _defineProperty({}, "& .".concat(chipClasses.icon), styles.icon), _defineProperty({}, "& .".concat(chipClasses.icon), styles["icon".concat(capitalize(size))]), _defineProperty({}, "& .".concat(chipClasses.icon), styles["iconColor".concat(capitalize(iconColor))]), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles.deleteIcon), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles["deleteIcon".concat(capitalize(size))]), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles["deleteIconColor".concat(capitalize(color))]), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles["deleteIcon".concat(capitalize(variant), "Color").concat(capitalize(color))]), styles.root, styles["size".concat(capitalize(size))], styles["color".concat(capitalize(color))], clickable && styles.clickable, clickable && color !== 'default' && styles["clickableColor".concat(capitalize(color), ")")], onDelete && styles.deletable, onDelete && color !== 'default' && styles["deletableColor".concat(capitalize(color))], styles[variant], styles["".concat(variant).concat(capitalize(color))]];
  }
})(function (_ref11) {
  var theme = _ref11.theme,
    ownerState = _ref11.ownerState;
  var textColor = theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
  return _extends(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
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
    boxSizing: 'border-box'
  }, "&.".concat(chipClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
    pointerEvents: 'none'
  }), "& .".concat(chipClasses.avatar), {
    marginLeft: 5,
    marginRight: -6,
    width: 24,
    height: 24,
    color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
    fontSize: theme.typography.pxToRem(12)
  }), "& .".concat(chipClasses.avatarColorPrimary), {
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: (theme.vars || theme).palette.primary.dark
  }), "& .".concat(chipClasses.avatarColorSecondary), {
    color: (theme.vars || theme).palette.secondary.contrastText,
    backgroundColor: (theme.vars || theme).palette.secondary.dark
  }), "& .".concat(chipClasses.avatarSmall), {
    marginLeft: 4,
    marginRight: -4,
    width: 18,
    height: 18,
    fontSize: theme.typography.pxToRem(10)
  }), "& .".concat(chipClasses.icon), _extends({
    marginLeft: 5,
    marginRight: -6
  }, ownerState.size === 'small' && {
    fontSize: 18,
    marginLeft: 4,
    marginRight: -4
  }, ownerState.iconColor === ownerState.color && _extends({
    color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor
  }, ownerState.color !== 'default' && {
    color: 'inherit'
  }))), "& .".concat(chipClasses.deleteIcon), _extends({
    WebkitTapHighlightColor: 'transparent',
    color: theme.vars ? "rgba(".concat(theme.vars.palette.text.primaryChannel, " / 0.26)") : alpha(theme.palette.text.primary, 0.26),
    fontSize: 22,
    cursor: 'pointer',
    margin: '0 5px 0 -6px',
    '&:hover': {
      color: theme.vars ? "rgba(".concat(theme.vars.palette.text.primaryChannel, " / 0.4)") : alpha(theme.palette.text.primary, 0.4)
    }
  }, ownerState.size === 'small' && {
    fontSize: 16,
    marginRight: 4,
    marginLeft: -4
  }, ownerState.color !== 'default' && {
    color: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].contrastTextChannel, " / 0.7)") : alpha(theme.palette[ownerState.color].contrastText, 0.7),
    '&:hover, &:active': {
      color: (theme.vars || theme).palette[ownerState.color].contrastText
    }
  })), ownerState.size === 'small' && {
    height: 24
  }, ownerState.color !== 'default' && {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    color: (theme.vars || theme).palette[ownerState.color].contrastText
  }, ownerState.onDelete && _defineProperty({}, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.action.selectedChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }), ownerState.onDelete && ownerState.color !== 'default' && _defineProperty({}, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
  }));
}, function (_ref14) {
  var theme = _ref14.theme,
    ownerState = _ref14.ownerState;
  return _extends({}, ownerState.clickable && _defineProperty(_defineProperty({
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.action.selectedChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.hoverOpacity, "))") : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
    }
  }, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.action.selectedChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }), '&:active', {
    boxShadow: (theme.vars || theme).shadows[1]
  }), ownerState.clickable && ownerState.color !== 'default' && _defineProperty({}, "&:hover, &.".concat(chipClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
  }));
}, function (_ref17) {
  var theme = _ref17.theme,
    ownerState = _ref17.ownerState;
  return _extends({}, ownerState.variant === 'outlined' && _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    backgroundColor: 'transparent',
    border: theme.vars ? "1px solid ".concat(theme.vars.palette.Chip.defaultBorder) : "1px solid ".concat(theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700])
  }, "&.".concat(chipClasses.clickable, ":hover"), {
    backgroundColor: (theme.vars || theme).palette.action.hover
  }), "&.".concat(chipClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette.action.focus
  }), "& .".concat(chipClasses.avatar), {
    marginLeft: 4
  }), "& .".concat(chipClasses.avatarSmall), {
    marginLeft: 2
  }), "& .".concat(chipClasses.icon), {
    marginLeft: 4
  }), "& .".concat(chipClasses.iconSmall), {
    marginLeft: 2
  }), "& .".concat(chipClasses.deleteIcon), {
    marginRight: 5
  }), "& .".concat(chipClasses.deleteIconSmall), {
    marginRight: 3
  }), ownerState.variant === 'outlined' && ownerState.color !== 'default' && _defineProperty(_defineProperty(_defineProperty({
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: "1px solid ".concat(theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / 0.7)") : alpha(theme.palette[ownerState.color].main, 0.7))
  }, "&.".concat(chipClasses.clickable, ":hover"), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / ").concat(theme.vars.palette.action.hoverOpacity, ")") : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity)
  }), "&.".concat(chipClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / ").concat(theme.vars.palette.action.focusOpacity, ")") : alpha(theme.palette[ownerState.color].main, theme.palette.action.focusOpacity)
  }), "& .".concat(chipClasses.deleteIcon), {
    color: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / 0.7)") : alpha(theme.palette[ownerState.color].main, 0.7),
    '&:hover, &:active': {
      color: (theme.vars || theme).palette[ownerState.color].main
    }
  }));
});
var ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    var size = ownerState.size;
    return [styles.label, styles["label".concat(capitalize(size))]];
  }
})(function (_ref20) {
  var ownerState = _ref20.ownerState;
  return _extends({
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
  });
});
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
var Chip = /*#__PURE__*/React.forwardRef(function Chip(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiChip'
  });
  var avatarProp = props.avatar,
    className = props.className,
    clickableProp = props.clickable,
    _props$color = props.color,
    color = _props$color === void 0 ? 'default' : _props$color,
    ComponentProp = props.component,
    deleteIconProp = props.deleteIcon,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    iconProp = props.icon,
    label = props.label,
    onClick = props.onClick,
    onDelete = props.onDelete,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'filled' : _props$variant,
    tabIndex = props.tabIndex,
    _props$skipFocusWhenD = props.skipFocusWhenDisabled,
    skipFocusWhenDisabled = _props$skipFocusWhenD === void 0 ? false : _props$skipFocusWhenD,
    other = _objectWithoutProperties(props, ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant", "tabIndex", "skipFocusWhenDisabled"]);
  var chipRef = React.useRef(null);
  var handleRef = useForkRef(chipRef, ref);
  var handleDeleteIconClick = function handleDeleteIconClick(event) {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };
  var handleKeyDown = function handleKeyDown(event) {
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
  var handleKeyUp = function handleKeyUp(event) {
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
  var clickable = clickableProp !== false && onClick ? true : clickableProp;
  var component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';
  var ownerState = _extends({}, props, {
    component: component,
    disabled: disabled,
    size: size,
    color: color,
    iconColor: /*#__PURE__*/React.isValidElement(iconProp) ? iconProp.props.color || color : color,
    onDelete: !!onDelete,
    clickable: clickable,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  var moreProps = component === ButtonBase ? _extends({
    component: ComponentProp || 'div',
    focusVisibleClassName: classes.focusVisible
  }, onDelete && {
    disableRipple: true
  }) : {};
  var deleteIcon = null;
  if (onDelete) {
    deleteIcon = deleteIconProp && /*#__PURE__*/React.isValidElement(deleteIconProp) ? ( /*#__PURE__*/React.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon),
      onClick: handleDeleteIconClick
    })) : /*#__PURE__*/_jsx(CancelIcon, {
      className: clsx(classes.deleteIcon),
      onClick: handleDeleteIconClick
    });
  }
  var avatar = null;
  if (avatarProp && /*#__PURE__*/React.isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }
  var icon = null;
  if (iconProp && /*#__PURE__*/React.isValidElement(iconProp)) {
    icon = /*#__PURE__*/React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error('MUI: The Chip component can not handle the avatar ' + 'and the icon prop at the same time. Pick one.');
    }
  }
  return /*#__PURE__*/_jsxs(ChipRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    disabled: clickable && disabled ? true : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
    ownerState: ownerState
  }, moreProps, other, {
    children: [avatar || icon, /*#__PURE__*/_jsx(ChipLabel, {
      className: clsx(classes.label),
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
  avatar: PropTypes.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Icon element.
   */
  icon: PropTypes.element,
  /**
   * The content of the component.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string])
} : void 0;
export default Chip;