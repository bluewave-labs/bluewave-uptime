'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import unsupportedProp from '../utils/unsupportedProp';
import tabClasses, { getTabUtilityClass } from './tabClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    textColor = ownerState.textColor,
    fullWidth = ownerState.fullWidth,
    wrapped = ownerState.wrapped,
    icon = ownerState.icon,
    label = ownerState.label,
    selected = ownerState.selected,
    disabled = ownerState.disabled;
  var slots = {
    root: ['root', icon && label && 'labelIcon', "textColor".concat(capitalize(textColor)), fullWidth && 'fullWidth', wrapped && 'wrapped', selected && 'selected', disabled && 'disabled'],
    iconWrapper: ['iconWrapper']
  };
  return composeClasses(slots, getTabUtilityClass, classes);
};
var TabRoot = styled(ButtonBase, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.label && ownerState.icon && styles.labelIcon, styles["textColor".concat(capitalize(ownerState.textColor))], ownerState.fullWidth && styles.fullWidth, ownerState.wrapped && styles.wrapped];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({}, theme.typography.button, {
    maxWidth: 360,
    minWidth: 90,
    position: 'relative',
    minHeight: 48,
    flexShrink: 0,
    padding: '12px 16px',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textAlign: 'center'
  }, ownerState.label && {
    flexDirection: ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom' ? 'column' : 'row'
  }, {
    lineHeight: 1.25
  }, ownerState.icon && ownerState.label && _defineProperty({
    minHeight: 72,
    paddingTop: 9,
    paddingBottom: 9
  }, "& > .".concat(tabClasses.iconWrapper), _extends({}, ownerState.iconPosition === 'top' && {
    marginBottom: 6
  }, ownerState.iconPosition === 'bottom' && {
    marginTop: 6
  }, ownerState.iconPosition === 'start' && {
    marginRight: theme.spacing(1)
  }, ownerState.iconPosition === 'end' && {
    marginLeft: theme.spacing(1)
  })), ownerState.textColor === 'inherit' && _defineProperty(_defineProperty({
    color: 'inherit',
    opacity: 0.6
  }, "&.".concat(tabClasses.selected), {
    opacity: 1
  }), "&.".concat(tabClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }), ownerState.textColor === 'primary' && _defineProperty(_defineProperty({
    color: (theme.vars || theme).palette.text.secondary
  }, "&.".concat(tabClasses.selected), {
    color: (theme.vars || theme).palette.primary.main
  }), "&.".concat(tabClasses.disabled), {
    color: (theme.vars || theme).palette.text.disabled
  }), ownerState.textColor === 'secondary' && _defineProperty(_defineProperty({
    color: (theme.vars || theme).palette.text.secondary
  }, "&.".concat(tabClasses.selected), {
    color: (theme.vars || theme).palette.secondary.main
  }), "&.".concat(tabClasses.disabled), {
    color: (theme.vars || theme).palette.text.disabled
  }), ownerState.fullWidth && {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 'none'
  }, ownerState.wrapped && {
    fontSize: theme.typography.pxToRem(12)
  });
});
var Tab = /*#__PURE__*/React.forwardRef(function Tab(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTab'
  });
  var className = props.className,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableFocusRi = props.disableFocusRipple,
    disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
    fullWidth = props.fullWidth,
    iconProp = props.icon,
    _props$iconPosition = props.iconPosition,
    iconPosition = _props$iconPosition === void 0 ? 'top' : _props$iconPosition,
    indicator = props.indicator,
    label = props.label,
    onChange = props.onChange,
    onClick = props.onClick,
    onFocus = props.onFocus,
    selected = props.selected,
    selectionFollowsFocus = props.selectionFollowsFocus,
    _props$textColor = props.textColor,
    textColor = _props$textColor === void 0 ? 'inherit' : _props$textColor,
    value = props.value,
    _props$wrapped = props.wrapped,
    wrapped = _props$wrapped === void 0 ? false : _props$wrapped,
    other = _objectWithoutProperties(props, ["className", "disabled", "disableFocusRipple", "fullWidth", "icon", "iconPosition", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"]);
  var ownerState = _extends({}, props, {
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    selected: selected,
    icon: !!iconProp,
    iconPosition: iconPosition,
    label: !!label,
    fullWidth: fullWidth,
    textColor: textColor,
    wrapped: wrapped
  });
  var classes = useUtilityClasses(ownerState);
  var icon = iconProp && label && /*#__PURE__*/React.isValidElement(iconProp) ? /*#__PURE__*/React.cloneElement(iconProp, {
    className: clsx(classes.iconWrapper, iconProp.props.className)
  }) : iconProp;
  var handleClick = function handleClick(event) {
    if (!selected && onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  var handleFocus = function handleFocus(event) {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  return /*#__PURE__*/_jsxs(TabRoot, _extends({
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, className),
    ref: ref,
    role: "tab",
    "aria-selected": selected,
    disabled: disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    ownerState: ownerState,
    tabIndex: selected ? 0 : -1
  }, other, {
    children: [iconPosition === 'top' || iconPosition === 'start' ? /*#__PURE__*/_jsxs(React.Fragment, {
      children: [icon, label]
    }) : /*#__PURE__*/_jsxs(React.Fragment, {
      children: [label, icon]
    }), indicator]
  }));
});
process.env.NODE_ENV !== "production" ? Tab.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: PropTypes.bool
} : void 0;
export default Tab;