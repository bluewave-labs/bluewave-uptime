'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { html, body } from '../CssBaseline/CssBaseline';
import { getScopedCssBaselineUtilityClass } from './scopedCssBaselineClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getScopedCssBaselineUtilityClass, classes);
};
var ScopedCssBaselineRoot = styled('div', {
  name: 'MuiScopedCssBaseline',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var colorSchemeStyles = {};
  if (ownerState.enableColorScheme && theme.colorSchemes) {
    Object.entries(theme.colorSchemes).forEach(function (_ref2) {
      var _scheme$palette;
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        scheme = _ref3[1];
      colorSchemeStyles["&".concat(theme.getColorSchemeSelector(key).replace(/\s*&/, ''))] = {
        colorScheme: (_scheme$palette = scheme.palette) == null ? void 0 : _scheme$palette.mode
      };
    });
  }
  return _extends({}, html(theme, ownerState.enableColorScheme), body(theme), {
    '& *, & *::before, & *::after': {
      boxSizing: 'inherit'
    },
    '& strong, & b': {
      fontWeight: theme.typography.fontWeightBold
    }
  }, colorSchemeStyles);
});
var ScopedCssBaseline = /*#__PURE__*/React.forwardRef(function ScopedCssBaseline(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiScopedCssBaseline'
  });
  var className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    enableColorScheme = props.enableColorScheme,
    other = _objectWithoutProperties(props, ["className", "component", "enableColorScheme"]);
  var ownerState = _extends({}, props, {
    component: component
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(ScopedCssBaselineRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other));
});
process.env.NODE_ENV !== "production" ? ScopedCssBaseline.propTypes /* remove-proptypes */ = {
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
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   */
  enableColorScheme: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default ScopedCssBaseline;