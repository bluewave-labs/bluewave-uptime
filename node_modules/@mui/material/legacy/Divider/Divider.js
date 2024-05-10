'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDividerUtilityClass } from './dividerClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var absolute = ownerState.absolute,
    children = ownerState.children,
    classes = ownerState.classes,
    flexItem = ownerState.flexItem,
    light = ownerState.light,
    orientation = ownerState.orientation,
    textAlign = ownerState.textAlign,
    variant = ownerState.variant;
  var slots = {
    root: ['root', absolute && 'absolute', variant, light && 'light', orientation === 'vertical' && 'vertical', flexItem && 'flexItem', children && 'withChildren', children && orientation === 'vertical' && 'withChildrenVertical', textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight', textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft'],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical']
  };
  return composeClasses(slots, getDividerUtilityClass, classes);
};
var DividerRoot = styled('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.absolute && styles.absolute, styles[ownerState.variant], ownerState.light && styles.light, ownerState.orientation === 'vertical' && styles.vertical, ownerState.flexItem && styles.flexItem, ownerState.children && styles.withChildren, ownerState.children && ownerState.orientation === 'vertical' && styles.withChildrenVertical, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && styles.textAlignRight, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && styles.textAlignLeft];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    margin: 0,
    // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: (theme.vars || theme).palette.divider,
    borderBottomWidth: 'thin'
  }, ownerState.absolute && {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }, ownerState.light && {
    borderColor: theme.vars ? "rgba(".concat(theme.vars.palette.dividerChannel, " / 0.08)") : alpha(theme.palette.divider, 0.08)
  }, ownerState.variant === 'inset' && {
    marginLeft: 72
  }, ownerState.variant === 'middle' && ownerState.orientation === 'horizontal' && {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }, ownerState.variant === 'middle' && ownerState.orientation === 'vertical' && {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }, ownerState.orientation === 'vertical' && {
    height: '100%',
    borderBottomWidth: 0,
    borderRightWidth: 'thin'
  }, ownerState.flexItem && {
    alignSelf: 'stretch',
    height: 'auto'
  });
}, function (_ref2) {
  var ownerState = _ref2.ownerState;
  return _extends({}, ownerState.children && {
    display: 'flex',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    border: 0,
    '&::before, &::after': {
      content: '""',
      alignSelf: 'center'
    }
  });
}, function (_ref3) {
  var theme = _ref3.theme,
    ownerState = _ref3.ownerState;
  return _extends({}, ownerState.children && ownerState.orientation !== 'vertical' && {
    '&::before, &::after': {
      width: '100%',
      borderTop: "thin solid ".concat((theme.vars || theme).palette.divider)
    }
  });
}, function (_ref4) {
  var theme = _ref4.theme,
    ownerState = _ref4.ownerState;
  return _extends({}, ownerState.children && ownerState.orientation === 'vertical' && {
    flexDirection: 'column',
    '&::before, &::after': {
      height: '100%',
      borderLeft: "thin solid ".concat((theme.vars || theme).palette.divider)
    }
  });
}, function (_ref5) {
  var ownerState = _ref5.ownerState;
  return _extends({}, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && {
    '&::before': {
      width: '90%'
    },
    '&::after': {
      width: '10%'
    }
  }, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && {
    '&::before': {
      width: '10%'
    },
    '&::after': {
      width: '90%'
    }
  });
});
var DividerWrapper = styled('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.wrapper, ownerState.orientation === 'vertical' && styles.wrapperVertical];
  }
})(function (_ref6) {
  var theme = _ref6.theme,
    ownerState = _ref6.ownerState;
  return _extends({
    display: 'inline-block',
    paddingLeft: "calc(".concat(theme.spacing(1), " * 1.2)"),
    paddingRight: "calc(".concat(theme.spacing(1), " * 1.2)")
  }, ownerState.orientation === 'vertical' && {
    paddingTop: "calc(".concat(theme.spacing(1), " * 1.2)"),
    paddingBottom: "calc(".concat(theme.spacing(1), " * 1.2)")
  });
});
var Divider = /*#__PURE__*/React.forwardRef(function Divider(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDivider'
  });
  var _props$absolute = props.absolute,
    absolute = _props$absolute === void 0 ? false : _props$absolute,
    children = props.children,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? children ? 'div' : 'hr' : _props$component,
    _props$flexItem = props.flexItem,
    flexItem = _props$flexItem === void 0 ? false : _props$flexItem,
    _props$light = props.light,
    light = _props$light === void 0 ? false : _props$light,
    _props$orientation = props.orientation,
    orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
    _props$role = props.role,
    role = _props$role === void 0 ? component !== 'hr' ? 'separator' : undefined : _props$role,
    _props$textAlign = props.textAlign,
    textAlign = _props$textAlign === void 0 ? 'center' : _props$textAlign,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'fullWidth' : _props$variant,
    other = _objectWithoutProperties(props, ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"]);
  var ownerState = _extends({}, props, {
    absolute: absolute,
    component: component,
    flexItem: flexItem,
    light: light,
    orientation: orientation,
    role: role,
    textAlign: textAlign,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(DividerRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    role: role,
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: children ? /*#__PURE__*/_jsx(DividerWrapper, {
      className: classes.wrapper,
      ownerState: ownerState,
      children: children
    }) : null
  }));
});

/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */
Divider.muiSkipListHighlight = true;
process.env.NODE_ENV !== "production" ? Divider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  light: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['fullWidth', 'inset', 'middle']), PropTypes.string])
} : void 0;
export default Divider;