'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { getStepConnectorUtilityClass } from './stepConnectorClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    orientation = ownerState.orientation,
    alternativeLabel = ownerState.alternativeLabel,
    active = ownerState.active,
    completed = ownerState.completed,
    disabled = ownerState.disabled;
  var slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', active && 'active', completed && 'completed', disabled && 'disabled'],
    line: ['line', "line".concat(capitalize(orientation))]
  };
  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};
var StepConnectorRoot = styled('div', {
  name: 'MuiStepConnector',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel, ownerState.completed && styles.completed];
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    flex: '1 1 auto'
  }, ownerState.orientation === 'vertical' && {
    marginLeft: 12 // half icon
  }, ownerState.alternativeLabel && {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  });
});
var StepConnectorLine = styled('span', {
  name: 'MuiStepConnector',
  slot: 'Line',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.line, styles["line".concat(capitalize(ownerState.orientation))]];
  }
})(function (_ref2) {
  var ownerState = _ref2.ownerState,
    theme = _ref2.theme;
  var borderColor = theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600];
  return _extends({
    display: 'block',
    borderColor: theme.vars ? theme.vars.palette.StepConnector.border : borderColor
  }, ownerState.orientation === 'horizontal' && {
    borderTopStyle: 'solid',
    borderTopWidth: 1
  }, ownerState.orientation === 'vertical' && {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24
  });
});
var StepConnector = /*#__PURE__*/React.forwardRef(function StepConnector(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepConnector'
  });
  var className = props.className,
    other = _objectWithoutProperties(props, ["className"]);
  var _React$useContext = React.useContext(StepperContext),
    alternativeLabel = _React$useContext.alternativeLabel,
    _React$useContext$ori = _React$useContext.orientation,
    orientation = _React$useContext$ori === void 0 ? 'horizontal' : _React$useContext$ori;
  var _React$useContext2 = React.useContext(StepContext),
    active = _React$useContext2.active,
    disabled = _React$useContext2.disabled,
    completed = _React$useContext2.completed;
  var ownerState = _extends({}, props, {
    alternativeLabel: alternativeLabel,
    orientation: orientation,
    active: active,
    completed: completed,
    disabled: disabled
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(StepConnectorRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/_jsx(StepConnectorLine, {
      className: classes.line,
      ownerState: ownerState
    })
  }));
});
process.env.NODE_ENV !== "production" ? StepConnector.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default StepConnector;