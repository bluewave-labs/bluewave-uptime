'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import formLabelClasses, { getFormLabelUtilityClasses } from './formLabelClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    color = ownerState.color,
    focused = ownerState.focused,
    disabled = ownerState.disabled,
    error = ownerState.error,
    filled = ownerState.filled,
    required = ownerState.required;
  var slots = {
    root: ['root', "color".concat(capitalize(color)), disabled && 'disabled', error && 'error', filled && 'filled', focused && 'focused', required && 'required'],
    asterisk: ['asterisk', error && 'error']
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
export var FormLabelRoot = styled('label', {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver: function overridesResolver(_ref, styles) {
    var ownerState = _ref.ownerState;
    return _extends({}, styles.root, ownerState.color === 'secondary' && styles.colorSecondary, ownerState.filled && styles.filled);
  }
})(function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _extends({
    color: (theme.vars || theme).palette.text.secondary
  }, theme.typography.body1, _defineProperty(_defineProperty(_defineProperty({
    lineHeight: '1.4375em',
    padding: 0,
    position: 'relative'
  }, "&.".concat(formLabelClasses.focused), {
    color: (theme.vars || theme).palette[ownerState.color].main
  }), "&.".concat(formLabelClasses.disabled), {
    color: (theme.vars || theme).palette.text.disabled
  }), "&.".concat(formLabelClasses.error), {
    color: (theme.vars || theme).palette.error.main
  }));
});
var AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.asterisk;
  }
})(function (_ref3) {
  var theme = _ref3.theme;
  return _defineProperty({}, "&.".concat(formLabelClasses.error), {
    color: (theme.vars || theme).palette.error.main
  });
});
var FormLabel = /*#__PURE__*/React.forwardRef(function FormLabel(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormLabel'
  });
  var children = props.children,
    className = props.className,
    color = props.color,
    _props$component = props.component,
    component = _props$component === void 0 ? 'label' : _props$component,
    disabled = props.disabled,
    error = props.error,
    filled = props.filled,
    focused = props.focused,
    required = props.required,
    other = _objectWithoutProperties(props, ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"]);
  var muiFormControl = useFormControl();
  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled']
  });
  var ownerState = _extends({}, props, {
    color: fcs.color || 'primary',
    component: component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(FormLabelRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [children, fcs.required && /*#__PURE__*/_jsxs(AsteriskComponent, {
      ownerState: ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: ["\u2009", '*']
    })]
  }));
});
process.env.NODE_ENV !== "production" ? FormLabel.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default FormLabel;