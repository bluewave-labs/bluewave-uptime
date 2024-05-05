'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getTypographyUtilityClass } from './typographyClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var align = ownerState.align,
    gutterBottom = ownerState.gutterBottom,
    noWrap = ownerState.noWrap,
    paragraph = ownerState.paragraph,
    variant = ownerState.variant,
    classes = ownerState.classes;
  var slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && "align".concat(capitalize(align)), gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
export var TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles["align".concat(capitalize(ownerState.align))], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    margin: 0
  }, ownerState.variant === 'inherit' && {
    // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
    font: 'inherit'
  }, ownerState.variant !== 'inherit' && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
    textAlign: ownerState.align
  }, ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }, ownerState.gutterBottom && {
    marginBottom: '0.35em'
  }, ownerState.paragraph && {
    marginBottom: 16
  });
});
var defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
};

// TODO v6: deprecate these color values in v5.x and remove the transformation in v6
var colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};
var transformDeprecatedColors = function transformDeprecatedColors(color) {
  return colorTransformations[color] || color;
};
var Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  var themeProps = useThemeProps({
    props: inProps,
    name: 'MuiTypography'
  });
  var color = transformDeprecatedColors(themeProps.color);
  var props = extendSxProp(_extends({}, themeProps, {
    color: color
  }));
  var _props$align = props.align,
    align = _props$align === void 0 ? 'inherit' : _props$align,
    className = props.className,
    component = props.component,
    _props$gutterBottom = props.gutterBottom,
    gutterBottom = _props$gutterBottom === void 0 ? false : _props$gutterBottom,
    _props$noWrap = props.noWrap,
    noWrap = _props$noWrap === void 0 ? false : _props$noWrap,
    _props$paragraph = props.paragraph,
    paragraph = _props$paragraph === void 0 ? false : _props$paragraph,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'body1' : _props$variant,
    _props$variantMapping = props.variantMapping,
    variantMapping = _props$variantMapping === void 0 ? defaultVariantMapping : _props$variantMapping,
    other = _objectWithoutProperties(props, ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]);
  var ownerState = _extends({}, props, {
    align: align,
    color: color,
    className: className,
    component: component,
    gutterBottom: gutterBottom,
    noWrap: noWrap,
    paragraph: paragraph,
    variant: variant,
    variantMapping: variantMapping
  });
  var Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(TypographyRoot, _extends({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? Typography.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
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
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: PropTypes /* @typescript-to-proptypes-ignore */.object
} : void 0;
export default Typography;