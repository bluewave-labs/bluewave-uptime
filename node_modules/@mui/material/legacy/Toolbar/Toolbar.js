'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getToolbarUtilityClass } from './toolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    disableGutters = ownerState.disableGutters,
    variant = ownerState.variant;
  var slots = {
    root: ['root', !disableGutters && 'gutters', variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
var ToolbarRoot = styled('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }, !ownerState.disableGutters && _defineProperty({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }, theme.breakpoints.up('sm'), {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }), ownerState.variant === 'dense' && {
    minHeight: 48
  });
}, function (_ref3) {
  var theme = _ref3.theme,
    ownerState = _ref3.ownerState;
  return ownerState.variant === 'regular' && theme.mixins.toolbar;
});
var Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiToolbar'
  });
  var className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    _props$disableGutters = props.disableGutters,
    disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'regular' : _props$variant,
    other = _objectWithoutProperties(props, ["className", "component", "disableGutters", "variant"]);
  var ownerState = _extends({}, props, {
    component: component,
    disableGutters: disableGutters,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(ToolbarRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other));
});
process.env.NODE_ENV !== "production" ? Toolbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
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
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['dense', 'regular']), PropTypes.string])
} : void 0;
export default Toolbar;