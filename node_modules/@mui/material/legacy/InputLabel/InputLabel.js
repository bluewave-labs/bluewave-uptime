'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import FormLabel, { formLabelClasses } from '../FormLabel';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { getInputLabelUtilityClasses } from './inputLabelClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    formControl = ownerState.formControl,
    size = ownerState.size,
    shrink = ownerState.shrink,
    disableAnimation = ownerState.disableAnimation,
    variant = ownerState.variant,
    required = ownerState.required;
  var slots = {
    root: ['root', formControl && 'formControl', !disableAnimation && 'animated', shrink && 'shrink', size && size !== 'normal' && "size".concat(capitalize(size)), variant],
    asterisk: [required && 'asterisk']
  };
  var composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return _extends({}, classes, composedClasses);
};
var InputLabelRoot = styled(FormLabel, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiInputLabel',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [_defineProperty({}, "& .".concat(formLabelClasses.asterisk), styles.asterisk), styles.root, ownerState.formControl && styles.formControl, ownerState.size === 'small' && styles.sizeSmall, ownerState.shrink && styles.shrink, !ownerState.disableAnimation && styles.animated, ownerState.focused && styles.focused, styles[ownerState.variant]];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _extends({
    display: 'block',
    transformOrigin: 'top left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%'
  }, ownerState.formControl && {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: 'translate(0, 20px) scale(1)'
  }, ownerState.size === 'small' && {
    // Compensation for the `Input.inputSizeSmall` style.
    transform: 'translate(0, 17px) scale(1)'
  }, ownerState.shrink && {
    transform: 'translate(0, -1.5px) scale(0.75)',
    transformOrigin: 'top left',
    maxWidth: '133%'
  }, !ownerState.disableAnimation && {
    transition: theme.transitions.create(['color', 'transform', 'max-width'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    })
  }, ownerState.variant === 'filled' && _extends({
    // Chrome's autofill feature gives the input field a yellow background.
    // Since the input field is behind the label in the HTML tree,
    // the input field is drawn last and hides the label with an opaque background color.
    // zIndex: 1 will raise the label above opaque background-colors of input.
    zIndex: 1,
    pointerEvents: 'none',
    transform: 'translate(12px, 16px) scale(1)',
    maxWidth: 'calc(100% - 24px)'
  }, ownerState.size === 'small' && {
    transform: 'translate(12px, 13px) scale(1)'
  }, ownerState.shrink && _extends({
    userSelect: 'none',
    pointerEvents: 'auto',
    transform: 'translate(12px, 7px) scale(0.75)',
    maxWidth: 'calc(133% - 24px)'
  }, ownerState.size === 'small' && {
    transform: 'translate(12px, 4px) scale(0.75)'
  })), ownerState.variant === 'outlined' && _extends({
    // see comment above on filled.zIndex
    zIndex: 1,
    pointerEvents: 'none',
    transform: 'translate(14px, 16px) scale(1)',
    maxWidth: 'calc(100% - 24px)'
  }, ownerState.size === 'small' && {
    transform: 'translate(14px, 9px) scale(1)'
  }, ownerState.shrink && {
    userSelect: 'none',
    pointerEvents: 'auto',
    // Theoretically, we should have (8+5)*2/0.75 = 34px
    // but it feels a better when it bleeds a bit on the left, so 32px.
    maxWidth: 'calc(133% - 32px)',
    transform: 'translate(14px, -9px) scale(0.75)'
  }));
});
var InputLabel = /*#__PURE__*/React.forwardRef(function InputLabel(inProps, ref) {
  var props = useThemeProps({
    name: 'MuiInputLabel',
    props: inProps
  });
  var _props$disableAnimati = props.disableAnimation,
    disableAnimation = _props$disableAnimati === void 0 ? false : _props$disableAnimati,
    margin = props.margin,
    shrinkProp = props.shrink,
    variant = props.variant,
    className = props.className,
    other = _objectWithoutProperties(props, ["disableAnimation", "margin", "shrink", "variant", "className"]);
  var muiFormControl = useFormControl();
  var shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['size', 'variant', 'required', 'focused']
  });
  var ownerState = _extends({}, props, {
    disableAnimation: disableAnimation,
    formControl: muiFormControl,
    shrink: shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required,
    focused: fcs.focused
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(InputLabelRoot, _extends({
    "data-shrink": shrink,
    ownerState: ownerState,
    ref: ref,
    className: clsx(classes.root, className)
  }, other, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? InputLabel.propTypes /* remove-proptypes */ = {
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
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']), PropTypes.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'normal'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['normal', 'small']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
export default InputLabel;