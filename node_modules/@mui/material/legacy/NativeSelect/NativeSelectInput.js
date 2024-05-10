'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import nativeSelectClasses, { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    variant = ownerState.variant,
    disabled = ownerState.disabled,
    multiple = ownerState.multiple,
    open = ownerState.open,
    error = ownerState.error;
  var slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', "icon".concat(capitalize(variant)), open && 'iconOpen', disabled && 'disabled']
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
export var nativeSelectSelectStyles = function nativeSelectSelectStyles(_ref) {
  var ownerState = _ref.ownerState,
    theme = _ref.theme;
  return _extends(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    borderRadius: 0,
    // Reset
    cursor: 'pointer',
    '&:focus': _extends({}, theme.vars ? {
      backgroundColor: "rgba(".concat(theme.vars.palette.common.onBackgroundChannel, " / 0.05)")
    } : {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
    }, {
      borderRadius: 0 // Reset Chrome style
    }),
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none'
    }
  }, "&.".concat(nativeSelectClasses.disabled), {
    cursor: 'default'
  }), '&[multiple]', {
    height: 'auto'
  }), '&:not([multiple]) option, &:not([multiple]) optgroup', {
    backgroundColor: (theme.vars || theme).palette.background.paper
  }), '&&&', {
    paddingRight: 24,
    minWidth: 16 // So it doesn't collapse.
  }), ownerState.variant === 'filled' && {
    '&&&': {
      paddingRight: 32
    }
  }, ownerState.variant === 'outlined' && {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    '&:focus': {
      borderRadius: (theme.vars || theme).shape.borderRadius // Reset the reset for Chrome style
    },
    '&&&': {
      paddingRight: 32
    }
  });
};
var NativeSelectSelect = styled('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.select, styles[ownerState.variant], ownerState.error && styles.error, _defineProperty({}, "&.".concat(nativeSelectClasses.multiple), styles.multiple)];
  }
})(nativeSelectSelectStyles);
export var nativeSelectIconStyles = function nativeSelectIconStyles(_ref3) {
  var ownerState = _ref3.ownerState,
    theme = _ref3.theme;
  return _extends(_defineProperty({
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    // Center vertically, height is 1em
    pointerEvents: 'none',
    // Don't block pointer events on the select under the icon.
    color: (theme.vars || theme).palette.action.active
  }, "&.".concat(nativeSelectClasses.disabled), {
    color: (theme.vars || theme).palette.action.disabled
  }), ownerState.open && {
    transform: 'rotate(180deg)'
  }, ownerState.variant === 'filled' && {
    right: 7
  }, ownerState.variant === 'outlined' && {
    right: 7
  });
};
var NativeSelectIcon = styled('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.icon, ownerState.variant && styles["icon".concat(capitalize(ownerState.variant))], ownerState.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);

/**
 * @ignore - internal component.
 */
var NativeSelectInput = /*#__PURE__*/React.forwardRef(function NativeSelectInput(props, ref) {
  var className = props.className,
    disabled = props.disabled,
    error = props.error,
    IconComponent = props.IconComponent,
    inputRef = props.inputRef,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'standard' : _props$variant,
    other = _objectWithoutProperties(props, ["className", "disabled", "error", "IconComponent", "inputRef", "variant"]);
  var ownerState = _extends({}, props, {
    disabled: disabled,
    variant: variant,
    error: error
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(NativeSelectSelect, _extends({
      ownerState: ownerState,
      className: clsx(classes.select, className),
      disabled: disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /*#__PURE__*/_jsx(NativeSelectIcon, {
      as: IconComponent,
      ownerState: ownerState,
      className: classes.icon
    })]
  });
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: refType,
  /**
   * @ignore
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
export default NativeSelectInput;