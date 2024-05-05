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
import fabClasses, { getFabUtilityClass } from './fabClasses';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var color = ownerState.color,
    variant = ownerState.variant,
    classes = ownerState.classes,
    size = ownerState.size;
  var slots = {
    root: ['root', variant, "size".concat(capitalize(size)), color === 'inherit' ? 'colorInherit' : color]
  };
  var composedClasses = composeClasses(slots, getFabUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var FabRoot = styled(ButtonBase, {
  name: 'MuiFab',
  slot: 'Root',
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.variant], styles["size".concat(capitalize(ownerState.size))], ownerState.color === 'inherit' && styles.colorInherit, styles[capitalize(ownerState.size)], styles[ownerState.color]];
  }
})(function (_ref) {
  var _theme$palette$getCon, _theme$palette;
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({}, theme.typography.button, _defineProperty({
    minHeight: 36,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short
    }),
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    zIndex: (theme.vars || theme).zIndex.fab,
    boxShadow: (theme.vars || theme).shadows[6],
    '&:active': {
      boxShadow: (theme.vars || theme).shadows[12]
    },
    color: theme.vars ? theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette.grey[300]
      },
      textDecoration: 'none'
    }
  }, "&.".concat(fabClasses.focusVisible), {
    boxShadow: (theme.vars || theme).shadows[6]
  }), ownerState.size === 'small' && {
    width: 40,
    height: 40
  }, ownerState.size === 'medium' && {
    width: 48,
    height: 48
  }, ownerState.variant === 'extended' && {
    borderRadius: 48 / 2,
    padding: '0 16px',
    width: 'auto',
    minHeight: 'auto',
    minWidth: 48,
    height: 48
  }, ownerState.variant === 'extended' && ownerState.size === 'small' && {
    width: 'auto',
    padding: '0 8px',
    borderRadius: 34 / 2,
    minWidth: 34,
    height: 34
  }, ownerState.variant === 'extended' && ownerState.size === 'medium' && {
    width: 'auto',
    padding: '0 16px',
    borderRadius: 40 / 2,
    minWidth: 40,
    height: 40
  }, ownerState.color === 'inherit' && {
    color: 'inherit'
  });
}, function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _extends({}, ownerState.color !== 'inherit' && ownerState.color !== 'default' && (theme.vars || theme).palette[ownerState.color] != null && {
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }
  });
}, function (_ref3) {
  var theme = _ref3.theme;
  return _defineProperty({}, "&.".concat(fabClasses.disabled), {
    color: (theme.vars || theme).palette.action.disabled,
    boxShadow: (theme.vars || theme).shadows[0],
    backgroundColor: (theme.vars || theme).palette.action.disabledBackground
  });
});
var Fab = /*#__PURE__*/React.forwardRef(function Fab(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFab'
  });
  var children = props.children,
    className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'default' : _props$color,
    _props$component = props.component,
    component = _props$component === void 0 ? 'button' : _props$component,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableFocusRi = props.disableFocusRipple,
    disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
    focusVisibleClassName = props.focusVisibleClassName,
    _props$size = props.size,
    size = _props$size === void 0 ? 'large' : _props$size,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'circular' : _props$variant,
    other = _objectWithoutProperties(props, ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"]);
  var ownerState = _extends({}, props, {
    color: color,
    component: component,
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    size: size,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(FabRoot, _extends({
    className: clsx(classes.root, className),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ownerState: ownerState,
    ref: ref
  }, other, {
    classes: classes,
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Fab.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['default', 'error', 'info', 'inherit', 'primary', 'secondary', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['circular', 'extended']), PropTypes.string])
} : void 0;
export default Fab;