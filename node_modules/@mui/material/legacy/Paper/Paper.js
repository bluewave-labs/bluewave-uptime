'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import getOverlayAlpha from '../styles/getOverlayAlpha';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import { getPaperUtilityClass } from './paperClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var square = ownerState.square,
    elevation = ownerState.elevation,
    variant = ownerState.variant,
    classes = ownerState.classes;
  var slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && "elevation".concat(elevation)]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
var PaperRoot = styled('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === 'elevation' && styles["elevation".concat(ownerState.elevation)]];
  }
})(function (_ref) {
  var _theme$vars$overlays;
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.primary,
    transition: theme.transitions.create('box-shadow')
  }, !ownerState.square && {
    borderRadius: theme.shape.borderRadius
  }, ownerState.variant === 'outlined' && {
    border: "1px solid ".concat((theme.vars || theme).palette.divider)
  }, ownerState.variant === 'elevation' && _extends({
    boxShadow: (theme.vars || theme).shadows[ownerState.elevation]
  }, !theme.vars && theme.palette.mode === 'dark' && {
    backgroundImage: "linear-gradient(".concat(alpha('#fff', getOverlayAlpha(ownerState.elevation)), ", ").concat(alpha('#fff', getOverlayAlpha(ownerState.elevation)), ")")
  }, theme.vars && {
    backgroundImage: (_theme$vars$overlays = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays[ownerState.elevation]
  }));
});
var Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPaper'
  });
  var className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    _props$elevation = props.elevation,
    elevation = _props$elevation === void 0 ? 1 : _props$elevation,
    _props$square = props.square,
    square = _props$square === void 0 ? false : _props$square,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'elevation' : _props$variant,
    other = _objectWithoutProperties(props, ["className", "component", "elevation", "square", "variant"]);
  var ownerState = _extends({}, props, {
    component: component,
    elevation: elevation,
    square: square,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var theme = useTheme();
    if (theme.shadows[elevation] === undefined) {
      console.error(["MUI: The elevation provided <Paper elevation={".concat(elevation, "}> is not available in the theme."), "Please make sure that `theme.shadows[".concat(elevation, "]` is defined.")].join('\n'));
    }
  }
  return /*#__PURE__*/_jsx(PaperRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Paper.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(integerPropType, function (props) {
    var elevation = props.elevation,
      variant = props.variant;
    if (elevation > 0 && variant === 'outlined') {
      return new Error("MUI: Combining `elevation={".concat(elevation, "}` with `variant=\"").concat(variant, "\"` has no effect. Either use `elevation={0}` or use a different `variant`."));
    }
    return null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['elevation', 'outlined']), PropTypes.string])
} : void 0;
export default Paper;