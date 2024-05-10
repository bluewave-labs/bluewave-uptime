'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Avatar, { avatarClasses } from '../Avatar';
import avatarGroupClasses, { getAvatarGroupUtilityClass } from './avatarGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SPACINGS = {
  small: -16,
  medium: null
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    avatar: ['avatar']
  };
  return composeClasses(slots, getAvatarGroupUtilityClass, classes);
};
var AvatarGroupRoot = styled('div', {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return _extends(_defineProperty({}, "& .".concat(avatarGroupClasses.avatar), styles.avatar), styles.root);
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var marginValue = ownerState.spacing && SPACINGS[ownerState.spacing] !== undefined ? SPACINGS[ownerState.spacing] : -ownerState.spacing;
  return _defineProperty(_defineProperty(_defineProperty({}, "& .".concat(avatarClasses.root), {
    border: "2px solid ".concat((theme.vars || theme).palette.background.default),
    boxSizing: 'content-box',
    marginLeft: marginValue != null ? marginValue : -8,
    '&:last-child': {
      marginLeft: 0
    }
  }), "display", 'flex'), "flexDirection", 'row-reverse');
});
var AvatarGroup = /*#__PURE__*/React.forwardRef(function AvatarGroup(inProps, ref) {
  var _slotProps$additional;
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAvatarGroup'
  });
  var childrenProp = props.children,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    _props$componentsProp = props.componentsProps,
    componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
    _props$max = props.max,
    max = _props$max === void 0 ? 5 : _props$max,
    renderSurplus = props.renderSurplus,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$spacing = props.spacing,
    spacing = _props$spacing === void 0 ? 'medium' : _props$spacing,
    total = props.total,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'circular' : _props$variant,
    other = _objectWithoutProperties(props, ["children", "className", "component", "componentsProps", "max", "renderSurplus", "slotProps", "spacing", "total", "variant"]);
  var clampedMax = max < 2 ? 2 : max;
  var ownerState = _extends({}, props, {
    max: max,
    spacing: spacing,
    component: component,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  var children = React.Children.toArray(childrenProp).filter(function (child) {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["MUI: The AvatarGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }
    return /*#__PURE__*/React.isValidElement(child);
  });
  var totalAvatars = total || children.length;
  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }
  clampedMax = Math.min(totalAvatars + 1, clampedMax);
  var maxAvatars = Math.min(children.length, clampedMax - 1);
  var extraAvatars = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
  var extraAvatarsElement = renderSurplus ? renderSurplus(extraAvatars) : "+".concat(extraAvatars);
  var additionalAvatarSlotProps = (_slotProps$additional = slotProps.additionalAvatar) != null ? _slotProps$additional : componentsProps.additionalAvatar;
  return /*#__PURE__*/_jsxs(AvatarGroupRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [extraAvatars ? /*#__PURE__*/_jsx(Avatar, _extends({
      variant: variant
    }, additionalAvatarSlotProps, {
      className: clsx(classes.avatar, additionalAvatarSlotProps == null ? void 0 : additionalAvatarSlotProps.className),
      children: extraAvatarsElement
    })) : null, children.slice(0, maxAvatars).reverse().map(function (child) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: clsx(child.props.className, classes.avatar),
        variant: child.props.variant || variant
      });
    })]
  }));
});
process.env.NODE_ENV !== "production" ? AvatarGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The avatars to stack.
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
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    additionalAvatar: PropTypes.object
  }),
  /**
   * Max avatars to show before +x.
   * @default 5
   */
  max: chainPropTypes(PropTypes.number, function (props) {
    if (props.max < 2) {
      return new Error(['MUI: The prop `max` should be equal to 2 or above.', 'A value below is clamped to 2.'].join('\n'));
    }
    return null;
  }),
  /**
   * custom renderer of extraAvatars
   * @param {number} surplus number of extra avatars
   * @returns {React.ReactNode} custom element to display
   */
  renderSurplus: PropTypes.func,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    additionalAvatar: PropTypes.object
  }),
  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing: PropTypes.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.number]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The total number of avatars. Used for calculating the number of extra avatars.
   * @default children.length
   */
  total: PropTypes.number,
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['circular', 'rounded', 'square']), PropTypes.string])
} : void 0;
export default AvatarGroup;