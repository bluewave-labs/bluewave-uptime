'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var _span;
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import Typography from '../Typography';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import styled from '../styles/styled';
import inputAdornmentClasses, { getInputAdornmentUtilityClass } from './inputAdornmentClasses';
import useThemeProps from '../styles/useThemeProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [styles.root, styles["position".concat(capitalize(ownerState.position))], ownerState.disablePointerEvents === true && styles.disablePointerEvents, styles[ownerState.variant]];
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    disablePointerEvents = ownerState.disablePointerEvents,
    hiddenLabel = ownerState.hiddenLabel,
    position = ownerState.position,
    size = ownerState.size,
    variant = ownerState.variant;
  var slots = {
    root: ['root', disablePointerEvents && 'disablePointerEvents', position && "position".concat(capitalize(position)), variant, hiddenLabel && 'hiddenLabel', size && "size".concat(capitalize(size))]
  };
  return composeClasses(slots, getInputAdornmentUtilityClass, classes);
};
var InputAdornmentRoot = styled('div', {
  name: 'MuiInputAdornment',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    height: '0.01em',
    // Fix IE11 flexbox alignment. To remove at some point.
    maxHeight: '2em',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: (theme.vars || theme).palette.action.active
  }, ownerState.variant === 'filled' && _defineProperty({}, "&.".concat(inputAdornmentClasses.positionStart, "&:not(.").concat(inputAdornmentClasses.hiddenLabel, ")"), {
    marginTop: 16
  }), ownerState.position === 'start' && {
    // Styles applied to the root element if `position="start"`.
    marginRight: 8
  }, ownerState.position === 'end' && {
    // Styles applied to the root element if `position="end"`.
    marginLeft: 8
  }, ownerState.disablePointerEvents === true && {
    // Styles applied to the root element if `disablePointerEvents={true}`.
    pointerEvents: 'none'
  });
});
var InputAdornment = /*#__PURE__*/React.forwardRef(function InputAdornment(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiInputAdornment'
  });
  var children = props.children,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    _props$disablePointer = props.disablePointerEvents,
    disablePointerEvents = _props$disablePointer === void 0 ? false : _props$disablePointer,
    _props$disableTypogra = props.disableTypography,
    disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
    position = props.position,
    variantProp = props.variant,
    other = _objectWithoutProperties(props, ["children", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"]);
  var muiFormControl = useFormControl() || {};
  var variant = variantProp;
  if (variantProp && muiFormControl.variant) {
    if (process.env.NODE_ENV !== 'production') {
      if (variantProp === muiFormControl.variant) {
        console.error('MUI: The `InputAdornment` variant infers the variant prop ' + 'you do not have to provide one.');
      }
    }
  }
  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }
  var ownerState = _extends({}, props, {
    hiddenLabel: muiFormControl.hiddenLabel,
    size: muiFormControl.size,
    disablePointerEvents: disablePointerEvents,
    position: position,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(FormControlContext.Provider, {
    value: null,
    children: /*#__PURE__*/_jsx(InputAdornmentRoot, _extends({
      as: component,
      ownerState: ownerState,
      className: clsx(classes.root, className),
      ref: ref
    }, other, {
      children: typeof children === 'string' && !disableTypography ? /*#__PURE__*/_jsx(Typography, {
        color: "text.secondary",
        children: children
      }) : /*#__PURE__*/_jsxs(React.Fragment, {
        children: [position === 'start' ? ( /* notranslate needed while Google Translate will not fix zero-width space issue */_span || (_span = /*#__PURE__*/_jsx("span", {
          className: "notranslate",
          children: "\u200B"
        }))) : null, children]
      })
    }))
  });
});
process.env.NODE_ENV !== "production" ? InputAdornment.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or string.
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
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents: PropTypes.bool,
  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: PropTypes.oneOf(['end', 'start']).isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
export default InputAdornment;