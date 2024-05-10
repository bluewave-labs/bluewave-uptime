'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getFormGroupUtilityClass } from './formGroupClasses';
import useFormControl from '../FormControl/useFormControl';
import formControlState from '../FormControl/formControlState';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    row = ownerState.row,
    error = ownerState.error;
  var slots = {
    root: ['root', row && 'row', error && 'error']
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};
var FormGroupRoot = styled('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.row && styles.row];
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  }, ownerState.row && {
    flexDirection: 'row'
  });
});

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
var FormGroup = /*#__PURE__*/React.forwardRef(function FormGroup(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormGroup'
  });
  var className = props.className,
    _props$row = props.row,
    row = _props$row === void 0 ? false : _props$row,
    other = _objectWithoutProperties(props, ["className", "row"]);
  var muiFormControl = useFormControl();
  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['error']
  });
  var ownerState = _extends({}, props, {
    row: row,
    error: fcs.error
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(FormGroupRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? FormGroup.propTypes /* remove-proptypes */ = {
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
   * Display group of elements in a compact row.
   * @default false
   */
  row: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default FormGroup;