'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getIconUtilityClass } from './iconClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var color = ownerState.color,
    fontSize = ownerState.fontSize,
    classes = ownerState.classes;
  var slots = {
    root: ['root', color !== 'inherit' && "color".concat(capitalize(color)), "fontSize".concat(capitalize(fontSize))]
  };
  return composeClasses(slots, getIconUtilityClass, classes);
};
var IconRoot = styled('span', {
  name: 'MuiIcon',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.color !== 'inherit' && styles["color".concat(capitalize(ownerState.color))], styles["fontSize".concat(capitalize(ownerState.fontSize))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
    // To remove at some point.
    overflow: 'hidden',
    display: 'inline-block',
    // allow overflow hidden to take action
    textAlign: 'center',
    // support non-square icon
    flexShrink: 0,
    fontSize: {
      inherit: 'inherit',
      small: theme.typography.pxToRem(20),
      medium: theme.typography.pxToRem(24),
      large: theme.typography.pxToRem(36)
    }[ownerState.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: {
      primary: (theme.vars || theme).palette.primary.main,
      secondary: (theme.vars || theme).palette.secondary.main,
      info: (theme.vars || theme).palette.info.main,
      success: (theme.vars || theme).palette.success.main,
      warning: (theme.vars || theme).palette.warning.main,
      action: (theme.vars || theme).palette.action.active,
      error: (theme.vars || theme).palette.error.main,
      disabled: (theme.vars || theme).palette.action.disabled,
      inherit: undefined
    }[ownerState.color]
  };
});
var Icon = /*#__PURE__*/React.forwardRef(function Icon(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiIcon'
  });
  var _props$baseClassName = props.baseClassName,
    baseClassName = _props$baseClassName === void 0 ? 'material-icons' : _props$baseClassName,
    className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'inherit' : _props$color,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'span' : _props$component,
    _props$fontSize = props.fontSize,
    fontSize = _props$fontSize === void 0 ? 'medium' : _props$fontSize,
    other = _objectWithoutProperties(props, ["baseClassName", "className", "color", "component", "fontSize"]);
  var ownerState = _extends({}, props, {
    baseClassName: baseClassName,
    color: color,
    component: Component,
    fontSize: fontSize
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(IconRoot, _extends({
    as: Component,
    className: clsx(baseClassName,
    // Prevent the translation of the text content.
    // The font relies on the exact text content to render the icon.
    'notranslate', classes.root, className),
    ownerState: ownerState,
    "aria-hidden": true,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Icon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The base class applied to the icon. Defaults to 'material-icons', but can be changed to any
   * other base class that suits the icon font you're using (for example material-icons-rounded, fas, etc).
   * @default 'material-icons'
   */
  baseClassName: PropTypes.string,
  /**
   * The name of the icon font ligature.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'action', 'disabled', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'large', 'medium', 'small']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
Icon.muiName = 'Icon';
export default Icon;