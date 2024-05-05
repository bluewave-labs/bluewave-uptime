'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { keyframes, css } from '@mui/system';
import composeClasses from '@mui/utils/composeClasses';
import { alpha, unstable_getUnit as getUnit, unstable_toUnitless as toUnitless } from '../styles';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getSkeletonUtilityClass } from './skeletonClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    variant = ownerState.variant,
    animation = ownerState.animation,
    hasChildren = ownerState.hasChildren,
    width = ownerState.width,
    height = ownerState.height;
  var slots = {
    root: ['root', variant, animation, hasChildren && 'withChildren', hasChildren && !width && 'fitContent', hasChildren && !height && 'heightAuto']
  };
  return composeClasses(slots, getSkeletonUtilityClass, classes);
};
var pulseKeyframe = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0.4;\n  }\n\n  100% {\n    opacity: 1;\n  }\n"])));
var waveKeyframe = keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  0% {\n    transform: translateX(-100%);\n  }\n\n  50% {\n    /* +0.5s of delay between each loop */\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n"])));
var SkeletonRoot = styled('span', {
  name: 'MuiSkeleton',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.variant], ownerState.animation !== false && styles[ownerState.animation], ownerState.hasChildren && styles.withChildren, ownerState.hasChildren && !ownerState.width && styles.fitContent, ownerState.hasChildren && !ownerState.height && styles.heightAuto];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var radiusUnit = getUnit(theme.shape.borderRadius) || 'px';
  var radiusValue = toUnitless(theme.shape.borderRadius);
  return _extends({
    display: 'block',
    // Create a "on paper" color with sufficient contrast retaining the color
    backgroundColor: theme.vars ? theme.vars.palette.Skeleton.bg : alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.11 : 0.13),
    height: '1.2em'
  }, ownerState.variant === 'text' && {
    marginTop: 0,
    marginBottom: 0,
    height: 'auto',
    transformOrigin: '0 55%',
    transform: 'scale(1, 0.60)',
    borderRadius: "".concat(radiusValue).concat(radiusUnit, "/").concat(Math.round(radiusValue / 0.6 * 10) / 10).concat(radiusUnit),
    '&:empty:before': {
      content: '"\\00a0"'
    }
  }, ownerState.variant === 'circular' && {
    borderRadius: '50%'
  }, ownerState.variant === 'rounded' && {
    borderRadius: (theme.vars || theme).shape.borderRadius
  }, ownerState.hasChildren && {
    '& > *': {
      visibility: 'hidden'
    }
  }, ownerState.hasChildren && !ownerState.width && {
    maxWidth: 'fit-content'
  }, ownerState.hasChildren && !ownerState.height && {
    height: 'auto'
  });
}, function (_ref2) {
  var ownerState = _ref2.ownerState;
  return ownerState.animation === 'pulse' && css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      animation: ", " 2s ease-in-out 0.5s infinite;\n    "])), pulseKeyframe);
}, function (_ref3) {
  var ownerState = _ref3.ownerState,
    theme = _ref3.theme;
  return ownerState.animation === 'wave' && css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      position: relative;\n      overflow: hidden;\n\n      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */\n      -webkit-mask-image: -webkit-radial-gradient(white, black);\n\n      &::after {\n        animation: ", " 2s linear 0.5s infinite;\n        background: linear-gradient(\n          90deg,\n          transparent,\n          ", ",\n          transparent\n        );\n        content: '';\n        position: absolute;\n        transform: translateX(-100%); /* Avoid flash during server-side hydration */\n        bottom: 0;\n        left: 0;\n        right: 0;\n        top: 0;\n      }\n    "])), waveKeyframe, (theme.vars || theme).palette.action.hover);
});
var Skeleton = /*#__PURE__*/React.forwardRef(function Skeleton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSkeleton'
  });
  var _props$animation = props.animation,
    animation = _props$animation === void 0 ? 'pulse' : _props$animation,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'span' : _props$component,
    height = props.height,
    style = props.style,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'text' : _props$variant,
    width = props.width,
    other = _objectWithoutProperties(props, ["animation", "className", "component", "height", "style", "variant", "width"]);
  var ownerState = _extends({}, props, {
    animation: animation,
    component: component,
    variant: variant,
    hasChildren: Boolean(other.children)
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(SkeletonRoot, _extends({
    as: component,
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState
  }, other, {
    style: _extends({
      width: width,
      height: height
    }, style)
  }));
});
process.env.NODE_ENV !== "production" ? Skeleton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  /**
   * Optional children to infer width and height from.
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
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['circular', 'rectangular', 'rounded', 'text']), PropTypes.string]),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : void 0;
export default Skeleton;