'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import { useFormControl } from '../FormControl';
import Stack from '../Stack';
import Typography from '../Typography';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import formControlLabelClasses, { getFormControlLabelUtilityClasses } from './formControlLabelClasses';
import formControlState from '../FormControl/formControlState';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    disabled = ownerState.disabled,
    labelPlacement = ownerState.labelPlacement,
    error = ownerState.error,
    required = ownerState.required;
  var slots = {
    root: ['root', disabled && 'disabled', "labelPlacement".concat(capitalize(labelPlacement)), error && 'error', required && 'required'],
    label: ['label', disabled && 'disabled'],
    asterisk: ['asterisk', error && 'error']
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
export var FormControlLabelRoot = styled('label', {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [_defineProperty({}, "& .".concat(formControlLabelClasses.label), styles.label), styles.root, styles["labelPlacement".concat(capitalize(ownerState.labelPlacement))]];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _extends(_defineProperty({
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -11,
    marginRight: 16
  }, "&.".concat(formControlLabelClasses.disabled), {
    cursor: 'default'
  }), ownerState.labelPlacement === 'start' && {
    flexDirection: 'row-reverse',
    marginLeft: 16,
    // used for row presentation of radio/checkbox
    marginRight: -11
  }, ownerState.labelPlacement === 'top' && {
    flexDirection: 'column-reverse',
    marginLeft: 16
  }, ownerState.labelPlacement === 'bottom' && {
    flexDirection: 'column',
    marginLeft: 16
  }, _defineProperty({}, "& .".concat(formControlLabelClasses.label), _defineProperty({}, "&.".concat(formControlLabelClasses.disabled), {
    color: (theme.vars || theme).palette.text.disabled
  })));
});
var AsteriskComponent = styled('span', {
  name: 'MuiFormControlLabel',
  slot: 'Asterisk',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.asterisk;
  }
})(function (_ref3) {
  var theme = _ref3.theme;
  return _defineProperty({}, "&.".concat(formControlLabelClasses.error), {
    color: (theme.vars || theme).palette.error.main
  });
});

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
var FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(inProps, ref) {
  var _ref5, _slotProps$typography;
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormControlLabel'
  });
  var checked = props.checked,
    className = props.className,
    _props$componentsProp = props.componentsProps,
    componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
    control = props.control,
    disabledProp = props.disabled,
    disableTypography = props.disableTypography,
    inputRef = props.inputRef,
    labelProp = props.label,
    _props$labelPlacement = props.labelPlacement,
    labelPlacement = _props$labelPlacement === void 0 ? 'end' : _props$labelPlacement,
    name = props.name,
    onChange = props.onChange,
    requiredProp = props.required,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    value = props.value,
    other = _objectWithoutProperties(props, ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "required", "slotProps", "value"]);
  var muiFormControl = useFormControl();
  var disabled = (_ref5 = disabledProp != null ? disabledProp : control.props.disabled) != null ? _ref5 : muiFormControl == null ? void 0 : muiFormControl.disabled;
  var required = requiredProp != null ? requiredProp : control.props.required;
  var controlProps = {
    disabled: disabled,
    required: required
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(function (key) {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['error']
  });
  var ownerState = _extends({}, props, {
    disabled: disabled,
    labelPlacement: labelPlacement,
    required: required,
    error: fcs.error
  });
  var classes = useUtilityClasses(ownerState);
  var typographySlotProps = (_slotProps$typography = slotProps.typography) != null ? _slotProps$typography : componentsProps.typography;
  var label = labelProp;
  if (label != null && label.type !== Typography && !disableTypography) {
    label = /*#__PURE__*/_jsx(Typography, _extends({
      component: "span"
    }, typographySlotProps, {
      className: clsx(classes.label, typographySlotProps == null ? void 0 : typographySlotProps.className),
      children: label
    }));
  }
  return /*#__PURE__*/_jsxs(FormControlLabelRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/React.cloneElement(control, controlProps), required ? /*#__PURE__*/_jsxs(Stack, {
      display: "block",
      children: [label, /*#__PURE__*/_jsxs(AsteriskComponent, {
        ownerState: ownerState,
        "aria-hidden": true,
        className: classes.asterisk,
        children: ["\u2009", '*']
      })]
    }) : label]
  }));
});
process.env.NODE_ENV !== "production" ? FormControlLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    typography: PropTypes.object
  }),
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: PropTypes.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    typography: PropTypes.object
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value of the component.
   */
  value: PropTypes.any
} : void 0;
export default FormControlLabel;